const UserModel = require("../models/user.model");
const jwt = require('jsonwebtoken');

class UserServices {

    static async registerUser(email, password, firstName, lastName, gender, birthdate,role) {
        try {
            console.log("-----Email --- Password-----", email, password);
            
            const createUser = new UserModel({ email, password, firstName, lastName, gender, birthdate,role });
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

}

module.exports = UserServices;
