//Realiza un request hacia la API
//supertest nos permite realizar peticiones http
const request = require('supertest');

//Importo las dependencias necesarias para la ejecucion de las pruebas
const app = require('../../app');
const Book = require('../../bin/models/Book');

//Variables auxiliares para las pruebas
const exampleBook = {
    title: "El Mago de Oz",
    pages: 40,
    year: 1992,
    isbn: "123-456-7890-Y1",
    author: "Victor Fleming"
};

const exampleUpdateBook = {
    "pages": 320,
    "year": 1852,
    "isbn": "123-456-7890-G1"
};

const isbn = "123-456-7890-Y1";

describe('Book', () => {
    let server;
    const port = 3000;

    //Lo que se ponga en esta funcion se ejecutara antes que los test
    beforeAll((done) => {
        server = app.listen(port);
        done();
    });

    //Lo que se ponga en esta funcion se ejecutara despues que los test
    afterAll((done) => {
        server.close();
        done();
    });

    //Prueba para obtener listado de libros
    test('Obtener listado', async() => {
        const res = await request(server)
            .get('/api/v1/book/list');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(expect.objectContaining({ lista: expect.any(Array) }));

    });

    //Prueba para crear un libro
    test('Crear un libro y retornar Exito', async() => {
        const res = await request(server)
            .post('/api/v1/book/create')
            .send(exampleBook);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({
            status: true,
            message: "Saved"
        })
    });

    //Prueba para obtener segun el isbn
    test('Obtener un libro segun un isbn', async() => {
        const res = await request(server)
            .get(`/api/v1/book/${isbn}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                book: expect.objectContaining({
                    title: expect.any(String),
                    pages: expect.any(Number),
                    year: expect.any(Number),
                    isbn: expect.any(String),
                    author: expect.any(String)
                }),
                status: true

            }));
    });

    //Prueba para eliminar
    test('Eliminar un libro', async() => {
        const res = await request(server)
            .delete(`/api/v1/book/delete/${isbn}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({
            status: true,
            message: "Deleted"
        })
    });

    //Prueba para Actualizar
    test('Actualizar un libro segun isbn', async() => {
        const res = await request(server)
            .put('/api/v1/book/update')
            .send(exampleUpdateBook);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({
            status: true,
            message: "Successfully Updated"
        })
    });
})