---
name: Pass Printer Design System
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1b1b1b'
  on-surface-variant: '#4c4546'
  inverse-surface: '#303030'
  inverse-on-surface: '#f1f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfdf'
  on-secondary-container: '#626262'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1b1b'
  on-tertiary-container: '#848484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e4e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1b1b1b'
  on-tertiary-fixed-variant: '#474747'
  background: '#f9f9f9'
  on-background: '#1b1b1b'
  surface-variant: '#e2e2e2'
  fg-primary: '#000000'
  fg-secondary: '#666666'
  fg-tertiary: '#AAAAAA'
  fg-disabled: '#CCCCCC'
  fg-inverse: '#FFFFFF'
  bg-primary: '#FFFFFF'
  bg-secondary: '#F8F8F8'
  bg-tertiary: '#F0F0F0'
  bg-inverse: '#000000'
  bg-inverse-subtle: '#111111'
  border-strong: '#000000'
  border-default: '#E0E0E0'
  border-subtle: '#F0F0F0'
  interactive-bg: '#000000'
  interactive-bg-hover: '#222222'
  interactive-bg-press: '#444444'
typography:
  wordmark:
    fontFamily: Sacramento
    fontSize: 2.441rem
    fontWeight: '400'
    lineHeight: '1.15'
  h1:
    fontFamily: manrope
    fontSize: 3.815rem
    fontWeight: '600'
    lineHeight: '1.15'
    letterSpacing: -0.03em
  h2:
    fontFamily: manrope
    fontSize: 3.052rem
    fontWeight: '600'
    lineHeight: '1.15'
    letterSpacing: -0.015em
  h3:
    fontFamily: manrope
    fontSize: 2.441rem
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: -0.015em
  body-base:
    fontFamily: manrope
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.5'
  lead:
    fontFamily: manrope
    fontSize: 1.25rem
    fontWeight: '300'
    lineHeight: '1.7'
  label-caps:
    fontFamily: manrope
    fontSize: 0.8rem
    fontWeight: '500'
    lineHeight: '1.5'
    letterSpacing: 0.05em
  code:
    fontFamily: DM Mono
    fontSize: 0.9rem
    fontWeight: '400'
    lineHeight: '1.7'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  space-1: 4px
  space-2: 8px
  space-3: 12px
  space-4: 16px
  space-5: 24px
  space-6: 32px
  space-7: 48px
  space-8: 64px
  container-margin: 32px
  gutter: 24px
---

/* ============================================================
   JNO Limited — Design System Tokens
   colors_and_type.css
   ============================================================ */

