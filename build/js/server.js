const express = require('express');
const path = require('path');
const app = express();

// Configura el directorio estático
app.use(express.static(path.join(__dirname, 'build')));

// Maneja todas las rutas para devolver home.html como punto de entrada
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/html/home.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
