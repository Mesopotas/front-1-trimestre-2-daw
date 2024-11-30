const seatContainer = document.getElementById('seatContainer');
const selectedSeatsDisplay = document.querySelector('.butacas__seats--display');

let selectedSeats = [];

// Recuperar los asientos seleccionados del localStorage al cargar la página
const savedSeats = localStorage.getItem('selectedSeats');
if (savedSeats) {
    selectedSeats = JSON.parse(savedSeats);
    selectedSeatsDisplay.textContent = selectedSeats.join(', ');
}

const idSala = 1;

function fetchAsientos() {
    fetch(`https://localhost:7057/MinimalCinema/Sala/${idSala}`)
        .then(response => response.json())
        .then(data => {
            const asientos = data.asientos;
            seatContainer.innerHTML = '';

            asientos.forEach((asiento) => {
                const seat = document.createElement('div');
                seat.classList.add('seat');
                seat.textContent = asiento.numero;
                seat.dataset.id = asiento.numero; 
                if (asiento.estaReservado) {
                    seat.classList.add('ocupado');
                    seat.style.pointerEvents = 'none'; 
                }

                // Si el asiento está seleccionado, lo marcamos
                if (selectedSeats.includes(asiento.numero.toString())) {
                    seat.classList.add('selected');
                }

                seat.addEventListener('click', () => {
                    const seatNumber = asiento.numero.toString();

                    if (selectedSeats.includes(seatNumber)) {
                        selectedSeats = selectedSeats.filter((seat) => seat !== seatNumber);
                        seat.classList.remove('selected');
                    } else {
                        selectedSeats.push(seatNumber);
                        seat.classList.add('selected');
                    }

                    // Actualizar el contenido del div con los asientos seleccionados
                    selectedSeatsDisplay.textContent = selectedSeats.join(', ');

                    // Guardar los asientos seleccionados en localStorage
                    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
                });

                seatContainer.appendChild(seat);
            });
        })
        .catch(error => console.error('Error al obtener los asientos:', error));
}

fetchAsientos();
