# Estrutura do Projeto

Este repositório contém um projeto que é dividido em duas partes principais: `API` e `PWA`. Abaixo está a estrutura detalhada do projeto.

## Estrutura do Projeto

Projeto
├── .gitignore
├── API/
│   ├── app.js
│   ├── bin/
│   │   └── www
│   ├── package.json
│   ├── public/
│   │   └── stylesheets/
│   │       └── style.css
│   ├── routes/
│   │   ├── index.js
│   │   ├── pushnotification.js
│   │   └── users.js
│   └── views/
│       ├── error.ejs
│       └── index.ejs
├── PWA/
│   ├── .env
│   ├── index.html
│   ├── LICENSE.txt
│   ├── package.json
│   ├── public/
│   │   ├── assets/
│   │   ├── manifest.json
│   │   └── staticwebapp.config.json
│   ├── sw.js
│   ├── widget/
│   │   ├── ac.json
│   │   └── data.json
│   ├── README.md
│   ├── src/
│   │   ├── app-index.ts
│   │   ├── components/
│   │   │   ├── header.ts
│   │   │   └── twilio.ts
│   │   ├── pages/
│   │   │   ├── app-about/
│   │   │   │   ├── about-styles.ts
│   │   │   │   └── app-about.ts
│   │   │   └── app-home.ts
│   │   ├── router.ts
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   └── shared-styles.ts
│   │   ├── swa-cli.config.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts


## Descrição dos Diretórios e Arquivos

### API/
- **app.js**: Configuração principal do servidor Express.
- **bin/www**: Script para iniciar o servidor.
- **package.json**: Dependências e scripts do projeto.
- **public/stylesheets/style.css**: Estilos CSS públicos.
- **routes/**: Rotas da aplicação.
  - **index.js**: Rota principal.
  - **pushnotification.js**: Rota para notificações push.
  - **users.js**: Rota para usuários.
- **views/**: Templates EJS.
  - **error.ejs**: Template de erro.
  - **index.ejs**: Template da página inicial.

### PWA/
- **.env**: Variáveis de ambiente.
- **index.html**: Página principal do PWA.
- **LICENSE.txt**: Licença do projeto.
- **package.json**: Dependências e scripts do projeto.
- **public/**: Arquivos públicos.
  - **assets/**: Recursos estáticos.
  - **manifest.json**: Manifesto do PWA.
  - **staticwebapp.config.json**: Configuração do aplicativo web estático.
  - **sw.js**: Service Worker.
  - **widget/**: Arquivos de configuração do widget.
    - **ac.json**: Configuração do Adaptive Card.
    - **data.json**: Dados do widget.
- **README.md**: Documentação do projeto.
- **src/**: Código-fonte do PWA.
  - **app-index.ts**: Componente principal do aplicativo.
  - **components/**: Componentes reutilizáveis.
    - **header.ts**: Componente de cabeçalho.
    - **twilio.ts**: Integração com Twilio.
  - **pages/**: Páginas do aplicativo.
    - **app-about/**: Página "Sobre".
      - **about-styles.ts**: Estilos da página "Sobre".
      - **app-about.ts**: Componente da página "Sobre".
    - **app-home.ts**: Página inicial.
  - **router.ts**: Configuração do roteador.
  - **styles/**: Estilos globais e compartilhados.
    - **global.css**: Estilos globais.
    - **shared-styles.ts**: Estilos compartilhados.
- **swa-cli.config.json**: Configuração do Azure Static Web Apps CLI.
- **tsconfig.json**: Configuração do TypeScript.
- **vite.config.ts**: Configuração do Vite.

## Como Executar

### API
1. Navegue até o diretório `API`.
2. Instale as dependências: `npm install`.
3. Inicie o servidor: `npm start`.

### PWA
1. Navegue até o diretório `PWA`.
2. Instale as dependências: `npm install`.
3. Inicie o servidor de desenvolvimento: `npm run dev`.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE.txt](PWA/LICENSE.txt) para mais detalhes.