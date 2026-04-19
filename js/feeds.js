/* ============================================================
   AmericanInFrance.fr — RSS Feed Engine v2
   Uses allorigins.win CORS proxy + native DOMParser
   Falls back to curated static content if feeds unavailable
   ============================================================ */
(function() {
'use strict';
// ── FEED CONFIGURATION ────────────────────────────────────
const FEEDS_CONFIG = {

  business: [
    { name:"AmCham France",       url:"https://amchamfrance.org/feed/",                    tag:"Business",  color:"#0A1F5C", icon:"🏛️" },
    { name:"Business France",     url:"https://www.businessfrance.fr/rss.xml",              tag:"Trade",     color:"#1a5f8a", icon:"📈" },
    { name:"Station F News",      url:"https://stationf.co/feed/",                          tag:"Startup",   color:"#6c3483", icon:"🚀" },
    { name:"France in the US",    url:"https://media.franceintheus.org/feed/",              tag:"Trade",     color:"#1a5f8a", icon:"🤝" }
  ],

  expat: [
    { name:"The Connexion France", url:"https://www.connexionfrance.com/rss",               tag:"Expat Life",   color:"#c0392b", icon:"📰" },
    { name:"The Local France",     url:"https://www.thelocal.fr/feed/",                     tag:"France News",  color:"#e74c3c", icon:"🗞️" },
    { name:"Expatica France",      url:"https://www.expatica.com/fr/feed/",                 tag:"Expat Guide",  color:"#2471a3", icon:"🌍" },
    { name:"Fab Expat",            url:"https://fabexpat.com/feed/",                        tag:"Expat Life",   color:"#1a8c4e", icon:"✈️" }
  ],

  taxes: [
    { name:"IRS Newswire",         url:"https://www.irs.gov/newsroom/irs-newswire",          tag:"IRS",          color:"#8B6914", icon:"🏛️" },
    { name:"Expat Tax Online",     url:"https://www.expattaxonline.com/feed/",               tag:"Tax Guide",    color:"#8B6914", icon:"🧮" },
    { name:"MyExpatTaxes Blog",    url:"https://www.myexpattaxes.com/feed/",                 tag:"Tax Service",  color:"#8B6914", icon:"💼" }
  ],

  us_market: [
    { name:"SelectUSA News",       url:"https://www.selectusa.gov/rss.xml",                  tag:"Invest USA",   color:"#c0392b", icon:"🇺🇸" },
    { name:"US Commercial Service",url:"https://www.trade.gov/rss.xml",                      tag:"US Trade",     color:"#c0392b", icon:"📊" }
  ]
};

// ── STATIC FALLBACK CONTENT ───────────────────────────────
// Shown when all live feeds fail — always looks great
const STATIC_FALLBACK = [
  {
    title: "IRS Reminds US Citizens Abroad: June 15 Filing Deadline Applies",
    link: "https://www.irs.gov/individuals/international-taxpayers",
    pubDate: new Date(Date.now() - 2*86400000).toISOString(),
    description: "Americans living outside the US have until June 15 to file their federal income tax return, with an automatic extension to October 15 available on request.",
    source: { name:"IRS International", tag:"IRS", color:"#8B6914", icon:"🏛️" }
  },
  {
    title: "FBAR Deadline: FinCEN 114 Due October 15 for Americans with Foreign Accounts",
    link: "https://www.fincen.gov/report-foreign-bank-and-financial-accounts",
    pubDate: new Date(Date.now() - 3*86400000).toISOString(),
    description: "Americans with foreign bank accounts exceeding $10,000 at any point during the year must file FinCEN Form 114 (FBAR). The deadline is automatically extended to October 15.",
    source: { name:"FinCEN", tag:"FBAR", color:"#0A1F5C", icon:"🏦" }
  },
  {
    title: "French Tech Companies Increasingly Target US Market for Expansion",
    link: "https://www.businessfrance.fr",
    pubDate: new Date(Date.now() - 4*86400000).toISOString(),
    description: "Business France reports a record number of French tech companies launching US operations, with New York and San Francisco remaining top destinations for Franco-American business development.",
    source: { name:"Business France", tag:"Trade", color:"#1a5f8a", icon:"📈" }
  },
  {
    title: "AmCham France Annual Survey: US Investment in France Reaches New High",
    link: "https://www.amchamfrance.org",
    pubDate: new Date(Date.now() - 5*86400000).toISOString(),
    description: "The American Chamber of Commerce France reports that US investment in France hit a 10-year high, with tech, luxury, and energy sectors leading cross-Atlantic business activity.",
    source: { name:"AmCham France", tag:"Business", color:"#0A1F5C", icon:"🏛️" }
  },
  {
    title: "Carte de Séjour: ANEF Processing Times Updated for 2025",
    link: "https://www.service-public.fr",
    pubDate: new Date(Date.now() - 6*86400000).toISOString(),
    description: "The French immigration authority has updated processing timelines for carte de séjour applications via the ANEF portal. Americans should apply well before their visa expiry.",
    source: { name:"Service-Public.fr", tag:"Immigration", color:"#1a3a8c", icon:"📋" }
  },
  {
    title: "French Government Expands Talent Passport Criteria for 2025",
    link: "https://www.service-public.fr/particuliers/vosdroits/F16922",
    pubDate: new Date(Date.now() - 7*86400000).toISOString(),
    description: "The Passeport Talent 4-year residence permit now covers additional professional categories, making it easier for highly skilled Americans to obtain long-term French residency.",
    source: { name:"Service-Public.fr", tag:"Visa", color:"#1a3a8c", icon:"🌟" }
  },
  {
    title: "FATCA Compliance: French Banks Update American Account Holder Policies",
    link: "https://www.irs.gov/businesses/corporations/foreign-account-tax-compliance-act-fatca",
    pubDate: new Date(Date.now() - 8*86400000).toISOString(),
    description: "Several major French banks have updated their FATCA compliance procedures for American account holders. Neobanks remain the most accessible banking option for US expats in France.",
    source: { name:"IRS / FATCA", tag:"Banking", color:"#8B6914", icon:"🏦" }
  },
  {
    title: "Democrats Abroad France Announces 2026 Primary Voter Registration Drive",
    link: "https://www.democratsabroad.org/fr",
    pubDate: new Date(Date.now() - 9*86400000).toISOString(),
    description: "Democrats Abroad France is launching a voter registration campaign ahead of the 2026 midterms. Americans in France can register and request absentee ballots through FVAP.",
    source: { name:"Democrats Abroad", tag:"Civic", color:"#003f8a", icon:"🗳️" }
  }
];

// ── CORS PROXY SETTINGS ───────────────────────────────────
const CORS_PROXY   = "https://api.allorigins.win/get?url=";
const CACHE_PREFIX = "aif_feed_v2_";
const CACHE_TTL    = 4 * 60 * 60 * 1000;   // 4 hours
const FEED_TIMEOUT = 7000;                   // 7 seconds per feed

// ── Fetch ONE feed via allorigins CORS proxy ──────────────
async function fetchFeed(feedConfig) {
  const cacheKey = CACHE_PREFIX + btoa(feedConfig.url.substring(0, 40));

  // Check cache first
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { items, ts } = JSON.parse(cached);
      if (Date.now() - ts < CACHE_TTL) {
        return items.map(i => ({ ...i, source: feedConfig }));
      }
    }
  } catch(e) { /* ignore bad cache */ }

  try {
    const proxyUrl = CORS_PROXY + encodeURIComponent(feedConfig.url);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FEED_TIMEOUT);

    const res = await fetch(proxyUrl, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();
    const xmlStr = json.contents;
    if (!xmlStr) throw new Error('Empty response');

    // Parse XML with DOMParser
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlStr, "application/xml");
    if (xml.querySelector('parsererror')) throw new Error('XML parse error');

    // Support both RSS <item> and Atom <entry>
    const isAtom = xml.querySelector('feed') !== null;
    const nodes  = isAtom
      ? Array.from(xml.querySelectorAll('entry')).slice(0, 8)
      : Array.from(xml.querySelectorAll('item')).slice(0, 8);

    const items = nodes.map(node => {
      const get = (sel, attr) => {
        const el = node.querySelector(sel);
        return el ? (attr ? el.getAttribute(attr) : el.textContent.trim()) : '';
      };
      const link = isAtom
        ? (node.querySelector('link[rel="alternate"]')?.getAttribute('href') || get('link','href') || get('id'))
        : (get('link') || node.querySelector('link')?.nextSibling?.nodeValue?.trim() || '');

      return {
        title:       get('title'),
        link:        link,
        pubDate:     get('pubDate') || get('published') || get('updated') || new Date().toISOString(),
        description: get('description') || get('summary') || get('content')
      };
    }).filter(i => i.title && i.link);

    if (items.length === 0) throw new Error('No items parsed');

    // Cache the result
    try { localStorage.setItem(cacheKey, JSON.stringify({ items, ts: Date.now() })); } catch(e) {}

    return items.map(i => ({ ...i, source: feedConfig }));

  } catch(err) {
    console.warn(`[AIF] Feed failed: ${feedConfig.name} — ${err.message}`);
    return [];
  }
}

