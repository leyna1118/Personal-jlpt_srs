/* ===================== 常數 ===================== */
const STORAGE_KEY = 'jlpt-srs-state-v1';
const LEVELS = ['N1', 'N2', 'N3'];
const TIERS = ['高频', '中频', '低频'];
const TIER_LABEL = { '高频': '高頻', '中频': '中頻', '低频': '低頻' };
const LEVEL_BADGE = { N1: 'badge-n1', N2: 'badge-n2', N3: 'badge-n3' };
// box index -> 間隔天數(box 0 代表還在當天複習池,還沒有到期日)
const INTERVALS = [0, 1, 2, 4, 7, 14, 30, 60, 120];

/* ===================== 角色台詞 ===================== */
// 使用者設定:白羽レイナ。
// 黑尾:大多直接叫「レイナ」,偶爾用マネージャー/マネジャー/マネ(隊經理梗調侃),
//       在比較調侃、寵溺的台詞裡偶爾冒出「レイナちゃん」。
// 研磨:幾乎都叫「白」,個性話少、不太會特地換稱呼;只在少數特別的時刻(達成感很重的瞬間)
//       才會難得直接叫「レイナ」,因為平常幾乎不這樣叫,反而更顯得重。
const COMPANIONS = {
  kuroo: { name: '黒尾', img: 'assets/kuroo.png' },
  kenma: { name: '研磨', img: 'assets/kenma.png' },
};
const LINES = {
  open: {
    kuroo: [
      { jp: 'よう、レイナ。今日も単語やろうぜ。' },
      { jp: 'おっす、始めるか。' },
      { jp: 'マネージャー、出席確認な。今日もやるぞ。' },
      { jp: '待たせたな……ってお前が先に来てたのか。' },
      { jp: 'さて、と。今日は何個いくよ、レイナ。' },
      { jp: 'よし、じゃあ開始な。気合入れてけ。' },
      { jp: 'マネ、準備できてる?よし、始めよう。' },
      { jp: 'レイナちゃん、今日も付き合ってやるよ。' },
      { jp: 'また今日もやんのか。……根性あるな、お前。' },
      { jp: 'さぁ、今日のノルマ消化しに行くか。' },
      { jp: '来たか。じゃあさっさと始めようぜ。' },
      { jp: 'レイナ、遅かったな。待ちくたびれたぞ。' },
    ],
    kenma: [
      { jp: '……始める?' },
      { jp: '白、始めるよ。' },
      { jp: '……来た。じゃあ、やろっか。' },
      { jp: '今日も、か。……いいけど。' },
      { jp: '白、準備は?……うん、いいよ。' },
      { jp: '……面倒だけど、付き合うよ。' },
      { jp: 'また単語?……まあ、白がやるなら。' },
      { jp: '……始めよう。長くなりそうだから。' },
      { jp: '白。……そこにいたんだ。' },
      { jp: 'よし……って、柄じゃないけど。始めよう。' },
      { jp: '……準備完了。白は?' },
      { jp: '白、今日はいつもより早いね。……気のせい?' },
    ],
  },
  correct: {
    kuroo: [
      { jp: 'お、正解。やるじゃん。' },
      { jp: 'レイナ、いい感じじゃん。' },
      { jp: 'マネ、その調子。' },
      { jp: '正解。……お前、地味に伸びてるな。' },
      { jp: 'よっしゃ、当たり。さすがだな。' },
      { jp: 'それな、正解。センスあるじゃん。' },
      { jp: 'マネージャー、今のいいタイミングだったな。' },
      { jp: 'レイナちゃん、冴えてるじゃん、今日。' },
      { jp: '正解。……お前が悔しがるとこ見れなくて残念だわ。' },
      { jp: 'いいぞ、その調子で行け。' },
      { jp: '当たり。まあ、俺が見込んだだけあるな。' },
      { jp: 'ナイス。次もその調子な、レイナ。' },
    ],
    kenma: [
      { jp: '……合ってる。' },
      { jp: '白、合ってるよ。' },
      { jp: '正解。……当然、みたいな顔してる?' },
      { jp: '……うん、それで合ってる。' },
      { jp: '白、できてるじゃん。' },
      { jp: '……悪くない。' },
      { jp: 'それ、正解。……もう覚えたんだ。' },
      { jp: '……ふうん。やるじゃん、白。' },
      { jp: '合ってた。……次、行こうか。' },
      { jp: '白。……ちゃんと合ってるよ。' },
      { jp: '……正解。もっと難しいの出そうか。' },
      { jp: 'それでいいよ、白。' },
    ],
  },
  wrong: {
    kuroo: [
      { jp: 'まあ、次があるって。気にすんな。' },
      { jp: 'レイナでも間違えることあるんだな。' },
      { jp: 'ドンマイ。次、いこうぜ。' },
      { jp: 'マネ、そう凹むなって。ミスは誰でもある。' },
      { jp: '外したか。……まあ、次で取り返せ。' },
      { jp: 'それは引っかかるよな、正直。' },
      { jp: '惜しい。……いや、普通に外してるけど。' },
      { jp: 'レイナちゃん、そんな顔すんなって。次な。' },
      { jp: 'ま、間違えるのも勉強のうちだろ。' },
      { jp: '外した?気にすんな、俺もよく忘れる。' },
      { jp: 'それは俺も知らなかったわ。次いこう。' },
      { jp: 'マネージャー、次で挽回しような。' },
    ],
    kenma: [
      { jp: '……間違えた。まあいいよ。' },
      { jp: '白、大丈夫。次いこ。' },
      { jp: '……惜しかったね。' },
      { jp: '間違えても……いいと思う。' },
      { jp: '白。……次、頑張ろう。' },
      { jp: '……あー、それ、俺も間違えそうだった。' },
      { jp: 'ミスった?……まあ、そういう日もある。' },
      { jp: '……大丈夫。まだ覚えてる途中でしょ。' },
      { jp: '白、落ち込まなくていいよ。……たぶん。' },
      { jp: '……次で合わせよう。' },
      { jp: 'それは……ちょっと難しいやつだった。' },
      { jp: '白。……気にしすぎ、そういうとこ。' },
    ],
  },
  mastered: {
    kuroo: [
      { jp: 'これ、もう覚えたのか。さすがだな。' },
      { jp: 'レイナ、成長してんじゃん。' },
      { jp: 'マネ、また一個クリアだな。' },
      { jp: 'その調子で全部潰していけ。' },
      { jp: 'よし、これはもう卒業な。' },
      { jp: 'マネージャー、地味に積み上げてきたよな、お前。' },
      { jp: 'また一個、レイナの武器が増えたな。' },
      { jp: 'いいペースだ。……ちゃんと見てるから安心しろ。' },
      { jp: 'それ完全に覚えたな。次いこうぜ。' },
      { jp: 'レイナちゃん、着実に増えてってるじゃん。' },
      { jp: 'これで何個目だ?……数えてないけど、結構いってるだろ。' },
      { jp: 'よくやった。これはもうお前のもんだ。' },
    ],
    kenma: [
      { jp: 'この単語……覚えたんだ、白。' },
      { jp: '……また一個、覚えたね。' },
      { jp: '白、それもう完璧。' },
      { jp: '……積み重なってきたね、白の単語帳。' },
      { jp: 'それ、卒業ってこと?……いいと思う。' },
      { jp: '白。……ちゃんと続いてる。' },
      { jp: '……ここまで来たんだ。' },
      { jp: 'レイナ。……よく、ここまでやったね。' },
      { jp: '白、静かに増えてるね、覚えた数。' },
      { jp: '……もう、迷わず言えるんだ。すごいね。' },
      { jp: '白の単語、また一つ本物になった。' },
      { jp: '……なんか、ちょっと嬉しい。白が覚えてくの。' },
    ],
  },
  milestone: {
    kuroo: [
      { jp: 'いいペースだな、レイナ。' },
      { jp: 'マネ、その調子。' },
      { jp: 'お前、地味にすごい数こなしてるな。' },
      { jp: 'レイナちゃん、根性あるとこ見せつけてくるじゃん。' },
      { jp: 'この調子でいけば、そのうち俺より詳しくなるんじゃねえの。' },
      { jp: 'マネージャー、今日の仕事っぷり、悪くないぞ。' },
      { jp: 'ここまで続けてるの、普通にすごいからな、それ。' },
      { jp: 'レイナ、俺が見てないとこでもちゃんとやってんだな。' },
      { jp: '積み上げるの、地味だけど一番強いからな。' },
      { jp: 'よし、いい流れだ。このまま持ってけ。' },
      { jp: 'マネ、休憩挟んでもいいけど、いいペースだぞ。' },
      { jp: 'レイナちゃん、そのやる気、俺にも分けてくれよ。' },
    ],
    kenma: [
      { jp: '……順調。' },
      { jp: '白、続いてるね。' },
      { jp: '……白、思ったよりちゃんと続けてる。' },
      { jp: 'ここまで来たんだ。……悪くないよ。' },
      { jp: '白のペース、安定してきたね。' },
      { jp: '……気づいたら、結構な数になってた。' },
      { jp: '白、無理してない?……ならいいけど。' },
      { jp: '……止まらないね、白は。' },
      { jp: '白のそういうとこ、嫌いじゃない。' },
      { jp: '……続けるの、しんどい時もあるでしょ。えらいよ。' },
      { jp: '白、そのままのペースでいいよ。' },
      { jp: '……ちゃんと見てるよ、白のこと。' },
    ],
  },
};

function pickCompanion() {
  const r = Math.random();
  if (r < 0.4) return ['kuroo'];
  if (r < 0.8) return ['kenma'];
  return ['kuroo', 'kenma'];
}
function showCompanionLine(eventKey) {
  const set = LINES[eventKey];
  if (!set) return;
  const speakers = pickCompanion(); // ['kuroo'] | ['kenma'] | ['kuroo','kenma']
  const turns = [];
  for (const speaker of speakers) {
    const pool = set[speaker];
    if (!pool || !pool.length) continue;
    const line = pool[Math.floor(Math.random() * pool.length)];
    turns.push({ speaker, jp: line.jp });
  }
  if (!turns.length) return;
  const bar = document.getElementById('companionBar');
  bar.innerHTML = turns.map(t => `
    <div class="companion-turn">
      <img class="companion-avatar" src="${COMPANIONS[t.speaker].img}" alt="${COMPANIONS[t.speaker].name}">
      <div class="companion-text">
        <div class="companion-name">${COMPANIONS[t.speaker].name}</div>
        <div class="companion-jp">${t.jp}</div>
      </div>
    </div>`).join('');
  bar.classList.remove('hidden');
}

/* ===================== 工具函式 ===================== */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function todayStr() {
  const d = new Date();
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}
function catKey(level, tier) { return level + '_' + tier; }
function showToast(msg, duration) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove('show'), duration || 1600);
}

