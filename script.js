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

