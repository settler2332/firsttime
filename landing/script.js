const html = document.documentElement;
const btn = document.getElementById('themeToggle');

function applyTheme(theme) {
  html.dataset.theme = theme;
  btn.textContent = theme === 'light' ? 'DARK' : 'LIGHT';
  localStorage.setItem('theme', theme);
}

btn.addEventListener('click', () => {
  applyTheme(html.dataset.theme === 'light' ? 'dark' : 'light');
});

// inline script가 이미 data-theme를 설정했으므로 버튼 라벨만 초기화
const current = html.dataset.theme || 'dark';
btn.textContent = current === 'light' ? 'DARK' : 'LIGHT';
