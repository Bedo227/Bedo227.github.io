// Initialize EmailJS with your User ID
// IMPORTANT: Replace 'YOUR_USER_ID' with your actual EmailJS User ID
// Get it from: https://dashboard.emailjs.com/admin/account
emailjs.init('YOUR_USER_ID');

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.remove('opacity-0', 'invisible');
        scrollTopBtn.classList.add('opacity-100', 'visible');
    } else {
        scrollTopBtn.classList.add('opacity-0', 'invisible');
        scrollTopBtn.classList.remove('opacity-100', 'visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Submission with EmailJS
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const btnText = document.getElementById('btn-text');
const btnLoading = document.getElementById('btn-loading');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    formMessage.classList.add('hidden');
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    try {
        // IMPORTANT: Replace these with your actual EmailJS credentials
        // Service ID: from https://dashboard.emailjs.com/admin
        // Template ID: from https://dashboard.emailjs.com/admin/templates
        const response = await emailjs.send(
            'YOUR_SERVICE_ID',      // Replace with your EmailJS Service ID
            'YOUR_TEMPLATE_ID',     // Replace with your EmailJS Template ID
            {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_name: 'Obed ADIDO'
            }
        );
        
        // Success
        showMessage('Message envoyé avec succès ! Je vous répondrai bientôt.', 'success');
        contactForm.reset();
        
    } catch (error) {
        // Error
        console.error('EmailJS Error:', error);
        showMessage('Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.', 'error');
    } finally {
        // Reset button state
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
    }
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.classList.remove('hidden', 'success-message', 'error-message');
    formMessage.classList.add(type === 'success' ? 'success-message' : 'error-message');
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
}

// Smooth Scroll for All Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Fade-in Animations
const fadeElements = document.querySelectorAll('.fade-in-element');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

fadeElements.forEach(element => {
    observer.observe(element);
});

// Typing Effect for Hero Section (Optional Enhancement)
const heroText = document.querySelector('#home h1 span:last-child');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after page load
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 500);
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('#home .relative');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Prevent FOUC (Flash of Unstyled Content)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Console Easter Egg
console.log(`
%c
╔═══════════════════════════════════════╗
║                                       ║
║      Développé par Obed ADIDO         ║
║      Portfolio v1.0                   ║
║                                       ║
║      Tu es curieux(se) ? 🧐          ║
║      J'aime ça !                      ║
║                                       ║
║      Contacte-moi pour collaborer !   ║
║                                       ║
╚═══════════════════════════════════════╝
`, 'color: #3b82f6; font-weight: bold; font-size: 12px;');

// Performance optimization: Lazy load images when implemented
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => imageObserver.observe(img));
}

