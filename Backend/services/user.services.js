const UserModel = require("../models/user.model");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

class UserServices {

    static async registerUser(email, password, firstName, lastName, gender, birthdate,role,cv) {
        try {
            console.log("-----Email --- Password-----", email, password);
            
             // Determine the 'activated' field based on the role
        const activated = role === 'supervisor' ? 'not' : 'activated';

            const createUser = new UserModel({ email, password, firstName, lastName, gender, birthdate,role,cv,activated});
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


}

module.exports = UserServices;
