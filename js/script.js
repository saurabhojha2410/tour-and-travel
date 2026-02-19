/* =============================================
   SACRED TRAILS INDIA — JavaScript
   Firebase Integration + Animations + UX
   ============================================= */

// ============================================
// 🔥 FIREBASE CONFIGURATION
// ============================================
// IMPORTANT: Replace these with your own Firebase project config
// Go to: https://console.firebase.google.com
// 1. Create a new project (free Spark plan)
// 2. Add a Web App
// 3. Copy the config object below
// 4. Enable Firestore Database in Firebase Console
// ============================================

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
let db = null;
try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    console.log("✅ Firebase initialized successfully");
} catch (error) {
    console.warn("⚠️ Firebase not configured yet. Contact form will work in demo mode.", error.message);
}

// ============================================
// 📧 EMAILJS CONFIGURATION
// ============================================
// IMPORTANT: Set up free EmailJS account
// 1. Go to https://www.emailjs.com/ and sign up (free — 200 emails/month)
// 2. Add an Email Service (Gmail) and get your Service ID
// 3. Create an Email Template
// 4. Get your Public Key from Account > API Keys
// ============================================

const EMAILJS_PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log("✅ EmailJS initialized");
} catch (error) {
    console.warn("⚠️ EmailJS not configured yet.", error.message);
}

// ============================================
// PRELOADER
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2000);
});

// ============================================
// AOS INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        disable: 'mobile'
    });
});

// ============================================
// NAVBAR SCROLL EFFECTS
// ============================================
const navbar = document.getElementById('navbar');
const floatingCta = document.getElementById('floatingCta');
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar background
    if (scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Floating CTA visibility
    if (scrollY > 500) {
        floatingCta.classList.add('visible');
    } else {
        floatingCta.classList.remove('visible');
    }

    // Active nav link
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ============================================
// MOBILE NAV TOGGLE
// ============================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// ANIMATED COUNTER
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Ease out cubic
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const current = Math.round(target * easeOut);

                    counter.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }

                requestAnimationFrame(updateCounter);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

animateCounters();

// ============================================
// HERO PARTICLES (FLOATING DIYAS)
// ============================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random positioning and timing
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (6 + Math.random() * 6) + 's';

        // Random sizes
        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Warm colors for diyas
        const colors = ['#FFD700', '#FF6B35', '#FFA500', '#FFCC00', '#FF8C5E'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 ${size * 2}px ${particle.style.background}`;

        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ============================================
// SMOOTH SCROLL for anchor links
// ============================================
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

// ============================================
// CONTACT FORM SUBMISSION
// ============================================
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show loading state
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    submitBtn.disabled = true;

    // Collect form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        tour: document.getElementById('tourSelect').value,
        travelers: document.getElementById('travelers').value || 'Not specified',
        travelDate: document.getElementById('travelDate').value || 'Not specified',
        message: document.getElementById('message').value.trim() || 'No special requests',
        timestamp: new Date().toISOString(),
        source: 'website-contact-form'
    };

    let firebaseSaved = false;
    let emailSent = false;

    // 1. Save to Firebase Firestore
    try {
        if (db) {
            await db.collection('contact-enquiries').add({
                ...formData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            firebaseSaved = true;
            console.log("✅ Saved to Firebase Firestore");
        } else {
            console.log("ℹ️ Firebase not configured — skipping database save");
            console.log("📋 Form data:", formData);
        }
    } catch (error) {
        console.error("❌ Firebase save error:", error);
    }

    // 2. Send Email via EmailJS
    try {
        if (EMAILJS_PUBLIC_KEY !== "YOUR_EMAILJS_PUBLIC_KEY") {
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                to_email: "saurabhojha0136@gmail.com",
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone,
                tour: formData.tour,
                travelers: formData.travelers,
                travel_date: formData.travelDate,
                message: formData.message,
                timestamp: formData.timestamp
            });
            emailSent = true;
            console.log("✅ Email notification sent via EmailJS");
        } else {
            console.log("ℹ️ EmailJS not configured — email notification skipped");
        }
    } catch (error) {
        console.error("❌ EmailJS error:", error);
    }

    // Simulate delay for demo mode
    if (!firebaseSaved && !emailSent) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("📋 DEMO MODE — Form data captured:", formData);
    }

    // Show success
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';

    // Reset button state
    btnText.style.display = 'inline-flex';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
});

// Reset form function
function resetForm() {
    contactForm.reset();
    contactForm.style.display = 'flex';
    formSuccess.style.display = 'none';
}

// Make resetForm globally available
window.resetForm = resetForm;

// ============================================
// SET MINIMUM DATE TO TODAY
// ============================================
const travelDateInput = document.getElementById('travelDate');
if (travelDateInput) {
    const today = new Date().toISOString().split('T')[0];
    travelDateInput.setAttribute('min', today);
}

// ============================================
// LAZY LOADING IMAGES with fade-in
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';

                    img.onload = () => {
                        img.style.opacity = '1';
                    };

                    if (img.complete) {
                        img.style.opacity = '1';
                    }

                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
});

// ============================================
// PARALLAX EFFECT ON HERO
// ============================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-bg');
    if (hero) {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
});

// ============================================
// CONSOLE BRANDING
// ============================================
console.log(
    '%c🕉️ Sacred Trails India',
    'font-size: 24px; font-weight: bold; color: #FF6B35; text-shadow: 2px 2px #FFD700;'
);
console.log(
    '%cDiscover the Divine Essence of India',
    'font-size: 14px; color: #FFD700;'
);
console.log(
    '%c⚙️ To configure Firebase & EmailJS, update the config at the top of script.js',
    'font-size: 12px; color: #A0A0B0;'
);
