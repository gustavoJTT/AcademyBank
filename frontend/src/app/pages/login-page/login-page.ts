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
    <div class="login-container">
      <div class="login-card">
        <h1>Academy Bank</h1>
        <h2>Login</h2>

        <form (ngSubmit)="onLogin()" #loginForm="ngForm">
          <div class="form-group">
            <label for="username">Usuário</label>
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

          <div class="form-group">
            <label for="password">Senha</label>
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
            class="w-full"
          ></button>
        </form>

        <div class="register-link">
          <p>Não tem uma conta? <a routerLink="/register">Cadastre-se</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .login-card {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }

    h1 {
      color: #667eea;
      margin: 0 0 10px 0;
      font-size: 28px;
      text-align: center;
    }

    h2 {
      color: #333;
      margin: 0 0 30px 0;
      font-size: 24px;
      text-align: center;
      font-weight: 400;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: #555;
      font-weight: 500;
    }

    .w-full {
      width: 100%;
    }

    button[type="submit"] {
      margin-top: 10px;
    }

    .register-link {
      margin-top: 20px;
      text-align: center;
    }

    .register-link p {
      color: #666;
      margin: 0;
    }

    .register-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }

    .register-link a:hover {
      text-decoration: underline;
    }
  `]
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
