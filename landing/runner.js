// ── Apps Script 배포 URL ──
// Code.gs를 배포한 후 아래 URL을 교체하세요.
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby5X-mvoti4GdsP4hyArQo_OA3QCDUmrLP7KOmkxAFuNAYa-3yt4mH9MPoxfpdVtxHE/exec';

// ── 모달 열기/닫기 ──

function openRunModal() {
  document.getElementById('runDate').value = todayString();
  document.getElementById('runStatus').textContent = '';
  document.getElementById('runStatus').className = 'run-form-status';
  document.getElementById('runOverlay').classList.add('is-open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('runName').focus(), 200);
}

function closeRunModal() {
  document.getElementById('runOverlay').classList.remove('is-open');
  document.body.style.overflow = '';
}

function todayString() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// ── 폼 제출 ──

document.getElementById('runForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const date = document.getElementById('runDate').value;
  const name = document.getElementById('runName').value.trim();
  const distance = document.getElementById('runDist').value;
  const status = document.getElementById('runStatus');
  const btn = document.getElementById('runSubmit');

  if (!date || !name || !distance) return;

  if (SCRIPT_URL === 'YOUR_APPS_SCRIPT_URL') {
    status.textContent = '⚠ Apps Script URL을 설정해 주세요. (runner.js 참고)';
    status.className = 'run-form-status err';
    return;
  }

  btn.disabled = true;
  status.textContent = '저장 중...';
  status.className = 'run-form-status';

  try {
    const url = `${SCRIPT_URL}?date=${encodeURIComponent(date)}&name=${encodeURIComponent(name)}&distance=${encodeURIComponent(distance)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.ok) {
      status.textContent = '✓ ' + data.msg;
      status.className = 'run-form-status ok';
      document.getElementById('runForm').reset();
      document.getElementById('runDate').value = todayString();
    } else {
      status.textContent = '✗ ' + data.msg;
      status.className = 'run-form-status err';
    }
  } catch (err) {
    status.textContent = '✗ 네트워크 오류 — 잠시 후 다시 시도해 주세요.';
    status.className = 'run-form-status err';
  } finally {
    btn.disabled = false;
  }
});

// ── 이벤트 연결 ──

document.getElementById('btnRunLog').addEventListener('click', openRunModal);
document.getElementById('runClose').addEventListener('click', closeRunModal);
document.getElementById('runOverlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeRunModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeRunModal();
});
