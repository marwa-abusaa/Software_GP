const ContestsJoinModel = require("../models/contestJoin.model");
class ContestsJoinService{
    static async addContestJoin(contestName,email,bookName,note,vote){
        try {
            console.log("-----contestName --- email-----", contestName, email);
            
            const createContestJoin = new ContestsJoinModel({ contestName, email, bookName, note,vote});
            return await createContestJoin.save();
        } catch (err) {
            throw err;
        }
    }

    static async getByContestNameAndEmail(contestName, email) {
        const contestsJoin = await ContestsJoinModel.findOne({
            contestName: contestName,
            email: email
        });
        return contestsJoin; // Return the fetched data
    }

    static async getByBookName(bookName) {
        const contestsJoin = await ContestsJoinModel.findOne({
            bookName: bookName,
    
        });
        return contestsJoin; // Return the fetched data
    }

    static async getContestJoinByName(contestName) {
        const ContestJoin = await ContestsJoinModel.find({ contestName: contestName });
        return ContestJoin; // Return the list of contests with the specified name
    }    
    
    static async deleteContest(contestName) {
        const deleted = await ContestsJoinModel.deleteMany({ contestName: contestName });
        return deleted; // Returns an object with details about the operation
    }
    static async updateVote  (contestName,bookName) {
        try {
            // Fetch the contest join entry based on contestName and email
            const contestJoin = await ContestsJoinModel.findOne({ contestName,bookName});
            if (!contestJoin) {
                return null; // Entry not found
            }
    
            // Increment the vote count
            const newVote = contestJoin.vote + 1;
    
            // Update the vote count in the database
            contestJoin.vote = newVote;
            await contestJoin.save();
    
            return { newVote }; // Return the updated vote count
        } catch (error) {
            throw error; // Propagate the error to be handled by the controller
        }
    };

   

}

module.exports = ContestsJoinService;