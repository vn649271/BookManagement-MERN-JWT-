const {
    authJwt
} = require("../middlewares");
const controller = require("../controllers/book.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/books", [authJwt.verifyToken], controller.registerBook);
    app.get("/books", [authJwt.verifyToken], controller.getBooks);
    app.get("/books/:bookId", [authJwt.verifyToken], controller.getBook);
    app.post("/books/delete", [authJwt.verifyToken], controller.deleteBook);
};