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

// Implementación del banner de cookies
document.addEventListener('DOMContentLoaded', () => {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-content">
            <p>Esta web usa cookies</p>
            <div class="cookie-links">
                <a href="#cookie-policy" id="show-policy">Política de cookies</a>
            </div>
            <div class="cookie-buttons">
                <button id="accept-cookies">Aceptar</button>
                <button id="reject-cookies">Rechazar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(banner);
    
    // Política de cookies completa
    const policyModal = document.createElement('div');
    policyModal.className = 'cookie-policy-modal';
    policyModal.style.display = 'none';
policyModal.innerHTML = `
    <div class="policy-content">
        <h2>Política de Cookies</h2>
        
        <h3>1. ¿Qué son las cookies?</h3>
        <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestra web. Estos archivos permiten que el sitio web recuerde sus acciones y preferencias durante un período de tiempo, para que no tenga que volver a introducirlos cuando regrese al sitio o navegue de una página a otra.</p>
        
        <h3>2. Tipos de cookies que utilizamos</h3>
        <p>
            - Cookies técnicas: Necesarias para el funcionamiento básico del sitio.<br>
            - Cookies analíticas: Para analizar el comportamiento de los usuarios.<br>
            - Cookies de preferencias: Guardan sus preferencias de navegación.<br>
            - Cookies publicitarias: Para mostrar anuncios relevantes.<br>
            - Cookies de redes sociales: Permiten compartir contenido en redes sociales.
        </p>
        
        <h3>3. Finalidad de las cookies</h3>
        <p>Utilizamos cookies para mejorar su experiencia de navegación, analizar el tráfico del sitio, personalizar el contenido según sus preferencias, recordar sus datos de inicio de sesión y ofrecer funciones de redes sociales. También nos ayudan a entender cómo interactúan los usuarios con nuestro sitio web.</p>
        
        <h3>4. Gestión de cookies</h3>
        <p>Puede configurar su navegador para rechazar todas las cookies o para que le avise cuando se envíe una cookie. Puede eliminar las cookies existentes desde la configuración de su navegador. Tenga en cuenta que bloquear todas las cookies puede afectar al funcionamiento de este y otros sitios web que visite.</p>
        
        <h3>5. Cookies de terceros</h3>
        <p>Algunas cookies son colocadas por servicios de terceros que aparecen en nuestras páginas. Utilizamos servicios de Google Analytics, redes sociales y sistemas de pago que pueden establecer sus propias cookies para analizar el uso del sitio o facilitar la interacción con sus plataformas.</p>
        
        <h3>6. Actualizaciones de la política</h3>
        <p>Esta política de cookies se revisa y actualiza regularmente para reflejar cambios en nuestras prácticas de privacidad y requisitos legales. La última actualización se realizó el 1 de enero de 2024. Le recomendamos revisar esta política periódicamente para mantenerse informado sobre cómo utilizamos las cookies.</p>
        
        <h3>7. Contacto</h3>
        <p>Para cualquier duda sobre nuestra política de cookies, puede contactarnos a través de:<br>
        Email: privacy@libreriaelegante.com<br>
        Teléfono: +34 900 123 456<br>
        Dirección: Calle Principal 123, 28001 Madrid, España</p>
        
        <button id="close-policy">Cerrar</button>
    </div>
`;    
    document.body.appendChild(policyModal);
    
    // Event listeners
    document.getElementById('accept-cookies').onclick = () => {
        localStorage.setItem('cookiesAccepted', 'true');
        banner.remove();
    };
    
    document.getElementById('reject-cookies').onclick = () => {
        localStorage.setItem('cookiesAccepted', 'false');
        banner.remove();
    };
    
    document.getElementById('show-policy').onclick = (e) => {
        e.preventDefault();
        policyModal.style.display = 'block';
    };
    
    document.getElementById('close-policy').onclick = () => {
        policyModal.style.display = 'none';
    };
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

