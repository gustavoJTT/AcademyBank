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
  selector: 'app-register-page',
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
    <div class="register-container">
      <div class="register-card">
        <h1>Academy Bank</h1>
        <h2>Cadastro</h2>

        <form (ngSubmit)="onRegister()" #registerForm="ngForm">
          <div class="form-group">
            <label for="username">Usuário</label>
            <input
              pInputText
              id="username"
              name="username"
              [(ngModel)]="userData.username"
              required
              placeholder="Digite seu usuário"
              class="w-full"
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              pInputText
              type="email"
              id="email"
              name="email"
              [(ngModel)]="userData.email"
              required
              placeholder="Digite seu email"
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
              [(ngModel)]="userData.password"
              required
              placeholder="Digite sua senha"
              class="w-full"
            />
          </div>

          <div class="form-group">
            <label for="password2">Confirmar Senha</label>
            <input
              pInputText
              type="password"
              id="password2"
              name="password2"
              [(ngModel)]="userData.password2"
              required
              placeholder="Confirme sua senha"
              class="w-full"
            />
          </div>

          <button
            pButton
            type="submit"
            label="Cadastrar"
            [disabled]="!registerForm.valid || isLoading"
            [loading]="isLoading"
            class="w-full"
          ></button>
        </form>

        <div class="login-link">
          <p>Já tem uma conta? <a routerLink="/login">Faça login</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .register-card {
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

    .login-link {
      margin-top: 20px;
      text-align: center;
    }

    .login-link p {
      color: #666;
      margin: 0;
    }

    .login-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }

    .login-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class RegisterPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  userData = {
    username: '',
    email: '',
    password: '',
    password2: ''
  };

  isLoading = false;

  onRegister(): void {
    if (this.userData.password !== this.userData.password2) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'As senhas não coincidem'
      });
      return;
    }

    this.isLoading = true;
    this.authService.register(this.userData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Cadastro realizado com sucesso!'
        });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao realizar cadastro. Tente novamente.'
        });
        this.isLoading = false;
      }
    });
  }
}
