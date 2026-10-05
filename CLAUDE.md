# CLAUDE.md

Marketing + ordering site for **3dplan.online** (2D/3D floor plans for real-estate listings). Next.js App Router, TypeScript, Ant Design, `next-intl`. There is no database and no CMS: every page is static content driven by JSON message catalogs, and the only backend is one email route.

## Commands

```bash
npm run dev      # next dev on port 3001
npm run build    # next build
npm start        # next start on port 3001
npx tsc --noEmit # type check — use this as the verification step
```

There are no tests. `npm run lint` is **broken**: it calls `next lint`, which Next 16 removed, and no ESLint is installed. Verify changes with `npx tsc --noEmit` plus a build.

Deployment is a plain Node server behind pm2 (see [README.md](README.md)), not Vercel.

## Environment

`.env` (git-ignored) holds:

- `MY_EMAIL` / `MY_PASSWORD` — Gmail account + app password used by nodemailer in [route.ts](src/app/api/email/route.ts).
- `PORT`
- `NEXT_PUBLIC_SITE_URL` is read in [metadata.ts](src/i18n/metadata.ts) and falls back to `https://3dplan.online`.

## Layout

```
src/
  proxy.ts              # Next 16's middleware (renamed file); locale routing
  i18n/                 # locales, routing, navigation, request config, hreflang
  messages/{en,de,fr,cz,sk,it}.json
  app/
    [locale]/           # every page lives under the locale segment
    api/email/route.ts  # the only server route
    components/         # page sections; common/ holds reusable widgets
    hooks/useOrder.tsx
    utils/              # email.ts, confirmation.ts
    globals.css
```

Path alias: `@/*` → `./src/*`.

## i18n — read this before touching routing

Six locales: `en, de, fr, cz, sk, it` ([locales.ts](src/i18n/locales.ts)). `en` is the default.

- **`localePrefix: "as-needed"`** — English URLs are bare (`/contact`), the others are prefixed (`/de/contact`). Do not add an `/en` prefix; the bare URLs are what is indexed.
- **Czech is `cz` in URLs but `cs` everywhere else.** Browsers send `cs` in `accept-language` and Google only accepts `cs` in hreflang, so [proxy.ts](src/proxy.ts) rewrites the incoming header and `HREFLANG` maps it back on the way out. Any new code that compares locale codes has to go through `HREFLANG` / `LANGUAGE_ALIASES` rather than assuming the two match.
- **Unsupported language prefixes redirect instead of 404ing** — `/pt/price` → `/price`, `/de-AT` → `/de`. The redirect is temporary on purpose, so the URL can become valid if the locale is added.
- **Always import navigation from `@/i18n/navigation`**, never from `next/link` or `next/navigation`. `Link`, `useRouter`, `usePathname` and `redirect` from there keep the locale prefix; the raw Next versions silently drop it. (`useSearchParams` is the exception — it comes from `next/navigation`.)
- **hreflang is built by hand.** `alternateLinks: false` in [routing.ts](src/i18n/routing.ts); the layout calls `getAlternates()` instead, which reads the current path from the `x-pathname` header that the proxy sets, because a server component cannot otherwise know its own URL.
- An explicit pick from the language dropdown is remembered in the `3DPLAN_LOCALE` cookie and beats `accept-language` on the next visit.

### Message catalogs

All six files must stay structurally identical — same keys, same count (currently 460 leaves). Adding a string means adding it to all six. Translated copy is real marketing/legal text; if you cannot translate, say so rather than leaving English in a non-English file.

Some strings carry markup:

- `t.rich("key", { br: () => <br /> })` for line breaks.
- `t.raw("key")` fed into `dangerouslySetInnerHTML` on the confirmation page — those values are trusted authored content, keep it that way.

## Forms and email

Both forms ([contact page](src/app/[locale]/contact/page.tsx) and [OrderForm](src/app/components/order.tsx)) do the same thing: build a plain-text message, `POST` it as `FormData` to `/api/email`, which mails it to `office@3dplan.online` via Gmail. Attachments ride along as `files` entries; the order form caps the combined upload at 5 MB.

`/confirmation` is **one-shot**: a successful submit calls `allowConfirmation("contact" | "order")`, which sets a `sessionStorage` flag; the page calls `consumeConfirmation()`, which reads *and clears* it, and redirects to `/` otherwise. The read is guarded by a ref because React StrictMode double-invokes effects in dev — do not remove that guard.

The order form's validation lives in `validateOrder()` in [order.tsx](src/app/components/order.tsx). Errors are computed continuously but only *shown* after the first submit attempt (`showErrors`), so the form doesn't shout at someone who just opened it.

`useOrder()` is now just a navigation to `/order?type=<slug>`; it used to open a modal and the old version is kept commented out for a manual revert. Service slugs (`2d-dimension`, `2d-furniture`, `3d-furniture`) are mapped in `ORDER_TYPE_SLUGS` — use `getOrderHref()` / `getOrderTypeFromSlug()` rather than writing the query string by hand.

## Styling

Two generations of CSS coexist in [globals.css](src/app/globals.css):

- **Legacy**: `--main-*` variables and page-specific classes, used by the home, price, about and service pages.
- **Redesign**: the `--ui-*` tokens and the `ui_*` building blocks (`ui_page`, `ui_card`, `ui_btn`, `ui_grid`, `ui_field`) at the end of the file, currently used by the header, order, contact and confirmation pages.

**New pages use the `--ui-*` tokens and `ui_*` classes.** Page-specific sizing goes in that page's own stylesheet, imported directly by the component (`import "./order.css"`) — there are no CSS modules and no Tailwind.

Ant Design is themed once, in [layout.tsx](src/app/[locale]/layout.tsx) via `ConfigProvider`. Responsive behaviour comes from the `useMedia()` hook (`isSmall` < 820px, `isMiddle` < 1300px), not from CSS alone, so anything using it must be a client component.

## Conventions

- Most components are `"use client"` — the only real server components are the locale layout and the static page shells. Adding `useState`/`useTranslations` means adding the directive.
- Images in `public/` are referenced by literal string arrays in the components (see the `*Covering` arrays in [order.tsx](src/app/components/order.tsx) and the gallery arrays in the service pages). Filenames contain spaces and are load-bearing — renaming a file means editing the array.
- The home page and some sections are commented out rather than deleted (`MainPlans`, `Banner`). Leave commented-out blocks alone unless asked; they are deliberate parked work.
- Google Ads gtag is inlined in the layout `<head>`.
- Commit messages are short, lowercase, imperative-ish ("added locales routing", "corrected order validation").