// 去掉 Anki 式的振假名標記,例如「高校[こうこう]」還原成「高校」,保留 <b> 標籤
function stripFurigana(s) {
  if (!s) return '';
  return s.replace(/([^\s\[\]]+)\[[^\]]+\]/g, '$1').replace(/\s+/g, '');
}
// 從例句(furi 欄位)中取出被 <b> 包住的目標詞(原句中的實際型態,可能是活用後的型態)
function extractClozeTarget(furi) {
  const clean = stripFurigana(furi);
  const m = clean.match(/<b>(.*?)<\/b>/);
  if (!m) return null;
  const target = m[1];
  const plain = clean.replace(/<\/?b>/g, '');
  if (!target || plain.indexOf(target) === -1) return null;
  return { plain, target, blanked: plain.replace(target, '＿＿＿') };
}
// 把 furi 欄位(Anki 式振假名標記 + <b> 包住的目標詞)轉成帶注音的 HTML,
// 讓例句整句都能讀,同時把目標詞用 <mark> 標出來。
// 來源格式裡,空白是「詞」的分隔記號(每個空白後接的漢字[讀音]算一個詞,
// 後面黏著的送假名不算在讀音裡),所以要照空白分詞、逐詞轉換,不能整句直接去空白,
// 不然漢字詞跟後面沒標記的假名(送假名/助詞)會黏在一起,注音位置會對不上。
// targetMode 控制目標詞(<b> 包住的那個)怎麼顯示,句子裡其他詞一律照常顯示漢字+注音:
//   'kanji'(預設) 正常顯示漢字+注音
//   'reading'      只顯示讀音、不顯示漢字 —— 用在「看讀音選意思」題型,避免例句洩漏漢字
//   'blank'        整個挖空成 ＿＿＿ —— 用在「看意思選單字」題型,當克漏字提示
function furiganaToRubyHtml(furi, targetMode) {
  if (!furi) return '';
  const openIdx = furi.indexOf('<b>');
  const closeIdx = furi.indexOf('</b>');
  let pre = furi, mid = '', post = '';
  if (openIdx !== -1 && closeIdx !== -1 && closeIdx > openIdx) {
    pre = furi.slice(0, openIdx);
    mid = furi.slice(openIdx + 3, closeIdx);
    post = furi.slice(closeIdx + 4);
  }
  const tokenize = (segment) => segment.split(/\s+/).filter(Boolean).map(tok => {
    const open = tok.indexOf('[');
    const close = tok.indexOf(']', open);
    if (open === -1 || close === -1) return tok;
    const base = tok.slice(0, open);
    const reading = tok.slice(open + 1, close);
    const trailing = tok.slice(close + 1);
    return '<ruby>' + base + '<rt>' + reading + '</rt></ruby>' + trailing;
  }).join('');
  const readingOnly = (segment) => segment.split(/\s+/).filter(Boolean).map(tok => {
    const open = tok.indexOf('[');
    const close = tok.indexOf(']', open);
    if (open === -1 || close === -1) return tok;
    const reading = tok.slice(open + 1, close);
    const trailing = tok.slice(close + 1);
    return reading + trailing;
  }).join('');
  let midHtml = '';
  if (mid) {
    if (targetMode === 'blank') midHtml = '＿＿＿';
    else if (targetMode === 'reading') midHtml = readingOnly(mid);
    else midHtml = tokenize(mid);
  }
  return tokenize(pre) + (mid ? '<mark>' + midHtml + '</mark>' : '') + tokenize(post);
}
// 隨機挑一句帶有目標詞標記的例句;quiz 的「日文選中文」用整句日文(帶注音+標色,
// 目標詞只顯示讀音不顯示漢字),「中文選日文」除了中文翻譯,還加上日文例句的挖空
// (目標詞挖空成 ＿＿＿,其他詞正常顯示漢字+注音)當作額外提示,讓單字都能在例句
// 情境中出現,而不是只看單一詞條。
function renderQuizContext(word, kind) {
  const el = document.getElementById('quizContext');
  const examples = (word.examples || []).filter(ex => ex.furi && ex.furi.includes('<b>') && ex.tc);
  if (!examples.length) { el.classList.add('hidden'); el.innerHTML = ''; return; }
  const ex = examples[Math.floor(Math.random() * examples.length)];
  if (kind === 'jp') {
    el.innerHTML = furiganaToRubyHtml(ex.furi, 'reading');
  } else {
    el.innerHTML = '<div class="quiz-context-line">' + ex.tc + '</div>'
      + '<div class="quiz-context-line">' + furiganaToRubyHtml(ex.furi, 'blank') + '</div>';
  }
  el.classList.remove('hidden');
}

/* ===================== 狀態管理 ===================== */
function defaultState() {
  const activeCategories = [];
  for (const t of TIERS) activeCategories.push(catKey('N3', t));
  for (const t of TIERS) activeCategories.push(catKey('N2', t));
  return {
    version: 1,
    // learningCap:「學習中」單字數上限(不是每日新字數上限)。同時學習中的字數
    // 達到這個上限就不再抽新字,低於上限時才會補新字進來。
    settings: { learningCap: 100, activeCategories },
    cards: {},          // wordId -> {status, box, due, reps, lapses, lastSeen}
    retryQueue: [],      // [{wordId, availableAt}]
    drawCounter: 0,      // 內部單調計數器,用來排 retryQueue 的時間,永遠不重置
    pendingCard: null,   // 目前正在顯示、還沒作答完的卡,重新整理頁面要能還原,不能重抽
    todayDrawDate: todayStr(),
    todayDrawCount: 0,   // 給畫面顯示用的「今天抽了幾張」,每天歸零
    stats: { correctStreak: 0, totalReviewed: 0 },
    // 主題式學習(動詞變化等)用的簡單練習統計 —— 不排程、不分卡片,只累計正確率跟連續對答,
    // 目標是練到反射直覺,不是長期記憶排程。
    verbDrill: { totalAnswered: 0, totalCorrect: 0, streak: 0, best: 0 },
    updatedAt: 0,        // 這份進度最後一次變動的時間,雲端同步時用來判斷本機/雲端哪份比較新
  };
}
let STATE = null;
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return migrateState(defaultState());
    const loaded = JSON.parse(raw);
    const merged = Object.assign(defaultState(), loaded);
    // settings 是巢狀物件,上面的 Object.assign 只有淺層合併,舊資料裡的 settings
    // 會整包蓋掉預設值,所以要再跟預設值合併一次,新加的欄位(如 learningCap)才不會消失。
    merged.settings = Object.assign({}, defaultState().settings, loaded.settings || {});
    return migrateState(merged);
  } catch (e) {
    return defaultState();
  }
}
// 舊存檔資料搬遷:
// 1. dailyNewCap(每日新字上限)→ learningCap(學習中單字數上限)
// 2. 學習中/已學會的字如果還沒有出現次數紀錄,補設成 1(至少出現過一次才會有這個狀態)
// 3. 舊資料沒有 daysCount(第幾天)紀錄,至少補設成 1
function migrateState(state) {
  if (state.settings.learningCap == null) {
    state.settings.learningCap = state.settings.dailyNewCap != null ? state.settings.dailyNewCap : 100;
  }
  delete state.settings.dailyNewCap;
  for (const id in state.cards) {
    const c = state.cards[id];
    if ((c.status === 'learning' || c.status === 'mastered') && !(c.reps >= 1)) {
      c.reps = 1;
    }
    if (!(c.daysCount >= 1)) c.daysCount = 1;
  }
  return state;
}
function saveState() {
  STATE.updatedAt = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE));
  scheduleCloudSync();
}

/* ===================== 雲端同步(GitHub Gist) ===================== */
// 用使用者自己的 GitHub 帳號當同步後端:進度存成一個私人 Gist,
// 每個瀏覽器貼上同一組 Personal Access Token 就能連到同一份。
const GIST_FILENAME = 'jlpt-srs-progress.json';
const GH_TOKEN_KEY = 'jlpt-srs-gh-token';
const GH_GIST_ID_KEY = 'jlpt-srs-gh-gist-id';
const GH_LAST_SYNC_KEY = 'jlpt-srs-gh-last-sync';
const GH_COOLDOWN_KEY = 'jlpt-srs-gh-cooldown-until';
const GH_SYNC_LOG_KEY = 'jlpt-srs-gh-sync-log';
const SYNC_LOG_MAX = 10;
const SYNC_DEBOUNCE_MS = 6000;        // 平常作答停下來多久才送出一次輕量同步
const SYNC_DEBOUNCE_MAX_WAIT_MS = 20000; // 就算連續作答不停,最多等這麼久還是會送一次,不會無限延後
const RATE_LIMIT_COOLDOWN_MS = 10 * 60 * 1000; // 踩到限流後,冷卻多久才恢復自動同步
const FULL_SYNC_INTERVAL_MS = 10 * 60 * 1000;  // 完整(跨裝置合併)同步的保底週期
let RESOLVED_GIST_ID = null;   // 這次頁面載入期間快取住,避免每次 push 都重新驗證一次
let SYNC_IN_FLIGHT = null;     // 進行中的同步 promise,避免同時重疊觸發(例如 visible + 手動按鈕)

function getGhToken() {
  return localStorage.getItem(GH_TOKEN_KEY) || '';
}

async function ghApi(path, options) {
  const token = getGhToken();
  const res = await fetch('https://api.github.com' + path, Object.assign({}, options, {
    headers: Object.assign({
      'Accept': 'application/vnd.github+json',
      'Authorization': 'token ' + token,
      'Content-Type': 'application/json',
    }, options && options.headers),
  }));
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    const err = new Error('GitHub API ' + res.status + ': ' + body.slice(0, 200));
    err.status = res.status;
    throw err;
  }
  return res.json();
}

// 找到之前建立的那個 Gist(靠固定檔名辨認,這樣換瀏覽器只要貼一樣的 token 就找得回來);
// 找不到就建立一個新的。結果快取在 RESOLVED_GIST_ID,同一次頁面載入期間不會重複搜尋。
async function resolveGistId() {
  if (RESOLVED_GIST_ID) return RESOLVED_GIST_ID;
  const cached = localStorage.getItem(GH_GIST_ID_KEY);
  if (cached) {
    try {
      await ghApi('/gists/' + cached);
      RESOLVED_GIST_ID = cached;
      return cached;
    } catch (e) {
      // 只有 gist 真的被刪掉(404)才需要重新搜尋/建立;
      // 其他錯誤(例如 403 rate limit)照樣清掉快取的話,反而會立刻觸發
      // 更大量的「列出全部 gist + 新建」流程,讓限流雪上加霜,所以直接往外丟。
      if (e.status !== 404) throw e;
      localStorage.removeItem(GH_GIST_ID_KEY);
    }
  }
  for (let page = 1; page <= 5; page++) {
    const list = await ghApi('/gists?per_page=100&page=' + page);
    if (!list.length) break;
    const found = list.find(g => g.files && g.files[GIST_FILENAME]);
    if (found) {
      localStorage.setItem(GH_GIST_ID_KEY, found.id);
      RESOLVED_GIST_ID = found.id;
      return found.id;
    }
    if (list.length < 100) break;
  }
  const created = await ghApi('/gists', {
    method: 'POST',
    body: JSON.stringify({
      description: 'JLPT SRS 進度同步(勿刪除)',
      public: false,
      files: { [GIST_FILENAME]: { content: JSON.stringify(STATE) } },
    }),
  });
  localStorage.setItem(GH_GIST_ID_KEY, created.id);
  RESOLVED_GIST_ID = created.id;
  return created.id;
}

