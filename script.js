// Estado global de la aplicación
const AppState = {
    currentDate: new Date(),
    selectedDate: null,
    selectedTime: null,
    selectedPackage: null,
    bookedSlots: new Set(),
    galleryFilter: 'all',
    isMobile: window.innerWidth < 768,
    navOpen: false
};

// Configuración
const CONFIG = {
    availableHours: ['9:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
    unavailableDates: [], // Fechas no disponibles
    maxDaysAhead: 60, // Máximo 60 días hacia adelante
    workingDays: [1, 2, 3, 4, 5, 6], // Lunes a Sábado (0 = Domingo)
    packages: {
        'DOWNPAYMENT': { name: 'DOWNPAYMENT', price: 200 },
        '1/2 HALF-SESSION': { name: '1/2 HALF-SESSION', price: 899 },
        'FULL DAY': { name: 'FULL DAY', price: 1399 },
        '2 DAYS BACK TO BACK': { name: '2 DAYS BACK TO BACK', price: 2299 }
    }
};

// Inicialización cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupMobileOptimizations();
});

// Optimizaciones específicas para móvil
function setupMobileOptimizations() {
    // Detectar cambios de orientación
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalcular dimensiones después del cambio de orientación
            AppState.isMobile = window.innerWidth < 768;
            adjustLayoutForMobile();
        }, 100);
    });

    // Detectar cambios de tamaño de ventana
    window.addEventListener('resize', function() {
        AppState.isMobile = window.innerWidth < 768;
        adjustLayoutForMobile();
    });

    // Prevenir zoom en inputs en iOS
    if (AppState.isMobile) {
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.fontSize = '16px'; // Prevenir zoom en iOS
            });
        });
    }

    // Mejorar scroll en móvil
    if (AppState.isMobile) {
        document.body.style.webkitOverflowScrolling = 'touch';
    }
}

function adjustLayoutForMobile() {
    const header = document.querySelector('.header');
    const nav = document.getElementById('nav');
    
    if (AppState.isMobile) {
        // Ajustes específicos para móvil
        if (header) {
            header.style.padding = '0.5rem 0';
        }
        
        // Cerrar navegación si está abierta al cambiar a móvil
        if (nav && nav.classList.contains('active')) {
            closeMobileNav();
        }
    } else {
        // Ajustes para desktop
        if (header) {
            header.style.padding = '1rem 0';
        }
    }
}

function initializeApp() {
    initNavigation();
    initGalleryFilters();
    initPackageSelection();
    initCalendar();
    initBookingForm();
    initModal();
    initImageModal();
    initAboutSlider();
    
    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Cerrar navegación móvil si está abierta
                if (AppState.navOpen) {
                    closeMobileNav();
                }
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Cerrar navegación al hacer scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (AppState.navOpen) {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                closeMobileNav();
            }, 100);
        }
    });
}

// Navegación móvil mejorada
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const body = document.body;
    
    if (navToggle && nav) {
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileNav();
        });
        
        // Cerrar al hacer click fuera del menú
        document.addEventListener('click', (e) => {
            if (AppState.navOpen && !nav.contains(e.target) && !navToggle.contains(e.target)) {
                closeMobileNav();
            }
        });
        
        // Cerrar menú al hacer click en un enlace
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileNav();
            });
        });

        // Prevenir scroll del body cuando el menú está abierto
        nav.addEventListener('touchmove', function(e) {
            if (AppState.navOpen) {
                e.preventDefault();
            }
        }, { passive: false });
    }
}

function toggleMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const body = document.body;
    
    if (AppState.navOpen) {
        closeMobileNav();
    } else {
        openMobileNav();
    }
}

function openMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const body = document.body;
    
    nav.classList.add('active');
    navToggle.classList.add('active');
    body.style.overflow = 'hidden';
    AppState.navOpen = true;
    
    // Animación de entrada para los enlaces
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        setTimeout(() => {
            link.style.transition = 'all 0.3s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
}

function closeMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const body = document.body;
    
    nav.classList.remove('active');
    navToggle.classList.remove('active');
    body.style.overflow = '';
    AppState.navOpen = false;
    
    // Resetear estilos de los enlaces
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.style.opacity = '';
        link.style.transform = '';
        link.style.transition = '';
    });
}

// Filtros de galería mejorados para móvil
function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Actualizar botones activos
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filtrar elementos con animación mejorada
            galleryItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                    item.style.animationDelay = `${index * 0.1}s`;
                } else {
                    item.style.display = 'none';
                }
            });
            
            AppState.galleryFilter = filter;
            
            // Scroll suave a la galería en móvil
            if (AppState.isMobile) {
                const gallerySection = document.getElementById('gallery');
                if (gallerySection) {
                    setTimeout(() => {
                        gallerySection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            }
        });
    });
}

