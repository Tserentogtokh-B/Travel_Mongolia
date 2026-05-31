# Tokyo Travel — Website

A dark, cinematic travel website inspired by the "Visit Tokyo" design reference.

## Folder Structure

```
tokyo-travel/
├── index.html          ← Main HTML entry point
├── css/
│   └── style.css       ← All styles (variables, layout, animations, responsive)
├── js/
│   └── main.js         ← Cursor, scroll reveal, counter, testimonials, parallax
├── icons/
│   └── icons.svg       ← SVG sprite (inline in HTML for production)
└── README.md           ← This file
```

## Sections (matching the reference design)

1. **Navigation** — Fixed nav with logo, links, search; scrolled state
2. **Hero** — Full-screen background, "VISIT TOKYO" headline, slide indicator, scroll hint
3. **Features Strip** — 3-column info panels (temples, food, nightlife)
4. **Tours Grid** — 4-column cards with hover reveal
5. **Stats Bar** — Animated counters (travellers, tours, years, rating)
6. **Video Section** — CTA with play button + thumbnail strip
7. **Gallery** — Asymmetric 7-image mosaic grid
8. **Testimonials** — Auto-rotating slider with dot navigation
9. **Book Section** — Two-column form
10. **Footer** — 4-column grid with social links

## Design Decisions

- **Fonts**: Bebas Neue (display) + Barlow Condensed + Barlow (body)
- **Color**: Pure black `#0D0D0D` + accent orange `#E8430A` (matches reference brand dot)
- **Cursor**: Custom animated dot + ring cursor
- **Loader**: Branded 2-second loader screen
- **Animations**: CSS keyframes + IntersectionObserver reveal + parallax on scroll
- **Images**: Unsplash (swap for licensed photography in production)

## Setup

Just open `index.html` in a browser — no build step required.
For production, consider using a local server (e.g. `npx serve .`) for correct CORS on font loading.
