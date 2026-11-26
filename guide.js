/* ==========================================================================
   Step-by-step guide page. Opens guides/<id>.json from guide.html?p=<id>.
   Renders: hero + owl progress ring, interactive architecture map,
   steps with tips/code/tables/diagrams, step list with scroll-spy,
   "mark as done" progress saved in this browser.
   All guide text is inserted with textContent (never as HTML).
   ========================================================================== */
(function () {
  'use strict';

  var SVG = 'http://www.w3.org/2000/svg';
  var I18N = {
    en: {
      'name': 'Sarah A. AlQahtani', 'skip': 'Skip to main content', 'nav.label': 'Guide', 'nav.back': '← All projects',
      'footer.portfolio': 'Portfolio',
      'footer.built': 'Built with plain HTML, CSS, JavaScript and one night owl. Hosted on GitHub Pages.',
      'theme.toDark': 'Switch to night mode', 'theme.toLight': 'Switch to day mode',
      'lang.switchLabel': 'عرض الصفحة بالعربية', 'lang.switchText': 'عربي', 'lang.switchLang': 'ar',
      'g.loading': 'Loading the guide…',
      'g.eyebrow': 'Step-by-step guide',
      'g.crumb': 'Back to the case study',
      'g.steps': '{n} steps', 'g.start': 'Start building', 'g.continue': 'Continue at step {n}', 'g.repo': 'Code repo',
      'g.progress': '{d} of {n} steps done', 'g.progressSub': 'Saved in this browser only.',
      'g.complete': 'Hoo-ray! You built it.', 'g.completeSub': 'Time to share it on GitHub and LinkedIn.',
      'g.reset': 'Reset progress', 'g.resetConfirm': 'Click again to reset',
      'g.build': "What you'll build", 'g.mapHint': 'Tip: click a box with a gold step tag to jump to that step.',
      'g.scrollHint': 'Scroll sideways to see the whole diagram.',
      'g.stepsTitle': 'Steps', 'g.expand': 'Expand all', 'g.collapse': 'Collapse all',
      'g.step': 'Step {n}', 'g.tip': 'Owl tip:', 'g.done': 'Mark step as done', 'g.isDone': 'Done',
      'g.prev': 'Previous', 'g.next': 'Next step', 'g.toggle': 'Show or hide this step',
      'g.copy': 'Copy', 'g.copied': 'Copied!', 'g.copyFail': 'Select and copy', 'g.lines': '{n} lines',
      'g.more': 'Show all {n} lines', 'g.less': 'Show less', 'g.code': 'code',
      'g.goStep': 'Go to step {n}', 'g.play': 'Play the run', 'g.pause': 'Pause', 'g.stage': 'Stage {n}',
      'g.langNote': '',
      'g.finish': 'You reached the end of the guide.', 'g.finishSub': 'Mark the steps you have finished to fill the owl\'s progress ring.',
      'g.notFound': 'Hoo… this guide could not be found.',
      'g.notFoundBody': 'The link may be wrong, or the guide file is missing. You can find all projects on the portfolio.',
      'g.toPortfolio': 'Back to the portfolio',
      'layer.setup': 'Setup', 'layer.data': 'Data', 'layer.bronze': 'Bronze', 'layer.silver': 'Silver', 'layer.gold': 'Gold',
      'layer.incremental': 'Incremental', 'layer.orchestration': 'Orchestration', 'layer.bi': 'BI', 'layer.quality': 'Data quality',
      'layer.cicd': 'CI/CD', 'layer.ship': 'Ship it', 'layer.business': 'Business', 'layer.modeling': 'Modeling',
      'layer.architecture': 'Architecture', 'layer.governance': 'Governance', 'layer.testing': 'Testing', 'layer.ai': 'AI/BI',
      'layer.help': 'Help',
      'help.title': 'Troubleshooting',
      'g.goal': 'Goal', 'g.creates': "You'll create", 'g.journey': 'Stop {n} of {total} on the path',
      'call.check': 'Check', 'call.warn': 'Watch out', 'call.commit': 'Commit', 'call.why': 'Why it matters',
      'call.demo': 'Record it for your demo', 'g.cell': 'Cell {n}', 'g.tree': 'Folder layout',
      'g.overview': 'Before you start', 'g.illustration': 'Illustration'
    },
    ar: {
      'name': 'سارة أ. القحطاني', 'skip': 'انتقل إلى المحتوى الرئيسي', 'nav.label': 'الدليل', 'nav.back': 'كل المشاريع →',
      'footer.portfolio': 'معرض الأعمال',
      'footer.built': 'صُمّم باستخدام HTML وCSS وJavaScript وبومة ساهرة، ومستضاف على GitHub Pages.',
      'theme.toDark': 'التبديل إلى الوضع الليلي', 'theme.toLight': 'التبديل إلى الوضع النهاري',
      'lang.switchLabel': 'View this page in English', 'lang.switchText': 'English', 'lang.switchLang': 'en',
      'g.loading': 'جارٍ تحميل الدليل…',
      'g.eyebrow': 'دليل خطوة بخطوة',
      'g.crumb': 'العودة إلى دراسة الحالة',
      'g.steps': '{n} خطوة', 'g.start': 'ابدأ البناء', 'g.continue': 'تابِع من الخطوة {n}', 'g.repo': 'مستودع الكود',
      'g.progress': 'أنجزت {d} من {n} خطوة', 'g.progressSub': 'يُحفظ في هذا المتصفح فقط.',
      'g.complete': 'هوو! لقد أنجزته.', 'g.completeSub': 'حان وقت مشاركته على GitHub وLinkedIn.',
      'g.reset': 'إعادة ضبط التقدّم', 'g.resetConfirm': 'اضغط مرة أخرى للتأكيد',
      'g.build': 'ما الذي ستبنيه', 'g.mapHint': 'اضغط على أي مربع يحمل وسم خطوة ذهبيًا للانتقال إليها.',
      'g.scrollHint': 'مرّر أفقيًا لرؤية المخطط كاملًا.',
      'g.stepsTitle': 'الخطوات', 'g.expand': 'توسيع الكل', 'g.collapse': 'طيّ الكل',
      'g.step': 'الخطوة {n}', 'g.tip': 'نصيحة البومة:', 'g.done': 'تمييز الخطوة كمنجزة', 'g.isDone': 'منجزة',
      'g.prev': 'السابقة', 'g.next': 'الخطوة التالية', 'g.toggle': 'إظهار هذه الخطوة أو إخفاؤها',
      'g.copy': 'نسخ', 'g.copied': 'تم النسخ!', 'g.copyFail': 'حدّد النص وانسخه', 'g.lines': '{n} سطر',
      'g.more': 'عرض كل الأسطر ({n})', 'g.less': 'عرض أقل', 'g.code': 'كود',
      'g.goStep': 'انتقل إلى الخطوة {n}', 'g.play': 'شغّل التشغيلة', 'g.pause': 'إيقاف مؤقت', 'g.stage': 'المرحلة {n}',
      'g.langNote': 'تفاصيل الخطوات والكود مكتوبة بالإنجليزية كما تظهر في الأدوات نفسها.',
      'g.finish': 'وصلت إلى نهاية الدليل.', 'g.finishSub': 'ميّز الخطوات التي أنجزتها ليمتلئ مؤشر تقدّم البومة.',
      'g.notFound': 'هوو… لم نعثر على هذا الدليل.',
      'g.notFoundBody': 'ربما الرابط غير صحيح أو ملف الدليل غير موجود. تجد كل المشاريع في معرض الأعمال.',
      'g.toPortfolio': 'العودة إلى معرض الأعمال',
      'layer.setup': 'الإعداد', 'layer.data': 'البيانات', 'layer.bronze': 'Bronze', 'layer.silver': 'Silver', 'layer.gold': 'Gold',
      'layer.incremental': 'تحميل تزايدي', 'layer.orchestration': 'الجدولة والتنسيق', 'layer.bi': 'ذكاء الأعمال', 'layer.quality': 'جودة البيانات',
      'layer.cicd': 'CI/CD', 'layer.ship': 'النشر والعرض', 'layer.business': 'الأعمال', 'layer.modeling': 'النمذجة',
      'layer.architecture': 'المعمارية', 'layer.governance': 'الحوكمة', 'layer.testing': 'الاختبار', 'layer.ai': 'AI/BI',
      'layer.help': 'مساعدة',
      'help.title': 'حل المشكلات',
      'g.goal': 'الهدف', 'g.creates': 'ما ستنشئه', 'g.journey': 'المحطة {n} من {total} في المسار',
      'call.check': 'تحقّق', 'call.warn': 'انتبه', 'call.commit': 'احفظ التغييرات (Commit)', 'call.why': 'لماذا يهم',
      'call.demo': 'سجّله لعرضك التوضيحي', 'g.cell': 'الخلية {n}', 'g.tree': 'هيكل المجلدات',
      'g.overview': 'قبل أن تبدأ', 'g.illustration': 'رسم توضيحي'
    }
  };

  var state = { lang: document.documentElement.lang === 'ar' ? 'ar' : 'en', guide: null, done: [], id: null };
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  function t(key, vars) {
    var s = I18N[state.lang][key]; if (s == null) s = I18N.en[key]; if (s == null) s = key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split('{' + k + '}').join(vars[k]); });
    return s;
  }
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k]; if (v == null || v === false) return;
      if (k === 'text') n.textContent = v; else if (k === 'className') n.className = v; else n.setAttribute(k, v === true ? '' : v);
    });
    (kids || []).forEach(function (c) { if (c != null && c !== false) n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  function s(tag, attrs, kids) {
    var n = document.createElementNS(SVG, tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { if (attrs[k] != null) { if (k === 'text') n.textContent = attrs[k]; else n.setAttribute(k, attrs[k]); } });
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function owl(symbol, cls) { return s('svg', { 'class': cls || '', viewBox: '0 0 64 64', 'aria-hidden': 'true' }, [s('use', { href: '#' + symbol })]); }
  function icon(d, cls) {
    if (!cls && (d === ICON.arrow || d === ICON.back)) cls = 'icon flip';
    return s('svg', { 'class': cls || 'icon', viewBox: '0 0 24 24', 'aria-hidden': 'true' },
      [s('path', { d: d, fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })]);
  }
  function safeUrl(u) {
    if (typeof u !== 'string' || !u.trim()) return null;
    try { var p = new URL(u.trim(), document.baseURI); return (p.protocol === 'https:' || p.protocol === 'http:') ? u.trim() : null; } catch (e) { return null; }
  }
  function loc(obj, key) { var ar = obj[key + '_ar']; return state.lang === 'ar' && ar && (Array.isArray(ar) ? ar.length : String(ar).trim()) ? ar : obj[key]; }
  var ICON = {
    steps: 'M4 6h16M4 12h16M4 18h10', clock: 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
    layers: 'm12 3 9 5-9 5-9-5zM3 13l9 5 9-5', code: 'm8 7-5 5 5 5M16 7l5 5-5 5',
    arrow: 'M5 12h14M13 6l6 6-6 6', back: 'M19 12H5M11 18l-6-6 6-6', check: 'm5 12 4.5 4.5L19 7',
    chevron: 'm6 9 6 6 6-6', copy: 'M9 9h10v10H9zM5 15V5h10', play: 'M7 5v14l12-7z', pause: 'M8 5v14M16 5v14',
    warn: 'M12 3 2 20h20zM12 10v4M12 17v.5', why: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z',
    commit: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 12h6M15 12h6', demo: 'M3 7h12v10H3zM15 10l6-3v10l-6-3',
    cell: 'M5 3h14v18H5zM9 3v18', folder: 'M3 6h6l2 2h10v11H3z', file: 'M7 3h7l5 5v13H7zM14 3v5h5',
    goal: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01'
  };
  var LAYER_ICON = {
    setup: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z',
    data: 'M7 3h7l4 4v12H7zM14 3v4h4M4 7v14h11',
    generate: 'M7 3h7l4 4v12H7zM14 3v4h4M4 7v14h11',
    bronze: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
    incremental: 'M6 3h12v18l-6-4-6 4z',
    orchestration: 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
    bi: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
    quality: 'M12 3 4.5 6v5.5c0 4.6 3.2 8 7.5 9.5 4.3-1.5 7.5-4.9 7.5-9.5V6zM8.8 12l2.3 2.3 4.2-4.6',
    cicd: 'M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9a9 9 0 0 1-9 9',
    ship: 'M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 13l-2-2c1.5-5 6-8 13-8 0 7-3 11.5-8 13l-2-2M15 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
    business: 'M4 5h16v11H9l-5 4z',
    modeling: 'M12 3.5 14.6 9l6 .6-4.5 4 1.3 5.9L12 16.6l-5.4 2.9 1.3-5.9-4.5-4 6-.6z',
    architecture: 'M3 4h18v16H3zM3 10h18M10 10v10',
    governance: 'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4',
    ai: 'M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7zM19 16c.3 1.8 1.2 2.7 3 3-1.8.3-2.7 1.2-3 3-.3-1.8-1.2-2.7-3-3 1.8-.3 2.7-1.2 3-3z',
    help: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5.6 5.6l3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6',
    download: 'M12 3v12M7 10l5 5 5-5M4 20h16', repo: 'M3 6h6l2 2h10v11H3z',
    commit: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 12h6M15 12h6',
    shield: 'M12 3 4.5 6v5.5c0 4.6 3.2 8 7.5 9.5 4.3-1.5 7.5-4.9 7.5-9.5V6zM8.8 12l2.3 2.3 4.2-4.6'
  };
  LAYER_ICON.silver = LAYER_ICON.gold = LAYER_ICON.bronze; LAYER_ICON.testing = LAYER_ICON.quality;
  function layerIcon(key, cls) { return icon(LAYER_ICON[key] || LAYER_ICON.data, cls || 'icon'); }

  /* ---------- theme + language (same behaviour as the portfolio) ---------- */
  function initTheme() {
    var root = document.documentElement, btn = document.getElementById('theme-toggle');
    var meta = document.querySelector('meta[name="theme-color"]');
    function apply(theme) {
      root.setAttribute('data-theme', theme);
      var dark = theme === 'dark';
      btn.setAttribute('aria-label', t(dark ? 'theme.toLight' : 'theme.toDark'));
      btn.setAttribute('title', t(dark ? 'theme.toLight' : 'theme.toDark'));
      if (meta) meta.setAttribute('content', dark ? '#0f0d17' : '#f6f5fb');
    }
    apply(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      store.set('theme', next); apply(next);
    });
    return apply;
  }
  function applyStatic(applyTheme) {
    var root = document.documentElement;
    root.lang = state.lang; root.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(function (n) { n.textContent = t(n.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (n) {
      n.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var p = pair.split(':'); if (p.length === 2) n.setAttribute(p[0].trim(), t(p[1].trim()));
      });
    });
    var lb = document.getElementById('lang-toggle');
    lb.textContent = t('lang.switchText'); lb.setAttribute('aria-label', t('lang.switchLabel')); lb.setAttribute('lang', t('lang.switchLang'));
    if (applyTheme) applyTheme(root.getAttribute('data-theme'));
  }

  /* ---------- progress (saved per guide in this browser) ---------- */
  function loadDone() {
    try { var v = JSON.parse(store.get('guide-progress:' + state.id) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; }
  }
  function saveDone() { store.set('guide-progress:' + state.id, JSON.stringify(state.done)); }
  function isDone(id) { return state.done.indexOf(id) !== -1; }
  function realSteps() { return state.guide.steps.filter(function (st) { return st.num != null; }); }

  /* ---------- content blocks ---------- */
  function inline(segs) {
    var frag = document.createDocumentFragment();
    (segs || []).forEach(function (sg) {
      var node = document.createTextNode(sg.t);
      if (sg.c) { var c = el('code'); c.appendChild(node); node = c; }
      if (sg.i) { var i = el('em'); i.appendChild(node); node = i; }
      if (sg.b) { var b = el('strong'); b.appendChild(node); node = b; }
      frag.appendChild(node);
    });
    return frag;
  }
  function plainText(segs) { return (segs || []).map(function (x) { return x.t; }).join(''); }
  var CALLOUTS = [
    { re: /^Check\b/, kind: 'check', icon: 'check' },
    { re: /^(Pitfall|If you get|Watch the break|Data residency|Extension must match)/, kind: 'warn', icon: 'warn' },
    { re: /^Commit\b/, kind: 'commit', icon: 'commit' },
    { re: /^(Why|Design decisions|Deletes at the source)/, kind: 'why', icon: 'why' },
    { re: /^Prove\b/, kind: 'demo', icon: 'demo' }
  ];
  function classify(b) {
    if (!b || b.type !== 'p') return null;
    var txt = plainText(b.segs);
    var cell = /^Cell (\d+)/.exec(txt);
    if (cell) return { kind: 'cell', n: cell[1] };
    for (var i = 0; i < CALLOUTS.length; i++) if (CALLOUTS[i].re.test(txt)) return CALLOUTS[i];
    return null;
  }
  /** Split a paragraph into its bold lead-in (title) and the rest. */
  function splitLead(segs) {
    if (segs.length && segs[0].b) {
      var title = segs[0].t.trim().replace(/[:.]+$/, '');
      var rest = segs.slice(1).map(function (x) { return Object.assign({}, x); });
      if (rest.length) rest[0].t = rest[0].t.replace(/^\s+/, '');
      return { title: title, rest: rest };
    }
    return { title: null, rest: segs };
  }
  function callout(c, b, extra) {
    var parts = splitLead(b.segs);
    var title = parts.title || t('call.' + c.kind);
    var body = el('div', { className: 'g-call-body' });
    if (plainText(parts.rest).trim()) { var p = el('p'); p.appendChild(inline(parts.rest)); body.appendChild(p); }
    if (extra) renderBlocks([extra], body);
    return el('aside', { className: 'g-call ' + c.kind }, [
      el('span', { className: 'g-call-icon', 'aria-hidden': 'true' }, [icon(ICON[c.icon])]),
      el('div', null, [el('p', { className: 'g-call-title', text: title }), body])
    ]);
  }
  function cellLabel(c, b) {
    var segs = b.segs.map(function (x) { return Object.assign({}, x); });
    segs[0].t = segs[0].t.replace(/^Cell \d+\s*[:.]?\s*/, '');
    if (!segs[0].t) segs.shift();
    var p = el('p');
    p.appendChild(el('span', { className: 'g-cell-pill' }, [icon(ICON.cell), t('g.cell', { n: c.n })]));
    p.appendChild(inline(segs));
    return el('div', { className: 'g-cell' }, [p]);
  }
  function renderBlocks(blocks, into) {
    blocks = blocks || [];
    for (var i = 0; i < blocks.length; i++) {
      var b = blocks[i];
      try {
        var c = classify(b), n;
        if (c && c.kind === 'cell') n = cellLabel(c, b);
        else if (c) {
          // a callout that ends with ":" owns the list or code that follows it
          var next = blocks[i + 1];
          var owns = /:\s*$/.test(plainText(b.segs)) && next && /^(ul|ol|code|table)$/.test(next.type);
          n = callout(c, b, owns ? next : null);
          if (owns) i++;
        } else n = renderBlock(b);
        if (n) into.appendChild(n);
      } catch (e) { console.error('[guide] block failed', b, e); }
    }
    return into;
  }
  function treeBlock(text) {
    var rows = el('ul', { className: 'g-tree-list' });
    text.split('\n').forEach(function (line) {
      if (!line.trim()) return;
      var m = /^([\s│├└─|`\-]*)(.*)$/.exec(line);
      var depth = Math.round(m[1].replace(/\t/g, '    ').length / 4);
      var rest = m[2], note = '';
      var cut = rest.search(/\s+(←|#)\s*/);
      if (cut !== -1) { note = rest.slice(cut).replace(/^\s+(←|#)\s*/, ''); rest = rest.slice(0, cut); }
      var isDir = /\/$/.test(rest.trim());
      rows.appendChild(el('li', { style: 'padding-inline-start:' + (depth * 1.2) + 'rem' }, [
        icon(isDir ? ICON.folder : ICON.file, 'icon ' + (isDir ? 'dir' : 'doc')),
        el('span', { className: 'name', text: rest.trim() }),
        note ? el('span', { className: 'note', text: note }) : null
      ]));
    });
    return el('figure', { className: 'g-tree', dir: 'ltr' }, [el('figcaption', null, [icon(ICON.folder), t('g.tree')]), rows]);
  }
  function renderBlock(b) {
    switch (b.type) {
      case 'p': { var p = el('p'); p.appendChild(inline(b.segs)); return p; }
      case 'h': return el('h3', { text: b.text });
      case 'ul': case 'ol': {
        var list = el(b.type);
        b.items.forEach(function (it) { list.appendChild(renderBlocks(it, el('li'))); });
        return list;
      }
      case 'code': return codeBlock(b);
      case 'table': return tableBlock(b);
      case 'quote': return renderBlocks(b.blocks, el('blockquote'));
      case 'diagram': return diagram(b.diagram);
      default: return null;
    }
  }
  function codeBlock(b) {
    var text = String(b.text || '');
    if (/[├└]──/.test(text)) return treeBlock(text);
    var lines = text.split('\n').length;
    var pre = el('pre', { tabindex: '0', dir: 'ltr' }, [el('code', { text: text })]);
    var copy = el('button', { type: 'button' }, [icon(ICON.copy, 'icon'), el('span', { text: t('g.copy') })]);
    copy.addEventListener('click', function () {
      var label = copy.querySelector('span');
      function done(ok) { label.textContent = ok ? t('g.copied') : t('g.copyFail'); setTimeout(function () { label.textContent = t('g.copy'); }, 1800); }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
      else done(false);
    });
    var box = el('div', { className: 'g-code' }, [
      el('div', { className: 'g-code-head' }, [el('span', { text: (b.lang || t('g.code')) + ' · ' + t('g.lines', { n: lines }) }), copy]),
      pre
    ]);
    if (lines > 24) {
      box.classList.add('clipped');
      var more = el('button', { type: 'button', className: 'more', 'aria-expanded': 'false', text: t('g.more', { n: lines }) });
      more.addEventListener('click', function () {
        var open = box.classList.toggle('clipped') === false;
        more.textContent = open ? t('g.less') : t('g.more', { n: lines });
        more.setAttribute('aria-expanded', String(open));
      });
      box.appendChild(more);
    }
    return box;
  }
  function tableBlock(b) {
    var table = el('table');
    if (b.head) {
      var tr = el('tr'); b.head.forEach(function (c) { var th = el('th', { scope: 'col' }); th.appendChild(inline(c)); tr.appendChild(th); });
      table.appendChild(el('thead', null, [tr]));
    }
    var tb = el('tbody');
    b.rows.forEach(function (r) { var tr2 = el('tr'); r.forEach(function (c) { var td = el('td'); td.appendChild(inline(c)); tr2.appendChild(td); }); tb.appendChild(tr2); });
    table.appendChild(tb);
    return el('div', { className: 'g-table', tabindex: '0' }, [table]);
  }

  /* ---------- diagrams ---------- */
  function diagram(d) {
    if (!d) return null;
    if (d.type === 'datastory') return dataStory(d);
    return flowDiagram(d);
  }

  /** Grid-based flow diagram: nodes sit in cols/rows, edges are routed orthogonally. */
  function flowDiagram(d) {
    var hasGroups = d.groups && d.groups.length;
    var colW = d.colW || 240, gx = d.gx || 52, gy = d.gy || (hasGroups ? 76 : 58), rowH = 64, pad = 18;
    var around = d.edges.some(function (e) { return e.route === 'around'; });
    var top = hasGroups ? 40 : 16;
    var rows = 0, cols = d.cols || 1;
    var byId = {};
    d.nodes.forEach(function (n) {
      var span = n.span || 1;
      var x = pad + n.col * (colW + gx), w = span * colW + (span - 1) * gx;
      var y = top + n.row * (rowH + gy);
      var dia = n.shape === 'diamond' ? 8 : 0;  // diamond tips stick out of the row box
      byId[n.id] = { n: n, x: x, y: y - dia, w: w, h: rowH + 2 * dia, cx: x + w / 2, cy: y + rowH / 2, ry: y };
      rows = Math.max(rows, n.row + 1); cols = Math.max(cols, n.col + span);
    });
    var W = pad * 2 + cols * colW + (cols - 1) * gx + (around ? 36 : 0);
    var H = top + rows * (rowH + gy) - gy + 22;
    var uid = 'dg' + Math.random().toString(36).slice(2, 8);
    var svg = s('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': d.title, direction: 'ltr' });
    svg.style.minWidth = Math.min(W, 620) + 'px';
    svg.style.maxWidth = W + 'px';

    var defs = s('defs');
    ['', 'ok', 'fail'].forEach(function (k) {
      defs.appendChild(s('marker', { id: uid + (k || 'def'), viewBox: '0 0 10 10', refX: '9', refY: '5', markerWidth: '7', markerHeight: '7', orient: 'auto-start-reverse' },
        [s('path', { d: 'M0 0L10 5L0 10z', 'class': 'dg-arrow ' + k })]));
    });
    svg.appendChild(defs);

    // groups (drawn first, behind everything)
    (d.groups || []).forEach(function (g) {
      var ms = g.nodes.map(function (id) { return byId[id]; }).filter(Boolean);
      if (!ms.length) return;
      var x1 = Math.min.apply(null, ms.map(function (m) { return m.x; })) - 12;
      var y1 = Math.min.apply(null, ms.map(function (m) { return m.y; })) - 32;
      var x2 = Math.max.apply(null, ms.map(function (m) { return m.x + m.w; })) + 12;
      var y2 = Math.max.apply(null, ms.map(function (m) { return m.y + m.h; })) + 12;
      svg.appendChild(s('g', { 'class': 'dg-group' + (g.main ? ' main' : '') + (g.dashed ? ' dashed' : '') }, [
        s('rect', { x: x1, y: y1, width: x2 - x1, height: y2 - y1, rx: 14 }),
        s('text', { x: x1 + 12, y: y1 + 20, text: g.label })
      ]));
    });

    // edges
    var labels = [];
    d.edges.forEach(function (e) {
      var a = byId[e.from], b = byId[e.to]; if (!a || !b) return;
      var kind = e.kind || '', pts;
      var overlapX = a.x < b.x + b.w && b.x < a.x + a.w;
      if (kind === 'line') {
        var down = b.y > a.y;
        pts = [[a.cx, down ? a.y + a.h : a.y], [b.cx, down ? b.y : b.y + b.h]];
      } else if (e.route === 'around') {
        // leave on the right, travel down the outside margin, come back in on the right
        var X = pad + cols * colW + (cols - 1) * gx + 22;
        pts = [[a.x + a.w, a.cy], [X, a.cy], [X, b.cy], [b.x + b.w, b.cy]];
      } else if (e.route === 'hv') {
        var right = b.cx > a.cx;
        pts = [[right ? a.x + a.w : a.x, a.cy], [b.cx, a.cy], [b.cx, b.y > a.y ? b.y : b.y + b.h]];
      } else if (a.n.row === b.n.row) {
        var toRight = b.x > a.x;
        pts = [[toRight ? a.x + a.w : a.x, a.cy], [toRight ? b.x : b.x + b.w, b.cy]];
      } else if (overlapX) {
        var xx = a.w <= b.w ? a.cx : b.cx;
        pts = b.y > a.y ? [[xx, a.y + a.h], [xx, b.y]] : [[xx, a.y], [xx, b.y + b.h]];
      } else {
        var below = b.y > a.y;
        var y0 = below ? a.y + a.h : a.y, y3 = below ? b.y : b.y + b.h, off = hasGroups ? 26 : gy / 2, my = below ? y0 + off : y0 - off;
        pts = [[a.cx, y0], [a.cx, my], [b.cx, my], [b.cx, y3]];
      }
      var dstr = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0] + ' ' + p[1]; }).join(' ');
      var path = s('path', { d: dstr, 'class': 'dg-edge ' + kind });
      if (kind !== 'line') path.setAttribute('marker-end', 'url(#' + uid + (kind === 'ok' || kind === 'fail' ? kind : 'def') + ')');
      svg.appendChild(path);
      if (e.label) {
        // label on the longest segment
        var best = 0, bi = 0;
        for (var i = 0; i < pts.length - 1; i++) {
          var len = Math.abs(pts[i + 1][0] - pts[i][0]) + Math.abs(pts[i + 1][1] - pts[i][1]);
          if (len > best) { best = len; bi = i; }
        }
        var p1 = pts[bi], p2 = pts[bi + 1], vertical = p1[0] === p2[0];
        var outside = e.route === 'around';
        labels.push(s('text', {
          'class': 'dg-elabel ' + kind,
          x: vertical ? p1[0] + (outside ? -8 : 8) : (p1[0] + p2[0]) / 2, y: vertical ? Math.min(p1[1], p2[1]) + Math.min(24, Math.abs(p2[1] - p1[1]) / 2) + 4 : p1[1] - 8,
          'text-anchor': vertical ? (outside ? 'end' : 'start') : 'middle', text: e.label
        }));
      }
    });

    // nodes
    d.nodes.forEach(function (n) {
      var m = byId[n.id];
      var cls = 'dg-node' + (n.main ? ' main' : '') + (n.alert ? ' alert' : '') + (n.step != null ? ' link' : '');
      var g = s('g', { 'class': cls });
      if (n.shape === 'diamond') {
        var dw = Math.min(m.w, 220) / 2;
        g.appendChild(s('polygon', { points: [m.cx - dw, m.cy, m.cx, m.y, m.cx + dw, m.cy, m.cx, m.y + m.h].join(' ') }));
        g.appendChild(s('text', { 'class': 'label', x: m.cx, y: m.cy + 5, 'text-anchor': 'middle', text: n.label }));
      } else {
        g.appendChild(s('rect', { 'class': 'box', x: m.x, y: m.y, width: m.w, height: m.h, rx: 12 }));
        if (n.tone) g.appendChild(s('rect', { 'class': 'strip ' + n.tone, x: m.x, y: m.y + 10, width: 5, height: m.h - 20, rx: 2.5 }));
        g.appendChild(s('text', { 'class': 'label', x: m.x + 16, y: n.sub ? m.y + 27 : m.cy + 5, text: n.label }));
        if (n.sub) g.appendChild(s('text', { 'class': 'sub', x: m.x + 16, y: m.y + 46, text: n.sub }));
      }
      if (n.step != null && state.guide && state.guide.steps.some(function (st) { return st.id === 'step-' + n.step; })) {
        var tag = t('g.step', { n: n.step });
        var pw = tag.length * 6.4 + 14;
        g.appendChild(s('g', { 'class': 'pill' }, [
          s('rect', { x: m.x + m.w - pw - 8, y: m.y - 9, width: pw, height: 18, rx: 9 }),
          s('text', { x: m.x + m.w - pw / 2 - 8, y: m.y + 4, 'text-anchor': 'middle', text: tag })
        ]));
        g.setAttribute('tabindex', '0'); g.setAttribute('role', 'link');
        g.setAttribute('aria-label', n.label + ': ' + t('g.goStep', { n: n.step }));
        var go = function () { goToStep('step-' + n.step); };
        g.addEventListener('click', go);
        g.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); go(); } });
      }
      svg.appendChild(g);
    });
    labels.forEach(function (l) { svg.appendChild(l); });

    var fig = el('figure', { className: 'dg', dir: 'ltr' }, [
      el('figcaption', { text: d.title }),
      d.note ? el('p', { className: 'dg-note', text: d.note }) : null,
      el('div', { className: 'dg-scroll', tabindex: '0' }, [svg])
    ]);
    var hasLinks = d.nodes.some(function (n) { return n.step != null; });
    var hint = el('p', { className: 'dg-hint', dir: 'auto', text: hasLinks ? t('g.mapHint') : '' });
    if (hasLinks) fig.appendChild(hint);
    return fig;
  }

  /** "Play the run": an animated walk through example tables, stage by stage. */
  function dataStory(d) {
    var i = 0, timer = null, seen = {};
    var panel = el('div', { className: 'ds-panel', 'aria-live': 'polite' });
    var dots = el('div', { className: 'ds-stages', role: 'group', 'aria-label': d.title });
    var playBtn = el('button', { type: 'button', className: 'btn ds-btn' });
    var prev = el('button', { type: 'button', className: 'btn ds-btn', 'aria-label': t('g.prev') }, [icon(ICON.back)]);
    var next = el('button', { type: 'button', className: 'btn ds-btn', 'aria-label': t('g.next') }, [icon(ICON.arrow)]);
    function setPlay(on) {
      playBtn.textContent = '';
      playBtn.appendChild(icon(on ? ICON.pause : ICON.play));
      playBtn.appendChild(document.createTextNode(' ' + t(on ? 'g.pause' : 'g.play')));
    }
    function show(k) {
      i = Math.max(0, Math.min(d.stages.length - 1, k)); seen[i] = true;
      var st = d.stages[i];
      panel.textContent = '';
      var table = el('table');
      table.appendChild(el('thead', null, [el('tr', null, st.head.map(function (h) { return el('th', { scope: 'col', text: h }); }))]));
      var tb = el('tbody');
      st.rows.forEach(function (r, ri) {
        tb.appendChild(el('tr', { className: (st.hl || []).indexOf(ri) !== -1 ? 'hl' : '' }, r.map(function (c) { return el('td', { dir: 'auto', text: c }); })));
      });
      table.appendChild(tb);
      panel.appendChild(el('h4', { text: (i + 1) + '. ' + st.title }));
      panel.appendChild(el('p', { text: st.text }));
      panel.appendChild(el('div', { className: 'g-table' }, [table]));
      panel.style.animation = 'none'; void panel.offsetWidth; panel.style.animation = '';
      Array.prototype.forEach.call(dots.children, function (b, bi) {
        if (bi === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
        b.classList.toggle('seen', !!seen[bi]);
      });
      prev.disabled = i === 0; next.disabled = i === d.stages.length - 1;
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } setPlay(false); }
    d.stages.forEach(function (st, k) {
      var b = el('button', { type: 'button', className: 'ds-stage', text: String(k + 1), 'aria-label': t('g.stage', { n: k + 1 }) + ': ' + st.title });
      b.addEventListener('click', function () { stop(); show(k); });
      dots.appendChild(b);
    });
    prev.addEventListener('click', function () { stop(); show(i - 1); });
    next.addEventListener('click', function () { stop(); show(i + 1); });
    playBtn.addEventListener('click', function () {
      if (timer) { stop(); return; }
      if (i >= d.stages.length - 1) show(0);
      setPlay(true);
      timer = setInterval(function () {
        if (i >= d.stages.length - 1) { stop(); return; }
        show(i + 1);
      }, reduceMotion ? 4000 : 2600);
    });
    setPlay(false);
    show(0);
    return el('figure', { className: 'dg', dir: 'ltr' }, [
      el('figcaption', { text: d.title }),
      d.note ? el('p', { className: 'dg-note', text: d.note }) : null,
      el('div', { className: 'ds-controls' }, [playBtn, prev, dots, next]),
      panel
    ]);
  }

  /* ---------- page ---------- */
  function goToStep(id) {
    var sec = document.getElementById(id); if (!sec) return;
    if (sec.classList.contains('collapsed')) setCollapsed(sec, false);
    sec.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    if (history.replaceState) history.replaceState(null, '', '#' + id);
    var h = sec.querySelector('h2'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
  }
  function setCollapsed(sec, on) {
    sec.classList.toggle('collapsed', on);
    var btn = sec.querySelector('.g-toggle'); if (btn) btn.setAttribute('aria-expanded', String(!on));
  }

  function hero(g) {
    var steps = realSteps();
    var firstOpen = steps.filter(function (st) { return !isDone(st.id); })[0];
    var startLabel = state.done.length && firstOpen ? t('g.continue', { n: firstOpen.num }) : t('g.start');
    var start = el('a', { className: 'btn btn-primary', href: '#' + (firstOpen || steps[0]).id }, [icon(ICON.arrow), startLabel]);
    start.addEventListener('click', function (e) { e.preventDefault(); goToStep((firstOpen || steps[0]).id); });
    var repo = safeUrl(g.repo_url);

    var ring = s('svg', { 'class': 'ring', viewBox: '0 0 120 120', 'aria-hidden': 'true' }, [
      s('circle', { 'class': 'track', cx: 60, cy: 60, r: 54, fill: 'none', 'stroke-width': 9 }),
      s('circle', { 'class': 'bar', id: 'ring-bar', cx: 60, cy: 60, r: 54, fill: 'none', 'stroke-width': 9, 'stroke-linecap': 'round', 'stroke-dasharray': '339.3', 'stroke-dashoffset': '339.3' })
    ]);
    var resetBtn = el('button', { type: 'button', className: 'btn', id: 'reset-progress', text: t('g.reset') });
    var armed = false;
    resetBtn.addEventListener('click', function () {
      if (!armed) { armed = true; resetBtn.textContent = t('g.resetConfirm'); setTimeout(function () { armed = false; resetBtn.textContent = t('g.reset'); }, 3000); return; }
      state.done = []; saveDone(); armed = false; render();
    });

    return el('section', { className: 'g-hero', 'aria-labelledby': 'g-title' }, [
      el('div', { className: 'container g-hero-inner' }, [
        el('div', null, [
          el('a', { className: 'g-crumb', href: 'index.html#project-' + (g.project_id || g.id) }, [icon(ICON.back), t('g.crumb')]),
          el('p', { className: 'eyebrow' }, [el('span', { className: 'eyebrow-sep', 'aria-hidden': 'true', text: '✦' }), el('span', { text: t('g.eyebrow') })]),
          el('h1', { id: 'g-title', text: loc(g, 'title') }),
          el('p', { className: 'lead', text: loc(g, 'subtitle') }),
          el('ul', { className: 'g-chips' }, [
            el('li', null, [icon(ICON.steps), t('g.steps', { n: steps.length })]),
            g.duration ? el('li', null, [icon(ICON.clock), loc(g, 'duration')]) : null,
            g.platform ? el('li', { dir: 'auto' }, [icon(ICON.layers), g.platform]) : null
          ]),
          el('div', { className: 'cta-row' }, [
            start,
            repo ? el('a', { className: 'btn', href: repo, target: '_blank', rel: 'noopener' }, [icon(ICON.code), t('g.repo')]) : null
          ])
        ]),
        el('div', { className: 'g-progress-card', id: 'progress-card' }, [
          el('div', { className: 'g-ring' }, [ring, owl('owl-mini', 'ring-owl')]),
          el('p', { className: 'g-progress-text', id: 'progress-text', 'aria-live': 'polite' }),
          el('p', { className: 'g-progress-sub', id: 'progress-sub' }),
          resetBtn,
          el('div', { className: 'g-confetti', id: 'confetti', 'aria-hidden': 'true' })
        ])
      ])
    ]);
  }

  /* ---------- intro: story, sources, layers, legend ---------- */
  function indexChart(side) {
    // schematic only: two lines that both start at 100
    var W = 360, H = 200, x0 = 40, x1 = 340, y100 = 130;
    var market = [[0, 0], [1, -6], [2, -4], [3, -14], [4, -12], [5, -22], [6, -26], [7, -24], [8, -34]];
    var retail = [[0, 0], [1, -10], [2, -16], [3, -24], [4, -30], [5, -44], [6, -52], [7, -58], [8, -74]];
    function pts(arr) { return arr.map(function (p) { return (x0 + p[0] * (x1 - x0) / 8) + ',' + (y100 + p[1]); }).join(' '); }
    var svg = s('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': side.title, direction: 'ltr' }, [
      s('line', { 'class': 'ic-base', x1: x0, x2: x1, y1: y100, y2: y100 }),
      s('text', { 'class': 'ic-axis', x: x0 - 8, y: y100 + 4, 'text-anchor': 'end', text: '100' }),
      s('line', { 'class': 'ic-axis-line', x1: x0, x2: x0, y1: 30, y2: 170 }),
      s('line', { 'class': 'ic-axis-line', x1: x0, x2: x1, y1: 170, y2: 170 }),
      s('text', { 'class': 'ic-axis', x: x1, y: 188, 'text-anchor': 'end', text: 'months →' }),
      s('polyline', { 'class': 'ic-market', points: pts(market) }),
      s('polyline', { 'class': 'ic-retail', points: pts(retail) }),
      s('circle', { 'class': 'ic-dot-r', cx: x1, cy: y100 - 74, r: 5 }),
      s('circle', { 'class': 'ic-dot-m', cx: x1, cy: y100 - 34, r: 5 }),
    ]);
    var legend = el('p', { className: 'ic-legend' }, [
      el('span', { className: 'r' }, [el('i'), 'Retailer']), el('span', { className: 'm' }, [el('i'), 'Market (SAMA)']),
      el('span', { className: 'b' }, [el('i'), '100 = start month'])
    ]);
    return el('figure', { className: 'g-side', dir: 'ltr' }, [
      el('figcaption', { text: side.title }), svg, legend,
      el('p', { className: 'g-side-cap', text: side.caption })
    ]);
  }
  function timeline(side) {
    var ev = side.events || [];
    var row = el('ol', { className: 'g-tl' }, ev.map(function (e, i) {
      return el('li', { className: 'g-tl-ev ' + (e.tone || '') }, [
        el('span', { className: 'g-tl-dot', 'aria-hidden': 'true' }),
        el('strong', { text: e.label }), el('span', { className: 'g-tl-date', text: e.date || '' })
      ]);
    }));
    return el('figure', { className: 'g-side', dir: 'ltr' }, [
      el('figcaption', { text: side.title }), row,
      side.bracket ? el('p', { className: 'g-tl-bracket' }, [el('span', { className: 'br', 'aria-hidden': 'true' }), el('span', { className: 'txt', text: side.bracket })]) : null,
      el('p', { className: 'g-side-cap', text: side.caption })
    ]);
  }
  function introSection(sec) {
    switch (sec.kind) {
      case 'story': {
        var side = sec.side ? (sec.side.kind === 'timeline' ? timeline(sec.side) : indexChart(sec.side)) : null;
        return el('div', { className: 'g-story-row' }, [
          el('article', { className: 'g-story' }, [
            owl('owl-mini', 'g-story-owl'),
            el('div', null, [
              el('h2', { text: sec.title }),
              el('p', { className: 'g-story-lead', text: sec.lead }),
              el('p', { text: sec.text }),
              el('blockquote', { className: 'g-bubble' }, [el('p', { text: '“' + sec.quote + '”' }), sec.quote_by ? el('cite', { text: '— ' + sec.quote_by }) : null]),
              sec.tip ? el('p', { className: 'g-story-tip' }, [icon(ICON.why), sec.tip]) : null
            ])
          ]),
          side
        ]);
      }
      case 'cards':
        return el('div', { className: 'g-block' }, [
          el('h3', { className: 'g-block-title', text: sec.title }),
          el('div', { className: 'g-cards' }, sec.cards.map(function (c) {
            return el('article', { className: 'g-card' }, [
              el('div', { className: 'g-card-top' }, [
                el('span', { className: 'g-card-icon', 'aria-hidden': 'true' }, [layerIcon(c.icon)]),
                c.tag ? el('span', { className: 'g-card-tag ' + c.tag.toLowerCase(), text: c.tag }) : null
              ]),
              el('h4', { text: c.title }),
              el('p', { text: c.text }),
              c.bullets ? el('ul', null, c.bullets.map(function (x) { return el('li', { text: x }); })) : null
            ]);
          }))
        ]);
      case 'callout':
        return el('aside', { className: 'g-call ' + (sec.tone === 'warn' ? 'warn' : 'why') }, [
          el('span', { className: 'g-call-icon', 'aria-hidden': 'true' }, [icon(ICON.why)]),
          el('div', null, [el('p', { className: 'g-call-title', text: sec.title }), el('div', { className: 'g-call-body' }, [el('p', { text: sec.text })])])
        ]);
      case 'layers':
        return el('div', { className: 'g-block g-layers-wrap' }, [
          el('h3', { className: 'g-block-title', text: sec.title }),
          el('ol', { className: 'g-layers' }, sec.items.map(function (it) {
            return el('li', { className: 'g-layer-row ' + it.tone }, [
              el('span', { className: 'g-layer-name', text: it.name }), el('span', { className: 'g-layer-text', text: it.text })
            ]);
          }))
        ]);
      case 'legend':
        return el('div', { className: 'g-block g-legend-wrap' }, [
          el('h3', { className: 'g-block-title', text: sec.title }),
          el('dl', { className: 'g-legend' }, sec.items.reduce(function (acc, it) {
            acc.push(el('dt', null, [el('code', { text: it.code })])); acc.push(el('dd', { text: it.text })); return acc;
          }, []))
        ]);
      default: return null;
    }
  }
  function overview(g) {
    var secs = g.intro_sections || [];
    var story = secs.filter(function (x) { return x.kind === 'story'; })[0];
    var rest = secs.filter(function (x) { return x.kind !== 'story'; });
    var outcomes = loc(g, 'outcomes') || [];
    var body = el('div', { className: 'container' }, [
      story ? introSection(story) : null,
      el('h2', { id: 'g-build', className: 'g-build-title', dir: 'auto', text: t('g.build') }),
      el('ul', { className: 'g-outcomes' }, outcomes.map(function (o) { return el('li', { dir: 'auto', text: o }); })),
      g.architecture ? diagram(g.architecture) : null
    ]);
    // layers + legend sit side by side; everything else stacks
    var grid = el('div', { className: 'g-intro-grid' });
    rest.forEach(function (sec) {
      var n = introSection(sec); if (!n) return;
      if (sec.kind === 'layers' || sec.kind === 'legend') grid.appendChild(n); else body.appendChild(n);
    });
    if (grid.childNodes.length) body.appendChild(grid);
    if (!secs.length && g.intro && g.intro.length) body.appendChild(renderBlocks(g.intro, el('div', { className: 'g-content g-intro', lang: 'en', dir: 'ltr' })));
    return el('section', { className: 'g-overview', 'aria-labelledby': 'g-build', lang: 'en', dir: 'ltr' }, [body]);
  }

  /* ---------- per-step illustration: journey branch + at-a-glance ---------- */
  function journey(st) {
    var steps = realSteps(), idx = steps.indexOf(st);
    if (idx === -1) return null;
    var list = el('ol', { className: 'g-journey-dots' }, steps.map(function (x, i) {
      var b = el('button', {
        type: 'button', className: 'g-jdot' + (isDone(x.id) ? ' done' : '') + (i === idx ? ' here' : ''),
        'aria-label': t('g.step', { n: x.num }) + ': ' + x.title, 'aria-current': i === idx ? 'step' : null, title: x.title
      }, [i === idx ? owl('owl-mini', 'g-jowl') : null]);
      b.addEventListener('click', function () { goToStep(x.id); });
      return el('li', null, [b]);
    }));
    return el('nav', { className: 'g-journey', 'aria-label': t('g.journey', { n: idx + 1, total: steps.length }) }, [
      el('span', { className: 'g-journey-label', text: t('g.journey', { n: idx + 1, total: steps.length }) }), list
    ]);
  }
  function glance(st) {
    if (!st.goal) return null;
    var creates = st.creates || [];
    return el('div', { className: 'g-glance ' + st.layer }, [
      el('div', { className: 'g-glance-art', 'aria-hidden': 'true' }, [
        el('span', { className: 'g-glance-orb' }, [layerIcon(st.layer)]), owl('owl-mini', 'g-glance-owl')
      ]),
      el('div', { className: 'g-glance-text' }, [
        el('p', { className: 'g-glance-label' }, [icon(ICON.goal), t('g.goal')]),
        el('p', { className: 'g-glance-goal', dir: 'auto', text: loc(st, 'goal') }),
        creates.length ? el('p', { className: 'g-glance-label' }, [icon(ICON.file), t('g.creates')]) : null,
        creates.length ? el('ul', { className: 'g-chiplist', dir: 'ltr' }, creates.map(function (c) { return el('li', { text: c }); })) : null
      ])
    ]);
  }

  function toc(g) {
    var list = el('ol');
    g.steps.forEach(function (st) {
      var a = el('a', { href: '#' + st.id, 'data-step': st.id }, [
        el('span', { className: 'num', text: st.num != null ? st.num : '?' }),
        el('span', { dir: 'auto', text: st.num != null ? st.title : t('help.title') })
      ]);
      a.addEventListener('click', function (e) {
        e.preventDefault(); goToStep(st.id);
        var det = document.querySelector('.g-toc details');
        if (det && window.innerWidth < 1040) det.open = false;
      });
      list.appendChild(el('li', { id: 'toc-' + st.id }, [a]));
    });
    var expand = el('button', { type: 'button', className: 'btn', text: t('g.expand') });
    var collapse = el('button', { type: 'button', className: 'btn', text: t('g.collapse') });
    expand.addEventListener('click', function () { document.querySelectorAll('.g-step').forEach(function (sec) { setCollapsed(sec, false); }); });
    collapse.addEventListener('click', function () { document.querySelectorAll('.g-step').forEach(function (sec) { setCollapsed(sec, true); }); });
    var det = el('details', { open: window.innerWidth >= 1040 }, [
      el('summary', null, [el('span', { text: t('g.stepsTitle') }), el('span', { className: 'count', id: 'toc-count' })]),
      el('div', { className: 'bar' }, [el('span', { id: 'toc-bar' })]),
      list,
      el('div', { className: 'g-toc-actions' }, [expand, collapse])
    ]);
    return el('aside', { className: 'g-toc', 'aria-label': t('g.stepsTitle') }, [det]);
  }

  function stepCard(st, idx, all) {
    var titleId = st.id + '-title';
    var bodyId = st.id + '-body';
    var toggle = el('button', { type: 'button', className: 'g-toggle', 'aria-expanded': 'true', 'aria-controls': bodyId, 'aria-label': t('g.toggle') }, [icon(ICON.chevron)]);
    var sec = el('section', { className: 'g-step', id: st.id, 'aria-labelledby': titleId });
    toggle.addEventListener('click', function () { setCollapsed(sec, !sec.classList.contains('collapsed')); });

    var content = el('div', { className: 'g-content', lang: 'en', dir: 'ltr' });
    renderBlocks(st.blocks, content);

    var doneBtn = el('button', { type: 'button', className: 'btn g-done-btn', 'aria-pressed': String(isDone(st.id)) });
    function paintDone() {
      var on = isDone(st.id);
      doneBtn.setAttribute('aria-pressed', String(on));
      doneBtn.textContent = '';
      doneBtn.appendChild(icon(ICON.check));
      doneBtn.appendChild(document.createTextNode(' ' + (on ? t('g.isDone') : t('g.done'))));
      sec.classList.toggle('done', on);
    }
    doneBtn.addEventListener('click', function () {
      var on = !isDone(st.id);
      if (on) state.done.push(st.id); else state.done = state.done.filter(function (x) { return x !== st.id; });
      saveDone(); paintDone(); updateProgress(on);
      if (on) {
        setCollapsed(sec, true);
        var nextStep = all[idx + 1];
        if (nextStep) goToStep(nextStep.id);
      }
    });
    paintDone();

    var nav = el('div', { className: 'g-step-nav' }, [
      idx > 0 ? navBtn(all[idx - 1].id, t('g.prev'), ICON.back) : null,
      idx < all.length - 1 ? navBtn(all[idx + 1].id, t('g.next'), ICON.arrow) : null
    ]);
    var label = st.num != null ? t('g.step', { n: st.num }) : t('help.title');
    sec.appendChild(el('div', { className: 'g-step-head' }, [
      el('span', { className: 'g-num', 'aria-hidden': 'true', text: st.num != null ? st.num : '?' }),
      el('div', { className: 'g-step-titles' }, [
        el('span', { className: 'g-layer ' + st.layer, text: label + ' · ' + t('layer.' + st.layer) }),
        el('h2', { id: titleId, dir: 'auto', text: st.num != null ? st.title : t('help.title') })
      ]),
      toggle
    ]));
    sec.appendChild(el('div', { className: 'g-step-body', id: bodyId }, [
      journey(st),
      glance(st),
      st.tip ? el('aside', { className: 'g-tip' }, [owl('owl-mini'), el('p', null, [el('strong', { text: t('g.tip') + ' ' }), loc(st, 'tip')])]) : null,
      content,
      el('div', { className: 'g-step-foot' }, [st.num != null ? doneBtn : null, nav])
    ]));
    return sec;
  }
  function navBtn(id, label, ic) {
    var a = el('a', { className: 'btn', href: '#' + id }, ic === ICON.back ? [icon(ic), label] : [label, icon(ic)]);
    a.addEventListener('click', function (e) { e.preventDefault(); goToStep(id); });
    return a;
  }

  function updateProgress(celebrate) {
    var steps = realSteps(), n = steps.length;
    var d = steps.filter(function (st) { return isDone(st.id); }).length;
    var pct = n ? d / n : 0;
    var bar = document.getElementById('ring-bar');
    if (bar) bar.setAttribute('stroke-dashoffset', String(339.3 * (1 - pct)));
    var complete = n > 0 && d === n;
    var txt = document.getElementById('progress-text'), sub = document.getElementById('progress-sub');
    if (txt) txt.textContent = complete ? t('g.complete') : t('g.progress', { d: d, n: n });
    if (sub) sub.textContent = complete ? t('g.completeSub') : t('g.progressSub');
    var card = document.getElementById('progress-card');
    if (card) {
      card.classList.toggle('complete', complete);
      var use = card.querySelector('.ring-owl use');
      if (use) use.setAttribute('href', complete ? '#owl-grad' : (d === 0 ? '#owl-sleepy' : '#owl-mini'));
    }
    var tc = document.getElementById('toc-count'); if (tc) tc.textContent = d + '/' + n;
    var tb = document.getElementById('toc-bar'); if (tb) tb.style.width = (pct * 100) + '%';
    state.guide.steps.forEach(function (st) {
      var li = document.getElementById('toc-' + st.id); if (li) li.classList.toggle('done', isDone(st.id));
    });
    document.querySelectorAll('.g-jdot').forEach(function (b, i) {
      var steps = realSteps(); var x = steps[i % steps.length]; if (x) b.classList.toggle('done', isDone(x.id));
    });
    if (complete && celebrate && !reduceMotion) confetti();
  }
  function confetti() {
    var box = document.getElementById('confetti'); if (!box) return;
    var colors = ['#f5b83d', '#b5a4ff', '#5fd6ad', '#ff8fa3', '#ffffff'];
    for (var i = 0; i < 36; i++) {
      var p = el('i');
      p.style.left = Math.random() * 100 + '%';
      p.style.background = colors[i % colors.length];
      p.style.animationDelay = (Math.random() * .6) + 's';
      box.appendChild(p);
    }
    setTimeout(function () { box.textContent = ''; }, 3400);
  }

  var spy = null;
  function initScrollSpy() {
    if (spy) spy.disconnect();
    if (!('IntersectionObserver' in window)) return;
    spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        document.querySelectorAll('.g-toc a').forEach(function (a) {
          if (a.getAttribute('data-step') === en.target.id) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    document.querySelectorAll('.g-step').forEach(function (sec) { spy.observe(sec); });
  }

  function render() {
    var g = state.guide, root = document.getElementById('guide-root');
    var collapsed = {};
    document.querySelectorAll('.g-step.collapsed').forEach(function (sec) { collapsed[sec.id] = true; });
    root.textContent = '';
    document.title = loc(g, 'title') + ' · ' + t('g.eyebrow') + ' · ' + t('name');
    root.appendChild(hero(g));
    root.appendChild(overview(g));
    var steps = el('div', { className: 'g-steps' }, [
      state.lang === 'ar' ? el('p', { className: 'g-lang-note', text: t('g.langNote') }) : null
    ]);
    g.steps.forEach(function (st, i) {
      var card = stepCard(st, i, g.steps);
      if (collapsed[st.id]) setCollapsed(card, true);
      steps.appendChild(card);
    });
    steps.appendChild(el('div', { className: 'g-step g-finish' }, [
      owl('owl-grad'), el('h2', { text: t('g.finish') }), el('p', { className: 'muted', text: t('g.finishSub') }),
      el('a', { className: 'btn btn-primary', href: 'index.html#projects' }, [t('g.toPortfolio')])
    ]));
    root.appendChild(el('section', { className: 'g-body' }, [
      el('div', { className: 'container g-layout' }, [toc(g), steps])
    ]));
    updateProgress(false);
    initScrollSpy();
  }

  function notFound(detail) {
    if (detail) console.error('[guide] ' + detail);
    var root = document.getElementById('guide-root');
    root.textContent = '';
    root.appendChild(el('div', { className: 'container', style: 'padding-block: 4rem' }, [
      el('div', { className: 'notice' }, [
        owl('owl-sleepy', 'notice-owl'),
        el('h3', { text: t('g.notFound') }),
        el('p', { text: t('g.notFoundBody') }),
        el('a', { className: 'btn btn-primary', href: 'index.html#projects', text: t('g.toPortfolio') })
      ])
    ]));
  }

  function onScroll() {
    var bar = document.getElementById('read-bar'); if (!bar) return;
    var h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (h > 0 ? Math.min(100, scrollY / h * 100) : 0) + '%';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var applyTheme = initTheme();
    applyStatic(applyTheme);
    var year = document.getElementById('year'); if (year) year.textContent = String(new Date().getFullYear());
    document.getElementById('lang-toggle').addEventListener('click', function () {
      state.lang = state.lang === 'ar' ? 'en' : 'ar';
      store.set('lang', state.lang);
      applyStatic(applyTheme);
      if (state.guide) render();
    });
    window.addEventListener('scroll', onScroll, { passive: true });

    var id = new URLSearchParams(location.search).get('p') || '';
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) { notFound('missing or invalid ?p= parameter'); return; }
    state.id = id;
    fetch('guides/' + id + '.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status + ' for guides/' + id + '.json'); return r.json(); })
      .then(function (g) {
        if (!g || !Array.isArray(g.steps) || !g.steps.length) throw new Error('guide has no steps');
        state.guide = g; state.done = loadDone();
        render();
        if (location.hash && /^#step-[\w-]+$/.test(location.hash)) setTimeout(function () { goToStep(location.hash.slice(1)); }, 50);
      })
      .catch(function (e) { notFound(e.message); });
  });
})();
