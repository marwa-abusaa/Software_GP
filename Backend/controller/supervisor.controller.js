const supervisorServices = require('../services/supervisor.service');



exports.updateUserProfile = async (req, res, next) => {
    const { email,studentNum,activated } = req.body; // Get new profile data from the request body
    try {
        // Check if user exists
        const user = await supervisorServices.checkUser(email);
        if (!user) {
            return res.status(404).json({ status: false, error: 'User not found' }); // 404 Not Found
        }

        // Prepare updated user data
        const updatedData = {};
        if (studentNum) updatedData.studentNum = studentNum;
        if (activated) updatedData.activated = activated;
      

        // Update user profile
        await supervisorServices.updateUser(email, updatedData);
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
    const user = await supervisorServices.checkUser(email);
    if (!user) {
        return res.status(404).json({ status: false, error: 'User does not exist' }); // 404 Not Found
    }
    // Delete user
    await supervisorServices.deleteUserByEmail(email);

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
        const user = await supervisorServices.checkUser(email);
        if (!user) {
            return res.status(404).json({ status: false, error: 'User does not exist' }); // 404 Not Found
        }

        const userProfile = {
            email: user.email,
            cv: user.cv,
            studentNum: user.email,
            activated: user.activated
            //role: user.role,
        };

        // Send the user profile as response
        res.status(200).json({ status: true, data: userProfile }); // 200 OK
    } catch (error) {
        console.error(error);
        next(error); // Forward error to the error handler
    }
};

