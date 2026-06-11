// =====================================================
//  R37 RUNNERS — 러닝 기록 입력 API
//  Google Apps Script (Extensions > Apps Script)
//
//  배포 방법:
//    1. 이 코드를 복사해 Google Apps Script 에디터에 붙여넣기
//    2. 상단 [배포] > [새 배포] 클릭
//    3. 유형: 웹 앱
//       실행 계정: 나 (Me)
//       액세스 권한: 모든 사용자 (Anyone)
//    4. [배포] 후 나타나는 URL을 복사
//    5. runner.js 의 SCRIPT_URL 에 붙여넣기
// =====================================================

const SPREADSHEET_ID = '1ulOiIklFcdXfbtiI3_gh4h9kK1rHI9EpqLvrFr7N2Co';

function doGet(e) {
  const result = handleRequest(e.parameter);
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleRequest(params) {
  try {
    const dateStr  = params.date;      // "2026-06-11"
    const name     = (params.name || '').trim();
    const distance = parseFloat(params.distance);

    if (!dateStr || !name || isNaN(distance) || distance <= 0) {
      return { ok: false, msg: '날짜, 이름, 거리를 모두 입력해 주세요.' };
    }

    // 날짜 파싱
    const parts = dateStr.split('-');
    const month = parseInt(parts[1], 10);   // 1-12
    const day   = parseInt(parts[2], 10);   // 1-31

    // 해당 월 시트 찾기
    const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(month + '월');
    if (!sheet) return { ok: false, msg: month + '월 시트를 찾을 수 없습니다.' };

    // 헤더에서 열 인덱스 탐색
    const data    = sheet.getDataRange().getValues();
    const headers = data[0];

    const nameColIdx = headers.indexOf('이름');
    const dayColIdx  = headers.indexOf(day + '일');

    if (nameColIdx === -1) return { ok: false, msg: '"이름" 열을 찾을 수 없습니다.' };
    if (dayColIdx  === -1) return { ok: false, msg: day + '일 열을 찾을 수 없습니다.' };

    // 이름으로 행 탐색
    let rowIdx = -1;
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][nameColIdx]).trim() === name) {
        rowIdx = i;
        break;
      }
    }
    if (rowIdx === -1) return { ok: false, msg: '"' + name + '" 이름을 찾을 수 없습니다. 시트의 이름과 정확히 일치해야 합니다.' };

    // 기존 값 확인
    const existing = data[rowIdx][dayColIdx];
    sheet.getRange(rowIdx + 1, dayColIdx + 1).setValue(distance);

    const msg = existing
      ? `${name} ${month}/${day} ${distance}km 저장 완료 (기존: ${existing}km → ${distance}km)`
      : `${name} ${month}/${day} ${distance}km 저장 완료`;

    return { ok: true, msg: msg };

  } catch (err) {
    return { ok: false, msg: '오류: ' + err.message };
  }
}
