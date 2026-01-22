import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    InputTextModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService],
  template: `
    <p-toast />
    <div class="flex justify-center items-center min-h-screen bg-linear-to-br from-blue-600 via-purple-600 to-violet-700 p-5">
      <div class="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md">
        <h1 class="text-blue-600 m-0 mb-2 text-3xl text-center font-bold">Academy Bank</h1>
        <h2 class="text-gray-800 m-0 mb-8 text-2xl text-center font-normal">Login</h2>

        <form (ngSubmit)="onLogin()" #loginForm="ngForm" class="space-y-5">
          <div>
            <label for="username" class="block mb-2 text-gray-700 font-medium">Usuário</label>
            <input
              pInputText
              id="username"
              name="username"
              [(ngModel)]="credentials.username"
              required
              placeholder="Digite seu usuário"
              class="w-full"
            />
          </div>

          <div>
            <label for="password" class="block mb-2 text-gray-700 font-medium">Senha</label>
            <input
              pInputText
              type="password"
              id="password"
              name="password"
              [(ngModel)]="credentials.password"
              required
              placeholder="Digite sua senha"
              class="w-full"
            />
          </div>

          <button
            pButton
            type="submit"
            label="Entrar"
            [disabled]="!loginForm.valid || isLoading"
            [loading]="isLoading"
            class="w-full mt-3"
          ></button>
        </form>

        <div class="mt-5 text-center">
          <p class="text-gray-600 m-0">Não tem uma conta? <a routerLink="/register" class="text-blue-600 no-underline font-medium hover:underline">Cadastre-se</a></p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  credentials = {
    username: '',
    password: ''
  };

  isLoading = false;

  onLogin(): void {
    this.isLoading = true;
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Login realizado com sucesso!'
        });
        setTimeout(() => {
          this.router.navigate(['/cartoes']);
        }, 500);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Usuário ou senha inválidos'
        });
        this.isLoading = false;
      }
    });
  }
}
