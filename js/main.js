document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    // Modals
    const bookingModal = document.getElementById('bookingModal');
    const serviceModal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');

    // 1. Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    // 2. Mobile Menu
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // 3. Service Pop-up Logic
    document.querySelectorAll('.menu-item.clickable').forEach(item => {
        item.addEventListener('click', () => {
            modalTitle.innerText = item.getAttribute('data-title');
            modalDesc.innerText = item.getAttribute('data-desc');
            serviceModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // 4. Booking Modal Logic
    document.querySelectorAll('.open-booking').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            serviceModal.classList.remove('active'); // Close service modal if open
            bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            navLinks.classList.remove('open');
        });
    });

    // 5. Close Modals
    const closeAll = () => {
        bookingModal.classList.remove('active');
        serviceModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click', closeAll));
    
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) closeAll();
    });

    // 6. Reveal Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});