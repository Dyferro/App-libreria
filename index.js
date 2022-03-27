const app = require('./app');
const port = 3000;

//Listener
app.listen(port, () => {
    console.log(`Servidor exitosamente corriendo en http://localhost:${port}`);
});