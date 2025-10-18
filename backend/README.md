# Backend - Sistema de Gerenciamento de Tarefas

API RESTful desenvolvida com NestJS, Prisma ORM e SQLite para gerenciamento de tarefas com autenticação JWT.

## 🚀 Tecnologias

- **Framework**: NestJS
- **ORM**: Prisma
- **Banco de Dados**: SQLite
- **Autenticação**: JWT

## 📁 Estrutura do Projeto

```
backend/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   └── migrations/            # Migrações do banco
├── src/
│   ├── modules/
│   │   ├── auth/             # Módulo de autenticação
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   └── dtos/
│   │   ├── users/            # Módulo de usuários
│   │   │   ├── users.controller.ts
│   │   │   └── users.service.ts
│   │   └── tasks/            # Módulo de tarefas
│   │       ├── tasks.controller.ts
│   │       ├── tasks.service.ts
│   │       └── dtos/
│   ├── prisma/               # Serviço do Prisma
│   ├── core/                 # Configurações e entidades
│   ├── app.module.ts         # Módulo principal
│   └── main.ts               # Ponto de entrada
├── .env                      # Variáveis de ambiente
└── package.json
```

## ⚙️ Configuração

### 1. Clone o repositório

```powershell
git clone https://github.com/luhelenals/task-app-web.git
cd task-app-web/backend
```

### 2. Instale as dependências

```powershell
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `backend/.env` na raiz do projeto com as seguintes variáveis (ajuste conforme necessário):

```env
DATABASE_URL="file:./tasks.db"
JWT_SECRET="sua-chave-secreta-aqui"
```

### 3. Configure o banco de dados

Execute as migrações do Prisma para criar o banco de dados:

```powershell
npx prisma migrate dev
```

## 🏃 Executando o Projeto

### Modo desenvolvimento (com hot-reload)

```powershell
npm run start:dev
```

A API estará disponível em `http://localhost:3000`

## 📡 Endpoints da API

### Autenticação

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/auth/signup` | Cadastrar novo usuário | Não |
| POST | `/auth/signin` | Login de usuário | Não |

### Usuários

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/users/:id` | Obter usuário | Sim (JWT) |
| PUT | `/users/:id` | Atualizar usuário | Sim (JWT) |
| DELETE | `/users/:id` | Deletar usuário | Sim (JWT) |

### Tarefas

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/tasks` | Listar todas as tarefas do usuário | Sim (JWT) |
| GET | `/tasks/:id` | Buscar tarefa por ID | Sim (JWT) |
| POST | `/tasks` | Criar nova tarefa | Sim (JWT) |
| PUT | `/tasks/:id` | Atualizar tarefa | Sim (JWT) |
| DELETE | `/tasks/:id` | Deletar tarefa | Sim (JWT) |

## 📝 Exemplos de Requisições

### 1. Cadastrar novo usuário

**POST** `http://localhost:3000/auth/signup`

```json
{
  "email": "usuario@example.com",
  "password": "senha12345"
}
```

### 2. Login

**POST** `http://localhost:3000/auth/signin`

```json
{
  "email": "usuario@example.com",
  "password": "senha12345"
}
```

### 3. Criar tarefa

**POST** `http://localhost:3000/tasks`

**Headers:**
```
Authorization: Bearer <SEU_TOKEN_JWT>
```

**Body:**
```json
{
  "titulo": "Estudar NestJS",
  "descricao": "Aprender sobre módulos e providers",
  "status": "PENDENTE"
}
```

### 4. Listar todas as tarefas

**GET** `http://localhost:3000/tasks`

**Headers:**
```
Authorization: Bearer <SEU_TOKEN_JWT>
```

### 5. Buscar tarefa por ID

**GET** `http://localhost:3000/tasks/1`

**Headers:**
```
Authorization: Bearer <SEU_TOKEN_JWT>
```

### 6. Atualizar tarefa

**PUT** `http://localhost:3000/tasks/1`

**Headers:**
```
Authorization: Bearer <SEU_TOKEN_JWT>
```

**Body (exemplo):**
```json
{
  "titulo": "Estudar NestJS - Atualizado",
  "status": "EM_ANDAMENTO"
}
```

### 7. Deletar tarefa

**DELETE** `http://localhost:3000/tasks/1`

**Headers:**
```
Authorization: Bearer <SEU_TOKEN_JWT>
```

## 📌 Status de Tarefas

As tarefas podem ter os seguintes status:

- `PENDENTE` - Tarefa ainda não iniciada
- `EM_ANDAMENTO` - Tarefa em progresso
- `CONCLUIDA` - Tarefa finalizada

## 🔒 Segurança

- As senhas são criptografadas com bcrypt antes de serem armazenadas
- Autenticação JWT com expiração de 1 hora
- Usuários só podem editar/deletar suas próprias tarefas e perfil
- Validação de dados com class-validator
