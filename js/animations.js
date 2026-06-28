function initScrollAnimations() {
    const els = document.querySelectorAll('[data-aos]');
    if (!els.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('aos-animate'); observer.unobserve(e.target); }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    els.forEach(el => observer.observe(el));
}

function initSkillBars() {
    const fills = document.querySelectorAll('.skill-bar-fill');
    if (!fills.length) return;
    fills.forEach(f => {
        f.style.width = '0%';
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.width = e.target.dataset.progress + '%';
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.2 });
    fills.forEach(f => observer.observe(f));
}

function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animateCounter(e.target, parseInt(e.target.dataset.target));
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
}

function animateCounter(el, target) {
    let current = 0;
    const steps = 60, increment = target / steps;
    const timer = setInterval(() => {
        current = Math.min(current + increment, target);
        el.textContent = Math.round(current);
        if (current >= target) { el.textContent = target; clearInterval(timer); }
    }, 2000 / steps);
}

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initSkillBars();
    initCounterAnimation();
});
