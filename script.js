// Animación suave para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Funcionalidad de compra de productos
const paypal = require('@paypal/checkout-server-sdk');

// Configuración de PayPal
let clientId = process.env.PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_CLIENT_SECRET;
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', async function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseFloat(productCard.querySelector('.price').textContent);
        
        try {
            // Crear orden de PayPal
            const order = await createPayPalOrder(productName, productPrice);
            
            // Guardar en base de datos
            const response = await fetch('/api/products/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: productName,
                    price: productPrice,
                    orderId: order.id
                })
            });
            
            if (response.ok) {
                showNotification('¡Producto añadido al carrito!', 'success');
                updateCartCount();
            }
        } catch (error) {
            showNotification('Error al procesar la compra', 'error');
            console.error('Error:', error);
        }
    });
});

// Manejo del formulario de contacto
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });
        
        if (response.ok) {
            showNotification('¡Mensaje enviado con éxito!', 'success');
            e.target.reset();
        }
    } catch (error) {
        showNotification('Error al enviar mensaje', 'error');
        console.error('Error:', error);
    }
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

async function createPayPalOrder(productName, price) {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'EUR',
                value: price.toString()
            },
            description: productName
        }]
    });

    const order = await client.execute(request);
    return order.result;
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const currentCount = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = currentCount + 1;
    }
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
