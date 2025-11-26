document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    function validateName() {
        const name = nameInput.value.trim();
        if (name === '') {
            showError(nameError, 'Пожалуйста, введите ваше имя');
            return false;
        } else if (name.length < 2) {
            showError(nameError, 'Имя должно содержать минимум 2 символа');
            return false;
        } else {
            hideError(nameError);
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            showError(emailError, 'Пожалуйста, введите ваш email');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailError, 'Пожалуйста, введите корректный email');
            return false;
        } else {
            hideError(emailError);
            return true;
        }
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        if (message === '') {
            showError(messageError, 'Пожалуйста, введите ваше сообщение');
            return false;
        } else if (message.length < 10) {
            showError(messageError, 'Сообщение должно содержать минимум 10 символов');
            return false;
        } else {
            hideError(messageError);
            return true;
        }
    }

    function showError(errorElement, message) {
        errorElement.textContent = message;
        input.setAttribute('aria-invalid', 'true');
        errorElement.classList.add('show');
    }

    function hideError(errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    function showMessage(message, type) {

        const existingMessage = contactForm.querySelector('.contacts__message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageElement = document.createElement('div');
        messageElement.className = `contacts__message contacts__message--${type}`;
        messageElement.textContent = message;
        messageElement.setAttribute('role', 'status');
        messageElement.setAttribute('aria-live', 'polite');
        messageElement.classList.add('show');
        
        contactForm.appendChild(messageElement);

        messageElement.setAttribute('tabindex', '0');



        setTimeout(() => {
            messageElement.classList.remove('show');
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.remove();
                }
            }, 300);
        }, 5000);
    }

    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);

    nameInput.addEventListener('input', function() {
        if (nameError.classList.contains('show')) {
            validateName();
        }
    });

    emailInput.addEventListener('input', function() {
        if (emailError.classList.contains('show')) {
            validateEmail();
        }
    });

    messageInput.addEventListener('input', function() {
        if (messageError.classList.contains('show')) {
            validateMessage();
        }
    });


    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();


        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {

            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim(),
                timestamp: new Date().toISOString()
            };

            console.log('Данные формы:', formData); 

            showMessage('Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.', 'success');

            contactForm.reset();
            
            hideError(nameError);
            hideError(emailError);
            hideError(messageError);
        } else {
            showMessage('Пожалуйста, исправьте ошибки в форме', 'error');
        }
    });

    let timeout;
    function debounceValidation(callback, delay) {
        clearTimeout(timeout);
        timeout = setTimeout(callback, delay);
    }

    nameInput.addEventListener('input', () => debounceValidation(validateName, 500));
    emailInput.addEventListener('input', () => debounceValidation(validateEmail, 500));
    messageInput.addEventListener('input', () => debounceValidation(validateMessage, 500));
});