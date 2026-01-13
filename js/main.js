document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    // Modals
    const bookingModal = document.getElementById('bookingModal');
    const serviceModal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');

    // 1. Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    // 2. Mobile Menu
    const toggleMenu = () => {
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Auto-close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // 3. Service Popup
    document.querySelectorAll('.menu-item.clickable').forEach(item => {
        item.addEventListener('click', () => {
            modalTitle.innerText = item.getAttribute('data-title');
            modalDesc.innerText = item.getAttribute('data-desc');
            serviceModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // 4. Booking Logic
    document.querySelectorAll('.open-booking').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            serviceModal.classList.remove('active');
            bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            navLinks.classList.remove('open');
        });
    });

    // 5. Close Logic
    const closeAll = () => {
        bookingModal.classList.remove('active');
        serviceModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click', closeAll));
    window.addEventListener('click', (e) => { if (e.target.classList.contains('modal-overlay')) closeAll(); });

    // 6. Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});