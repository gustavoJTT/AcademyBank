# 🏦 AcademyBank

> Sistema de Gerenciamento de Cartões Virtuais - Plataforma bancária digital educacional

[![GitHub issues](https://img.shields.io/github/issues/gustavoJTT/AcademyBank)](https://github.com/gustavoJTT/AcademyBank/issues)
[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](https://github.com/gustavoJTT/AcademyBank)

---

## 📋 Índice

- [💡 Sobre o Projeto](#-sobre-o-projeto)
- [🎯 Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#️-tecnologias)
- [🚀 Como Executar](#-como-executar)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🗺️ Roadmap](#️-roadmap)

---

## 💡 Sobre o Projeto

O **AcademyBank** é um sistema completo de gerenciamento de cartões virtuais, desenvolvido com **Django REST Framework** no backend e **Angular** no frontend. O projeto demonstra uma arquitetura moderna de API RESTful integrada com interface responsiva.

> ⚠️ **Importante**: Este é um projeto educacional e não deve ser usado para transações financeiras reais.

### ✨ Principais Características

- **Backend RESTful**: API completa com Django REST Framework
- **Frontend Moderno**: Angular com standalone components e PrimeNG
- **CRUD Completo**: Criação, leitura, atualização e exclusão de cartões
- **Interface Responsiva**: UI moderna com componentes PrimeNG
- **Validações**: Validações no frontend e backend

---

## 🎯 Funcionalidades

### 💳 Gerenciamento de Cartões Virtuais

- ✅ Listagem de todos os cartões
- ➕ Criação de novos cartões virtuais
- ✏️ Edição de cartões existentes
- 🗑️ Remoção de cartões (com confirmação)
- 👁️ Visualização detalhada de cartões
- 🔄 Ativação/desativação de cartões
- 💰 Definição de limites personalizados
- 🔔 Notificações de sucesso/erro em tempo real

---

## 🛠️ Tecnologias

### Backend
- **Python 3.14**
- **Django 5.2.9**
- **Django REST Framework 3.16.1**
- **Django CORS Headers 4.9.0**
- **SQLite** (banco de dados)

### Frontend
- **Angular** (Standalone Components)
- **TypeScript**
- **PrimeNG** (componentes UI)
- **RxJS** (programação reativa)

---

## 🚀 Como Executar

### Método Rápido (Script Automatizado)

```bash
./start.sh
```

### Método Manual

#### Backend

1. Ative o ambiente virtual e inicie o servidor:
```bash
source env/bin/activate
cd backend/AcademyBank
python manage.py runserver
```

O backend estará disponível em `http://localhost:8000`

#### Frontend

2. Em outro terminal, inicie o frontend:
```bash
cd frontend
npm install  # primeira vez apenas
ng serve
```

O frontend estará disponível em `http://localhost:4200`

### 📚 Documentação Completa

Para instruções detalhadas de instalação, configuração e desenvolvimento, consulte o [SETUP.md](SETUP.md).

---

## 📁 Estrutura do Projeto
- 👥 Gerenciamento de usuários e contas
- 🔍 Auditoria e monitoramento de transações
- ⚙️ Configurações do sistema

---

## 🛠️ Tecnologias

### Frontend

- ![Angular](https://img.shields.io/badge/Angular-000000?style=flat&logo=Angular&logoColor=white) **Angular 20** - Framework para aplicações web
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white) **Tailwind CSS** - Framework CSS utilitário
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) **TypeScript** - Superset JavaScript tipado

### Backend

- ![Django](https://img.shields.io/badge/Django-092E20?style=flat&logo=django&logoColor=white) **Django REST Framework** - Framework web Python
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white) **PostgreSQL** - Banco de dados relacional
<!-- - ![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white) **Redis** - Cache e sessões -->

### DevOps & Ferramentas

<!-- - ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white) **Docker** - Containerização -->
- ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) **Git** - Controle de versão

---

## 📁 Estrutura do Projeto

```text
AcademyBank/
├── frontend/
├── backend/
├── docs/
└── README.md
```

---

## 🗺️ Roadmap

### 🎯 MVP (Versão 1.0)

- [x] ~~Configurar ambiente de desenvolvimento~~
- [ ] Implementar autenticação de usuários
- [ ] Criar sistema de contas bancárias
- [ ] Desenvolver funcionalidades de transferência
- [ ] Implementar painel administrativo básico

### 🚀 Versão 2.0

- [ ] Integração com gateways de pagamento
- [ ] Sistema de notificações push
- [ ] Aplicativo mobile (React Native)
- [ ] API pública para desenvolvedores

### 🔮 Futuro

- [ ] Inteligência artificial para detecção de fraudes
- [ ] Cartões virtuais
- [ ] Investimentos e renda fixa
- [ ] Open Banking

---

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Guidelines

- Siga os padrões de código estabelecidos
- Escreva testes para novas funcionalidades
- Atualize a documentação quando necessário

---

**Desenvolvido por [Gustavo JTT](https://github.com/gustavoJTT)**

⭐ Se este projeto te ajudou, considere dar uma estrela!
