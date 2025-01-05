const supervisorModel = require("../models/supervisor.model");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

class supervisorServices {

    static async registerUser(email,cv,studentNum) {
        try {
           
            
             // Determine the 'activated' field based on the role
            const activated='not';

            const createSupervisor = new supervisorModel({ email,cv,studentNum,activated});
            return await createSupervisor.save();

            
        } catch (err) {
            throw err;
        }
    } 

    static async getSupervisorByEmail(email) {
        try {
            return await supervisorModel.findOne({ email });
        } catch (err) {
            console.log(err);
            throw err; // Ensure the error is thrown for upstream handling
        }
    }

    static async checkUser(email) {
        try {
            return await supervisorModel.findOne({ email });
        } catch (error) {
            throw error;
        }
    }
    static async  updateUser(email, updatedData) {
         await supervisorModel.updateOne({ email }, { $set: updatedData });
    }
    static async  deleteUserByEmail(email) {

        return await supervisorModel.deleteOne({ email }); 

    }

     // Function to increment the studentNum by one
     static async incrementStudentNum(email) {
        try {
            const result = await supervisorModel.updateOne(
                { email },            // Filter by email
                { $inc: { studentNum: 1 } } // Increment studentNum by 1
            );

            if (result.nModified === 0) {
                throw new Error(`Supervisor with email ${email} not found or studentNum not updated.`);
            }

            return { success: true, message: 'studentNum incremented successfully.' };
        } catch (error) {
            console.error(`Error incrementing studentNum: ${error.message}`);
            throw error;
        }
    }

   // Function to get the supervisor with the minimum studentNum
  static async getSupervisorWithMinStudentNum() {
    try {
        const supervisor = await supervisorModel
            .find({ activated: 'activated' }) // Filter by status 'activated'
            .sort({ studentNum: 1 }) // Sort by studentNum in ascending order
            .limit(1); // Limit to only one result

        if (!supervisor || supervisor.length === 0) {
            throw new Error('No activated supervisors found.');
        }
        return supervisor[0]; // Return the first (and only) supervisor in the array
    } catch (error) {
        console.error(`Error fetching supervisor with minimum studentNum: ${error.message}`);
        throw error;
    }
  }
   // Function to get all supervisors where activated='not'
   static async getSupervisorsWithNotActivated() {
    try {
        const supervisors = await supervisorModel.find({ activated: 'not' });

        if (!supervisors || supervisors.length === 0) {
            throw new Error('No supervisors found with activated status as "not".');
        }

        return supervisors;
    } catch (error) {
        console.error(`Error fetching supervisors with activated='not': ${error.message}`);
        throw error;
    }
}
  
}

module.exports = supervisorServices;
