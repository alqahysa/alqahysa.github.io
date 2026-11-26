/* ==========================================================================
   Portfolio app: theme, language (EN/AR), the owl, and project rendering.
   All project content comes from projects.json. Nothing to edit here when
   you add, update or delete a project.
   ========================================================================== */
(function () {
  'use strict';

  var PROJECTS_URL = 'projects.json';
  var GITHUB_URL = 'https://github.com/alqahysa';

  /* ---------- UI strings ---------- */
  var I18N = {
    en: {
      'name': 'Sarah A. AlQahtani',
      'skip': 'Skip to main content',
      'nav.label': 'Sections',
      'nav.skills': 'Skills', 'nav.projects': 'Projects', 'nav.about': 'About', 'nav.contact': 'Contact',
      'hero.eyebrow': 'Data & AI Engineering enthusiast',
      'hero.title': 'I turn messy source data into trusted, automated insight for Saudi retail and banking, and I love exploring where clean data meets AI.',
      'cta.projects': 'See my projects', 'cta.github': 'GitHub', 'cta.linkedin': 'LinkedIn', 'cta.email': 'Email', 'cta.cv': 'CV',
      'scene.alt': 'A cute black owl perched on a branch beside a data pipeline that flows from bronze to silver to gold.',
      'scene.bronze': 'Bronze', 'scene.silver': 'Silver', 'scene.gold': 'Gold',
      'scene.hint': 'Psst… click the owl for a data tip.',
      'owl.label': 'Ask the owl for a data tip',
      'owl.tips': [
        'Hoo! Clean data first.',
        'Reconcile bronze to silver.',
        'Watermarks keep loads incremental.',
        'Mask PII before silver.',
        'Upserts beat delete-and-reload.',
        'Pick the grain before the facts.',
        'Good AI needs good data.',
        'Test in Dev, then ship to Prod.'
      ],
      'skills.title': "What's in my nest",
      'skills.intro': 'How I approach data work, from raw ingestion all the way to the report and the AI on top.',
      'skills.architecture': 'Architecture', 'skills.engineering': 'Engineering', 'skills.modeling': 'Modeling',
      'skills.quality': 'Data quality & governance', 'skills.devops': 'DevOps', 'skills.bi': 'Analytics & BI',
      'skills.ai': 'AI & ML', 'skills.domain': 'Saudi domain know-how',
      'sk.lakehouse': 'Lakehouse architecture', 'sk.medallion': 'Raw → clean → business-ready layers', 'sk.dwh': 'Data warehouse design',
      'sk.cloud': 'Cloud data platforms', 'sk.access': 'Central governance & access control',
      'sk.ingest': 'Batch & streaming ingestion', 'sk.incremental': 'Incremental loading', 'sk.upsert': 'Upserts & change handling',
      'sk.etl': 'ETL / ELT design', 'sk.migration': 'Data migration', 'sk.automation': 'Workflow automation',
      'sk.star': 'Star schema (Kimball)', 'sk.factdim': 'Fact & dimension design', 'sk.grain': 'Choosing the right grain', 'sk.calendar': 'Business calendars',
      'sk.recon': 'Source-to-target reconciliation', 'sk.dq': 'Automated data-quality checks', 'sk.rca': 'Root cause analysis',
      'sk.mdm': 'Master & metadata management', 'sk.pdpl': 'PDPL masking',
      'sk.vc': 'Version control', 'sk.cicd': 'CI/CD', 'sk.devprod': 'Dev → Prod releases', 'sk.alerts': 'Automated failure alerts',
      'sk.dash': 'Self-service dashboards', 'sk.kpi': 'KPI design', 'sk.nlq': 'Natural-language Q&A on data', 'sk.bench': 'Market benchmarking',
      'sk.cpmai': 'Managing AI projects', 'sk.dl': 'Deep learning', 'sk.sentiment': 'Sentiment analysis & recommenders',
      'sk.aidata': 'AI-ready data', 'sk.privacy': 'Privacy by design',
      'sk.sama': 'SAMA data', 'sk.fincrime': 'Financial crime & forensic analytics', 'sk.ar': 'Accounts receivable reporting',
      'sk.procure': 'Procurement analytics', 'sk.vat': 'VAT', 'sk.saudical': 'Saudi calendar (Ramadan, White Friday, National Day)',
      'sk.shariah': 'Shariah finance products',
      'projects.title': 'Projects',
      'projects.intro': 'Each case study shows the business problem, my approach and the result, with the code and a step-by-step guide so you can build it yourself.',
      'projects.loading': 'Loading projects…',
      'projects.errorTitle': 'Hoo… the projects could not be loaded right now.',
      'projects.errorBody': 'Please refresh the page in a moment. In the meantime, all of my work is on GitHub.',
      'projects.retry': 'Try again',
      'projects.githubBtn': 'Browse my GitHub',
      'projects.emptyTitle': 'The owl is hatching new projects.',
      'projects.emptyBody': 'New case studies are on the way. Meanwhile, you can see my latest work on GitHub.',
      'projects.count': '{n} projects', 'projects.countOne': '1 project',
      'projects.showing': 'Showing {n} of {total} projects',
      'filter.label': 'Filter projects', 'filter.all': 'All',
      'card.featured': 'Featured', 'card.problem': 'Problem', 'card.decisions': 'Approach',
      'card.result': 'Result',
      'card.repo': 'Code repo', 'card.guide': 'Step-by-step guide', 'card.demo': 'Live demo',
      
      'about.title': "Hi, I'm Sarah",
      'about.p1': "I'm a data engineer and a curious AI enthusiast based in Dhahran. For about seven years I've been turning messy source data into things people can trust: warehouses, ETL pipelines, reconciliations and dashboards.",
      'about.p2': 'My favourite part is the bit most people skip: matching source to target, writing automated quality checks, and tracing every odd number back to its root cause. I sharpened that on financial-crime and forensic work at Deloitte, and before that by building an accounts-receivable warehouse from scratch, including a full database migration and automated monthly reporting for every business unit.',
      'about.p3': "These days I build cloud lakehouses end to end and keep one eye on AI: my MSc thesis was a sentiment-based recommender system, and I'm certified in managing AI projects. I also enjoy explaining a tricky design in plain words, in Arabic or English.",
      'facts.years': 'years with data', 'facts.certs': 'certifications',
      'facts.msc': 'Big Data & Cloud Computing', 'facts.langs': 'languages: Arabic & English',
      'about.certs': 'Certifications',
      'contact.title': 'Say hoo-llo',
      'contact.body': 'Open to data and AI engineering roles, projects and good conversations. Email is the fastest way to reach me.',
      'footer.built': 'Built with plain HTML, CSS, JavaScript and one night owl. Hosted on GitHub Pages.',
      'theme.toDark': 'Switch to night mode', 'theme.toLight': 'Switch to day mode',
      'lang.switchLabel': 'عرض الصفحة بالعربية', 'lang.switchText': 'عربي', 'lang.switchLang': 'ar',
      'doc.title': 'Sarah A. AlQahtani · Data & AI Engineering Enthusiast',
      'opensNewTab': '(opens in a new tab)'
    },
    ar: {
      'name': 'سارة أ. القحطاني',
      'skip': 'انتقل إلى المحتوى الرئيسي',
      'nav.label': 'أقسام الصفحة',
      'nav.skills': 'المهارات', 'nav.projects': 'المشاريع', 'nav.about': 'نبذة', 'nav.contact': 'التواصل',
      'hero.eyebrow': 'شغوفة بهندسة البيانات والذكاء الاصطناعي',
      'hero.title': 'أحوّل بيانات المصادر الفوضوية إلى رؤى موثوقة وآلية لقطاعَي التجزئة والبنوك في السعودية، وأحب استكشاف النقطة التي تلتقي فيها البيانات النظيفة بالذكاء الاصطناعي.',
      'cta.projects': 'شاهد مشاريعي', 'cta.github': 'GitHub', 'cta.linkedin': 'LinkedIn', 'cta.email': 'البريد الإلكتروني', 'cta.cv': 'السيرة الذاتية',
      'scene.alt': 'بومة سوداء لطيفة تقف على غصن بجانب خط بيانات يتدفق من البرونزي إلى الفضي ثم الذهبي.',
      'scene.bronze': 'برونزي', 'scene.silver': 'فضي', 'scene.gold': 'ذهبي',
      'scene.hint': 'اضغط على البومة لتحصل على نصيحة في البيانات.',
      'owl.label': 'اطلب من البومة نصيحة في البيانات',
      'owl.tips': [
        'هوو! البيانات النظيفة أولًا.',
        'طابِق Bronze مع Silver دائمًا.',
        'العلامة المائية تجعل التحميل تزايديًا.',
        'أخفِ البيانات الشخصية قبل Silver.',
        'التحديث الذكي أفضل من الحذف وإعادة التحميل.',
        'حدّد مستوى التفصيل قبل الحقائق.',
        'الذكاء الاصطناعي الجيد يبدأ ببيانات جيدة.',
        'اختبر في التطوير ثم انشر للإنتاج.'
      ],
      'skills.title': 'ما في عُشّي',
      'skills.intro': 'طريقتي في العمل مع البيانات، من استيعاب البيانات الخام حتى التقرير والذكاء الاصطناعي فوقه.',
      'skills.architecture': 'المعمارية', 'skills.engineering': 'الهندسة', 'skills.modeling': 'النمذجة',
      'skills.quality': 'جودة البيانات وحوكمتها', 'skills.devops': 'DevOps', 'skills.bi': 'التحليلات وذكاء الأعمال',
      'skills.ai': 'الذكاء الاصطناعي وتعلّم الآلة', 'skills.domain': 'المعرفة بالقطاع السعودي',
      'sk.lakehouse': 'معمارية Lakehouse', 'sk.medallion': 'طبقات خام ← منقّحة ← جاهزة للأعمال', 'sk.dwh': 'تصميم مستودعات البيانات',
      'sk.cloud': 'منصات البيانات السحابية', 'sk.access': 'الحوكمة المركزية والتحكم في الصلاحيات',
      'sk.ingest': 'استيعاب البيانات دفعةً وبثًّا', 'sk.incremental': 'التحميل التزايدي', 'sk.upsert': 'التحديث الذكي ومعالجة التغييرات',
      'sk.etl': 'تصميم ETL / ELT', 'sk.migration': 'ترحيل البيانات', 'sk.automation': 'أتمتة سير العمل',
      'sk.star': 'النموذج النجمي (Kimball)', 'sk.factdim': 'تصميم جداول الحقائق والأبعاد', 'sk.grain': 'اختيار مستوى التفصيل المناسب', 'sk.calendar': 'تقاويم الأعمال',
      'sk.recon': 'المطابقة بين المصدر والهدف', 'sk.dq': 'فحوصات آلية لجودة البيانات', 'sk.rca': 'تحليل الأسباب الجذرية',
      'sk.mdm': 'إدارة البيانات الرئيسية والوصفية', 'sk.pdpl': 'إخفاء البيانات وفق نظام حماية البيانات الشخصية',
      'sk.vc': 'إدارة الإصدارات', 'sk.cicd': 'التكامل والنشر المستمران', 'sk.devprod': 'النشر من التطوير إلى الإنتاج', 'sk.alerts': 'تنبيهات آلية عند الفشل',
      'sk.dash': 'لوحات معلومات ذاتية الخدمة', 'sk.kpi': 'تصميم مؤشرات الأداء', 'sk.nlq': 'أسئلة وأجوبة على البيانات باللغة الطبيعية', 'sk.bench': 'المقارنة بالسوق',
      'sk.cpmai': 'إدارة مشاريع الذكاء الاصطناعي', 'sk.dl': 'التعلّم العميق', 'sk.sentiment': 'تحليل المشاعر وأنظمة التوصية',
      'sk.aidata': 'بيانات جاهزة للذكاء الاصطناعي', 'sk.privacy': 'الخصوصية منذ التصميم',
      'sk.sama': 'بيانات البنك المركزي السعودي (ساما)', 'sk.fincrime': 'تحليلات الجرائم المالية والتحقيقات', 'sk.ar': 'تقارير الذمم المدينة',
      'sk.procure': 'تحليلات المشتريات', 'sk.vat': 'ضريبة القيمة المضافة', 'sk.saudical': 'التقويم السعودي (رمضان، الجمعة البيضاء، اليوم الوطني)',
      'sk.shariah': 'المنتجات المالية المتوافقة مع الشريعة',
      'projects.title': 'المشاريع',
      'projects.intro': 'كل دراسة حالة تعرض مشكلة العمل وطريقتي في حلّها والنتيجة، مع الكود ودليل خطوة بخطوة لتبنيها بنفسك.',
      'projects.loading': 'جارٍ تحميل المشاريع…',
      'projects.errorTitle': 'هوو… تعذّر تحميل المشاريع حاليًا.',
      'projects.errorBody': 'يُرجى تحديث الصفحة بعد قليل. وفي هذه الأثناء، تجد جميع أعمالي على GitHub.',
      'projects.retry': 'إعادة المحاولة',
      'projects.githubBtn': 'تصفّح حسابي على GitHub',
      'projects.emptyTitle': 'البومة تُفقِس مشاريع جديدة.',
      'projects.emptyBody': 'دراسات حالة جديدة قريبًا. وفي هذه الأثناء، يمكنك الاطلاع على أحدث أعمالي على GitHub.',
      'projects.count': 'عدد المشاريع: {n}', 'projects.countOne': 'مشروع واحد',
      'projects.showing': 'عرض {n} من أصل {total} مشاريع',
      'filter.label': 'تصفية المشاريع', 'filter.all': 'الكل',
      'card.featured': 'مميّز', 'card.problem': 'المشكلة', 'card.decisions': 'المنهجية',
      'card.result': 'النتيجة',
      'card.repo': 'مستودع الكود', 'card.guide': 'الدليل خطوة بخطوة', 'card.demo': 'عرض حي',
      
      'about.title': 'أهلًا، أنا سارة',
      'about.p1': 'مهندسة بيانات وشغوفة بالذكاء الاصطناعي، مقيمة في الظهران. منذ نحو سبع سنوات وأنا أحوّل بيانات المصادر الفوضوية إلى شيء يثق به الناس: مستودعات بيانات وخطوط ETL ومطابقات ولوحات معلومات.',
      'about.p2': 'أكثر ما أستمتع به هو الجزء الذي يتجاوزه كثيرون: مطابقة المصدر بالهدف، وكتابة فحوصات جودة آلية، وتتبّع كل رقم غريب حتى سببه الجذري. صقلتُ ذلك في أعمال الجرائم المالية والتحقيقات في Deloitte، وقبلها ببناء مستودع بيانات للذمم المدينة من الصفر، شمل ترحيلًا كاملًا لقاعدة البيانات وتقارير شهرية آلية لجميع وحدات الأعمال.',
      'about.p3': 'أبني اليوم منصات Lakehouse سحابية من البداية إلى النهاية، وعيني دائمًا على الذكاء الاصطناعي: كانت رسالة الماجستير عن نظام توصية قائم على تحليل المشاعر، وأحمل شهادة في إدارة مشاريع الذكاء الاصطناعي. وأستمتع بشرح التصميم المعقّد بكلمات بسيطة، بالعربية أو الإنجليزية.',
      'facts.years': 'سنوات مع البيانات', 'facts.certs': 'شهادات مهنية',
      'facts.msc': 'البيانات الضخمة والحوسبة السحابية', 'facts.langs': 'لغتان: العربية والإنجليزية',
      'about.certs': 'الشهادات',
      'contact.title': 'تواصل معي',
      'contact.body': 'متاحة لأدوار هندسة البيانات والذكاء الاصطناعي، وللمشاريع والحوارات المفيدة. البريد الإلكتروني أسرع وسيلة للتواصل.',
      'footer.built': 'صُمّم باستخدام HTML وCSS وJavaScript وبومة ساهرة، ومستضاف على GitHub Pages.',
      'theme.toDark': 'التبديل إلى الوضع الليلي', 'theme.toLight': 'التبديل إلى الوضع النهاري',
      'lang.switchLabel': 'View this page in English', 'lang.switchText': 'English', 'lang.switchLang': 'en',
      'doc.title': 'سارة أ. القحطاني · شغوفة بهندسة البيانات والذكاء الاصطناعي',
      'opensNewTab': '(يُفتح في علامة تبويب جديدة)'
    }
  };

  var state = {
    lang: document.documentElement.lang === 'ar' ? 'ar' : 'en',
    projects: null, error: null, filter: 'all', tip: 0
  };
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- helpers ---------- */
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  function t(key, vars) {
    var s = I18N[state.lang] && I18N[state.lang][key];
    if (s == null) s = I18N.en[key];
    if (s == null) s = key;
    if (vars && typeof s === 'string') Object.keys(vars).forEach(function (k) { s = s.split('{' + k + '}').join(vars[k]); });
    return s;
  }
  var SVG_NS = 'http://www.w3.org/2000/svg';
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'text') node.textContent = v;
      else if (k === 'className') node.className = v;
      else node.setAttribute(k, v === true ? '' : v);
    });
    (children || []).forEach(function (c) {
      if (c == null || c === false) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  }
  function owlIcon(symbol, className) {
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', className);
    svg.setAttribute('aria-hidden', 'true');
    var use = document.createElementNS(SVG_NS, 'use');
    use.setAttribute('href', '#' + symbol);
    svg.appendChild(use);
    return svg;
  }
  function isNonEmptyString(v) { return typeof v === 'string' && v.trim() !== ''; }
  function toStringArray(v) {
    if (Array.isArray(v)) return v.filter(isNonEmptyString).map(function (s) { return s.trim(); });
    if (isNonEmptyString(v)) return v.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    return [];
  }
  /** Only http(s) and relative URLs, so a typo in JSON can never inject a javascript: link. */
  function safeUrl(u) {
    if (!isNonEmptyString(u)) return null;
    try {
      var parsed = new URL(u.trim(), document.baseURI);
      return (parsed.protocol === 'https:' || parsed.protocol === 'http:') ? u.trim() : null;
    } catch (e) { return null; }
  }
  /** Language-aware field: `<field>_ar` in Arabic when present, else English. */
  function field(p, name) {
    if (state.lang === 'ar') {
      var ar = p[name + '_ar'];
      if (Array.isArray(ar) ? toStringArray(ar).length : isNonEmptyString(ar)) return ar;
    }
    return p[name];
  }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'project'; }

  /* ---------- theme ---------- */
  function initTheme() {
    var root = document.documentElement;
    var btn = document.getElementById('theme-toggle');
    var mq = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
    var metaTheme = document.querySelector('meta[name="theme-color"]');
    function apply(theme) {
      root.setAttribute('data-theme', theme);
      var dark = theme === 'dark';
      btn.setAttribute('aria-label', t(dark ? 'theme.toLight' : 'theme.toDark'));
      btn.setAttribute('title', t(dark ? 'theme.toLight' : 'theme.toDark'));
      if (metaTheme) metaTheme.setAttribute('content', dark ? '#0f0d17' : '#f6f5fb');
    }
    apply(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      store.set('theme', next);
      apply(next);
    });
    if (mq) {
      var onChange = function (e) { if (!store.get('theme')) apply(e.matches ? 'dark' : 'light'); };
      if (mq.addEventListener) mq.addEventListener('change', onChange); else if (mq.addListener) mq.addListener(onChange);
    }
    return apply;
  }

  /* ---------- language ---------- */
  function applyLanguage(lang, applyTheme) {
    state.lang = lang === 'ar' ? 'ar' : 'en';
    var root = document.documentElement;
    root.lang = state.lang;
    root.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
    document.title = t('doc.title');
    document.querySelectorAll('[data-i18n]').forEach(function (node) { node.textContent = t(node.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (node) {
      node.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var parts = pair.split(':');
        if (parts.length === 2) node.setAttribute(parts[0].trim(), t(parts[1].trim()));
      });
    });
    var langBtn = document.getElementById('lang-toggle');
    langBtn.textContent = t('lang.switchText');
    langBtn.setAttribute('aria-label', t('lang.switchLabel'));
    langBtn.setAttribute('lang', t('lang.switchLang'));
    var owl = document.getElementById('owl');
    if (owl) owl.setAttribute('aria-label', t('owl.label'));
    // SVG text needs its own direction so Arabic punctuation lands correctly.
    document.querySelectorAll('#owl-scene text').forEach(function (n) { n.setAttribute('direction', root.dir); });
    setOwlTip(state.tip, false);
    if (applyTheme) applyTheme(root.getAttribute('data-theme'));
    renderProjects();
  }

  /* ---------- the owl: tips on click, eyes follow the pointer ---------- */
  function setOwlTip(i, announce) {
    var tips = t('owl.tips');
    var says = document.getElementById('owl-says');
    if (!says || !Array.isArray(tips)) return;
    state.tip = ((i % tips.length) + tips.length) % tips.length;
    says.textContent = tips[state.tip];
    var hint = document.querySelector('.scene-hint');
    if (announce && hint) { hint.setAttribute('aria-live', 'polite'); hint.textContent = tips[state.tip]; }
  }
  function initOwl() {
    var owl = document.getElementById('owl');
    var scene = document.getElementById('owl-scene');
    if (!owl || !scene) return;
    function ask() {
      setOwlTip(state.tip + 1, true);
      if (reduceMotion) return;
      owl.classList.remove('hop'); void owl.getBBox(); owl.classList.add('hop');
    }
    owl.addEventListener('click', ask);
    owl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ask(); }
    });
    owl.addEventListener('animationend', function () { owl.classList.remove('hop'); });

    if (reduceMotion) return;
    var pupils = scene.querySelectorAll('.pupil');
    var frame = null;
    window.addEventListener('pointermove', function (e) {
      if (frame) return;
      frame = requestAnimationFrame(function () {
        frame = null;
        var box = scene.getBoundingClientRect();
        if (!box.width) return;
        var scale = box.width / 520;
        pupils.forEach(function (p) {
          var cx = box.left + Number(p.getAttribute('data-cx')) * scale;
          var cy = box.top + Number(p.getAttribute('data-cy')) * scale;
          var dx = e.clientX - cx, dy = e.clientY - cy;
          var d = Math.sqrt(dx * dx + dy * dy) || 1;
          var r = Math.min(8, d / 40);
          p.style.transform = 'translate(' + (dx / d * r).toFixed(2) + 'px,' + (dy / d * r).toFixed(2) + 'px)';
        });
      });
    }, { passive: true });
  }

  /* ---------- projects: load ---------- */
  function normalize(raw) {
    var list = Array.isArray(raw) ? raw : (raw && Array.isArray(raw.projects) ? raw.projects : null);
    if (!list) throw new Error('projects.json must be an array of project objects (or {"projects": [...]})');
    var seen = {};
    return list
      .filter(function (p) { return p && typeof p === 'object' && isNonEmptyString(p.title); })
      .map(function (p, i) {
        var id = isNonEmptyString(p.id) ? p.id.trim() : slug(p.title);
        if (seen[id]) { console.warn('[projects.json] duplicate id "' + id + '"; renaming for display.'); id = id + '-' + i; }
        seen[id] = true;
        var order = Number(p.order);
        return Object.assign({}, p, {
          id: id,
          featured: p.featured === true || p.featured === 'true',
          order: isFinite(order) && p.order !== '' && p.order != null ? order : Number.MAX_SAFE_INTEGER
        });
      })
      .sort(function (a, b) {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        if (a.order !== b.order) return a.order - b.order;
        return String(a.title).localeCompare(String(b.title));
      });
  }
  function loadProjects() {
    state.projects = null; state.error = null;
    renderProjects();
    fetch(PROJECTS_URL, { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status + ' while loading ' + PROJECTS_URL);
        return res.text();
      })
      .then(function (text) {
        var data;
        try { data = JSON.parse(text); }
        catch (e) { throw new Error('projects.json is not valid JSON: ' + e.message + ' (check it on jsonlint.com)'); }
        state.projects = normalize(data);
      })
      .catch(function (err) { console.error('[portfolio] ' + err.message); state.error = err; })
      .then(renderProjects);
  }

  /* ---------- projects: render ---------- */
  /** Projects are grouped (and filtered) by category. */
  function groupKey(p) { return isNonEmptyString(p.category) ? p.category.trim() : null; }
  function groupLabel(p) { var v = field(p, 'category'); return isNonEmptyString(v) ? v.trim() : ''; }

  function renderProjects() {
    var status = document.getElementById('project-status');
    var list = document.getElementById('project-list');
    var filters = document.getElementById('project-filters');
    if (!status || !list) return;
    list.textContent = ''; status.textContent = ''; filters.textContent = ''; filters.hidden = true;

    if (state.error) {
      var retry = el('button', { type: 'button', className: 'btn btn-primary', text: t('projects.retry') });
      retry.addEventListener('click', loadProjects);
      status.appendChild(el('div', { className: 'notice' }, [
        owlIcon('owl-mini', 'notice-owl'),
        el('h3', { text: t('projects.errorTitle') }),
        el('p', { text: t('projects.errorBody') }),
        el('div', { className: 'notice-actions' }, [
          retry,
          el('a', { className: 'btn', href: GITHUB_URL, target: '_blank', rel: 'noopener', text: t('projects.githubBtn') })
        ])
      ]));
      return;
    }
    if (state.projects === null) { status.appendChild(el('p', { text: t('projects.loading') })); return; }
    if (state.projects.length === 0) {
      status.appendChild(el('div', { className: 'notice' }, [
        owlIcon('owl-sleepy', 'notice-owl'),
        el('h3', { text: t('projects.emptyTitle') }),
        el('p', { text: t('projects.emptyBody') }),
        el('a', { className: 'btn btn-primary', href: GITHUB_URL, target: '_blank', rel: 'noopener', text: t('projects.githubBtn') })
      ]));
      return;
    }

    // Category filter buttons appear only when there are 2+ categories.
    var groups = { keys: [], labels: {} };
    state.projects.forEach(function (p) {
      var k = groupKey(p);
      if (k && groups.keys.indexOf(k) === -1) { groups.keys.push(k); groups.labels[k] = groupLabel(p); }
    });
    if (state.filter !== 'all' && groups.keys.indexOf(state.filter) === -1) state.filter = 'all';

    if (groups.keys.length >= 2) {
      filters.hidden = false;
      filters.setAttribute('aria-label', t('filter.label'));
      ['all'].concat(groups.keys).forEach(function (k) {
        var b = el('button', {
          type: 'button', className: 'filter-btn', dir: 'auto', 'data-key': k,
          'aria-pressed': String(state.filter === k),
          text: k === 'all' ? t('filter.all') : groups.labels[k]
        });
        b.addEventListener('click', function () {
          state.filter = k;
          renderProjects();
          var again = filters.querySelector('[data-key="' + CSS.escape(k) + '"]');
          if (again) again.focus();
        });
        filters.appendChild(b);
      });
    }

    var visible = state.projects.filter(function (p) { return state.filter === 'all' || groupKey(p) === state.filter; });
    var total = state.projects.length;
    var msg = state.filter === 'all'
      ? (total === 1 ? t('projects.countOne') : t('projects.count', { n: total }))
      : t('projects.showing', { n: visible.length, total: total });
    status.appendChild(el('p', { className: 'sr-only', text: msg }));

    visible.forEach(function (p) {
      try { list.appendChild(buildCard(p)); }
      catch (e) { console.error('[portfolio] could not render project "' + p.id + '":', e); }
    });
  }

  function linkBtn(href, cls, label, iconPath) {
    var icon = document.createElementNS(SVG_NS, 'svg');
    icon.setAttribute('class', 'icon'); icon.setAttribute('viewBox', '0 0 24 24'); icon.setAttribute('aria-hidden', 'true');
    var path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', iconPath); path.setAttribute('fill', 'none'); path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '2'); path.setAttribute('stroke-linecap', 'round'); path.setAttribute('stroke-linejoin', 'round');
    icon.appendChild(path);
    var external = /^https?:\/\//i.test(href) && new URL(href, document.baseURI).origin !== location.origin;
    return el('a', external ? { className: 'btn ' + cls, href: href, target: '_blank', rel: 'noopener' } : { className: 'btn ' + cls, href: href }, [
      icon, label, external ? el('span', { className: 'sr-only', text: ' ' + t('opensNewTab') }) : null
    ]);
  }
  var ICON_CODE = 'm8 7-5 5 5 5M16 7l5 5-5 5';
  var ICON_GUIDE = 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 8h8M8 12h5';
  var ICON_DEMO = 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5';

  /* Every card has the same design: illustrated cover → badges → title → tagline
     → Problem → Approach → Result → buttons. No tools, code or screenshots. */
  var COVER_ART = {
    // pipeline: bronze → silver → gold (default, data engineering)
    pipeline: function () {
      return [el('span', { className: 'dot b' }), el('span', { className: 'line' }), el('span', { className: 'dot s' }),
              el('span', { className: 'line' }), el('span', { className: 'dot g' })];
    },
    // AI: a small network of glowing nodes
    ai: function () {
      return [el('span', { className: 'node n1' }), el('span', { className: 'node n2' }), el('span', { className: 'node n3' }),
              el('span', { className: 'node n4' }), el('span', { className: 'spark' })];
    },
    // analytics: rising bars
    bars: function () {
      return [1, 2, 3, 4].map(function (i) { return el('span', { className: 'bar bar' + i }); });
    }
  };
  function coverKind(p) {
    var c = (isNonEmptyString(p.category) ? p.category : '').toLowerCase();
    if (/\bai\b|machine|ml|genai|llm|intelligence/.test(c)) return 'ai';
    if (/analytic|bi\b|dashboard|insight|report/.test(c)) return 'bars';
    return 'pipeline';
  }

  function buildCard(p) {
    var title = String(field(p, 'title')).trim();
    var titleId = 'project-' + slug(p.id) + '-title';
    var tagline = field(p, 'tagline');
    var problem = field(p, 'problem');
    var highlights = toStringArray(field(p, 'highlights')).slice(0, 4);
    var result = field(p, 'result');
    var category = field(p, 'category');
    var repo = safeUrl(p.repo_url);
    var guide = safeUrl(p.guide_url);
    var demo = safeUrl(p.demo_url);
    var kind = coverKind(p);

    var cover = el('div', { className: 'card-cover cover-' + kind, 'aria-hidden': 'true' },
      [el('div', { className: 'cover-art' }, COVER_ART[kind]()), owlIcon('owl-mini', 'cover-owl')]);

    var meta = el('div', { className: 'card-meta' }, [
      isNonEmptyString(category) ? el('span', { className: 'badge badge-cat', dir: 'auto', text: category.trim() }) : null,
      p.featured ? el('span', { className: 'badge badge-featured' }, [owlIcon('owl-mini', ''), t('card.featured')]) : null
    ]);
    var header = el('header', null, [
      meta.childNodes.length ? meta : null,
      el('h3', { id: titleId, text: title }),
      isNonEmptyString(tagline) ? el('p', { className: 'tagline', text: tagline.trim() }) : null
    ]);
    var problemBlock = isNonEmptyString(problem) ? el('section', { className: 'card-block' }, [
      el('h4', { text: t('card.problem') }), el('p', { text: problem.trim() })
    ]) : null;
    var approach = highlights.length ? el('section', { className: 'card-block' }, [
      el('h4', { text: t('card.decisions') }),
      el('ul', null, highlights.map(function (h) { return el('li', { text: h }); }))
    ]) : null;
    var resultBlock = isNonEmptyString(result) ? el('div', { className: 'card-result' }, [
      el('h4', { text: t('card.result') }), el('p', { text: result.trim() })
    ]) : null;

    var guideLabel = state.lang === 'ar' && isNonEmptyString(p.guide_label_ar) ? p.guide_label_ar
      : (state.lang === 'en' && isNonEmptyString(p.guide_label) ? p.guide_label : t('card.guide'));
    var links = el('footer', { className: 'card-links' }, [
      repo ? linkBtn(repo, 'btn-primary', t('card.repo'), ICON_CODE) : null,
      guide ? linkBtn(guide, 'btn-gold', guideLabel, ICON_GUIDE) : null,
      demo ? linkBtn(demo, '', t('card.demo'), ICON_DEMO) : null
    ]);

    var body = el('div', { className: 'card-body' }, [
      header, problemBlock, approach, resultBlock, links.childNodes.length ? links : null
    ]);
    return el('article', { className: 'card', id: 'project-' + slug(p.id), 'aria-labelledby': titleId }, [cover, body]);
  }

  /* ---------- CV button: hidden until assets/cv.pdf exists ---------- */
  function checkCv() {
    var cv = document.getElementById('cv-link');
    if (!cv) return;
    fetch(cv.getAttribute('href'), { method: 'HEAD', cache: 'no-cache' })
      .then(function (r) { if (!r.ok) cv.hidden = true; })
      .catch(function () { cv.hidden = true; });
  }

  /* ---------- boot ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    var applyTheme = initTheme();
    document.getElementById('lang-toggle').addEventListener('click', function () {
      var next = state.lang === 'ar' ? 'en' : 'ar';
      store.set('lang', next);
      applyLanguage(next, applyTheme);
    });
    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
    initOwl();
    applyLanguage(state.lang, applyTheme);
    loadProjects();
    checkCv();
  });
})();
