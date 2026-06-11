const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby5X-mvoti4GdsP4hyArQo_OA3QCDUmrLP7KOmkxAFuNAYa-3yt4mH9MPoxfpdVtxHE/exec';

// JSONP 호출 (Apps Script CORS 우회)
function callScriptAPI(params) {
  return new Promise((resolve, reject) => {
    const cbName = 'r37cb' + Date.now();
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error('timeout'));
    }, 10000);

    function cleanup() {
      delete window[cbName];
      const s = document.getElementById('_r37script');
      if (s) s.remove();
    }

    window[cbName] = (data) => {
      clearTimeout(timer);
      cleanup();
      resolve(data);
    };

    const qs = Object.entries(params)
      .map(([k, v]) => k + '=' + encodeURIComponent(v))
      .join('&');

    const script = document.createElement('script');
    script.id = '_r37script';
    script.onerror = () => { clearTimeout(timer); cleanup(); reject(new Error('load error')); };
    script.src = SCRIPT_URL + '?' + qs + '&callback=' + cbName;
    document.head.appendChild(script);
  });
}

// 모달 열기/닫기

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
  return y + '-' + m + '-' + day;
}

// 폼 제출

document.getElementById('runForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const date     = document.getElementById('runDate').value;
  const name     = document.getElementById('runName').value.trim();
  const distance = document.getElementById('runDist').value;
  const status   = document.getElementById('runStatus');
  const btn      = document.getElementById('runSubmit');

  if (!date || !name || !distance) return;

  btn.disabled = true;
  status.textContent = '저장 중...';
  status.className = 'run-form-status';

  callScriptAPI({ date, name, distance })
    .then((data) => {
      if (data.ok) {
        status.textContent = '✓ ' + data.msg;
        status.className = 'run-form-status ok';
        document.getElementById('runForm').reset();
        document.getElementById('runDate').value = todayString();
      } else {
        status.textContent = '✗ ' + data.msg;
        status.className = 'run-form-status err';
      }
    })
    .catch(() => {
      status.textContent = '✗ 연결 실패 — Apps Script 배포 URL을 확인해 주세요.';
      status.className = 'run-form-status err';
    })
    .finally(() => { btn.disabled = false; });
});

document.getElementById('btnRunLog').addEventListener('click', openRunModal);
document.getElementById('runClose').addEventListener('click', closeRunModal);
document.getElementById('runOverlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeRunModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeRunModal();
});
