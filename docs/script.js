const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach((el, idx) => {
    el.style.transitionDelay = `${Math.min(idx * 70, 280)}ms`;
    observer.observe(el);
  });
} else {
  reveals.forEach((el) => el.classList.add('in'));
}

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.main-nav a')];

const setActive = () => {
  const y = window.scrollY + 130;
  let current = sections[0]?.id;

  sections.forEach((sec) => {
    if (y >= sec.offsetTop) current = sec.id;
  });

  navLinks.forEach((a) => {
    const isActive = a.getAttribute('href') === `#${current}`;
    a.classList.toggle('active', isActive);
  });
};

window.addEventListener('scroll', setActive, { passive: true });
window.addEventListener('load', setActive);

[...document.querySelectorAll('.lang-switch .lang')].forEach((a) => {
  const href = (a.getAttribute('href') || '').toLowerCase();
  const lang = href.includes('en.html') ? 'en' : href.includes('ru.html') ? 'ru' : 'de';
  a.addEventListener('click', () => localStorage.setItem('capytarot_lang_pref', lang));
});

const tarotDescriptions = {
  de: {
    '0 fool': 'Neuanfang mit Mut und offenem Herzen.\nDer Weg zeigt sich, sobald du losgehst.',
    '1 magician': 'Alle Werkzeuge sind bereits in deiner Hand.\nFokus macht aus Potenzial sichtbare Resultate.',
    '2 high priestress': 'Deine innere Stimme kennt den nächsten Schritt.\nIn der Stille liegt die entscheidende Wahrheit.',
    '3 empress': 'Fülle, Kreativität und Wachstum sind aktiv.\nWas du nährst, wird stabil aufblühen.',
    '4 emperor': 'Struktur und klare Grenzen geben dir Kraft.\nFühre ruhig, konsequent und fair.',
    '5 hierophant': 'Bewährtes Wissen bringt Orientierung.\nLernen mit Mentor spart dir Umwege.',
    '6 lovers': 'Eine Herzensentscheidung steht an.\nWähle, was wirklich zu dir passt.',
    '7 chariot': 'Richtung und Entschlossenheit sind dein Motor.\nHalte den Fokus und fahr den Sieg heim.',
    '8 strengh': 'Sanfte Stärke wirkt stärker als Druck.\nMit Geduld zähmst du inneres Chaos.',
    '9 hermit': 'Rückzug schenkt klare Sicht.\nEin Schritt zurück ist präzise Navigation.',
    '10 wheel': 'Der Zyklus dreht sich, Timing wird entscheidend.\nBleib flexibel und nutze das Fenster.',
    '11 justice': 'Wahrheit, Fairness und Konsequenz zählen jetzt.\nHandle sauber, dann trägt dich das Ergebnis.',
    '12 hanged man': 'Stillstand ist Perspektivwechsel, kein Ende.\nLoslassen öffnet den klugen Blick.',
    '13 death': 'Ein klares Ende schafft echten Raum.\nTransformation braucht mutigen Schnitt.',
    '14 temperance': 'Heilung entsteht durch Balance.\nHerz und Verstand zusammen bringen Ruhe.',
    '15 devil': 'Muster und Abhängigkeiten werden sichtbar.\nWas du erkennst, kannst du lösen.',
    '16 tower': 'Ein Bruch räumt falsche Fundamente ab.\nKurz Chaos, langfristig Befreiung.',
    '17 star': 'Hoffnung und Regeneration kehren zurück.\nDein echtes Licht darf sichtbar werden.',
    '18 moon': 'Gefühl und Illusion liegen nah beieinander.\nPrüfe sanft und folge deiner Intuition.',
    '19 sun': 'Klarheit, Freude und Erfolg geben Rückenwind.\nJetzt darfst du strahlen und feiern.',
    '20 judgement': 'Ein Weckruf fordert ehrliche Bilanz.\nDeine Annahme wird zum nächsten Level.',
    '21 world': 'Vollendung und Integration sind erreicht.\nSchließe bewusst ab und starte größer neu.',
    'ace of cups': 'Ein emotionaler Neubeginn öffnet dein Herz.\nSag Ja zu echter Verbindung.',
    'ace of pentacles': 'Eine konkrete Chance auf Stabilität ist da.\nSetz klein an und bau nachhaltig auf.',
    'ace of swords': 'Klarheit schneidet durch den Nebel.\nTriff eine präzise, ehrliche Entscheidung.',
    'ace of wands': 'Ein kreativer Zündfunke startet Neues.\nNutze den Impuls sofort.'
  },
  en: {
    '0 fool': 'A fresh beginning calls for brave trust.\nThe path appears as you move.',
    '1 magician': 'You already hold every tool you need.\nFocus turns potential into results.',
    '2 high priestress': 'Your inner voice is the real compass.\nTruth emerges in stillness.',
    '3 empress': 'Growth, beauty, and abundance are rising.\nWhat you nurture now will flourish.',
    '4 emperor': 'Structure and boundaries create power.\nLead clearly, calmly, and consistently.',
    '5 hierophant': 'Wisdom and tradition can guide this step.\nLearn from proven paths.',
    '6 lovers': 'A heart-level choice is in front of you.\nChoose alignment, not just attraction.',
    '7 chariot': 'Direction plus discipline equals momentum.\nStay focused and drive forward.',
    '8 strengh': 'Gentle strength beats brute force now.\nPatience masters the storm.',
    '9 hermit': 'Step back to see clearly.\nThis pause is precision, not retreat.',
    '10 wheel': 'The cycle is turning—timing matters.\nStay adaptable and catch the opening.',
    '11 justice': 'Truth and balance set the standard.\nAct cleanly; outcomes will align.',
    '12 hanged man': 'Pause means perspective, not failure.\nLet go and see differently.',
    '13 death': 'An ending clears space for what is real.\nTransformation needs a brave release.',
    '14 temperance': 'Healing comes through balanced integration.\nBlend heart and logic for harmony.',
    '15 devil': 'Patterns and attachments are exposed.\nName the chain, then break it.',
    '16 tower': 'A sudden shift clears weak foundations.\nShort chaos, long freedom.',
    '17 star': 'Hope and renewal return gently.\nLet your true light be seen.',
    '18 moon': 'Emotion and illusion are intertwined.\nTrust intuition while testing shadows.',
    '19 sun': 'Clarity, joy, and success are rising.\nBe visible and celebrate progress.',
    '20 judgement': 'A wake-up call invites honest renewal.\nWhat you accept now defines next level.',
    '21 world': 'Completion and integration are here.\nClose this chapter and expand.',
    'ace of cups': 'A new emotional stream opens.\nSay yes to authentic connection.',
    'ace of pentacles': 'A practical opportunity is on the table.\nStart small, build something lasting.',
    'ace of swords': 'Mental clarity cuts through confusion.\nChoose truth and act decisively.',
    'ace of wands': 'A spark of creative fire arrives.\nMove now while the energy is hot.'
  },
  ru: {
    '0 fool': 'Новое начало требует смелости и доверия.\nПуть открывается по мере движения.',
    '1 magician': 'Все нужные инструменты уже у тебя.\nФокус превращает потенциал в результат.',
    '2 high priestress': 'Внутренний голос сейчас самый точный.\nВ тишине проявляется правда.',
    '3 empress': 'Растут изобилие, творчество и сила жизни.\nТо, что ты питаешь, расцветёт.',
    '4 emperor': 'Структура и границы дают опору.\nВеди спокойно, чётко и уверенно.',
    '5 hierophant': 'Опора в знаниях и традиции.\nПроверенный путь экономит силы.',
    '6 lovers': 'Важный выбор идёт через сердце.\nВыбирай своё, а не просто красивое.',
    '7 chariot': 'Курс и дисциплина дают прорыв.\nДержи вектор и не сворачивай.',
    '8 strengh': 'Мягкая сила сейчас мощнее давления.\nТерпение укрощает внутренний шторм.',
    '9 hermit': 'Уединение даёт точную ясность.\nШаг назад здесь — умный манёвр.',
    '10 wheel': 'Колесо поворачивается, тайминг решает.\nБудь гибким и входи в шанс.',
    '11 justice': 'Правда и баланс выходят на первый план.\nЧестные действия дадут чистый итог.',
    '12 hanged man': 'Пауза — это новый ракурс, не тупик.\nОтпусти контроль и увидишь больше.',
    '13 death': 'Ясный финал освобождает место для нового.\nТрансформация просит смелости отпустить.',
    '14 temperance': 'Гармония рождается в балансе.\nСоедини разум и сердце.',
    '15 devil': 'Старые привязки становятся видимыми.\nУвидел цепь — можешь снять её.',
    '16 tower': 'Резкий слом очищает слабый фундамент.\nКраткий хаос ведёт к свободе.',
    '17 star': 'Возвращаются надежда и восстановление.\nТвоему свету можно проявиться.',
    '18 moon': 'Интуиция и тени идут рядом.\nПроверяй иллюзии, но слушай себя.',
    '19 sun': 'Ясность, радость и успех усиливаются.\nВыходи в проявленность и празднуй.',
    '20 judgement': 'Пробуждение зовёт к честной переоценке.\nПринятое сейчас задаст новый уровень.',
    '21 world': 'Цикл завершён, интеграция произошла.\nЗакрой главу и переходи выше.',
    'ace of cups': 'Открывается новый поток чувств.\nСкажи да искренней близости.',
    'ace of pentacles': 'Появляется практичный шанс на стабильность.\nНачни с малого и строй надолго.',
    'ace of swords': 'Ясная мысль разрезает туман.\nГовори правду и решай точно.',
    'ace of wands': 'Приходит искра действия и творчества.\nХватай импульс сразу.'
  }
};

