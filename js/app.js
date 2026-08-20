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
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove('show'), 1600);
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
  scheduleCloudPush();
}

/* ===================== 雲端同步(GitHub Gist) ===================== */
// 用使用者自己的 GitHub 帳號當同步後端:進度存成一個私人 Gist,
// 每個瀏覽器貼上同一組 Personal Access Token 就能連到同一份。
const GIST_FILENAME = 'jlpt-srs-progress.json';
const GH_TOKEN_KEY = 'jlpt-srs-gh-token';
const GH_GIST_ID_KEY = 'jlpt-srs-gh-gist-id';
const GH_LAST_SYNC_KEY = 'jlpt-srs-gh-last-sync';
let RESOLVED_GIST_ID = null;   // 這次頁面載入期間快取住,避免每次 push 都重新驗證一次
let SYNC_PUSH_TIMER = null;

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
    throw new Error('GitHub API ' + res.status + ': ' + body.slice(0, 200));
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

// 把雲端進度拉下來,只有雲端比本機新的時候才會覆蓋本機。回傳是否真的有覆蓋。
async function cloudPull() {
  const gistId = await resolveGistId();
  const gist = await ghApi('/gists/' + gistId);
  const file = gist.files && gist.files[GIST_FILENAME];
  if (!file) return false;
  // 進度存滿全部單字時,內容可能超過 Gist API 內嵌 content 欄位的截斷門檻(~1MB),
  // 這時要改抓 raw_url 拿完整內容,不然讀到的是被截斷的 JSON。
  let contentStr = file.content;
  if (file.truncated && file.raw_url) {
    const res = await fetch(file.raw_url);
    contentStr = await res.text();
  }
  if (!contentStr) return false;
  const remote = JSON.parse(contentStr);
  if ((remote.updatedAt || 0) > (STATE.updatedAt || 0)) {
    const merged = Object.assign(defaultState(), remote);
    merged.settings = Object.assign({}, defaultState().settings, remote.settings || {});
    STATE = migrateState(merged);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE));
    CURRENT = null;
    buildIntroQueue();
    return true;
  }
  return false;
}

async function cloudPush() {
  const gistId = await resolveGistId();
  await ghApi('/gists/' + gistId, {
    method: 'PATCH',
    body: JSON.stringify({ files: { [GIST_FILENAME]: { content: JSON.stringify(STATE) } } }),
  });
  localStorage.setItem(GH_LAST_SYNC_KEY, String(Date.now()));
}

// 每次 saveState() 都會呼叫這裡,但用 debounce 避免連續作答時瘋狂打 API,
// 停止變動 2 秒後才真的送出去。
function scheduleCloudPush() {
  if (!getGhToken()) return;
  clearTimeout(SYNC_PUSH_TIMER);
  SYNC_PUSH_TIMER = setTimeout(() => {
    cloudPush().then(renderSyncStatus).catch(err => {
      console.error(err);
      showToast('雲端同步失敗,進度仍安全存在本機');
    });
  }, 2000);
}

async function connectSync(token) {
  localStorage.setItem(GH_TOKEN_KEY, token);
  RESOLVED_GIST_ID = null;
  try {
    await cloudPull();
    await cloudPush();
    showToast('雲端同步已連接 ✅');
    renderAll();
  } catch (e) {
    console.error(e);
    localStorage.removeItem(GH_TOKEN_KEY);
    showToast('連接失敗,請確認 token 是否正確(需要 gist 權限)');
  }
  renderSyncStatus();
}

// 切分頁/切 app、關分頁的瞬間,不等 debounce 了,直接把還沒送出的變動立刻推上去,
// 減少「換裝置前剛好卡在 2 秒等待內」而漏同步的機會。
function flushCloudPush() {
  if (!getGhToken() || !SYNC_PUSH_TIMER) return;
  clearTimeout(SYNC_PUSH_TIMER);
  SYNC_PUSH_TIMER = null;
  cloudPush().then(renderSyncStatus).catch(err => console.error(err));
}
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') flushCloudPush();
});
window.addEventListener('pagehide', flushCloudPush);

