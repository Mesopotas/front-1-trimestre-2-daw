/*
const apiUrl = 'https://localhost:7057/MinimalCinema/Pelicula';

// Selecciona el contenedor principal donde se agregarán las películas
const peliculasTrending = document.querySelector('.peliculas-trending');

// Llamada a la API
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al cargar las películas: ' + response.statusText);
    }
    return response.json(); // Convierte la respuesta a JSON
  })
  .then(data => {
    // Limpia el contenido existente
    peliculasTrending.innerHTML = '';

    // Recorremos las películas y generamos dinámicamente el HTML
    data.forEach(pelicula => {
      const peliculaElement = `
        <div class="peliculas-display">
            <a href="pelicula.html">
            <img src="${pelicula.caratula}" class="carrousel--imagen"/>
            <br>
            <p class="center">${pelicula.nombre}</p>
            </a>
        </div>
      `;
      peliculasTrending.innerHTML += peliculaElement; // Añade la película al contenedor principal
    });
  })
  .catch(error => {
    console.error('Error en la operación de fetch:', error);
    peliculasTrending.innerHTML = '<p>Error al cargar las películas. Por favor, inténtelo más tarde.</p>';
  });
*/


const apiUrl = 'https://localhost:7057/MinimalCinema/Pelicula';

const peliculasTrending = document.querySelector('.peliculas-trending');


const categoriaId = 6; 
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al cargar las películas: ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    // Limpia el contenido existente
    peliculasTrending.innerHTML = '';

    // Filtra las películas por categoría
    const peliculasFiltradas = data.filter(pelicula => pelicula.id_Categoria === categoriaId);

    if (peliculasFiltradas.length > 0) {
      // Genera dinámicamente el HTML solo para las películas filtradas
      peliculasFiltradas.forEach(pelicula => {
        const peliculaElement = `
          <div class="peliculas-display">
            <a href="pelicula.html">
              <img src="${pelicula.caratula}" class="carrousel--imagen"/>
              <br>
              <p class="center">${pelicula.nombre}</p>
            </a>
          </div>
        `;
        peliculasTrending.innerHTML += peliculaElement; // Añade la película al contenedor principal
      });
    } else {
      // Si no se encuentran películas para la categoría, muestra un mensaje
      peliculasTrending.innerHTML = `<p>No se encontraron películas para la categoría ID ${categoriaId}.</p>`;
    }
  })
  .catch(error => {
    console.error('Error en la operación de fetch:', error);
    peliculasTrending.innerHTML = '<p>Error al cargar las películas. Por favor, inténtelo más tarde.</p>';
  });
