import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register-page/register-page').then(m => m.RegisterPage)
  },
  {
    path: 'cartoes',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/cartao-lista-page/cartao-lista-page').then(m => m.CartaoListaPage)
  },
  {
    path: 'cartoes/novo',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/cartao-form-page/cartao-form-page').then(m => m.CartaoFormPage)
  },
  {
    path: 'cartoes/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/cartao-detalhes-page/cartao-detalhes-page').then(m => m.CartaoDetalhesPage)
  },
  {
    path: 'cartoes/:id/editar',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/cartao-form-page/cartao-form-page').then(m => m.CartaoFormPage)
  },
  { path: '**', redirectTo: 'login' }
];
