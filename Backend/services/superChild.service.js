const superChildModel = require("../models/superChild.model");
const supervisorServices = require('../services/supervisor.service');


class superChildServices {

    static async registerUser(superEmail,childEmail) {
        try {

            const createSupervisor = new superChildModel({superEmail,childEmail});
            await supervisorServices.incrementStudentNum(superEmail);
            return await createSupervisor.save();


        } catch (err) {
            throw err;
        }
    } 

    static async getChildrenBySupervisorEmail(superEmail) {
        try {
            return await superChildModel.find
            ({ superEmail });
        } catch (err) {
            console.log(err);
            throw err; // Ensure the error is thrown for upstream handling
        }
    }

    static async getUser(childEmail) {
        try {
            return await superChildModel.findOne({ childEmail });
        } catch (error) {
            throw error;
        }
    }

    static async  deleteUserByEmail(childEmail) {

        return await superChildModel.deleteOne({ childEmail }); 

    }

     // Email sending function
  
}

module.exports = superChildServices;
