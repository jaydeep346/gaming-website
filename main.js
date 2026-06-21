// VenoForge - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initHeroSlider();
    initUserMenu();
    initMobileMenu();
    initLibraryTabs();
    initFlashAutoHide();
    initScrollAnimations();
});

// ─── NAVBAR SCROLL ───────────────────────────────────────────────
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });
}

// ─── HERO SLIDER ─────────────────────────────────────────────────
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const heroTitle = document.getElementById('heroTitle');
    const heroDesc = document.getElementById('heroDesc');
    if (slides.length <= 1) return;

    let current = 0;
    let interval;

    function goToSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');

        if (dots[index] && heroTitle && heroDesc) {
            heroTitle.textContent = dots[index].dataset.title;
            heroDesc.textContent = dots[index].dataset.desc;
        }
        current = index;
    }

    function nextSlide() {
        goToSlide((current + 1) % slides.length);
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goToSlide(i);
            resetInterval();
        });
    });

    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(nextSlide, 5000);
    }

    resetInterval();
}

// ─── USER DROPDOWN MENU ──────────────────────────────────────────
function initUserMenu() {
    const btn = document.getElementById('userMenuBtn');
    const dropdown = document.getElementById('userDropdown');
    if (!btn || !dropdown) return;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
}

// ─── MOBILE MENU ─────────────────────────────────────────────────
function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        toggle.classList.toggle('active');
    });
}

// ─── LIBRARY TABS ────────────────────────────────────────────────
function initLibraryTabs() {
    const tabs = document.querySelectorAll('.library-tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            document.querySelectorAll('.library-panel').forEach(p => p.classList.remove('active'));
            const panel = document.getElementById('panel-' + tab.dataset.tab);
            if (panel) panel.classList.add('active');
        });
    });
}

// ─── FLASH AUTO-HIDE ─────────────────────────────────────────────
function initFlashAutoHide() {
    const flashes = document.querySelectorAll('.flash');
    flashes.forEach(flash => {
        setTimeout(() => {
            flash.style.opacity = '0';
            flash.style.transform = 'translateX(20px)';
            flash.style.transition = 'all 0.3s ease';
            setTimeout(() => flash.remove(), 300);
        }, 4000);
    });
}

// ─── SCROLL ANIMATIONS ──────────────────────────────────────────
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.game-card, .pricing-card, .stat-card, .section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
}

// ─── LIGHTBOX ────────────────────────────────────────────────────
function openLightbox(src) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    if (lb && img) {
        img.src = src;
        lb.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) {
        lb.classList.remove('show');
        document.body.style.overflow = '';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});