// 合併本機/雲端兩份進度:每張卡片(cards[id])各自比較卡片自己的 updatedAt,
// 誰新就用誰的 —— 而不是整包比較誰的 STATE.updatedAt 新就整包覆蓋掉另一份。
// 這樣「電腦跟手機各自唸了不同的字」才不會有一邊的進度被整個蓋掉。
// 其餘欄位(設定、今日抽卡數、重考佇列等)沒有逐項合併的價值,就跟著整包比較新
// 的那一份走。
function mergeStates(a, b) {
  const aCards = a.cards || {}, bCards = b.cards || {};
  const newer = (b.updatedAt || 0) >= (a.updatedAt || 0) ? b : a;
  const merged = Object.assign(defaultState(), newer);
  merged.settings = Object.assign({}, defaultState().settings, newer.settings || {});
  merged.cards = {};
  const ids = new Set([...Object.keys(aCards), ...Object.keys(bCards)]);
  for (const id of ids) {
    const ca = aCards[id], cb = bCards[id];
    merged.cards[id] = (ca && cb) ? ((cb.updatedAt || 0) > (ca.updatedAt || 0) ? cb : ca) : (ca || cb);
  }
  merged.updatedAt = Math.max(a.updatedAt || 0, b.updatedAt || 0);
  return merged;
}

// 完整同步一次:拉雲端 → 跟本機逐卡合併 → 合併結果存回本機也存回雲端。
// 回傳本機資料是否因此有變動(給呼叫端決定要不要重畫畫面)。
// 只在真的需要跨裝置合併的時機呼叫(剛連接/手動按鈕/分頁切回前景/定期保底),
// 平常每題作答的同步請走下面的 cloudSyncLight,不需要每次都整包重抓。
async function cloudSyncFull() {
  if (SYNC_IN_FLIGHT) return SYNC_IN_FLIGHT;
  SYNC_IN_FLIGHT = (async () => {
    const gistId = await resolveGistId();
    const gist = await ghApi('/gists/' + gistId);
    const file = gist.files && gist.files[GIST_FILENAME];
    let remote = null;
    if (file) {
      // 進度存滿全部單字時,內容可能超過 Gist API 內嵌 content 欄位的截斷門檻(~1MB),
      // 這時要改抓 raw_url 拿完整內容,不然讀到的是被截斷的 JSON。
      let contentStr = file.content;
      if (file.truncated && file.raw_url) {
        const res = await fetch(file.raw_url);
        contentStr = await res.text();
      }
      if (contentStr) remote = JSON.parse(contentStr);
    }
    let changed = false;
    if (remote) {
      const merged = migrateState(mergeStates(STATE, remote));
      // 比較時忽略頂層 updatedAt(合併後幾乎一定會變,不代表真的有實質內容差異),
      // 不然幾乎每次同步都會被誤判成「有變動」,一直跳「已同步其他裝置的進度」。
      const before = Object.assign({}, STATE, { updatedAt: 0 });
      const after = Object.assign({}, merged, { updatedAt: 0 });
      if (JSON.stringify(after) !== JSON.stringify(before)) {
        STATE = merged;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE));
        CURRENT = null;
        buildIntroQueue();
        changed = true;
      }
    }
    // 合併後的結果一律推回雲端,確保本機獨有、雲端還沒有的卡片也會補上去
    // (不然單純比較「有沒有變」不夠 —— 本機可能有雲端沒有的新進度)。
    await ghApi('/gists/' + gistId, {
      method: 'PATCH',
      body: JSON.stringify({ files: { [GIST_FILENAME]: { content: JSON.stringify(STATE) } } }),
    });
    localStorage.setItem(GH_LAST_SYNC_KEY, String(Date.now()));
    return changed;
  })();
  try {
    return await SYNC_IN_FLIGHT;
  } finally {
    SYNC_IN_FLIGHT = null;
  }
}

// 輕量同步:只把目前本機 STATE 直接 PATCH 上去,不重新 GET+合併雲端內容。
// 平常每答一題就會呼叫到這裡(經過 debounce),這樣才不會每題都打兩次 API。
// 跨裝置的合併交給 cloudSyncFull 在其他時機(見上面註解)處理。
async function cloudSyncLight() {
  if (SYNC_IN_FLIGHT) return SYNC_IN_FLIGHT;
  SYNC_IN_FLIGHT = (async () => {
    const gistId = await resolveGistId();
    await ghApi('/gists/' + gistId, {
      method: 'PATCH',
      body: JSON.stringify({ files: { [GIST_FILENAME]: { content: JSON.stringify(STATE) } } }),
    });
    localStorage.setItem(GH_LAST_SYNC_KEY, String(Date.now()));
    return false;
  })();
  try {
    return await SYNC_IN_FLIGHT;
  } finally {
    SYNC_IN_FLIGHT = null;
  }
}

/* -------- 限流冷卻 + 最近同步錯誤紀錄 -------- */
function getCooldownUntil() {
  const v = Number(localStorage.getItem(GH_COOLDOWN_KEY) || 0);
  return v > Date.now() ? v : 0;
}
function setCooldown(ms) {
  localStorage.setItem(GH_COOLDOWN_KEY, String(Date.now() + ms));
}
function clearCooldown() {
  localStorage.removeItem(GH_COOLDOWN_KEY);
}
function isRateLimitError(err) {
  return !!err && (err.status === 403 || err.status === 429);
}
function classifySyncError(err) {
  if (isRateLimitError(err)) return '被 GitHub 限流';
  if (err && err.status === 401) return 'token 無效或已過期';
  if (err && err.status === 404) return '找不到同步用的 Gist';
  if (err && typeof err.status === 'number') return 'GitHub 錯誤(' + err.status + ')';
  return '網路連線失敗';
}
function getSyncLog() {
  try { return JSON.parse(localStorage.getItem(GH_SYNC_LOG_KEY) || '[]'); } catch (e) { return []; }
}
function addSyncLogEntry(reason) {
  const log = getSyncLog();
  log.unshift({ t: Date.now(), reason });
  if (log.length > SYNC_LOG_MAX) log.length = SYNC_LOG_MAX;
  localStorage.setItem(GH_SYNC_LOG_KEY, JSON.stringify(log));
  renderSyncLog();
}
// 統一的自動同步失敗處理:記錄一筆簡短紀錄,踩到限流就冷卻一段時間、
// 冷卻期間完全不再嘗試(本機進度不受影響),冷卻剛開始時才跳一次短 toast 提醒,
// 不會每答一題就跳一次又長又難懂的原始錯誤訊息。
function handleSyncError(err) {
  const reason = classifySyncError(err);
  addSyncLogEntry(reason);
  if (isRateLimitError(err)) {
    const wasAlreadyCoolingDown = !!getCooldownUntil();
    setCooldown(RATE_LIMIT_COOLDOWN_MS);
    if (!wasAlreadyCoolingDown) {
      showToast('雲端同步被限流,已暫停約 ' + Math.round(RATE_LIMIT_COOLDOWN_MS / 60000) + ' 分鐘,本機進度不受影響', 4000);
    }
  } else {
    showToast('雲端同步失敗:' + reason, 4000);
  }
  renderSyncStatus();
}

// 每次 saveState() 都會呼叫這裡。原本是每次變動都立刻送出去(commit 638e91c 為了
// 避免手機切背景太快、debounce 還沒跑完就被中斷),但代價是背一個字就打兩次 API
// (GET+PATCH),背個五六十字很容易踩到 GitHub 的短時間高頻寫入限流。
// 現在改成:平常作答用 debounce(停下來 SYNC_DEBOUNCE_MS 才送,且只做輕量 PATCH,
// 不重新 GET+合併),真正「來不及等」的切背景/關頁面則由 flushCloudSync 立刻補送,
// 兩者合起來就不會漏進度、頻率又降下來了。
let SYNC_DIRTY = false;
let SYNC_LOOP_RUNNING = false;
let SYNC_DEBOUNCE_TIMER = null;
let SYNC_DEBOUNCE_FIRST_AT = 0;
function scheduleCloudSync() {
  if (!getGhToken()) return;
  SYNC_DIRTY = true;
  const now = Date.now();
  if (!SYNC_DEBOUNCE_FIRST_AT) SYNC_DEBOUNCE_FIRST_AT = now;
  clearTimeout(SYNC_DEBOUNCE_TIMER);
  // 連續作答停不下來的話,最多等 SYNC_DEBOUNCE_MAX_WAIT_MS 還是會送一次,不會無限延後。
  const delay = (now - SYNC_DEBOUNCE_FIRST_AT >= SYNC_DEBOUNCE_MAX_WAIT_MS) ? 0 : SYNC_DEBOUNCE_MS;
  SYNC_DEBOUNCE_TIMER = setTimeout(runCloudSyncLoop, delay);
}
async function runCloudSyncLoop() {
  if (SYNC_LOOP_RUNNING) return;
  SYNC_LOOP_RUNNING = true;
  while (SYNC_DIRTY) {
    SYNC_DIRTY = false;
    SYNC_DEBOUNCE_FIRST_AT = 0;
    if (getCooldownUntil()) break; // 冷卻中就完全不嘗試,本機進度不受影響
    try {
      await cloudSyncLight();
      renderSyncStatus();
    } catch (err) {
      console.error(err);
      handleSyncError(err);
      break; // 避免網路/限流持續有問題時卡在無限重試迴圈,下次 saveState() 會再自然觸發一次
    }
  }
  SYNC_LOOP_RUNNING = false;
}

// 每隔 FULL_SYNC_INTERVAL_MS 保底做一次完整(GET+合併)同步,確保就算分頁一直開著
// 不曾切背景/切回前景,其他裝置的進度還是會定期合併進來。
setInterval(() => {
  if (!getGhToken() || SYNC_IN_FLIGHT || getCooldownUntil()) return;
  cloudSyncFull().then(changed => {
    if (changed) renderAll();
    renderSyncStatus();
  }).catch(err => { console.error(err); handleSyncError(err); });
}, FULL_SYNC_INTERVAL_MS);

async function connectSync(token) {
  localStorage.setItem(GH_TOKEN_KEY, token);
  RESOLVED_GIST_ID = null;
  try {
    await cloudSyncFull();
    clearCooldown();
    showToast('雲端同步已連接 ✅');
    renderAll();
  } catch (e) {
    console.error(e);
    addSyncLogEntry(classifySyncError(e));
    localStorage.removeItem(GH_TOKEN_KEY);
    showToast('連接失敗:' + classifySyncError(e), 4000);
  }
  renderSyncStatus();
}

