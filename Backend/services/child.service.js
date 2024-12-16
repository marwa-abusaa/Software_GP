const childModel = require("../models/child.model");


class childServices {

    static async registerUser(email,createdStroryNum,contestsNum,coursesNum,points) {
        try {
            const createChild= new childModel({ email,createdStroryNum,contestsNum,coursesNum,points});
            return await createChild.save();
        } catch (err) {
            throw err;
        }
    } 

    static async getChildByEmail(email) {
        try {
            return await childModel.findOne({ email });
        } catch (err) {
            console.log(err);
            throw err; // Ensure the error is thrown for upstream handling
        }
    }

    static async  updateUser(email, updatedData) {
         await childModel.updateOne({ email }, { $set: updatedData });
    }
    static async  deleteUserByEmail(email) {

        return await childModel.deleteOne({ email }); 

    }

     static async incrementcontestsNum(email) {
        try {
            const result = await childModel.updateOne(
                { email },            // Filter by email
                { $inc: { contestsNum: 1 } } // Increment studentNum by 1
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
    static async incrementcreatedStroryNum(email) {
        try {
            const result = await childModel.updateOne(
                { email },            // Filter by email
                { $inc: { createdStroryNum: 1 } } // Increment studentNum by 1
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
     static async incrementcoursesNum(email) {
        try {
            const result = await childModel.updateOne(
                { email },            // Filter by email
                { $inc: { coursesNum: 1 } } // Increment studentNum by 1
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

     
  
}

module.exports = childServices;
