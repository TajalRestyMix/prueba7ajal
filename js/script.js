// Este script maneja la interactividad del sitio web, incluyendo efectos de scroll,
// desplazamiento suave y la lógica del formulario de reservaciones.

// Función para mostrar mensajes personalizados en lugar de alert()
function showCustomMessage(message) {
    // Crear un elemento de div para el mensaje
    const messageBox = document.createElement('div');
    messageBox.classList.add('custom-message-box'); // Clase para estilos CSS
    messageBox.textContent = message;

    // Estilos básicos para el mensaje (se pueden expandir en CSS)
    messageBox.style.position = 'fixed';
    messageBox.style.top = '50%';
    messageBox.style.left = '50%';
    messageBox.style.transform = 'translate(-50%, -50%)';
    messageBox.style.backgroundColor = 'var(--primary)'; // Usar color primario
    messageBox.style.color = 'var(--dark)'; // Texto oscuro
    messageBox.style.padding = '20px 30px';
    messageBox.style.borderRadius = '8px';
    messageBox.style.zIndex = '9999';
    messageBox.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    messageBox.style.textAlign = 'center';
    messageBox.style.fontSize = '1.1rem';
    messageBox.style.opacity = '0';
    messageBox.style.transition = 'opacity 0.3s ease-in-out';

    document.body.appendChild(messageBox);

    // Animación de aparición
    setTimeout(() => {
        messageBox.style.opacity = '1';
    }, 10); // Pequeño retraso para que la transición sea visible

    // Desaparecer después de 3 segundos
    setTimeout(() => {
        messageBox.style.opacity = '0';
        messageBox.addEventListener('transitionend', () => {
            messageBox.remove();
        });
    }, 3000);
}

// Efecto de scroll en el encabezado
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled'); // Añade la clase 'scrolled' si el scroll es mayor a 100px
    } else {
        header.classList.remove('scrolled'); // Remueve la clase 'scrolled' si no
    }
});

// Desplazamiento suave para los enlaces de anclaje de la navegación principal
document.querySelectorAll('nav ul li a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Previene el comportamiento por defecto del enlace

        const targetId = this.getAttribute('href'); // Obtiene el ID del destino (ej. "#inicio")
        const targetElement = document.querySelector(targetId); // Selecciona el elemento destino
        const headerOffset = document.querySelector('header').offsetHeight; // Altura del encabezado
        
        // Calcula la posición del elemento, ajustando por la altura del encabezado
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset - 10; // Ajuste adicional

        // Realiza el desplazamiento suave
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Actualiza la clase 'active' para los enlaces de la navegación principal
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active'); // Remueve 'active' de todos
        });
        this.classList.add('active'); // Añade 'active' al enlace clickeado
    });
});

// Desplazamiento suave y clase activa para la navegación de categorías (dentro del menú completo)
document.querySelectorAll('.category-nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Previene el comportamiento por defecto del enlace

        const targetId = this.getAttribute('href'); // Obtiene el ID del destino
        const targetElement = document.querySelector(targetId); // Selecciona el elemento destino
        // Altura del encabezado principal + altura de la navegación de categorías
        const headerOffset = document.querySelector('header').offsetHeight + document.querySelector('.category-nav').offsetHeight;
        
        // Calcula la posición, ajustando por ambas cabeceras pegajosas
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset - 10; // Ajuste adicional

        // Realiza el desplazamiento suave
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Actualiza la clase 'active-category' para los enlaces de categoría
        document.querySelectorAll('.category-nav-link').forEach(link => {
            link.classList.remove('active-category'); // Remueve 'active-category' de todos
        });
        this.classList.add('active-category'); // Añade 'active-category' al enlace clickeado
    });
});

// Resalta el enlace activo de la navegación principal al hacer scroll
const sections = document.querySelectorAll('section[id]'); // Todas las secciones con un ID
const mainNavLinks = document.querySelectorAll('nav ul li a'); // Todos los enlaces de la nav principal

function highlightMainNavOnScroll() {
    let current = ''; // Variable para almacenar la sección actual
    sections.forEach(section => {
        // Calcula la parte superior de la sección, ajustando por el encabezado
        const sectionTop = section.offsetTop - document.querySelector('header').offsetHeight - 20;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id'); // Si el scroll está en esta sección, se vuelve la actual
        }
    });

    mainNavLinks.forEach(link => {
        link.classList.remove('active'); // Remueve 'active' de todos los enlaces
        // Si el href del enlace contiene el ID de la sección actual, lo activa
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

// Escucha el evento de scroll y carga inicial para resaltar la navegación
window.addEventListener('scroll', highlightMainNavOnScroll);
document.addEventListener('DOMContentLoaded', highlightMainNavOnScroll); // Establece el enlace activo inicial al cargar la página

// Resalta el enlace activo de la navegación de categorías al hacer scroll
const menuSections = document.querySelectorAll('.full-menu .menu-section[id]'); // Secciones del menú con ID
const categoryNavLinks = document.querySelectorAll('.category-nav-link'); // Enlaces de la nav de categorías

function highlightCategoryNavOnScroll() {
    let currentCategory = ''; // Variable para la categoría actual
    menuSections.forEach(section => {
        // Calcula la parte superior de la sección del menú, ajustando por ambos encabezados pegajosos
        const sectionTop = section.offsetTop - document.querySelector('header').offsetHeight - document.querySelector('.category-nav').offsetHeight - 20;
        if (scrollY >= sectionTop) {
            currentCategory = section.getAttribute('id'); // Si el scroll está en esta categoría, se vuelve la actual
        }
    });

    categoryNavLinks.forEach(link => {
        link.classList.remove('active-category'); // Remueve 'active-category' de todos
        // Si el href del enlace contiene el ID de la categoría actual, lo activa
        if (link.getAttribute('href').includes(currentCategory)) {
            link.classList.add('active-category');
        }
    });
}

// Escucha el evento de scroll y carga inicial para resaltar la navegación de categorías
window.addEventListener('scroll', highlightCategoryNavOnScroll);
document.addEventListener('DOMContentLoaded', highlightCategoryNavOnScroll); // Establece el enlace activo inicial

// Manejo del envío del formulario de reservaciones
const reservationForm = document.querySelector('.reservation-form');
reservationForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Previene el envío por defecto del formulario

    // En lugar de alert(), usamos la función showCustomMessage()
    showCustomMessage('¡Gracias por tu reservación! Nos pondremos en contacto contigo para confirmar los detalles.');
    
    reservationForm.reset(); // Reinicia el formulario después del envío
});

// Establece la fecha mínima para el campo de fecha de reservación (hoy)
const today = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato YYYY-MM-DD
document.getElementById('date').setAttribute('min', today); // Establece el atributo 'min' del input de fecha
