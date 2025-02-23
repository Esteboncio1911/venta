paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '29.99'
                },
                description: 'Título del Libro'
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            saveOrder(details);
            alert('¡Transacción completada! Gracias por tu compra.');
        });
    }
}).render('#paypal-button-container');

function saveOrder(details) {
    fetch('/api/save-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            orderID: details.id,
            customerInfo: details.payer,
            amount: details.purchase_units[0].amount.value
        })
    })
    .then(response => response.json())
    .then(data => console.log('Pedido guardado:', data))
    .catch(error => console.error('Error:', error));
}