// Selección de paquetes
function initPackageSelection() {
    const packageBtns = document.querySelectorAll('.package-btn');
    const totalAmount = document.querySelector('.total-amount');
    const packageSelectedInput = document.getElementById('packageSelected');
    
    packageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const price = parseInt(btn.getAttribute('data-price'));
            const packageName = btn.parentElement.querySelector('h3').textContent;
            
            // Remover selección previa
            packageBtns.forEach(b => b.classList.remove('selected'));
            packageBtns.forEach(b => b.textContent = 'Seleccionar');
            
            // Agregar selección actual
            btn.classList.add('selected');
            btn.textContent = 'Seleccionado ✓';
            
            // Actualizar precio total
            if (totalAmount) {
                totalAmount.textContent = `$${price.toFixed(2)}`;
            }
            
            // Actualizar formulario
            if (packageSelectedInput) {
                packageSelectedInput.value = `${packageName} - $${price.toFixed(2)}`;
            }
            
            AppState.selectedPackage = { name: packageName, price: price };
            
            // Scroll suave a la sección de reservas
            setTimeout(() => {
                scrollToBooking();
            }, 500);
        });
    });
}

// Sistema de calendario mejorado para móvil
function initCalendar() {
    renderCalendar();
    
    document.getElementById('prevMonth')?.addEventListener('click', () => {
        AppState.currentDate.setMonth(AppState.currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    document.getElementById('nextMonth')?.addEventListener('click', () => {
        AppState.currentDate.setMonth(AppState.currentDate.getMonth() + 1);
        renderCalendar();
    });
}

function renderCalendar() {
    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('monthYear');
    
    if (!calendar || !monthYear) return;
    
    const year = AppState.currentDate.getFullYear();
    const month = AppState.currentDate.getMonth();
    
    // Actualizar título del mes
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    monthYear.textContent = `${monthNames[month]} ${year}`;
    
    // Limpiar calendario
    calendar.innerHTML = '';
    
    // Agregar encabezados de días
    const dayHeaders = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    dayHeaders.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'day-header';
        dayElement.textContent = day;
        calendar.appendChild(dayElement);
    });
    
    // Primer día del mes y último día
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const today = new Date();
    
    // Días del mes anterior
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    // Renderizar 42 días (6 semanas)
    for (let i = 0; i < 42; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = currentDate.getDate();
        
        // Clases y estados
        if (currentDate.getMonth() !== month) {
            dayElement.classList.add('other-month');
        }
        
        if (currentDate < today || !isWorkingDay(currentDate) || isDateUnavailable(currentDate)) {
            dayElement.classList.add('disabled');
        } else {
            dayElement.addEventListener('click', () => selectDate(currentDate));
        }
        
        // Marcar día seleccionado
        if (AppState.selectedDate && 
            currentDate.toDateString() === AppState.selectedDate.toDateString()) {
            dayElement.classList.add('selected');
        }
        
        calendar.appendChild(dayElement);
    }
}

function selectDate(date) {
    AppState.selectedDate = date;
    AppState.selectedTime = null;
    
    // Actualizar UI
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
    });
    
    event.target.classList.add('selected');
    
    // Mostrar horarios disponibles
    renderTimeSlots(date);
    
    // Scroll a horarios en móvil
    if (AppState.isMobile) {
        const timeSlots = document.getElementById('timeSlots');
        if (timeSlots) {
            setTimeout(() => {
                timeSlots.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }
}

function renderTimeSlots(date) {
    const timeSlots = document.getElementById('timeSlots');
    const slotsGrid = document.getElementById('slotsGrid');
    
    if (!timeSlots || !slotsGrid) return;
    
    timeSlots.style.display = 'block';
    slotsGrid.innerHTML = '';
    
    CONFIG.availableHours.forEach(time => {
        const slotElement = document.createElement('div');
        slotElement.className = 'time-slot';
        slotElement.textContent = time;
        
        if (isSlotUnavailable(date, time)) {
            slotElement.classList.add('unavailable');
        } else {
            slotElement.addEventListener('click', () => selectTime(time));
        }
        
        // Marcar slot seleccionado
        if (AppState.selectedTime === time) {
            slotElement.classList.add('selected');
        }
        
        slotsGrid.appendChild(slotElement);
    });
    
    updateSelectedDateTime();
}

function selectTime(time) {
    AppState.selectedTime = time;
    
    // Actualizar UI
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    event.target.classList.add('selected');
    
    updateSelectedDateTime();
}

function updateSelectedDateTime() {
    const selectedDateTime = document.getElementById('selectedDateTime');
    
    if (AppState.selectedDate && AppState.selectedTime) {
        const dateStr = AppState.selectedDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        selectedDateTime.value = `${dateStr} a las ${AppState.selectedTime}`;
    } else {
        selectedDateTime.value = '';
    }
}

function isWorkingDay(date) {
    return CONFIG.workingDays.includes(date.getDay());
}

function isDateUnavailable(date) {
    return CONFIG.unavailableDates.some(unavailableDate => 
        unavailableDate.toDateString() === date.toDateString()
    );
}

function isSlotUnavailable(date, time) {
    const dateTimeKey = `${date.toDateString()}-${time}`;
    return AppState.bookedSlots.has(dateTimeKey);
}

// Formulario de reserva mejorado
function initBookingForm() {
    const form = document.getElementById('bookingForm');
    if (form) {
        form.addEventListener('submit', handleBookingSubmit);
        
        // Mejorar UX en móvil
        if (AppState.isMobile) {
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    // Scroll suave al input en móvil
                    setTimeout(() => {
                        this.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 300);
                });
            });
        }
    }
}

