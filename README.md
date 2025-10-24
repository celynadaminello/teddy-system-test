# Teste Front-End Teddy - Gestão de Clientes

Este projeto implementa o sistema de gerenciamento de clientes conforme os requisitos do teste, focando em uma arquitetura de micro-serviços (Build-Time Monorepo), qualidade de código e conformidade com as melhores práticas de desenvolvimento.

---

## 🚀 Requisitos e Tecnologias

- **Tecnologias:** TypeScript, React (v18/v19) + Vite, Zustand, Tailwind CSS, Axios.
- **Arquitetura:** Monorepo gerenciado por `npm workspaces`, onde cada funcionalidade é um pacote isolado (`design-system`, `shell`, `login`, etc.).
- **Deploy e CI:** Docker (configuração de produção) e Vercel.
- **Qualidade:** Testes Unitários (Vitest/RTL) e Testes End-to-End (Cypress).

## 🛠️ Estrutura do Monorepo

| Pacote             | Função                                                              | Dependências                      |
| :----------------- | :------------------------------------------------------------------ | :-------------------------------- |
| `shell`            | Container principal, roteamento, estado global (Zustand).           | Login, Client-List, Design-System |
| `design-system`    | Componentes de UI reutilizáveis (Button, Input, Modal, ClientCard). | -                                 |
| `login`            | Tela de autenticação e persistência de usuário.                     | Design-System, Shell              |
| `client-list`      | Tela principal de CRUD (Create, Read, Update, Delete) e Paginação.  | Design-System, Shell              |
| `selected-clients` | Visualização da lista de clientes selecionados.                     | Design-System, Shell              |

## 💻 Como Rodar Localmente

### Pré-requisitos

- Node.js (versão 18+ recomendada)
- NPM (versão 8+)
- Git

1.  **Instalação de Dependências (Na Raiz do Projeto):**

    ```bash
    npm install
    ```

2.  **Execução do Servidor de Desenvolvimento:**
    O aplicativo principal é o `shell`. Execute o servidor a partir da pasta dele:

    ```bash
    cd packages/shell
    npm run dev
    ```

    O servidor será iniciado em `http://localhost:5000` (ou a próxima porta livre).

3.  **Fluxo de Teste:** Acesse a URL. O nome digitado na tela de login será persistido via Local Storage (Zustand).

## 🐋 Executando com Docker

O `Dockerfile` é configurado para um build de produção multi-stage, usando o Nginx como servidor final.

1.  **Construir a Imagem (Na Raiz):**

    ```bash
    docker build -t teddy-app .
    ```

2.  **Executar o Container:**
    A aplicação ficará acessível na porta `8080` do seu host.
    ```bash
    docker run -p 8080:80 teddy-app
    ```
    _Acesse a aplicação em `http://localhost:8080`._

## 📁 Estrutura de Arquivos

```
teddy-system-test/
├── packages/
│   ├── shell/                 # Aplicação principal
│   ├── design-system/         # Componentes reutilizáveis
│   ├── login/                 # Módulo de autenticação
│   ├── client-list/           # CRUD de clientes
│   └── selected-clients/      # Lista de clientes selecionados
├── cypress/                   # Testes E2E
├── Dockerfile                 # Configuração Docker
├── nginx.conf                 # Configuração Nginx
└── package.json               # Configuração do workspace
```

## 🧪 Como Rodar os Testes

1.  **Testes Unitários (Lógica e UI):**

    * **Comando:** O comando na raiz executará os testes do Vitest em todos os pacotes (`shell`, `design-system`) que possuem um script `test` definido.
        ```bash
        npm test
        ```
    * _Os testes verificam os componentes do Design System e a lógica das Stores (Zustand)._

2.  **Testes End-to-End (E2E - Cypress):**

    Os testes E2E validam o fluxo completo do usuário no ambiente de navegador.

    a. **Inicie o Servidor Dev (Target):**
       Abra um terminal e inicie o aplicativo principal.
       ```bash
       cd packages/shell
       npm run dev
       ```

    b. **Abra a Interface de Testes (Na Raiz):**
       Abra uma **segunda aba** do terminal e, na raiz do projeto, inicie o Cypress.
       ```bash
       npm run test:e2e:open
       ```
    * *Siga o Cypress UI e clique no arquivo `client-workflow.cy.ts` para iniciar a simulação.*

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev                    # Inicia servidor de desenvolvimento
npm run build                  # Build de produção
npm run preview                # Preview do build

# Testes
npm test                       # Testes unitários
npm run test:e2e:open         # Abre interface Cypress
npm run test:e2e:run          # Executa testes E2E em modo headless

# Linting
npm run lint                   # Verifica código
npm run lint:fix              # Corrige problemas de linting
```

## 🐛 Troubleshooting

### Problemas Comuns

**Erro de porta já em uso:**

```bash
# Verificar processos usando a porta 5000
lsof -i :5000
# Matar processo se necessário
kill -9 <PID>
```

**Problemas com dependências:**

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

**Erro no Docker:**

```bash
# Rebuild da imagem sem cache
docker build --no-cache -t teddy-app .
```

---

## 🌐 Deploy na Vercel (URL de Acesso)

A aplicação está disponível publicamente na Vercel.

**URL da Aplicação:** [https://teddy-system-test-shell.vercel.app](https://teddy-system-test-shell.vercel.app)

## 📝 Licença

Este projeto é um teste técnico desenvolvido para avaliação de competências em desenvolvimento front-end.
