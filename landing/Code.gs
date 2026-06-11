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
    const month = parseInt(parts[1], 10);
    const day   = parseInt(parts[2], 10);

    const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(month + '월');
    if (!sheet) return { ok: false, msg: month + '월 시트를 찾을 수 없습니다.' };

    const data    = sheet.getDataRange().getValues();
    const headers = data[0];

    const nameColIdx = headers.indexOf('이름');
    const dayColIdx  = headers.indexOf(day + '일');

    if (nameColIdx === -1) return { ok: false, msg: '"이름" 열을 찾을 수 없습니다.' };
    if (dayColIdx  === -1) return { ok: false, msg: day + '일 열을 찾을 수 없습니다.' };

    let rowIdx = -1;
    for (let i = 1; i < data.length; i++) {
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
