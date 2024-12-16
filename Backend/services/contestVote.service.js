const ContestsVoteModel = require("../models/contestVote.model");
class ContestsVoteService{
    static async addContestVote(contestName,email){
        try {
            console.log("-----contestName --- email-----", contestName, email);
            
            const createContestJoin = new ContestsVoteModel({ contestName, email});
            return await createContestJoin.save();
        } catch (err) {
            throw err;
        }
    }

    static async checkVote(contestName, email) {
        const contestsVote = await ContestsVoteModel.findOne({
            contestName: contestName,
            email: email
        });
        return contestsVote; // Return the fetched data
    }
    static async deleteContestVotes(contestName) {
        const deleted = await ContestsVoteModel.deleteMany({ contestName: contestName });
        return deleted; // Returns an object with details about the operation
    }
    

}

module.exports = ContestsVoteService;