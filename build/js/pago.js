const selectedSeatsDisplay = document.querySelector('.butacas__seats--display'); // El div donde mostrar los asientos seleccionados

// Recuperar los asientos seleccionados desde localStorage
const savedSeats = localStorage.getItem('selectedSeats');

if (savedSeats) {
    const selectedSeats = JSON.parse(savedSeats);
    selectedSeatsDisplay.textContent = `Tus asientos seleccionados: ${selectedSeats.join(', ')}`;
} else {
    selectedSeatsDisplay.textContent = 'No has seleccionado ningún asiento.';
}
