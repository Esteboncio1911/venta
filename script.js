// Animación suave para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Cookie Banner Implementation
window.onload = function() {
    createCookieBanner();
};

function createCookieBanner() {
    const cookieBanner = document.createElement('div');
    cookieBanner.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 10000;
        width: 300px;
    `;
    
    cookieBanner.innerHTML = `
        <p style="margin-bottom: 15px;">Esta web usa cookies</p>
        <button id="acceptCookies" style="background: #e74c3c; color: white; border: none; padding: 8px 15px; margin-right: 10px; cursor: pointer; border-radius: 5px;">Aceptar</button>
        <button id="showPolicy" style="background: #2c3e50; color: white; border: none; padding: 8px 15px; cursor: pointer; border-radius: 5px;">Política de cookies</button>
    `;
    
    document.body.appendChild(cookieBanner);
    
    // Event Listeners
    document.getElementById('acceptCookies').onclick = function() {
        cookieBanner.remove();
        localStorage.setItem('cookiesAccepted', 'true');
    };
    
    document.getElementById('showPolicy').onclick = showCookiePolicy;
}

function showCookiePolicy() {
    const policyModal = document.createElement('div');
    policyModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10001;
    `;
    
    policyModal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 10px; max-width: 800px; max-height: 80vh; overflow-y: auto;">
            <h2 style="margin-bottom: 20px;">Política de Cookies</h2>
            <div style="margin-bottom: 20px;">
                <h3>1. ¿Qué son las cookies?</h3>
                <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestra web.</p>
                
                <h3>2. Tipos de cookies que utilizamos</h3>
                <p>- Cookies técnicas<br>- Cookies analíticas<br>- Cookies de preferencias</p>
                
                <h3>3. Finalidad</h3>
                <p>Mejorar su experiencia de navegación y analizar el uso del sitio.</p>
            </div>
            <button id="closePolicy" style="background: #e74c3c; color: white; border: none; padding: 10px 20px; cursor: pointer; border-radius: 5px;">Cerrar</button>
        </div>
    `;
    
    document.body.appendChild(policyModal);
    
    document.getElementById('closePolicy').onclick = function() {
        policyModal.remove();
    };
}

// Product Image Modal
document.querySelectorAll('.product-image').forEach(image => {
    image.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        
        modal.innerHTML = `
            <img src="${image.querySelector('img').src}" style="max-width: 90%; max-height: 90%; object-fit: contain;">
        `;
        
        document.body.appendChild(modal);
        modal.addEventListener('click', () => modal.remove());
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact Form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Mensaje enviado correctamente');
        this.reset();
    });
}

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

