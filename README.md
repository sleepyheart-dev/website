# website

Bilingual (EN/NO) static academic website for **A P Pacheco**.

## Structure
- `index.html` / `index-no.html`: home pages
- `about.html` / `om.html`: background
- `research.html` / `forskning.html`: research themes
- `future.html` / `videre.html`: research direction
- `docs.html` / `dokumenter.html`: minimal CV pages
- `publications.html` / `publications-no.html`: ORCID-based publication lists with Scholar fallback
- `contact.html` / `kontakt.html`: contact pages
- `styles.css`: shared responsive design
- `site.js`: shared dateline/year and dark-mode toggle logic

## Local preview
Open the folder in a browser, or run a static server in this directory:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.
