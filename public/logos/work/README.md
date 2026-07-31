# Client logos for /work case studies

The work pages currently use a typographic wordmark treatment by default
(e.g. "Yamaha." in Geist Medium with a green period). This is a deliberate
editorial choice — Linear, Brex and others run work pages this way.

If you want to swap a specific case from wordmark to a real client logo
later, drop an SVG (preferred) or PNG here, then set `logoPath` on that
case in `lib/cases.ts`:

```ts
{
  slug: "yamaha-global-geo",
  ...
  logoPath: "/logos/work/yamaha.svg",
}
```

`<ClientLogo>` will render the asset when it loads and fall back to the
typographic wordmark while it doesn't.

Expected filenames (when you do add them)
- `amazon.svg`
- `yamaha.svg`
- `kyndryl.svg`
- `dreamies.svg`
- `harken.svg`
- `clifford-chance.svg`

Treatment
- Single-colour vector preferred (black or dark — the component inverts
  to white on dark surfaces via `filter: brightness(0) invert(1)`).
- Aim for a 1:3 to 1:5 aspect ratio.
- ~256px wide is plenty for the hero use on /work/[slug].
- Source files from each client's own brand portal with sign-off in writing.
