const router = require("express").Router();
const BookController = require('../controller/myBooks.controller');
router.post("/myBook",BookController.register);
router.get("/myBook",BookController.getBookByName);
router.get("/myBook/:email",BookController.getBooksByEmail);
router.get("/myBook/super/:email",BookController.getReqBySuperEmail);

router.post("/myBookStatus",BookController.getBooksByEmailAndStatus);

router.patch("/myBook", BookController.updateBook);
router.delete("/myBook", BookController.deleteBook);









module.exports = router;