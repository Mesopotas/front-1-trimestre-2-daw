/*

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
*/

const seatContainer = document.getElementById('seatContainer');
const selectedSeatsDisplay = document.querySelector('.butacas__seats--display');

// Array para almacenar los asientos seleccionados
let selectedSeats = [];

// Crear 100 asientos
for (let i = 1; i <= 100; i++) {
    const seat = document.createElement('div');
    seat.classList.add('seat');
    seat.textContent = i; // Número del asiento
    seat.addEventListener('click', () => {
        const seatNumber = i.toString();

        if (selectedSeats.includes(seatNumber)) {
            // Si ya está seleccionado, quítalo del array
            selectedSeats = selectedSeats.filter((seat) => seat !== seatNumber);
            seat.classList.remove('selected');
        } else {
            // Agregar asiento seleccionado
            selectedSeats.push(seatNumber);
            seat.classList.add('selected');
        }

        // Actualizar el contenido del div con los asientos seleccionados
        selectedSeatsDisplay.textContent = selectedSeats.join(', ');
    });
    seatContainer.appendChild(seat);
}
