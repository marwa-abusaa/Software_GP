const ContestsService = require('../services/contest.services');
exports.addContest =  async (req,res,next)=>{
    try {
        const { supervisorId,title,description,required_score,submit_date,voting_start_date,voting_end_date} = req.body;
        let contestData = await ContestsService.addContest(supervisorId,title,description,required_score,submit_date,voting_start_date,voting_end_date);
        res.json({status: true,success:contestData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.getSupervisorContests = async (req, res, next) => {
    try {
        const { supervisorId } = req.body;
        let contestData = await ContestsService.getSupervisorContests(supervisorId);

        contestData = contestData.map(contest => {
            const { _doc } = contest; // Access main document data

            // Format and clean dates
            return {
                ..._doc,
                submit_date: _doc.submit_date ? _doc.submit_date.toISOString().split('T')[0] : null,
                voting_start_date: _doc.voting_start_date ? _doc.voting_start_date.toISOString().split('T')[0] : null,
                voting_end_date: _doc.voting_end_date ? _doc.voting_end_date.toISOString().split('T')[0] : null,
            };
        });

        res.json({ status: true, success: contestData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};




exports.deleteContest =  async (req,res,next)=>{
    try {
        const { id } = req.body;
        let deletedData = await ContestsService.deleteContest(id);
        res.json({status: true,success:deletedData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.getContestDetails = async (req, res, next) => {
    try {
        const { id } = req.body;
        let contestData = await ContestsService.getContestDetails(id);
        
        if (!contestData) {
            return res.status(404).json({ status: false, message: "Contest not found" });
        }

        const { _doc } = contestData; // Access main document data

        // Format and clean dates
        const formattedContestData = {
            ..._doc,
            submit_date: _doc.submit_date ? _doc.submit_date.toISOString().split('T')[0] : null,
            voting_start_date: _doc.voting_start_date ? _doc.voting_start_date.toISOString().split('T')[0] : null,
            voting_end_date: _doc.voting_end_date ? _doc.voting_end_date.toISOString().split('T')[0] : null,
        };

        res.json({ status: true, success: formattedContestData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

exports.getAllContests =  async (req,res,next)=>{
    try {
        let courses = await ContestsService.getAllContests();
        courses = courses.map(contest => {
            const { _doc } = contest; // Access main document data

            // Format and clean dates
            return {
                ..._doc,
                submit_date: _doc.submit_date ? _doc.submit_date.toISOString().split('T')[0] : null,
                voting_start_date: _doc.voting_start_date ? _doc.voting_start_date.toISOString().split('T')[0] : null,
                voting_end_date: _doc.voting_end_date ? _doc.voting_end_date.toISOString().split('T')[0] : null,
            };
        });
        res.json({status: true,success:courses});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}


// New updateContest function
exports.updateContest = async (req, res, next) => {
    try {
        const { id, supervisorId, title, description, required_score, submit_date, voting_start_date, voting_end_date } = req.body;
        let updatedContest = {};
        if (title) updatedContest.title = title;
        if (description) updatedContest.description = description;
        if (required_score) updatedContest.required_score = required_score;
        if (submit_date) updatedContest.submit_date = submit_date;
        if (voting_start_date) updatedContest.voting_start_date = voting_start_date;
        if (voting_end_date) updatedContest.voting_end_date = voting_end_date;

        await ContestsService.updateContest(id, supervisorId, title, description, required_score, submit_date, voting_start_date, voting_end_date);
        res.json({ status: true, success: updatedContest });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

