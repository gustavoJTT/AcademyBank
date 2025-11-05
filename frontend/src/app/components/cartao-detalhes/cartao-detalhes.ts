import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { Chip } from 'primeng/chip';

interface CartaoVirtual {
  id: number;
  nomeCartao: string;
  limite: number;
  ativo: boolean;
}

@Component({
  selector: 'app-cartao-detalhes',
  imports: [CommonModule, Dialog, Button, Tag, Chip],
  templateUrl: './cartao-detalhes.html',
  standalone: true,
})
export class CartaoDetalhes {
  // @Input - recebe dados do componente pai
  visible = input.required<boolean>();
  cartao = input<CartaoVirtual | null>();

  // @Output - envia eventos para o componente pai
  fechar = output<void>();
  editar = output<CartaoVirtual>();

  onFechar(): void {
    this.fechar.emit();
  }

  onEditar(): void {
    if (this.cartao()) {
      this.editar.emit(this.cartao()!);
    }
  }
}