// 切分頁/切 app、關分頁的瞬間,萬一還有變動沒送出(debounce 還沒等到),
// 立刻補跑一次,不等 debounce 的時間到。
function flushCloudSync() {
  if (!getGhToken()) return;
  clearTimeout(SYNC_DEBOUNCE_TIMER);
  runCloudSyncLoop();
}
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    flushCloudSync();
  } else if (document.visibilityState === 'visible' && getGhToken() && !getCooldownUntil()) {
    // 分頁切回來時主動拉一次雲端(完整合併)—— 不然像電腦分頁開一整天沒重新整理的情況,
    // 手機那邊在別的時段唸的進度永遠不會出現在這台電腦上,直到手動重新整理。
    cloudSyncFull().then(changed => {
      if (changed) { renderAll(); showToast('已同步其他裝置的進度 ☁️'); }
      renderSyncStatus();
    }).catch(err => { console.error(err); handleSyncError(err); });
  }
});
window.addEventListener('pagehide', flushCloudSync);

function disconnectSync() {
  localStorage.removeItem(GH_TOKEN_KEY);
  localStorage.removeItem(GH_GIST_ID_KEY);
  localStorage.removeItem(GH_LAST_SYNC_KEY);
  localStorage.removeItem(GH_COOLDOWN_KEY);
  RESOLVED_GIST_ID = null;
  SYNC_DIRTY = false;
  clearTimeout(SYNC_DEBOUNCE_TIMER);
  showToast('已取消雲端同步(本機進度不受影響)');
  renderSyncStatus();
}

function renderSyncLog() {
  const el = document.getElementById('syncLogList');
  if (!el) return;
  const log = getSyncLog();
  el.textContent = '';
  if (!log.length) {
    const p = document.createElement('p');
    p.className = 'muted';
    p.textContent = '目前沒有同步錯誤紀錄。';
    el.appendChild(p);
    return;
  }
  for (const entry of log) {
    const p = document.createElement('p');
    p.className = 'muted';
    p.textContent = new Date(entry.t).toLocaleString() + ' — ' + entry.reason;
    el.appendChild(p);
  }
}

function renderSyncStatus() {
  const disc = document.getElementById('syncDisconnected');
  const conn = document.getElementById('syncConnected');
  if (!disc || !conn) return;
  const token = getGhToken();
  if (token) {
    disc.classList.add('hidden');
    conn.classList.remove('hidden');
    const last = localStorage.getItem(GH_LAST_SYNC_KEY);
    let statusText = last
      ? '已連接 ✅ 上次同步:' + new Date(Number(last)).toLocaleString()
      : '已連接 ✅ 尚未同步過';
    const cooldownUntil = getCooldownUntil();
    if (cooldownUntil) {
      const mins = Math.max(1, Math.ceil((cooldownUntil - Date.now()) / 60000));
      statusText += ' ・ 目前被限流中,約 ' + mins + ' 分鐘後恢復自動同步';
    }
    document.getElementById('syncStatusText').textContent = statusText;
  } else {
    disc.classList.remove('hidden');
    conn.classList.add('hidden');
  }
  renderSyncLog();
}
function resetDailyCounterIfNeeded() {
  const t = todayStr();
  if (STATE.todayDrawDate !== t) {
    STATE.todayDrawDate = t;
    STATE.todayDrawCount = 0;
  }
}
// 目前「學習中」且屬於已勾選學習範圍的單字數 —— 用來跟 learningCap 比較,
// 決定還能不能再抽新字進來。
function countActiveLearning() {
  let n = 0;
  for (const id in STATE.cards) {
    if (STATE.cards[id].status !== 'learning') continue;
    const w = WORDS_BY_ID[id];
    if (w && isCategoryActive(w)) n++;
  }
  return n;
}
// 到期時間用「日曆日」比較,只要換日了就算到期,不用剛好等滿 24 小時,
// 不然每天讀書時間不固定的話,前一天學的字隔天常常會「差一點沒到」而不出現。
function isDue(dueMs) {
  if (dueMs == null) return false;
  const d = new Date(dueMs); d.setHours(0, 0, 0, 0);
  const t = new Date(); t.setHours(0, 0, 0, 0);
  return d.getTime() <= t.getTime();
}

/* ===================== 資料 ===================== */
let WORDS = [];
let WORDS_BY_ID = {};
let BUCKETS = {}; // "level_broadPos" -> [word,...]
let INTRO_QUEUE = [];
let INTRO_POS = 0;

let VERBS = [];

async function loadVerbData() {
  const res = await fetch('data/verbs.json');
  const data = await res.json();
  VERBS = data.verbs;
}

async function loadData() {
  const res = await fetch('data/vocab.json');
  const data = await res.json();
  WORDS = data.words;
  WORDS.forEach(w => { WORDS_BY_ID[w.id] = w; });
  WORDS.forEach(w => {
    const k = w.level + '_' + w.broadPos;
    (BUCKETS[k] = BUCKETS[k] || []).push(w);
  });
}

function isCategoryActive(word) {
  return STATE.settings.activeCategories.includes(catKey(word.level, word.tier));
}

function buildIntroQueue() {
  let eligible = WORDS.filter(w => isCategoryActive(w) && !STATE.cards[w.id]);
  shuffle(eligible);
  const placed = new Set();
  const queue = [];
  for (const w of eligible) {
    if (placed.has(w.id)) continue;
    queue.push(w.id); placed.add(w.id);
    if (w.pairWith && WORDS_BY_ID[w.pairWith] && !placed.has(w.pairWith) && !STATE.cards[w.pairWith] && isCategoryActive(WORDS_BY_ID[w.pairWith])) {
      queue.push(w.pairWith); placed.add(w.pairWith);
    }
  }
  INTRO_QUEUE = queue;
  INTRO_POS = 0;
}

function popNextIntroWord() {
  while (INTRO_POS < INTRO_QUEUE.length) {
    const id = INTRO_QUEUE[INTRO_POS++];
    const w = WORDS_BY_ID[id];
    if (w && !STATE.cards[id] && isCategoryActive(w)) return id;
  }
  return null;
}

/* ===================== 抽卡邏輯 ===================== */
// 每日優先順序:
//   1. 今天「還沒出現過」的所有學習中字 —— 不管 SRS 到期日,一定要全部先過一輪。
//   2. 補新字進來,直到學習中字數補到 learningCap 上限。
//   3. 答錯等待重考的字(retryQueue,同一天內的即時複習)。
//   4. 上面都做完了(今天該看的學習中字都看過、新字也補滿了)才輪到 SRS 到期日邏輯:
//      到期的字優先,沒有到期字的話就隨機挑學習中的字繼續練習。
function pickNextCard() {
  resetDailyCounterIfNeeded();
  const today = todayStr();

  let unseenIds = Object.keys(STATE.cards).filter(id => {
    const c = STATE.cards[id];
    if (c.status !== 'learning') return false;
    const w = WORDS_BY_ID[id];
    if (!w || !isCategoryActive(w)) return false;
    return c.lastSeen !== today;
  });
  if (unseenIds.length) {
    unseenIds.sort((a, b) => {
      const da = STATE.cards[a].due, db = STATE.cards[b].due;
      if (da == null && db == null) return 0;
      if (da == null) return 1;
      if (db == null) return -1;
      return da - db;
    });
    return { type: 'quiz', wordId: unseenIds[0] };
  }

  if (countActiveLearning() < STATE.settings.learningCap) {
    const id = popNextIntroWord();
    if (id) return { type: 'intro', wordId: id };
  }

  const retryReady = STATE.retryQueue
    .filter(r => r.availableAt <= STATE.drawCounter)
    .sort((a, b) => a.availableAt - b.availableAt);
  if (retryReady.length) {
    const item = retryReady[0];
    STATE.retryQueue = STATE.retryQueue.filter(r => r !== item);
    return { type: 'quiz', wordId: item.wordId };
  }

  let dueIds = Object.keys(STATE.cards).filter(id => {
    const c = STATE.cards[id];
    if (c.status !== 'learning' || c.due == null) return false;
    const w = WORDS_BY_ID[id];
    if (!w || !isCategoryActive(w)) return false;
    return isDue(c.due);
  });
  if (dueIds.length) {
    dueIds.sort((a, b) => STATE.cards[a].due - STATE.cards[b].due);
    return { type: 'quiz', wordId: dueIds[0] };
  }
  // 新字額度用完了(或已經沒有新字可抽),但「學習中」還有字沒複習完 →
  // 繼續抽學習中的字來練習,不要直接卡住不動。
  const learningIds = Object.keys(STATE.cards).filter(id => {
    const c = STATE.cards[id];
    if (c.status !== 'learning') return false;
    const w = WORDS_BY_ID[id];
    return w && isCategoryActive(w);
  });
  if (learningIds.length) {
    const id = learningIds[Math.floor(Math.random() * learningIds.length)];
    return { type: 'quiz', wordId: id };
  }
  return null;
}

/* ===================== 幹擾選項 ===================== */
function pickDistractors(word, count, mode) {
  // 選項顯示的文字:意思題顯示中文意思,讀音/克漏字題顯示假名讀音。
  // 兩個不同的字剛好意思或讀音文字一模一樣的話,畫面上會出現兩個看起來相同的選項
  // (一個對一個錯),所以要用這個文字去重複,不能只靠 word id 判斷。
  const keyOf = mode === 'meaning' ? (w => w.meaning) : (w => w.reading);
  const usedKeys = new Set([keyOf(word)]);
  const pool = mode === 'meaning' ? (word.synonymCandidates || []) : (word.soundAlikeCandidates || []);
  let candidates = pool.slice();
  if (word.pairWith && WORDS_BY_ID[word.pairWith] && !candidates.includes(word.pairWith)) {
    candidates.unshift(word.pairWith);
  }
  candidates = candidates.filter(id => id !== word.id && WORDS_BY_ID[id]);
  shuffle(candidates);
  const chosen = [];
  for (const id of candidates) {
    if (chosen.length >= count) break;
    const w = WORDS_BY_ID[id];
    const key = keyOf(w);
    if (usedKeys.has(key)) continue;
    usedKeys.add(key);
    chosen.push(w);
  }
  if (chosen.length < count) {
    const bucketKey = word.level + '_' + word.broadPos;
    let bucket = (BUCKETS[bucketKey] || []).filter(w => w.id !== word.id && !chosen.includes(w));
    shuffle(bucket);
    for (const w of bucket) {
      if (chosen.length >= count) break;
      const key = keyOf(w);
      if (usedKeys.has(key)) continue;
      usedKeys.add(key);
      chosen.push(w);
    }
  }
  return chosen.slice(0, count);
}

/* ===================== 測驗題型 ===================== */
function pickQuizType(word) {
  const types = ['meaning', 'word'];
  if (word.word !== word.reading) types.push('typing');
  const clozeExamples = (word.examples || []).map(ex => extractClozeTarget(ex.furi)).filter(Boolean);
  if (clozeExamples.length) types.push('cloze');
  return types[Math.floor(Math.random() * types.length)];
}

let CURRENT = null; // {mode:'intro'|'quiz', word, quizType, correctId, options, clozeInfo, answered}

function pendingCardIsValid(pick) {
  if (!pick || !pick.wordId) return false;
  const w = WORDS_BY_ID[pick.wordId];
  if (!w || !isCategoryActive(w)) return false;
  if (pick.type === 'intro') return !STATE.cards[pick.wordId];
  return pick.type === 'quiz';
}