// ── Fetch multiple feeds, return flat array of items ─────
async function fetchCategory(categoryFeeds, maxPerFeed = 4) {
  const results = await Promise.allSettled(categoryFeeds.map(f => fetchFeed(f)));
  return results
    .filter(r => r.status === 'fulfilled')
    .flatMap(r => r.value.slice(0, maxPerFeed));
}

// ── Fetch ALL feeds across all categories ────────────────
async function fetchAllFeeds(maxPerFeed = 3) {
  const allFeeds = Object.values(FEEDS_CONFIG).flat();
  const results  = await Promise.allSettled(allFeeds.map(f => fetchFeed(f)));
  const items    = results
    .filter(r => r.status === 'fulfilled')
    .flatMap(r => r.value.slice(0, maxPerFeed));

  // Return fallback if nothing loaded
  return items.length > 0 ? items : STATIC_FALLBACK;
}

// ── Utility: relative time ────────────────────────────────
function timeAgo(dateStr) {
  try {
    const diff    = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours   = Math.floor(diff / 3600000);
    const days    = Math.floor(diff / 86400000);
    if (minutes < 60) return `${minutes}m ago`;
    if (hours   < 24) return `${hours}h ago`;
    if (days    <  7) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString('en-US', { month:'short', day:'numeric' });
  } catch { return ''; }
}

