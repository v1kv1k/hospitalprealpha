document.addEventListener('DOMContentLoaded', function() {
    // Открытие модального окна
    const openBtn = document.querySelector('.leave-review-btn');
    const modal = document.getElementById('reviewModal');
    const closeBtn = document.getElementById('closeModal');
    const reviewForm = document.getElementById('reviewForm');
    
    // Поля форми
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const reviewTextInput = document.getElementById('reviewText');
    
    // Елементи для відображення статусу
    let statusMessage;
    
    openBtn.addEventListener('click', function() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Забороняємо прокрутку сторінки
    });
    
    // Закриття модального вікна
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Повертаємо прокрутку
        clearForm();
    });
    
    // Закриття при кліку поза модальним вікном
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            clearForm();
        }
    });
    
    // Валідація електронної пошти
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Валідація полів форми
    function validateForm() {
        let isValid = true;
        
        // Очищення попередніх повідомлень про помилки
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Перевірка імені
        if (fullNameInput.value.trim() === '') {
            showError(fullNameInput, 'Будь ласка, введіть ваше ім\'я та прізвище');
            isValid = false;
        }
        
        // Перевірка email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Будь ласка, введіть ваш email');
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Будь ласка, введіть коректний email');
            isValid = false;
        }
        
        // Перевірка тексту відгуку
        if (reviewTextInput.value.trim() === '') {
            showError(reviewTextInput, 'Будь ласка, напишіть відгук');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Показати повідомлення про помилку
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        formGroup.appendChild(errorElement);
        input.classList.add('error');
    }
    
    // Очистити форму і повідомлення
    function clearForm() {
        reviewForm.reset();
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        
        if (statusMessage) {
            statusMessage.remove();
            statusMessage = null;
        }
    }
    
    // Показати повідомлення про статус відправки
    function showStatus(message, isSuccess) {
        // Видалити попереднє повідомлення, якщо воно існує
        if (statusMessage) {
            statusMessage.remove();
        }
        
        statusMessage = document.createElement('div');
        statusMessage.className = isSuccess ? 'status-success' : 'status-error';
        statusMessage.textContent = message;
        
        // Вставити повідомлення перед кнопкою відправки
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.parentElement.insertBefore(statusMessage, submitBtn);
    }
    
    // Показати індикатор завантаження
    function showLoading() {
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Відправка...';
    }
    
    // Приховати індикатор завантаження
    function hideLoading() {
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Залишити відгук';
    }
    
    // Обробка відправки форми
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Валідація форми перед відправкою
        if (!validateForm()) {
            return;
        }
        
        const formData = {
            name: fullNameInput.value.trim(),
            email: emailInput.value.trim(),
            review: reviewTextInput.value.trim()
        };
        
        // Показати індикатор завантаження
        showLoading();
        
        // Симуляція відправки даних на сервер (AJAX-запит)
        setTimeout(() => {
            // Тут у реальному сценарії ви б використовували fetch або XMLHttpRequest
            // Наприклад:
            /*
            fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                hideLoading();
                if (data.success) {
                    // Обробка успішної відповіді
                    showStatus('Дякуємо за ваш відгук!', true);
                    // Додавання нового відгуку на сторінку
                    addReviewToPage(formData);
                    // Закриття модального вікна через 2 секунди
                    setTimeout(() => {
                        modal.classList.remove('active');
                        document.body.style.overflow = '';
                        clearForm();
                    }, 2000);
                } else {
                    // Обробка помилки
                    showStatus('Помилка при відправці відгуку. Спробуйте ще раз.', false);
                }
            })
            .catch(error => {
                hideLoading();
                showStatus('Технічна помилка. Спробуйте пізніше.', false);
                console.error('Error:', error);
            });
            */
            
            // Симуляція успішної відповіді
            hideLoading();
            showStatus('Дякуємо за ваш відгук!', true);
            addReviewToPage(formData);
            
            // Закриття модального вікна через 2 секунди
            setTimeout(() => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                clearForm();
            }, 2000);
            
        }, 1500); // Симуляція затримки сервера
    });
    
    // Додавання нового відгуку на сторінку
    function addReviewToPage(data) {
        const reviewsContainer = document.querySelector('.reviews-container');
        
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review-item';
        
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getFullYear()}`;
        
        reviewElement.innerHTML = `
            <div class="review-header">
                <div class="review-author">${data.name}</div>
                <div class="review-date">${formattedDate}</div>
            </div>
            <div class="review-text">${data.review}</div>
        `;
        
        // Додавання нового відгуку на початок списку
        if (reviewsContainer.firstChild) {
            reviewsContainer.insertBefore(reviewElement, reviewsContainer.firstChild);
        } else {
            reviewsContainer.appendChild(reviewElement);
        }
    }
    
    // Додавання прикладів відгуків при завантаженні сторінки (для демонстрації)
    function addSampleReviews() {
        const reviews = [
            {
                name: 'Олена Петренко',
                date: '15.06.2023',
                text: 'Чудова клініка! Професійні лікарі та уважний персонал. Дуже задоволена результатами лікування.'
            },
            {
                name: 'Михайло Ковальчук',
                date: '03.05.2023',
                text: 'Користуюся послугами цієї клініки вже кілька років. Завжди якісне обслуговування, сучасне обладнання та привітний персонал.'
            },
            {
                name: 'Анастасія Іванова',
                date: '22.04.2023',
                text: 'Відвідувала стоматолога в цій клініці. Дуже професійний підхід і безболісне лікування. Рекомендую!'
            }
        ];
        
        const reviewsContainer = document.querySelector('.reviews-container');
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review-item';
            
            reviewElement.innerHTML = `
                <div class="review-header">
                    <div class="review-author">${review.name}</div>
                    <div class="review-date">${review.date}</div>
                </div>
                <div class="review-text">${review.text}</div>
            `;
            
            reviewsContainer.appendChild(reviewElement);
        });
    }
    
    // Додавання прикладів відгуків при завантаженні сторінки
    addSampleReviews();
}); 