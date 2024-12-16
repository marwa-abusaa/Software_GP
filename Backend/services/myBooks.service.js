const myBookModel = require("../models/myBooks.model");

class MyBookService{

    static async addNewBook(name, email, Description,status, superComment, image,pdfLink,draftId,superEmail,category) {
        try {
            
            const addBook = new myBookModel({name, email, Description,status, superComment, image,pdfLink,draftId,superEmail,category});
            return await addBook.save();  // <--- Ensure you're returning this
        } catch (err) {
            throw err;
        }
    } 

    static async getBookByName(name) {
        try {
            return await myBookModel.findOne({ name });
        } catch (err) {
            console.log(err);
            throw err; // Ensure the error is thrown for upstream handling
        }
    }

    static async getBookByNameAndEmail(name,email) {
        try {
            return await myBookModel.findOne({ name,email});
        } catch (err) {
            console.log(err);
            throw err; // Ensure the error is thrown for upstream handling
        }
    }

    static async getBooksByEmail(email) {
        try {
            return await myBookModel.find({ email }); // Find all images with the provided email
        } catch (err) {
            console.log(err);
            throw err; // Ensure the error is thrown for upstream handling
        }
    }

    static async getBooksByEmailAndStatus(email,status) {
        try {
            return await myBookModel.find({ email,status}); // Find all images with the provided email
        } catch (err) {
            console.log(err);
            throw err; // Ensure the error is thrown for upstream handling
        }
    }
    //update book used for rating
    static async  updateBook(bookName, updatedData) {
        const result = await myBookModel.updateOne({ name: bookName }, { $set: updatedData });
        return result; 
    }

    static async  deleteUBookByName(name) {

        return await myBookModel.deleteOne({ name }); 

    }

    static async getBooksBySuperEmailAndStatus(superEmail, status = "on request") {
        try {
            return await myBookModel.find({ superEmail, status });
        } catch (err) {
            console.error(err);
            throw err; // Ensure the error is thrown for upstream handling
        }
    }


}


module.exports = MyBookService;
