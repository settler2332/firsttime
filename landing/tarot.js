const TAROT = [
  {
    num: '0', name: '바보',
    past: '아무 걱정 없이 내딛었던 첫걸음이 지금의 당신을 만들었습니다.',
    present: '두려움을 내려놓고 새로운 여정에 뛰어들 때입니다.',
    future: '예상치 못한 자유로운 길이 당신 앞에 펼쳐질 것입니다.',
  },
  {
    num: 'I', name: '마법사',
    past: '당신의 의지와 재능이 현재 상황의 초석이 되었습니다.',
    present: '모든 도구가 준비되어 있습니다. 지금 실행에 옮기세요.',
    future: '강한 집중력으로 원하는 것을 현실로 만들 수 있습니다.',
  },
  {
    num: 'II', name: '여사제',
    past: '직관과 내면의 목소리가 당신을 여기까지 이끌었습니다.',
    present: '숨겨진 진실에 귀를 기울이고 내면의 지혜를 신뢰하세요.',
    future: '비밀이 밝혀지고 깊은 통찰이 새로운 길을 열 것입니다.',
  },
  {
    num: 'III', name: '여황제',
    past: '풍요로운 환경이 당신을 성장시키고 길러주었습니다.',
    present: '창의성과 풍요로움이 당신 안에서 피어나고 있습니다.',
    future: '풍성한 결실이 가까이 다가오고 있습니다.',
  },
  {
    num: 'IV', name: '황제',
    past: '강한 기반과 질서가 오늘의 안정을 만들어 주었습니다.',
    present: '리더십을 발휘하고 주도적으로 상황을 통제하세요.',
    future: '구조와 권위를 통해 원하는 목표를 달성할 것입니다.',
  },
  {
    num: 'V', name: '교황',
    past: '전통과 가르침이 당신의 가치관을 형성했습니다.',
    present: '믿음직한 조언자를 찾거나 지혜를 나누는 시간입니다.',
    future: '정신적 지도와 가르침이 새로운 길을 열어줄 것입니다.',
  },
  {
    num: 'VI', name: '연인들',
    past: '중요한 선택이 지금의 관계와 가치관을 빚어냈습니다.',
    present: '가슴이 이끄는 방향으로 선택을 내려야 할 때입니다.',
    future: '깊은 연결과 조화로운 합일이 기다리고 있습니다.',
  },
  {
    num: 'VII', name: '전차',
    past: '강한 의지와 집중으로 어려운 시기를 돌파해 왔습니다.',
    present: '앞을 향해 힘차게 나아가세요. 승리는 가까이 있습니다.',
    future: '목표를 향한 돌진이 큰 성취로 이어질 것입니다.',
  },
  {
    num: 'VIII', name: '힘',
    past: '내면의 용기가 두려움을 이기고 오늘을 만들었습니다.',
    present: '부드러운 힘으로 상황을 다스리는 것이 필요합니다.',
    future: '내면의 강인함이 시련을 가볍게 넘길 수 있게 해줄 것입니다.',
  },
  {
    num: 'IX', name: '은둔자',
    past: '고독한 성찰의 시간이 지혜를 쌓게 해주었습니다.',
    present: '잠시 물러나 자신의 내면을 들여다볼 때입니다.',
    future: '고요한 성찰 끝에 중요한 진리를 발견하게 될 것입니다.',
  },
  {
    num: 'X', name: '운명의 수레바퀴',
    past: '삶의 순환이 당신을 지금 이 자리로 데려왔습니다.',
    present: '변화의 바람이 불고 있습니다. 흐름에 몸을 맡기세요.',
    future: '행운의 전환점이 가까이 다가오고 있습니다.',
  },
  {
    num: 'XI', name: '정의',
    past: '공정한 결과가 현재 상황의 토대가 되었습니다.',
    present: '균형 잡힌 시각으로 공정한 판단을 내려야 합니다.',
    future: '진실과 균형이 회복되고 올바른 결과를 얻게 될 것입니다.',
  },
  {
    num: 'XII', name: '매달린 사람',
    past: '잠시 멈추고 기다린 시간이 오히려 깊은 통찰을 주었습니다.',
    present: '다른 관점으로 세상을 바라보면 새로운 해답이 보입니다.',
    future: '희생과 기다림 뒤에 예상치 못한 깨달음이 찾아올 것입니다.',
  },
  {
    num: 'XIII', name: '죽음',
    past: '중요한 것의 끝이 새로운 시작의 씨앗이 되었습니다.',
    present: '과거를 놓아보내고 변화를 기꺼이 받아들이세요.',
    future: '커다란 변환이 찾아와 완전히 새로운 국면이 시작됩니다.',
  },
  {
    num: 'XIV', name: '절제',
    past: '인내와 조화로운 균형이 오늘을 만들어 왔습니다.',
    present: '서두르지 말고 차분하게 균형을 맞추어 나가세요.',
    future: '인내의 시간이 지나면 완벽한 조화가 이루어질 것입니다.',
  },
  {
    num: 'XV', name: '악마',
    past: '욕망이나 두려움에 얽매인 시간이 있었습니다.',
    present: '스스로를 옥죄는 것이 무엇인지 직시하고 벗어나세요.',
    future: '묶여 있던 것에서 해방되어 진정한 자유를 되찾을 것입니다.',
  },
  {
    num: 'XVI', name: '탑',
    past: '예상치 못한 충격이 오래된 구조를 무너뜨렸습니다.',
    present: '갑작스러운 변화가 찾아올 수 있지만 두려워하지 마세요.',
    future: '낡은 것이 무너진 자리에 더 강한 것이 세워질 것입니다.',
  },
  {
    num: 'XVII', name: '별',
    past: '희망과 치유의 빛이 어두운 시간을 밝혀주었습니다.',
    present: '희망을 잃지 마세요. 당신은 올바른 길 위에 있습니다.',
    future: '밝은 미래가 기다리고 있습니다. 꿈을 포기하지 마세요.',
  },
  {
    num: 'XVIII', name: '달',
    past: '불확실성과 환상 속에서도 전진해 왔습니다.',
    present: '보이는 것이 전부가 아닙니다. 직관을 믿고 나아가세요.',
    future: '혼란이 걷히고 숨겨진 진실이 서서히 드러날 것입니다.',
  },
  {
    num: 'XIX', name: '태양',
    past: '기쁨과 활기찬 에너지가 당신을 성장시켰습니다.',
    present: '당신의 빛을 마음껏 발산하세요. 모든 것이 잘 되고 있습니다.',
    future: '밝음과 성공이 가득한 시간이 찾아올 것입니다.',
  },
  {
    num: 'XX', name: '심판',
    past: '중요한 깨달음이 과거의 자신에서 벗어나게 해주었습니다.',
    present: '내면의 부름에 응답하고 진정한 자신으로 거듭날 때입니다.',
    future: '완전한 각성과 새로운 시작이 눈앞에 다가오고 있습니다.',
  },
  {
    num: 'XXI', name: '세계',
    past: '긴 여정을 완성하고 중요한 성취를 이루어 왔습니다.',
    present: '한 사이클의 완성을 축하하고 다음 단계를 준비하세요.',
    future: '완전한 성취와 충만함이 당신의 것이 될 것입니다.',
  },
];

