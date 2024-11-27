const swiper = new Swiper('.swiper-container', {
  slidesPerView: 3, // Configuración predeterminada
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    390: { // Configuración para pantallas de 390px o menos
      slidesPerView: 1, // Solo una diapositiva visible
      centeredSlides: true, // Centrar la diapositiva activa
      spaceBetween: 10, // Ajustar espacio entre diapositivas
    },
    640: {
      slidesPerView: 1, // Una diapositiva para pantallas medianas
    },
    768: {
      slidesPerView: 2, // Dos diapositivas para pantallas mayores a 768px
    },
    1024: {
      slidesPerView: 3, // Tres diapositivas en pantallas grandes
    },
  },
});
