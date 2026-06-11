/* ============================================================
   LINER CALCULATOR — JavaScript
   Calculator logic with full expression evaluation
   ============================================================ */

'use strict';

// ── State ──────────────────────────────────────────────────

const state = {
  current:     '0',       // Current display value (string)
  previous:    null,      // Previous operand (number)
  operator:    null,      // Pending operator: '+' '−' '×' '÷'
  waitingNext: false,     // Waiting for next operand input
  expression:  '',        // Display expression string
  justEvaled:  false,     // Did we just press '='?
};

// ── DOM References ─────────────────────────────────────────

const resultEl     = document.getElementById('result');
const expressionEl = document.getElementById('expression');
const allBtns      = document.querySelectorAll('.btn');
const opBtns       = document.querySelectorAll('.btn-op');

// ── Display Update ─────────────────────────────────────────

function updateDisplay(animate = false) {
  // Format number with commas (up to 12 significant digits)
  const formatted = formatNumber(state.current);
  resultEl.textContent = formatted;

  // Font size adapts to length
  const len = formatted.replace(/[,.-]/g, '').length;
  if (len <= 9)       resultEl.style.fontSize = '42px';
  else if (len <= 12) resultEl.style.fontSize = '32px';
  else                resultEl.style.fontSize = '24px';

  expressionEl.textContent = state.expression;

  if (animate) {
    resultEl.classList.remove('pop');
    void resultEl.offsetWidth; // reflow
    resultEl.classList.add('pop');
  }
}

function formatNumber(val) {
  if (val === 'Error') return 'Error';

  const num = parseFloat(val);
  if (isNaN(num)) return val;

  // Very large / very small → scientific notation
  if (Math.abs(num) >= 1e13 || (Math.abs(num) < 1e-6 && num !== 0)) {
    return num.toExponential(5).replace(/\.?0+e/, 'e');
  }

  // Split integer and decimal parts
  const [intPart, decPart] = val.split('.');
  const intFormatted = parseInt(intPart, 10).toLocaleString('en-US');

  if (decPart !== undefined) {
    return `${intFormatted}.${decPart}`;
  }
  return intFormatted;
}

// ── Actions ────────────────────────────────────────────────

function inputNumber(digit) {
  if (state.waitingNext) {
    state.current    = digit === '.' ? '0.' : digit;
    state.waitingNext = false;
  } else {
    if (state.justEvaled) {
      // Start fresh after '='
      state.current   = digit === '.' ? '0.' : digit;
      state.expression = '';
      state.justEvaled = false;
    } else {
      if (state.current.length >= 16) return; // cap input
      if (state.current === '0' && digit !== '.') {
        state.current = digit;
      } else {
        state.current += digit;
      }
    }
  }
  updateDisplay();
}

function inputDecimal() {
  if (state.waitingNext) {
    state.current    = '0.';
    state.waitingNext = false;
    updateDisplay();
    return;
  }
  if (state.justEvaled) {
    state.current    = '0.';
    state.expression = '';
    state.justEvaled  = false;
    updateDisplay();
    return;
  }
  if (!state.current.includes('.')) {
    state.current += '.';
    updateDisplay();
  }
}

function inputOperator(op) {
  // If there's a pending operator and we haven't started new input, chain
  if (state.operator && !state.waitingNext) {
    calculate(); // evaluate first
  }

  state.previous   = parseFloat(state.current);
  state.operator   = op;
  state.waitingNext = true;
  state.justEvaled  = false;

  // Update expression string
  state.expression = `${formatNumber(state.current)} ${op}`;
  updateDisplay();

  // Highlight active operator button
  highlightOperator(op);
}

function calculate() {
  if (state.operator === null || state.waitingNext) return;

  const a  = state.previous;
  const b  = parseFloat(state.current);
  let result;

  switch (state.operator) {
    case '+': result = a + b; break;
    case '−': result = a - b; break;
    case '×': result = a * b; break;
    case '÷':
      if (b === 0) {
        state.current    = 'Error';
        state.expression = '';
        state.operator   = null;
        state.waitingNext = false;
        resultEl.classList.add('error');
        updateDisplay(true);
        return;
      }
      result = a / b;
      break;
    default: return;
  }

  // Build expression for display
  state.expression = `${formatNumber(String(a))} ${state.operator} ${formatNumber(String(b))} =`;

  // Round to avoid floating point artifacts
  result = parseFloat(result.toPrecision(12));

  state.current    = String(result);
  state.previous   = null;
  state.operator   = null;
  state.waitingNext = false;
  state.justEvaled  = true;

  resultEl.classList.remove('error');
  clearOperatorHighlight();
  updateDisplay(true);
}

