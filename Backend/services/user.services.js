const UserModel = require("../models/user.model");
const superChildModel = require("../models/superChild.model");
const supervisorServices = require('../services/supervisor.service');

const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

class UserServices {

    static async registerUser(email, password, firstName, lastName, gender, birthdate,role,cv,image) {
        try {
            console.log("-----Email --- Password-----", email, password);
            
             // Determine the 'activated' field based on the role
        const activated = role === 'supervisor' ? 'not' : 'activated';
        if(role=='supervisor' ){
            supervisorServices.registerUser(email,cv,0);
        }

            const createUser = new UserModel({ email, password, firstName, lastName, gender, birthdate,role,activated,image});
            return await createUser.save();
        } catch (err) {
            throw err;
        }
    } 

    static async getUserByEmail(email) {
        try {
            return await UserModel.findOne({ email });
        } catch (err) {
            console.log(err);
            throw err; // Ensure the error is thrown for upstream handling
        }
    }

    // Function to search users by custom criteria
    static async searchUsersByCriteria  (criteria) {
    try {
      return await UserModel.find(criteria).select('-password'); // Exclude password
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

    static async searchUsers(searchTerm, superEmail) {
        try {
            // Trim the search term and split it into words
            const searchParts = searchTerm.trim().split(' ');
            let searchQuery = {};
    
            if (searchParts.length > 1) {
                // If the term contains a space, search as firstName + lastName
                searchQuery = {
                    $and: [
                        { firstName: { $regex: searchParts[0], $options: 'i' } }, // Case-insensitive match for firstName
                        { lastName: { $regex: searchParts[1], $options: 'i' } }   // Case-insensitive match for lastName
                    ],
                    role: 'user' // Ensure the role is 'user'
                };
            } else {
                // If a single word, search in both firstName and lastName
                searchQuery = {
                    $or: [
                        { firstName: { $regex: searchParts[0], $options: 'i' } }, // Case-insensitive match for firstName
                        { lastName: { $regex: searchParts[0], $options: 'i' } }   // Case-insensitive match for lastName
                    ],
                    role: 'user' // Ensure the role is 'user'
                };
            }
    
            // Query the superChildren model to find child emails associated with the provided superEmail
            const superChildren = await superChildModel.find({ superEmail });
    
            if (superChildren.length === 0) {
                // If there are no associated children for the provided superEmail, return an empty array or handle the case as needed
                return [];
            }
    
            const childEmails = superChildren.map(sc => sc.childEmail);
    
            // Add a condition to ensure the search results are only for users whose email is in the list of childEmails
            searchQuery.email = { $in: childEmails };
    
            // Execute the query and return the matching users
            return await UserModel.find(searchQuery);
        } catch (err) {
            console.log(err);
            throw err; // Ensure the error is thrown for upstream handling
        }
    }
    

    static async checkUser(email) {
        try {
            return await UserModel.findOne({ email });
        } catch (error) {
            throw error;
        }
    }

    static async generateAccessToken(tokenData, JWTSecret_Key, JWT_EXPIRE) {
        return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
    }

    static async updaetPassword(user,newPassword){
        // Hash the new password and update it
        user.password = newPassword;
        await user.save();
    }


    static async  updateUser(email, updatedData,password) {
         await UserModel.updateOne({ email }, { $set: updatedData });
        if(password){
            const user = await UserServices.checkUser(email);
            UserServices.updaetPassword(user,password)
        }

    }
    static async  deleteUserByEmail(email) {

        return await UserModel.deleteOne({ email }); 

    }

     // Email sending function
  static async sendActivatedEmail(email,note,activated) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', 
      auth: {
        user: 'ayabaara4@gmail.com',
        pass: 'igsp qxll edyx pwte',
      },
    });
     console.log("Activated is " , activated)
    
    if(activated!="not"){
        note="congratulation , you have been accepted for being a supervisor in our Tiny Tales \n waiting for you! \n "+
                "login with the email and password you created";
                
    }
   
    const mailOptions = {
      from: 'ayabaara4@gmail.com',
      to: email,
      subject: 'Activation response for being a supervisor in tiny tales',
      text: note,
    };

    await transporter.sendMail(mailOptions);

  }

  // Fetch all users with role 'user'
  static async getUsersByRole  (role) {
    return UserModel.find({ role });
};

// Search users by partial first or last name
static async searchUsersByPartialName (term, role) {
    return UserModel.find({
        role,
        $or: [
            { firstName: { $regex: term, $options: 'i' } }, // Case-insensitive search
            { lastName: { $regex: term, $options: 'i' } }
        ]
    });
};

// Search users by full name
static async searchUsersByFullName (firstName, lastName, role)  {
    return UserModel.find({
        role,
        firstName: { $regex: firstName, $options: 'i' },
        lastName: { $regex: lastName, $options: 'i' }
    });
};


// Function to search users where activated='not' with partial search
static async searchUsersWithNotActivated(searchQuery) {
    try {
        // Split the search query into words
        const searchWords = searchQuery.trim().split(/\s+/);

        // Check if it's one word or two words
        let searchCriteria;
        if (searchWords.length === 1) {
            const [word] = searchWords;
            searchCriteria = {
                activated: 'not',
                $or: [
                    { firstName: { $regex: word, $options: 'i' } }, // Case-insensitive partial match on first name
                    { lastName: { $regex: word, $options: 'i' } },  // Case-insensitive partial match on last name
                ],
            };
        } else if (searchWords.length === 2) {
            const [firstWord, secondWord] = searchWords;
            searchCriteria = {
                activated: 'not',
                $and: [
                    { firstName: { $regex: firstWord, $options: 'i' } }, // Match first word in first name
                    { lastName: { $regex: secondWord, $options: 'i' } }, // Match second word in last name
                ],
            };
        } else {
            throw new Error('Search query must be one or two words.');
        }

        // Perform the search
        const users = await UserModel.find(searchCriteria);

      
        return users;
    } catch (error) {
        console.error(`Error searching users with activated='not': ${error.message}`);
        throw error;
    }
}

 // Function to get the count of girls and boys
 static async getGenderStatistics() {
    try {
        const boysCount = await UserModel.countDocuments({ gender: 'Male' });
        const girlsCount = await UserModel.countDocuments({ gender: 'Female' });

        return {
            boys: boysCount,
            girls: girlsCount,
        };
    } catch (err) {
        console.error(`Error fetching gender statistics: ${err.message}`);
        throw err;
    }
}

static async getAgeStatistics  (role) {
    try {
      // Calculate age, filter by role, and group by age
      const stats = await UserModel.aggregate([
        {
          $match: { role: role }, // Filter by role (e.g., 'user' or 'supervisor')
        },
        {
          $project: {
            age: {
              $dateDiff: {
                startDate: "$birthdate",
                endDate: new Date(),
                unit: "year",
              },
            },
          },
        },
        {
          $group: {
            _id: "$age", // Group by age
            count: { $sum: 1 }, // Count users in each age group
          },
        },
        {
          $sort: { _id: 1 }, // Sort by age (ascending)
        },
      ]);
  
      return stats; // Return the aggregated statistics
    } catch (error) {
      throw new Error(`Failed to fetch age statistics: ${error.message}`);
    }
  };

}

module.exports = UserServices;
