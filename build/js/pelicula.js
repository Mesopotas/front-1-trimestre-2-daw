// URLs para las APIs de Película y Horarios
const peliculaApiUrl = 'https://localhost:7057/MinimalCinema/Pelicula';
const horariosApiUrl = 'https://localhost:7057/MinimalCinema/Horario';

// Obtiene elementos HTML donde se cargarán los datos
const movieTitle = document.querySelector('.pelicula__movie-title');
const directorElement = document.querySelector('.director');
const actoresElement = document.querySelector('.actores');
const sinopsisElement = document.querySelector('.sinopsis');
const duracionElement = document.querySelector('.duracion');
const categoriaElement = document.querySelector('.categoria');
const showtimeContainer = document.querySelector('.pelicula__showtime-container');

// Función para cargar los detalles de la película por ID
const cargarDetallesPelicula = async (idPelicula) => {
  try {
    const response = await fetch(`${peliculaApiUrl}/${idPelicula}`);
    if (!response.ok) {
      throw new Error('Error al cargar los detalles de la película.');
    }
    const pelicula = await response.json();

    // Asigna los datos obtenidos al HTML
    movieTitle.textContent = pelicula.nombre;
    directorElement.textContent = pelicula.directores;
    actoresElement.textContent = pelicula.actores;
    sinopsisElement.textContent = pelicula.descripcion;
    duracionElement.textContent = `${pelicula.duracion}h`;
    categoriaElement.textContent = pelicula.nombre_Categoria;
  } catch (error) {
    console.error('Error al cargar los detalles de la película:', error);
  }
};

// Función para cargar los horarios
const cargarHorarios = async () => {
  try {
    const response = await fetch(horariosApiUrl);
    if (!response.ok) {
      throw new Error('Error al cargar los horarios.');
    }
    const horarios = await response.json();

    // Limpia el contenedor y añade los horarios al HTML
    showtimeContainer.innerHTML = '';
    horarios.forEach((horario) => {
      const horarioButton = `
        <a href="butacas.html">
          <button class="pelicula__showtime-button"><i class="fas fa-map-marker-alt"></i> ${horario.horario}</button>
        </a>
      `;
      showtimeContainer.innerHTML += horarioButton;
    });
  } catch (error) {
    console.error('Error al cargar los horarios:', error);
    showtimeContainer.innerHTML = '<p>Error al cargar los horarios.</p>';
  }
};

// ID de la película (puedes obtenerlo dinámicamente si es necesario)
const idPelicula = 1; // Cambia este valor al ID deseado

// Llamadas a las funciones
cargarDetallesPelicula(idPelicula);
cargarHorarios();