function clearAll() {
  state.current    = '0';
  state.previous   = null;
  state.operator   = null;
  state.waitingNext = false;
  state.expression = '';
  state.justEvaled  = false;
  resultEl.classList.remove('error');
  clearOperatorHighlight();
  updateDisplay();
}

function toggleSign() {
  if (state.current === '0' || state.current === 'Error') return;
  const num = parseFloat(state.current);
  state.current = String(num * -1);
  updateDisplay();
}

function applyPercent() {
  if (state.current === 'Error') return;
  const num = parseFloat(state.current);
  if (state.previous !== null && state.operator) {
    // Relative percent: e.g., 200 + 10% → 200 + 20
    state.current = String((state.previous * num) / 100);
  } else {
    state.current = String(num / 100);
  }
  updateDisplay();
}

// ── Operator Highlight ─────────────────────────────────────

function highlightOperator(op) {
  clearOperatorHighlight();
  opBtns.forEach(btn => {
    if (btn.dataset.value === op) btn.classList.add('active-op');
  });
}

function clearOperatorHighlight() {
  opBtns.forEach(btn => btn.classList.remove('active-op'));
}

// ── Button Press Animation ─────────────────────────────────

function pressAnim(btn) {
  btn.classList.add('pressed');
  btn.addEventListener('animationend', () => btn.classList.remove('pressed'), { once: true });
}

// ── Event Delegation (click) ───────────────────────────────

document.getElementById('calculator').addEventListener('click', e => {
  const btn = e.target.closest('.btn');
  if (!btn) return;

  pressAnim(btn);

  const { action, value } = btn.dataset;

  switch (action) {
    case 'number':   inputNumber(value);   break;
    case 'decimal':  inputDecimal();       break;
    case 'operator': inputOperator(value); break;
    case 'equals':   calculate();          break;
    case 'clear':    clearAll();           break;
    case 'sign':     toggleSign();         break;
    case 'percent':  applyPercent();       break;
  }
});

// ── Keyboard Support ──────────────────────────────────────

const keyMap = {
  '0': () => inputNumber('0'),
  '1': () => inputNumber('1'),
  '2': () => inputNumber('2'),
  '3': () => inputNumber('3'),
  '4': () => inputNumber('4'),
  '5': () => inputNumber('5'),
  '6': () => inputNumber('6'),
  '7': () => inputNumber('7'),
  '8': () => inputNumber('8'),
  '9': () => inputNumber('9'),
  '.': () => inputDecimal(),
  ',': () => inputDecimal(),
  '+': () => inputOperator('+'),
  '-': () => inputOperator('−'),
  '*': () => inputOperator('×'),
  '/': () => inputOperator('÷'),
  'Enter': () => calculate(),
  '=': () => calculate(),
  'Escape': () => clearAll(),
  'Backspace': () => {
    if (state.current === 'Error' || state.waitingNext || state.justEvaled) return;
    if (state.current.length === 1 || (state.current.length === 2 && state.current[0] === '-')) {
      state.current = '0';
    } else {
      state.current = state.current.slice(0, -1);
    }
    updateDisplay();
  },
  '%': () => applyPercent(),
};

document.addEventListener('keydown', e => {
  if (keyMap[e.key]) {
    e.preventDefault();
    keyMap[e.key]();

    // Visually flash matching button
    allBtns.forEach(btn => {
      const val = btn.dataset.value;
      const action = btn.dataset.action;
      if (
        (action === 'number'   && val === e.key) ||
        (action === 'decimal'  && (e.key === '.' || e.key === ',')) ||
        (action === 'equals'   && (e.key === '=' || e.key === 'Enter')) ||
        (action === 'clear'    && e.key === 'Escape') ||
        (action === 'percent'  && e.key === '%') ||
        (action === 'operator' && (
          (val === '+'  && e.key === '+') ||
          (val === '−'  && e.key === '-') ||
          (val === '×'  && e.key === '*') ||
          (val === '÷'  && e.key === '/')
        ))
      ) {
        pressAnim(btn);
      }
    });
  }
});

// ── Init ──────────────────────────────────────────────────

updateDisplay();
