import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { Card } from 'primeng/card';
import { Toast } from 'primeng/toast';
import { Tag } from 'primeng/tag';
import { Chip } from 'primeng/chip';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

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
    FormsModule,
    Button,
    Dialog,
    InputText,
    InputNumber,
    Card,
    Toast,
    Tag,
    Chip,
    ConfirmDialog
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

  dialogVisible = signal(false);
  dialogDetalhes = signal(false);
  isEditMode = signal(false);

  cartaoSelecionado = signal<CartaoVirtual | null>(null);

  cartaoForm = signal<CartaoVirtual>({
    id: 0,
    nomeCartao: '',
    limite: 0,
    ativo: true
  });

  private proximoId = 4;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  // Listar (já está no signal cartoes)

  // Detalhar
  detalharCartao(cartao: CartaoVirtual): void {
    this.cartaoSelecionado.set({ ...cartao });
    this.dialogDetalhes.set(true);
  }

  // Incluir
  abrirDialogIncluir(): void {
    this.isEditMode.set(false);
    this.cartaoForm.set({
      id: 0,
      nomeCartao: '',
      limite: 0,
      ativo: true
    });
    this.dialogVisible.set(true);
  }

  // Alterar
  abrirDialogEditar(cartao: CartaoVirtual): void {
    this.isEditMode.set(true);
    this.cartaoForm.set({ ...cartao });
    this.dialogVisible.set(true);
  }

  // Salvar (incluir ou alterar)
  salvarCartao(): void {
    const cartao = this.cartaoForm();

    if (!cartao.nomeCartao || cartao.limite <= 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha todos os campos corretamente!'
      });
      return;
    }

    if (this.isEditMode()) {
      // Alterar
      this.cartoes.update(cartoes =>
        cartoes.map(c => c.id === cartao.id ? { ...cartao } : c)
      );
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Cartão atualizado com sucesso!'
      });
    } else {
      // Incluir
      const novoCartao = { ...cartao, id: this.proximoId++ };
      this.cartoes.update(cartoes => [...cartoes, novoCartao]);
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Cartão criado com sucesso!'
      });
    }

    this.dialogVisible.set(false);
  }

  // Remover
  removerCartao(cartao: CartaoVirtual): void {
    this.confirmationService.confirm({
      message: `Deseja realmente remover o cartão ${cartao.nomeCartao}?`,
      header: 'Confirmar Remoção',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim, remover',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.cartoes.update(cartoes =>
          cartoes.filter(c => c.id !== cartao.id)
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Removido',
          detail: 'Cartão removido com sucesso!'
        });
      }
    });
  }

  alternarStatus(cartao: CartaoVirtual): void {
    const novoStatus = !cartao.ativo;
    this.cartoes.update(cartoes =>
      cartoes.map(c => c.id === cartao.id ? { ...c, ativo: novoStatus } : c)
    );
    this.messageService.add({
      severity: novoStatus ? 'success' : 'warn',
      summary: 'Status Alterado',
      detail: `Cartão ${novoStatus ? 'ativado' : 'desativado'} com sucesso!`,
      life: 2000
    });
  }

  cancelar(): void {
    this.dialogVisible.set(false);
    this.dialogDetalhes.set(false);
  }
}
