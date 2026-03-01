/**
 * Portfolio Obed ADIDO - Développeur Web Fullstack
 * Script principal
 */

// Initialize EmailJS - Replace with your credentials
// Get your credentials at: https://dashboard.emailjs.com
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

// ============================================
// Mobile Menu
// ============================================
if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        // Toggle icon
        const icon = mobileMenuButton.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    // Close menu when clicking a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
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
        const sectionHeight = section.clientHeight;
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

// Throttle scroll events for performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveLink();
            updateScrollTopButton();
            ticking = false;
        });
        ticking = true;
    }
});

// ============================================
// Scroll to Top Button
// ============================================
function updateScrollTopButton() {
    if (scrollTopBtn) {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.remove('opacity-0', 'invisible');
            scrollTopBtn.classList.add('opacity-100', 'visible');
        } else {
            scrollTopBtn.classList.add('opacity-0', 'invisible');
            scrollTopBtn.classList.remove('opacity-100', 'visible');
        }
    }
}

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Contact Form with EmailJS
// ============================================
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        if (btnText) btnText.classList.add('hidden');
        if (btnLoading) btnLoading.classList.remove('hidden');
        if (btnIcon) btnIcon.classList.add('hidden');
        if (formMessage) formMessage.classList.add('hidden');
        
        // Get form data
        const formData = {
            name: document.getElementById('name')?.value || '',
            email: document.getElementById('email')?.value || '',
            subject: document.getElementById('subject')?.value || '',
            message: document.getElementById('message')?.value || ''
        };
        
        try {
            // Replace with your EmailJS credentials
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
            showFormMessage('Erreur d\'envoi. Contactez-moi directement à obedadido66@gmail.com', 'error');
        } finally {
            // Reset button state
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
    
    // Auto-hide after 6 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 6000);
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Intersection Observer for Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with fade-in class
document.querySelectorAll('.fade-in-element').forEach(el => {
    animationObserver.observe(el);
});

// ============================================
// Page Load Optimizations
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initial state check
    updateActiveLink();
    updateScrollTopButton();
});

// ============================================
// Console Easter Egg
// ============================================
console.log(`
%c Obed ADIDO - Développeur Web Fullstack 
%c Laravel | PHP | MySQL | Déploiement VPS

%c Intéressé par mon profil ?
%c obedadido66@gmail.com

`, 
'color: #3b82f6; font-weight: bold; font-size: 16px; padding: 10px;',
'color: #9333ea; font-size: 12px;',
'color: #10b981; font-size: 12px; margin-top: 10px;',
'color: #f59e0b; font-size: 11px;'
);

// ============================================
// Lazy Loading for Images (if needed)
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

