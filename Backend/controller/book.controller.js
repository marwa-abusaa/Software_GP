const BookServices = require('../services/book.service');


exports.register = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const { name, author, Description, category, rate, image,pdfLink,email} = req.body;

        // Check for missing parameters
        if (!name || !author || !Description || !category ) {
            console.log("BODY    "+name, author, Description, category, rate, image,pdfLink)
            return res.status(400).json({ status: false, error: 'All fields are required' }); // 400 Bad Request
        }

        // Check if the user already exists
        const duplicate = await BookServices.getBookByName(name);
        if (duplicate) {
            return res.status(409).json({ status: false, error: `book named  ${name} is already registered` }); // 409 Conflict
        }

        // Register the user with additional information
        const response = await BookServices.addNewBook(name, author, Description, category, rate, 0,image,pdfLink,email);
        res.status(201).json({ status: true, success: 'Book has been added successfully' }); // 201 Created
    } catch (err) {
        console.log("---> err -->", err);
        next(err); // Forward error to the error handler
    }
}


exports.getBookByName = async (req, res, next) =>{
    
        const { name } = req.query;  // Extract email from query parameters
    console.log("name is" +name);
        // Check if the email is provided
        if (!name) {
            return res.status(400).json({ status: false, error: 'Book Name is required' }); // 400 Bad Request
        }
    
        // Check if user exists
        try {
            const book =  await BookServices.getBookByName(name);
            if (!book) {
                return res.status(404).json({ status: false, error: 'Book does not exist' }); // 404 Not Found
            }
    
            // Retrieve user data (excluding sensitive information like password)
            const bookDetails = {
                id:book._id,
                name: book.name,
                author: book.author,
                Description: book.Description,
                category: book.category,
                rate: book.rate,
                review:book.review,
                image:book.image,
                pdfLink:book.pdfLink,
                email:book.email
            };
            console.log("successfully get the book details");
            // Send the user profile as response
            res.status(200).json({ status: true, data: bookDetails }); // 200 OK
        } catch (error) {
            console.error(error);
            next(error); // Forward error to the error handler
        }
    

}

exports.getBooksByEmail = async (req, res, next) =>{
    
    const { email } = req.params; // Get email from the request parameters
   ;  // Extract email from query parameters
console.log("email is" +email);
   // Check if the email is provided
   if (!email) {
       return res.status(400).json({ status: false, error: 'email is required' }); // 400 Bad Request
   }

   // Check if user exists
   try {
       const images =  await BookServices.getBooksByEmail(email);
       if (!images) {
           return res.status(404).json({ status: false, error: 'images do not exist' }); // 404 Not Found
       }

     
       console.log("successfully get the  Images");
       // Send the user profile as response
       res.status(200).json({ status: true, data: images  }); // 200 OK
   } catch (error) {
       console.error(error);
       next(error); // Forward error to the error handler
   }


}

exports.getAllBooks = async (req, res, next) =>{
    try{
        // Retrieve comments for the specified book
        const books = await BookServices.getAllBooks();  // Call the service method

        // Check if there are comments for the book
        if (books.length === 0) {
            return res.status(404).json({ status: false, error: 'No books yet' }); // 404 Not Found
        }

        // Send the comments as response
        console.log("Successfully retrieved all the books details");
        res.status(200).json({ status: true, data: books }); // 200 OK
    } catch (error) {
        console.error(error);
        next(error); // Forward error to the error handler
    }


}

exports.updateBook = async (req, res, next) => {
    console.log("Insaid the update book")
    const { name,author,Description, category, rate, review,image,pdfLink} = req.body; // Get new profile data from the request body
    try {
        // Check if user exists
        const book = await BookServices.getBookByName(name);
        if (!book) {
            return res.status(404).json({ status: false, error: 'The book  not found' }); // 404 Not Found
        }

        const updatedData = {};
        if (author!== undefined) updatedData.author = author;
        if (Description!== undefined) updatedData.Description = Description;
        if (category!== undefined) updatedData.category = category;
        if (rate !== undefined) updatedData.rate = rate; // Make sure to check if defined
        if (review !== undefined) updatedData.review = review; // Make sure to check if defined
        if (image!== undefined) updatedData.image = image;
        if (pdfLink !== undefined) updatedData.pdfLink = pdfLink; 

        // Update Book data
        console.log(updatedData);
        await BookServices.updateBook(name, updatedData);
        console.log("Book updated");
        res.status(200).json({ status: true, message: 'Book updated successfully' }); // 200 OK
    } catch (error) {
        console.error(error);
        next(error); // Forward error to the error handler
    }
}

exports.searchBooks = async (req, res, next) => {
    try {
        const books = await BookServices.searchBooks(req.body);

        if (books.length === 0) {
            return res.status(404).json({ status: false, error: 'No books found matching the criteria' }); // 404 Not Found
        }

        console.log("Successfully retrieved books matching the search criteria");
        console.log(books);
        res.status(200).json({ status: true, data: books }); // 200 OK
    } catch (error) {
        console.error(error);
        next(error); // Forward error to the error handler
    }
}

exports.deleteBook= async(req, res, next) =>{
    const { name } = req.body;

    // Check if user exists
    try{
        const book = await BookServices.getBookByName(name);
        if (!book) {
            return res.status(404).json({ status: false, error: 'The book  not found' }); // 404 Not Found
        }
    // Delete Book
    await BookServices.deleteUBookByName(name);

    // Send success response
    res.status(200).json({ status: true, message: 'Book deleted successfully' }); // 200 OK
}
catch (error) {
    console.error(error);
    next(error); // Forward error to the error handler
}

}
