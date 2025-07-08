# 🎨 Elias Tattoo Studio - Página Web

Una página web moderna y completa para estudios de tatuajes con sistema de reservas integrado.

## ✨ Características Principales

### 🖼️ Galería de Trabajos
- Galería interactiva con filtros por categoría (Realismo, Tradicional, Geométrico, Anime)
- Efectos hover elegantes
- Imágenes responsivas de alta calidad
- Animaciones suaves al filtrar

### 📦 Sistema de Paquetes
- **DOWNPAYMENT**: $200.00 - Reserva tu cita con el anticipo
- **1/2 HALF-SESSION**: $899.00 - Sesión de 4 horas para tatuajes medianos
- **FULL DAY**: $1,399.00 - Sesión completa de 8 horas
- **2 DAYS BACK TO BACK**: $2,299.00 - Dos días consecutivos para piezas grandes

### 📅 Sistema de Reservas
- **Calendario interactivo** con navegación por meses
- **Horarios disponibles** de 9:00 AM a 6:00 PM
- **Días laborales**: Lunes a Sábado
- **Validación automática** de fechas y horarios
- **Confirmación visual** de la reserva

### 📱 Diseño Responsive
- Optimizado para móviles, tablets y desktop
- Navegación móvil con menú hamburguesa
- Interfaz táctil amigable

### 🎨 Diseño Moderno
- Paleta de colores profesional (rojo, negro, blanco)
- Efectos visuales modernos (glassmorphism, gradientes)
- Animaciones fluidas y micro-interacciones
- Tipografía profesional (Poppins)

## 🚀 Cómo Usar

### Para Clientes:

1. **Explorar Trabajos**
   - Navegar por la galería
   - Usar filtros para ver estilos específicos
   - Ver detalles de cada trabajo

2. **Seleccionar Paquete**
   - Elegir entre los 4 paquetes disponibles
   - Ver precio actualizado en tiempo real
   - El sistema automáticamente lleva al calendario

3. **Reservar Cita**
   - Seleccionar fecha en el calendario
   - Elegir horario disponible
   - Completar formulario con información personal
   - Confirmar reserva

4. **Confirmación**
   - Recibir confirmación visual inmediata
   - Ver resumen completo de la cita

### Para el Tatuador:

1. **Gestión de Horarios**
   - Modificar horarios disponibles en `CONFIG.availableHours`
   - Agregar fechas no disponibles en `CONFIG.unavailableDates`
   - Cambiar días laborales en `CONFIG.workingDays`

2. **Personalización**
   - Actualizar información de contacto
   - Cambiar imágenes de la galería
   - Modificar precios de paquetes
   - Personalizar colores en CSS

## 📁 Estructura de Archivos

```
ELIASTATTOO/
├── index.html          # Página principal
├── styles.css          # Estilos y diseño
├── script.js           # Funcionalidad JavaScript
└── README.md           # Documentación
```

## ⚙️ Configuración

### Horarios Disponibles
```javascript
// En script.js, línea ~12
availableHours: ['9:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00']
```

### Días Laborales
```javascript
// En script.js, línea ~15
workingDays: [1, 2, 3, 4, 5, 6] // Lunes a Sábado
```

### Precios de Paquetes
```javascript
// En script.js, línea ~16-21
packages: {
    'DOWNPAYMENT': { name: 'DOWNPAYMENT', price: 200 },
    '1/2 HALF-SESSION': { name: '1/2 HALF-SESSION', price: 899 },
    'FULL DAY': { name: 'FULL DAY', price: 1399 },
    '2 DAYS BACK TO BACK': { name: '2 DAYS BACK TO BACK', price: 2299 }
}
```

### Información de Contacto
Actualizar en `index.html` sección `#contact`:
- Dirección
- Teléfono
- Email
- Horarios de atención
- Redes sociales

## 🎨 Personalización de Diseño

### Colores Principales
```css
/* En styles.css, línea ~8-18 */
:root {
    --primary-color: #B91C1C;      /* Rojo principal */
    --secondary-color: #1F2937;    /* Gris oscuro */
    --accent-color: #DC2626;       /* Rojo acento */
    --text-light: #F9FAFB;         /* Texto claro */
    --text-dark: #111827;          /* Texto oscuro */
    --bg-dark: #0F172A;            /* Fondo oscuro */
    --bg-light: #F8FAFC;           /* Fondo claro */
}
```

### Cambiar Logo
1. Actualizar el texto en `index.html` línea ~20-22
2. Modificar estilos del logo en `styles.css` línea ~50-65

### Agregar Nuevas Imágenes
1. Reemplazar URLs de Unsplash con tus propias imágenes
2. Mantener proporciones 400x400 para galería
3. Usar 300x200 para paquetes

## 🔧 Integración con Backend

Para conectar con tu sistema de base de datos:

1. **Función de Envío** (línea ~320 en script.js)
```javascript
async function submitBooking(data) {
    // Reemplazar con tu API endpoint
    const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return response.json();
}
```

2. **Cargar Citas Existentes**
```javascript
// Agregar función para cargar citas desde tu base de datos
async function loadExistingBookings() {
    const response = await fetch('/api/bookings');
    const bookings = await response.json();
    
    bookings.forEach(booking => {
        const slotKey = `${booking.date}-${booking.time}`;
        AppState.bookedSlots.add(slotKey);
    });
}
```

## 📧 Notificaciones por Email

Para implementar confirmaciones por email:

1. Integrar servicio como EmailJS, SendGrid o Nodemailer
2. Modificar función `showConfirmationModal()` para enviar email
3. Agregar plantillas de email profesionales

## 🔐 Seguridad

Consideraciones de seguridad:

1. **Validación del lado del servidor** para todos los datos
2. **Sanitización** de inputs del usuario
3. **Rate limiting** para prevenir spam
4. **HTTPS** obligatorio en producción
5. **Validación de fechas** en el backend

## 📱 Redes Sociales

Actualizar enlaces en la sección de contacto:
- Instagram: Mostrar últimos trabajos
- Facebook: Página business
- TikTok: Videos del proceso
- YouTube: Tutoriales y timelapse

## 🚀 Optimizaciones

### SEO
- Agregar meta tags apropiados
- Optimizar imágenes (WebP, lazy loading)
- Implementar schema markup para negocio local

### Performance
- Minificar CSS y JavaScript
- Optimizar imágenes
- Implementar CDN
- Comprimir archivos

### Accesibilidad
- Agregar atributos alt a imágenes
- Mejorar contraste de colores
- Implementar navegación por teclado
- Agregar ARIA labels

## 🆘 Soporte

Para modificaciones o problemas:

1. **Backup** siempre antes de hacer cambios
2. **Probar** en móvil y desktop
3. **Validar** HTML y CSS
4. **Verificar** JavaScript en consola del navegador

## 📄 Licencia

Este proyecto está diseñado específicamente para Elias Tattoo Studio. Todos los derechos reservados.

---

**🎯 ¡Tu página web está lista para recibir clientes!**

La página es completamente funcional y lista para usar. Solo necesitas personalizar la información de contacto, agregar tus propias imágenes y conectar con tu sistema de base de datos si lo deseas. 