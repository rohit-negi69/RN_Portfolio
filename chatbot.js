/* ================= AI CHATBOT ENGINE =================
   Matching, follow-up memory and UI. Consumes the pure-data globals
   CHAT_CONFIG and CHAT_KB (loaded first via chatbot-kb.js). */
(function () {
  const KB = window.CHAT_KB.entries;

  /* ---------------- MATCHING ENGINE ---------------- */
  const SYNONYMS = {
    ml: 'machine learning', ai: 'artificial intelligence', dl: 'deep learning',
    js: 'javascript', py: 'python', cv: 'resume', xai: 'shap explainable',
    skils: 'skills', sklls: 'skills', skil: 'skills', tecnical: 'technical skills',
    gg: 'leetcode dsa', algo: 'algorithm algorithms', viz: 'visualization',
    proj: 'project projects', repo: 'github repository', uni: 'university college',
    college: 'university education', school: 'education', grad: 'education btech',
    marks: 'cgpa percentage education', score: 'accuracy metric', mail: 'email',
    gmail: 'email', whatsapp: 'phone contact', number: 'phone contact',
    email: 'contact email',
    linkedin: 'contact linkedin', github: 'contact github project',
    background: 'education experience', availability: 'hiring', available: 'hiring available',
    fresher: 'experience', junior: 'experience', rohit: 'about', negi: 'about',
    he: 'about', his: 'about', him: 'about', guy: 'about', candidate: 'about hire',
    hire: 'hiring available', hiring: 'hiring available', recruiting: 'hiring available',
    strong: 'strength', best: 'strength best project', top: 'strength best project',
    deploy: 'deployment', shipped: 'deployment production', prod: 'production',
    chatbot: 'nvidia rag llm', bot: 'nvidia rag llm', llm: 'nvidia rag llm',
    gpt: 'nvidia rag llm', hack: 'hackathon', win: 'won award position',
    kaggle: 'project ml', nlp: 'rag llm nvidia'
  };
  const STOP = new Set(['the', 'a', 'an', 'is', 'are', 'of', 'to', 'in', 'and', 'or', 'for', 'on', 'with', 'what', 'which', 'your', 'his', 'her', 'tell', 'me', 'can', 'you', 'do', 'does', 'did', 'i', 'my', 'please', 'there', 'this', 'that', 'it', 'at', 'as', 'be', 'was', 'were', 'have', 'has', 'he', 'she', 'they', 'we', 'how', 'why', 'when', 'who', 'know', 'knows', 'knows about', 'about', 'more', 'any', 'give', 'show', 'want', 'would', 'like', 'some', 'info', 'details', 'detail', 'much', 'many', 'also']);

  function normalize(s) {
    return ' ' + s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
  }
  function tokenize(s) {
    return s.toLowerCase().replace(/[^a-z0-9\s+#]/g, ' ').split(/\s+/).filter(t => t.length > 1 && !STOP.has(t));
  }
  function lev1(a, b) {
    if (a.length !== b.length) return 2; // only equal-length single substitution counts as a typo
    let diff = 0;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i] && ++diff > 1) return 2;
    return diff;
  }

  function scoreEntry(entry, tokens, raw) {
    // greeting-style entries only fire on very short inputs so they never win content queries
    if (entry.exact && tokens.length > 2) return 0;
    let score = 0;
    for (const k of entry.keywords) {
      if (k.includes(' ')) {           // multi-word phrase — match against raw text
        if (raw.includes(' ' + k + ' ') || raw.includes(k)) score += 6;
        continue;
      }
      for (const t of tokens) {
        if (t === k) { score += 3; continue; }
        // plural / suffix tolerance (skill↔skills, project↔projects) — one extra char only
        if (t.length >= 4 && (t.startsWith(k) || k.startsWith(t)) && Math.abs(t.length - k.length) <= 2) { score += 2.5; continue; }
        if (t.length >= 5 && k.length >= 5 && lev1(t, k) <= 1) score += 2;  // typo tolerance
      }
    }
    return score;
  }

  function expandTokens(text) {
    const tokens = [...new Set(tokenize(text))]; // dedupe
    const extra = [];
    for (const t of tokens) {
      const syn = SYNONYMS[t];
      if (syn) extra.push(...syn.split(' '));
    }
    return { tokens: [...new Set(tokens.concat(extra))], raw: normalize(text) };
  }

  /* ---------------- FOLLOW-UP MEMORY ---------------- */
  let pendingList = null;   // array of { tag, label } for "first/second/more" follow-ups
  let pendingIndex = -1;
  let staleTurns = 0;       // consecutive non-follow-up turns since the list was set — expires context
  const ORDINALS = { first: 0, '1st': 0, second: 1, '2nd': 1, third: 2, '3rd': 2, fourth: 3, '4th': 3 };
  const PENDING_TTL = 2;    // forget the list after this many unrelated turns

  function setPending(tag) {
    const LISTS = window.CHAT_KB.walkOrder;
    if (LISTS[tag]) { pendingList = LISTS[tag]; pendingIndex = -1; staleTurns = 0; }
    else { pendingList = null; pendingIndex = -1; staleTurns = 0; }
  }

  function tryFollowUp(text) {
    if (!pendingList) return null;
    const t = text.toLowerCase();
    const wantsMore = /\b(more|detail|details|elaborate|expand|deep dive|explain)\b/.test(t) && !/\b(skill|contact|about)\b/.test(t);
    let ordinal = -1;
    for (const [w, i] of Object.entries(ORDINALS)) {
      if (new RegExp(`\\b(the )?${w}\\b`).test(t)) { ordinal = i; break; }
    }
    const m = t.match(/\bproject (\d)\b/);
    if (m) ordinal = parseInt(m[1]) - 1;

    const isFollowUp = wantsMore || ordinal >= 0;
    if (!isFollowUp) {
      // an unrelated question while a list is pending: count it, expire after TTL
      if (++staleTurns >= PENDING_TTL) { pendingList = null; pendingIndex = -1; staleTurns = 0; }
      return null;
    }
    staleTurns = 0;

    if (ordinal >= 0 && ordinal < pendingList.length) {
      const tag = pendingList[ordinal];
      pendingList = null; pendingIndex = -1; // consume
      const e = KB.find(x => x.tag === tag);
      return e ? { text: e.answer, tag: e.tag } : null;
    }
    if (wantsMore) {
      pendingIndex++;
      if (pendingIndex >= pendingList.length) { pendingList = null; pendingIndex = -1; return null; }
      const tag = pendingList[pendingIndex];
      const e = KB.find(x => x.tag === tag);
      return e ? { text: e.answer, tag: e.tag } : null;  // keep pendingList alive for further "more"
    }
    return null;
  }

  /* ---------------- ANSWER SELECTION ---------------- */
  const FALLBACK_TEXT = `Hmm, that one's outside my résumé brain! 🤔 I know everything about Rohit — his skills, projects, internships, education, certifications, achievements and contact. Try one of those, or type "help"!`;

  const LABELS = {
    'project-attrition': 'the attrition platform', 'project-dashboard': 'the IBM dashboard',
    'project-spotify': 'the Spotify recommender', 'project-cnn': 'the CNN classifier',
    'skills': 'his full skill set', 'experience': 'his internships', 'education': 'his education',
    'certifications': 'his certifications', 'achievements': 'his achievements', 'contact': 'his contact details'
  };

  const SOCIAL_TAGS = new Set(['greeting', 'thanks', 'help']);

  function getAnswer(rawText) {
    const { tokens, raw } = expandTokens(rawText);

    const fu = tryFollowUp(rawText);
    if (fu) return fu;

    const scored = KB.map(e => ({ e, s: scoreEntry(e, tokens, raw) })).sort((a, b) => b.s - a.s);
    const bestContent = scored.find(x => !SOCIAL_TAGS.has(x.e.tag));
    // phrase matches in raw text can win even with zero tokens; empty/greeting-only input falls back to greeting
    const best = (bestContent && bestContent.s >= 2.5) ? bestContent : scored[0];

    if (best.s < 2.5) {
      pendingList = null; staleTurns = 0;
      return { text: FALLBACK_TEXT, tag: 'fallback' };
    }

    setPending(best.e.tag);

    const second = scored.find(x => x.e !== best.e && !SOCIAL_TAGS.has(x.e.tag));
    if (second && second.s >= best.s * 0.8 && LABELS[second.e.tag] && best.e.tag !== 'help') {
      return {
        text: `${best.e.answer}\n\n💡 You could also ask about ${LABELS[second.e.tag]}.`,
        tag: best.e.tag
      };
    }
    return { text: best.e.answer, tag: best.e.tag };
  }

  /* ---------------- UI ---------------- */
  const fab = document.getElementById('chatFab');
  const win = document.getElementById('chatWindow');
  const closeBtn = document.getElementById('chatClose');
  const messages = document.getElementById('chatMessages');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  const suggestionsEl = document.getElementById('chatSuggestions');
  const heroAskAi = document.getElementById('heroAskAi');

  const SUGGESTIONS = [
    'Tell me about Rohit',
    'What makes him a strong hire?',
    'Show me his projects',
    'His experience?',
    'How can I contact him?',
    'His certifications?'
  ];
  let shownSuggestions = 0;

  /* ---------- Action buttons per topic ---------- */
  const GH = { label: '🐙 View GitHub', href: window.CHAT_CONFIG.github, external: true };
  const RES = { label: '📥 Download Resume', href: window.CHAT_CONFIG.resumePath, download: true };
  const MAIL = { label: '✉️ Send Email', href: 'mailto:' + window.CHAT_CONFIG.email };
  const WA = { label: '💬 WhatsApp', href: window.CHAT_CONFIG.whatsapp, external: true };
  const ACTIONS = {
    'project-attrition': [RES, { label: '💼 View LinkedIn', href: window.CHAT_CONFIG.linkedin, external: true }],
    'project-spotify': [GH], 'project-dashboard': [GH], 'project-cnn': [GH],
    'projects': [GH, RES], 'resume': [RES],
    'contact': [MAIL, WA], 'hiring': [MAIL, WA], 'salary': [MAIL, WA],
    'skills': [{ label: '🚀 See His Projects', scrollTo: '#projects' }],
    'experience': [RES], 'education': [{ label: '🏅 See Certifications', scrollTo: '#certifications' }],
    'achievements': [{ label: '🏅 See Certifications', scrollTo: '#certifications' }],
    'summary': [{ label: '🚀 See His Projects', scrollTo: '#projects' }, RES],
    'strengths': [RES, { label: '💼 View LinkedIn', href: window.CHAT_CONFIG.linkedin, external: true }]
  };

  function renderActions(tag, msgEl) {
    const acts = ACTIONS[tag];
    if (!acts || !acts.length) return;
    const wrap = document.createElement('div');
    wrap.className = 'msg-actions';
    acts.forEach(a => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'msg-action-btn';
      b.textContent = a.label;
      b.addEventListener('click', () => {
        if (a.scrollTo) {
          document.querySelector(a.scrollTo)?.scrollIntoView({ behavior: 'smooth' });
          toggle(false);
        } else if (a.href) {
          if (a.external) window.open(a.href, '_blank', 'noopener');
          else if (a.download) {
            const link = document.createElement('a');
            link.href = a.href; link.download = 'Rohit-Negi-Resume.pdf';
            document.body.appendChild(link); link.click(); link.remove();
          } else window.location.href = a.href;
        }
      });
      wrap.appendChild(b);
    });
    msgEl.appendChild(wrap);
  }

  function renderSuggestions() {
    suggestionsEl.innerHTML = '';
    const start = shownSuggestions % SUGGESTIONS.length;
    const batch = [];
    for (let i = 0; i < SUGGESTIONS.length && batch.length < 3; i++) {
      const s = SUGGESTIONS[(start + i) % SUGGESTIONS.length];
      if (!batch.includes(s)) batch.push(s);
    }
    batch.forEach(s => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = s;
      b.addEventListener('click', () => sendUserMessage(s));
      suggestionsEl.appendChild(b);
    });
    shownSuggestions++;
  }

  /* ---------- Chat history persistence ---------- */
  const STORAGE_KEY = 'rohit-portfolio-chat-v2';
  let history = [];
  try { history = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]'); } catch { history = []; }

  function saveHistory() {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-30))); } catch {}
  }

  function restoreHistory() {
    if (!history.length) return false;
    history.forEach(m => {
      if (m.who === 'bot') addMsg(m.text, 'bot', m.tag);
      else addMsg(m.text, 'user');
    });
    return true;
  }

  function clearChat() {
    history = [];
    pendingList = null; pendingIndex = -1; staleTurns = 0;
    try { sessionStorage.removeItem(STORAGE_KEY); } catch {}
    messages.innerHTML = '';
    shownSuggestions = 0;
    toggle(true); // re-greet
  }

  function toggle(open) {
    const willOpen = open !== undefined ? open : !win.classList.contains('open');
    win.classList.toggle('open', willOpen);
    win.setAttribute('aria-hidden', String(!willOpen));
    if (willOpen && messages.children.length === 0) {
      const restored = restoreHistory();
      renderSuggestions();
      if (!restored) {
        botReply(
          `Hi! 👋 I'm Rohit's AI Assistant — I know his complete résumé: every project, metric, certification and achievement.\n\nTry "what makes him a strong hire?" or ask about any specific skill!`
        , true);
      }
    }
  }

  fab.addEventListener('click', () => toggle());
  closeBtn.addEventListener('click', () => toggle(false));
  document.getElementById('chatClear').addEventListener('click', clearChat);
  heroAskAi && heroAskAi.addEventListener('click', () => toggle(true));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });

  function addMsg(text, who, tag) {
    const div = document.createElement('div');
    div.className = `msg ${who}`;
    if (who === 'bot') {
      // escape HTML, then render **bold** as <strong> (answers come from the trusted KB)
      const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      div.innerHTML = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    } else {
      div.textContent = text;
    }
    if (who === 'bot') renderActions(tag, div);
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  function botReply(text, skipSuggestions, tag) {
    const typing = document.createElement('div');
    typing.className = 'msg bot typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
    const delay = Math.min(400 + text.length * 6, 1500);
    setTimeout(() => {
      typing.remove();
      addMsg(text, 'bot', tag);
      history.push({ who: 'bot', text, tag });
      saveHistory();
      if (!skipSuggestions) renderSuggestions();
    }, delay);
  }

  function sendUserMessage(text) {
    const clean = text.trim();
    if (!clean) return;
    addMsg(clean, 'user');
    history.push({ who: 'user', text: clean });
    saveHistory();
    const { text: answer, tag } = getAnswer(clean);
    botReply(answer, false, tag);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    sendUserMessage(input.value);
    input.value = '';
  });
})();
