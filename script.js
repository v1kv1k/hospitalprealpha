// Функция для управления мобильным меню
document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  // Создаем элемент для размытия
  const blurOverlay = document.createElement('div');
  blurOverlay.className = 'blur-overlay';
  document.body.appendChild(blurOverlay);

  // Функция для открытия меню
  function openMenu() {
    menuButton.classList.add('active');
    navMenu.classList.add('active');
    blurOverlay.classList.add('active');
    body.style.overflow = 'hidden';
  }

  // Функция для закрытия меню
  function closeMenu() {
    menuButton.classList.remove('active');
    navMenu.classList.remove('active');
    blurOverlay.classList.remove('active');
    body.style.overflow = '';
  }

  // Обработчик клика по кнопке меню
  menuButton.addEventListener('click', function(e) {
    e.stopPropagation();
    if (menuButton.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Закрытие меню при клике на пункт меню
  const menuLinks = navMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Закрытие меню при клике на оверлей
  blurOverlay.addEventListener('click', closeMenu);

  // Закрытие меню при изменении размера окна
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
      closeMenu();
    }
  });

  // Новый код для анимации статистики при клике
  animateStatLinks();

  // Кнопка для відкриття модального вікна на головній сторінці
  const leaveReviewBtn = document.querySelector('.leave-review-btn');
  // Модальне вікно
  const modal = document.getElementById('reviewModal');
  // Кнопка закриття
  const closeBtn = document.getElementById('closeModal');
  // Форма відгуку
  const reviewForm = document.getElementById('reviewForm');
  
  // Поля форми
  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const reviewTextInput = document.getElementById('reviewText');
  
  // Елемент для повідомлень
  let statusMessage;
  
  // Відкриття модального вікна при кліку на кнопку
  if (leaveReviewBtn) {
    leaveReviewBtn.addEventListener('click', function() {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  // Закриття модального вікна при кліку на "хрестик"
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      clearForm();
    });
  }
  
  // Закриття при кліку поза модальним вікном
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        clearForm();
      }
    });
  }
  
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
    if (reviewForm) {
      reviewForm.reset();
      document.querySelectorAll('.error-message').forEach(el => el.remove());
      document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
      
      if (statusMessage) {
        statusMessage.remove();
        statusMessage = null;
      }
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
  
  // Додавання нового відгуку на сторінку
  function addReviewToPage(data) {
    const reviewsContainer = document.querySelector('.articles-grid');
    
    if (!reviewsContainer) return;
    
    const reviewElement = document.createElement('div');
    reviewElement.className = 'article-card';
    
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getFullYear()}`;
    
    reviewElement.innerHTML = `
      <div class="article-card-header">
        <h2>${data.name}</h2>
        <span class="review-date">${formattedDate}</span>
      </div>
      <p>${data.review}</p>
      <div class="article-author">
        <div class="author-info"></div>
        <a href="#" class="article-link">
          <div class="arrow-circle">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="currentColor"/>
            </svg>
          </div>
        </a>
      </div>
    `;
    
    // Додавання нового відгуку на початок списку
    if (reviewsContainer.firstChild) {
      reviewsContainer.insertBefore(reviewElement, reviewsContainer.firstChild);
    } else {
      reviewsContainer.appendChild(reviewElement);
    }
  }
  
  // Обробка відправки форми
  if (reviewForm) {
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
      
      // Симуляція відправки даних на сервер
      setTimeout(() => {
        // Тут у реальному проекті був би fetch або XMLHttpRequest запит
        
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
  }

  // Элементы для модального окна записи к врачу
  const appointmentModal = document.getElementById('appointmentModal');
  const appointmentBtns = document.querySelectorAll('.btn-primary');
  const closeAppointmentBtn = document.getElementById('closeAppointmentModal');
  const appointmentForm = document.getElementById('appointmentForm');
  const doctorSelect = document.getElementById('doctorSelect');
  const selectSelected = document.querySelector('.select-selected');
  const selectItems = document.querySelector('.select-items');
  const selectItemsList = document.querySelectorAll('.select-item');
  
  // Проверяем на странице врача и предварительно выбираем специализацию
  const doctorPageSpecialty = document.querySelector('.specialty');
  if (doctorPageSpecialty) {
    const specialty = doctorPageSpecialty.textContent.trim();
    selectSelected.textContent = `Лікар - ${specialty}`;
    selectItemsList.forEach(item => {
      if (item.dataset.specialty === specialty) {
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
    });
  }
  
  // Открытие модального окна по клику на кнопки "Записатись"
  appointmentBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      appointmentModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Закрытие модального окна
  closeAppointmentBtn.addEventListener('click', function() {
    appointmentModal.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  // Закрытие при клике вне модального окна
  appointmentModal.addEventListener('click', function(e) {
    if (e.target === appointmentModal) {
      appointmentModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Функционал выпадающего списка
  selectSelected.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('active');
    selectItems.classList.toggle('select-hide');
  });
  
  // Выбор элемента из списка
  selectItemsList.forEach(item => {
    item.addEventListener('click', function() {
      selectSelected.textContent = this.textContent;
      selectItemsList.forEach(el => el.classList.remove('selected'));
      this.classList.add('selected');
      selectItems.classList.add('select-hide');
      selectSelected.classList.remove('active');
    });
  });
  
  // Закрытие выпадающего списка при клике вне него
  document.addEventListener('click', function() {
    selectItems.classList.add('select-hide');
    selectSelected.classList.remove('active');
  });
  
  // Обработка отправки формы
  appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const doctor = selectSelected.textContent;
    
    // Здесь можно добавить код для отправки данных на сервер
    console.log('Запись к врачу:', { fullName, phone, doctor });
    
    // Показываем сообщение об успешной записи
    alert('Дякуємо за запис! Ми зв\'яжемося з вами найближчим часом.');
    
    // Закрываем модальное окно
    appointmentModal.classList.remove('active');
    document.body.style.overflow = '';
    appointmentForm.reset();
  });
  
  // Валидация телефона
  const phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    
    if (!this.value.startsWith('+380')) {
      this.value = '+380';
    } else if (value.length > 12) {
      this.value = '+380' + value.substring(3, 12);
    }
  });
});

// Функция для анимации статистических элементов
function animateStatLinks() {
  const statLinks = document.querySelectorAll('.stat-item h3 a');
  
  statLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Проверяем, это внутренняя ссылка (с #) или внешняя
      const href = this.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        
        // Находим целевой элемент
        const targetId = href;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Создаем новый элемент для более мощной подсветки
          const overlay = document.createElement('div');
          overlay.className = 'highlight-overlay';
          overlay.style.position = 'absolute';
          overlay.style.top = '0';
          overlay.style.left = '0';
          overlay.style.width = '100%';
          overlay.style.height = '100%';
          overlay.style.backgroundColor = 'rgba(122, 180, 105, 0.3)';
          overlay.style.borderRadius = '8px';
          overlay.style.zIndex = '-1';
          overlay.style.pointerEvents = 'none';
          
          // Добавляем элемент подсветки
          targetElement.style.position = 'relative';
          targetElement.appendChild(overlay);
          
          // Анимируем элемент статистики при клике с более выраженной пульсацией
          this.style.transition = 'transform 0.3s ease';
          this.style.transform = 'scale(1.2)';
          setTimeout(() => {
            this.style.transform = 'scale(1)';
          }, 300);
          
          // Плавно скроллим к элементу
          smoothScrollTo(targetElement);
          
          // Удаляем элемент подсветки через 3 секунды
          setTimeout(() => {
            if (targetElement.contains(overlay)) {
              targetElement.removeChild(overlay);
            }
          }, 3000);
        }
      }
    });
  });
}

// Функция для плавной прокрутки
function smoothScrollTo(element) {
  const headerOffset = 120; // Отступ для шапки
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}