function startCard() {
  document.getElementById('companionBar').classList.add('hidden');
  resetDailyCounterIfNeeded();
  const introEl = document.getElementById('introCard');
  const quizEl = document.getElementById('quizCard');
  const emptyEl = document.getElementById('emptyState');
  introEl.classList.add('hidden');
  quizEl.classList.add('hidden');
  emptyEl.classList.add('hidden');

  // 如果上一張卡還沒作答完(例如剛重新整理頁面),就繼續顯示同一張,
  // 不重新抽新的一張 —— 不然重新整理會讓待複習/待學的字憑空消失。
  let pick = pendingCardIsValid(STATE.pendingCard) ? STATE.pendingCard : null;
  let isFreshDraw = false;
  if (!pick) {
    pick = pickNextCard();
    isFreshDraw = true;
  }

  if (!pick) {
    CURRENT = null;
    STATE.pendingCard = null;
    emptyEl.classList.remove('hidden');
    const activeCount = WORDS.filter(isCategoryActive).length;
    if (activeCount === 0) {
      emptyEl.innerHTML = '目前沒有選取任何學習範圍。<br>請到「設定」頁勾選要背的分類。';
    } else {
      emptyEl.innerHTML = '🎉 目前沒有可以複習或學習的字了!<br>明天再回來繼續吧。';
    }
    renderStats();
    saveState();
    return;
  }

  if (isFreshDraw) {
    STATE.drawCounter++;
    STATE.todayDrawCount++;
    if (pick.type === 'quiz') {
      pick.quizType = pickQuizType(WORDS_BY_ID[pick.wordId]);
      const c = STATE.cards[pick.wordId];
      if (c) {
        const today = todayStr();
        // daysCount = 這個字實際被複習到的天數(不是出現次數),同一天內因答錯重考
        // 而重複出現不會增加天數,只有換到新的一天才會 +1。
        if (c.lastSeen && c.lastSeen !== today) c.daysCount = (c.daysCount || 1) + 1;
        c.lastSeen = today;
        c.updatedAt = Date.now();
      }
    }
    STATE.pendingCard = pick;
  }

  if (pick.type === 'intro') {
    CURRENT = { mode: 'intro', word: WORDS_BY_ID[pick.wordId] };
    renderIntroCard(CURRENT.word);
  } else {
    const word = WORDS_BY_ID[pick.wordId];
    CURRENT = { mode: 'quiz', word, quizType: pick.quizType, answered: false };
    renderQuizCard(CURRENT);
  }
  renderStats();
  saveState();
}

function renderIntroCard(word) {
  document.getElementById('introCard').classList.remove('hidden');
  document.getElementById('introWord').textContent = word.word;
  document.getElementById('introReading').textContent = word.reading;
  document.getElementById('introMeaning').textContent = word.meaning;
  const ex = (word.examples || [])[0];
  document.getElementById('introExample').textContent = ex ? (stripFurigana(ex.furi).replace(/<\/?b>/g, '') + '(' + ex.tc + ')') : '';

  // 第一次見到這個字時只先顯示單字本身,按下顯示按鈕才揭曉讀音/意思/例句和判斷按鈕,
  // 讓使用者先靠自己回想再對答案。
  const detailsEl = document.getElementById('introDetails');
  const actionsEl = document.getElementById('introActions');
  const showBtn = document.getElementById('introShowBtn');
  detailsEl.classList.add('hidden');
  actionsEl.classList.add('hidden');
  showBtn.classList.remove('hidden');
  showBtn.onclick = () => {
    detailsEl.classList.remove('hidden');
    actionsEl.classList.remove('hidden');
    showBtn.classList.add('hidden');
  };
}

function renderQuizCard(cur) {
  const word = cur.word;
  document.getElementById('quizCard').classList.remove('hidden');
  document.getElementById('quizFeedback').classList.add('hidden');
  document.getElementById('revealKanjiBtn').classList.add('hidden');
  document.getElementById('quizMcOptions').classList.add('hidden');
  document.getElementById('quizTypeInput').classList.add('hidden');
  document.getElementById('typingAnswer').value = '';
  const tagEl = document.getElementById('quizTypeTag');
  const stemEl = document.getElementById('quizStem');
  stemEl.classList.remove('small');
  const contextEl = document.getElementById('quizContext');
  contextEl.classList.add('hidden');
  contextEl.innerHTML = '';

  if (cur.quizType === 'meaning') {
    tagEl.textContent = '看讀音選意思';
    stemEl.textContent = word.reading;
    renderQuizContext(word, 'jp');
    const distractors = pickDistractors(word, 3, 'meaning');
    const options = shuffle([word, ...distractors]);
    cur.correctId = word.id;
    cur.options = options;
    const wrap = document.getElementById('quizMcOptions');
    wrap.innerHTML = '';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.textContent = opt.meaning;
      btn.addEventListener('click', () => submitAnswer(opt.id === word.id));
      wrap.appendChild(btn);
    });
    wrap.classList.remove('hidden');
  } else if (cur.quizType === 'word') {
    tagEl.textContent = '看意思選單字';
    stemEl.textContent = word.meaning;
    renderQuizContext(word, 'tc');
    const distractors = pickDistractors(word, 3, 'sound');
    const options = shuffle([word, ...distractors]);
    cur.correctId = word.id;
    cur.options = options;
    const wrap = document.getElementById('quizMcOptions');
    wrap.innerHTML = '';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.textContent = opt.reading; // 預設只顯示平假名
      btn.dataset.kanji = opt.word;
      btn.addEventListener('click', () => submitAnswer(opt.id === word.id));
      wrap.appendChild(btn);
    });
    wrap.classList.remove('hidden');
    const revealBtn = document.getElementById('revealKanjiBtn');
    revealBtn.classList.remove('hidden');
    revealBtn.onclick = () => {
      wrap.querySelectorAll('button').forEach(b => { b.textContent = b.dataset.kanji + '(' + b.textContent + ')'; });
      revealBtn.classList.add('hidden');
    };
  } else if (cur.quizType === 'typing') {
    tagEl.textContent = '看漢字打讀音';
    stemEl.textContent = word.word;
    document.getElementById('quizTypeInput').classList.remove('hidden');
    document.getElementById('submitTyping').onclick = () => {
      const val = document.getElementById('typingAnswer').value.trim();
      submitAnswer(val === word.reading);
    };
    document.getElementById('typingAnswer').onkeydown = (e) => {
      if (e.key === 'Enter') document.getElementById('submitTyping').click();
    };
    // 已經會念、懶得打字時用,直接當作答對
    document.getElementById('skipTyping').onclick = () => submitAnswer(true);
  } else if (cur.quizType === 'cloze') {
    tagEl.textContent = '例句克漏字';
    const clozeOptions = (word.examples || []).map(ex => extractClozeTarget(ex.furi)).filter(Boolean);
    const chosen = clozeOptions[Math.floor(Math.random() * clozeOptions.length)];
    cur.clozeInfo = chosen;
    stemEl.textContent = chosen.blanked;
    stemEl.classList.add('small');
    const distractors = pickDistractors(word, 3, 'sound');
    const options = shuffle([word, ...distractors]);
    cur.correctId = word.id;
    cur.options = options;
    const wrap = document.getElementById('quizMcOptions');
    wrap.innerHTML = '';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.textContent = opt.reading; // 預設只顯示平假名
      btn.dataset.kanji = opt.word;
      btn.addEventListener('click', () => submitAnswer(opt.id === word.id));
      wrap.appendChild(btn);
    });
    wrap.classList.remove('hidden');
    const revealBtn = document.getElementById('revealKanjiBtn');
    revealBtn.classList.remove('hidden');
    revealBtn.onclick = () => {
      wrap.querySelectorAll('button').forEach(b => { b.textContent = b.dataset.kanji + '(' + b.textContent + ')'; });
      revealBtn.classList.add('hidden');
    };
  }
}

function submitAnswer(correct) {
  if (!CURRENT || CURRENT.answered) return;
  CURRENT.answered = true;
  const word = CURRENT.word;
  gradeAnswer(word.id, correct);
  STATE.pendingCard = null;
  STATE.stats.totalReviewed++;
  STATE.stats.correctStreak = correct ? STATE.stats.correctStreak + 1 : 0;

  document.getElementById('quizMcOptions').classList.add('hidden');
  document.getElementById('quizTypeInput').classList.add('hidden');
  document.getElementById('revealKanjiBtn').classList.add('hidden');

  const fb = document.getElementById('quizFeedback');
  fb.classList.remove('hidden');
  const resEl = document.getElementById('feedbackResult');
  resEl.textContent = correct ? '✅ 答對了' : '❌ 答錯了,再接再厲';
  resEl.className = 'feedback-result ' + (correct ? 'correct' : 'wrong');
  document.getElementById('answerWord').textContent = word.word;
  document.getElementById('answerReading').textContent = word.reading;
  document.getElementById('answerMeaning').textContent = word.meaning;
  const ex = (word.examples || [])[0];
  document.getElementById('answerExample').textContent = ex ? (stripFurigana(ex.furi).replace(/<\/?b>/g, '') + '(' + ex.tc + ')') : '';
  const seenDays = STATE.cards[word.id] ? (STATE.cards[word.id].daysCount || 1) : 1;
  document.getElementById('answerOccurrence').textContent = '第 ' + seenDays + ' 天';

  if (Math.random() < 0.3) showCompanionLine(correct ? 'correct' : 'wrong');
  if (STATE.stats.correctStreak > 0 && STATE.stats.correctStreak % 10 === 0) showCompanionLine('milestone');

  saveState();
  renderStats();
}

function gradeAnswer(wordId, correct) {
  let c = STATE.cards[wordId];
  if (!c) { c = { status: 'learning', box: 0, due: null, reps: 0, lapses: 0, daysCount: 1 }; STATE.cards[wordId] = c; }
  c.reps++;
  if (correct) {
    c.box = Math.min(INTERVALS.length - 1, c.box + 1);
    c.due = Date.now() + INTERVALS[c.box] * 86400000;
  } else {
    c.lapses++;
    c.box = Math.max(0, c.box - 1);
    c.due = null;
    const delay = 5 + Math.floor(Math.random() * 4);
    STATE.retryQueue.push({ wordId, availableAt: STATE.drawCounter + delay });
  }
  c.updatedAt = Date.now();
}

function markMastered(wordId) {
  let c = STATE.cards[wordId] || { box: 0, reps: 0, lapses: 0, daysCount: 1 };
  c.status = 'mastered';
  c.due = null;
  if (!(c.reps >= 1)) c.reps = 1;
  if (!(c.daysCount >= 1)) c.daysCount = 1;
  c.updatedAt = Date.now();
  STATE.cards[wordId] = c;
  STATE.retryQueue = STATE.retryQueue.filter(r => r.wordId !== wordId);
  showCompanionLine('mastered');
  saveState();
}
function restoreWord(wordId) {
  let c = STATE.cards[wordId];
  if (c) { c.status = 'learning'; if (c.due == null) c.due = Date.now(); c.updatedAt = Date.now(); }
  saveState();
}

/* ===================== Intro 卡按鈕 ===================== */
document.addEventListener('DOMContentLoaded', init);

