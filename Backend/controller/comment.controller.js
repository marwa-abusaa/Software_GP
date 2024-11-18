const CommentServices = require('../services/comment.service');
const userServices = require('../services/user.services');
const bookServices = require('../services/book.service');


exports.addComment = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const { email, commentText, rate, bookName } = req.body;

        // Check for missing parameters
        if (!email || !commentText || !rate || !bookName ) {
            return res.status(400).json({ status: false, error: 'All fields are required' }); // 400 Bad Request
        }

        // Check if the user exists
        const user = await userServices.checkUser(email);
        const book = await bookServices.getBookByName(bookName); // check if the book exists
        if (!user) {
            return res.status(409).json({ status: false, error: `the email ${email} is not registered in the database` }); // 409 Conflict
        }
        if (!book) {
            return res.status(409).json({ status: false, error: `the Book ${bookName} is not registered in the database` }); // 409 Conflict
        }

        console.log(`Checking if user ${email} has commented on ${bookName}`);
        if (await CommentServices.checkIfUserCommentToBook(email, bookName) != null) {         
            return res.status(410).json({ status: false, error: `You already added a comment to this book, you can edit it` }); // 410 Gone
        }

        // Register the comment
        const response = await CommentServices.addNewComment(email, commentText, rate, bookName);
        res.status(201).json({ status: true, success: 'The comment added successfully' }); // 201 Created
    } catch (err) {
        console.log("---> err -->", err);
        next(err); // Forward error to the error handler
    }
}



exports.getComentByBookName = async (req, res, next) => {
    console.log("gating all comment now");
    const { bookName } = req.query;  // Extract book name from query parameters
    console.log("name is " + bookName);

    // Check if the book name is provided
    if (!bookName) {
        return res.status(400).json({ status: false, error: 'Book Name is required' }); // 400 Bad Request
    }

    // Check if the book exists
    try {
        const book = await bookServices.getBookByName(bookName);
        if (!book) {
            return res.status(404).json({ status: false, error: 'Book does not exist' }); // 404 Not Found
        }

        // Retrieve comments for the specified book
        const comments = await CommentServices.getCommentsByBookName(bookName);  // Call the service method

        // Check if there are comments for the book
        if (comments.length === 0) {
            return res.status(404).json({ status: false, error: 'No comments found for this book' }); // 404 Not Found
        }

        // Send the comments as response
        console.log("Successfully retrieved all the comments details");
        res.status(200).json({ status: true, data: comments }); // 200 OK
    } catch (error) {
        console.error(error);
        next(error); // Forward error to the error handler
    }
}

    
exports.deleteCommentById = async (req, res, next) => {
    const { id } = req.query;  // Extract comment ID from query parameters
    console.log("Deleting comment with ID: " + id);

    // Check if the comment ID is provided
    if (!id) {
        return res.status(400).json({ status: false, error: 'Comment ID is required' }); // 400 Bad Request
    }

    try {
        // Attempt to delete the comment
        const deletedComment = await CommentServices.deleteCommentById(id);

        // If comment is not found
        if (!deletedComment) {
            return res.status(404).json({ status: false, error: 'Comment not found' }); // 404 Not Found
        }

        // Send success response
        res.status(200).json({ status: true, success: 'Comment deleted successfully', data: deletedComment }); // 200 OK
    } catch (error) {
        console.error(error);
        next(error); // Forward error to the error handler
    }
};

exports.updateComment = async (req, res, next) => {
    const { rate,commentText,bookName,email,_id} = req.body; // Get new profile data from the request body
    try {
        // Check if comment exists
        const comment = await CommentServices.getSpecificComment(email,bookName);
        console.log("email = " +email+" book="+bookName);
        if (!comment) {
            console.log("status: false, error: 'The book  not found'");
            return res.status(404).json({ status: false, error: 'The book  not found' }); // 404 Not Found
            
        }

        // Prepare updated user data
        const updatedData = {};
        if (rate) updatedData.rate = rate;
        if (commentText) updatedData.commentText = commentText;
      
        console.log(updatedData);
        // Update user profile
        await CommentServices.updateComment(_id, updatedData);
        res.status(200).json({ status: true, message: 'Comment updated successfully' }); // 200 OK
    } catch (error) {
        console.error(error);
        next(error); // Forward error to the error handler
    }
}


exports.canIComment = async (req, res, next) => {

    try {
        console.log("---req body---", req.body);
        const { email, bookName } = req.body;

        // Check for missing parameters
        if (!email ||  !bookName ) {
            return res.status(400).json({ status: false, error: 'All fields are required' }); // 400 Bad Request
        }

        // Check if the user exists
        const user = await userServices.checkUser(email);
        const book = await bookServices.getBookByName(bookName); // check if the book exists
        if (!user) {
            return res.status(409).json({ status: false, error: `the email ${email} is not registered in the database` }); // 409 Conflict
        }
        if (!book) {
            return res.status(409).json({ status: false, error: `the Book ${bookName} is not registered in the database` }); // 409 Conflict
        }

        console.log(`Checking if user ${email} has commented on ${bookName}`);
        if (await CommentServices.checkIfUserCommentToBook(email, bookName) != null) {         
            return res.status(410).json({ status: false, error: `You already added a comment to this book, you can edit it` }); // 410 Gone
        }

        res.status(200).json({ status: true, success: 'you can add comment' }); // 201 Created
    } catch (err) {
        console.log("---> err -->", err);
        next(err); // Forward error to the error handler
    }

}



