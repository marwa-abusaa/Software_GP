const router = require("express").Router();
const CommentController = require('../controller/comment.controller');
router.post("/comment",CommentController.addComment);
router.post("/canComment",CommentController.canIComment);
router.get("/comment",CommentController.getComentByBookName);
router.delete("/comment",CommentController.deleteCommentById);
router.patch("/comment",CommentController.updateComment);



module.exports = router;