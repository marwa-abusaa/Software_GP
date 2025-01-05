const UserServices = require('../services/user.services');
const fogetPassServices = require('../services/fogetPass.services');
const supervisorServices = require('../services/supervisor.service');
const superChildServices = require('../services/superChild.service');
const childServices = require('../services/child.service');


exports.register = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const { email, password, firstName, lastName, gender, birthdate,role,cv} = req.body;

        // Check for missing parameters
        if (!email || !password || !firstName || !lastName || !gender || !birthdate) {
            return res.status(400).json({ status: false, error: 'All fields are required' }); // 400 Bad Request
        }

        // Check if the user already exists
        const duplicate = await UserServices.getUserByEmail(email);
        if (duplicate) {
            return res.status(409).json({ status: false, error: `Email ${email} is already registered` }); // 409 Conflict
        }
        if(role=='user'){
            supervisor=await supervisorServices.getSupervisorWithMinStudentNum();
            console.log("min email"+supervisor.email);
            superChildServices.registerUser(supervisor.email,email);
            childServices.registerUser(email,0,0,0,0);

        }
        // Register the user with additional information
        const response = await UserServices.registerUser(email, password, firstName, lastName, gender, birthdate,role,cv,"");
        res.status(201).json({ status: true, success: 'User registered successfully' }); // 201 Created
    } catch (err) {
        console.log("---> err -->", err);
        next(err); // Forward error to the error handler
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check for missing parameters
        if (!email || !password) {
            return res.status(400).json({ status: false, error: 'Email and password are required' }); // 400 Bad Request
        }

        // Check if user exists
        const user = await UserServices.checkUser(email);
        if (!user) {
            return res.status(404).json({ status: false, error: 'User does not exist' }); // 404 Not Found
        }

        // Check if the user's role is 'supervisor' and if 'activated' is not 'activated'
        if (user.role === 'supervisor' && user.activated !== 'activated') {
            return res.status(403).json({
                status: false,
                error: 'The admin still has not accepted your request for being a supervisor in TinyTales',
            }); // 403 Forbidden
        }

        // Validate password
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ status: false, error: 'Invalid email or password' }); // 401 Unauthorized
        }

        // Generate token
        const userRole = user.role;
        const tokenData = { _id: user._id, email: user.email };
        const token = await UserServices.generateAccessToken(tokenData, "secret", "1h");

        res.status(200).json({
            status: true,
            success: "Login successful",
            token: token,
            role: userRole,
        }); // 200 OK
    } catch (error) {
        console.log(error, 'err---->');
        next(error); // Forward error to the error handler
    }
};


exports.newPass=async (req, res, next) =>{

    const { email ,newPass} = req.body;
 

    try {
        // Check if user exists
        const user = await UserServices.checkUser(email);
        if (!user) {
            return res.status(404).json({ status: false, error: 'User does not exist' }); // 404 Not Found
        }

        UserServices.updaetPassword(user,newPass);
        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while resetting the password' });
    }

}

exports.resetPass=async (req, res, next) =>{

    const { email } = req.body;

    try {
        // Check if user exists
        const user = await UserServices.checkUser(email);
        if (!user) {
            return res.status(404).json({ status: false, error: 'User does not exist' }); // 404 Not Found
        }

        fogetPassServices.sendResetEmail(user);
        res.status(200).json({ message: 'check your email for the new password . Please log in again.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while resetting the password' });
    }
};


