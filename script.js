// Animación suave para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Create and show cookie notice immediately
    const cookieNotice = document.createElement('div');
    cookieNotice.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: white;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 10000;
    `;
    
    cookieNotice.innerHTML = `
        <p style="margin-bottom: 10px;">Esta web usa cookies</p>
        <button onclick="this.parentElement.remove()" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; margin-right: 10px; cursor: pointer;">Aceptar</button>
        <button onclick="showPolicy()" style="background: #2c3e50; color: white; border: none; padding: 5px 10px; cursor: pointer;">Ver política</button>
    `;
    
    document.body.appendChild(cookieNotice);
});

function showPolicy() {
    alert('Política de cookies: Este sitio utiliza cookies para mejorar tu experiencia de navegación.');
}

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

// Add this at the beginning of your script.js file
window.addEventListener('load', function() {
    // Create cookie banner
    const cookieBanner = document.createElement('div');
    cookieBanner.className = 'cookie-banner';
    cookieBanner.innerHTML = `
        <div class="cookie-content">
            <p>Esta web usa cookies</p>
            <button id="accept-cookies">Aceptar</button>
            <button id="show-policy">Política de cookies</button>
        </div>
    `;
    document.body.appendChild(cookieBanner);

    // Create policy modal
    const policyModal = document.createElement('div');
    policyModal.className = 'cookie-policy-modal';
    policyModal.style.display = 'none';
    policyModal.innerHTML = `
        <div class="policy-content">
            <h2>Política de Cookies</h2>
            <!-- Your existing policy content -->
            <button id="close-policy">Cerrar</button>
        </div>
    `;
    document.body.appendChild(policyModal);

    // Add event listeners
    document.getElementById('accept-cookies').addEventListener('click', function() {
        cookieBanner.style.display = 'none';
    });

    document.getElementById('show-policy').addEventListener('click', function() {
        policyModal.style.display = 'block';
    });

    document.getElementById('close-policy').addEventListener('click', function() {
        policyModal.style.display = 'none';
    });
});

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

