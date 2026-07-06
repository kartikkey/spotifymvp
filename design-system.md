# Spotify Product Strategy Deck — Design System

Reverse-engineered from `reference/web` (7 screens) and `reference/mobile` (13 screens).
This is not a UI kit for rebuilding Spotify. It is the visual grammar we use to build an
internal Product Strategy presentation that reads like it came out of Spotify's own
strategy org — restrained, confident, numbers-first, zero decoration.

---

## 0. Design Philosophy (what Spotify actually does, and why we're borrowing it)

Five things are true across every single reference screenshot, web and mobile:

1. **The palette is almost entirely black, white, and gray.** Color is a scarce resource,
   spent only on the brand green (play, follow, active states) and on content artwork.
   Nothing is colored "for interest." This is the single most important trait to copy for
   an executive deck — it reads as *confident*, not decorated.
2. **Hierarchy is built with scale and weight, not color or boxes.** "Sabrina Carpenter"
   at ~120px bold vs. "77,038,418 monthly listeners" at ~16px regular gray, sitting inches
   apart, is the whole hierarchy. There's no border around either.
3. **Borders and dividers barely exist.** Separation comes from spacing and subtle
   background value shifts (`#121212` → `#181818` → `#282828`), never from drawn lines.
   The one exception is the now-playing progress bar — a single hairline used to show
   state/progress, not to divide content.
4. **The same 3–4 shapes repeat everywhere.** A circular artist image, a square card with
   title+subtitle below it, a flat-color editorial tile with a tilted image bleeding off
   the corner, and a metadata row. Every screen is a recombination of these, never a new
   layout. Consistency, not novelty, is the design strategy.
5. **Numbers are treated quietly.** Play counts, listener counts, save counts are always
   plain-weight gray text placed directly under or beside the thing they describe. Data
   supports identity; it never shouts louder than the headline.

**Working rule for this deck: clarity over decoration, repetition over novelty, scale over
color.** If a slide needs a new component to make its point, that's a signal to rethink the
slide — not to invent a new card shape.

---

## 1. Color System

