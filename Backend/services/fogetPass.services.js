const nodemailer = require('nodemailer');
const UserServices = require('../services/user.services');
class forgetPassServices {
  // Function to generate a random 8-character password
  static generateRandomPassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  // Email sending function
  static async sendResetEmail(user) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', 
      auth: {
        user: 'ayabaara4@gmail.com',
        pass: 'igsp qxll edyx pwte',
      },
    });

    // Generate random password
    const newPassword = this.generateRandomPassword();

    const mailOptions = {
      from: 'ayabaara4@gmail.com',
      to: user.email,
      subject: 'Password Reset for Tiny Tales account',
      text: `Your new password is: ${newPassword}\nPlease use this password to log in and change it later.`,
    };

    await transporter.sendMail(mailOptions);
    UserServices.updaetPassword(user,newPassword);

  }
}

module.exports = forgetPassServices;