/* ── Local brand fonts (no CDN dependency) ── */
@font-face {
  font-family: 'Sacramento';
  src: url('fonts/Sacramento-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'DM Sans';
  src: url('fonts/DMSans-VariableFont_opsz_wght.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'DM Sans';
  src: url('fonts/DMSans-Italic-VariableFont_opsz_wght.woff2') format('woff2');
  font-weight: 100 900;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: 'DM Mono';
  src: url('fonts/DMMono-Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'DM Mono';
  src: url('fonts/DMMono-LightItalic.woff2') format('woff2');
  font-weight: 300;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: 'DM Mono';
  src: url('fonts/DMMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'DM Mono';
  src: url('fonts/DMMono-Italic.woff2') format('woff2');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: 'DM Mono';
  src: url('fonts/DMMono-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'DM Mono';
  src: url('fonts/DMMono-MediumItalic.woff2') format('woff2');
  font-weight: 500;
  font-style: italic;
  font-display: swap;
}

/* ============================================================
   COLOR TOKENS — BASE
   ============================================================ */
:root {
  /* Pure */
  --color-black:       #000000;
  --color-white:       #FFFFFF;

  /* Neutrals */
  --color-grey-950:    #0A0A0A;
  --color-grey-900:    #111111;
  --color-grey-800:    #222222;
  --color-grey-700:    #444444;
  --color-grey-600:    #666666;
  --color-grey-500:    #888888;
  --color-grey-400:    #AAAAAA;
  --color-grey-300:    #CCCCCC;
  --color-grey-200:    #E0E0E0;
  --color-grey-100:    #F0F0F0;
  --color-grey-50:     #F8F8F8;
}

/* ============================================================
   COLOR TOKENS — SEMANTIC
   ============================================================ */
:root {
  /* Foreground */
  --fg-primary:        var(--color-black);
  --fg-secondary:      var(--color-grey-600);
  --fg-tertiary:       var(--color-grey-400);
  --fg-disabled:       var(--color-grey-300);
  --fg-inverse:        var(--color-white);

  /* Background */
  --bg-primary:        var(--color-white);
  --bg-secondary:      var(--color-grey-50);
  --bg-tertiary:       var(--color-grey-100);
  --bg-inverse:        var(--color-black);
  --bg-inverse-subtle: var(--color-grey-900);

  /* Border */
  --border-strong:     var(--color-black);
  --border-default:    var(--color-grey-200);
  --border-subtle:     var(--color-grey-100);

  /* Interactive */
  --interactive-bg:             var(--color-black);
  --interactive-bg-hover:       var(--color-grey-800);
  --interactive-bg-press:       var(--color-grey-700);
  --interactive-fg:             var(--color-white);
  --interactive-ghost-hover-bg: var(--color-grey-50);

  /* States */
  --state-focus-ring:  0 0 0 2px var(--color-black);
  --state-disabled-opacity: 0.4;
}

/* ============================================================
   TYPOGRAPHY TOKENS — FONTS
   ============================================================ */
:root {
  --font-display:  'Sacramento', cursive;            /* Wordmark / brand accent */
  --font-sans:     'DM Sans', sans-serif;            /* UI, headings, body */
  --font-mono:     'DM Mono', monospace;             /* Code, technical content */
}

/* ============================================================
   TYPOGRAPHY TOKENS — SCALE (1.25 Major Third)
   ============================================================ */
:root {
  --text-xs:    0.64rem;   /* 10.24px */
  --text-sm:    0.8rem;    /* 12.8px  */
  --text-base:  1rem;      /* 16px    */
  --text-md:    1.25rem;   /* 20px    */
  --text-lg:    1.563rem;  /* 25px    */
  --text-xl:    1.953rem;  /* 31.25px */
  --text-2xl:   2.441rem;  /* 39px    */
  --text-3xl:   3.052rem;  /* 48.8px  */
  --text-4xl:   3.815rem;  /* 61px    */
  --text-5xl:   4.768rem;  /* 76.3px  */
}

/* ============================================================
   TYPOGRAPHY TOKENS — WEIGHT & LINE HEIGHT
   ============================================================ */
:root {
  --weight-light:   300;
  --weight-regular: 400;
  --weight-medium:  500;
  --weight-semibold:600;
  --weight-bold:    700;

  --leading-tight:  1.15;
  --leading-snug:   1.3;
  --leading-normal: 1.5;
  --leading-relaxed:1.7;

  --tracking-tight:  -0.03em;
  --tracking-snug:   -0.015em;
  --tracking-normal:  0em;
  --tracking-wide:    0.05em;
  --tracking-wider:   0.1em;
}

/* ============================================================
   SPACING TOKENS (8px base)
   ============================================================ */
:root {
  --space-1:   4px;
  --space-2:   8px;
  --space-3:   12px;
  --space-4:   16px;
  --space-5:   24px;
  --space-6:   32px;
  --space-7:   48px;
  --space-8:   64px;
  --space-9:   96px;
  --space-10:  128px;
}

/* ============================================================
   BORDER & RADIUS TOKENS
   ============================================================ */
:root {
  --radius-none:  0px;
  --radius-sm:    2px;
  --radius-pill:  999px;

  --border-width-thin:   1px;
  --border-width-thick:  2px;
}

/* ============================================================
   SHADOW / ELEVATION TOKENS
   ============================================================ */
:root {
  --shadow-none:    none;
  --shadow-xs:      0 1px 2px rgba(0,0,0,0.06);
  --shadow-sm:      0 1px 4px rgba(0,0,0,0.08);
  --shadow-md:      0 2px 8px rgba(0,0,0,0.10);
  --shadow-lg:      0 4px 24px rgba(0,0,0,0.12);
  --shadow-xl:      0 8px 40px rgba(0,0,0,0.16);
}

/* ============================================================
   SEMANTIC TYPE STYLES — Apply to HTML elements
   ============================================================ */

html, body {
  font-family: var(--font-sans);
  font-size: 16px;
  color: var(--fg-primary);
  background: var(--bg-primary);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

h1 {
  font-family: var(--font-sans);
  font-size: var(--text-4xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--fg-primary);
}

h2 {
  font-family: var(--font-sans);
  font-size: var(--text-3xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-snug);
  color: var(--fg-primary);
}

h3 {
  font-family: var(--font-sans);
  font-size: var(--text-2xl);
  font-weight: var(--weight-medium);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-snug);
  color: var(--fg-primary);
}

h4 {
  font-family: var(--font-sans);
  font-size: var(--text-xl);
  font-weight: var(--weight-medium);
  line-height: var(--leading-snug);
  color: var(--fg-primary);
}

h5 {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  font-weight: var(--weight-medium);
  line-height: var(--leading-normal);
  color: var(--fg-primary);
}

h6 {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-normal);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--fg-secondary);
}

p {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--weight-regular);
  line-height: var(--leading-normal);
  color: var(--fg-primary);
}

.lead {
  font-family: var(--font-sans);
  font-size: var(--text-md);
  font-weight: var(--weight-light);
  line-height: var(--leading-relaxed);
  color: var(--fg-secondary);
}

.label {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  line-height: var(--leading-normal);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--fg-secondary);
}

.caption {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--weight-regular);
  line-height: var(--leading-normal);
  color: var(--fg-tertiary);
}

code, pre, .mono {
  font-family: var(--font-mono);
  font-size: 0.9em;
  line-height: var(--leading-relaxed);
}

.wordmark {
  font-family: var(--font-display);
  letter-spacing: var(--tracking-normal);
}

/* ============================================================
   UTILITY: INVERTED SURFACE
   ============================================================ */
.surface-inverse {
  background: var(--bg-inverse);
  color: var(--fg-inverse);
}
.surface-inverse h1,
.surface-inverse h2,
.surface-inverse h3,
.surface-inverse h4,
.surface-inverse h5,
.surface-inverse p {
  color: var(--fg-inverse);
}
.surface-inverse .lead {
  color: rgba(255,255,255,0.65);
}
.surface-inverse .label {
  color: rgba(255,255,255,0.5);
}
