class PhoneDropdown {
    constructor() {
        this.phoneBlock = document.querySelector('#phone-block');
        // Проверка на уже инициализированный список
        if (this.phoneBlock && !this.phoneBlock.classList.contains('initialized')) {
            this.isOpen = false;
            
            this.additionalPhones = [
                '(050) 456 78 90',
                '(073) 123 45 67',
                '(067) 987 65 43'
            ];

            this.init();
            // Отмечаем, что блок уже инициализирован
            this.phoneBlock.classList.add('initialized');
        }
    }

    init() {
        // Очищаем содержимое блока перед инициализацией
        if (this.phoneBlock) {
            this.restructurePhoneBlock();
            this.createDropdown();
            this.addEventListeners();
        }
    }

    restructurePhoneBlock() {
        const icon = this.phoneBlock.querySelector('.icon').cloneNode(true);
        const mainNumber = '(099) 198 21 02';
        
        this.phoneBlock.innerHTML = '';
        
        // Додаємо іконку
        this.phoneBlock.appendChild(icon);
        
        // Створюємо контейнер для номера і випадаючого списку
        const phoneContent = document.createElement('div');
        phoneContent.className = 'phone-content';
        phoneContent.style.width = '100%';
        phoneContent.style.position = 'relative';
        
        // Створюємо основний номер з стрілкою
        const mainPhone = document.createElement('div');
        mainPhone.id = 'main-phone';
        mainPhone.style.display = 'flex';
        mainPhone.style.justifyContent = 'space-between';
        mainPhone.style.width = '100%';
        mainPhone.innerHTML = `
            <span>${mainNumber}</span>
            <span id="toggle-arrow" style="margin-left: auto;">
                <img src="../images/arrow-down.svg" alt="arrow">
            </span>
        `;
        
        phoneContent.appendChild(mainPhone);
        this.phoneBlock.appendChild(phoneContent);
    }

    createDropdown() {
        // Создаем выпадающий список телефонов с абсолютным позиционированием
        this.phoneDropdown = document.createElement('div');
        this.phoneDropdown.id = 'phone-dropdown';
        this.phoneDropdown.className = 'phone-dropdown';
        
        // Стили для позиционирования поверх контента
        this.phoneDropdown.style.position = 'absolute';
        this.phoneDropdown.style.top = '100%'; // Размещаем под основным телефоном
        this.phoneDropdown.style.left = '0';
        this.phoneDropdown.style.right = '0';
        this.phoneDropdown.style.zIndex = '1500'; // Высокий z-index для отображения поверх всего
        this.phoneDropdown.style.background = 'white';
        this.phoneDropdown.style.borderRadius = '8px';
        this.phoneDropdown.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.15)';
        this.phoneDropdown.style.padding = '8px 0';
        this.phoneDropdown.style.display = 'none';
        this.phoneDropdown.style.marginTop = '5px';
        
        // Наполняем список телефонами
        this.additionalPhones.forEach(phone => {
            const phoneElement = document.createElement('p');
            phoneElement.textContent = phone;
            phoneElement.style.margin = '0';
            phoneElement.style.padding = '8px 20px';
            phoneElement.style.cursor = 'pointer';
            phoneElement.style.transition = 'background-color 0.2s ease, transform 0.2s ease';
            
            // Анимация при наведении
            phoneElement.addEventListener('mouseenter', () => {
                phoneElement.style.backgroundColor = '#f5f5f5';
                phoneElement.style.transform = 'translateX(5px)';
            });
            
            phoneElement.addEventListener('mouseleave', () => {
                phoneElement.style.backgroundColor = '';
                phoneElement.style.transform = '';
            });
            
            this.phoneDropdown.appendChild(phoneElement);
        });
        
        // Добавляем список в контейнер phone-content
        this.phoneBlock.querySelector('.phone-content').appendChild(this.phoneDropdown);
    }

    toggleDropdown() {
        this.isOpen = !this.isOpen;
        
        // Вращение стрелки
        const arrowImg = this.phoneBlock.querySelector('#toggle-arrow img');
        arrowImg.style.transform = this.isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
        arrowImg.style.transition = 'transform 0.3s ease';
        
        if (this.isOpen) {
            // Показываем список
            this.phoneDropdown.style.display = 'block';
            
            // Анимируем появление элементов списка
            this.animatePhoneItems();
        } else {
            // Скрываем список
            this.phoneDropdown.style.display = 'none';
        }
    }
    
    // Метод для анимации элементов списка
    animatePhoneItems() {
        const phoneItems = this.phoneDropdown.querySelectorAll('p');
        phoneItems.forEach((item, index) => {
            // Начальное состояние
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
            // Анимация с задержкой
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50 + (index * 30));
        });
    }

    addEventListeners() {
        const mainPhone = this.phoneBlock.querySelector('#main-phone');
        mainPhone.addEventListener('click', () => this.toggleDropdown());

        // Клик вне выпадающего списка закрывает его
        document.addEventListener('click', (event) => {
            if (!this.phoneBlock.contains(event.target) && this.isOpen) {
                this.toggleDropdown();
            }
        });
    }
}

// Проверяем, существует ли уже инициализированный экземпляр
if (!window.phoneDropdownInstance) {
    // Ініціалізація при завантаженні сторінки
    document.addEventListener('DOMContentLoaded', () => {
        window.phoneDropdownInstance = new PhoneDropdown();
    });
} 