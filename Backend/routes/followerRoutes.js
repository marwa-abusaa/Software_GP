// routes/followerRoutes.js
const express = require('express');
const router = express.Router();
const followerController = require('../controller/followerController');

router.post('/follow', followerController.followUser);

router.post('/unfollow', followerController.unfollowUser);

router.get('/list', followerController.getFollowersOrFollowing);

router.get('/is-following', followerController.isFollowing);

router.get('/following-books', followerController.getFollowingBooks);

router.get('/searchFollow', followerController.searchFollowersOrFollowing);



module.exports = router;
