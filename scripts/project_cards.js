document.addEventListener('DOMContentLoaded', function() {
    const filters = document.querySelectorAll('.projects-full__filter');
    const projects = document.querySelectorAll('.projects-full__card');
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.modal__close');
    
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            filters.forEach(f => f.classList.remove('projects-full__filter--active'));
            this.classList.add('projects-full__filter--active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projects.forEach(project => {
                if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
                    project.style.display = 'flex';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });

    const projectButtons = document.querySelectorAll('.projects-full__card-btn');
    
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            showProjectDetails(projectId);
        });
    });
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    function showProjectDetails(projectId) {
        const modalBody = document.querySelector('.modal__body');
        let content = '';
        
        switch(projectId) {
            case '1':
                content = `
                    <h2 class="modal__title">Личный сайт</h2>
                    <p class="modal__tech"><strong style="color: var(--color-accent); text-decoration: underline">Технологии:</strong> HTML5, CSS3, JavaScript</p>
                    <p class="modal__desc">Полностью адаптивный личный сайт-портфолио с современным дизайном и анимациями.</p>
                    <div class="modal__links">
                        <a href="#" class="modal__link">🌐 Живая версия</a>
                        <a href="#" class="modal__link">💻 Исходный код</a>
                    </div>
                    <div class="modal__screenshots">
                        <img src="../images/project1_screen1.jpg" alt="Скриншот 1" class="modal__screenshot">
                        <img src="../images/project1_screen2.jpg" alt="Скриншот 2" class="modal__screenshot">
                    </div>
                `;
                break;
            case '2':
                content = `
                    <h2 class="modal__title">Todo-приложение</h2>
                    <p class="modal__tech"><strong style="color: var(--color-accent); text-decoration: underline">Технологии:</strong> JavaScript, LocalStorage</p>
                    <p class="modal__desc">Интерактивное приложение для управления задачами с возможностью добавления, удаления и отметки выполненных задач.</p>
                    <div class="modal__links">
                        <a href="#" class="modal__link">🌐 Живая версия</a>
                        <a href="#" class="modal__link">💻 Исходный код</a>
                    </div>
                    <div class="modal__screenshots">
                        <img src="../images/project2_screen1.jpg" alt="Скриншот 1" class="modal__screenshot">
                    </div>
                `;
                break;
            case '3':
                content = `
                    <h2 class="modal__title">Интернет-магазин</h2>
                    <p class="modal__tech"><strong style="color: var(--color-accent); text-decoration: underline">Технологии:</strong> React</p>
                    <p class="modal__desc">Полнофункциональный интернет-магазин с каталогом товаров, корзиной покупок, системой фильтрации и оформлением заказов. Проект демонстрирует работу с современным React стеком..</p>
                    <div class="modal__links">
                        <a href="#" class="modal__link">🌐 Живая версия</a>
                        <a href="#" class="modal__link">💻 Исходный код</a>
                    </div>
                    <div class="modal__screenshots">
                        <img src="../images/project3_screen1.jpg" alt="Скриншот 1" class="modal__screenshot">
                    </div>
                `;
                break;

            case '4':
                content = `
                    <h2 class="modal__title">Портфолио на Bootstrap</h2>
                <p class="modal__tech"><strong>Технологии:</strong> Bootstrap 5, HTML5, CSS3, JavaScript, jQuery</p>
                <p class="modal__desc">Адаптивное портфолио на фреймворке Bootstrap с современным дизайном, анимациями и интерактивными элементами. Проект демонстрирует навыки работы с популярными CSS-фреймворками.</p>
                    <div class="modal__links">
                        <a href="#" class="modal__link">🌐 Живая версия</a>
                        <a href="#" class="modal__link">💻 Исходный код</a>
                    </div>
                    <div class="modal__screenshots">
                        <img src="../images/project4_screen1.jpg" alt="Скриншот 1" class="modal__screenshot">
                    </div>
                `;
                break;
            default:
                content = `<h2>Информация о проекте</h2><p>Детали проекта загружаются...</p>`;
        }
        
        modalBody.innerHTML = content;
        modal.style.display = 'block';
    }
});