// URLs para las APIs de Película y Horarios
const peliculaApiUrl = 'https://localhost:7057/MinimalCinema/Pelicula';
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

const urlParams = new URLSearchParams(window.location.search);
const idPelicula = urlParams.get('id')

// Llamadas a las funciones
cargarDetallesPelicula(idPelicula);

/*

// URL para el endpoint de la película con sala y horario
const horariosApiUrl = 'https://localhost:7057/MinimalCinema/Sesion/pelicula/1/salas-horarios'; // Cambia el ID de la película según sea necesario

// Elemento del DOM donde se actualizará el horario
const showtimeSpan = document.getElementById('showtime');

// Función para cargar el horario desde la API
const cargarHorario = async () => {
  try {
    // Llama al endpoint para obtener los horarios
    const response = await fetch(horariosApiUrl);

    if (!response.ok) {
      throw new Error(`Error al cargar el horario. Código de error: ${response.status}`);
    }

    const data = await response.json();

    // Verifica si los datos tienen el formato correcto
    if (!data || data.length === 0 || !data[0].horario || !data[0].horario.horario) {
      throw new Error('No se encontró un horario válido en los datos.');
    }

    // Toma el primer horario disponible y actualiza el contenido del <span>
    showtimeSpan.textContent = data[0].horario.horario; // Reemplaza el contenido con el primer horario

  } catch (error) {
    console.error('Error al cargar el horario:', error);
    showtimeSpan.textContent = 'Horario no disponible'; // Muestra un mensaje de error en caso de fallo
  }
};

// Llama a la función para cargar el horario
cargarHorario();

*/


// Función para cargar los horarios desde la API
const cargarHorarios = async (idPelicula) => {
  try {
    if (!idPelicula) {
      throw new Error('No se ha proporcionado un ID de película válido.');
    }

    // Construye la URL con el idPelicula
    const horariosApiUrl = `https://localhost:7057/MinimalCinema/Sesion/pelicula/${idPelicula}/salas-horarios`;

    // Llama al endpoint para obtener los horarios
    const response = await fetch(horariosApiUrl);

    if (!response.ok) {
      throw new Error(`Error al cargar los horarios. Código de error: ${response.status}`);
    }

    const data = await response.json();

    // Verifica si los datos tienen el formato correcto
    if (!data || data.length === 0) {
      throw new Error('No se encontraron horarios.');
    }

    // Limpia el contenedor antes de agregar los horarios
    showtimeContainer.innerHTML = '';

    // Itera sobre los datos y genera un botón para cada horario
    data.forEach(({ horario }) => {
      if (!horario || !horario.horario) {
        console.warn('Horario incompleto encontrado:', horario);
        return;
      }

      // Crear un botón dinámicamente
      const buttonHTML = `
        <a href="butacas.html">
          <button class="pelicula__showtime-button">
            <i class="fas fa-map-marker-alt"></i>
            <span>${horario.horario}</span>
          </button>
        </a>
      `;

      // Agregar el botón al contenedor
      showtimeContainer.insertAdjacentHTML('beforeend', buttonHTML);
    });

  } catch (error) {
    console.error('Error al cargar los horarios:', error);
    showtimeContainer.innerHTML = '<p>Error al cargar los horarios.</p>';
  }
};

// Llamadas a las funciones
cargarDetallesPelicula(idPelicula);
cargarHorarios(idPelicula);
