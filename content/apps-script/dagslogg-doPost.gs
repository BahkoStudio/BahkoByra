/**
 * Dagslogg — doPost för Bahko Byrås ring-SOP.
 *
 * Driftsatt som container-bound Apps Script i arket "Dagslogg":
 *   https://docs.google.com/spreadsheets/d/1XpT_W2YcuthARtZOYIyrqXvikXiUNq01DrgdMq35bRk/edit
 * Distribution: webbapp, "Execute as: Me", "Who has access: Anyone".
 * ("Anyone" kräver Execute as: Me — annars visas bara Only myself / Anyone with Google account.)
 *
 * Anropas av Spara-knappen i bahkobyra/cloud/sop-ringa/index.html. Webbapp-URL:en
 * lagras i besökarens localStorage (bahko_sop_sheet_url), aldrig i repot.
 *
 * Upsert på datum + säljare: samma dag sparad igen uppdaterar raden i stället för att dubblera.
 * Denna fil är källkopian — redigeras skriptet i Apps Script ska ändringen speglas hit.
 */

function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('Dagslogg') || ss.getSheets()[0];
  var data = JSON.parse(e.postData.contents);
  var rader = data.rader || [];
  var saljare = String(data.saljare || '').trim();
  var nu = new Date();
  var tz = ss.getSpreadsheetTimeZone();
  var fanns = sh.getDataRange().getValues();
  var nya = 0, uppdaterade = 0;

  rader.forEach(function (r) {
    var rad = [r.datum, tal(r.ringda), tal(r.nadda), tal(r.mejl), tal(r.svar),
               tal(r.demo), tal(r.moten), r.ant || '', saljare, nu];
    var traff = 0;
    for (var i = 1; i < fanns.length; i++) {
      var d = fanns[i][0];
      var dstr = (d instanceof Date)
        ? Utilities.formatDate(d, tz, 'yyyy-MM-dd')
        : String(d).trim();
      if (dstr === r.datum && String(fanns[i][8] || '').trim() === saljare) {
        traff = i + 1;
        break;
      }
    }
    if (traff) {
      sh.getRange(traff, 1, 1, rad.length).setValues([rad]);
      uppdaterade++;
    } else {
      sh.appendRow(rad);
      fanns.push(rad);
      nya++;
    }
  });

  return ut({ ok: true, nya: nya, uppdaterade: uppdaterade });
}

function tal(v) {
  var n = parseInt(v, 10);
  return isNaN(n) ? '' : n;
}

function ut(o) {
  return ContentService.createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}
