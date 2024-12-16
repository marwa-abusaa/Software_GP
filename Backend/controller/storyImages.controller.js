const StoryImageservices = require('../services/storyImages.service');


exports.addImage = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const { url, email, Description, category} = req.body;

        // Check for missing parameters
        if (!url || !email ) {
            console.log("BODY    "+url, email, Description, category)
            return res.status(400).json({ status: false, error: 'URL and email are required' }); // 400 Bad Request
        }

        // Register the Image
        const response = await StoryImageservices.addNewImage(url, email, Description, category);
        res.status(201).json({ status: true, success: 'Image has been added successfully' }); // 201 Created
    } catch (err) {
        console.log("---> err -->", err);
        next(err); // Forward error to the error handler
    }
}


exports.deleteImage= async(req, res, next) =>{
    const { url } = req.body;

    try{
        const Image = await StoryImageservices.getImageByUrl(url);
        if (!Image) {
            return res.status(404).json({ status: false, error: 'The Image  not found' }); // 404 Not Found
        }
    await StoryImageservices.deleteUImageByUrl(url);

    // Send success response
    res.status(200).json({ status: true, message: 'Image deleted successfully' }); // 200 OK
}
catch (error) {
    console.error(error);
    next(error); // Forward error to the error handler
}

}


exports.getImageByEmail = async (req, res, next) =>{
    
         const { email } = req.params; // Get email from the request parameters
        ;  // Extract email from query parameters
    console.log("email is" +email);
        // Check if the email is provided
        if (!email) {
            return res.status(400).json({ status: false, error: 'email is required' }); // 400 Bad Request
        }
    
        // Check if user exists
        try {
            const images =  await StoryImageservices.getImagesByEmail(email);
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



exports.getImagesByCategory = async (req, res, next) => {
    try {
        const { category } = req.params; // Get the category from the request params

        // Check if the category parameter is provided
        if (!category) {
            return res.status(400).json({ status: false, error: 'Category is required' });
        }

        // Call the service function to fetch images with the specified category and email 'public'
        const images = await StoryImageservices.getImagesByCategory(category);

        // Check if any images were found
        if (images.length === 0) {
            return res.status(404).json({ status: false, error: 'No images found for this category' });
        }

        // Return the images in the response
        return res.status(200).json({
            status: true,
            images: images,
        });
    } catch (err) {
        console.error("---> Error: ", err);
        next(err); // Forward the error to the error handler middleware
    }
};



