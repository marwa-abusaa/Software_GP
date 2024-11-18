const router = require("express").Router();
const BookController = require('../controller/book.controller');
router.post("/book",BookController.register);
router.get("/book",BookController.getBookByName);
router.get("/books",BookController.getAllBooks);
router.patch("/book", BookController.updateBook);
router.delete("/book", BookController.deleteBook);
router.post("/bookSearch", BookController.searchBooks);



module.exports = router;