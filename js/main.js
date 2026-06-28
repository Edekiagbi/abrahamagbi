/* =====================================================
   MAIN JAVASCRIPT — Abraham Portfolio
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileNav();
    initNavbarScroll();
    initSmoothScroll();
    initActiveNav();
    initScrollProgress();
    initBackToTop();
    initTypingEffect();
    initPortfolioFilter();
    initTestimonialCarousel();
});

/* ==================== THEME TOGGLE ==================== */
function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

    html.setAttribute('data-theme', savedTheme);

    toggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', next);
        localStorage.setItem('portfolio-theme', next);

        // Animate toggle
        toggle.style.transform = 'rotate(360deg)';
        setTimeout(() => { toggle.style.transform = ''; }, 300);
    });
}

/* ==================== MOBILE NAVIGATION ==================== */
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('show');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('show');
        });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#navbar') && navMenu.classList.contains('show')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('show');
        }
    });
}

/* ==================== NAVBAR SCROLL EFFECT ==================== */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

/* ==================== SMOOTH SCROLL ==================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==================== ACTIVE NAV LINK ==================== */
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ==================== SCROLL PROGRESS BAR ==================== */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

/* ==================== BACK TO TOP ==================== */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ==================== TYPING EFFECT ==================== */
function initTypingEffect() {
    const textEl = document.getElementById('typing-text');
    const words = ['Web Developer', 'WordPress Developer', 'Shopify Developer', 'Lead Instructor'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            textEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isPaused = true;
            setTimeout(() => {
                isDeleting = true;
                isPaused = false;
                type();
            }, typeSpeed);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* ==================== PORTFOLIO FILTER ==================== */
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projects.forEach(project => {
                const category = project.classList.contains(filter) || filter === 'all';
                if (category) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* ==================== TESTIMONIAL CAROUSEL ==================== */
function initTestimonialCarousel() {
    const track = document.getElementById('testimonial-track');
    const cards = track.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.getElementById('carousel-dots');
    let currentIndex = 0;
    let autoSlide;

    if (cards.length === 0) return;

    // Create dots
    cards.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function goToSlide(index) {
        currentIndex = index;
        const slideWidth = cards[0].offsetWidth;
        track.style.transform = `translateX(-${index * slideWidth}px)`;
        dots.forEach(d => d.classList.remove('active'));
        dots[index].classList.add('active');
    }

    function nextSlide() {
        const next = (currentIndex + 1) % cards.length;
        goToSlide(next);
    }

    function prevSlide() {
        const prev = (currentIndex - 1 + cards.length) % cards.length;
        goToSlide(prev);
    }

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, 5000);
    }

    autoSlide = setInterval(nextSlide, 5000);

    // Touch support
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        clearInterval(autoSlide);
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        if (diff > 50) nextSlide();
        else if (diff < -50) prevSlide();
        isDragging = false;
        autoSlide = setInterval(nextSlide, 5000);
    }, { passive: true });
}
