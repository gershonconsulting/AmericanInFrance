/* ============================================================
   AmericanInFrance.fr — Main JavaScript
   Handles: Navbar, Search, Filtering, FAQ, Toasts
   Note: form handlers removed — Airtable iframe embeds handle submissions.
   ============================================================ */

// ---- NAVBAR ----
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
  const btn = document.getElementById('back-to-top');
  if (btn) btn.classList.toggle('visible', window.scrollY > 400);
});

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

// ---- BACK TO TOP ----
const backBtn = document.getElementById('back-to-top');
if (backBtn) {
  backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ---- TOAST NOTIFICATION ----
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  setTimeout(() => toast.classList.remove('show'), 4200);
}

// ---- INTEREST / EXPERTISE TAG TOGGLES ----
document.querySelectorAll('.interest-tag, .expertise-tag').forEach(tag => {
  tag.addEventListener('click', () => tag.classList.toggle('selected'));
});

// ---- FAQ ACCORDION ----
function toggleFaq(el) {
  const answer = el.nextElementSibling;
  const isOpen = answer.classList.contains('open');
  document.querySelectorAll('.faq-answer.open').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-question.open').forEach(q => q.classList.remove('open'));
  if (!isOpen) {
    answer.classList.add('open');
    el.classList.add('open');
  }
}

// ---- ACTIVE SIDEBAR NAVIGATION (resources page) ----
const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
if (sidebarLinks.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sidebarLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  document.querySelectorAll('.category-section').forEach(section => observer.observe(section));
}

// ---- RESOURCE SEARCH ----
const resourceSearch = document.getElementById('resourceSearch');
const searchCount = document.getElementById('searchCount');

if (resourceSearch) {
  resourceSearch.addEventListener('input', () => {
    const q = resourceSearch.value.toLowerCase().trim();
    const links = document.querySelectorAll('.resource-link');
    let visible = 0;
    links.forEach(link => {
      const text = (link.textContent + ' ' + (link.dataset.keywords || '')).toLowerCase();
      const show = !q || text.includes(q);
      link.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (searchCount) {
      searchCount.textContent = q ? `${visible} result${visible !== 1 ? 's' : ''}` : '';
    }
    document.querySelectorAll('.category-section').forEach(section => {
      const anyVisible = [...section.querySelectorAll('.resource-link')].some(l => l.style.display !== 'none');
      section.style.display = anyVisible ? '' : 'none';
    });
  });
}

// ---- FILTER BUTTONS (resources page) ----
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const links = document.querySelectorAll('.resource-link');
      links.forEach(link => {
        if (filter === 'all') {
          link.style.display = '';
        } else {
          const cat = link.dataset.category || '';
          link.style.display = (cat === filter) ? '' : 'none';
        }
      });
      document.querySelectorAll('.category-section').forEach(section => {
        const anyVisible = [...section.querySelectorAll('.resource-link')].some(l => l.style.display !== 'none');
        section.style.display = anyVisible ? '' : 'none';
      });
    });
  });
}

// ---- LEGACY FORM HANDLERS REMOVED ----
// Previously POSTed to /tables/newsletter_subscribers and /tables/consultant_partners,
// which were Genspark Tables endpoints that don't exist on GitHub Pages — every
// submission silently failed. Forms are now handled via Airtable embeds:
//   - register.html → Registration form (appfSgoJ6ac2H4k4Y/shrR8jcrVF8aFKRJG)
//   - newsletter.html → Newsletter form (appfSgoJ6ac2H4k4Y/shrDOWBV1d81Y5pie)
// Inline newsletter pitches on topic pages now link to /newsletter.html.

// ---- SMOOTH SCROLL for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href').substring(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- ANIMATE NUMBERS (hero stats) ----
function animateNumbers() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const text = el.textContent.trim();
    const match = text.match(/^(~?\d+)/);
    if (!match) return;
    const target = parseInt(match[1].replace('~', ''), 10);
    if (isNaN(target) || target > 1000000) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      el.textContent = text.replace(/\d+/, start.toLocaleString());
      if (start >= target) clearInterval(timer);
    }, 20);
  });
}

const heroSection = document.querySelector('.hero');
if (heroSection) {
  const statObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateNumbers();
      statObserver.disconnect();
    }
  });
  statObserver.observe(heroSection);
}
