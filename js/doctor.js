// Добавьте в существующий скрипт или создайте новый
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем индексы для анимации элементов списка
    const selectItemsList = document.querySelectorAll('.select-item');
    selectItemsList.forEach((item, index) => {
        item.style.setProperty('--index', index);
    });
    
    // Элементы для модального окна записи к врачу
    const appointmentModal = document.getElementById('appointmentModal');
    const appointmentBtns = document.querySelectorAll('.btn-primary');
    const closeAppointmentBtn = document.getElementById('closeAppointmentModal');
    const appointmentForm = document.getElementById('appointmentForm');
    
    // Элементы выпадающего списка
    const dropdownHeader = document.getElementById('dropdownHeader');
    const dropdownOptions = document.getElementById('dropdownOptions');
    const dropdownOptionsList = document.querySelectorAll('.dropdown-option');
    const selectedDoctorText = document.getElementById('selectedDoctor');
    
    // Устанавливаем специальность текущего врача, если мы на его странице
    const doctorPageSpecialty = document.querySelector('.specialty');
    if (doctorPageSpecialty) {
        const specialty = doctorPageSpecialty.textContent.trim();
        selectedDoctorText.textContent = `Лікар - ${specialty}`;
        
        // Выделяем соответствующую опцию
        dropdownOptionsList.forEach(option => {
            if (option.dataset.value === specialty) {
                option.classList.add('selected');
            }
        });
    }
    
    // Открытие модального окна
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
    
    // Открытие/закрытие выпадающего списка
    dropdownHeader.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        dropdownOptions.classList.toggle('show');
    });
    
    // Выбор опции из списка
    dropdownOptionsList.forEach(option => {
        option.addEventListener('click', function() {
            selectedDoctorText.textContent = this.textContent;
            dropdownOptionsList.forEach(el => el.classList.remove('selected'));
            this.classList.add('selected');
            dropdownOptions.classList.remove('show');
            dropdownHeader.classList.remove('active');
        });
    });
    
    // Закрытие выпадающего списка при клике вне него
    document.addEventListener('click', function() {
        dropdownOptions.classList.remove('show');
        dropdownHeader.classList.remove('active');
    });
    
    // Обработка отправки формы
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value;
        const phone = document.getElementById('phone').value;
        const doctor = selectedDoctorText.textContent;
        
        // Здесь можно добавить валидацию данных
        
        // Показываем сообщение об успешной записи
        alert('Дякуємо за запис! Ми зв\'яжемося з вами найближчим часом.');
        
        // Закрываем модальное окно и сбрасываем форму
        appointmentModal.classList.remove('active');
        document.body.style.overflow = '';
        this.reset();
        
        // Если нужно сбросить выбранного доктора
        if (!doctorPageSpecialty) {
            selectedDoctorText.textContent = 'Обрати лікаря';
            dropdownOptionsList.forEach(el => el.classList.remove('selected'));
        }
    });
    
    // Форматирование телефона
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        
        if (!this.value.startsWith('+380')) {
            this.value = '+380';
        } else if (value.length > 12) {
            this.value = '+380' + value.substring(3, 12);
        }
    });
    
    // Додаємо обробник для стрілки
    const arrowIcon = document.querySelector('.clickable-arrow');
    if (arrowIcon) {
        arrowIcon.addEventListener('click', function() {
            appointmentModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
});