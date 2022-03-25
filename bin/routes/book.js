const express = require('express');
const app = express();

//Importar el Modelo
const Book = require('../models/Book');


app.get('/', (req, res) => {
    res.send('Boa tarde gente linda');
});

app.get('/book/list', (req, res) => {
    let book = new Book();
    let lista = book.find();
    res.json({ status: true, lista })
});

app.get('/book/:isbn', (req, res) => {
    let book = new Book();
    let isbn = req.params.isbn;
    let bookFounded = book.findISBN(isbn);
    res.json({ status: true, book: bookFounded })
});

app.post('/book/create', (req, res) => {
    let { title, pages, year, isbn, author } = req.body;

    let book = new Book(title, pages, year, isbn, author);

    let created = book.create(book);

    res.json({ status: true, message: created });
});

app.delete('/book/delete/:isbn', (req, res) => {
    let isbn = req.params.isbn;
    let book = new Book();
    let msg = book.delete(isbn);
    res.json({ status: true, message: msg });
});

app.put('/book/update', (req, res) => {
    let { title, pages, year, isbn, author } = req.body;
    let book = new Book(title, pages, year, isbn, author);
    //console.log(book);
    let msg = book.update(book);
    res.json({ status: true, message: msg });
});

module.exports = app;