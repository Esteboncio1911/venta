// Animación suave para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('.product-image').forEach(image => {
    image.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <img src="${image.querySelector('img').src}" alt="Libro">
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'block';
        
        modal.addEventListener('click', () => {
            modal.remove();
        });
    });
});

// Cookie banner initialization - place this at the very beginning of the file
window.onload = function() {
    // Create and show cookie banner immediately
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-content">
            <p>Usamos cookies para mejorar tu experiencia</p>
            <p>En Librería Elegante, utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación.</p>
            <div class="cookie-buttons">
                <button onclick="handleCookies('accept')">✅ Aceptar todas</button>
                <button onclick="handleCookies('settings')">⚙️ Configurar cookies</button>
                <button onclick="handleCookies('reject')">❌ Rechazar</button>
            </div>
        </div>
    `;
    document.body.appendChild(banner);
};

// Simplified cookie handling function
function handleCookies(action) {
    switch(action) {
        case 'accept':
            localStorage.setItem('cookiesAccepted', 'true');
            break;
        case 'reject':
            localStorage.setItem('cookiesAccepted', 'false');
            break;
        case 'settings':
            alert('Configuración de cookies (en desarrollo)');
            return;
    }
    document.querySelector('.cookie-banner').remove();
}

// Funciones de cookies
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Inicializar el banner de cookies cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    createCookieBanner();
});

// Funciones para los botones de cookies
function acceptAllCookies() {
    setCookie('cookiesAccepted', 'true', 365);
    document.querySelector('.cookie-banner').remove();
}

function rejectCookies() {
    setCookie('cookiesAccepted', 'false', 365);
    document.querySelector('.cookie-banner').remove();
}

function showCookieSettings() {
    // Aquí puedes añadir la lógica para mostrar las configuraciones detalladas
    alert('Configuración de cookies (en desarrollo)');
}

// Configuración de PayPal para cada botón
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Selecciona tu método de pago</h3>
                <div class="payment-methods">
                    <div id="paypal-button-container"></div>
                    <button class="payment-button">Tarjeta de Crédito</button>
                    <button class="payment-button">Transferencia Bancaria</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'block';
    });
});


// Manejo del formulario de contacto
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const message = e.target.message.value;

    if (name.length < 3) {
        showNotification('El nombre debe tener al menos 3 caracteres', 'error');
        return;
    }
    if (!email.includes('@') || !email.includes('.')) {
        showNotification('Por favor, introduce un email válido', 'error');
        return;
    }
    if (message.length < 10) {
        showNotification('El mensaje debe tener al menos 10 caracteres', 'error');
        return;
    }

    showNotification('Mensaje enviado correctamente', 'success');
    e.target.reset();
});

// Funciones auxiliares
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Animaciones al hacer scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
});

document.querySelectorAll('.product-card, .about-content, .contact-form')
    .forEach(element => observer.observe(element));


// Animación suave para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Configuración de PayPal para cada botón
document.querySelectorAll('.product-card').forEach((card, index) => {
    const price = card.querySelector('.price').textContent;
    const productName = card.querySelector('h3').textContent;
    
    paypal.Buttons({
        createOrder: (data, actions) => {
            return actions.order.create({
                purchase_units: [{
                    description: productName,
                    amount: {
                        value: price
                    }
                }]
            });
        },
        onApprove: (data, actions) => {
            return actions.order.capture().then(function(orderData) {
                showNotification(`¡Compra completada! ID de la orden: ${orderData.id}`, 'success');
            });
        }
    }).render(`#paypal-button-container-${index + 1}`);
});

// Manejo del formulario de contacto
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const message = e.target.message.value;

    if (name.length < 3) {
        showNotification('El nombre debe tener al menos 3 caracteres', 'error');
        return;
    }
    if (!email.includes('@') || !email.includes('.')) {
        showNotification('Por favor, introduce un email válido', 'error');
        return;
    }
    if (message.length < 10) {
        showNotification('El mensaje debe tener al menos 10 caracteres', 'error');
        return;
    }

    showNotification('Mensaje enviado correctamente', 'success');
    e.target.reset();
});

// Funciones auxiliares
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Animaciones al hacer scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
});

document.querySelectorAll('.product-card, .about-content, .contact-form')
    .forEach(element => observer.observe(element));

