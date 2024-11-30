const express = require('express');
const path = require('path');
const app = express();

// Configura las carpetas estáticas (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, '../html')));
app.use(express.static(path.join(__dirname, '../css')));
app.use(express.static(path.join(__dirname, '../images')));
app.use(express.static(path.join(__dirname, '../js')));

// Redirige todas las rutas no definidas a home.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/home.html'), (err) => {
    if (err) {
      res.status(404).send('Archivo no encontrado');
    }
  });
});

// Configura el puerto y arranca el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