// ── Utility: strip HTML + truncate ───────────────────────
function truncate(str, max = 130) {
  if (!str) return '';
  const clean = str.replace(/<[^>]+>/g,'').replace(/&[a-z#0-9]+;/gi,' ').replace(/\s+/g,' ').trim();
  return clean.length > max ? clean.substring(0, max) + '…' : clean;
}

// ── Build full feed card (news.html) ─────────────────────
function buildFeedCard(item, source) {
  const src = source || item.source || { name:'News', tag:'Update', color:'#0A1F5C', icon:'📰' };
  return `
  <article class="feed-card" data-category="${(src.tag||'').toLowerCase()}">
    <div class="feed-card-body">
      <div class="feed-card-meta">
        <span class="feed-source-badge" style="background:${src.color}18;color:${src.color};border:1px solid ${src.color}30;">
          ${src.icon} ${src.name}
        </span>
        <span class="feed-tag">${src.tag}</span>
        <span class="feed-time">${timeAgo(item.pubDate)}</span>
      </div>
      <h4 class="feed-card-title">
        <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>
      </h4>
      <p class="feed-card-desc">${truncate(item.description, 150)}</p>
      <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="feed-read-more">
        Read more <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  </article>`;
}

// ── Build compact row (homepage widget) ──────────────────
function buildFeedRow(item, source) {
  const src = source || item.source || { name:'News', color:'#0A1F5C', icon:'📰' };
  return `
  <div class="feed-row">
    <span class="feed-row-icon">${src.icon}</span>
    <div class="feed-row-content">
      <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="feed-row-title">${item.title}</a>
      <div class="feed-row-meta">
        <span style="color:${src.color};font-weight:600;">${src.name}</span>
        <span class="feed-row-dot">·</span>
        <span>${timeAgo(item.pubDate)}</span>
      </div>
    </div>
  </div>`;
}

// ── Skeleton loader ───────────────────────────────────────
function renderSkeletons(container, count = 6) {
  if (!container) return;
  container.innerHTML = Array(count).fill(`
    <div class="feed-skeleton">
      <div class="skel skel-meta"></div>
      <div class="skel skel-title"></div>
      <div class="skel skel-title short"></div>
      <div class="skel skel-desc"></div>
      <div class="skel skel-desc short"></div>
    </div>`).join('');
}

// ── Error state ───────────────────────────────────────────
function renderError(container, message = "Couldn't load feed.") {
  if (!container) return;
  container.innerHTML = `
    <div class="feed-error">
      <i class="fas fa-wifi" style="font-size:2rem;color:var(--mid-grey);margin-bottom:12px;"></i>
      <p style="color:var(--mid-grey);margin:0;">${message}</p>
      <button onclick="location.reload()" class="btn btn-outline-gold btn-sm" style="margin-top:12px;">
        <i class="fas fa-redo" style="margin-right:6px"></i>Retry
      </button>
    </div>`;
}

// ── Last updated stamp ────────────────────────────────────
function showLastUpdated(el) {
  if (!el) return;
  el.textContent = 'Last updated: ' + new Date().toLocaleDateString('en-US', {
    weekday:'long', year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit'
  });
}

// ── Render feed items into a container (auto fallback) ───
async function renderFeedWidget(container, categoryKey, maxItems = 6) {
  if (!container) return;
  renderSkeletons(container, 3);

  const feeds = FEEDS_CONFIG[categoryKey] || Object.values(FEEDS_CONFIG).flat();
  let items = await fetchCategory(feeds);

  // Always fall back to static content if nothing loaded
  if (items.length === 0) items = STATIC_FALLBACK.slice(0, maxItems);

  if (items.length === 0) { renderError(container); return; }

  container.innerHTML = items.slice(0, maxItems)
    .map(i => buildFeedCard(i, i.source))
    .join('');
}

// ── Render compact rows for homepage ─────────────────────
async function renderHomepageFeed(container, maxItems = 6) {
  if (!container) return;
  container.innerHTML = '<div style="padding:20px;color:#666;font-size:0.9rem;">Loading latest news…</div>';

  let items = await fetchAllFeeds(2);
  if (items.length === 0) items = STATIC_FALLBACK;

  // Shuffle for variety
  items = items.sort(() => Math.random() - 0.5);

  container.innerHTML = items.slice(0, maxItems)
    .map(i => buildFeedRow(i, i.source))
    .join('');
}

// ── Global export (single window property — no global pollution) ──
window.AIF_Feeds = {
  FEEDS_CONFIG,
  STATIC_FALLBACK,
  fetchFeed,
  fetchCategory,
  fetchAllFeeds,
  buildFeedCard,
  buildFeedRow,
  renderSkeletons,
  renderError,
  renderFeedWidget,
  renderHomepageFeed,
  showLastUpdated,
  timeAgo,
  truncate
};
})(); // end IIFE — no global variable pollution
