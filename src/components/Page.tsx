// src/components/Page.tsx
import { getMonthlyPage } from "../getMonthlyPage";
import { html, raw } from "hono/html";

const formatDate = (date: Date): string => {
  return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}`;
};

const formatDisplayDate = (date: Date): string => {
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
};

const copyScript = raw(`
  function copyToClipboard() {
    const textarea = document.getElementById('monthpage');
    const btn = document.getElementById('copyBtn');
    const toast = document.getElementById('toast');

    navigator.clipboard.writeText(textarea.value).then(() => {
      // ボタンを成功状態に
      btn.classList.add('btn-success');
      btn.innerHTML = '<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>コピーしました';

      // トーストを表示
      toast.classList.add('show');

      // 2秒後に元に戻す
      setTimeout(() => {
        btn.classList.remove('btn-success');
        btn.innerHTML = '<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>コピー';
        toast.classList.remove('show');
      }, 2000);
    });
  }
`);

export const MonthPage = (date: Date) => {
  const monthText = getMonthlyPage(date);

  const prevDateStr = formatDate(
    new Date(date.getFullYear(), date.getMonth() - 1)
  );
  const nextDateStr = formatDate(
    new Date(date.getFullYear(), date.getMonth() + 1)
  );

  return (
    <div class="container">
      <div class="card">
        <header class="header">
          <h1 class="title">{formatDisplayDate(date)}</h1>
          <nav class="nav">
            <a href={`/?date=${prevDateStr}`} class="nav-link">
              ← 前月
            </a>
            <span class="nav-separator">|</span>
            <a href={`/?date=${nextDateStr}`} class="nav-link">
              翌月 →
            </a>
          </nav>
        </header>

        <div class="content">
          <textarea id="monthpage" class="textarea" readOnly>
            {monthText}
          </textarea>
        </div>

        <div class="actions">
          {html`
            <button id="copyBtn" class="btn btn-primary" onclick="copyToClipboard()">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              コピー
            </button>
          `}
        </div>
      </div>

      <div id="toast" class="toast">クリップボードにコピーしました</div>

      <script>{copyScript}</script>
    </div>
  );
};
