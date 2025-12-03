import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Button } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CartaoService, CartaoVirtual as CartaoAPI } from '../../services/cartao.service';

interface CartaoVirtual {
  id: number;
  nomeCartao: string;
  limite: number;
  ativo: boolean;
  criado_em?: string;
  atualizado_em?: string;
}

@Component({
  selector: 'app-cartao-detalhes-page',
  imports: [CommonModule, Button, Toast],
  providers: [MessageService],
  standalone: true,
  template: `
    <p-toast />

    <div class="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb/Navegação -->
        <div class="mb-8 flex items-center gap-4">
          <p-button
            label="Voltar"
            icon="pi pi-arrow-left"
            (onClick)="onVoltar()"
            severity="secondary"
            [text]="true"
            styleClass="hover:scale-105 transition-transform" />
          <div class="flex items-center gap-2 text-gray-600">
            <i class="pi pi-home"></i>
            <span>/</span>
            <span class="text-blue-600 font-semibold">Detalhes do Cartão</span>
          </div>
        </div>

        @if (carregando()) {
          <div class="text-center py-12">
            <i class="pi pi-spin pi-spinner text-4xl text-blue-600"></i>
            <p class="mt-4 text-gray-600">Carregando...</p>
          </div>
        } @else if (cartao(); as c) {
          <div class="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
            <!-- Header com gradiente -->
            <div class="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-700 px-8 py-6 relative overflow-hidden">
              <!-- Padrão de fundo animado -->
              <div class="absolute inset-0 opacity-20">
                <div class="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-20 translate-x-20"></div>
                <div class="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-16 -translate-x-16"></div>
              </div>

              <div class="relative z-10 flex items-center justify-between text-white">
                <div class="flex items-center gap-4">
                  <div class="bg-white/20 backdrop-blur-lg rounded-2xl p-3 border border-white/30">
                    <i class="pi pi-wallet text-3xl"></i>
                  </div>
                  <div>
                    <span class="text-2xl font-bold">Detalhes do Cartão</span>
                    <p class="text-blue-100 text-sm mt-1">Informações completas</p>
                  </div>
                </div>
                <p-button
                  label="Editar"
                  icon="pi pi-pencil"
                  (onClick)="onEditar()"
                  severity="contrast"
                  size="large"
                  [raised]="true"
                  styleClass="shadow-xl hover:scale-105 transition-transform" />
              </div>
            </div>

            <div class="p-8 space-y-8">
              <!-- Card Visual melhorado -->
              <div class="relative bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-500">
                <div class="absolute inset-0 opacity-10 rounded-2xl overflow-hidden">
                  <div class="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                  <div class="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
                </div>

                <div class="relative z-10">
                  <div class="flex justify-between items-start mb-6">
                    <div class="flex items-center gap-2">
                      <i class="pi pi-shield text-lg"></i>
                      <span class="text-sm font-bold tracking-wider">AcademyBank</span>
                    </div>
                    <span
                      [class]="c.ativo ? 'bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg' : 'bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg'">
                      {{ c.ativo ? 'ATIVO' : 'INATIVO' }}
                    </span>
                  </div>

                  <div class="mb-8">
                    <div class="text-xs opacity-75 mb-2 tracking-wide">Nome do Cartão</div>
                    <div class="text-2xl font-bold tracking-wide">{{ c.nomeCartao }}</div>
                  </div>

                  <div class="flex justify-between items-end">
                    <div>
                      <div class="text-xs opacity-75 mb-2 tracking-wide">Limite Disponível</div>
                      <div class="text-3xl font-bold tracking-tight">
                        {{ c.limite | currency:'BRL':'symbol':'1.0-0' }}
                      </div>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                      <span class="text-lg font-bold">#{{ c.id }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Informações Detalhadas -->
              <div class="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <i class="pi pi-info-circle text-blue-600"></i>
                  Informações do Cartão
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="bg-white p-4 rounded-lg border border-gray-200">
                    <div class="flex items-center gap-3">
                      <div class="bg-blue-100 p-2 rounded-lg">
                        <i class="pi pi-id-card text-blue-600"></i>
                      </div>
                      <div>
                        <div class="text-sm text-gray-600">ID do Cartão</div>
                        <div class="text-lg font-bold text-gray-800">#{{ c.id }}</div>
                      </div>
                    </div>
                  </div>

                  <div class="bg-white p-4 rounded-lg border border-gray-200">
                    <div class="flex items-center gap-3">
                      <div class="bg-green-100 p-2 rounded-lg">
                        <i class="pi pi-dollar text-green-600"></i>
                      </div>
                      <div>
                        <div class="text-sm text-gray-600">Limite Total</div>
                        <div class="text-lg font-bold text-gray-800">
                          {{ c.limite | currency:'BRL':'symbol':'1.2-2' }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="bg-white p-4 rounded-lg border border-gray-200">
                    <div class="flex items-center gap-3">
                      <div [class]="c.ativo ? 'bg-green-100 p-2 rounded-lg' : 'bg-red-100 p-2 rounded-lg'">
                        <i [class]="c.ativo ? 'pi pi-check-circle text-green-600' : 'pi pi-times-circle text-red-600'"></i>
                      </div>
                      <div>
                        <div class="text-sm text-gray-600">Status</div>
                        <div class="text-lg font-bold text-gray-800">
                          {{ c.ativo ? 'Ativo' : 'Inativo' }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="bg-white p-4 rounded-lg border border-gray-200">
                    <div class="flex items-center gap-3">
                      <div class="bg-purple-100 p-2 rounded-lg">
                        <i class="pi pi-tag text-purple-600"></i>
                      </div>
                      <div>
                        <div class="text-sm text-gray-600">Nome</div>
                        <div class="text-lg font-bold text-gray-800">{{ c.nomeCartao }}</div>
                      </div>
                    </div>
                  </div>

                  @if (c.criado_em) {
                    <div class="bg-white p-4 rounded-lg border border-gray-200">
                      <div class="flex items-center gap-3">
                        <div class="bg-indigo-100 p-2 rounded-lg">
                          <i class="pi pi-calendar-plus text-indigo-600"></i>
                        </div>
                        <div>
                          <div class="text-sm text-gray-600">Criado em</div>
                          <div class="text-lg font-bold text-gray-800">
                            {{ c.criado_em | date:'dd/MM/yyyy HH:mm' }}
                          </div>
                        </div>
                      </div>
                    </div>
                  }

                  @if (c.atualizado_em) {
                    <div class="bg-white p-4 rounded-lg border border-gray-200">
                      <div class="flex items-center gap-3">
                        <div class="bg-orange-100 p-2 rounded-lg">
                          <i class="pi pi-calendar text-orange-600"></i>
                        </div>
                        <div>
                          <div class="text-sm text-gray-600">Atualizado em</div>
                          <div class="text-lg font-bold text-gray-800">
                            {{ c.atualizado_em | date:'dd/MM/yyyy HH:mm' }}
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>

              <!-- Ações -->
              <div class="flex gap-3 pt-4 border-t border-gray-200">
                <p-button
                  label="Voltar"
                  icon="pi pi-arrow-left"
                  (onClick)="onVoltar()"
                  severity="secondary"
                  [outlined]="true"
                  styleClass="flex-1" />
                <p-button
                  label="Remover"
                  icon="pi pi-trash"
                  (onClick)="onRemover()"
                  severity="danger"
                  [outlined]="true"
                  styleClass="flex-1" />
                <p-button
                  label="Editar"
                  icon="pi pi-pencil"
                  (onClick)="onEditar()"
                  severity="contrast"
                  [raised]="true"
                  styleClass="flex-1" />
              </div>
            </div>
          </div>
        } @else {
          <div class="text-center py-12">
            <i class="pi pi-exclamation-triangle text-4xl text-red-600 mb-4"></i>
            <p class="text-xl text-gray-600 mb-4">Cartão não encontrado</p>
            <p-button
              label="Voltar para Lista"
              icon="pi pi-arrow-left"
              (onClick)="onVoltar()"
              severity="secondary" />
          </div>
        }
      </div>
    </div>
  `
})
export class CartaoDetalhesPage implements OnInit {
  cartao = signal<CartaoVirtual | null>(null);
  carregando = signal(true);
  cartaoId: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartaoService: CartaoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cartaoId = Number(params['id']);
      this.carregarCartao();
    });
  }

  private carregarCartao(): void {
    this.carregando.set(true);
    this.cartaoService.buscarPorId(this.cartaoId).subscribe({
      next: (cartao) => {
        this.cartao.set({
          id: cartao.id,
          nomeCartao: cartao.nome_cartao,
          limite: Number(cartao.limite),
          ativo: cartao.ativo,
          criado_em: cartao.criado_em,
          atualizado_em: cartao.atualizado_em
        });
        this.carregando.set(false);
      },
      error: (erro) => {
        console.error('Erro ao carregar cartão:', erro);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar os detalhes do cartão.'
        });
        this.carregando.set(false);
      }
    });
  }

  onVoltar(): void {
    this.router.navigate(['/cartoes']);
  }

  onEditar(): void {
    this.router.navigate(['/cartoes', this.cartaoId, 'editar']);
  }

  onRemover(): void {
    this.cartaoService.remover(this.cartaoId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Cartão removido com sucesso!'
        });
        setTimeout(() => {
          this.router.navigate(['/cartoes']);
        }, 1500);
      },
      error: (erro) => {
        console.error('Erro ao remover cartão:', erro);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível remover o cartão.'
        });
      }
    });
  }
}
