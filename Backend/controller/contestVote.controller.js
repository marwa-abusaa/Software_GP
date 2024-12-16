const ContestVoteService = require('../services/contestVote.service');
const ContestJoinService = require('../services/contestJoin.service');

const UserServices = require('../services/user.services');


exports.addContestVote = async (req, res, next) => {
    try {
        const { contestName, email, book1, book2, book3 } = req.body;

        // Check if user exists
        const user = await UserServices.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ status: false, error: `User not found` });
        }

        // Check if the user has already voted in this contest
        const duplicate = await ContestVoteService.checkVote(contestName, email);
        if (duplicate) {
            return res.status(409).json({ status: false, error: `You have already voted in this contest` });
        }

        // Collect all book names provided
        const books = [
            { name: book1, label: 'Book 1' },
            { name: book2, label: 'Book 2' },
            { name: book3, label: 'Book 3' },
        ].filter(book => book.name); // Remove null or undefined books

        // Validate all books
        const validatedBooks = [];
        for (const { name, label } of books) {
            const book = await ContestJoinService.getByBookName(name);
            if (!book) {
                return res.status(400).json({ status: false, error: `${label} (${name}) not found` });
            }
            if (book.email === email) {
                return res.status(400).json({ status: false, error: `You cannot vote for your own ${label} (${name})` });
            }
            validatedBooks.push(book);
        }

        // Apply votes only if all validations pass
        for (const { name } of books) {
            await ContestJoinService.updateVote(contestName, name);
        }

        // Add the vote entry
        const contestVoteData = await ContestVoteService.addContestVote(contestName, email);
        res.json({ status: true, success: contestVoteData });
    } catch (error) {
        console.error(error, 'err---->');
        next(error);
    }
};


exports.checkVote = async (req, res, next) => {
    const { contestName, email } = req.body;

     // Check if the user has already voted in this contest
     const duplicate = await ContestVoteService.checkVote(contestName, email);
     if (duplicate) {
         return res.status(409).json({ status: false, error: `You have already voted in this contest` });
     }
     else{
        return res.status(200).json({ status: false, error: `You can vote` });

     }


    }