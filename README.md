# Praise Taiwo — Portfolio

Personal portfolio site for **Praise Taiwo Oluwatobiloba**, a Flutter mobile developer based
in Lagos, Nigeria. It presents three production Flutter applications as long-form case
studies — what each product does, how it is architected, and how state moves through it —
alongside a career timeline and a skills breakdown.

Built as a single-page React application with client-side routing, a light/dark theme, and
scroll-driven motion. No UI framework, no component library, no CSS-in-JS: one hand-written
stylesheet driven entirely by CSS custom properties.

**Live site:** _add your Vercel URL here_

---

## Contents

- [Why this exists](#why-this-exists)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Editing content](#editing-content)
- [Adding a project](#adding-a-project)
- [Theming](#theming)
- [Accessibility](#accessibility)
- [Deployment](#deployment)
- [Assets and privacy](#assets-and-privacy)
- [Roadmap](#roadmap)

---

## Why this exists

A list of app names and a screenshot grid tells a hiring manager almost nothing. The point
of this site is the opposite: each project gets a dedicated page that explains the product,
the architecture behind it, the state-management decision and why it was made, a table
justifying every dependency, and an honest account of scope — including which parts of a
commercial codebase were inherited rather than authored.

The site is also its own work sample. It is deliberately built from primitives so the code
is legible: a data file, six components, one stylesheet.

---

## Features

**Content**

- Three long-form case studies — WinBundle, Learners Forge, CashToken Rewards
- Per-project feature lists, architecture notes, state-management rationale and stack tables
- Sticky technical-metadata sidebar on each case study
- Career timeline mirroring the LinkedIn profile, including role types
- Skills grouped by domain rather than dumped as one tag cloud
- Live Google Play links for the two published apps

**Interface**

- Light and dark themes, dark by default, persisted to `localStorage`
- Theme applied before first paint via an inline script — no flash of the wrong theme
- Scroll-progress indicator and a nav that tracks the section in view
- Pointer-parallax phone cluster in the hero
- Scroll-triggered reveals, word-by-word statement fade, and 3D tilt on project cards
- CSS-drawn device frames with bezel, dynamic-island cutout and screen glare
- Full `prefers-reduced-motion` support — every animation collapses to a static state
- Responsive from 360px upward

---

## Tech stack

| Technology | Role |
| --- | --- |
| React 18 | UI, with hooks only — no class components |
| React Router 6 | Client-side routing for `/` and `/work/:slug` |
| Vite 5 | Dev server and production bundling |
| Plain CSS | One stylesheet, custom properties for theming |
| IntersectionObserver | Scroll reveals, active-nav tracking, count-ups |
| Google Fonts | Bricolage Grotesque (display), Inter (body), JetBrains Mono (labels) |

No Tailwind, no styled-components, no animation library. Total production bundle is roughly
66 kB of JavaScript and 5 kB of CSS, gzipped.

---

## Project structure

```
.
├── index.html                  Document shell + pre-paint theme script
├── vite.config.js
├── vercel.json                 SPA rewrite so /work/* survives a hard refresh
├── public/
│   ├── shots/                  App screenshots (device-frame content)
│   └── praise-taiwo-cv.pdf     ← add this; the Download CV button points here
└── src/
    ├── main.jsx                Entry — mounts BrowserRouter
    ├── App.jsx                 Route table
    ├── index.css               Entire theme: tokens, layout, components, motion
    ├── data/
    │   ├── projects.js         All case-study content
    │   └── career.js           Experience timeline + education
    ├── components/
    │   └── bits.jsx            ThemeToggle, Nav, Reveal, Phone, PhoneFan,
    │                           WordFade, CountUp, Footer, ScrollBar, ScrollManager
    └── pages/
        ├── Home.jsx            Hero, work index, approach, experience, skills, contact
        └── CaseStudy.jsx       Renders any project from data — one component, three pages
```

---

## Getting started

Requires Node 18 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # production bundle into dist/
npm run preview    # serve dist/ locally to check the real build
```

---

## Editing content

**No JSX changes are needed to update any text on this site.** Content lives in two data
files.

`src/data/projects.js` — one object per project:

| Key | Purpose |
| --- | --- |
| `slug` | URL segment, e.g. `winbundle` → `/work/winbundle` |
| `num`, `category`, `years` | Eyebrow metadata above the title |
| `name`, `role` | Project title and your role line |
| `tagline` | Large introductory line on the case-study page |
| `blurb` | Short paragraph shown on the homepage work index |
| `tags` | Chips on the homepage card |
| `store` | `{ label, url }` renders a live store link; `null` falls back to `ghost` |
| `ghost`, `ghost2` | Dashed non-link badges, e.g. `"v1.0.0 · Pre-release"` |
| `meta` | `[label, value]` pairs for the sticky sidebar |
| `cards` | Three screenshot names for the homepage card |
| `shots` | `[name, caption]` pairs for the case-study gallery |
| `sections` | The body of the case study — see below |

Each entry in `sections` is an object with a `title` plus one or more of:

```js
{ title: 'Architecture', paras: ['…', '…'] }              // prose blocks
{ title: 'What it is', lead: 'Shipped features:',          // labelled bullet list
  bullets: ['…', '…'] }
{ title: 'The hard problems',                              // accented sub-blocks
  probs: [['Heading', 'Body…']] }
{ title: 'Stack', stack: [['dio', 'Why it is here']] }     // two-column table
```

`paras`, `bullets` and `probs` bodies accept inline HTML — `<strong>`, `<em>`, `<code>` —
so you can mark up package names and emphasis without leaving the data file.

`src/data/career.js` holds the experience timeline and education row.

---

## Adding a project

1. Drop screenshots into `public/shots/` (portrait, ideally 1080×2400).
2. Append an object to the `projects` array in `src/data/projects.js`.

That is the whole process. The route, the homepage card, the case-study page and the
"next case study" link at the bottom of each page are all derived from that array.

---

## Theming

Every colour is a CSS custom property declared twice — once on `:root` for dark, once on
`[data-theme="light"]`. Changing a theme means editing those two blocks; nothing else
references a literal colour except the phone bezel, which stays dark in both themes by
design.

```css
:root                { --bg:#08080a; --text:#f5f3f0; --accent:#ff6a1f; … }
[data-theme="light"] { --bg:#fbfaf8; --text:#17140f; --accent:#c2410c; … }
```

The accent differs between themes on purpose: `#ff6a1f` reads at only 2.9:1 against a
near-white background, which fails contrast requirements, so light mode uses a deeper
`#c2410c`.

Dark is the default. The inline script in `index.html` reads `localStorage` and sets
`data-theme` on `<html>` before React mounts, so the correct theme paints on the first
frame. `ThemeToggle` in `src/components/bits.jsx` flips it and writes the choice back.

---

## Accessibility

- All text/background pairs meet WCAG AA (4.5:1) in **both** themes — the lowest measured
  pair is 4.96:1
- `prefers-reduced-motion: reduce` disables the hero animation, parallax, scroll reveals,
  word fades and count-ups, leaving all content visible and static
- The theme toggle is a real `<button>` with an `aria-label` that names the destination
  state, and a visible `:focus-visible` ring
- Every screenshot has a descriptive `alt` attribute
- `color-scheme` is declared so native form controls and scrollbars match the active theme

---

## Deployment

Deployed to Vercel as a static build.

```bash
npx vercel          # preview deployment
npx vercel --prod   # production
```

Vite is auto-detected; no build configuration is required. `vercel.json` rewrites every
path to `index.html`, which is what allows a direct visit or hard refresh on
`/work/winbundle` to resolve instead of 404ing.

---

## Assets and privacy

Screenshots are captured from the real applications. Several available captures were
deliberately **excluded** because they show a live phone number and email address, and one
was a near-empty screen with no informational value. Do not add screenshots of any account
or profile screen without checking what is visible in them first.

`public/praise-taiwo-cv.pdf` is referenced by the Download CV button and is not committed —
add it before deploying, or the button will 404.

---

## Roadmap

- [ ] Add `public/praise-taiwo-cv.pdf`
- [ ] 15–30 second screen recordings per app, looping in the device frames — short flow
      recordings communicate mobile work better than static screenshots
- [ ] Open-source the Learners Forge repository and link it from its case study
- [ ] `og:image` per case study for better link previews

---

© Praise Taiwo Oluwatobiloba · [praisetaiwo24@gmail.com](mailto:praisetaiwo24@gmail.com) ·
[GitHub](https://github.com/officialpraise) ·
[LinkedIn](https://linkedin.com/in/praisetaiwo24)
