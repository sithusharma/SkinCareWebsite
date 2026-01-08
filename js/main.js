document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const bookingModal = document.getElementById('bookingModal');
    const closeBtn = document.getElementById('closeModal');

    // 1. Transparent to Solid Nav on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) { navbar.classList.add('scrolled'); } 
        else { navbar.classList.remove('scrolled'); }
    });

    // 2. Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        if (navLinks.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // 3. Modal Popup Logic
    document.querySelectorAll('.open-booking').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            navLinks.classList.remove('open'); // Close mobile menu if open
        });
    });

    closeBtn.addEventListener('click', () => {
        bookingModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // 4. Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});