exports.searchUsers=async (req, res, next) =>{
    try {
        // Extract the search term from query parameters
        const searchTerm = req.query.searchTerm;
        const superEmail = req.query.superEmail;
        if (!searchTerm || searchTerm.trim() === '') {
            return res.status(400).json({ message: 'Search term is required.' });
        }

        // Call the service function to search users
        const users = await UserServices.searchUsers(searchTerm,superEmail);

        // Respond with the search results
        return res.status(200).json({ users });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred while searching for users.' });
    }
}
exports.updateUserProfile = async (req, res, next) => {
    const { email,password,firstName, lastName, gender, birthdate, role,image } = req.body; // Get new profile data from the request body
    try {
        // Check if user exists
        const user = await UserServices.checkUser(email);
        if (!user) {
            return res.status(404).json({ status: false, error: 'User not found' }); // 404 Not Found
        }

        // Prepare updated user data
        const updatedData = {};
        if (firstName) updatedData.firstName = firstName;
        if (lastName) updatedData.lastName = lastName;
        if (gender) updatedData.gender = gender;
        if (birthdate) updatedData.birthdate = birthdate;
        if (role) updatedData.role = role;
        if (image) updatedData.image = image;

        // Update user profile
        await UserServices.updateUser(email, updatedData,password);
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
    const user = await UserServices.checkUser(email);
    if (!user) {
        return res.status(404).json({ status: false, error: 'User does not exist' }); // 404 Not Found
    }
    // Delete user
    await UserServices.deleteUserByEmail(email);

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
        const user = await UserServices.checkUser(email);
        if (!user) {
            return res.status(404).json({ status: false, error: 'User does not exist' }); // 404 Not Found
        }

        // Retrieve user data (excluding sensitive information like password)
        const userProfile = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            gender: user.gender,
            birthdate: user.birthdate,
            password:user.password,
            image:user.image,
            //role: user.role,
        };

        // Send the user profile as response
        res.status(200).json({ status: true, data: userProfile }); // 200 OK
    } catch (error) {
        console.error(error);
        next(error); // Forward error to the error handler
    }
};

exports.updateActivation = async (req, res, next) =>{
    const { email,note,activated} = req.body;
    const password=null;
     // Check for missing parameters
     if (!email || !note||!activated) {
        return res.status(400).json({ status: false, error: 'All fields are required' }); // 400 Bad Request
    }

     // Check if user exists
     const user = await UserServices.checkUser(email);
     if (!user) {
         return res.status(404).json({ status: false, error: 'User not found' }); // 404 Not Found
     }

    const updatedData = {};
    if (activated) updatedData.activated = activated;
    // Update user profile
    await UserServices.updateUser(email, updatedData,password);
    await supervisorServices.updateUser(email, updatedData);

    console.log("user updated");
    UserServices.sendActivatedEmail(email,note,activated);
    if(activated=='not'){
        UserServices.deleteUserByEmail(email);
        await supervisorServices.deleteUserByEmail(email);

    }
    res.status(200).json({ status: true, message: 'Activation is done  successfully' }); // 200 OK



}


exports.getAllUsersWithRoleUser = async (req, res, next) => {
    try {
        // Fetch all users with role 'user'
        const users = await UserServices.getUsersByRole('user');
        res.status(200).json({ status: true, users }); // 200 OK
    } catch (error) {
        console.error(error);
        next(error); // Forward error to the error handler
    }
};

exports.searchUsersByName = async (req, res, next) => {
    const { searchTerm } = req.query;

    // Check for missing search term
    if (!searchTerm || searchTerm.trim() === '') {
        return res.status(400).json({ status: false, error: 'Search term is required' }); // 400 Bad Request
    }

    try {
        let users = [];
        const terms = searchTerm.split(' ').filter(term => term); // Split and clean search term

        if (terms.length === 1) {
            // Search by first or last name
            users = await UserServices.searchUsersByPartialName(terms[0], 'user');
        } else if (terms.length === 2) {
            // Search by full name
            users = await UserServices.searchUsersByFullName(terms[0], terms[1], 'user');
        } else {
            return res.status(400).json({ status: false, error: 'Invalid search term format' }); // 400 Bad Request
        }

        res.status(200).json({ status: true, users }); // 200 OK
    } catch (error) {
        console.error(error);
        next(error); // Forward error to the error handler
    }
};
