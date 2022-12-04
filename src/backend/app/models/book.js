const mongoose = require("mongoose");

const Book = mongoose.model(
    "Book",
    new mongoose.Schema({
        title: String,
        description: String,
        author: String,
        published_at: String,
    })
);

module.exports = Book;