// controllers/followerController.js
const followerService = require('../services/followerService');

// متابعة مستخدم
exports.followUser = async (req, res) => {
  const { userEmail, followEmail } = req.body; // userEmail: المتابع, followEmail: المُتابَع
  try {
    const result = await followerService.followUser(userEmail, followEmail);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// إلغاء متابعة مستخدم
exports.unfollowUser = async (req, res) => {
  const { userEmail, followEmail } = req.body;
  try {
    const result = await followerService.unfollowUser(userEmail, followEmail);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getFollowersOrFollowing = async (req, res) => {
  const { userEmail, type } = req.query; // type: "followers" أو "following"
  try {
    const list = await followerService.getFollowersOrFollowing(userEmail, type);
    
    // تعديل البيانات بحيث كل عنصر في القائمة يحتوي على "email"
    const formattedList = list.map(email => ({ email })); // تحويل القائمة إلى كائنات تحتوي على email

    res.status(200).json({ list: formattedList }); // إرجاع البيانات بالتنسيق الجديد
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.isFollowing = async (req, res) => {
    const { userEmail, followEmail } = req.query;
    try {
      const isFollowing = await followerService.isFollowing(userEmail, followEmail);
      res.status(200).json({ isFollowing });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  // الحصول على الكتب لجميع المستخدمين الذين يتابعهم userEmail
exports.getFollowingBooks = async (req, res) => {
    const { userEmail } = req.query;
    try {
      const books = await followerService.getFollowingBooks(userEmail);
      res.status(200).json({ books });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  exports.searchFollowersOrFollowing = async (req, res) => {
    const { userEmail, searchQuery, type } = req.query;
    try {
      const results = await followerService.searchFollowersOrFollowing(userEmail, searchQuery, type);
      res.status(200).json({ results });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };