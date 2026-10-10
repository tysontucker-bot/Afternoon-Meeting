/**
 * Afternoon Meeting — sync script
 * Passes taps from the iPad remote to the projector, and keeps the class list
 * (names + photos) in this Google Sheet so they never go into the public GitHub repo.
 *
 * One-time setup: run setup() from the editor, then Deploy > New deployment > Web app
 * (Execute as: Me, Who has access: Anyone). Your class code prints in the log.
 */

const STUDENTS = 'Students';

function setup() {
  const p = PropertiesService.getScriptProperties();
  if (!p.getProperty('CLASS_CODE')) {
    p.setProperty('CLASS_CODE', String(Math.floor(100000 + Math.random() * 900000)));
  }
  studentsSheet_();
  Logger.log('Your class code is: ' + p.getProperty('CLASS_CODE'));
}

function doGet(e) {
  const q = (e && e.parameter) || {};
  if (!okCode_(q.code)) return out_({ ok: false, error: 'bad_code' });
  const res = {
    ok: true,
    live: readJSON_('LIVE', {}),
    settings: readJSON_('SETTINGS', {}),
    rosterVersion: prop_('ROSTER_V') || '0'
  };
  if (q.what === 'all') res.roster = readRoster_();
  return out_(res);
}

function doPost(e) {
  let b;
  try { b = JSON.parse(e.postData.contents); } catch (err) { return out_({ ok: false, error: 'bad_json' }); }
  if (!okCode_(b.code)) return out_({ ok: false, error: 'bad_code' });
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    if (b.action === 'live') writeJSON_('LIVE', b.live || {});
    else if (b.action === 'settings') writeJSON_('SETTINGS', b.settings || {});
    else if (b.action === 'roster') writeRoster_(b.roster || []);
    else return out_({ ok: false, error: 'bad_action' });
    return out_({ ok: true, rosterVersion: prop_('ROSTER_V') || '0' });
  } finally {
    lock.releaseLock();
  }
}

/* ---------- helpers ---------- */
function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
function prop_(k) { return PropertiesService.getScriptProperties().getProperty(k); }
function okCode_(c) { const want = prop_('CLASS_CODE'); return !!want && String(c || '') === want; }

// Live state is read constantly by the projector, so it's kept in the cache
// (fast, no quota worries) with Script Properties as the durable copy.
function readJSON_(k, def) {
  const cache = CacheService.getScriptCache();
  let v = cache.get(k);
  if (v == null) { v = prop_(k); if (v != null) cache.put(k, v, 21600); }
  try { return v ? JSON.parse(v) : def; } catch (e) { return def; }
}
function writeJSON_(k, obj) {
  const v = JSON.stringify(obj);
  PropertiesService.getScriptProperties().setProperty(k, v);
  CacheService.getScriptCache().put(k, v, 21600);
}

function studentsSheet_() {
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName(STUDENTS);
  if (!sh) {
    sh = ss.insertSheet(STUDENTS);
    sh.appendRow(['ID', 'Name', 'Photo']);
    sh.setFrozenRows(1);
  }
  return sh;
}
function readRoster_() {
  const sh = studentsSheet_();
  const n = sh.getLastRow() - 1;
  if (n < 1) return [];
  return sh.getRange(2, 1, n, 3).getValues()
    .filter(r => String(r[1]).trim() !== '')
    .map(r => ({ id: String(r[0]), name: String(r[1]), photo: String(r[2] || '') }));
}
function writeRoster_(roster) {
  const sh = studentsSheet_();
  const last = sh.getLastRow();
  if (last > 1) sh.getRange(2, 1, last - 1, 3).clearContent();
  const rows = roster.map(r => [String(r.id), String(r.name || ''), String(r.photo || '').slice(0, 49000)]);
  if (rows.length) sh.getRange(2, 1, rows.length, 3).setValues(rows);
  PropertiesService.getScriptProperties().setProperty('ROSTER_V', String(Date.now()));
}
