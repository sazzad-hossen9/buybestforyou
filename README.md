# buybestforyou

A production-ready, pixel-accurate Amazon affiliate buying guide and product review website built with **Next.js (App Router)**, **TypeScript (Strict)**, and **Tailwind CSS**, crafted directly from the high-fidelity design specifications.

---

## Features & Highlights

- **Server-First Architecture**: 100% React Server Components for all pages and layouts; `"use client"` is isolated exclusively to interactive leaves (debounced search, filters, mobile drawers, sticky CTA bars, image galleries).
- **Exact Design Token System**:
  - `cta-deep`: `#B84A14` (5.21:1 AA contrast on white)
  - `muted`: `#5B6470` (6.0:1 contrast)
  - `trust`: `#2B5D7C`
  - `ink`: `#1A1D21` (dark headers, footers, and method bands)
  - `on-ink`: `#B4BBC4`
  - `positive`: `#007A58` / `negative`: `#B34E00`
  - `score`: `#009E73` (radial score rings and metric progress bars)
- **Category Color Tints**:
  - Automotive (`#F4EDE7` / `#7A4E2D`)
  - Electronics (`#E9F1F8` / `#2E6FA3`)
  - Home Appliances (`#E8F2EB` / `#3A8452`)
  - Health & Fitness (`#F8E9EE` / `#B23A5C`)
- **Typography Scale**: Google Font `Open Sans` (`next/font/google`, weights 400–800) with Segoe UI and system fallbacks. Line heights, weights, and tracking follow the Foundations specification.
- **Amazon Associates Compliance**:
  - Header sticky disclosure bar (`#E6EFF4`) with direct link to `/legal/affiliate-disclosure`.
  - Footer statutory disclaimer.
  - Centralized `<AffiliateLink>` component with `rel="sponsored nofollow noopener noreferrer"` and compliant link-level copy.
  - Price tiers (`Budget`, `Mid`, `Premium`) instead of hardcoded dollar amounts.
  - Disclaimers stating clearly that ratings are composite research scores rather than hands-on lab tests.
  - Search results page (`/search`) explicitly marked with `noindex`.

---

## Routes Implemented

| Route | Description |
|---|---|
| `/` | Homepage with Hero, Editor's Pick, Trust Strip, Category Cards, Winners Grid, Method Band, Latest Guides, Editors, and FAQ. |
| `/category/[slug]` | Category Guide Listing with Subcategory Pills, Featured Guides, Filter Sidebar, Sorting, and Pagination. |
| `/reviews/[slug]` | Best-of Roundup Review with Quick Answer box, Compare Table, Numbered Product blocks, Sticky TOC, How to Choose, How We Ranked, and Mobile Sticky CTA. |
| `/product/[slug]` | Single Product Review with Gallery thumbnail switcher, Quick Verdict card, Pros & Cons, Weighted Score bars, Buyer Themes, Specs Table, and Alternatives. |
| `/blog` | Editorial Guides listing with live debounced search and category pill filtering. |
| `/blog/[slug]` | Step-by-step article with short answer callout, inline affiliate product card, common mistakes, and author box. |
| `/contact` | Contact page with verified error reporting cards, client form validation, and toast feedback (`react-toastify`). |
| `/about` | Editorial methodology, "What we do / What we don't" panels, 4 scoring steps, and team personas. |
| `/legal/[slug]` | Legal templates (`affiliate-disclosure`, `privacy-policy`, `terms`, `disclaimer`). |
| `/search?q=...` | Live search results page querying lightweight JSON search index. |
| `not-found` | 404 page with search bar, category chips, and recommended guide cards. |

---

## Getting Started

### Prerequisites
- Node.js 20+ installed (`node -v`)
- npm 10+ installed (`npm -v`)

### Installation & Development
```bash
# Install dependencies
npm install

# Start local development server (port 3000)
npm run dev

# Run ESLint validation
npm run lint

# Build optimized production bundle
npm run build

# Start production server
npm run start
```

---

## Content Management (`public/data/*.json`)

All content is decoupled into JSON files in `public/data/` and loaded dynamically via `src/lib/data.ts`:

- `site.json`: Navigation items, footer columns, brand statements.
- `categories.json`: Categories, subcategories, tint colors, and dot colors.
- `products.json`: Product specifications, composite scores, pros/cons, and Amazon affiliate URLs.
- `reviews.json`: Best-of roundup guides, quick answer summaries, and product associations.
- `posts.json`: Blog guides, how-tos, steps, and inline recommendations.
- `authors.json`: Editorial team member profiles and avatars.
- `faqs.json`: Structured FAQ items.
- `legal.json`: Legal document contents.
- `search-index.json`: Lightweight searchable index for client autocomplete and live search.

---

## License & Attribution
Designed for **buybestforyou.com**. All rights reserved.
