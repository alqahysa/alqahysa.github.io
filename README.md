# alqahysa.github.io

Personal portfolio of **Sarah A. AlQahtani**, Data & AI Engineering enthusiast, with a black-owl mascot. It's built with plain HTML, CSS and JavaScript, needs no build step, and is hosted on GitHub Pages.

Live site: https://alqahysa.github.io

```
index.html      page structure (owl hero scene, approach-based skills, projects section, about/contact)
styles.css      all styling (light/dark, responsive, RTL-ready)
app.js          theme, English/Arabic toggle, the owl's tips + eye tracking, renders projects.json
projects.json   ALL project content lives here
guide.html      the step-by-step guide page (one page for every guide: guide.html?p=<id>)
guide.css       guide-only styling (diagrams, steps, progress owl)
guide.js        renders a guide from guides/<id>.json
guides/         one JSON file per guide
admin.html      optional form UI that edits projects.json through the GitHub API
assets/         favicon.svg, og-image.png (social preview), cv.pdf
.nojekyll       tells GitHub Pages to serve files as-is
```

---

## Managing projects

Every project card on the site comes from `projects.json`. The file is a JSON **array** `[ ... ]` with one `{ ... }` object per project. You never need to touch the HTML or JavaScript.

Cards are sorted with **featured projects first**, then by `order` (lowest first), then by title. The layout adapts to any number of projects: with 0 projects it shows a friendly "coming soon" message, and if the file is missing or invalid it shows an error message with a link to GitHub. The page is never blank.

### Add a project

1. Open `projects.json` (on GitHub: open the file → pencil icon ✏️).
2. Put a comma after the closing `}` of the last project.
3. Paste the template below after that comma, before the final `]`, and fill it in.
4. Give it a **unique `id`** and an `order` number.
5. Validate the JSON (see below), then commit.

### Update a project

Edit the values inside that project's `{ ... }` block. To reorder projects, change their `order` numbers. To pin a project to the top, set `"featured": true`.

### Delete a project

Remove the project's whole `{ ... }` block **and the comma that separated it** from its neighbour. The last project in the array must **not** have a comma after its `}`.

### Copy-paste template

```json
{
  "id": "my-new-project",
  "title": "Project title",
  "category": "Data Engineering",
  "tagline": "One sentence that says what it does for the business.",
  "problem": "Two or three sentences describing the business problem.",
  "highlights": [
    "Approach point 1: what you did and why",
    "Approach point 2",
    "Approach point 3"
  ],
  "result": "One sentence with a number, e.g. Monthly reporting went from 3 days to 20 minutes.",
  "repo_url": "https://github.com/alqahysa/my-new-project",
  "guide_url": "https://claude.ai/artifact/your-guide-link",
  "demo_url": "",
  "featured": false,
  "order": 3
}
```

### Field reference

Every card has the same design and size: an illustrated owl cover, then **Problem → Approach → Result**, then the buttons. Cards describe the approach and the result, not the tools, so there are no tool tags, code snippets or screenshots on the cards (those belong in the repo and the guide).

| Field | Required | Notes |
|---|---|---|
| `id` | yes | Unique. Lowercase letters, numbers, hyphens (`retail-forecast-v2`). |
| `title` | yes | A project without a title is skipped. Keep tool names out of it. |
| `category` | yes | For example `Data Engineering`, `AI / Machine Learning`, `Analytics & BI`. It sets the cover drawing (pipeline, AI network or bars), and filter buttons appear automatically once there are 2+ categories. |
| `tagline` | recommended | One sentence. |
| `problem` | recommended | 2–3 sentences: the business problem. |
| `highlights` | recommended | The **Approach**: 3–4 short points on what you did and why. The card shows up to 4. |
| `result` | recommended | One sentence, ideally with a number. |
| `repo_url` | recommended | Must start with `https://`. Adds a **Code repo** button. |
| `guide_url` | recommended | Link to the step-by-step guide. Adds a gold **Step-by-step guide** button. |
| `guide_label` | optional | Custom text for the guide button (default “Step-by-step guide”). |
| `demo_url` | optional | Adds a "Live demo" button. |
| `featured` | optional | `true` / `false` (no quotes). Featured projects are shown first. |
| `order` | optional | A number (no quotes). Lower numbers show first. |

