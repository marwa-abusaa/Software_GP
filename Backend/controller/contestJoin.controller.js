const ContestJoinService = require('../services/contestJoin.service');
const UserServices = require('../services/user.services');



exports.addContestJoin =  async (req,res,next)=>{
    try {
        const { contestName,email,bookName,note} = req.body;

        user=await UserServices.getUserByEmail(email);
        if(!user){
            return res.status(400).json({ status: false, error: `user not found` }); // 409 Conflict

        }
        // Check if the user already exists
        const duplicate = await ContestJoinService.getByContestNameAndEmail(contestName,email);
        if (duplicate) {
            return res.status(409).json({ status: false, error: `you already join this contest` }); // 409 Conflict
        }


        let contestJoinData = await ContestJoinService.addContestJoin(contestName,email,bookName,note,0);
        res.json({status: true,success:contestJoinData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

// get all the participated 
exports.getContestJoinByName = async (req, res, next) => {
    try {
        const { contestName } = req.query; 
        ;  // Extract email from query parameters
     console.log("contestName is" +contestName);
        // Check if the email is provided
        if (!contestName) {
            return res.status(400).json({ status: false, error: 'contestName is required' }); // 400 Bad Request
        }


       const contstJoins =  await ContestJoinService.getContestJoinByName(contestName);
       if (!contstJoins) {
           return res.status(404).json({ status: false, error: 'contstJoins do not exist' }); // 404 Not Found
       }

     
       console.log("successfully get the  contstJoins");
       // Send the user profile as response
       res.status(200).json({ status: true, data: contstJoins  }); // 200 OK
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


exports.deleteAllContestJoin =  async (req,res,next)=>{
    try {
        const { contestName } = req.body;
        let deletedData = await ContestJoinService.deleteContest(contestName);
        res.json({status: true,success:deletedData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.getContestJoinDetailsByNameAndEmail = async (req, res, next) => {
    try {
        const { contestName,email } = req.query; 
        ;  // Extract email from query parameters
     console.log("contestName is" +contestName);
        // Check if the email is provided
        if (!contestName) {
            return res.status(400).json({ status: false, error: 'contestName is required' }); // 400 Bad Request
        }


       const contstJoins =  await ContestJoinService.getByContestNameAndEmail(contestName,email);
       if (!contstJoins) {
           return res.status(404).json({ status: false, error: 'contstJoins or email do not exist' }); // 404 Not Found
       }

     
       console.log("successfully get the  contstJoins");
       // Send the user profile as response
       res.status(200).json({ status: true, data: contstJoins  }); // 200 OK
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

// New updateContest function
exports.updateContestVote = async (req, res, next) => {
    try {
        const { contestName, email } = req.body;

        // Call the service to update the vote
        const result = await ContestJoinService.updateVote(contestName, email);

        if (!result) {
            return res.status(404).json({ status: false, error: 'Contest join entry or email does not exist' });
        }

        // Send the response
        res.json({ status: true, success: `Vote updated to ${result.newVote}` });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

