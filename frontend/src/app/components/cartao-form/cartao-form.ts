import { Component, input, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { ToggleSwitch } from 'primeng/toggleswitch';

interface CartaoVirtual {
  id: number;
  nomeCartao: string;
  limite: number;
  ativo: boolean;
}

@Component({
  selector: 'app-cartao-form',
  imports: [CommonModule, FormsModule, Dialog, Button, InputText, ToggleSwitch],
  templateUrl: './cartao-form.html',
  standalone: true,
})
export class CartaoForm {
  // @Input - recebe dados do componente pai
  visible = input.required<boolean>();
  cartao = input<CartaoVirtual | null>();
  modoEdicao = input<boolean>(false);

  // @Output - envia eventos para o componente pai
  salvar = output<CartaoVirtual>();
  cancelar = output<void>();

  // Dados do formulário
  nomeCartao = signal('');
  limite = signal(0);
  ativo = signal(true);

  constructor() {
    // Effect para sincronizar o formulário quando receber um cartão para editar
    effect(() => {
      const cartaoAtual = this.cartao();
      if (cartaoAtual) {
        this.nomeCartao.set(cartaoAtual.nomeCartao);
        this.limite.set(cartaoAtual.limite);
        this.ativo.set(cartaoAtual.ativo);
      } else {
        this.limparFormulario();
      }
    });
  }

  onSalvar(): void {
    const cartaoData: CartaoVirtual = {
      id: this.cartao()?.id || Date.now(),
      nomeCartao: this.nomeCartao(),
      limite: this.limite(),
      ativo: this.ativo(),
    };

    this.salvar.emit(cartaoData);
    this.limparFormulario();
  }

  onCancelar(): void {
    this.cancelar.emit();
    this.limparFormulario();
  }

  private limparFormulario(): void {
    if (!this.cartao()) {
      this.nomeCartao.set('');
      this.limite.set(0);
      this.ativo.set(true);
    }
  }

  isFormValido(): boolean {
    return this.nomeCartao().trim().length > 0 && this.limite() > 0;
  }
}