async function handleBookingSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        tattooType: formData.get('tattooType'),
        description: formData.get('description'),
        selectedDateTime: formData.get('selectedDateTime'),
        package: AppState.selectedPackage
    };
    
    // Validación
    const validation = validateBookingData(data);
    if (!validation.isValid) {
        showErrorMessage(validation.message);
        return;
    }
    
    // Simular envío
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    try {
        await submitBooking(data);
        showConfirmationModal(data);
        resetBookingForm();
    } catch (error) {
        showErrorMessage('Error al enviar la reserva. Por favor, intenta de nuevo.');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

function validateBookingData(data) {
    if (!data.name || data.name.trim().length < 2) {
        return { isValid: false, message: 'Por favor, ingresa tu nombre completo.' };
    }
    
    if (!data.email || !data.email.includes('@')) {
        return { isValid: false, message: 'Por favor, ingresa un email válido.' };
    }
    
    if (!data.phone || data.phone.trim().length < 8) {
        return { isValid: false, message: 'Por favor, ingresa un número de teléfono válido.' };
    }
    
    if (!data.tattooType) {
        return { isValid: false, message: 'Por favor, selecciona el tipo de tatuaje.' };
    }
    
    if (!data.selectedDateTime) {
        return { isValid: false, message: 'Por favor, selecciona una fecha y hora.' };
    }
    
    return { isValid: true };
}

async function submitBooking(data) {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simular éxito
    console.log('Reserva enviada:', data);
    return { success: true };
}

function resetBookingForm() {
    const form = document.getElementById('bookingForm');
    if (form) {
        form.reset();
    }
    
    AppState.selectedDate = null;
    AppState.selectedTime = null;
    AppState.selectedPackage = null;
    
    // Limpiar UI
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
    });
    
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    const timeSlots = document.getElementById('timeSlots');
    if (timeSlots) {
        timeSlots.style.display = 'none';
    }
    
    const selectedDateTime = document.getElementById('selectedDateTime');
    if (selectedDateTime) {
        selectedDateTime.value = '';
    }
}

// Modal mejorado
function initModal() {
    const modal = document.getElementById('confirmationModal');
    const closeBtn = modal?.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function showConfirmationModal(bookingData) {
    const modal = document.getElementById('confirmationModal');
    const bookingDetails = document.getElementById('bookingDetails');
    
    if (modal && bookingDetails) {
        bookingDetails.innerHTML = `
            <div style="text-align: left; margin: 1rem 0; padding: 1rem; background: rgba(185, 28, 28, 0.1); border-radius: 8px;">
                <p><strong>Nombre:</strong> ${bookingData.name}</p>
                <p><strong>Email:</strong> ${bookingData.email}</p>
                <p><strong>Teléfono:</strong> ${bookingData.phone}</p>
                <p><strong>Tipo de Tatuaje:</strong> ${bookingData.tattooType}</p>
                <p><strong>Fecha y Hora:</strong> ${bookingData.selectedDateTime}</p>
                ${bookingData.package ? `<p><strong>Paquete:</strong> ${bookingData.package.name}</p>` : ''}
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function showErrorMessage(message) {
    // Crear elemento de error temporal
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #dc2626;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 3000;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
        max-width: 90vw;
        text-align: center;
    `;
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Funciones de scroll mejoradas
function scrollToBooking() {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
        bookingSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Modal para imágenes de galería
function initImageModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imageModal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeModal = document.getElementById('closeModal');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img && modalImg) {
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                imageModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            imageModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
    
    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                imageModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
}

// Slider del about section
function initAboutSlider() {
    const slides = document.querySelectorAll('.about-slide');
    const prevBtn = document.getElementById('aboutPrev');
    const nextBtn = document.getElementById('aboutNext');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Auto-play en desktop
    if (!AppState.isMobile) {
        setInterval(nextSlide, 5000);
    }
    
    // Swipe para móvil
    if (AppState.isMobile) {
        let startX = 0;
        let endX = 0;
        
        const slider = document.querySelector('.about-slider');
        if (slider) {
            slider.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            slider.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                
                if (Math.abs(diff) > 50) { // Mínimo swipe de 50px
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                }
            });
        }
    }
}

// Cargar datos de ejemplo
function loadSampleData() {
    // Simular slots reservados
    const today = new Date();
    for (let i = 0; i < 5; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const randomTime = CONFIG.availableHours[Math.floor(Math.random() * CONFIG.availableHours.length)];
        const dateTimeKey = `${date.toDateString()}-${randomTime}`;
        AppState.bookedSlots.add(dateTimeKey);
    }
}

// Inicializar datos de ejemplo
loadSampleData();

// Efectos de scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--bg-dark)';
            header.style.backdropFilter = 'none';
        }
    }
});

// Animaciones de entrada para elementos visibles
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.gallery-item, .package-card, .contact-item, .event-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Funciones globales para uso en HTML
window.scrollToBooking = scrollToBooking;
window.closeModal = closeModal;
window.scrollToContact = scrollToContact; 