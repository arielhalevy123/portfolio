/*
 * Ariel Halevy — Portfolio v2
 * Minimal progressive enhancement. No dependencies.
 */

(() => {
    'use strict';

    const prefersReduced =
        window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Spotlight (cursor-follow) ---------- */
    const spotlight = document.querySelector('.spotlight');
    if (spotlight && !prefersReduced && matchMedia('(pointer: fine)').matches) {
        let raf = null;
        window.addEventListener('mousemove', (e) => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                spotlight.style.setProperty('--mx', e.clientX + 'px');
                spotlight.style.setProperty('--my', e.clientY + 'px');
                raf = null;
            });
        }, { passive: true });
    } else if (spotlight) {
        spotlight.style.opacity = '0';
    }

    /* ---------- Reveal on scroll ---------- */
    const revealables = document.querySelectorAll('.reveal, .section');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
        revealables.forEach((el) => io.observe(el));
    } else {
        revealables.forEach((el) => el.classList.add('is-in'));
    }

    /* ---------- Nav section highlight ---------- */
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(navLinks)
        .map((a) => document.getElementById(a.dataset.section))
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        const setActive = (id) => {
            navLinks.forEach((a) => {
                a.classList.toggle('is-active', a.dataset.section === id);
            });
        };

        const spy = new IntersectionObserver((entries) => {
            // pick the entry closest to the top of the viewport that's visible
            const visible = entries
                .filter((e) => e.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
            if (visible[0]) setActive(visible[0].target.id);
        }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 });

        sections.forEach((s) => spy.observe(s));
    }

    /* ---------- Smooth-scroll polyfill for older Safari ---------- */
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            if (!href || href === '#' || href.length < 2) return;
            const target = document.getElementById(href.slice(1));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: prefersReduced ? 'auto' : 'smooth',
                    block: 'start'
                });
                // move focus for a11y
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }
        });
    });

    /* ---------- Console signature ---------- */
    if (window.console && console.log) {
        console.log(
            '%cAriel Halevy %c· GenAI + SW Engineer\n%cariel67788@icloud.com',
            'font: 600 14px "Space Grotesk", sans-serif; color:#7cf0c1;',
            'font: 400 12px monospace; color:#9aa7b4;',
            'font: 400 11px monospace; color:#6b7785;'
        );
    }
})();
