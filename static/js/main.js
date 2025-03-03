// Scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(element => observer.observe(element));
});

// Mobile menu
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarNav = document.querySelector('#navbarNav');

if (navbarToggler && navbarNav) {
    navbarToggler.addEventListener('click', () => {
        navbarNav.classList.toggle('show');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbarNav.contains(e.target) && !navbarToggler.contains(e.target)) {
            navbarNav.classList.remove('show');
        }
    });
}
