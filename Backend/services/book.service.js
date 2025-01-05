const BookModel = require("../models/book.model");

class BookService{

    static async addNewBook(name, author, Description,category, rate, review,image,pdfLink,email,publishDate) {
        try {
            console.log("-----name --- author-----", name, author);
            
            
            const addBook = new BookModel({ name, author, Description, category, rate, review,image,pdfLink,email,publishDate});
            return await addBook.save();  // <--- Ensure you're returning this
        } catch (err) {
            throw err;
        }
    } 

    static async getBookByName(name) {
        try {
            return await BookModel.findOne({ name });
        } catch (err) {
            console.log(err);
            throw err; // Ensure the error is thrown for upstream handling
        }
    }

    static async getAllBooks() {
        try {
            // ترتيب الكتب حسب تاريخ النشر من الأحدث إلى الأقدم
            return await BookModel.find().sort({ publishDate: -1 }); // -1 يعني ترتيب تنازلي (أحدث أولاً)
        } catch (err) {
            console.log(err);
            throw err; // Ensure the error is thrown for upstream handling
        }
    }

    static async getBooksByEmail(email) {
        try {
            return await BookModel.find({ email }).sort({ publishDate: -1 }); // Find all images with the provided email
        } catch (err) {
            console.log(err);
            throw err; // Ensure the error is thrown for upstream handling
        }
    }
    //update book used for rating
    static async  updateBook(bookName, updatedData) {
        const result = await BookModel.updateOne({ name: bookName }, { $set: updatedData });
        return result; 
    }

    static async searchBooks(query) {
        const { name, author, category, minRating } = query;
        const filter = {};
    
        // Create a case-insensitive regular expression to match any word in the title
        if (name) {
            const nameWords = name.split(" ").map(word => word.trim()).filter(word => word.length > 0);
            filter.name = { $regex: nameWords.join("|"), $options: "i" }; // Use regex OR (`|`) to match any word
        }
    
        // Case-insensitive search for author and category if provided
        if (author) filter.author = new RegExp(author, 'i');
        if (category) filter.category = new RegExp(category, 'i');
    
        // If a minimum rating is specified, add a filter to check the calculated rating
        if (minRating) {
            filter.$expr = {
                $and: [
                    { $gt: ["$review", 0] }, // Ensure reviews are greater than zero
                    { $gte: [{ $divide: ["$rate", "$review"] }, parseFloat(minRating)] } // Check if rate/review meets minRating
                ]
            };
        }
    
        try {
            // Perform the search and order results by publishDate from newer to older
            const books = await BookModel.find(filter).sort({ publishDate: -1 }); // -1 means descending order (newer first)
    
            if (books.length > 0) {
                return books;
            } else {
                return { status: false, error: "No books found matching the criteria" };
            }
        } catch (err) {
            console.log(err);
            throw err; // Ensure the error is thrown for upstream handling
        }
    }
    



    static async  deleteUBookByName(name) {

        return await BookModel.deleteOne({ name }); 

    }


}


module.exports = BookService;
