/**
 * Portfolio Obed ADIDO — Dark Premium
 * Script principal
 */

// Initialize EmailJS
emailjs.init('YOUR_USER_ID');

// DOM Elements
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const scrollTopBtn = document.getElementById('scroll-top');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const btnText = document.getElementById('btn-text');
const btnLoading = document.getElementById('btn-loading');
const btnIcon = document.getElementById('btn-icon');
const scrollProgress = document.getElementById('scroll-progress');

// ============================================
// Mobile Menu
// ============================================
if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuButton.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuButton.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
}

// ============================================
// Active Navigation on Scroll
// ============================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// ============================================
// Scroll Progress Bar
// ============================================
function updateScrollProgress() {
    if (!scrollProgress) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
}

// ============================================
// Scroll to Top Button
// ============================================
function updateScrollTopButton() {
    if (!scrollTopBtn) return;
    if (window.scrollY > 400) {
        scrollTopBtn.classList.remove('opacity-0', 'invisible');
        scrollTopBtn.classList.add('opacity-100', 'visible');
    } else {
        scrollTopBtn.classList.add('opacity-0', 'invisible');
        scrollTopBtn.classList.remove('opacity-100', 'visible');
    }
}

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Throttled scroll handler
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveLink();
            updateScrollTopButton();
            updateScrollProgress();
            ticking = false;
        });
        ticking = true;
    }
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// Scroll Reveal (Intersection Observer)
// ============================================
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Don't unobserve stagger-children so they can re-trigger
                if (!entry.target.classList.contains('stagger-children')) {
                    // Keep observing for effect
                }
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

// Observe all reveal elements
document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children').forEach(el => {
    revealObserver.observe(el);
});

// ============================================
// Animated Counter
// ============================================
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.dataset.target) || 0;
        if (target <= 0) return;
        const suffix = '+';
        const duration = 1500;
        const start = performance.now();

        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            counter.textContent = current + suffix;
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    });
}

// Trigger counter animation when hero is visible
const heroSection = document.getElementById('home');
if (heroSection) {
    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );
    counterObserver.observe(heroSection);
}

// ============================================
// Hero Particles Canvas
// ============================================
function initParticles() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    function resize() {
        const section = canvas.parentElement;
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
    }

    function createParticles() {
        particles = [];
        const count = Math.min(Math.floor((canvas.width * canvas.height) / 18000), 80);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.8 + 0.5,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.15,
                color: Math.random() > 0.5 ? '108, 99, 255' : '0, 212, 170'
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            // Move
            p.x += p.vx;
            p.y += p.vy;

            // Wrap
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            // Draw dot
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
            ctx.fill();

            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(108, 99, 255, ${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });

        animId = requestAnimationFrame(drawParticles);
    }

    resize();
    createParticles();
    drawParticles();

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });

    // Pause when not visible
    const particleObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!animId) drawParticles();
                } else {
                    cancelAnimationFrame(animId);
                    animId = null;
                }
            });
        },
        { threshold: 0.1 }
    );
    particleObserver.observe(canvas.parentElement);
}

// ============================================
// Contact Form with EmailJS
// ============================================
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (btnText) btnText.classList.add('hidden');
        if (btnLoading) btnLoading.classList.remove('hidden');
        if (btnIcon) btnIcon.classList.add('hidden');
        if (formMessage) formMessage.classList.add('hidden');

        const formData = {
            name: document.getElementById('name')?.value || '',
            email: document.getElementById('email')?.value || '',
            subject: document.getElementById('subject')?.value || '',
            message: document.getElementById('message')?.value || ''
        };

        try {
            await emailjs.send(
                'YOUR_SERVICE_ID',
                'YOUR_TEMPLATE_ID',
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to_name: 'Obed ADIDO'
                }
            );
            showFormMessage('Message envoyé avec succès ! Je vous répondrai rapidement.', 'success');
            contactForm.reset();
        } catch (error) {
            console.error('EmailJS Error:', error);
            showFormMessage("Erreur d'envoi. Contactez-moi directement à obedadido66@gmail.com", 'error');
        } finally {
            if (btnText) btnText.classList.remove('hidden');
            if (btnLoading) btnLoading.classList.add('hidden');
            if (btnIcon) btnIcon.classList.remove('hidden');
        }
    });
}

function showFormMessage(message, type) {
    if (!formMessage) return;
    formMessage.textContent = message;
    formMessage.classList.remove('hidden', 'success-message', 'error-message');
    formMessage.classList.add(type === 'success' ? 'success-message' : 'error-message');
    setTimeout(() => formMessage.classList.add('hidden'), 6000);
}

// ============================================
// Preloader
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');

    if (preloader) {
        document.body.style.overflow = 'hidden';

        // Wait a beat, then fade out preloader
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.style.overflow = '';
            }, 700);
        }, 1200);
    }

    // Init particles
    initParticles();

    // Initial state
    updateActiveLink();
    updateScrollTopButton();
    updateScrollProgress();
});

// ============================================
// Lazy Loading for Images
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Console Easter Egg
// ============================================
console.log(`
%c Obed ADIDO — Développeur Web & Mobile Fullstack 
%c Laravel | React | Déploiement VPS

%c Intéressé par mon profil ?
%c obedadido66@gmail.com

`,
    'color: #6C63FF; font-weight: bold; font-size: 16px; padding: 10px;',
    'color: #00D4AA; font-size: 12px;',
    'color: #E8E8F0; font-size: 12px; margin-top: 10px;',
    'color: #FF6B6B; font-size: 11px;'
);
