//Importacion de paquetes
const express = require('express');
const bodyparser = require('body-parser');
const routes = require('./routes/book');


//Inicializar servidor y puerto
const app = express();
const port = 3000;

//Para poder obtener los datos que sean JSON
app.use(bodyparser.json());

//Rutas o End points
app.use(routes);

//Listener
app.listen(port, () => {
    console.log(`Servidor exitosamente corriendo en http://localhost:${port}`);
});