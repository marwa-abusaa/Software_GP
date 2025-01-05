//const { deleteToDo } = require("../controller/todo.controller");
const ContestsModel = require("../models/contest.model");
const UserModel = require("../models/user.model");
class ContestsService{
    static async addContest(supervisorId,title,description,required_score,submit_date,voting_start_date,voting_end_date,imageUrl){
        
        // Fetch supervisor name using supervisorId
        const supervisor = await UserModel.findById(supervisorId);
        if (!supervisor) {
            throw new Error('Supervisor not found');
        }

        // Combine firstName and lastName to create the full name
        const supervisorName = `${supervisor.firstName} ${supervisor.lastName}`;

        const addContest = new ContestsModel({supervisorId,title,description,supervisorName,required_score,submit_date,voting_start_date,voting_end_date,imageUrl});
        return await addContest.save();
    }

    static async getSupervisorContests(supervisorId) {
        const contestsList = await ContestsModel.find({supervisorId})
        return contestsList;
    }

    static async getContestDetails(id) {
        const contestDetails = await ContestsModel.findById(id);
        return contestDetails;
    }
    
    static async getAllContests() {
        const contestsList = await ContestsModel.find({});
        return contestsList;
    }    


   static async deleteContest(id){
        const deleted = await ContestsModel.findByIdAndDelete({_id:id})
        return deleted;
   }

   static async updateContest(id, supervisorId, title, description, required_score, submit_date, voting_start_date, voting_end_date,imageUrl) {
    // Fetch the contest by ID
    const contest = await ContestsModel.findById(id);
    
    // Check if the contest exists and if the supervisorId matches
    if (!contest || contest.supervisorId.toString() !== supervisorId) {
        throw new Error('Contest not found or you do not have permission to update it');
    }

    // Update contest details
    if(title) contest.title = title;
    if(description) contest.description = description;
    if(required_score) contest.required_score = required_score;
    if(submit_date) contest.submit_date = submit_date;
    if(voting_start_date) contest.voting_start_date = voting_start_date;
    if(voting_end_date) contest.voting_end_date = voting_end_date;
    if(imageUrl) contest.imageUrl=imageUrl;

    // Save the updated contest
    return await contest.save();
}

}

module.exports = ContestsService;