function disconnectSync() {
  localStorage.removeItem(GH_TOKEN_KEY);
  localStorage.removeItem(GH_GIST_ID_KEY);
  localStorage.removeItem(GH_LAST_SYNC_KEY);
  RESOLVED_GIST_ID = null;
  clearTimeout(SYNC_PUSH_TIMER);
  showToast('已取消雲端同步(本機進度不受影響)');
  renderSyncStatus();
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
    document.getElementById('syncStatusText').textContent = last
      ? '已連接 ✅ 上次同步:' + new Date(Number(last)).toLocaleString()
      : '已連接 ✅ 尚未同步過';
  } else {
    disc.classList.remove('hidden');
    conn.classList.add('hidden');
  }
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
  const pool = mode === 'meaning' ? (word.synonymCandidates || []) : (word.soundAlikeCandidates || []);
  let candidates = pool.slice();
  if (word.pairWith && WORDS_BY_ID[word.pairWith] && !candidates.includes(word.pairWith)) {
    candidates.unshift(word.pairWith);
  }
  candidates = candidates.filter(id => id !== word.id && WORDS_BY_ID[id]);
  shuffle(candidates);
  let chosen = candidates.slice(0, count);
  if (chosen.length < count) {
    const bucketKey = word.level + '_' + word.broadPos;
    let bucket = (BUCKETS[bucketKey] || []).filter(w => w.id !== word.id && !chosen.includes(w.id));
    shuffle(bucket);
    for (const w of bucket) {
      if (chosen.length >= count) break;
      chosen.push(w.id);
    }
  }
  return chosen.slice(0, count).map(id => WORDS_BY_ID[id]);
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
}

function markMastered(wordId) {
  let c = STATE.cards[wordId] || { box: 0, reps: 0, lapses: 0, daysCount: 1 };
  c.status = 'mastered';
  c.due = null;
  if (!(c.reps >= 1)) c.reps = 1;
  if (!(c.daysCount >= 1)) c.daysCount = 1;
  STATE.cards[wordId] = c;
  STATE.retryQueue = STATE.retryQueue.filter(r => r.wordId !== wordId);
  showCompanionLine('mastered');
  saveState();
}
function restoreWord(wordId) {
  let c = STATE.cards[wordId];
  if (c) { c.status = 'learning'; if (c.due == null) c.due = Date.now(); }
  saveState();
}

/* ===================== Intro 卡按鈕 ===================== */
document.addEventListener('DOMContentLoaded', init);

function bindStaticEvents() {
  document.getElementById('introKnowBtn').addEventListener('click', () => {
    const word = CURRENT.word;
    // 「已認識」= 這個字我本來就會 → 直接進「已學會」,不再出現、也不計入學習中上限
    STATE.cards[word.id] = { status: 'mastered', box: 0, due: null, reps: 1, lapses: 0, daysCount: 1, lastSeen: todayStr() };
    STATE.pendingCard = null;
    saveState();
    startCard();
  });
  document.getElementById('introLearnBtn').addEventListener('click', () => {
    const word = CURRENT.word;
    STATE.cards[word.id] = { status: 'learning', box: 0, due: null, reps: 1, lapses: 0, daysCount: 1, lastSeen: todayStr() };
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
    cloudPull().then(changed => {
      if (changed) renderAll();
      return cloudPush();
    }).then(() => {
      showToast('同步完成 ✅');
      renderSyncStatus();
    }).catch(err => {
      console.error(err);
      showToast('同步失敗,請檢查網路或 token');
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
  document.getElementById('viewManage').classList.toggle('hidden', name !== 'manage');
  document.getElementById('viewSettings').classList.toggle('hidden', name !== 'settings');
  if (name === 'manage') renderManageView();
  if (name === 'settings') renderSettingsView();
  if (name === 'study' && !CURRENT) startCard();
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
}

async function init() {
  STATE = loadState();
  await loadData();
  buildIntroQueue();
  bindStaticEvents();
  startCard();
  showCompanionLine('open');
  // 先用本機資料立刻畫面,雲端拉取放在背景做,拉到比較新的資料才整個重畫。
  if (getGhToken()) {
    try {
      const changed = await cloudPull();
      if (changed) renderAll();
      renderSyncStatus();
    } catch (e) {
      console.error(e);
      showToast('雲端同步暫時失敗,先用本機進度');
    }
  }
}
