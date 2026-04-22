# AmericanInFrance.fr — Complete Project Documentation

**A Gershon Consulting Initiative**  
*The definitive resource hub for Americans living in France and French companies expanding to the US market.*

---

## Project Overview

AmericanInFrance.fr serves four primary functions:
1. **Resource Hub** — 150+ curated links across 12 categories for Americans in France
2. **Topic Library** — 45+ in-depth landing page guides covering every aspect of expat life and US market expansion
3. **Newsletter & Community** — Weekly digest and partner recruitment for Franco-American professionals
4. **Gershon Consulting Funnel** — Business development for Gershon Consulting's US market entry services

---

## Completed Features

### Core Pages
| File | Description |
|------|-------------|
| `index.html` | Homepage — hero, featured topics, partner CTA, newsletter signup |
| `resources.html` | Resource Hub — 150+ curated links in 12 categories |
| `newsletter.html` | Newsletter signup page |
| `partners.html` | Partner Program recruitment for American consultants in France |
| `news.html` | Weekly Digest page with RSS feed integration |
| `topics.html` | Complete topic index — all 45+ pages in 6 pillars |

### CSS & JavaScript
| File | Description |
|------|-------------|
| `css/style.css` | Main site stylesheet (navbar, footer, components, responsive) |
| `css/landing.css` | Landing page styles (hero, sidebar, cards, content blocks) |
| `js/main.js` | Main JavaScript (navbar, scroll effects) |
| `js/feeds.js` | RSS feed rendering for news/digest pages |
| `js/landing.js` | Landing page interactive features |

---

## Topic Pages (45+ Completed)

### Pillar 1 — Living in France (12 pages)
| Slug | Topic |
|------|-------|
| `topics/moving-to-france.html` | Complete Moving to France Checklist |
| `topics/visas.html` | Long-Stay Visas for Americans |
| `topics/carte-de-sejour.html` | Carte de Séjour / Residency Permit |
| `topics/talent-passport.html` | Talent Passport (Passeport Talent) |
| `topics/citizenship.html` | French Citizenship & Naturalization |
| `topics/banking.html` | Banking in France for Americans |
| `topics/healthcare.html` | Healthcare in France (Sécurité Sociale) |
| `topics/real-estate.html` | Real Estate — Buying & Renting |
| `topics/education.html` | Education in France |
| `topics/retirement.html` | Retiring in France |
| `topics/driving.html` | Driving in France (License Exchange) |
| `topics/french-language.html` | Learning French |
| `topics/french-culture.html` | Understanding French Culture *(New)* |
| `topics/pet-relocation.html` | Moving to France with Pets *(New)* |
| `topics/wills-estate.html` | Wills & Estate Planning (Cross-Border) *(New)* |

### Pillar 2 — Taxes & Compliance (7 pages)
| Slug | Topic |
|------|-------|
| `topics/us-taxes.html` | US Taxes for Americans in France |
| `topics/fbar.html` | FBAR — Foreign Bank Account Reporting |
| `topics/fatca.html` | FATCA & Form 8938 |
| `topics/french-taxes.html` | French Income Tax (Impôt sur le Revenu) |
| `topics/tax-treaty.html` | US-France Tax Treaty |
| `topics/social-security.html` | Social Security & Medicare Abroad |
| `topics/renunciation.html` | Renouncing US Citizenship |

### Pillar 3 — Business in France (7 pages)
| Slug | Topic |
|------|-------|
| `topics/auto-entrepreneur.html` | Auto-Entrepreneur / Micro-Entreprise |
| `topics/sasu.html` | SASU — Complete Guide *(New)* |
| `topics/freelancing.html` | Freelancing in France |
| `topics/company-structures.html` | French Company Structures (SASU/SAS/SARL) |
| `topics/accounting-vat.html` | Accounting & VAT in France |
| `topics/french-labor-law.html` | French Labour Law for Employers |

### Pillar 4 — US Market Expansion (9 pages)
| Slug | Topic |
|------|-------|
| `topics/us-market-entry.html` | US Market Entry Strategy (Flagship) |
| `topics/us-company-setup.html` | Setting Up a US Company |
| `topics/us-go-to-market.html` | US Go-to-Market Strategy |
| `topics/us-trade-shows.html` | Key US Trade Shows |
| `topics/us-fundraising.html` | Raising US Funding |
| `topics/us-sales-culture.html` | US vs. French Sales Culture *(New)* |
| `topics/us-digital-marketing.html` | US Digital Marketing *(New)* |
| `topics/us-distribution.html` | US Distribution Channels *(New)* |

### Pillar 5 — Community & American Life (7 pages)
| Slug | Topic |
|------|-------|
| `topics/americans-in-europe.html` | Americans in Europe — Overview |
| `topics/americans-in-paris.html` | Americans in Paris |
| `topics/americans-in-regions.html` | Americans in the French Regions |
| `topics/us-embassy-france.html` | US Embassy & Consulates in France |
| `topics/voting-from-france.html` | Voting from France |
| `topics/french-american-community.html` | Franco-American Community Organizations *(New)* |

### Pillar 6 — Gershon Consulting Hub (3 pages)
| Slug | Topic |
|------|-------|
| `topics/gershon-about.html` | About Gershon Consulting *(New)* |
| `topics/gershon-services.html` | Gershon Consulting Services *(New)* |
| `topics/gershon-contact.html` | Contact Gershon Consulting *(New)* |

---

## Functional Entry URIs

| URL Path | Purpose |
|----------|---------|
| `/index.html` | Homepage |
| `/topics.html` | Full topic index with search |
| `/resources.html` | 150+ curated resource links |
| `/newsletter.html` | Newsletter signup |
| `/partners.html` | Partner Program application |
| `/news.html` | Weekly Digest |
| `/topics/{slug}.html` | Individual topic landing pages |

---

## Data Models & Content Structure

Each topic landing page follows a consistent structure:
- **Hero:** Gradient background, breadcrumb, tags, H1, lead paragraph, CTAs
- **Key Facts Bar:** 4 highlighted statistics
- **Sidebar:** CTA card, quick reference data, related links
- **Main Content:** Content blocks with headers, checklists, info grids, tip boxes, resource links
- **Newsletter Inline:** Email capture form
- **Related Topics:** 4 cross-linked topic cards

---

## Technical Stack

- **Framework:** Pure HTML5 + CSS3 + Vanilla JavaScript (no build step)
- **Fonts:** Google Fonts (Playfair Display + Inter)
- **Icons:** Font Awesome 6.4.0 (CDN)
- **Data:** Static — no backend required
- **Hosting:** Static hosting (GitHub Pages, Netlify, Vercel compatible)

---

## Next Development Steps

1. **SEO Optimization:** Add structured data (Schema.org), Open Graph tags to all pages
2. **Analytics:** Integrate Google Analytics 4 or Plausible
3. **Newsletter Backend:** Connect newsletter forms to Mailchimp/ConvertKit API
4. **Content Updates:** Add 2025 tax figures (FEIE exclusion, FBAR thresholds) when published
5. **Blog/News System:** Expand news.html with actual RSS feed parsing
6. **Case Studies Page:** Add Gershon Consulting client case studies
7. **Partner Directory:** Build a searchable directory of vetted American consultants

---

## Repository

GitHub: https://github.com/gershonconsulting/AmericanInFrance  
Production URL: https://americaninfrance.fr  

---

*© 2025 AmericanInFrance.fr — A Gershon Consulting Initiative*  
*For informational purposes only. Not legal or financial advice.*
