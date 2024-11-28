// URLs para las APIs de Película y Horarios
const peliculaApiUrl = 'https://localhost:7057/MinimalCinema/Pelicula';
const horariosApiUrl = 'https://localhost:7057/MinimalCinema/Horario';
const categoriaApiUrl = 'https://localhost:7057/MinimalCinema/Pelicula/categoria';

// Obtiene elementos HTML donde se cargarán los datos
const caratulaElement = document.querySelector('.pelicula__movie-poster img');
const movieTitle = document.querySelector('.pelicula__movie-title');
const directorElement = document.querySelector('.director');
const actoresElement = document.querySelector('.actores');
const sinopsisElement = document.querySelector('.sinopsis');
const duracionElement = document.querySelector('.duracion');
const categoriaElement = document.querySelector('.categoria');
const showtimeContainer = document.querySelector('.pelicula__showtime-container');
const similarMoviesContainer = document.querySelector('.pelicula__similar-posters');

// Función para cargar los detalles de la película por ID
const cargarDetallesPelicula = async (idPelicula) => {
  try {
    const response = await fetch(`${peliculaApiUrl}/${idPelicula}`);
    if (!response.ok) {
      throw new Error('Error al cargar los detalles de la película.');
    }
    const pelicula = await response.json();

    // Muestra los datos completos de la película para depuración
    console.log('Película obtenida:', pelicula);

    // Asigna los datos obtenidos al HTML
    movieTitle.textContent = pelicula.nombre;
    directorElement.textContent = pelicula.directores;
    actoresElement.textContent = pelicula.actores;
    sinopsisElement.textContent = pelicula.descripcion;
    duracionElement.textContent = `${pelicula.duracion}h`;
    categoriaElement.textContent = pelicula.nombre_Categoria;

    // Cambia la imagen de la carátula
    if (pelicula.caratula) {
      caratulaElement.src = pelicula.caratula;
      caratulaElement.alt = `Carátula de ${pelicula.nombre}`;
    }

    // Verifica el idCategoria
    const categoriaId = pelicula.id_Categoria; // Obtén el idCategoria de la película principal
    console.log('idCategoria:', categoriaId); // Verifica que estamos recibiendo el idCategoria correctamente

    // Carga las películas similares usando el idCategoria de la película principal
    if (categoriaId) {
      cargarPeliculasSimilares(categoriaId);
    } else {
      console.error('idCategoria es undefined');
    }

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

// Función para cargar películas similares
const cargarPeliculasSimilares = async (categoriaId) => {
  try {
    // Verifica que categoriaId no sea undefined
    if (!categoriaId) {
      throw new Error('Categoria ID es undefined');
    }

    const response = await fetch(`${categoriaApiUrl}?idCategoria=${categoriaId}`); // Correcta construcción de la URL
    if (!response.ok) {
      throw new Error('Error al cargar las películas similares.');
    }
    const peliculasSimilares = await response.json();

    // Muestra las películas similares obtenidas
    console.log('Películas similares:', peliculasSimilares);

    // Limpia el contenedor y añade las películas similares al HTML
    similarMoviesContainer.innerHTML = '';
    peliculasSimilares.forEach((pelicula) => {
      const similarMovieCard = `
        <a href="pelicula.html?id=${pelicula.id_Pelicula}">
          <img src="${pelicula.caratula}" alt="Carátula de ${pelicula.nombre}" />
          <p class="center">${pelicula.nombre}</p>
        </a>
      `;
      similarMoviesContainer.innerHTML += similarMovieCard;
    });
  } catch (error) {
    console.error('Error al cargar las películas similares:', error);
    similarMoviesContainer.innerHTML = '<p>Error al cargar las películas similares.</p>';
  }
};

// ID de la película (puedes obtenerlo dinámicamente si es necesario)
//const idPelicula = 4; // Cambia este valor al ID deseado
const urlParams = new URLSearchParams(window.location.search);
const idPelicula = urlParams.get('id')

// Llamadas a las funciones
cargarDetallesPelicula(idPelicula);
cargarHorarios();

