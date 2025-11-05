import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { Chip } from 'primeng/chip';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CartaoLista } from './components/cartao-lista/cartao-lista';
import { CartaoDetalhes } from './components/cartao-detalhes/cartao-detalhes';
import { CartaoForm } from './components/cartao-form/cartao-form';

interface CartaoVirtual {
  id: number;
  nomeCartao: string;
  limite: number;
  ativo: boolean;
}

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    Button,
    Toast,
    Chip,
    ConfirmDialog,
    CartaoLista,
    CartaoDetalhes,
    CartaoForm
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './app.html',
})
export class App {

  cartoes = signal<CartaoVirtual[]>([
    { id: 1, nomeCartao: 'Cartão Principal', limite: 5000, ativo: true },
    { id: 2, nomeCartao: 'Cartão Compras', limite: 3000, ativo: false },
    { id: 3, nomeCartao: 'Cartão Premium', limite: 10000, ativo: true }
  ]);

  dialogForm = signal(false);
  dialogDetalhes = signal(false);
  modoEdicao = signal(false);

  cartaoSelecionado = signal<CartaoVirtual | null>(null);
  cartaoEditando = signal<CartaoVirtual | null>(null);

  private proximoId = 4;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  // Handlers para eventos dos componentes filhos

  // Detalhar - recebe evento do componente CartaoLista
  onDetalhar(cartao: CartaoVirtual): void {
    this.cartaoSelecionado.set({ ...cartao });
    this.dialogDetalhes.set(true);
  }

  // Incluir - abre o formulário em modo criação
  onIncluir(): void {
    this.modoEdicao.set(false);
    this.cartaoEditando.set(null);
    this.dialogForm.set(true);
  }

  // Alterar - recebe evento do componente CartaoLista ou CartaoDetalhes
  onEditar(cartao: CartaoVirtual): void {
    this.modoEdicao.set(true);
    this.cartaoEditando.set({ ...cartao });
    this.dialogForm.set(true);
    this.dialogDetalhes.set(false);
  }

  // Salvar - recebe evento do componente CartaoForm
  onSalvar(cartao: CartaoVirtual): void {
    if (this.modoEdicao()) {
      // Alterar cartão existente
      this.cartoes.update((cartoes: CartaoVirtual[]) =>
        cartoes.map((c: CartaoVirtual) => c.id === cartao.id ? { ...cartao } : c)
      );
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Cartão atualizado com sucesso!'
      });
    } else {
      // Incluir novo cartão
      const novoCartao = { ...cartao, id: this.proximoId++ };
      this.cartoes.update((cartoes: CartaoVirtual[]) => [...cartoes, novoCartao]);
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Cartão criado com sucesso!'
      });
    }

    this.dialogForm.set(false);
    this.cartaoEditando.set(null);
  }

  // Remover - recebe evento do componente CartaoLista
  onRemover(cartao: CartaoVirtual): void {
    this.confirmationService.confirm({
      message: `Deseja realmente remover o cartão ${cartao.nomeCartao}?`,
      header: 'Confirmar Remoção',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim, remover',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.cartoes.update((cartoes: CartaoVirtual[]) =>
          cartoes.filter((c: CartaoVirtual) => c.id !== cartao.id)
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Removido',
          detail: 'Cartão removido com sucesso!'
        });
      }
    });
  }

  // Fechar - recebe eventos dos componentes de modal
  onFecharDetalhes(): void {
    this.dialogDetalhes.set(false);
    this.cartaoSelecionado.set(null);
  }

  onCancelarForm(): void {
    this.dialogForm.set(false);
    this.cartaoEditando.set(null);
  }
}
