const CommentModel = require("../models/comment.model");

class CommentService{

    static async addNewComment(email, commentText, rate,bookName) {
        try {
            console.log("-----commentText --- email-----", commentText, email);
            
            const addComment = new CommentModel({ email, commentText, rate, bookName });
            return await addComment.save();  // <--- Ensure you're returning this
        } catch (err) {
            throw err;
        }
    } 

    static async getCommentsByBookName(bookName) {
        try {
            return await CommentModel.find({ bookName });
        } catch (err) {
            console.log(err);
            throw err; // Ensure the error is thrown for upstream handling
        }
    }


      // New function to delete a comment by its ID
      static async deleteCommentById(commentId) {
        try {
            const deletedComment = await CommentModel.findByIdAndDelete(commentId);
            if (!deletedComment) {
                throw new Error('Comment not found');
            }
            return deletedComment; // Return the deleted comment details
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    static async checkIfUserCommentToBook(email, bookName) {
        try {
            const comment = await CommentModel.findOne({ email, bookName });
            console.log("Check result:", comment);  // Log the found comment
            return comment;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    static async  updateComment(_id, updatedData) {
        const result = await CommentModel.updateOne({ _id }, { $set: updatedData });
        return result; 
    }

    static async getSpecificComment(email, bookName) {
        try {
            // Use findOne to get a single comment matching the email and bookName
            return await CommentModel.findOne({ email, bookName });
            
           
        } catch (err) {
            console.log(err);
            throw err; // Ensure the error is thrown for upstream handling
        }
    }

}


module.exports = CommentService;
