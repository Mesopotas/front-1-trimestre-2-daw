const linkAPI = 'http://52.7.162.68:5131/MinimalCinema/Pelicula'; // API para obtener las películas
const swiperWrapper = document.querySelector('.swiper-wrapper'); // Elemento donde se insertan las películas en el carrusel

// Llamada a la API para obtener las películas
fetch(linkAPI)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al cargar las películas: ' + response.statusText);
    }
    return response.json(); // Convierte la respuesta a JSON
  })
  
  .then(data => {
    // Limpia el contenido existente del carrusel
    swiperWrapper.innerHTML = '';

    // Tomar solo las primeras 5 películas de la lista (o las que quieras)
    const peliculasLimitadas = data.slice(0, 5);  // Obtiene las primeras 5 películas

    // Iteramos sobre las 5 primeras películas
    peliculasLimitadas.forEach(pelicula => {
      const swiperSlide = document.createElement('div');
      swiperSlide.classList.add('swiper-slide');

      // Creamos el HTML para cada película con su carátula
      swiperSlide.innerHTML = `
        <a href="pelicula.html?id=${pelicula.id_Pelicula}">
          <img src="${pelicula.caratula}" alt="Carátula de ${pelicula.nombre}" />
        </a>
      `;

      // Añadimos el slide al carrusel
      swiperWrapper.appendChild(swiperSlide);
    });

    // Re- inicializar el carrusel para que se re-renderice correctamente
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  })
  .catch(error => {
    console.error('Error en la operación de fetch:', error);
    swiperWrapper.innerHTML = '<p>Error al cargar las películas. Por favor, inténtelo más tarde.</p>';
  });
