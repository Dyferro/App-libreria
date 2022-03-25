//Importacion de paquetes
const express = require('express');
const bodyparser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const routes = require('./routes/book');


//Inicializar servidor y puerto
const app = express();
const port = 3000;

//Indica a express que en la ruta llamada api-docs vamos a servir a swagger
//La forma en la que lo va a servir es gracias al documento creado "swager.json"
//En estee doc almacenaremos toda la configuracion para swagger, algunas descripciones
// de nuestro proyecto, y todos los path y modelos que tenemos en nuestro proyecto
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Para poder obtener los datos que sean JSON
app.use(bodyparser.json());

//Rutas o End points
app.use('/api/v1', routes); //basePath configurado

//Listener
app.listen(port, () => {
    console.log(`Servidor exitosamente corriendo en http://localhost:${port}`);
});