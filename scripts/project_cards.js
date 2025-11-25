document.addEventListener('DOMContentLoaded', function() {
    const filters = document.querySelectorAll('.projects-full__filter');
    const projects = document.querySelectorAll('.projects-full__card');
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.modal__close');
    
    let currentFocusElement = null;
    
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
            currentFocusElement = this;
            showProjectDetails(projectId);
        });
        
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const projectId = this.getAttribute('data-project');
                currentFocusElement = this;
                showProjectDetails(projectId);
            }
        });
    });
    
    closeBtn.addEventListener('click', function() {
        closeModal();
    });
    
    closeBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            closeModal();
        }
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    function showProjectDetails(projectId) {
        const modalBody = document.querySelector('.modal__body');
        let content = '';
        
        switch(projectId) {
            case '1':
                content = `
                    <h2 class="modal__title" id="modalTitle">Личный сайт</h2>
                    <p class="modal__tech"><strong style="color: var(--color-accent); text-decoration: underline">Технологии:</strong> HTML5, CSS3, JavaScript</p>
                    <p class="modal__desc">Полностью адаптивный личный сайт-портфолио с современным дизайном и анимациями.</p>
                    <div class="modal__links">
                        <a href="#" class="modal__link" tabindex="0">🌐 Живая версия</a>
                        <a href="#" class="modal__link" tabindex="0">💻 Исходный код</a>
                    </div>
                    <div class="modal__screenshots">
                        <img src="../images/project1_screen1.jpg" alt="Скриншот 1" class="modal__screenshot">
                        <img src="../images/project1_screen2.jpg" alt="Скриншот 2" class="modal__screenshot">
                    </div>
                `;
                break;
            case '2':
                content = `
                    <h2 class="modal__title" id="modalTitle">Todo-приложение</h2>
                    <p class="modal__tech"><strong style="color: var(--color-accent); text-decoration: underline">Технологии:</strong> JavaScript, LocalStorage</p>
                    <p class="modal__desc">Интерактивное приложение для управления задачами с возможностью добавления, удаления и отметки выполненных задач.</p>
                    <div class="modal__links">
                        <a href="#" class="modal__link" tabindex="0">🌐 Живая версия</a>
                        <a href="#" class="modal__link" tabindex="0">💻 Исходный код</a>
                    </div>
                    <div class="modal__screenshots">
                        <img src="../images/project2_screen1.jpg" alt="Скриншот 1" class="modal__screenshot">
                    </div>
                `;
                break;
            case '3':
                content = `
                    <h2 class="modal__title" id="modalTitle">Интернет-магазин</h2>
                    <p class="modal__tech"><strong style="color: var(--color-accent); text-decoration: underline">Технологии:</strong> React</p>
                    <p class="modal__desc">Полнофункциональный интернет-магазин с каталогом товаров, корзиной покупок, системой фильтрации и оформлением заказов. Проект демонстрирует работу с современным React стеком.</p>
                    <div class="modal__links">
                        <a href="#" class="modal__link" tabindex="0">🌐 Живая версия</a>
                        <a href="#" class="modal__link" tabindex="0">💻 Исходный код</a>
                    </div>
                    <div class="modal__screenshots">
                        <img src="../images/project3_screen1.jpg" alt="Скриншот 1" class="modal__screenshot">
                    </div>
                `;
                break;
            case '4':
                content = `
                    <h2 class="modal__title" id="modalTitle">Портфолио на Bootstrap</h2>
                    <p class="modal__tech"><strong style="color: var(--color-accent); text-decoration: underline">Технологии:</strong> Bootstrap 5, HTML5, CSS3, JavaScript, jQuery</p>
                    <p class="modal__desc">Адаптивное портфолио на фреймворке Bootstrap с современным дизайном, анимациями и интерактивными элементами. Проект демонстрирует навыки работы с популярными CSS-фреймворками.</p>
                    <div class="modal__links">
                        <a href="#" class="modal__link" tabindex="0">🌐 Живая версия</a>
                        <a href="#" class="modal__link" tabindex="0">💻 Исходный код</a>
                    </div>
                    <div class="modal__screenshots">
                        <img src="../images/project4_screen1.jpg" alt="Скриншот 1" class="modal__screenshot">
                    </div>
                `;
                break;
            default:
                content = `<h2 id="modalTitle">Информация о проекте</h2><p>Детали проекта загружаются...</p>`;
        }
        
        modalBody.innerHTML = content;
        modal.style.display = 'block';
        
        // 🔥 КРИТИЧЕСКИ ВАЖНО: Добавляем модалку в начало DOM
        document.body.appendChild(modal);
        
        modal.setAttribute('aria-hidden', 'false');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', 'modalTitle');
        
        // 🔥 СРАЗУ фокусируемся в модалку, не ждём
        setTimeout(() => {
            closeBtn.focus();
            trapFocus(modal);
            
            // 🔥 ДЕЛАЕМ ОСНОВНОЙ КОНТЕНТ НЕФОКУСИРУЕМЫМ
            makeMainContentUnfocusable();
        }, 50);
    }

    // 🔥 НОВАЯ ФУНКЦИЯ: Делает основной контент недоступным для фокуса
    function makeMainContentUnfocusable() {
        const focusableInMain = document.querySelectorAll(
            'main button, main [href], main input, main select, main textarea, main [tabindex]:not([tabindex="-1"])'
        );
        
        focusableInMain.forEach(el => {
            el.setAttribute('data-original-tabindex', el.getAttribute('tabindex') || '');
            el.setAttribute('tabindex', '-1');
        });
    }

    // 🔥 НОВАЯ ФУНКЦИЯ: Восстанавливает фокус основному контенту
    function restoreMainContentFocus() {
        const elementsWithOriginalTabindex = document.querySelectorAll('[data-original-tabindex]');
        
        elementsWithOriginalTabindex.forEach(el => {
            const original = el.getAttribute('data-original-tabindex');
            if (original === '') {
                el.removeAttribute('tabindex');
            } else {
                el.setAttribute('tabindex', original);
            }
            el.removeAttribute('data-original-tabindex');
        });
    }

    function closeModal() {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        
        // 🔥 ВОССТАНАВЛИВАЕМ фокус основному контенту
        restoreMainContentFocus();
        
        if (currentFocusElement) {
            currentFocusElement.focus();
        }
        
        removeFocusTrap();
    }

    // 🔥 ОБНОВЛЕННАЯ ловушка фокуса - работает только с модалкой
    function trapFocus(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        // Фильтруем только видимые элементы
        const visibleElements = Array.from(focusableElements).filter(el => 
            el.offsetWidth > 0 && el.offsetHeight > 0 && getComputedStyle(el).visibility !== 'hidden'
        );
        
        if (visibleElements.length === 0) return;
        
        const firstElement = visibleElements[0];
        const lastElement = visibleElements[visibleElements.length - 1];
        
        function handleKeydown(e) {
            if (e.key !== 'Tab') return;
            
            // 🔥 ПРЕДОТВРАЩАЕМ выход фокуса из модалки
            if (!modal.contains(document.activeElement)) {
                e.preventDefault();
                firstElement.focus();
                return;
            }
            
            if (e.shiftKey) {
                // Shift + Tab (назад)
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab (вперёд)
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
        
        modal._focusTrapHandler = handleKeydown;
        modal.addEventListener('keydown', handleKeydown);
        
        // 🔥 ДОПОЛНИТЕЛЬНО: Следим за фокусом
        modal._focusHandler = function(e) {
            if (!modal.contains(e.target) && modal.style.display === 'block') {
                e.preventDefault();
                firstElement.focus();
            }
        };
        document.addEventListener('focus', modal._focusHandler, true);
    }

    function removeFocusTrap() {
        if (modal._focusTrapHandler) {
            modal.removeEventListener('keydown', modal._focusTrapHandler);
            modal._focusTrapHandler = null;
        }
        if (modal._focusHandler) {
            document.removeEventListener('focus', modal._focusHandler, true);
            modal._focusHandler = null;
        }
    }
}); // ← 🔥 ЗДЕСЬ БЫЛА ПОТЕРЯННАЯ СКОБКА!