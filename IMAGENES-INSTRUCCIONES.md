# 📸 Instrucciones para las Imágenes del Portafolio

## 📁 Ubicación de las Imágenes

Todas las imágenes deben guardarse en la carpeta `images/` del proyecto.

## 🎨 Imágenes Requeridas

Guarda las siguientes imágenes con estos nombres exactos:

### 🖼️ Trabajos Principales (tus fotos reales)

1. **`surreal-portrait.jpg`**
   - **Imagen**: La mujer con elementos surrealistas y círculo
   - **Categoría**: Realismo
   - **Descripción**: "Técnica hiperrealista con elementos oníricos"

2. **`textured-face.jpg`**
   - **Imagen**: El rostro con textura agrietada y expresión intensa
   - **Categoría**: Realismo
   - **Descripción**: "Realismo con textura agrietada única"

3. **`elder-narrative.jpg`**
   - **Imagen**: El anciano con barba y elementos narrativos complejos
   - **Categoría**: Realismo
   - **Descripción**: "Composición compleja con elementos narrativos"

4. **`female-portrait.jpg`**
   - **Imagen**: El retrato femenino realista mirando hacia arriba
   - **Categoría**: Realismo
   - **Descripción**: "Realismo puro en blanco y negro"

5. **`spiritual-portrait.jpg`**
   - **Imagen**: El hombre con elementos geométricos y Buda meditando
   - **Categoría**: Espiritual
   - **Descripción**: "Geometría sagrada y meditación"

## 📐 Especificaciones Técnicas

### Resolución Recomendada
- **Ancho**: 800-1200px
- **Alto**: 800-1200px (proporción cuadrada o ligeramente rectangular)
- **Formato**: JPG o PNG
- **Calidad**: Alta (80-90% de compresión)

### Optimización
- Las imágenes se mostrarán a **350px de altura** en la galería
- Se aplican efectos de **contrast(1.1)** y **brightness(0.95)** por defecto
- En hover: **contrast(1.2)** y **brightness(1)** para resaltar

## 🎯 Pasos para Implementar

1. **Guarda las 5 imágenes** en la carpeta `images/` con los nombres exactos mencionados arriba

2. **Verifica que las rutas coincidan**:
   ```
   images/surreal-portrait.jpg
   images/textured-face.jpg
   images/elder-narrative.jpg
   images/female-portrait.jpg
   images/spiritual-portrait.jpg
   ```

3. **Abre la página web** y verifica que se muestren correctamente

4. **Prueba los filtros**:
   - "Todos" debe mostrar todas las imágenes
   - "Realismo" debe mostrar las primeras 4 imágenes + las adicionales
   - "Espiritual" debe mostrar solo el retrato con Buda

## 🎨 Personalización Adicional

### Para agregar más trabajos:

1. **Agrega la imagen** a la carpeta `images/`
2. **Edita `index.html`** y agrega un nuevo `gallery-item`:

```html
<div class="gallery-item" data-category="realism">
    <img src="images/tu-nueva-imagen.jpg" alt="Descripción del tatuaje">
    <div class="gallery-overlay">
        <h3>Título del Trabajo</h3>
        <p>Descripción técnica o artística</p>
    </div>
</div>
```

### Categorías disponibles:
- `realism` - Para trabajos realistas
- `spiritual` - Para trabajos con elementos espirituales/religiosos
- `geometric` - Para diseños geométricos
- `traditional` - Para estilos tradicionales

## 📱 Responsive

Las imágenes se adaptan automáticamente a:
- **Desktop**: Grid de 3-4 columnas
- **Tablet**: Grid de 2 columnas
- **Móvil**: 1 columna

## ✨ Efectos Visuales

La galería incluye:
- **Hover effects** con elevación y escala
- **Filtros de imagen** para mejorar contraste
- **Overlays** con degradado y blur
- **Transiciones suaves** entre estados
- **Bordes con glow** en hover

## 🔄 Mantenimiento

### Para actualizar imágenes:
1. Reemplaza la imagen en la carpeta `images/`
2. Mantén el mismo nombre de archivo
3. Refresca la página para ver los cambios

### Para cambiar descripciones:
1. Edita el archivo `index.html`
2. Busca el `gallery-item` correspondiente
3. Modifica el contenido de `<h3>` y `<p>`

---

## 🎯 Resultado Final

Con estas imágenes, tu portafolio mostrará:
- **Trabajos reales de alta calidad**
- **Especialización en realismo** claramente visible
- **Variedad técnica** desde retratos hasta composiciones complejas
- **Presentación profesional** con efectos modernos

¡Tu galería estará lista para impresionar a los clientes! 🎨 