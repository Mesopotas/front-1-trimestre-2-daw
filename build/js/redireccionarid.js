// URLs para las APIs de Película
const peliculaApiUrl = 'http://52.7.162.68:5131/MinimalCinema/Pelicula';

// Obtiene los elementos HTML donde se cargarán los datos
const caratulaElement = document.querySelector('.pelicula__movie-poster img');
const movieTitle = document.querySelector('.pelicula__movie-title');
const directorElement = document.querySelector('.director');
const actoresElement = document.querySelector('.actores');
const sinopsisElement = document.querySelector('.sinopsis');
const duracionElement = document.querySelector('.duracion');
const categoriaElement = document.querySelector('.categoria');

// Función para cargar los detalles de la película por ID
const cargarDetallesPelicula = async (idPelicula) => {
  try {
    if (!idPelicula) {
      throw new Error('No se ha proporcionado un ID de película válido.');
    }

    // Hacer un fetch para obtener los detalles de la película
    const response = await fetch(`${peliculaApiUrl}/${idPelicula}`);
    
    if (!response.ok) {
      throw new Error(`Error al cargar los detalles de la película. Código de error: ${response.status}`);
    }

    const pelicula = await response.json();

    // Verifica si la película tiene los datos necesarios
    if (!pelicula || !pelicula.nombre || !pelicula.caratula) {
      throw new Error('Datos incompletos de la película.');
    }

    // Asigna los datos obtenidos al HTML
    movieTitle.textContent = pelicula.nombre;
    directorElement.textContent = pelicula.directores;
    actoresElement.textContent = pelicula.actores;
    sinopsisElement.textContent = pelicula.descripcion;
    duracionElement.textContent = `${pelicula.duracion}h`;
    categoriaElement.textContent = pelicula.nombre_Categoria;

    if (pelicula.caratula) {
      caratulaElement.src = pelicula.caratula;
      caratulaElement.alt = `Carátula de ${pelicula.nombre}`;
    }

  } catch (error) {
    console.error('Error al cargar los detalles de la película:', error);
    // Mostrar un mensaje de error sin destruir el contenido de la página
    movieTitle.textContent = 'Error al cargar los detalles de la película';
    directorElement.textContent = '';
    actoresElement.textContent = '';
    sinopsisElement.textContent = 'No se pudo cargar la sinopsis.';
    duracionElement.textContent = '';
    categoriaElement.textContent = '';
    caratulaElement.src = ''; // Opcional: borra la imagen en caso de error
  }
};

// Obtener el ID de la película desde la URL
const params = new URLSearchParams(window.location.search);
const idPelicula = params.get('id'); // Este es el ID de la película en la URL

// Verifica que se ha obtenido el ID correctamente
console.log('ID de la película:', idPelicula);

// Llama a la función para cargar los detalles de la película solo si el ID es válido
if (idPelicula) {
  cargarDetallesPelicula(idPelicula);
} else {
  console.error('No se ha proporcionado un ID de película válido.');
  movieTitle.textContent = 'ID de película no válido';
  directorElement.textContent = '';
  actoresElement.textContent = '';
  sinopsisElement.textContent = 'No se pudo cargar la sinopsis.';
  duracionElement.textContent = '';
  categoriaElement.textContent = '';
  caratulaElement.src = ''; // Opcional: borra la imagen en caso de error
}
