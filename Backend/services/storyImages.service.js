const StoryImagesModel = require("../models/storyImages.model");

class StoryImagesService{

    static async addNewImage(url, email, Description,category) {
        try {
            console.log("-----name --- author-----", url, email);
            
            const addImage = new StoryImagesModel({ url, email, Description, category });
            return await addImage.save();  // <--- Ensure you're returning this
        } catch (err) {
            throw err;
        }
    } 


    static async  deleteUImageByUrl(url) {

        return await StoryImagesModel.deleteOne({ url }); 

    }

    static async getImageByUrl(url) {
        try {
            return await StoryImagesModel.findOne({ url });
        } catch (err) {
            console.log(err);
            throw err; // Ensure the error is thrown for upstream handling
        }
    }

    static async getImagesByEmail(email) {
        try {
            return await StoryImagesModel.find({ email }); // Find all images with the provided email
        } catch (err) {
            console.log(err);
            throw err; // Ensure the error is thrown for upstream handling
        }
    }

    static async getImagesByCategory(category) {
        try {
            return await StoryImagesModel.find({ 
                category, 
                email: "public" // تصفية الصور التي تكون الفئة كما أرسلت والإيميل "public"
            });
        } catch (err) {
            console.log(err);
            throw err; // Ensure the error is thrown for upstream handling
        }
    }
    

//     static async getAllBooks() {
//         try {
//             return await BookModel.find();
            
//         } catch (err) {
//             console.log(err);
//             throw err; // Ensure the error is thrown for upstream handling
//         }
    
        
//     }

//     //update book used for rating
//     static async  updateBook(bookName, updatedData) {
//         const result = await BookModel.updateOne({ name: bookName }, { $set: updatedData });
//         return result; 
//     }

// /// search
// static async searchBooks(query) {
//     const { name, author, category, minRating } = query;
//     const filter = {};

//     // Create a case-insensitive regular expression to match any word in the title
//     if (name) {
//         const nameWords = name.split(" ").map(word => word.trim()).filter(word => word.length > 0);
//         filter.name = { $regex: nameWords.join("|"), $options: "i" }; // Use regex OR (`|`) to match any word
//     }

//     // Case-insensitive search for author and category if provided
//     if (author) filter.author = new RegExp(author, 'i');
//     if (category) filter.category = new RegExp(category, 'i');

//     // If a minimum rating is specified, add a filter to check the calculated rating
//     if (minRating) {
//         filter.$expr = {
//             $and: [
//                 { $gt: ["$review", 0] }, // Ensure reviews are greater than zero
//                 { $gte: [{ $divide: ["$rate", "$review"] }, parseFloat(minRating)] } // Check if rate/review meets minRating
//             ]
//         };
//     }

//     try {
//         const books = await BookModel.find(filter);
//         if (books.length > 0) {
//             return books;
//         } else {
//             return { status: false, error: "No books found matching the criteria" };
//         }
//     } catch (err) {
//         console.log(err);
//         throw err; // Ensure the error is thrown for upstream handling
//     }
// }






}


module.exports = StoryImagesService;
