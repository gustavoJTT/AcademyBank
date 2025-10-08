# 🚀 Como Executar o AcademyBank

Este guia mostra como configurar e executar o projeto AcademyBank em seu ambiente local.

## 📋 Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** (v18 ou superior) - [Download](https://nodejs.org/)
- **Python** (v3.9 ou superior) - [Download](https://python.org/)
- **PostgreSQL** - [Download](https://postgresql.org/)
- **Git** - [Download](https://git-scm.com/)

## ⚡ Início Rápido

### 1. Clone e configure o projeto

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd AcademyBank

# Instale as dependências
npm install
```

### 2. Execute um arquivo de exemplo

```bash
# Execute o arquivo de estudos
npm run dev:code

# Ou execute diretamente
npx ts-node estudos/code.ts
```

## 🔧 Configuração Completa

### Frontend (Next.js)

```bash
# 1. Navegue para o frontend
cd frontend

# 2. Instale dependências
npm install

# 3. Configure variáveis de ambiente
cp .env.example .env.local
# Edite o arquivo .env.local com suas configurações

# 4. Execute o servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em: `http://localhost:3000`

### Backend (Django)

```bash
# 1. Navegue para o backend
cd backend

# 2. Crie ambiente virtual
python -m venv venv

# 3. Ative o ambiente virtual
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# 4. Instale dependências Python
pip install -r requirements.txt

# 5. Configure banco de dados
python manage.py migrate

# 6. Crie superusuário (opcional)
python manage.py createsuperuser

# 7. Execute o servidor
python manage.py runserver
```

O backend estará disponível em: `http://localhost:8000`

## 🧪 Executando Testes

### Testes TypeScript/Jest

```bash
# Todos os testes
npm test

# Testes em modo watch (reexecuta ao salvar)
npm run test:watch

# Testes com relatório de cobertura
npm run test:coverage

# Teste específico
npx jest caminho/para/arquivo.test.ts
```

### Testes Python/Django

```bash
# No diretório backend/
cd backend

# Todos os testes
python manage.py test

# Testes específicos
python manage.py test accounts.tests
```

## 📂 Executando Arquivos Individuais

### Arquivos TypeScript

```bash
# Qualquer arquivo .ts
npx ts-node caminho/para/arquivo.ts

# Exemplo: arquivo de estudos
npx ts-node estudos/code.ts
npx ts-node estudos/outro-arquivo.ts
```

### Arquivos Python

```bash
# No ambiente virtual ativo
python caminho/para/arquivo.py

# Exemplo: scripts do Django
cd backend
python manage.py shell
```

## 🛠️ Scripts Disponíveis

### Scripts do Projeto Principal

| Comando | Descrição |
|---------|-----------|
| `npm test` | Executa testes Jest |
| `npm run test:watch` | Testes em modo watch |
| `npm run test:coverage` | Testes com cobertura |
| `npm run dev:code` | Executa arquivo de estudos |
| `npm run build` | Compila TypeScript |

### Scripts do Frontend

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | Verificação de código |

### Comandos do Backend

| Comando | Descrição |
|---------|-----------|
| `python manage.py runserver` | Servidor de desenvolvimento |
| `python manage.py migrate` | Aplicar migrações |
| `python manage.py test` | Executar testes |
| `python manage.py shell` | Shell interativo |

## 🐛 Resolução de Problemas

### Erro: "command not found"

```bash
# Verifique se o Node.js está instalado
node --version
npm --version

# Verifique se o Python está instalado
python --version
python3 --version
```

### Erro: "Module not found"

```bash
# Reinstale as dependências
rm -rf node_modules package-lock.json
npm install

# Para Python
pip install -r requirements.txt
```

### Erro: "Port already in use"

```bash
# Matar processo na porta 3000 (frontend)
lsof -ti:3000 | xargs kill -9

# Matar processo na porta 8000 (backend)
lsof -ti:8000 | xargs kill -9
```

### Problemas com TypeScript

```bash
# Limpar cache do TypeScript
npx tsc --build --clean

# Verificar configuração
npx tsc --noEmit
```

## 🔄 Workflow de Desenvolvimento

1. **Inicie o backend**: `cd backend && python manage.py runserver`
2. **Inicie o frontend**: `cd frontend && npm run dev`
3. **Execute testes**: `npm test`
4. **Teste arquivos individuais**: `npx ts-node arquivo.ts`

## 📁 Estrutura para Execução

```
AcademyBank/
├── backend/          # Django - porta 8000
├── frontend/         # Next.js - porta 3000
├── estudos/          # Arquivos TypeScript para estudos
├── package.json      # Scripts principais
└── EXECUTAR.md       # Este arquivo
```

## 🚀 Próximos Passos

Após executar o projeto:

1. Acesse `http://localhost:3000` para o frontend
2. Acesse `http://localhost:8000/admin` para o admin do Django
3. Veja a [documentação completa](README.md) para mais detalhes
4. Explore os [casos de uso](docs/casos-de-uso.md)

---

**Dica**: Mantenha sempre o ambiente virtual do Python ativo ao trabalhar com o backend!
