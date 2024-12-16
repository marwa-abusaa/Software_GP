const childServices = require('../services/child.service');

exports.updateUserProfile = async (req, res, next) => {
    const { email,createdStroryNum,contestsNum,coursesNum,points } = req.body; // Get new profile data from the request body
    try {
       

        // Prepare updated user data
        const updatedData = {};
        if (createdStroryNum) updatedData.createdStroryNum = createdStroryNum;
        if (contestsNum) updatedData.contestsNum = contestsNum;
        if (coursesNum) updatedData.coursesNum = coursesNum;
        if (points) updatedData.points = points;

      

        // Update user profile
        await childServices.updateUser(email, updatedData);
        console.log("user updated");
        res.status(200).json({ status: true, message: 'User profile updated successfully' }); // 200 OK
    } catch (error) {
        console.error(error);
        next(error); // Forward error to the error handler
    }
}

exports.deleteUser= async(req, res, next) =>{
    const { email } = req.body;

    // Check if user exists
    try{
 
    // Delete user
    await childServices.deleteUserByEmail(email);

    // Send success response
    res.status(200).json({ status: true, message: 'User deleted successfully' }); // 200 OK
}
catch (error) {
    console.error(error);
    next(error); // Forward error to the error handler
}

}
exports.getUserProfile = async (req, res, next) => {
    const { email } = req.query;  // Extract email from query parameters
console.log("email is" +email);
    // Check if the email is provided
    if (!email) {
        return res.status(400).json({ status: false, error: 'Email is required' }); // 400 Bad Request
    }

    // Check if user exists
    try {
        const user = await childServices.getChildByEmail(email);
        if (!user) {
            return res.status(404).json({ status: false, error: 'User does not exist' }); // 404 Not Found
        }
        const userProfile = {
            email: user.email,
            createdStroryNum: user.createdStroryNum,
            contestsNum: user.contestsNum,
            coursesNum: user.coursesNum,
            points: user.points,
        };

        // Send the user profile as response
        res.status(200).json({ status: true, data: userProfile }); // 200 OK
    } catch (error) {
        console.error(error);
        next(error); // Forward error to the error handler
    }
};



exports.incrementCreatedStory = async (req, res, next) => {
    const { email } = req.body;  // Extract email from query parameters
console.log("email is" +email);
    // Check if the email is provided
    if (!email) {
        return res.status(400).json({ status: false, error: 'Email is required' }); // 400 Bad Request
    }

    // Check if user exists
    try {
        const user = await childServices.getChildByEmail(email);
        if (!user) {
            return res.status(404).json({ status: false, error: 'User does not exist' }); // 404 Not Found
        }
     
        await childServices.incrementcreatedStroryNum(email);
        // Send the user profile as response
        res.status(200).json({ status: true, data: "successfully incremented" }); // 200 OK
    } catch (error) {
        console.error(error);
        next(error); // Forward error to the error handler
    }
};

exports.incrementContests= async (req, res, next) => {
    const { email } = req.body;  // Extract email from query parameters
console.log("email is" +email);
    // Check if the email is provided
    if (!email) {
        return res.status(400).json({ status: false, error: 'Email is required' }); // 400 Bad Request
    }

    // Check if user exists
    try {
        const user = await childServices.getChildByEmail(email);
        if (!user) {
            return res.status(404).json({ status: false, error: 'User does not exist' }); // 404 Not Found
        }
     
        await childServices.incrementcontestsNum(email);
        // Send the user profile as response
        res.status(200).json({ status: true, data: "successfully incremented" }); // 200 OK
    } catch (error) {
        console.error(error);
        next(error); // Forward error to the error handler
    }
};

exports.incrementCourses = async (req, res, next) => {
    const { email } = req.body;  // Extract email from query parameters
console.log("email is" +email);
    // Check if the email is provided
    if (!email) {
        return res.status(400).json({ status: false, error: 'Email is required' }); // 400 Bad Request
    }

    // Check if user exists
    try {
        const user = await childServices.getChildByEmail(email);
        if (!user) {
            return res.status(404).json({ status: false, error: 'User does not exist' }); // 404 Not Found
        }
     
        await childServices.incrementcoursesNum(email);
        // Send the user profile as response
        res.status(200).json({ status: true, data: "successfully incremented" }); // 200 OK
    } catch (error) {
        console.error(error);
        next(error); // Forward error to the error handler
    }
};