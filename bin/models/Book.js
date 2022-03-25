const fs = require('fs');
let listbooks = [];

class Book {
    constructor(title, pages, year, isbn, author) {
        this.title = title;
        this.pages = pages;
        this.year = year;
        this.isbn = isbn;
        this.author = author;
    }

    create(book) {
        this.find();

        listbooks.push(book);

        this.write();

        return 'Saved';
    }

    write() {
        fs.writeFile('./storage/book.json', JSON.stringify(listbooks), (err) => {
            if (err) {
                throw new Error('Book not saved');
            }
        });
    }

    find() {
        let exist = fs.existsSync('./storage/book.json');

        if (exist) {
            listbooks = JSON.parse(fs.readFileSync('./storage/book.json'));
        }

        return listbooks;
    }

    findISBN(isbn) {
        let position = this.existBook(isbn);
        return listbooks[position];
    }

    existBook(isbn) {
        this.find();

        let position = listbooks.findIndex((e) => e.isbn === isbn);

        if (position === -1) {
            throw new Error('Book not found')
        }

        return position;
    }

    delete(isbn) {
        let position = this.existBook(isbn);

        listbooks.splice(position, 1);

        this.write();

        return 'Deleted';
    }

    update(book) {
        let position = this.existBook(book.isbn);

        let keys = Object.keys(book);

        keys.forEach((e) => {
            if (book[e] !== undefined) {
                listbooks[position][e] = book[e];
            }
        });

        this.write();

        return 'Successfully Updated';
    }
}

//Exportar mi Modelo
module.exports = Book;