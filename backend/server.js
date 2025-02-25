// Animación suave para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Procesamiento de órdenes y pagos
async function processOrder(productData, customerData) {
    try {
        const response = await fetch('/api/save-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productName: productData.name,
                amount: productData.price,
                customerInfo: customerData
            })
        });

        const data = await response.json();
        if (data.success) {
            showNotification('¡Pedido realizado con éxito!', 'success');
        } else {
            showNotification('Error al procesar el pedido', 'error');
        }
    } catch (error) {
        showNotification('Error de conexión', 'error');
    }
}

// Configuración de PayPal para cada producto
document.querySelectorAll('.product-card').forEach((card, index) => {
    const price = card.querySelector('.price').textContent.replace('€', '');
    const productName = card.querySelector('h3').textContent;
    
    card.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Datos de Envío</h3>
                <form id="shipping-form">
                    <input type="text" name="name" placeholder="Nombre completo" required>
                    <input type="email" name="email" placeholder="Email" required>
                    <input type="text" name="street" placeholder="Dirección" required>
                    <input type="text" name="city" placeholder="Ciudad" required>
                    <input type="text" name="country" placeholder="País" required>
                    <input type="text" name="postalCode" placeholder="Código Postal" required>
                    <button type="submit">Continuar con el pago</button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById('shipping-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const customerData = {
                name: formData.get('name'),
                email: formData.get('email'),
                address: {
                    street: formData.get('street'),
                    city: formData.get('city'),
                    country: formData.get('country'),
                    postalCode: formData.get('postalCode')
                }
            };
            
            processOrder({name: productName, price: price}, customerData);
            modal.remove();
        });
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

// Sistema de notificaciones
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
