// Dark/Light Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved user preference or use system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Hamburger menu toggle
const menuToggle = document.getElementById('menuToggle');
const mainMenu = document.getElementById('mainMenu');
menuToggle.addEventListener('click', () => {
    mainMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// تشغيل صوت عند النقر على أي أيقونة
function playClickSound() {
    const clickSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3');
    clickSound.play();
}

// إضافة صوت النقر لكل العناصر القابلة للنقر
document.addEventListener('DOMContentLoaded', function() {
    const clickableElements = document.querySelectorAll('a, button, .service-card, .team-member, .gallery-item, .color-option');
    clickableElements.forEach(element => {
        element.addEventListener('click', function() {
            playClickSound();
        });
    });
});

// عرض شعار الموقع عند التحميل
window.addEventListener('load', function() {
    const splash = document.createElement('div');
    splash.style.position = 'fixed';
    splash.style.top = '0';
    splash.style.left = '0';
    splash.style.width = '100%';
    splash.style.height = '100%';
    splash.style.backgroundColor = 'var(--primary-color)';
    splash.style.display = 'flex';
    splash.style.flexDirection = 'column';
    splash.style.justifyContent = 'center';
    splash.style.alignItems = 'center';
    splash.style.zIndex = '9999';
    splash.style.transition = 'opacity 1s ease-out';
    const logo = document.createElement('div');
    logo.innerHTML = `
        <div style="font-size: 3rem; color: white; font-weight: bold; margin-bottom: 1rem;">
            <i class="fas fa-ruler-combined"></i>
        </div>
        <div style="font-size: 2rem; color: white; text-align: center;">
            الاتحاد للتصميمات<br>والاستشارات الهندسية
        </div>
    `;
    splash.appendChild(logo);
    document.body.appendChild(splash);
    // إخفاء الشعار بعد 3 ثواني
    setTimeout(function() {
        splash.style.opacity = '0';
        setTimeout(function() {
            splash.remove();
        }, 1000);
    }, 3000);
});

// إنشاء نموذج طلب استشارة مجانية
function createConsultationModal() {
    const modal = document.createElement('div');
    modal.id = 'consultation-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
    modal.style.display = 'none';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '99999';
    modal.style.flexDirection = 'column';
    modal.innerHTML = `
        <div style="background-color: white; padding: 2rem; border-radius: 8px; width: 90%; max-width: 500px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3 style="color: var(--primary-color); font-size: 1.5rem;">طلب استشارة مجانية</h3>
                <button id="close-consultation" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
            </div>
            <form id="consultation-form" style="display: flex; flex-direction: column; gap: 1rem;">
                <input type="text" placeholder="الاسم الكامل" required style="padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
                <input type="email" placeholder="البريد الإلكتروني" required style="padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
                <input type="tel" placeholder="رقم الهاتف" required style="padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
                <select style="padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="">نوع الاستشارة المطلوبة</option>
                    <option value="معماري">استشارة معمارية</option>
                    <option value="إنشائي">استشارة إنشائية</option>
                    <option value="كهرباء">استشارة كهربائية</option>
                    <option value="ميكانيكا">استشارة ميكانيكية</option>
                </select>
                <textarea placeholder="وصف مختصر لاحتياجاتك" style="padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px; height: 100px; resize: vertical;"></textarea>
                <button type="submit" style="background-color: var(--secondary-color); color: white; padding: 0.8rem; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">إرسال الطلب</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    // إظهار وإخفاء النموذج
    document.getElementById('close-consultation').addEventListener('click', function() {
        modal.style.display = 'none';
    });
    // إغلاق النموذج عند النقر خارج المحتوى
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    return modal;
}

// إضافة أيقونة طلب استشارة ثابتة
function addConsultationIcon() {
    const consultationIcon = document.createElement('div');
    consultationIcon.id = 'consultation-icon';
    consultationIcon.innerHTML = '<i class="fas fa-headset"></i>';
    consultationIcon.style.position = 'fixed';
    consultationIcon.style.bottom = '30px';
    consultationIcon.style.left = '30px';
    consultationIcon.style.width = '60px';
    consultationIcon.style.height = '60px';
    consultationIcon.style.backgroundColor = 'var(--accent-color)';
    consultationIcon.style.color = 'white';
    consultationIcon.style.borderRadius = '50%';
    consultationIcon.style.display = 'flex';
    consultationIcon.style.justifyContent = 'center';
    consultationIcon.style.alignItems = 'center';
    consultationIcon.style.fontSize = '1.5rem';
    consultationIcon.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    consultationIcon.style.cursor = 'pointer';
    consultationIcon.style.zIndex = '9999';
    consultationIcon.style.transition = 'all 0.3s';
    consultationIcon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    consultationIcon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    document.body.appendChild(consultationIcon);
    return consultationIcon;
}

// تهيئة النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const modal = createConsultationModal();
    const icon = addConsultationIcon();
    // فتح النموذج عند النقر على الأيقونة
    icon.addEventListener('click', function() {
        modal.style.display = 'flex';
    });
    // معالجة إرسال النموذج
    document.getElementById('consultation-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('شكراً لطلبك! سيتصل بك أحد مهندسينا خلال 24 ساعة.');
        modal.style.display = 'none';
    });
}); 