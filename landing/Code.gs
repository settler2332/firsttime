// =====================================================
//  R37 RUNNERS — 러닝 기록 입력 API
//  Google Apps Script (Extensions > Apps Script)
//
//  배포 방법:
//    1. 이 코드를 Apps Script 에디터에 붙여넣기
//    2. [배포] > [새 배포] > 유형: 웹 앱
//       실행 계정: 나 (Me) / 액세스: 모든 사용자 (Anyone)
//    3. 배포 URL을 runner.js 의 SCRIPT_URL 에 붙여넣기
// =====================================================

const SPREADSHEET_ID = '1ulOiIklFcdXfbtiI3_gh4h9kK1rHI9EpqLvrFr7N2Co';

function doGet(e) {
  const result = handleRequest(e.parameter);
  const json = JSON.stringify(result);
  const cb = e.parameter.callback;

  // JSONP 지원: callback 파라미터가 있으면 함수 호출 형태로 반환
  if (cb) {
    return ContentService
      .createTextOutput(cb + '(' + json + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function handleRequest(params) {
  try {
    const dateStr  = params.date;
    const name     = (params.name || '').trim();
    const distance = parseFloat(params.distance);

    if (!dateStr || !name || isNaN(distance) || distance <= 0) {
      return { ok: false, msg: '날짜, 이름, 거리를 모두 입력해 주세요.' };
    }

    const parts = dateStr.split('-');
    const year  = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day   = parseInt(parts[2], 10);

    // 2025: "6월" 형식 / 2026~: "26_6월" 형식
    const sheetName = year >= 2026
      ? String(year).slice(2) + '_' + month + '월'
      : month + '월';

    const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) return { ok: false, msg: '"' + sheetName + '" 시트를 찾을 수 없습니다.' };

    const data = sheet.getDataRange().getValues();

    // 헤더 행 탐색 (공백 trim, 최대 5행까지)
    let headerRowIdx = -1;
    let nameColIdx = -1;
    let dayColIdx  = -1;
    const dayLabel = day + '일';

    for (let r = 0; r < Math.min(10, data.length); r++) {
      const row = data[r].map(c => String(c).trim());
      const ni = row.indexOf('이름');
      const di = row.indexOf(dayLabel);
      if (ni !== -1) { headerRowIdx = r; nameColIdx = ni; }
      if (di !== -1) { dayColIdx = di; }
      if (nameColIdx !== -1 && dayColIdx !== -1) break;
    }

    if (nameColIdx === -1) {
      // 디버깅용: 첫 행 헤더 목록 반환
      const preview = data[0].map(c => String(c).trim()).filter(c => c).join(', ');
      return { ok: false, msg: '"이름" 열을 찾을 수 없습니다. 헤더 확인: [' + preview + ']' };
    }
    if (dayColIdx === -1) return { ok: false, msg: '"' + dayLabel + '" 열을 찾을 수 없습니다.' };

    let rowIdx = -1;
    for (let i = headerRowIdx + 1; i < data.length; i++) {
      if (String(data[i][nameColIdx]).trim() === name) { rowIdx = i; break; }
    }
    if (rowIdx === -1) return { ok: false, msg: '"' + name + '" 이름을 찾을 수 없습니다.' };

    const existing = data[rowIdx][dayColIdx];
    sheet.getRange(rowIdx + 1, dayColIdx + 1).setValue(distance);

    const msg = existing
      ? name + ' ' + month + '/' + day + ' ' + distance + 'km 저장 완료 (이전: ' + existing + 'km)'
      : name + ' ' + month + '/' + day + ' ' + distance + 'km 저장 완료';

    return { ok: true, msg: msg };

  } catch (err) {
    return { ok: false, msg: '오류: ' + err.message };
  }
}