Neutral base (all of Spotify's actual UI, ~95% of every screen):

| Token | Hex | Use |
|---|---|---|
| `bg/canvas` | `#0A0A0A` | Slide background |
| `bg/surface-1` | `#121212` | Base content layer / panels |
| `bg/surface-2` | `#181818` | Cards at rest |
| `bg/surface-3` | `#282828` | Hover / elevated / active card |
| `border/hairline` | `#2A2A2A` | Used only for progress bars & rare 1px separators |
| `text/primary` | `#FFFFFF` | Titles, primary content |
| `text/secondary` | `#B3B3B3` | Metadata, captions, supporting copy |
| `text/tertiary` | `#6A6A6A` | Disabled, timestamps, least important |

Brand accent (the *only* color allowed to carry meaning — action or positive state):

| Token | Hex | Use |
|---|---|---|
| `brand/green` | `#1DB954` | Primary CTA, "playing now," active/selected, positive metric |
| `brand/green-bright` | `#1ED760` | Hover state of the above |

Categorical accents — directly lifted from Spotify's "Browse all" flat-color tile grid
(Music = magenta, Podcasts = teal, Live Events = purple, Country = orange, Hip-Hop = steel
blue, Video = crimson). In the deck these are used **only** as small surfaces: tag chips,
chart series, category dots. Never as full-slide or full-card fills — that would tip the
deck from "strategy doc" into "marketing concept."

| Token | Hex | Suggested use |
|---|---|---|
| `accent/blue` | `#509BF5` | Discovery / product theme |
| `accent/purple` | `#A972FF` | Platform / ecosystem theme |
| `accent/orange` | `#FF8C42` | Growth theme |
| `accent/pink` | `#F037A5` | Engagement theme |
| `accent/gold` | `#F5C518` | Monetization theme |

Semantic (functional addition — Spotify's UI doesn't need risk/warning colors, a PM deck
does; pulled from hues already present in the reference set so it stays in-family):

| Token | Hex | Use |
|---|---|---|
| `status/positive` | `#1DB954` | On track, growth, win |
| `status/warning` | `#F5A623` | Risk, needs attention |
| `status/critical` | `#E91429` | Blocker, regression, off track |

**Rule:** any single slide should use at most one categorical accent + the neutrals. Green
is reserved for "this is the point" — the one thing per slide we want leadership to act on
or notice, mirroring how Spotify reserves green for exactly one action per screen (play,
follow, the one active nav item).

---

## 2. Typography Scale

Spotify's typeface (Circular) is proprietary. **Inter** is the working substitute — same
tall x-height, rounded terminals, geometric-humanist proportions, and it's free. If a
licensed equivalent becomes available later, swap the family only; the scale doesn't change.

Only three weights are used, matching Spotify's own restraint: **Bold (700)**, **Semibold
(600)**, **Regular (400)**. No italics. No light weights (too fragile for a leadership deck).

| Token | Size | Weight | Line-height | Use |
|---|---|---|---|---|
| `display` | 96px | Bold | 1.0 | Section-divider slide titles only — max once per slide |
| `h1` | 40px | Bold | 1.15 | Slide title |
| `h2` | 24px | Bold | 1.2 | In-slide section header ("Key Insights," "Opportunities") |
| `h3` | 18px | Semibold | 1.3 | Card titles |
| `body` | 16px | Regular | 1.5 | Paragraph / description copy |
| `body-sm` | 13px | Regular | 1.4 | Captions, metadata, source lines — always `text/secondary` |
| `overline` | 11px | Semibold | 1.0 | Uppercase, +0.08em tracking. Eyebrow labels: "OPPORTUNITY," "Q3 FY26" |
| `metric` | 64px | Bold | 1.0 | Big stat callouts, tabular numerals |

This maps directly to what's on screen: the 96–120px artist/playlist name is `display`; the
"Popular artists" section label is `h2`; the gray "Artist" / "77,038,418 monthly listeners"
lines are `body-sm`; the numbered tracklist metadata columns are also `body-sm`.

---

## 3. Spacing System (8pt grid)

Spotify's rhythm is tight *within* a component and generous *between* components. Copy that
exactly — it's what makes dense information still feel calm.

| Token | Value | Use |
|---|---|---|
| `space-1` | 4px | Icon-to-label micro gaps |
| `space-2` | 8px | Card title-to-subtitle gap |
| `space-3` | 12px | Internal card padding (small) |
| `space-4` | 16px | Internal card padding (standard), grid gutter (mobile) |
| `space-5` | 24px | Grid gutter (desktop), card-to-card gap |
| `space-6` | 32px | Slide inner margin (small canvases) |
| `space-7` | 48px | Section-to-section gap, above a new `h2` block |
| `space-8` | 64px | Slide top/bottom safe margin |
| `space-9` | 96px | Slide left/right margin |

---

## 4. Grid & Layout Rules

Canvas: **1920×1080** (16:9), matching standard presentation output.

- Margins: 96px left/right (`space-9`), 64px top/bottom (`space-8`).
- Content grid: 12 columns, 24px gutter (`space-5`), inside the margin frame.
- Title zone: top ~160px reserved for eyebrow (`overline`) + `h1`. Every slide starts here,
  left-aligned — mirroring the fact that every reference screen anchors its primary heading
  to the same left edge (nav rail, "Popular artists," "Live Events," artist name all share
  one vertical reading line).
- Footer zone: bottom ~40px reserved for slide number / section tag, `text/tertiary`,
  `body-sm` — quiet, never competing with content, same treatment as Spotify's persistent
  but visually silent bottom player bar.
- Card shelves: equal-width cards in a row with `space-5` gutter, never justified/stretched
  to fill odd remainders — same as Spotify's horizontal shelves, which keep card width
  fixed and simply reveal more or fewer per row depending on viewport.
- **One dominant element per slide.** Exactly one `display`/`h1`/`metric` element anchors
  the slide; everything else is `h3` or smaller. This is the biggest lever for making the
  deck feel calm instead of busy.

---

## 5. Elevation & Surface Rules

Spotify uses almost no drop shadows — elevation is communicated by background value alone.
We copy this:

- Flat by default: `surface-2` cards sit directly on `surface-1`/`canvas` with **no shadow**.
- The single exception is the primary action / highlight moment (mirrors the floating green
  Play button, the only shadowed element in the entire reference set) — the **Opportunity
  Card**'s green accent bar and the **Metric Card**'s hero number may carry a very soft glow
  or lift, nothing else.
- Hover/active state (where the deck is interactive, e.g. a clickable PDF or web export):
  `surface-2` → `surface-3`. That's the only elevation step that exists.

---

## 6. Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `radius/sm` | 4px | Chips, tags, small badges |
| `radius/md` | 8px | Standard cards — matches Spotify's own card corner |
| `radius/lg` | 12px | Feature/hero panels, section-divider blocks |
| `radius/pill` | 999px | Filter chips, tab selectors, status pills |
| `radius/circle` | 50% | Avatar containers, step-index circles, icon buttons |

---

## 7. Section Header (used at the top of every content block on a slide)

Anatomy, copied directly from the "Popular artists / Show all" and "Browse all" pattern:

`[optional overline]` → `h2` title, left-aligned → `space-3` gap → content starts.

- No underline, no box, no icon by default — weight and size alone signal "this is a
  section," exactly as Spotify never decorates these labels.
- Optional right-aligned meta tag (replaces Spotify's "Show all" link, which has no
  equivalent in a static deck) — e.g. a small `body-sm` source citation or category tag.
- Spacing: `space-7` (48px) above a new section header, `space-3`–`space-4` below it to the
  first card/row. This "loose between, tight within" rhythm is the main reason Spotify's
  dense screens don't feel cluttered — replicate it exactly.

---

## 8. Card Components

Four card types cover every slide need. Do not invent a fifth without a strong reason —
Spotify's entire product runs on ~4 recurring shapes.

### 8.1 Metric Card
*Source pattern:* the quiet "77,038,418 monthly listeners" / play-count treatment.
- `metric` number (64px bold, tabular figures), `overline` or `body-sm` label directly
  beneath in `text/secondary`.
- No card box, no border — sits straight on the surface, exactly like Spotify never boxes
  its stat lines.
- Optional trend indicator (▲/▼ + `status/positive` or `status/critical`) to the right of
  the number, small and quiet — never larger than the label text.
- Used in a row of 2–4 across a slide with `space-5` gutters.

### 8.2 Insight Card
*Source pattern:* the flat "Browse all" editorial tile, simplified (no photography).
- `surface-2` background, `radius/md`, `space-4` padding.
- Small categorical accent dot or 4px top bar (from §1) → `overline` label ("INSIGHT") →
  `h3` headline → 1–2 lines `body-sm` in `text/secondary`.
- Fixed-height, title truncates rather than reflowing awkwardly — matches how every
  Spotify card title clips at one line rather than wrapping unpredictably.
- Used in grids of 2–3, equal width, same gutter as shelves.

### 8.3 Opportunity Card
*Source pattern:* the one moment Spotify lets green mean "act on this" (Play button,
Follow-active, currently-playing track title).
- `surface-2` background, `radius/md`, **4px left accent bar in `brand/green`.**
- `overline` ("OPPORTUNITY") → `h3` title → `body` description.
- Bottom metadata row (impact / effort / owner) styled like a tracklist's right-aligned
  metadata columns: `body-sm`, `text/secondary`, small caps labels.
- This is the one card type allowed to feel slightly heavier than its neighbors — it's the
  "recommendation" unit, and it should visually out-rank an Insight Card the same way
  Spotify's green Play button out-ranks every gray icon around it.

### 8.4 Workflow / Process Card (step card)
*Source pattern:* the Queue screen's playing/queued/upcoming text treatment, plus the
horizontal shelf's left-to-right sequencing.
- Numbered circular index (`radius/circle`), connected by a **1px hairline connector**
  (`border/hairline`) — the one intentional use of a drawn line, echoing the scrubber bar.
- `h3` step title + `body-sm` description.
- Color state mirrors the Queue screen exactly: **current step = `brand/green` text**,
  **completed steps = `text/primary`**, **upcoming steps = `text/tertiary`.** No boxes
  around steps — state is carried entirely by text color and the connector line.

---

## 9. Chips / Tags

*Source pattern:* the "This weekend" / "All genres" filter pills on the Live Events screen,
and the Playlists/Artists/Albums tabs in the sidebar.

- Shape: `radius/pill` always.
- Rest state: `surface-3` fill, `text/primary` label.
- Active/selected state: solid `brand/green` fill, **black text** — the highest-contrast
  toggle in the whole system, used exactly as sparingly as Spotify uses it (one active chip
  among several, never more).
- Status pill variant (for opportunity priority, e.g. P0/P1/P2): small colored dot
  (`status/*`) + `body-sm` label, no fill — quieter than a filter chip since it's
  informational, not interactive.
- Explicit-content-style square badge (small, `radius/sm`, `surface-3` fill, single
  character or short code) is reserved for compact inline flags, never for taxonomy —
  keeps the pill shape meaningful as "this is a filter/category."

---

## 10. Icons

- Line icons only, consistent stroke weight (1.5–2px at deck scale), geometric, no fill —
  matching the home/search/bell/shuffle/repeat icon family across every reference screen.
- Exactly one icon set for the whole deck (e.g. Lucide or Feather — closest to Spotify's own
  icon geometry). Never mix sets.
- The **only** filled/solid icon allowed is a primary-action icon (the deck's equivalent of
  the Play button) — reserved for the single most important call-to-action on a slide, if
  any. This scarcity is what makes it work in the original UI; don't dilute it.

---

## 11. Visual Hierarchy Rules (the reasoning, stated as rules)

1. **One dominant element per slide.** One `display`/`h1`/`metric` anchors attention;
   everything else is subordinate. Mirrors Spotify never having two hero elements on one
   screen.
2. **Hierarchy through scale and weight, not color.** Color is meaning (action, category,
   status), never decoration. If you're reaching for a color to "make something stand out,"
   make it bigger or bolder instead.
3. **No borders/dividers where spacing can do the job.** Spotify separates content with
   whitespace and value shifts, not rules. Boxes are earned (Insight/Opportunity cards
   only), not default.
4. **Numbers are quiet by default.** A big stat gets a big number and a small label under
   it — never a competing headline treatment. Data supports the point; it isn't the point.
5. **Everything anchors to one left margin.** Titles, section headers, body copy all share
   the same left edge — mirrors the persistent left-nav and left-aligned headers across
   every single reference screen, web and mobile.
6. **Repetition over novelty.** Once Metric, Insight, Opportunity, and Workflow cards are
   defined, every slide in the deck reuses them. A new layout is a last resort, not a
   creative default — this is Spotify's actual product strategy (3–4 shapes, infinite
   content) and it's exactly what makes a 40-screen product feel coherent instead of
   assembled.

---

## 12. Component Consistency Checklist

Before adding anything new to a slide, check:

- [ ] Does this reuse an existing card type (§8) instead of inventing a new shape?
- [ ] Is color used only for meaning (brand action, category, status), never decoration?
- [ ] Is there exactly one dominant element on this slide?
- [ ] Are spacing values pulled from the §3 scale, not eyeballed?
- [ ] Are borders/dividers avoided in favor of spacing or value shifts?
- [ ] Does the left edge align with every other slide's margin?
- [ ] Would a Spotify product designer find this "restrained," or would they find it "busy"?

If the last checkbox fails, the fix is almost always subtraction, not decoration.
