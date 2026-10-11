# 💌 Happy Anniversary — Justin ❤ Marjorie

A romantic swipeable-card website built with **only HTML, CSS + vanilla JS**. Landing page = one sealed envelope → tap it → hearts burst, music plays, and a **swipeable card deck** pops up (no page scrolling).

## Folder structure
```
anniversary-love-letter/
├── index.html   # structure + content
├── style.css    # romance styling, 3D envelope, responsive
├── script.js    # CONFIG, typing, counter, petals, kisses, music
└── README.md    # this file (deployment guide)
```
All paths are **relative** (`./style.css`, `./script.js`) so it works at `username.github.io/repo-name/` with zero changes.

## Customize in 30 seconds
Open `script.js` → edit the `CONFIG` object at the top:

```js
const CONFIG = {
  nameA: "Justin",
  nameB: "Marjorie",
  anniversaryDate: "2026-10-16T00:00:00",
  anniversaryLabel: "October 16, 2026",
  signature: "— Justin ❤",
  letterText: `My dearest Marjorie, ...`,
  secretMessage: "Marjorie, you are my home ...",
  memories: [ {emoji:"🌙", title:"...", text:"..."} ],
  loveNotes: [ ["Title","subtitle"], ... ]
};
```

Save, refresh — done. No build step.

## Test locally
Just double-click `index.html`, or serve it:
```
# Python
python -m http.server 8000
# then open http://localhost:8000
```
If using XAMPP: copy folder to `c:/xampp/htdocs/Anniversary/` → open `http://localhost/Anniversary/`.

## Deploy to GitHub Pages (step-by-step)
1. Create a GitHub account + new repository, e.g. `anniversary-love-letter`. Make it **Public**.
2. Upload the 4 files to the repo root (Add file → Upload files, or git push).
3. Go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Branch: `main` (or `master`), folder: `/ (root)`. Click **Save**.
6. Wait 1–3 minutes. Your site is live at:
   `https://YOUR-USERNAME.github.io/anniversary-love-letter/`
7. Share that link with your love 💖.

To update: edit `script.js` CONFIG, commit + push — Pages redeploys automatically.

## Features checklist (all working, test before sending!)
- [ ] Click / tap / Enter on **heart wax seal** → envelope 3D flap opens
- [ ] Handwritten letter **typing animation** + Replay button
- [ ] **Anniversary counter** (days/hours/mins/secs, live)
- [ ] Floating hearts, twinkling sparkles, falling rose petals (canvas)
- [ ] **Pop Love Note** playful toasts, **Secret Message** blur reveal
- [ ] **Send a Kiss** 💋 fullscreen animation (also press `K`)
- [ ] **Music toggle** — optional WebAudio lullaby, OFF by default, never autoplay
- [ ] Print / Save PDF + Copy Letter buttons
- [ ] Responsive mobile layout, keyboard focus, `prefers-reduced-motion` support

## Accessibility + mobile notes
- Semantic landmarks, skip-link, aria-expanded/status/live regions.
- All buttons keyboard-focusable with visible focus rings.
- Effects disabled when user prefers reduced motion.
- Touch-friendly 44px+ targets, fluid `clamp()` type.

Made with ❤️ — fork it, personalize it, and go make someone cry happy tears.