function bindStaticEvents() {
  document.getElementById('introKnowBtn').addEventListener('click', () => {
    const word = CURRENT.word;
    // 「已認識」= 這個字我本來就會 → 直接進「已學會」,不再出現、也不計入學習中上限
    STATE.cards[word.id] = { status: 'mastered', box: 0, due: null, reps: 1, lapses: 0, daysCount: 1, lastSeen: todayStr(), updatedAt: Date.now() };
    STATE.pendingCard = null;
    saveState();
    startCard();
  });
  document.getElementById('introLearnBtn').addEventListener('click', () => {
    const word = CURRENT.word;
    STATE.cards[word.id] = { status: 'learning', box: 0, due: null, reps: 1, lapses: 0, daysCount: 1, lastSeen: todayStr(), updatedAt: Date.now() };
    const delay = 3 + Math.floor(Math.random() * 3);
    STATE.retryQueue.push({ wordId: word.id, availableAt: STATE.drawCounter + delay });
    STATE.pendingCard = null;
    saveState();
    startCard();
  });
  document.getElementById('masterBtn').addEventListener('click', () => {
    if (!CURRENT) return;
    STATE.pendingCard = null;
    markMastered(CURRENT.word.id);
    startCard();
  });
  document.getElementById('nextCardBtn').addEventListener('click', () => startCard());

  document.querySelectorAll('.nav-tabs button').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
  bindVerbDrillEvents();

  document.getElementById('searchBox').addEventListener('input', renderWordList);
  document.getElementById('statusFilter').addEventListener('change', renderWordList);
  document.getElementById('clearCatFilter').addEventListener('click', () => {
    ACTIVE_CAT = null;
    renderManageView();
  });
  document.getElementById('dailyCapInput').addEventListener('input', (e) => {
    let v = parseInt(e.target.value, 10);
    if (isNaN(v) || v < 0) v = 0;
    if (PENDING_SETTINGS) PENDING_SETTINGS.learningCap = v;
  });
  document.getElementById('settingsSaveBtn').addEventListener('click', () => {
    if (!PENDING_SETTINGS) return;
    STATE.settings.activeCategories = Array.from(PENDING_SETTINGS.activeCategories);
    STATE.settings.learningCap = PENDING_SETTINGS.learningCap;
    saveState();
    buildIntroQueue();
    showToast('設定已儲存 ✅');
    renderStats();
  });
  document.getElementById('exportBtn').addEventListener('click', exportProgress);
  document.getElementById('importBtn').addEventListener('click', () => document.getElementById('importFile').click());
  document.getElementById('importFile').addEventListener('change', importProgress);
  document.getElementById('resetBtn').addEventListener('click', () => {
    const cloudNote = getGhToken() ? '你目前有連接雲端同步,重設後空的進度也會同步覆蓋掉雲端備份。' : '';
    if (!confirm('確定要清空所有進度嗎?這個動作無法復原,建議先匯出備份。' + cloudNote)) return;
    STATE = defaultState();
    saveState();
    showToast('已重設全部進度');
    buildIntroQueue();
    renderAll();
  });

  document.getElementById('syncConnectBtn').addEventListener('click', () => {
    const token = document.getElementById('syncTokenInput').value.trim();
    if (!token) { showToast('請先貼上 token'); return; }
    document.getElementById('syncTokenInput').value = '';
    showToast('連接中…');
    connectSync(token);
  });
  document.getElementById('syncNowBtn').addEventListener('click', () => {
    showToast('同步中…');
    cloudSyncFull().then(changed => {
      if (changed) renderAll();
      clearCooldown();
      showToast('同步完成 ✅');
      renderSyncStatus();
    }).catch(err => {
      console.error(err);
      handleSyncError(err);
    });
  });
  document.getElementById('syncDisconnectBtn').addEventListener('click', () => {
    if (!confirm('確定要取消雲端同步嗎?本機的進度不會被刪除,只是不會再自動備份到 GitHub。')) return;
    disconnectSync();
  });

  renderSyncStatus();
}

/* ===================== Tabs ===================== */
function switchTab(name) {
  document.querySelectorAll('.nav-tabs button').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
  document.getElementById('viewStudy').classList.toggle('hidden', name !== 'study');
  document.getElementById('viewTopics').classList.toggle('hidden', name !== 'topics');
  document.getElementById('viewManage').classList.toggle('hidden', name !== 'manage');
  document.getElementById('viewSettings').classList.toggle('hidden', name !== 'settings');
  if (name === 'manage') renderManageView();
  if (name === 'settings') renderSettingsView();
  if (name === 'study' && !CURRENT) startCard();
}

/* ===================== 主題式學習:動詞變化 ===================== */
// 動詞資料另外整理成 data/verbs.json(group: 1=五段, 2=一段, 3=する類),不跟主要
// 單字庫共用 —— 這份 N1~N3 單字庫缺食べる/来る/する這種基礎動詞,又混了不少
// 複合動詞字尾(交う、込む之類),不適合直接拿來出變化練習。
const SURU_TABLE = {
  te: 'して', nai: 'しない', ta: 'した', ukemi: 'される', kanou: 'できる', shieki: 'させる', ikou: 'しよう', ba: 'すれば',
  meirei: 'しろ', shiekiukemi: 'させられる', tara: 'したら', tari: 'したり', tai: 'したい',
};
const KURU_TABLE = {
  te: 'きて', nai: 'こない', ta: 'きた', ukemi: 'こられる', kanou: 'こられる', shieki: 'こさせる', ikou: 'こよう', ba: 'くれば',
  meirei: 'こい', shiekiukemi: 'こさせられる', tara: 'きたら', tari: 'きたり', tai: 'きたい',
};
const GODAN_ROWS = {
  'う': ['わ', 'い', 'う', 'え', 'お'],
  'く': ['か', 'き', 'く', 'け', 'こ'],
  'ぐ': ['が', 'ぎ', 'ぐ', 'げ', 'ご'],
  'す': ['さ', 'し', 'す', 'せ', 'そ'],
  'つ': ['た', 'ち', 'つ', 'て', 'と'],
  'ぬ': ['な', 'に', 'ぬ', 'ね', 'の'],
  'ぶ': ['ば', 'び', 'ぶ', 'べ', 'ぼ'],
  'む': ['ま', 'み', 'む', 'め', 'も'],
  'る': ['ら', 'り', 'る', 'れ', 'ろ'],
};
const GODAN_TE = { 'う': 'って', 'つ': 'って', 'る': 'って', 'く': 'いて', 'ぐ': 'いで', 'ぬ': 'んで', 'ぶ': 'んで', 'む': 'んで', 'す': 'して' };
const GODAN_TA = { 'う': 'った', 'つ': 'った', 'る': 'った', 'く': 'いた', 'ぐ': 'いだ', 'ぬ': 'んだ', 'ぶ': 'んだ', 'む': 'んだ', 'す': 'した' };
// 語尾音便不規則、無法套用一般規則的五段動詞(目前只有「行く」)。
const GODAN_ONBIN_EXCEPTIONS = { '行く': { te: 'いって', ta: 'いった' } };

function godanStem(reading, rowIndex) {
  const last = reading.slice(-1);
  return reading.slice(0, -1) + GODAN_ROWS[last][rowIndex];
}

// tier 依使用頻率分三層,決定抽題權重(見 TIER_WEIGHT):最常出現的 9 種、
// 比較少的 4 種、更少的 3 種,權重分別對應約 60% / 30% / 10% 的總抽中機率。
const CONJ_FORMS = [
  { id: 'nai', label: 'ない形(否定)', tier: 1 },
  { id: 'te', label: 'て形', tier: 1 },
  { id: 'ta', label: 'た形(過去)', tier: 1 },
  { id: 'kanou', label: '可能形', tier: 1 },
  { id: 'ikou', label: '意向形(推量)', tier: 1 },
  { id: 'meirei', label: '命令形', tier: 1 },
  { id: 'ukemi', label: '受身形(被動)', tier: 1 },
  { id: 'shieki', label: '使役形', tier: 1 },
  { id: 'shiekiukemi', label: '使役受身形', tier: 1 },
  { id: 'ba', label: 'ば形(假定)', tier: 2 },
  { id: 'tara', label: 'たら形(過去假定)', tier: 2 },
  { id: 'tari', label: 'たり形(並列列舉)', tier: 2 },
  { id: 'tai', label: 'たい形(願望)', tier: 2 },
  { id: 'kinshi', label: '禁止形(～な)', tier: 3 },
  { id: 'tagaru', label: 'たがる形(第三人稱願望)', tier: 3 },
  { id: 'nasai', label: 'なさい形', tier: 3 },
];
const TIER_WEIGHT = { 1: 60 / 9, 2: 30 / 4, 3: 10 / 3 };

// 動詞的分類標籤,用在解答頁面告訴使用者「這是哪一類動詞」。
// 来る雖然資料裡跟する共用 group:3,但文法上是カ行變格,獨立特殊處理。
function verbGroupLabel(verb) {
  if (verb.word === '来る') return 'カ行變格動詞(來る,不規則)';
  if (verb.group === 3) return verb.word === 'する' ? 'サ行變格動詞(する,不規則)' : 'サ變動詞(〜する複合動詞)';
  if (verb.group === 2) return '二類動詞(一段動詞)';
  return '一類動詞(五段動詞)';
}

// 依動詞的 group(1=五段/2=一段/3=する類)算出指定活用形的正確讀音;
// 来る、する(含複合的「〜する」)另外處理,其餘照對應類別的規則變化。
function conjugateCore(verb, formId) {
  if (verb.word === '来る') return KURU_TABLE[formId];
  if (verb.group === 3) {
    const prefix = verb.reading.slice(0, -2); // 去掉語尾「する」
    return prefix + SURU_TABLE[formId];
  }
  if (verb.group === 2) {
    const stem = verb.reading.slice(0, -1); // 去掉語尾「る」
    const table = {
      te: stem + 'て', nai: stem + 'ない', ta: stem + 'た', ukemi: stem + 'られる', kanou: stem + 'られる',
      shieki: stem + 'させる', ikou: stem + 'よう', ba: stem + 'れば',
      meirei: stem + 'ろ', shiekiukemi: stem + 'させられる', tara: stem + 'たら', tari: stem + 'たり', tai: stem + 'たい',
    };
    return table[formId];
  }
  // group 1(五段)
  const last = verb.reading.slice(-1);
  const exc = GODAN_ONBIN_EXCEPTIONS[verb.word];
  const taVal = exc ? exc.ta : verb.reading.slice(0, -1) + GODAN_TA[last];
  switch (formId) {
    case 'te': return exc ? exc.te : verb.reading.slice(0, -1) + GODAN_TE[last];
    case 'ta': return taVal;
    case 'tara': return taVal + 'ら';
    case 'tari': return taVal + 'り';
    case 'nai': return godanStem(verb.reading, 0) + 'ない';
    case 'ukemi': return godanStem(verb.reading, 0) + 'れる';
    case 'shieki': return godanStem(verb.reading, 0) + 'せる';
    // す行五段動詞(話す等)使役受身不縮約,避免さ+され的怪音;其餘縮約成「あ段+される」。
    case 'shiekiukemi': return last === 'す' ? godanStem(verb.reading, 0) + 'せられる' : godanStem(verb.reading, 0) + 'される';
    case 'kanou': return godanStem(verb.reading, 3) + 'る';
    case 'ba': return godanStem(verb.reading, 3) + 'ば';
    case 'ikou': return godanStem(verb.reading, 4) + 'う';
    case 'meirei': return godanStem(verb.reading, 3);
    case 'tai': return godanStem(verb.reading, 1) + 'たい';
    default: return '';
  }
}

