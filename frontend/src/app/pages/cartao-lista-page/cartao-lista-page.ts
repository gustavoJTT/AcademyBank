import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CartaoService, CartaoVirtual as CartaoAPI } from '../../services/cartao.service';

interface CartaoVirtual {
  id: number;
  nomeCartao: string;
  limite: number;
  ativo: boolean;
}

@Component({
  selector: 'app-cartao-lista-page',
  imports: [CommonModule, Button, Toast, ConfirmDialog],
  providers: [MessageService, ConfirmationService],
  standalone: true,
  template: `
    <p-toast />
    <p-confirmDialog />
    
    <div class="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100">
      <!-- Header com gradiente -->
      <div class="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-700 shadow-2xl">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div class="flex items-center gap-4">
              <div class="bg-white/20 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white/30">
                <i class="pi pi-wallet text-white text-4xl"></i>
              </div>
              <div>
                <h1 class="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                  AcademyBank
                  <span class="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                    {{ cartoes().length }}
                  </span>
                </h1>
                <p class="text-blue-100 text-lg flex items-center gap-2">
                  <i class="pi pi-shield"></i>
                  Seus cartões virtuais seguros
                </p>
              </div>
            </div>
            <p-button
              label="Novo Cartão"
              icon="pi pi-plus-circle"
              (onClick)="onNovo()"
              severity="success"
              size="large"
              [raised]="true"
              styleClass="shadow-2xl hover:scale-105 transition-transform" />
          </div>
        </div>
      </div>

      <!-- Conteúdo -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <!-- Lista de Cartões -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (cartao of cartoes(); track cartao.id) {
            <div class="group transform transition-all duration-500 hover:-translate-y-3 hover:scale-105">
              <div class="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-400 overflow-hidden h-full flex flex-col relative">
                <!-- Brilho no hover -->
                <div class="absolute inset-0 bg-linear-to-br from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/10 group-hover:to-pink-400/10 transition-all duration-500 pointer-events-none"></div>
                
                <!-- Card Visual -->
                <div class="relative bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 p-6 text-white group-hover:from-blue-500 group-hover:via-indigo-500 group-hover:to-purple-600 transition-all duration-500">
                  <!-- Padrão animado de fundo -->
                  <div class="absolute inset-0 opacity-10">
                    <div class="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-20 translate-x-20 group-hover:scale-150 transition-transform duration-700"></div>
                    <div class="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-16 -translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                    <div class="absolute top-1/2 left-1/2 w-24 h-24 bg-white rounded-full -translate-x-12 -translate-y-12 group-hover:scale-125 transition-transform duration-700"></div>
                  </div>

                  <div class="relative z-10">
                    <div class="flex justify-between items-start mb-6">
                      <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <i class="pi pi-shield text-sm"></i>
                        <span class="text-xs font-bold tracking-wider">AcademyBank</span>
                      </div>
                      <span
                        [class]="cartao.ativo ? 'bg-green-400 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse' : 'bg-red-400 text-white px-4 py-1.5 rounded-full text-xs font-bold'">
                        {{ cartao.ativo ? '● ATIVO' : '● INATIVO' }}
                      </span>
                    </div>

                    <div class="mb-8">
                      <div class="text-xs opacity-75 mb-2 tracking-wide uppercase">Nome do Cartão</div>
                      <div class="text-xl font-bold tracking-wide truncate">{{ cartao.nomeCartao }}</div>
                    </div>

                    <div class="flex justify-between items-end">
                      <div>
                        <div class="text-xs opacity-75 mb-2 tracking-wide uppercase">Limite Disponível</div>
                        <div class="text-3xl font-bold tracking-tight">
                          {{ cartao.limite | currency:'BRL':'symbol':'1.0-0' }}
                        </div>
                      </div>
                      <div class="bg-white/20 backdrop-blur-lg rounded-xl px-4 py-2 border border-white/30">
                        <span class="text-sm font-bold">#{{ cartao.id }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Ações com design melhorado -->
                <div class="p-5 flex gap-2 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100 mt-auto">
                  <p-button
                    label="Detalhes"
                    icon="pi pi-eye"
                    (onClick)="onDetalhar(cartao)"
                    severity="info"
                    size="small"
                    [outlined]="true"
                    styleClass="flex-1 hover:scale-105 transition-transform" />
                  <p-button
                    label="Editar"
                    icon="pi pi-pencil"
                    (onClick)="onEditar(cartao)"
                    severity="contrast"
                    size="small"
                    [outlined]="true"
                    styleClass="flex-1 hover:scale-105 transition-transform" />
                  <p-button
                    icon="pi pi-trash"
                    (onClick)="onRemover(cartao)"
                    severity="danger"
                    size="small"
                    [outlined]="true"
                    styleClass="hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>
          } @empty {
            <div class="col-span-full">
              <div class="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-16 text-center border-2 border-dashed border-gray-300">
                <div class="bg-linear-to-br from-blue-100 to-indigo-100 rounded-full p-8 w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                  <i class="pi pi-wallet text-6xl text-blue-600"></i>
                </div>
                <h3 class="text-3xl font-bold text-gray-800 mb-3">Nenhum cartão cadastrado</h3>
                <p class="text-gray-600 mb-8 text-lg">Comece criando seu primeiro cartão virtual</p>
                <p-button
                  label="Criar Primeiro Cartão"
                  icon="pi pi-plus-circle"
                  (onClick)="onNovo()"
                  severity="success"
                  size="large"
                  [raised]="true"
                  styleClass="shadow-xl hover:scale-105 transition-transform" />
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class CartaoListaPage implements OnInit {
  cartoes = signal<CartaoVirtual[]>([]);

  constructor(
    private router: Router,
    private cartaoService: CartaoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.carregarCartoes();
  }

  private carregarCartoes(): void {
    this.cartaoService.listar().subscribe({
      next: (cartoes) => {
        const cartoesConvertidos = cartoes.map(c => ({
          id: c.id,
          nomeCartao: c.nome_cartao,
          limite: Number(c.limite),
          ativo: c.ativo
        }));
        this.cartoes.set(cartoesConvertidos);
      },
      error: (erro) => {
        console.error('Erro ao carregar cartões:', erro);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar os cartões.'
        });
      }
    });
  }

  onNovo(): void {
    this.router.navigate(['/cartoes/novo']);
  }

  onDetalhar(cartao: CartaoVirtual): void {
    this.router.navigate(['/cartoes', cartao.id]);
  }

  onEditar(cartao: CartaoVirtual): void {
    this.router.navigate(['/cartoes', cartao.id, 'editar']);
  }

  onRemover(cartao: CartaoVirtual): void {
    this.confirmationService.confirm({
      message: `Deseja realmente remover o cartão ${cartao.nomeCartao}?`,
      header: 'Confirmar Remoção',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim, remover',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.cartaoService.remover(cartao.id).subscribe({
          next: () => {
            this.carregarCartoes();
            this.messageService.add({
              severity: 'success',
              summary: 'Removido',
              detail: 'Cartão removido com sucesso!'
            });
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
    });
  }
}