// jsDelivr CDN으로 Rider-Waite 이미지 할당 (metabismuth/tarot-json, CC0 라이선스)
TAROT.forEach((card, i) => {
  card.img = `https://cdn.jsdelivr.net/gh/metabismuth/tarot-json@master/cards/m${String(i).padStart(2, '0')}.jpg`;
});

const POSITIONS = [
  { key: 'past',    label: 'PAST',    ko: '과거' },
  { key: 'present', label: 'PRESENT', ko: '현재' },
  { key: 'future',  label: 'FUTURE',  ko: '미래' },
];

function josa(word, type) {
  const code = word.charCodeAt(word.length - 1);
  if (code < 0xAC00 || code > 0xD7A3) return type === 'sub' ? '이(가)' : '은(는)';
  const hasBatchim = (code - 0xAC00) % 28 !== 0;
  return type === 'sub' ? (hasBatchim ? '이' : '가') : (hasBatchim ? '은' : '는');
}

function drawThree() {
  const shuffled = [...TAROT].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

function buildSummary(cards) {
  const [p, c, f] = cards;
  return `${p.name + josa(p.name, 'sub')} 남긴 흔적 위에서, ` +
    `${c.name + josa(c.name, 'sub')} 이끄는 오늘을 살아가고 있습니다. ` +
    `머지않아 ${f.name + josa(f.name, 'sub')} 가리키는 새로운 길이 당신 앞에 펼쳐질 것입니다.`;
}

function renderCards(cards) {
  const row = document.getElementById('tarotCardsRow');
  row.innerHTML = '';

  cards.forEach((card, i) => {
    const pos = POSITIONS[i];
    const wrap = document.createElement('div');
    wrap.className = 'tc-wrap';
    wrap.innerHTML = `
      <div class="tc-inner">
        <div class="tc-face tc-back">
          <span class="tc-back-symbol">✦</span>
        </div>
        <div class="tc-face tc-front">
          <img class="tc-img" src="${card.img}" alt="${card.name}" />
          <div class="tc-card-label">
            <span class="tc-num">${card.num}</span>
            <span class="tc-name">${card.name}</span>
          </div>
        </div>
      </div>
      <span class="tc-pos-label">${pos.ko}</span>
    `;
    row.appendChild(wrap);
  });
}

function renderFortune(cards) {
  const el = document.getElementById('tarotFortune');
  el.innerHTML = '';
  el.classList.remove('visible');

  cards.forEach((card, i) => {
    const pos = POSITIONS[i];
    const row = document.createElement('div');
    row.className = 'fortune-row';
    row.innerHTML = `
      <span class="fortune-pos">${pos.ko} · ${pos.label}</span>
      <span class="fortune-card-name">${card.num}. ${card.name}</span>
      <p class="fortune-text">${card[pos.key]}</p>
    `;
    el.appendChild(row);
  });

  const summary = document.createElement('p');
  summary.className = 'fortune-summary';
  summary.textContent = buildSummary(cards);
  el.appendChild(summary);
}

function startReading() {
  const cards = drawThree();
  const sub = document.getElementById('tarotSub');
  const fortune = document.getElementById('tarotFortune');

  sub.textContent = '카드를 뽑는 중입니다...';
  sub.style.opacity = '1';
  fortune.classList.remove('visible');
  fortune.innerHTML = '';

  renderCards(cards);
  renderFortune(cards);

  const wraps = document.querySelectorAll('.tc-wrap');

  [0, 1, 2].forEach(i => {
    setTimeout(() => {
      wraps[i].classList.add('flipped');
      if (i === 2) {
        setTimeout(() => {
          sub.style.opacity = '0';
          fortune.classList.add('visible');
        }, 800);
      }
    }, 600 + i * 700);
  });
}

document.getElementById('btnRead').addEventListener('click', () => {
  const intro = document.getElementById('tarotIntro');
  const reading = document.getElementById('tarotReading');

  intro.style.opacity = '0';
  setTimeout(() => {
    intro.classList.add('hidden');
    reading.classList.add('visible');
    startReading();
  }, 220);
});

document.getElementById('btnRetry').addEventListener('click', startReading);
