
//Parte de Destacadas

fetch('https://localhost:7057/MinimalCinema/Pelicula')
    .then(response => response.json())
    .then(peliculas => {
        const peliculasFiltradas = peliculas.filter(pelicula => pelicula.id_Categoria === 1);
        const peliculasTrending = document.querySelector('.categorias__poster-row');

        if (peliculasFiltradas.length > 0) {
            peliculasFiltradas.forEach(pelicula => {
                const peliculaElement = `
                    <a href="pelicula.html?id=${pelicula.id_Pelicula}">
                        <img src="${pelicula.caratula}" alt="${pelicula.nombre}">
                        <p class="categorias__poster-title">${pelicula.nombre}</p>
                    </a>
                `;
                peliculasTrending.innerHTML += peliculaElement; // Añade la película al contenedor
            });
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos de las películas:', error);
    });


//Parte de las categorias


 // URL de tu API
const apiUrl = 'https://localhost:7057/MinimalCinema/Pelicula';

// Selecciona los botones y el contenedor de películas
const botonesCategoria = document.querySelectorAll('.categorias__category-buttons button');
const contenedorPeliculas = document.querySelector('.categorias__movie-posters');

// Función para obtener las películas desde la API
async function obtenerPeliculas() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error al obtener películas: ${response.statusText}`);
        }
        const peliculas = await response.json();
        return peliculas;
    } catch (error) {
        console.error('Error al obtener películas:', error);
        return [];
    }
}

// Función para mostrar películas de una categoría seleccionada
async function mostrarPeliculas(categoriaSeleccionada) {
    const peliculas = await obtenerPeliculas();

    // Filtra las películas por categoría
    const peliculasFiltradas = peliculas.filter(
        pelicula => pelicula.nombre_Categoria.toLowerCase() === categoriaSeleccionada.toLowerCase()
    );

    // Limpia el contenedor de películas
    contenedorPeliculas.innerHTML = '';

    // Inserta las películas filtradas
    if (peliculasFiltradas.length > 0) {
        peliculasFiltradas.forEach(pelicula => {
            const peliculaElement = `
                <a href="pelicula.html?id=${pelicula.id_Pelicula}">
                    <img src="${pelicula.caratula}" alt="${pelicula.nombre}">
                    <p class="categorias__poster-title">${pelicula.nombre}</p>
                </a>
            `;
            contenedorPeliculas.innerHTML += peliculaElement;
        });
    } else {
        // Si no hay películas en esta categoría, muestra un mensaje
        contenedorPeliculas.innerHTML = '<p>No hay películas en esta categoría.</p>';
    }
}

// Agrega eventos a los botones para mostrar películas según la categoría seleccionada
botonesCategoria.forEach(boton => {
    boton.addEventListener('click', () => {
        const categoriaSeleccionada = boton.textContent.trim(); // Obtiene el texto del botón
        mostrarPeliculas(categoriaSeleccionada);
    });
});
