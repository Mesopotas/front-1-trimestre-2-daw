const apiUrl = 'http://52.7.162.68:5131/MinimalCinema/Pelicula'; // Cambia a la IP pública y puerto correctos
const peliculasTrending = document.querySelector('.peliculas-trending');
const categoriaId = 6; // Cambia esto si es necesario para otras categorías

// Llamada a la API para obtener las películas
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

    // Filtra las películas por categoría
    const peliculasFiltradas = data.filter(pelicula => pelicula.id_Categoria === categoriaId);

    if (peliculasFiltradas.length > 0) {
      // Genera dinámicamente el HTML solo para las películas filtradas
      peliculasFiltradas.forEach(pelicula => {
        const peliculaElement = `
          <div class="peliculas-display" data-id="${pelicula.id_Pelicula}">
            <img src="${pelicula.caratula}" class="carrousel--imagen"/>
            <br>
            <p class="center">${pelicula.nombre}</p>
          </div>
        `;
        peliculasTrending.innerHTML += peliculaElement; // Añade la película al contenedor principal
      });

      // Agregar el evento de click para redirigir a la página de detalles
      document.querySelectorAll('.peliculas-display').forEach(peliculaDiv => {
        peliculaDiv.addEventListener('click', (event) => {
          const idPelicula = event.currentTarget.getAttribute('data-id');
          console.log('ID de la película clickeada:', idPelicula); // Verifica que estamos obteniendo el ID
          // Redirigir a la página de detalles con el ID de la película
          window.location.href = `pelicula.html?id=${idPelicula}`;
        });
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