const pageLang = (document.documentElement.lang || 'de').toLowerCase().startsWith('ru')
  ? 'ru'
  : (document.documentElement.lang || 'de').toLowerCase().startsWith('en')
    ? 'en'
    : 'de';

const langHref = { de: 'index.html', en: 'en.html', ru: 'ru.html' };
const popup = document.getElementById('lang-popup');
const askStep = document.getElementById('lang-step-ask');
const confirmStep = document.getElementById('lang-step-confirm');
const langButtons = [...document.querySelectorAll('.lang-choice[data-lang]')];
const confirmBtn = document.getElementById('lang-confirm-btn');
const confirmKicker = document.getElementById('lang-confirm-kicker');
const confirmTitle = document.getElementById('lang-confirm-title');
const confirmText = document.getElementById('lang-confirm-text');
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('resetlang') === '1') {
  localStorage.removeItem('capytarot_lang_pref');
  urlParams.delete('resetlang');
  const clean = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ''}${window.location.hash || ''}`;
  window.history.replaceState({}, '', clean);
}

const savedLang = localStorage.getItem('capytarot_lang_pref');
let pendingLang = pageLang;

const popupCopy = {
  de: {
    confirmKicker: 'Aurelio grinst 🐾',
    confirmTitle: 'Wusste ich doch, dass du genau diese nimmst.',
    confirmText: 'Los geht\'s. ✨',
    confirmBtn: 'Weiter'
  },
  en: {
    confirmKicker: 'Aurelio smirks 🐾',
    confirmTitle: 'I knew you’d pick this one anyway.',
    confirmText: 'Let’s begin. ✨',
    confirmBtn: 'Continue'
  },
  ru: {
    confirmKicker: 'Аурелио улыбается 🐾',
    confirmTitle: 'Я и так знал, что ты выберешь именно это.',
    confirmText: 'Поехали. ✨',
    confirmBtn: 'Продолжить'
  }
};

const applyPopupCopy = (lang) => {
  const c = popupCopy[lang] || popupCopy.en;
  if (confirmKicker) confirmKicker.textContent = c.confirmKicker;
  if (confirmTitle) confirmTitle.textContent = c.confirmTitle;
  if (confirmText) confirmText.textContent = c.confirmText;
  if (confirmBtn) confirmBtn.textContent = c.confirmBtn;
};

const finalizeLang = (lang) => {
  if (!langHref[lang]) return;
  localStorage.setItem('capytarot_lang_pref', lang);
  if (lang !== pageLang) {
    window.location.href = langHref[lang];
  } else if (popup) {
    popup.classList.remove('show');
    document.body.style.overflow = '';
  }
};

if (popup) {
  if (savedLang && langHref[savedLang]) {
    if (savedLang !== pageLang) {
      window.location.href = langHref[savedLang];
    }
  } else {
    pendingLang = pageLang;
    applyPopupCopy(pendingLang);
    if (askStep) askStep.hidden = false;
    if (confirmStep) confirmStep.hidden = true;
    popup.classList.add('show');
    document.body.style.overflow = 'hidden';

    langButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        pendingLang = btn.dataset.lang;
        applyPopupCopy(pendingLang);
        if (askStep) askStep.hidden = true;
        if (confirmStep) confirmStep.hidden = false;
      });
    });

    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => finalizeLang(pendingLang));
    }
  }
}

const tarotCards = document.querySelectorAll('.tarot-card');

tarotCards.forEach((card) => {
  const img = card.querySelector('img');
  if (!img) return;

  const src = decodeURIComponent(img.getAttribute('src') || '').toLowerCase();
  const file = src.split('/').pop() || '';
  const key = file.replace(/\.(png|jpg|jpeg|webp)$/i, '');
  const desc = tarotDescriptions[pageLang]?.[key];
  if (!desc) return;

  const tip = document.createElement('div');
  tip.className = 'tarot-tooltip';
  const [line1, line2] = desc.split('\n');
  tip.innerHTML = `<strong>${line1}</strong><span>${line2 || ''}</span>`;
  card.appendChild(tip);

  const show = () => card.classList.add('show-tip');
  const hide = () => card.classList.remove('show-tip');

  card.addEventListener('mouseenter', show);
  card.addEventListener('mouseleave', hide);
  card.addEventListener('focusin', show);
  card.addEventListener('focusout', hide);
});
