const selectedSeatsDisplay = document.querySelector('.butacas__seats--display');
const finalizeButton = document.querySelector('.pago__purchase--button'); // Botón "Finalizar Compra"

// Recuperar los asientos seleccionados del localStorage
const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];

// Mostrar los asientos seleccionados
if (selectedSeats.length > 0) {
    selectedSeatsDisplay.textContent = selectedSeats.join(', ');
} else {
    selectedSeatsDisplay.textContent = 'No has seleccionado ningún asiento.';
}

// Función para enviar la solicitud al endpoint para cada asiento
const finalizarCompra = async (event) => {
    event.preventDefault(); // Evitar la redirección inmediata

    if (selectedSeats.length === 0) {
        alert('No hay asientos seleccionados para finalizar la compra.');
        return;
    }

    const sesionId = 1; // ID de la sesión. Cambiar según corresponda.

    try {
        for (const seat of selectedSeats) {
            const endpoint = `https://localhost:7057/MinimalCinema/Sesion/1/asientos/${seat}`;

            const response = await fetch(endpoint, {
                method: 'PUT', // Cambiar a PUT
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ libre: false }), // Cambia el estado del asiento a no disponible
            });

            if (!response.ok) {
                console.error(`Error al actualizar el asiento ${seat}:`, response.statusText);
                alert(`Error al actualizar el asiento ${seat}.`);
                continue;
            }
        }

        alert('Compra finalizada con éxito. ¡Gracias por tu compra!');
        localStorage.removeItem('selectedSeats'); // Limpiar asientos seleccionados
        window.location.href = './home.html'; // Redirigir a la página principal

    } catch (error) {
        console.error('Error al finalizar la compra:', error);
        alert('Hubo un problema al procesar tu compra. Inténtalo de nuevo más tarde.');
    }
};

// Asociar la función al botón "Finalizar Compra"
finalizeButton.addEventListener('click', finalizarCompra);
