# pollyglotApp

PollyGlot is a lightweight web app for quick text translation into French, Spanish, and Japanese with a simple chat-like UI.

## Screenshot
![PollyGlot screenshot](/screenshot.png)

## Features
- Translate text into French, Spanish, or Japanese
- Simple chat-style rendered translations
- Language selection via accessible radio buttons with flag icons
- Responsive layout and accessible form controls
- Reset conversation button

## Technologies
- HTML5
- Tailwind CSS (utility classes used in markup)
- TypeScript (src/main.ts)
- Vanilla JavaScript modules (ESM)
- Static assets: SVG icons and images

## Live Site
A deployed version can be linked here. Replace the URL with your production site:
https://yourdomain.example.com

## Local setup

Prerequisites
- Node.js (16+) and npm installed

Quick start
1. Clone the repo:
   git clone https://github.com/Achigyus/pollyglotApp.git
2. Enter the project folder:
   cd pollyglotApp
3. Install dependencies:
   npm install
4. Start the dev server:
   npm run dev
5. Open the app in the browser (the dev server output will show the URL, e.g. http://localhost:5173)

Build for production
- npm run build
- Serve the `dist/` folder with a static server.

If your project does not include npm scripts, run a simple static server (e.g. `npx serve .`) or open `index.html` in a browser for basic testing.

## Contributing (via Pull Request)
1. Fork the repository.
2. Create a branch: `git checkout -b feat/your-feature`
3. Make changes with clear commits:
   - Use descriptive commit messages.
4. Push to your fork: `git push origin feat/your-feature`
5. Open a Pull Request against the `main` branch and include:
   - Short description of the change
   - Screenshots or animated GIFs if UI changes
   - Any migration or setup notes
6. Address review comments; maintainers will merge after CI and review.

## License
MIT License