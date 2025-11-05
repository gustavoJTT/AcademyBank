import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from 'primeng/card';
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
  selector: 'app-cartao-lista',
  imports: [CommonModule, Card, Button, Tag, Chip],
  templateUrl: './cartao-lista.html',
  standalone: true,
})
export class CartaoLista {
  // @Input - recebe dados do componente pai
  cartoes = input.required<CartaoVirtual[]>();

  // @Output - envia eventos para o componente pai
  detalhar = output<CartaoVirtual>();
  editar = output<CartaoVirtual>();
  remover = output<CartaoVirtual>();

  onDetalhar(cartao: CartaoVirtual): void {
    this.detalhar.emit(cartao);
  }

  onEditar(cartao: CartaoVirtual): void {
    this.editar.emit(cartao);
  }

  onRemover(cartao: CartaoVirtual): void {
    this.remover.emit(cartao);
  }
}
