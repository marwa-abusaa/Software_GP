const superChildServices = require('../services/superChild.service');



exports.getAllChildren = async (req, res, next) => {
    const { superEmail } = req.body; // Get new profile data from the request body
    if (!superEmail) {
        return res.status(400).json({ status: false, error: 'superEmail is required' }); // 400 Bad Request
    }

    // Check if user exists
    try {
        const children =  await superChildServices.getChildrenBySupervisorEmail(superEmail);
        if (!children) {
            return res.status(404).json({ status: false, error: 'children do not exist' }); // 404 Not Found
        }

      
        console.log("successfully get the  children");
        // Send the user profile as response
        res.status(200).json({ status: true, data: children  }); // 200 OK
    } catch (error) {
        console.error(error);
        next(error); // Forward error to the error handler
    }
}

exports.getChild= async(req, res, next) =>{
    const { childEmail } = req.body;

    if (!childEmail) {
        return res.status(400).json({ status: false, error: 'childEmail is required' }); // 400 Bad Request
    }

    // Check if user exists
    try {
        const children =  await superChildServices.getUser(childEmail);
        if (!children) {
            return res.status(404).json({ status: false, error: 'children do not exist' }); // 404 Not Found
        }

      
        console.log("successfully get the  children");
        // Send the user profile as response
        res.status(200).json({ status: true, data: children  }); // 200 OK
    } catch (error) {
        console.error(error);
        next(error); // Forward error to the error handler
    }

}

exports.addSuperChild = async (req, res, next) => {
    const { childEmail, superEmail} = req.body;  // Extract email from query parameters
console.log("email is" +childEmail);
    // Check if the email is provided
    if (!childEmail ||!superEmail) {
        return res.status(400).json({ status: false, error: 'Email is required' }); // 400 Bad Request
    }

    // Check if user exists
    try {
        let addSuperChild = await superChildServices.registerUser(superEmail,childEmail);
        res.json({status: true,success:addSuperChild});


    } catch (error) {
        console.error(error);
        next(error); // Forward error to the error handler
    }
};

