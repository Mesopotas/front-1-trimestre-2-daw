const seatContainer = document.getElementById('seatContainer');

// Crear 100 asientos
for (let i = 1; i <= 100; i++) {
    const seat = document.createElement('div');
    seat.classList.add('seat');
    seat.textContent = i; // Número del asiento
    seat.addEventListener('click', () => {
        seat.classList.toggle('selected'); // Cambiar clase al hacer clic
    });
    seatContainer.appendChild(seat);
}