// Manifesto-style content behavior (non-intrusive, no card injection)
document.addEventListener('DOMContentLoaded', function () {
    function setupMobileMenu() {
        const menuToggle = document.querySelector('.navbar-toggle');
        const sidebar = document.getElementById('sidebar-wrapper');
        if (!menuToggle || !sidebar) return;

        menuToggle.addEventListener('click', function () {
            sidebar.classList.toggle('active');
        });

        document.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            }
        });
    }

    function setupSmoothAnchors() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    function updateNavbarTitle() {
        const navbarBrand = document.querySelector('.navbar-brand');
        if (!navbarBrand) return;
        const pageTitle = document.title.replace(' - Python Tutorial', '');
        navbarBrand.textContent = pageTitle;
    }

    function addSectionNavigation() {
        const sections = document.querySelectorAll('span[id]');
        if (sections.length < 2) return;

        const progressIndicator = document.createElement('div');
        progressIndicator.className = 'section-progress';

        sections.forEach((section, index) => {
            const marker = document.createElement('button');
            marker.className = 'section-progress-item';
            marker.type = 'button';
            marker.setAttribute('aria-label', `Jump to section ${index + 1}`);
            marker.onclick = () => section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            progressIndicator.appendChild(marker);
        });

        document.body.appendChild(progressIndicator);

        window.addEventListener('scroll', () => {
            let current = 0;
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight * 0.35) current = index;
            });
            document.querySelectorAll('.section-progress-item').forEach((item, index) => {
                item.classList.toggle('active', index === current);
            });
        });
    }

    function addPrevNextNavigation() {
        const path = window.location.pathname;
        const page = path.split('/').pop();
        const levelMatch = path.match(/\/(level1|level2)\//);
        if (!levelMatch) return;

        const level = levelMatch[1];
        const sequences = {
            level1: ['index.html', 'part1.html', 'part2.html', 'part3.html', 'part4.html', 'part5.html', 'part6.html', 'interactive_demo.html'],
            level2: ['index.html', 'linalg.html', 'part1.html', 'part2.html', 'part3.html', 'part4.html', 'part5.html', 'part6.html', 'interactive_demo.html']
        };

        const items = sequences[level];
        const idx = items.indexOf(page);
        if (idx === -1) return;

        const host = document.querySelector('.container-fluid') || document.querySelector('#main-content') || document.body;
        if (!host || host.querySelector('.lesson-prev-next')) return;

        const nav = document.createElement('nav');
        nav.className = 'lesson-prev-next';
        nav.setAttribute('aria-label', 'Lesson navigation');

        const prevHref = idx > 0 ? items[idx - 1] : '../index.html';
        const nextHref = idx < items.length - 1 ? items[idx + 1] : '../index.html';

        nav.innerHTML = `
            <a class="lesson-nav-link" href="${prevHref}">← Previous</a>
            <a class="lesson-nav-link lesson-nav-up" href="index.html">Back to ${level.toUpperCase()} overview</a>
            <a class="lesson-nav-link" href="${nextHref}">Next →</a>
        `;

        host.appendChild(nav);
    }

    setupMobileMenu();
    setupSmoothAnchors();
    updateNavbarTitle();
    addSectionNavigation();
    addPrevNextNavigation();
});