Optional or empty fields are simply left off the card. You can delete them from the object, or leave them as `""` or `[]`.

**Arabic (optional):** add `title_ar`, `category_ar`, `tagline_ar`, `problem_ar`, `highlights_ar`, `result_ar` and `guide_label_ar`. These are shown when a visitor switches to العربية. Any missing Arabic field falls back to the English one.

**Step-by-step guides:** each project links to its guide with `guide_url`. For a guide hosted on this site, use `guide.html?p=<project-id>` (see *Step-by-step guide pages* below). Any `https://` link also works; if it's a Claude artifact, share it publicly so visitors don't hit a sign-in page.

### ⚠️ Validate before you commit

One missing comma breaks the whole file. Before committing, paste the full contents of `projects.json` into **https://jsonlint.com** and click *Validate JSON*. The most common mistakes are:

- a trailing comma after the last item in a list or object: `"order": 3,}` ❌
- a missing comma between two projects: `} {` ❌ should be `}, {`
- "smart" quotes (`“ ”`) instead of straight quotes (`"`)
- unescaped `"` inside text. Write `\"` instead.

If the site ever shows "The projects could not be loaded right now", the file is invalid. Fix it with jsonlint and commit again.

### Using the admin page (optional)

`admin.html` (https://alqahysa.github.io/admin.html, hidden from search engines) lets you add, edit and delete projects with a form, then commits `projects.json` for you. It also validates every field before saving.

1. Create a **fine-grained** personal access token: GitHub → *Settings* → *Developer settings* → *Personal access tokens* → *Fine-grained tokens* → *Generate new token*.
   - **Repository access:** *Only select repositories* → `alqahysa.github.io`
   - **Permissions → Repository permissions → Contents:** *Read and write* (leave everything else as is)
   - **Expiration:** short, for example 7–30 days
2. Open `admin.html`, paste the token, and click **Load projects.json from GitHub**.
3. Add, edit or delete projects, then click **Save to GitHub**. The site updates in about 1–2 minutes.

The token is kept **only in `sessionStorage`** for that browser tab. It is never stored in the code or in the repository, and it disappears when you close the tab or press *Forget token*. Never paste the token into any file. If you'd rather not use a token, click **Load the published file**, make your edits, then **Download JSON** and upload the file to the repo yourself.

If you don't want the admin page at all, just delete `admin.html`. Nothing else depends on it.

---

## Step-by-step guide pages

Every guide uses the same page, `guide.html`, which reads its content from `guides/<id>.json`. For example, `guide.html?p=fabric-saudi-retail-analytics` opens `guides/fabric-saudi-retail-analytics.json`. The page gives every guide the owl theme automatically:

- **Hero with a progress owl.** Visitors tick **Mark step as done**. The ring fills, and at 100% the owl puts on a graduation cap. Progress is saved in the visitor's own browser.
- **Interactive architecture map.** Boxes with a gold *Step N* tag jump to that step when clicked.
- **Step list.** It highlights where you are, shows ✓ for finished steps, and has *Expand all / Collapse all*.
- **Step cards.** Each has an owl tip, copy buttons on every code block, long code folded behind *Show all*, scrollable tables, and *Previous / Next* buttons.
- **Diagrams and a run player.** These come from the guide JSON.

### Add a guide for a new project

1. Create `guides/<project-id>.json`, using the template below. The file name must match the `p=` value: lowercase letters, numbers and hyphens.
2. In `projects.json`, set that project's `"guide_url": "guide.html?p=<project-id>"`.
3. Validate the JSON on jsonlint.com, commit and push.

```json
{
  "id": "my-project",
  "project_id": "my-project",
  "title": "Guide title",
  "subtitle": "One sentence: what the reader will build.",
  "platform": "Main platform (optional)",
  "duration": "1–2 weeks (optional)",
  "repo_url": "https://github.com/alqahysa/my-project",
  "outcomes": ["What they'll have at the end", "Another outcome"],
  "architecture": null,
  "intro": [
    { "type": "p", "segs": [{ "t": "Intro paragraph. " }, { "t": "Bold part", "b": 1 }] }
  ],
  "steps": [
    {
      "id": "step-1", "num": "1", "title": "First step", "layer": "setup",
      "tip": "One practical owl tip.",
      "blocks": [
        { "type": "p", "segs": [{ "t": "Explain the step. Use " }, { "t": "inline code", "c": 1 }, { "t": " like this." }] },
        { "type": "ol", "items": [[{ "type": "p", "segs": [{ "t": "Do this first" }] }], [{ "type": "p", "segs": [{ "t": "Then this" }] }]] },
        { "type": "code", "lang": "python", "text": "print('hello')" },
        { "type": "h", "level": 3, "text": "A sub-heading" },
        { "type": "table", "head": [[{ "t": "Column" }], [{ "t": "Meaning" }]], "rows": [[[{ "t": "a" }], [{ "t": "b" }]]] }
      ]
    }
  ]
}
```

- **Block types:** `p` (text segments; `b` = bold, `i` = italic, `c` = code), `h`, `ul` / `ol`, `code`, `table`, `quote`, and `diagram`.
- **Layers:** a step's `layer` sets its coloured label. Use one of `setup`, `data`, `bronze`, `silver`, `gold`, `incremental`, `orchestration`, `bi`, `quality`, `cicd`, `ship`, `business`, `modeling`, `architecture`, `governance`, `testing`, `ai` or `help`.
- **Optional Arabic:** `title_ar`, `subtitle_ar`, `duration_ar`, `outcomes_ar` and each step's `tip_ar`. The step details stay in English, the same language as the tools.

**Diagrams** are small JSON drawings: boxes on a grid joined by arrows. Copy one from an existing guide file and edit it. Each box has `col` and `row`, and optionally `sub`, `step` (adds a clickable *Step N* tag), `tone` (`bronze`/`silver`/`gold`), `main`, `alert`, `span` or `shape: "diamond"`. Edges join two boxes, with an optional `label`. Set `kind` to `ok`, `fail` or `line` (a line without an arrowhead). Set `route` to `around` to send the arrow round the outside. `groups` draws a labelled frame around some of the boxes. A `datastory` diagram becomes the **Play the run** player: a list of `stages`, each with `title`, `text`, `head`, `rows` and `hl` (the rows to highlight).

---

## Publishing on GitHub Pages

1. **Create the repository.** On GitHub click **New repository** and name it exactly **`alqahysa.github.io`**. Set it to **Public** and don't add a README (this folder already has one).
2. **Push the files.** From this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/alqahysa/alqahysa.github.io.git
   git push -u origin main
   ```
   *(No Git? On the empty repo page, click **uploading an existing file** and drag in every file plus the `assets` folder. The hidden `.nojekyll` file is optional.)*
3. **Enable Pages.** In the repo go to **Settings → Pages**. Under *Build and deployment*, set **Source: Deploy from a branch** and **Branch: `main` / `(root)`**, then click **Save**.
4. **Wait 1–2 minutes**, then open **https://alqahysa.github.io**. You can follow the deployment under the repo's **Actions** tab.
5. **Add your CV:** upload it as `assets/cv.pdf`. The CV button stays hidden until that file exists.

### Preview locally

`fetch()` doesn't work when you open `index.html` straight from disk (`file://`), so start a tiny local server first:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

### Social preview

`assets/og-image.png` (1200×630) is the image shown when the link is shared on LinkedIn, WhatsApp or X. Replace it with your own image of the same size if you like. LinkedIn caches previews; use the LinkedIn Post Inspector to refresh it.
