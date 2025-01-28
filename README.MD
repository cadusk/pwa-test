# Project Structure

This repository contains a project divided into two main parts: API and PWA. Below is the detailed project structure.

## Project Structure
```
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
```

## Directory and File Descriptions

### API/
- **`app.js`**: Main configuration for the Express server.
- **`bin/www`**: Script to start the server.
- **`package.json`**: Project dependencies and scripts.
- **`public/stylesheets/style.css`**: Public CSS styles.
- **`routes/`**: Application routes.
  - **`index.js`**: Main route.
  - **`pushnotification.js`**: Route for push notifications.
  - **`users.js`**: Route for user management.
- **`views/`**: EJS templates.
  - **`error.ejs`**: Error template.
  - **`index.ejs`**: Home page template.

### PWA/
- **`.env`**: Environment variables.
- **`index.html`**: Main page of the PWA.
- **`LICENSE.txt`**: Project license.
- **`package.json`**: Project dependencies and scripts.
- **`public/`**: Public files.
  - **`assets/`**: Static resources.
  - **`manifest.json`**: PWA manifest.
  - **`staticwebapp.config.json`**: Static web app configuration.
- **`sw.js`**: Service Worker.
- **`widget/`**: Widget configuration files.
  - **`ac.json`**: Adaptive Card configuration.
  - **`data.json`**: Widget data.
- **`README.md`**: Project documentation.
- **`src/`**: PWA source code.
  - **`app-index.ts`**: Main app component.
  - **`components/`**: Reusable components.
    - **`header.ts`**: Header component.
    - **`twilio.ts`**: Twilio integration.
  - **`pages/`**: Application pages.
    - **`app-about/`**: "About" page.
      - **`about-styles.ts`**: Styles for the "About" page.
      - **`app-about.ts`**: "About" page component.
    - **`app-home.ts`**: Home page.
  - **`router.ts`**: Router configuration.
  - **`styles/`**: Global and shared styles.
    - **`global.css`**: Global styles.
    - **`shared-styles.ts`**: Shared styles.
  - **`swa-cli.config.json`**: Azure Static Web Apps CLI configuration.
  - **`tsconfig.json`**: TypeScript configuration.
  - **`vite.config.ts`**: Vite configuration.

## How to Run

### API
1. Navegue até o diretório `API`.
2. Instale as dependências: `npm install`.
3. Start the server: `npm start`.

### PWA
1. Navigate to the PWA directory. `PWA`.
2. Install dependencies: `npm install`.
3. Start the dev server: `npm run dev`.

## License

This project is licensed under the MIT License. See the LICENSE.txt file for more details.
