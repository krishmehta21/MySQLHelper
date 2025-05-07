# 🧠 Speak SQL Easily

A user-friendly web app that translates natural language queries into SQL using an NLP model. Built with **React**, **Tailwind CSS**, and **Vite**, it provides a beautiful interface and custom syntax-highlighted SQL output with clipboard support.

## ✨ Features

- 🧾 Translate natural language to SQL queries
- 🎨 SQL syntax highlighting
- 📋 Copy generated SQL to clipboard
- 🌙 Dark mode support
- ⚡ Fast performance with Vite
- 💄 Styled with Tailwind CSS + ShadCN components

## 🚀 Demo

**Local**: http://localhost:8080  
**Network**: http://<your-ip>:8080

## 🛠 Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS
- **Build Tool:** Vite
- **Styling Framework:** Tailwind + ShadCN/UI
- **Syntax Highlighting:** Custom inline HTML-based approach
- **Clipboard API:** Native browser support

## 📦 Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/your-username/speak-sql-easily.git
cd speak-sql-easily
npm install
````

## 🧪 Run the App

```bash
npm run dev
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

## 🖌️ Customize Tailwind Theme

Color variables are defined in `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    ...
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    ...
  }

  body {
    @apply bg-background text-foreground;
  }
}
```

## 📁 Folder Structure

```
speak-sql-easily/
├── src/
│   ├── components/    # Custom components (e.g., CodeBlock)
│   ├── pages/         # Main pages (e.g., Index.tsx)
│   ├── lib/           # Utility functions (e.g., classNames)
│   ├── index.css      # Tailwind CSS setup and variables
│   └── main.tsx       # Entry point
├── public/
├── index.html
├── package.json
└── vite.config.ts
```

## 🛡️ Security Notes

If you see vulnerabilities during install, you can fix them using:

```bash
npm audit fix
```

## 📋 To-Do

* [ ] Add API backend for NLP model (T5 from Hugging Face)
* [ ] Support for multiple SQL dialects
* [ ] Add theme toggle switch (light/dark)
* [ ] Add recent query history

## 🧠 Credits

* Inspired by SQL translators like OpenAI Codex and Hugging Face T5.
* UI inspired by modern developer dashboards using Tailwind and ShadCN.




