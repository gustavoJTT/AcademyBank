import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CartaoService } from '../../services/cartao.service';

@Component({
  selector: 'app-cartao-form-page',
  imports: [CommonModule, FormsModule, Button, InputText, ToggleSwitch, Toast],
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
            <span class="text-blue-600 font-semibold">{{ modoEdicao() ? 'Editar Cartão' : 'Novo Cartão' }}</span>
          </div>
        </div>

        @if (carregando()) {
          <div class="text-center py-12">
            <i class="pi pi-spin pi-spinner text-4xl text-blue-600"></i>
            <p class="mt-4 text-gray-600">Carregando...</p>
          </div>
        } @else {
          <div class="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
            <!-- Header com gradiente -->
            <div class="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-700 px-8 py-6 relative overflow-hidden">
              <!-- Padrão de fundo animado -->
              <div class="absolute inset-0 opacity-20">
                <div class="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-20 translate-x-20"></div>
                <div class="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-16 -translate-x-16"></div>
              </div>

              <div class="relative z-10 flex items-center gap-4 text-white">
                <div class="bg-white/20 backdrop-blur-lg rounded-2xl p-3 border border-white/30">
                  <i [class]="modoEdicao() ? 'pi pi-pencil text-3xl' : 'pi pi-plus-circle text-3xl'"></i>
                </div>
                <div>
                  <span class="text-2xl font-bold">
                    {{ modoEdicao() ? 'Editar Cartão' : 'Novo Cartão Virtual' }}
                  </span>
                  <p class="text-blue-100 text-sm mt-1">
                    {{ modoEdicao() ? 'Atualize as informações do cartão' : 'Preencha os dados para criar um novo cartão' }}
                  </p>
                </div>
              </div>
            </div>

            <div class="p-8 space-y-8">
              <!-- Preview do Cartão melhorado -->
              <div>
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <i class="pi pi-eye text-blue-600"></i>
                  Preview do Cartão
                </h3>
                <div class="relative bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl transform transition-all duration-500 hover:scale-105">
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
                      [class]="ativo() ? 'bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg' : 'bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg'">
                      {{ ativo() ? 'ATIVO' : 'INATIVO' }}
                    </span>
                  </div>

                  <div class="mb-8">
                    <div class="text-xs opacity-75 mb-2 tracking-wide">Nome do Cartão</div>
                    <div class="text-2xl font-bold tracking-wide">
                      {{ nomeCartao() || 'Nome do Cartão' }}
                    </div>
                  </div>

                  <div class="flex justify-between items-end">
                    <div>
                      <div class="text-xs opacity-75 mb-2 tracking-wide">Limite Disponível</div>
                      <div class="text-3xl font-bold tracking-tight">
                        {{ limite() | currency:'BRL':'symbol':'1.0-0' }}
                      </div>
                    </div>
                    @if (modoEdicao()) {
                      <div class="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                        <span class="text-lg font-bold">#{{ cartaoId }}</span>
                      </div>
                    }
                  </div>
                </div>
              </div>

              </div>

              <!-- Formulário melhorado -->
              <div class="space-y-6">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <i class="pi pi-file-edit text-blue-600"></i>
                  Dados do Cartão
                </h3>

                <div class="space-y-2">
                  <label class="block text-sm font-bold text-gray-700 flex items-center gap-2">
                    <div class="bg-blue-100 p-1.5 rounded-lg">
                      <i class="pi pi-tag text-blue-600 text-xs"></i>
                    </div>
                    Nome do Cartão *
                  </label>
                  <input
                    pInputText
                    [(ngModel)]="nomeCartao"
                    placeholder="Ex: Cartão Principal, Cartão de Viagem..."
                    class="w-full text-lg"
                    [class.ng-invalid]="nomeCartao() && nomeCartao().trim().length === 0" />
                  @if (nomeCartao() && nomeCartao().trim().length === 0) {
                    <small class="text-red-600 flex items-center gap-1">
                      <i class="pi pi-exclamation-circle"></i>
                      O nome do cartão é obrigatório
                    </small>
                  }
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-bold text-gray-700 flex items-center gap-2">
                    <div class="bg-green-100 p-1.5 rounded-lg">
                      <i class="pi pi-dollar text-green-600 text-xs"></i>
                    </div>
                    Limite (R$) *
                  </label>
                  <input
                    pInputText
                    type="number"
                    [(ngModel)]="limite"
                    placeholder="Ex: 5000"
                    min="0"
                    step="0.01"
                    class="w-full text-lg"
                    [class.ng-invalid]="limite() <= 0" />
                  @if (limite() <= 0) {
                    <small class="text-red-600 flex items-center gap-1">
                      <i class="pi pi-exclamation-circle"></i>
                      O limite deve ser maior que zero
                    </small>
                  }
                </div>

                <div [class]="ativo() ? 'bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-300 transition-all duration-300' : 'bg-linear-to-br from-red-50 to-rose-50 rounded-2xl p-6 border-2 border-red-300 transition-all duration-300'">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                      <div [class]="ativo() ? 'bg-green-500 p-3 rounded-xl shadow-lg transition-all duration-300' : 'bg-red-500 p-3 rounded-xl shadow-lg transition-all duration-300'">
                        <i [class]="ativo() ? 'pi pi-check-circle text-white text-2xl' : 'pi pi-times-circle text-white text-2xl'"></i>
                      </div>
                      <div>
                        <label class="block text-base font-bold text-gray-800 mb-1">
                          Status do Cartão
                        </label>
                        <p [class]="ativo() ? 'text-sm text-green-700 font-semibold' : 'text-sm text-red-700 font-semibold'">
                          <i [class]="ativo() ? 'pi pi-circle-fill text-xs text-green-500 mr-2' : 'pi pi-circle-fill text-xs text-red-500 mr-2'"></i>
                          {{ ativo() ? 'Ativo e pronto para uso' : 'Inativo e bloqueado para transações' }}
                        </p>
                      </div>
                    </div>
                    <p-toggleSwitch
                      [(ngModel)]="ativo"
                      styleClass="scale-150 transition-transform hover:scale-[1.6]" />
                  </div>
                </div>

                <div class="bg-linear-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-xl p-5">
                  <div class="flex gap-4">
                    <div class="bg-blue-100 p-2 rounded-lg h-fit">
                      <i class="pi pi-info-circle text-blue-600 text-xl"></i>
                    </div>
                    <div>
                      <p class="text-sm font-bold text-blue-900 mb-2">{{ modoEdicao() ? 'Atenção' : 'Informação Importante' }}</p>
                      <p class="text-sm text-blue-700 leading-relaxed">
                        {{ modoEdicao()
                          ? 'As alterações serão aplicadas imediatamente após salvar. Certifique-se de que todas as informações estão corretas.'
                          : 'O cartão virtual será criado instantaneamente e estará disponível para uso de acordo com o limite definido e status escolhido.' }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Ações melhoradas -->
              <div class="flex gap-4 pt-6 border-t-2 border-gray-200">
                <p-button
                  label="Cancelar"
                  icon="pi pi-times"
                  (onClick)="onCancelar()"
                  severity="secondary"
                  [outlined]="true"
                  size="large"
                  styleClass="flex-1 hover:scale-105 transition-transform" />
                <p-button
                  [label]="modoEdicao() ? 'Salvar Alterações' : 'Criar Cartão'"
                  [icon]="modoEdicao() ? 'pi pi-check' : 'pi pi-plus-circle'"
                  (onClick)="onSalvar()"
                  [disabled]="!isFormValido()"
                  [severity]="modoEdicao() ? 'info' : 'success'"
                  [raised]="true"
                  size="large"
                  styleClass="flex-1 shadow-xl hover:scale-105 transition-transform" />
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class CartaoFormPage implements OnInit {
  nomeCartao = signal('');
  limite = signal<number>(0);
  ativo = signal(true);
  modoEdicao = signal(false);
  carregando = signal(false);
  cartaoId: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartaoService: CartaoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.cartaoId = Number(id);
        this.modoEdicao.set(true);
        this.carregarCartao();
      }
    });
  }

  private carregarCartao(): void {
    this.carregando.set(true);
    this.cartaoService.buscarPorId(this.cartaoId).subscribe({
      next: (cartao) => {
        this.nomeCartao.set(cartao.nome_cartao);
        this.limite.set(Number(cartao.limite));
        this.ativo.set(cartao.ativo);
        this.carregando.set(false);
      },
      error: (erro) => {
        console.error('Erro ao carregar cartão:', erro);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar os dados do cartão.'
        });
        this.carregando.set(false);
        this.router.navigate(['/cartoes']);
      }
    });
  }

  onSalvar(): void {
    if (!this.isFormValido()) return;

    const cartaoData = {
      nome_cartao: this.nomeCartao(),
      limite: this.limite(),
      ativo: this.ativo()
    };

    if (this.modoEdicao()) {
      this.cartaoService.atualizar(this.cartaoId, cartaoData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Cartão atualizado com sucesso!'
          });
          this.router.navigate(['/cartoes', this.cartaoId]);
        },
        error: (erro) => {
          console.error('Erro ao atualizar cartão:', erro);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível atualizar o cartão.'
          });
        }
      });
    } else {
      this.cartaoService.criar(cartaoData).subscribe({
        next: (cartao) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Cartão criado com sucesso!'
          });
          this.router.navigate(['/cartoes']);
        },
        error: (erro) => {
          console.error('Erro ao criar cartão:', erro);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível criar o cartão.'
          });
        }
      });
    }
  }

  onCancelar(): void {
    if (this.modoEdicao()) {
      this.router.navigate(['/cartoes', this.cartaoId]);
    } else {
      this.router.navigate(['/cartoes']);
    }
  }

  onVoltar(): void {
    this.onCancelar();
  }

  isFormValido(): boolean {
    return this.nomeCartao().trim().length > 0 && this.limite() > 0;
  }
}
