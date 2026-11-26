/* ==========================================================================
   Guide converter: turns an uploaded guide (.docx, .md or .html) into the
   guides/<id>.json format that guide.html renders with the owl theme.
   Used only by admin.html. Runs entirely in the browser.

   Path:  .docx --mammoth--> HTML ┐
          .md   --marked---> HTML ├--> blocks --> steps + intro --> guide JSON
          .html -------------------┘
   ========================================================================== */
(function () {
  'use strict';

  // Parser libraries load on demand from jsDelivr, pinned and integrity-checked.
  var LIBS = {
    marked: { src: 'https://cdn.jsdelivr.net/npm/marked@12.0.2/marked.min.js',
              integrity: 'sha384-/TQbtLCAerC3jgaim+N78RZSDYV7ryeoBCVqTuzRrFec2akfBkHS7ACQ3PQhvMVi', global: 'marked' },
    mammoth: { src: 'https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js',
               integrity: 'sha384-/cXAMbzovUIKbBERjPmR3SnPTh8siWr5lsvFYj1Uq4XP0yaJUZJmsh0YXyGv5P0y', global: 'mammoth' }
  };
  var loading = {};
  function loadLib(name) {
    var lib = LIBS[name];
    if (window[lib.global]) return Promise.resolve(window[lib.global]);
    if (loading[name]) return loading[name];
    loading[name] = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = lib.src; s.integrity = lib.integrity; s.crossOrigin = 'anonymous';
      s.onload = function () { resolve(window[lib.global]); };
      s.onerror = function () { loading[name] = null; reject(new Error('Could not load the ' + name + ' library. Check your internet connection and try again.')); };
      document.head.appendChild(s);
    });
    return loading[name];
  }

  /* ---------- file → HTML ---------- */
  function readAs(file, how) {
    return new Promise(function (resolve, reject) {
      var r = new FileReader();
      r.onload = function () { resolve(r.result); };
      r.onerror = function () { reject(new Error('Could not read the file.')); };
      if (how === 'buffer') r.readAsArrayBuffer(file); else r.readAsText(file);
    });
  }
  function fileToHtml(file) {
    var name = (file.name || '').toLowerCase();
    if (/\.docx$/.test(name)) {
      return Promise.all([loadLib('mammoth'), readAs(file, 'buffer')]).then(function (res) {
        return res[0].convertToHtml({ arrayBuffer: res[1] }, {
          // keep code formatting from common Word styles
          styleMap: ["p[style-name='Code'] => pre:separator('\\n')", "p[style-name='Source Code'] => pre:separator('\\n')",
                     "r[style-name='Verbatim Char'] => code", "r[style-name='Code Char'] => code"]
        });
      }).then(function (out) { return out.value; });
    }
    if (/\.(md|markdown|txt)$/.test(name)) {
      return Promise.all([loadLib('marked'), readAs(file, 'text')]).then(function (res) {
        return res[0].parse(res[1], { gfm: true });
      });
    }
    if (/\.html?$/.test(name)) return readAs(file, 'text');
    return Promise.reject(new Error('Please upload a .docx, .md or .html file.'));
  }

  /* ---------- HTML → blocks (same block types guide.js renders) ---------- */
  function safeHref(h) {
    try { var u = new URL(h, location.href); return /^https?:$/.test(u.protocol) ? u.href : null; } catch (e) { return null; }
  }
  function segs(node) {
    var out = [];
    function walk(n, fmt) {
      if (n.nodeType === 3) { if (n.nodeValue) out.push(Object.assign({ t: n.nodeValue }, fmt)); return; }
      if (n.nodeType !== 1) return;
      var tag = n.tagName.toLowerCase(), f = Object.assign({}, fmt);
      if (tag === 'strong' || tag === 'b') f.b = 1;
      else if (tag === 'em' || tag === 'i') f.i = 1;
      else if (tag === 'code' || tag === 'kbd' || tag === 'samp') f.c = 1;
      else if (tag === 'a') { var h = safeHref(n.getAttribute('href') || ''); if (h) f.a = h; }
      else if (tag === 'br') { out.push(Object.assign({ t: '\n' }, fmt)); return; }
      else if (tag === 'img') { var alt = n.getAttribute('alt'); if (alt) out.push(Object.assign({ t: '[' + alt + ']' }, fmt)); return; }
      else if (/^(ul|ol|pre|table|blockquote)$/.test(tag)) return; // handled as blocks
      n.childNodes.forEach(function (c) { walk(c, f); });
    }
    node.childNodes.forEach(function (c) { walk(c, {}); });
    // collapse whitespace and merge neighbours with the same formatting
    var merged = [];
    out.forEach(function (s) {
      var t = s.c ? s.t : s.t.replace(/[ \t\r\n]+/g, ' ');
      var key = JSON.stringify(Object.assign({}, s, { t: '' }));
      var last = merged[merged.length - 1];
      if (last && last._k === key) last.t += t; else merged.push(Object.assign({}, s, { t: t, _k: key }));
    });
    merged.forEach(function (s) { delete s._k; });
    if (merged.length) { merged[0].t = merged[0].t.replace(/^\s+/, ''); merged[merged.length - 1].t = merged[merged.length - 1].t.replace(/\s+$/, ''); }
    return merged.filter(function (s) { return s.t !== ''; });
  }
  function plain(sg) { return sg.map(function (s) { return s.t; }).join(''); }
  function isBlockTag(tag) { return /^(p|h[1-6]|ul|ol|pre|table|blockquote|div|section|article|figure|hr|header|footer|main)$/.test(tag); }

  function toBlocks(container) {
    var out = [];
    var inlineBuf = document.createElement('p');
    function flushInline() {
      var sg = segs(inlineBuf);
      if (plain(sg).trim()) out.push({ type: 'p', segs: sg });
      inlineBuf = document.createElement('p');
    }
    container.childNodes.forEach(function (n) {
      if (n.nodeType === 3) { inlineBuf.appendChild(n.cloneNode()); return; }
      if (n.nodeType !== 1) return;
      var tag = n.tagName.toLowerCase();
      if (!isBlockTag(tag)) { inlineBuf.appendChild(n.cloneNode(true)); return; }
      flushInline();
      if (/^h[1-6]$/.test(tag)) {
        var text = n.textContent.replace(/\s+/g, ' ').trim();
        if (text) out.push({ type: 'h', level: Number(tag[1]), text: text });
      } else if (tag === 'p') {
        var sg = segs(n);
        if (plain(sg).trim()) out.push({ type: 'p', segs: sg });
        // a paragraph that only holds a code-styled run becomes a code block
      } else if (tag === 'ul' || tag === 'ol') {
        var items = [];
        n.childNodes.forEach(function (li) {
          if (li.nodeType !== 1 || li.tagName.toLowerCase() !== 'li') return;
          var inner = toBlocks(li);
          if (inner.length) items.push(inner);
        });
        if (items.length) out.push({ type: tag, items: items });
      } else if (tag === 'pre') {
        var code = n.querySelector('code');
        var lang = '';
        var cls = (code && code.className) || n.className || '';
        var m = /(?:lang|language)-([\w+#.-]+)/.exec(cls);
        if (m) lang = m[1];
        var txt = (code || n).textContent.replace(/\n+$/, '');
        if (txt.trim()) out.push({ type: 'code', lang: lang, text: txt });
      } else if (tag === 'table') {
        var rows = [], head = null;
        n.querySelectorAll('tr').forEach(function (tr, i) {
          var cells = [];
          tr.querySelectorAll('th, td').forEach(function (c) { cells.push(segs(c)); });
          var allTh = tr.querySelectorAll('th').length === cells.length && cells.length;
          if (i === 0 && (allTh || (tr.parentElement && tr.parentElement.tagName.toLowerCase() === 'thead'))) head = cells; else rows.push(cells);
        });
        // Word tables have no header markup: treat a bold first row as the header
        if (!head && rows.length > 1 && rows[0].every(function (c) { return c.length && c.every(function (s) { return s.b; }); })) {
          head = rows.shift().map(function (c) { return c.map(function (s) { var x = Object.assign({}, s); delete x.b; return x; }); });
        }
        if (rows.length || head) out.push({ type: 'table', head: head, rows: rows });
      } else if (tag === 'blockquote') {
        var inner = toBlocks(n);
        if (inner.length) out.push({ type: 'quote', blocks: inner });
      } else if (tag === 'hr') {
        // ignore
      } else {
        toBlocks(n).forEach(function (b) { out.push(b); });
      }
    });
    flushInline();
    return mergeCodeParagraphs(out);
  }
  /** Word often stores code as one paragraph per line in a code style: join runs of all-code paragraphs. */
  function mergeCodeParagraphs(blocks) {
    var res = [], buf = [];
    function flush() {
      if (buf.length >= 2) res.push({ type: 'code', lang: '', text: buf.join('\n') });
      else if (buf.length === 1) res.push(buf.para);
      buf = [];
    }
    blocks.forEach(function (b) {
      var allCode = b.type === 'p' && b.segs.length && b.segs.every(function (s) { return s.c; });
      if (allCode) { if (!buf.length) buf.para = b; buf.push(plain(b.segs)); }
      else { flush(); res.push(b); }
    });
    flush();
    return res;
  }

  /* ---------- steps, layers, goals ---------- */
  var LAYER_RULES = [
    ['help', /troubleshoot|faq|common (errors|issues)|debugging tips/i],
    ['cicd', /ci\/?cd|deploy|github actions|asset bundle|devops|release|branch/i],
    ['bi', /power ?bi|report|dashboard|semantic model|visuali[sz]/i],
    ['quality', /quality|validat|reconcil|data checks|\btests?\b|testing/i],
    ['incremental', /incremental|watermark|\bmerge\b|\bcdc\b|upsert/i],
    ['orchestration', /orchestrat|schedul|pipeline|\bjobs?\b|workflow|trigger|lakeflow/i],
    ['governance', /governance|unity catalog|metastore|permission|access|security|masking|pdpl|external location/i],
    ['ai', /\b(ai|genie|llm|rag|gen ?ai|machine learning|ml|mlflow|prompt|agents?|train(ing)?|predict(ions?)?|classifier|regression|features?|inference|embeddings?)\b/i],
    ['bronze', /bronze|ingest|landing|raw|auto loader/i],
    ['silver', /silver|clean|transform|dedup|conform/i],
    ['gold', /gold|kpi|aggregat|\bmart\b|metrics/i],
    ['modeling', /model|schema|kimball|dimension|star/i],
    ['architecture', /architecture|design/i],
    ['business', /business|problem|requirement|use case|goals?\b/i],
    ['setup', /set ?up|install|prerequisite|environment|workspace|account|resources|connect/i],
    ['ship', /readme|publish|portfolio|linkedin|demo|share|wrap|next steps/i],
    ['data', /./]
  ];
  var LAYERS = ['setup', 'data', 'bronze', 'silver', 'gold', 'incremental', 'orchestration', 'bi', 'quality', 'cicd', 'ship',
                'business', 'modeling', 'architecture', 'governance', 'testing', 'ai', 'help'];
  function detectLayer(title) {
    for (var i = 0; i < LAYER_RULES.length; i++) if (LAYER_RULES[i][1].test(title)) return LAYER_RULES[i][0];
    return 'data';
  }
  function stepTitle(text) {
    var m = /^(?:step|stage|part|phase)\s*(\d+)\s*[:.\-–—)]*\s*(.*)$/i.exec(text) || /^(\d+)\s*[.):\-–—]\s*(.+)$/.exec(text);
    return m ? { num: m[1], title: (m[2] || text).trim() || text } : { num: null, title: text };
  }
  function firstSentence(text) {
    var t = text.replace(/\s+/g, ' ').trim();
    var m = /^(.{20,220}?[.!?])(\s|$)/.exec(t);
    return (m ? m[1] : t.slice(0, 200)).trim();
  }
  function collectCode(blocks, counts, order) {
    blocks.forEach(function (b) {
      var groups = b.type === 'p' ? [b.segs] : b.type === 'table' ? [].concat.apply([], b.rows) : [];
      groups.forEach(function (sg) {
        sg.forEach(function (s) {
          if (!s.c) return;
          var tok = s.t.trim();
          if (!/^[\w.\/~-]{4,40}$/.test(tok) || !/[_./]/.test(tok) || /^\d/.test(tok)) return;
          if (/^(spark|df|F|dbutils|pd|np|os|sys|self|batch_df)\./.test(tok)) return; // code calls, not things you create
          if (!(tok in counts)) { counts[tok] = 0; order.push(tok); }
          counts[tok]++;
        });
      });
      if (b.type === 'ul' || b.type === 'ol') b.items.forEach(function (it) { collectCode(it, counts, order); });
      if (b.type === 'quote') collectCode(b.blocks, counts, order);
    });
  }

  /**
   * Convert HTML into a guide object.
   * opts: { id, project_id, title, subtitle, platform, duration, repo_url, outcomes[], story{lead,text,quote,quote_by} }
   */
  function htmlToGuide(html, opts) {
    opts = opts || {};
    var doc = new DOMParser().parseFromString(String(html), 'text/html');
    doc.querySelectorAll('script, style, noscript, iframe, object, embed').forEach(function (n) { n.remove(); });
    var blocks = toBlocks(doc.body);

    // Pick the heading level that splits the document into steps: the first level used 2+ times.
    var count = {};
    blocks.forEach(function (b) { if (b.type === 'h') count[b.level] = (count[b.level] || 0) + 1; });
    var stepLevel = [2, 1, 3, 4].filter(function (l) { return (count[l] || 0) >= 2; })[0] || 2;
    var docTitle = null;
    blocks.forEach(function (b) { if (!docTitle && b.type === 'h' && b.level < stepLevel) docTitle = b.text; });

    var intro = [], steps = [], cur = null, seq = 0, usesNumbers = false;
    blocks.forEach(function (b) {
      if (b.type === 'h' && b.level < stepLevel) return; // document title
      if (b.type === 'h' && b.level === stepLevel) {
        var st = stepTitle(b.text);
        if (st.num != null) usesNumbers = true;
        var layer = detectLayer(st.title);
        if (/^(overview|introduction|intro|about|summary|background)\b/i.test(st.title) && !steps.length) { cur = null; return; }
        cur = { num: st.num, title: st.title, layer: layer, blocks: [] };
        steps.push(cur);
        return;
      }
      if (b.type === 'h') b = { type: 'h', level: 3, text: b.text };
      (cur ? cur.blocks : intro).push(b);
    });
    if (!steps.length) throw new Error('No steps found. Give each step its own heading (for example “Step 1: Set up the workspace” as Heading 2).');

    // numbering, ids, help step
    steps.forEach(function (st) {
      if (st.layer === 'help') { st.num = null; st.id = 'step-help'; return; }
      if (!usesNumbers || st.num == null) st.num = String(++seq); else seq = Number(st.num);
      st.id = 'step-' + st.num;
    });
    // unique ids even if a document repeats a number
    var seen = {};
    steps.forEach(function (st) { var base = st.id, k = 2; while (seen[st.id]) st.id = base + '-' + (k++); seen[st.id] = true; });

    // goals and "you'll create" chips
    steps.forEach(function (st) {
      var first = st.blocks.filter(function (b) { return b.type === 'p'; })[0];
      if (first) {
        var txt = plain(first.segs).trim();
        var m = /^purpose\s*[:\-–—]\s*(.+)$/i.exec(txt);
        if (m) { st.goal = m[1].trim(); st.blocks.splice(st.blocks.indexOf(first), 1); }
        else { st.goal = firstSentence(txt); if (st.goal === txt) st.blocks.splice(st.blocks.indexOf(first), 1); }
      }
      if (st.goal && st.goal.length > 220) st.goal = st.goal.slice(0, 217).replace(/\s+\S*$/, '') + '…';
      var counts = {}, order = [];
      collectCode(st.blocks, counts, order);
      st.creates = order.sort(function (a, b) { return counts[b] - counts[a] || order.indexOf(a) - order.indexOf(b); }).slice(0, 4);
      st.tip = '';
    });

    var real = steps.filter(function (s) { return s.num != null; });
    var guide = {
      id: opts.id, project_id: opts.project_id || opts.id,
      title: opts.title || docTitle || 'Step-by-step guide',
      subtitle: opts.subtitle || '',
      platform: opts.platform || '',
      duration: opts.duration || '',
      repo_url: opts.repo_url || '',
      outcomes: (opts.outcomes && opts.outcomes.length ? opts.outcomes : real.slice(0, 6).map(function (s) { return s.title; })),
      architecture: autoMap(real),
      intro_sections: [],
      intro: intro,
      steps: steps,
      source: { converted: new Date().toISOString().slice(0, 10) }
    };
    if (opts.story && opts.story.lead) {
      guide.intro_sections.push({ kind: 'story', title: 'The story', lead: opts.story.lead, text: opts.story.text || '',
        quote: opts.story.quote || '', quote_by: opts.story.quote_by || '' });
    }
    var layerSec = autoLayers(real);
    if (layerSec) guide.intro_sections.push(layerSec);
    return guide;
  }

  var LAYER_NAMES = { setup: 'Setup', data: 'Data', bronze: 'Bronze', silver: 'Silver', gold: 'Gold', incremental: 'Incremental loads',
    orchestration: 'Orchestration', bi: 'Reporting', quality: 'Data quality', cicd: 'CI/CD', ship: 'Ship it', business: 'Business',
    modeling: 'Modeling', architecture: 'Architecture', governance: 'Governance', testing: 'Testing', ai: 'AI', help: 'Help' };
  var LAYER_TONE = { bronze: 'bronze', silver: 'silver', gold: 'gold', bi: 'serve', ai: 'serve', orchestration: 'ops', cicd: 'ops', quality: 'ops', data: 'landing', setup: 'landing' };

  /** A clickable "map" of the guide: one box per stage, in order, each linking to its first step. */
  function autoMap(real) {
    var stages = [];
    real.forEach(function (st) {
      var last = stages[stages.length - 1];
      if (last && last.layer === st.layer) { last.steps.push(st); return; }
      stages.push({ layer: st.layer, steps: [st] });
    });
    if (stages.length < 2) return null;
    stages = stages.slice(0, 12);
    var cols = stages.length <= 4 ? stages.length : 3;
    var nodes = stages.map(function (sg, i) {
      var row = Math.floor(i / cols), pos = i % cols;
      var col = row % 2 === 0 ? pos : cols - 1 - pos; // snake, so arrows stay short
      var first = sg.steps[0], titles = sg.steps.map(function (s) { return s.title; }).join(' · ');
      var tone = { bronze: 'bronze', silver: 'silver', gold: 'gold' }[sg.layer];
      var n = { id: 'n' + i, col: col, row: row, label: LAYER_NAMES[sg.layer] || sg.layer, sub: titles.length > 34 ? titles.slice(0, 33) + '…' : titles, step: first.num };
      if (tone) n.tone = tone;
      if (i === stages.length - 1) n.main = true;
      return n;
    });
    var edges = nodes.slice(1).map(function (n, i) { return { from: nodes[i].id, to: n.id }; });
    return { type: 'flow', title: 'The path through this guide', cols: cols, colW: 240, nodes: nodes, edges: edges };
  }
  function autoLayers(real) {
    var seen = [], items = [];
    real.forEach(function (st) {
      if (st.layer === 'help') return;
      var i = seen.indexOf(st.layer);
      if (i === -1) { seen.push(st.layer); items.push({ tone: LAYER_TONE[st.layer] || 'serve', name: LAYER_NAMES[st.layer] || st.layer, text: st.title }); }
      else items[i].text += ' · ' + st.title;
    });
    return items.length >= 2 ? { kind: 'layers', title: 'What each stage covers', items: items.slice(0, 14) } : null;
  }

  function convertFile(file, opts) { return fileToHtml(file).then(function (html) { return htmlToGuide(html, opts); }); }

  window.GuideConverter = { convertFile: convertFile, htmlToGuide: htmlToGuide, LAYERS: LAYERS, LAYER_NAMES: LAYER_NAMES, detectLayer: detectLayer };
})();
