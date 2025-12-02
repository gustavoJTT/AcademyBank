import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'cartoes', pathMatch: 'full' },
  { 
    path: 'cartoes', 
    loadComponent: () => import('./pages/cartao-lista-page/cartao-lista-page').then(m => m.CartaoListaPage)
  },
  { 
    path: 'cartoes/novo', 
    loadComponent: () => import('./pages/cartao-form-page/cartao-form-page').then(m => m.CartaoFormPage)
  },
  { 
    path: 'cartoes/:id', 
    loadComponent: () => import('./pages/cartao-detalhes-page/cartao-detalhes-page').then(m => m.CartaoDetalhesPage)
  },
  { 
    path: 'cartoes/:id/editar', 
    loadComponent: () => import('./pages/cartao-form-page/cartao-form-page').then(m => m.CartaoFormPage)
  },
  { path: '**', redirectTo: 'cartoes' }
];
