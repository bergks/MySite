// scripts/menu.js
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    
    // Функция для переключения меню
    function toggleMenu() {
        const isOpen = nav.classList.contains('nav--open');
        
        if (isOpen) {
            // Закрываем меню
            closeMenu();
        } else {
            // Открываем меню
            openMenu();
        }
    }
    
    function openMenu() {
        nav.classList.add('nav--open');
        navToggle.classList.add('nav-toggle--active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку
    }
    
    function closeMenu() {
        nav.classList.remove('nav--open');
        navToggle.classList.remove('nav-toggle--active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Возвращаем прокрутку
    }
    
    // Обработчик клика по кнопке меню
    navToggle.addEventListener('click', toggleMenu);
    
    // Закрываем меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Закрываем меню при клике вне его области
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnToggle = navToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('nav--open')) {
            closeMenu();
        }
    });
    
    // Закрываем меню при нажатии Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && nav.classList.contains('nav--open')) {
            closeMenu();
        }
    });
    
    // Закрываем меню при изменении ориентации экрана
    window.addEventListener('orientationchange', function() {
        if (nav.classList.contains('nav--open')) {
            closeMenu();
        }
    });
});