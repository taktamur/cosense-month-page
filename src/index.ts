// src/index.ts
import { Hono } from "hono";
import { html } from "hono/html";
import { MonthPage } from "./components/Page";

const app = new Hono();

function parseDate(date: string): Date {
  const year = parseInt(date.slice(0, 4));
  const month = parseInt(date.slice(4, 6));
  return new Date(year, month - 1);
}

const styles = `
  :root {
    --color-bg: #fafafa;
    --color-surface: #ffffff;
    --color-text: #1a1a1a;
    --color-text-secondary: #666666;
    --color-primary: #2563eb;
    --color-primary-hover: #1d4ed8;
    --color-border: #e5e7eb;
    --color-success: #22c55e;
    --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
    --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
    --radius: 8px;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    background: var(--color-bg);
    color: var(--color-text);
    line-height: 1.6;
    min-height: 100vh;
    padding: 2rem 1rem;
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
  }

  .card {
    background: var(--color-surface);
    border-radius: var(--radius);
    box-shadow: var(--shadow-md);
    padding: 1.5rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--color-border);
  }

  .title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-text);
  }

  .nav {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .nav-link {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: var(--radius);
    transition: background 0.2s;
  }

  .nav-link:hover {
    background: rgba(37, 99, 235, 0.1);
  }

  .nav-separator {
    color: var(--color-text-secondary);
  }

  .content {
    margin-bottom: 1rem;
  }

  .textarea {
    width: 100%;
    min-height: 400px;
    padding: 1rem;
    font-family: "SF Mono", Monaco, "Cascadia Code", monospace;
    font-size: 0.875rem;
    line-height: 1.5;
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    resize: vertical;
    background: var(--color-bg);
    color: var(--color-text);
  }

  .textarea:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  .actions {
    display: flex;
    gap: 0.5rem;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-primary {
    background: var(--color-primary);
    color: white;
  }

  .btn-primary:hover {
    background: var(--color-primary-hover);
  }

  .btn-success {
    background: var(--color-success);
    color: white;
  }

  .toast {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: var(--color-text);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius);
    font-size: 0.875rem;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
  }

  .toast.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }

  .icon {
    width: 1rem;
    height: 1rem;
  }

  @media (max-width: 640px) {
    body {
      padding: 1rem 0.5rem;
    }

    .card {
      padding: 1rem;
    }

    .header {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }

    .textarea {
      min-height: 300px;
      font-size: 0.8rem;
    }
  }
`;

app.get("/", (c) => {
  const dateStr = c.req.query("date");
  const date = dateStr ? parseDate(dateStr) : new Date();
  return c.html(html`<!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cosense Month Page Generator</title>
        <style>${styles}</style>
      </head>
      <body>
        ${MonthPage(date)}
      </body>
    </html>`);
});

export default app;
