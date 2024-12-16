const MyBookService = require('../services/myBooks.service');


exports.register = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const { name, email, Description,status, superComment, image,pdfLink,draftId,superEmail,category} = req.body;

        // Check for missing parameters
        if (!name  ) {
            console.log("BODY    "+name, email, Description,status, superComment, image,pdfLink,draftId,superEmail)
            return res.status(400).json({ status: false, error: 'All fields are required' }); // 400 Bad Request
        }

    

        // Register the user with additional information
        const response = await MyBookService.addNewBook(name, email, Description,status, superComment, image,pdfLink,draftId,superEmail,category);
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
            const myBook =  await MyBookService.getBookByName(name);
            if (!myBook) {
                return res.status(404).json({ status: false, error: 'Book does not exist' }); // 404 Not Found
            }
    
            // Retrieve user data (excluding sensitive information like password)
            const bookDetails = {
                id:myBook._id,
                name: myBook.name,
                email: myBook.email,
                Description: myBook.Description,
                status: myBook.status,
                superComment: myBook.superComment,
                image:myBook.image,
                pdfLink:myBook.pdfLink,
                draftId:myBook.draftId,
                superEmail:myBook.superEmail,
                category:myBook.category
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
       const images =  await MyBookService.getBooksByEmail(email);
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

exports.getBooksByEmailAndStatus = async (req, res, next) =>{
    
    const { email,status } = req.body; 

    console.log("email is" +email);
   // Check if the email is provided
   if (!email) {
       return res.status(400).json({ status: false, error: 'email is required' }); // 400 Bad Request
   }

   // Check if user exists
   try {
       const book =  await MyBookService.getBooksByEmailAndStatus(email,status);
       if (!book) {
           return res.status(404).json({ status: false, error: 'book do not exist' }); // 404 Not Found
       }

     
       console.log("successfully get the  book");
       // Send the user profile as response
       res.status(200).json({ status: true, data: book  }); // 200 OK
   } catch (error) {
       console.error(error);
       next(error); // Forward error to the error handler
   }


}

exports.updateBook = async (req, res, next) => {
    console.log("Insaid the update book")
    const {  name, email, Description,status, superComment, image,pdfLink,draftId} = req.body; // Get new profile data from the request body
    try {
        // Check if user exists
        const book = await MyBookService.getBookByNameAndEmail(name,email);
        if (!book) {
            return res.status(404).json({ status: false, error: 'The book  not found' }); // 404 Not Found
        }
        console.log("book is jh"+book);

        const updatedData = {};
        if (name!== undefined) updatedData.name = name;
        if (email!== undefined) updatedData.email = email;
        if (Description!== undefined) updatedData.Description = Description;
        if (status !== undefined) updatedData.status = status; // Make sure to check if defined
        if (superComment !== undefined) updatedData.superComment = superComment; // Make sure to check if defined
        if (image!== undefined) updatedData.image = image;
        if (draftId !== undefined) updatedData.draftId = draftId; 

        // Update Book data
        console.log("updated data is : : : ^^^"+updatedData.superComment);
        await MyBookService.updateBook(name, updatedData);
        console.log("Book updated");
        res.status(200).json({ status: true, message: 'Book updated successfully' }); // 200 OK
    } catch (error) {
        console.error(error);
        next(error); // Forward error to the error handler
    }
}


exports.deleteBook= async(req, res, next) =>{
    const { name } = req.body;

    // Check if user exists
    try{
        const book = await MyBookService.getBookByName(name);
        if (!book) {
            return res.status(404).json({ status: false, error: 'The book  not found' }); // 404 Not Found
        }
    // Delete Book
    await MyBookService.deleteUBookByName(name);

    // Send success response
    res.status(200).json({ status: true, message: 'Book deleted successfully' }); // 200 OK
}
catch (error) {
    console.error(error);
    next(error); // Forward error to the error handler
}

}

exports.getReqBySuperEmail = async (req, res, next) =>{
    
    const { email } = req.params; // Get email from the request parameters
   ;  // Extract email from query parameters
console.log("email is" +email);
   // Check if the email is provided
   if (!email) {
       return res.status(400).json({ status: false, error: 'email is required' }); // 400 Bad Request
   }

   // Check if user exists
   try {
       const images =  await MyBookService.getBooksBySuperEmailAndStatus(email);
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