# AL-THAWB | Premium Arab Menswear

A modern e-commerce frontend built with Next.js 16 and Bootstrap 5, showcasing premium traditional Arab menswear. Features product browsing, a full garment customizer with live preview, and a responsive shopping cart.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19, Bootstrap 5.3.3
- **Font:** Playfair Display (self-hosted via `next/font`)
- **Styling:** CSS custom properties + responsive media queries
- **State:** React Context + useReducer (cart)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, categories, new arrivals |
| `/shop` | Product grid with collapsible filters |
| `/product/[id]` | Product detail with image zoom and size selectors |
| `/customize` | Design studio — style, fabric, color, cuffs, measurements (cm/in) |

## Getting Started

### Prerequisites

- **Node.js 18+** (recommended: 20 or 22 LTS)
- **npm** (comes with Node.js)

### Install

```bash
git clone <repo-url>
cd cloth_e_commercial
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run start
```

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Start development server |
| `dev:clean` | `rimraf .next && next dev` | Clear cache, then start dev server |
| `build` | `next build` | Create optimized production build |
| `start` | `next start` | Serve the production build |
| `lint` | `next lint` | Run ESLint checks |

## Dev Cache Note

During development, Next.js caches compiled assets in the `.next` folder. Occasionally after CSS or component-level changes, the dev server may serve stale versions. If changes don't appear after saving:

1. **First try:** Hard-refresh the browser (`Ctrl + Shift + R`)
2. **If that doesn't work:** Stop the dev server and run:
   ```bash
   npm run dev:clean
   ```
   This deletes the `.next` cache folder and restarts fresh.

**This does not affect production.** `npm run build` always generates a clean build from scratch. Each deployment compiles every page and asset from source — there is no leftover cache to worry about.

## Project Structure

```
cloth_e_commercial/
├── app/
│   ├── layout.jsx            # Root layout (navbar, footer, providers)
│   ├── page.jsx              # Homepage
│   ├── globals.css           # All styles + responsive media queries
│   ├── loading.jsx           # Loading skeleton
│   ├── shop/
│   │   ├── page.jsx          # Shop page with filters
│   │   └── loading.jsx
│   ├── product/
│   │   └── [id]/page.jsx     # Dynamic product detail
│   └── customize/
│       ├── page.jsx          # Design studio
│       └── loading.jsx
├── components/
│   ├── Navbar.jsx            # Responsive navbar with mobile menu
│   ├── Footer.jsx            # Site footer
│   ├── ProductCard.jsx       # Reusable product card
│   ├── ImageZoom.jsx         # Hover zoom popup (desktop only)
│   ├── ImageZoom.module.css  # Scoped zoom styles
│   ├── SearchOverlay.jsx     # Full-screen search with live filter
│   ├── CartContext.jsx       # Cart state provider
│   ├── CartOffcanvas.jsx     # Slide-out shopping bag
│   ├── AddToCartButton.jsx   # Add to cart with context integration
│   ├── CustomizerPreview.jsx # Live garment preview
│   ├── CustomizerControls.jsx# Style/fabric/measurement controls
│   ├── CustomizerSummary.jsx # Price summary + add to cart
│   └── Providers.jsx         # Root context wrapper
├── public/
│   ├── images/               # Product and hero images
│   └── bootstrap.bundle.min.js
├── next.config.mjs           # Security headers, Turbopack config
└── package.json
```

## Responsive Breakpoints

The site is fully responsive across four breakpoints:

| Breakpoint | Target | Key Adaptations |
|------------|--------|-----------------|
| `< 992px` | Tablet | Compact navbar, collapsible shop filters, reduced image heights, GPU optimizations |
| `< 768px` | Small tablet | Stacked layouts, centered footer, reduced spacing |
| `< 576px` | Phone | Stacked hero buttons, scaled headings, full-width cart drawer |
| `hover: none` | Touch devices | Always-visible add-to-cart overlay, disabled hover effects, hidden zoom popup |

## Security Headers

Production responses include: Content-Security-Policy, HSTS, X-Frame-Options (DENY), X-Content-Type-Options, Referrer-Policy, and Permissions-Policy. Configured in `next.config.mjs`.

## License

This project is a frontend demo.
