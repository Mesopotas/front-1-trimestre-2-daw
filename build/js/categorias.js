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