// 禁止形是辭書形直接加「な」,跟動詞類別無關,所有 group 共用同一條規則。
// たがる形、なさい形則是「たい形」去掉語尾「たい」後接的字尾,借用 tai 的結果推導,不用另外開表。
function conjugate(verb, formId) {
  if (formId === 'kinshi') return verb.reading + 'な';
  if (formId === 'tagaru' || formId === 'nasai') {
    const taiStem = conjugateCore(verb, 'tai').slice(0, -2);
    return formId === 'tagaru' ? taiStem + 'たがる' : taiStem + 'なさい';
  }
  return conjugateCore(verb, formId);
}

// 把讀音答案換算成漢字寫法(如果這個動詞本身是「漢字+送假名」寫成的),讓使用者
// 用漢字打答案也算對。原理:每種活用形都是「語幹不變、只替換/加上語尾假名」,
// 而送假名(語尾)不管漢字寫法還是讀音寫法一定逐字相同,差別只在語幹要用幾個
// 漢字表示——所以只要抓出「讀音結果」跟「原本讀音」的共同前綴,前綴以後就是
// 新語尾;讀音語幹被換掉的字數,從漢字寫法尾端去掉一樣多字,接上同一段新語尾
// 就是漢字答案。来る比較特殊(語幹讀音本身在く/き/こ之間變,不是單純語尾替換
// 的問題),用固定對照表另外處理。
function conjugateKanji(verb, formId) {
  if (verb.word === verb.reading) return null; // 整個動詞就是假名寫的,沒有額外的漢字答案
  if (verb.word === '来る') {
    if (formId === 'kinshi') return '来るな';
    if (formId === 'tagaru') return '来たがる';
    if (formId === 'nasai') return '来なさい';
    return '来' + KURU_TABLE[formId].slice(1);
  }
  const readingResult = conjugate(verb, formId);
  let common = 0;
  const maxCommon = Math.min(verb.reading.length, readingResult.length);
  while (common < maxCommon && verb.reading[common] === readingResult[common]) common++;
  const removed = verb.reading.length - common;
  if (removed > verb.word.length) return null; // 算出來不合理就不提供漢字答案,保守起見
  return verb.word.slice(0, verb.word.length - removed) + readingResult.slice(common);
}

/* -------- 提示:告訴使用者這是第幾類動詞,並示範這一類怎麼變化 -------- */
// 每一類固定挑 1-2 個常見字當示範,而不是依題目動詞的詞尾動態挑選 —— 好處是
// 簡單好維護,缺點是五段動詞的て形/た形類(有音便)可能跟題目詞尾對不上,所以
// 另外用 GODAN_ONBIN_HINT_NOTE 補充文字說明其他詞尾的對應方式。挑例字時會避開
// 跟題目本身同一個字,不然示範就直接等於洩漏答案了。
const HINT_EXAMPLES = {
  1: [{ word: '買う', reading: 'かう', group: 1 }, { word: '読む', reading: 'よむ', group: 1 }],
  2: [{ word: '食べる', reading: 'たべる', group: 2 }, { word: '見る', reading: 'みる', group: 2 }],
  3: [{ word: 'する', reading: 'する', group: 3 }, { word: '勉強する', reading: 'べんきょうする', group: 3 }],
};
const GODAN_ONBIN_HINT_FORMS = new Set(['te', 'ta', 'tara', 'tari']);
const GODAN_ONBIN_HINT_NOTE = '五段動詞這個形會因辭書形語尾假名不同而不一樣:う/つ/る→って(った);く→いて(いた);ぐ→いで(いだ);ぬ/ぶ/む→んで(んだ);す→して(した)。下面只示範「う」結尾的情況,其他詞尾請照這個對照套用。';

function pickHintExample(group, currentWord) {
  const list = HINT_EXAMPLES[group] || [];
  return list.find(v => v.word !== currentWord) || list[0];
}

// 回傳這一題提示要顯示的內容:動詞類別 + 示範例字的變化 + (五段て/た形類)額外的詞尾對照說明。
function buildVerbHint(verb, formId) {
  const groupLabel = verbGroupLabel(verb);
  if (verb.word === '来る') {
    return { groupLabel, note: '來る是不規則動詞,日文裡只有這一個字這樣變(語幹讀音會在く/き/こ之間變化),沒有通用規則可以套用,建議直接把整組活用形背起來。' };
  }
  const example = pickHintExample(verb.group, verb.word);
  const demoAnswer = conjugate(example, formId);
  const note = (verb.group === 1 && GODAN_ONBIN_HINT_FORMS.has(formId)) ? GODAN_ONBIN_HINT_NOTE : '';
  return { groupLabel, demoWord: example.word, demoAnswer, note };
}

// 每種活用形配的填空句型,{blank}是要填入該活用形的地方;句型刻意不帶特定受詞,
// 因為同一句型要套用在及物(食べる)、不及物(行く)、する複合動詞等所有動詞上都要文法正確。
// 常出現的 9 種形各給 2 個句型增加變化,較少見的形給 1 個就好,控制範圍。
const SENTENCE_TEMPLATES = {
  nai: ['きょうは{blank}。', 'たぶん{blank}。'],
  te: ['{blank}ください。', '{blank}みてください。'],
  ta: ['きのう、{blank}。', 'もう{blank}。'],
  kanou: ['わたしは{blank}。', 'だれでも{blank}。'],
  ikou: ['いっしょに{blank}。', 'さあ、{blank}。'],
  meirei: ['はやく{blank}。', 'だまって{blank}。'],
  ukemi: ['先生に{blank}。', 'みんなに{blank}。'],
  shieki: ['子どもに{blank}。', '先生が{blank}。'],
  shiekiukemi: ['母に{blank}。', 'いつも{blank}。'],
  ba: ['{blank}、いいです。'],
  tara: ['{blank}、教えてください。'],
  tari: ['休みの日は、{blank}、掃除したりします。'],
  tai: ['{blank}です。'],
  kinshi: ['危ないから、{blank}。'],
  tagaru: ['子どもは{blank}。'],
  nasai: ['そろそろ{blank}。'],
};

// 本次練習答錯的題目,間隔幾題後會再考一次;只存在記憶體裡,重新整理就重置 ——
// 這個模式的目標是當場練到反射動作,不是像單字卡一樣長期排程記憶。
let VC_RETRY = [];
let VC_ASK_COUNT = 0;
let VC_CURRENT = null; // { verb, formId, template }
let VC_ANSWERED = false;

// 依 TIER_WEIGHT 做加權隨機抽形:層級權重總和內取亂數,依序扣減直到落在該形上。
function pickWeightedForm() {
  const total = CONJ_FORMS.reduce((s, f) => s + TIER_WEIGHT[f.tier], 0);
  let r = Math.random() * total;
  for (const f of CONJ_FORMS) {
    r -= TIER_WEIGHT[f.tier];
    if (r <= 0) return f;
  }
  return CONJ_FORMS[CONJ_FORMS.length - 1];
}

function pickVerbQuestion() {
  VC_ASK_COUNT++;
  const dueRetryIdx = VC_RETRY.findIndex(r => r.availableAt <= VC_ASK_COUNT);
  if (dueRetryIdx !== -1) return VC_RETRY.splice(dueRetryIdx, 1)[0].item;
  const verb = VERBS[Math.floor(Math.random() * VERBS.length)];
  const form = pickWeightedForm();
  const templates = SENTENCE_TEMPLATES[form.id];
  const template = templates[Math.floor(Math.random() * templates.length)];
  return { verb, formId: form.id, template };
}

function renderVerbDrillStats() {
  const d = STATE.verbDrill;
  document.getElementById('vcStreak').textContent = d.streak;
  document.getElementById('vcBest').textContent = d.best;
  document.getElementById('vcTotal').textContent = d.totalAnswered;
  document.getElementById('vcAccuracy').textContent = d.totalAnswered ? Math.round(d.totalCorrect / d.totalAnswered * 100) + '%' : '0%';
}

function startVerbQuestion() {
  VC_CURRENT = pickVerbQuestion();
  VC_ANSWERED = false;
  const { verb, template } = VC_CURRENT;
  document.getElementById('vcFormTag').textContent = CONJ_FORMS.find(f => f.id === VC_CURRENT.formId).label;
  document.getElementById('vcStem').textContent = template.replace('{blank}', '＿＿＿＿');
  document.getElementById('vcMeaning').textContent = `${verb.word}(${verb.reading}) - ${verb.meaning}`;
  document.getElementById('vcAnswerInput').value = '';
  document.getElementById('vcInputRow').classList.remove('hidden');
  document.getElementById('vcFeedback').classList.add('hidden');
  document.getElementById('vcHintPanel').classList.add('hidden');
  document.getElementById('vcHintBtn').classList.remove('hidden');
  document.getElementById('vcAnswerInput').focus();
}

// 用漢字或讀音打答案都算對(見 conjugateKanji 的說明)。
function isVerbAnswerCorrect(val) {
  if (!VC_CURRENT) return false;
  if (val === conjugate(VC_CURRENT.verb, VC_CURRENT.formId)) return true;
  const kanji = conjugateKanji(VC_CURRENT.verb, VC_CURRENT.formId);
  return kanji != null && val === kanji;
}

// 按提示不計入作答、不影響連續對答/正確率,純粹顯示說明。按下後提示取代按鈕
// 顯示在原本按鈕的位置(句子跟輸入框中間),不跟按鈕併排,避免太擠。
function showVerbHint() {
  if (!VC_CURRENT) return;
  const hint = buildVerbHint(VC_CURRENT.verb, VC_CURRENT.formId);
  const panel = document.getElementById('vcHintPanel');
  panel.innerHTML = '';
  const groupLine = document.createElement('div');
  groupLine.textContent = hint.groupLabel;
  panel.appendChild(groupLine);
  if (hint.demoWord) {
    const demoLine = document.createElement('div');
    demoLine.textContent = `${hint.demoWord} → ${hint.demoAnswer}`;
    panel.appendChild(demoLine);
  }
  if (hint.note) {
    const noteLine = document.createElement('div');
    noteLine.textContent = hint.note;
    panel.appendChild(noteLine);
  }
  document.getElementById('vcHintBtn').classList.add('hidden');
  panel.classList.remove('hidden');
}

