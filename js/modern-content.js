// Manifesto-style plugins built on top of the DETFramework core.
(function () {
    const LEVEL_CONFIG = {
        level1: {
            label: 'Level I',
            sequence: ['index.html', 'part1.html', 'part2.html', 'part3.html', 'part4.html', 'part5.html', 'part6.html', 'interactive_demo.html']
        },
        level2: {
            label: 'Level II',
            sequence: ['index.html', 'linalg.html', 'part1.html', 'part2.html', 'part3.html', 'part4.html', 'part5.html', 'part6.html', 'interactive_demo.html']
        }
    };

    function framework() {
        if (window.DETFramework) return window.DETFramework;
        return {
            register: (_, handler) => handler({
                path: window.location.pathname,
                page: window.location.pathname.split('/').pop() || 'index.html',
                level: (window.location.pathname.match(/\/(level1|level2)\//) || [])[1] || null,
                hasStaticHeader: !!document.querySelector('.lesson-static-header'),
                hasSiteHeader: !!document.querySelector('.site-header')
            }),
            run: () => {}
        };
    }

    function registerPlugins(frameworkCore) {
        frameworkCore.register('consistent-header', (context) => {
            if (context.hasSiteHeader || context.hasStaticHeader) return;
            if (!context.level || !LEVEL_CONFIG[context.level]) return;

            const levelLabel = LEVEL_CONFIG[context.level].label;
            const header = document.createElement('header');
            header.className = 'manifesto-injected-header';
            header.setAttribute('role', 'banner');
            header.innerHTML = `
                <div class="manifesto-injected-header-inner">
                    <a class="manifesto-brand" href="index.html">${levelLabel}</a>
                    <nav class="manifesto-header-links" aria-label="Header links">
                        <a href="../index.html">Home</a>
                        <a href="index.html">Overview</a>
                        <a href="interactive_demo.html">Demo</a>
                    </nav>
                </div>
            `;
            document.body.prepend(header);
            document.body.classList.add('has-injected-header');
        });

        
        frameworkCore.register('legacy-navbar-links', (context) => {
            if (!context.level || !LEVEL_CONFIG[context.level]) return;
            const navbar = document.querySelector('.navbar.navbar-fixed-top');
            if (!navbar) return;
            navbar.classList.add('manifesto-lesson-header');
            const container = navbar.querySelector('.container') || navbar;
            if (container.querySelector('.manifesto-header-links')) return;

            const links = document.createElement('nav');
            links.className = 'manifesto-header-links';
            links.setAttribute('aria-label', 'Header links');
            links.innerHTML = `
                <a href="../index.html">Home</a>
                <a href="index.html">${LEVEL_CONFIG[context.level].label}</a>
                <a href="interactive_demo.html">Demo</a>
            `;
            container.appendChild(links);
        });

frameworkCore.register('mobile-menu', () => {
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
        });

        frameworkCore.register('smooth-anchors', () => {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const target = document.querySelector(this.getAttribute('href'));
                    if (!target) return;
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            });
        });

        frameworkCore.register('navbar-title', () => {
            const navbarBrand = document.querySelector('.navbar-brand');
            if (!navbarBrand) return;
            navbarBrand.textContent = document.title.replace(' - Python Tutorial', '');
        });

        frameworkCore.register('section-progress', () => {
            const sections = document.querySelectorAll('span[id]');
            if (sections.length < 2 || document.querySelector('.section-progress')) return;

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
        });

        frameworkCore.register('prev-next-navigation', (context) => {
            if (!context.level || !LEVEL_CONFIG[context.level]) return;
            const items = LEVEL_CONFIG[context.level].sequence;
            const idx = items.indexOf(context.page);
            if (idx === -1) return;

            const host = document.querySelector('.container-fluid') || document.querySelector('#main-content') || document.querySelector('.container') || document.body;
            if (!host || host.querySelector('.lesson-prev-next')) return;

            const nav = document.createElement('nav');
            nav.className = 'lesson-prev-next';
            nav.setAttribute('aria-label', 'Lesson navigation');

            const prevHref = idx > 0 ? items[idx - 1] : '../index.html';
            const nextHref = idx < items.length - 1 ? items[idx + 1] : '../index.html';

            nav.innerHTML = `
                <a class="lesson-nav-link" href="${prevHref}">← Previous</a>
                <a class="lesson-nav-link lesson-nav-up" href="index.html">Back to ${context.level.toUpperCase()} overview</a>
                <a class="lesson-nav-link" href="${nextHref}">Next →</a>
            `;

            host.appendChild(nav);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        const frameworkCore = framework();
        registerPlugins(frameworkCore);
        frameworkCore.run();
    });
})();