// 跳過等同「不會、直接看答案」,計入答錯(打斷連續對答),但一樣會排進稍後重考。
function submitVerbAnswer(correct) {
  if (VC_ANSWERED || !VC_CURRENT) return;
  VC_ANSWERED = true;
  const d = STATE.verbDrill;
  d.totalAnswered++;
  if (correct) {
    d.totalCorrect++;
    d.streak++;
    if (d.streak > d.best) d.best = d.streak;
  } else {
    d.streak = 0;
    VC_RETRY.push({ item: VC_CURRENT, availableAt: VC_ASK_COUNT + 4 + Math.floor(Math.random() * 3) });
  }
  saveState();
  renderVerbDrillStats();
  document.getElementById('vcInputRow').classList.add('hidden');
  const fb = document.getElementById('vcFeedback');
  fb.classList.remove('hidden');
  const resultEl = document.getElementById('vcFeedbackResult');
  resultEl.textContent = correct ? '✅ 答對了' : '❌ 不對';
  resultEl.className = 'feedback-result ' + (correct ? 'correct' : 'wrong');
  const answer = conjugate(VC_CURRENT.verb, VC_CURRENT.formId);
  document.getElementById('vcAnswerWord').textContent = VC_CURRENT.template.replace('{blank}', answer);
  document.getElementById('vcAnswerGroup').textContent = `${VC_CURRENT.verb.word} → ${verbGroupLabel(VC_CURRENT.verb)}`;
}

function bindVerbDrillEvents() {
  document.getElementById('topicVerbConjBtn').addEventListener('click', () => {
    document.getElementById('topicsHub').classList.add('hidden');
    document.getElementById('verbConjView').classList.remove('hidden');
    renderVerbDrillStats();
    startVerbQuestion();
  });
  document.getElementById('verbConjBackBtn').addEventListener('click', () => {
    document.getElementById('verbConjView').classList.add('hidden');
    document.getElementById('topicsHub').classList.remove('hidden');
  });
  document.getElementById('vcSubmitBtn').addEventListener('click', () => {
    const val = document.getElementById('vcAnswerInput').value.trim();
    submitVerbAnswer(isVerbAnswerCorrect(val));
  });
  document.getElementById('vcAnswerInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('vcSubmitBtn').click();
  });
  document.getElementById('vcSkipBtn').addEventListener('click', () => submitVerbAnswer(false));
  document.getElementById('vcHintBtn').addEventListener('click', showVerbHint);
  document.getElementById('vcNextBtn').addEventListener('click', () => startVerbQuestion());
}

/* ===================== 統計 / 列表渲染 ===================== */
function renderStats() {
  document.getElementById('statDrawn').textContent = STATE.todayDrawCount;
  const today = todayStr();
  let learning = 0, mastered = 0, dueToday = 0;
  for (const w of WORDS) {
    const c = STATE.cards[w.id];
    if (!c) continue;
    if (c.status === 'mastered') { mastered++; continue; }
    if (c.status === 'learning' && isCategoryActive(w)) {
      learning++;
      // 「待複習」= 背過(學習中)但今天還沒出現過的字,跟 SRS 排程的到期日是兩回事。
      if (c.lastSeen !== today) dueToday++;
    }
  }
  document.getElementById('statNew').textContent = learning + '/' + STATE.settings.learningCap;
  document.getElementById('statDue').textContent = dueToday;
  document.getElementById('statMastered').textContent = mastered;
}

// 三種狀態:mastered(已學會) / learning(學習中) / new(還沒學)
function wordStatus(wordId) {
  const c = STATE.cards[wordId];
  if (!c) return 'new';
  if (c.status === 'mastered') return 'mastered';
  return 'learning';
}
const STATUS_LABEL = { mastered: '已學會', learning: '學習中', new: '還沒學' };
const STATUS_ICON = { mastered: '🏆', learning: '📖', new: '🔍' };

// 目前被點選的分類篩選(null = 不篩選)
let ACTIVE_CAT = null;

function renderManageView() {
  const grid = document.getElementById('categoryGrid');
  grid.innerHTML = '';
  for (const level of LEVELS) {
    for (const tier of TIERS) {
      const words = WORDS.filter(w => w.level === level && w.tier === tier);
      const total = words.length;
      let mastered = 0, learning = 0, fresh = 0;
      for (const w of words) {
        const s = wordStatus(w.id);
        if (s === 'mastered') mastered++;
        else if (s === 'learning') learning++;
        else fresh++;
      }
      const key = catKey(level, tier);
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'category-cell' + (ACTIVE_CAT === key ? ' selected' : '');
      cell.innerHTML = `<span class="cell-head"><span class="badge ${LEVEL_BADGE[level]}">${level}</span> ${TIER_LABEL[tier]}</span>
        <span class="cell-stats">
          <span class="cnt">${STATUS_ICON.mastered} 已學會 ${mastered}/${total}</span>
          <span class="cnt">${STATUS_ICON.learning} 學習中 ${learning}/${total}</span>
          <span class="cnt">${STATUS_ICON.new} 還沒學 ${fresh}/${total}</span>
        </span>`;
      cell.addEventListener('click', () => {
        ACTIVE_CAT = (ACTIVE_CAT === key) ? null : key;
        renderManageView();
      });
      grid.appendChild(cell);
    }
  }
  const filterBar = document.getElementById('activeCatFilter');
  if (ACTIVE_CAT) {
    const [lv, tr] = ACTIVE_CAT.split('_');
    document.getElementById('activeCatLabel').textContent = '目前只顯示:' + lv + ' ' + TIER_LABEL[tr];
    filterBar.classList.remove('hidden');
  } else {
    filterBar.classList.add('hidden');
  }
  renderWordList();
}

function renderWordList() {
  const q = document.getElementById('searchBox').value.trim().toLowerCase();
  const statusFilter = document.getElementById('statusFilter').value;
  const body = document.getElementById('listBody');
  body.innerHTML = '';
  let shown = 0, matched = 0;
  const MAX_RENDER = 300;

  // 先蒐集符合條件的字,並把「已學會 > 學習中 > 還沒學」排在前面,
  // 這樣剛標記的字一定看得到,不會被幾千個沒碰過的字擠掉。
  const ORDER = { mastered: 0, learning: 1, new: 2 };
  const hits = [];
  for (const w of WORDS) {
    if (ACTIVE_CAT && catKey(w.level, w.tier) !== ACTIVE_CAT) continue;
    const status = wordStatus(w.id);
    if (statusFilter !== 'all' && status !== statusFilter) continue;
    if (q && !(w.word.includes(q) || w.reading.includes(q) || w.meaning.toLowerCase().includes(q))) continue;
    hits.push({ w, status });
  }
  matched = hits.length;
  hits.sort((a, b) => ORDER[a.status] - ORDER[b.status]);

  for (const { w, status } of hits) {
    if (shown >= MAX_RENDER) break;
    shown++;
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${w.word}</td><td>${w.reading}</td><td>${w.meaning}</td>
      <td><span class="badge ${LEVEL_BADGE[w.level]}">${w.level}</span></td>
      <td class="status-cell">${STATUS_ICON[status]} ${STATUS_LABEL[status]}</td><td></td>`;
    const actionTd = tr.lastElementChild;
    const btn = document.createElement('button');
    btn.className = 'btn small ghost';
    if (status === 'mastered') {
      btn.textContent = '恢復';
      btn.addEventListener('click', () => { restoreWord(w.id); renderManageView(); });
    } else {
      btn.textContent = '已學會';
      btn.addEventListener('click', () => { markMastered(w.id); renderManageView(); });
    }
    actionTd.appendChild(btn);
    body.appendChild(tr);
  }
  document.getElementById('listCount').textContent =
    '符合條件:' + matched + '個' + (matched > MAX_RENDER ? '(已學會/學習中優先顯示,僅列出前' + MAX_RENDER + '個,可用搜尋縮小範圍)' : '');
}

// 設定頁的「學習範圍」和「單字數上限」改成同一個框框、按「儲存設定」才會真的存進 STATE,
// 在按下去之前的勾選/輸入都只是暫存在這裡,不會影響正在進行中的學習。
let PENDING_SETTINGS = null;

function renderSettingsView() {
  renderSyncStatus();
  PENDING_SETTINGS = {
    activeCategories: new Set(STATE.settings.activeCategories),
    learningCap: STATE.settings.learningCap,
  };
  const wrap = document.getElementById('categoryChips');
  wrap.innerHTML = '';
  for (const level of LEVELS) {
    for (const tier of TIERS) {
      const key = catKey(level, tier);
      const count = WORDS.filter(w => w.level === level && w.tier === tier).length;
      const label = document.createElement('label');
      label.className = 'chip';
      label.style.cssText = 'display:inline-flex;align-items:center;gap:6px;background:#f2ede6;border:1px solid var(--line);border-radius:999px;padding:6px 12px;font-size:13px;cursor:pointer;';
      label.innerHTML = `<input type="checkbox" data-key="${key}" ${PENDING_SETTINGS.activeCategories.has(key) ? 'checked' : ''}>
        <span class="badge ${LEVEL_BADGE[level]}">${level}</span> ${TIER_LABEL[tier]} (${count})`;
      wrap.appendChild(label);
    }
  }
  wrap.querySelectorAll('input[type=checkbox]').forEach(cb => {
    cb.addEventListener('change', () => {
      const key = cb.dataset.key;
      if (cb.checked) PENDING_SETTINGS.activeCategories.add(key);
      else PENDING_SETTINGS.activeCategories.delete(key);
    });
  });
  document.getElementById('dailyCapInput').value = PENDING_SETTINGS.learningCap;
}

/* ===================== 匯出 / 匯入 ===================== */
function exportProgress() {
  const blob = new Blob([JSON.stringify(STATE)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const d = new Date();
  const stamp = d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
  a.href = url; a.download = 'jlpt-srs-progress-' + stamp + '.json';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('進度已匯出 💾');
}
function importProgress(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const loaded = JSON.parse(reader.result);
      if (!loaded || typeof loaded !== 'object' || !loaded.cards) throw new Error('format');
      STATE = Object.assign(defaultState(), loaded);
      STATE.settings = Object.assign({}, defaultState().settings, loaded.settings || {});
      STATE = migrateState(STATE);
      STATE.pendingCard = null;
      saveState();
      showToast('進度匯入成功 ✅');
      buildIntroQueue();
      CURRENT = null;
      renderAll();
    } catch (err) {
      showToast('匯入失敗:檔案格式不正確');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

/* ===================== 初始化 ===================== */
function renderAll() {
  renderStats();
  if (!document.getElementById('viewStudy').classList.contains('hidden')) startCard();
  if (!document.getElementById('viewManage').classList.contains('hidden')) renderManageView();
  if (!document.getElementById('viewSettings').classList.contains('hidden')) renderSettingsView();
  if (!document.getElementById('verbConjView').classList.contains('hidden')) renderVerbDrillStats();
}

async function init() {
  STATE = loadState();
  await Promise.all([loadData(), loadVerbData()]);
  buildIntroQueue();
  bindStaticEvents();
  startCard();
  showCompanionLine('open');
  // 先用本機資料立刻畫面,雲端拉取放在背景做,拉到比較新的資料才整個重畫。
  if (getGhToken()) {
    if (getCooldownUntil()) {
      renderSyncStatus(); // 冷卻中就不嘗試,直接用本機資料,狀態列會顯示還要等多久
    } else {
      try {
        const changed = await cloudSyncFull();
        if (changed) renderAll();
        renderSyncStatus();
      } catch (e) {
        console.error(e);
        handleSyncError(e);
      }
    }
  }
}
