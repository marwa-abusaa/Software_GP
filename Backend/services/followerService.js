// services/followerService.js
const Followers = require('../models/followers');
const BookServices = require('../services/book.service');
const UserServices = require('../services/user.services');



// متابعة مستخدم
exports.followUser = async (userEmail, followEmail) => {
  try {
    // أضف المستخدم إلى قائمة المتابعة (following)
    await Followers.findOneAndUpdate(
      { email: userEmail },
      { $addToSet: { following: followEmail } },
      { upsert: true, new: true }
    );

    // أضف المتابع إلى قائمة المتابعين (followers)
    await Followers.findOneAndUpdate(
      { email: followEmail },
      { $addToSet: { followers: userEmail } },
      { upsert: true, new: true }
    );

    return { message: `${userEmail} is now following ${followEmail}` };
  } catch (error) {
    throw new Error('Error while following user: ' + error.message);
  }
};

// إلغاء متابعة مستخدم
exports.unfollowUser = async (userEmail, followEmail) => {
  try {
    // إزالة المستخدم من قائمة المتابعة (following)
    await Followers.findOneAndUpdate(
      { email: userEmail },
      { $pull: { following: followEmail } },
      { new: true }
    );

    // إزالة المتابع من قائمة المتابعين (followers)
    await Followers.findOneAndUpdate(
      { email: followEmail },
      { $pull: { followers: userEmail } },
      { new: true }
    );

    return { message: `${userEmail} has unfollowed ${followEmail}` };
  } catch (error) {
    throw new Error('Error while unfollowing user: ' + error.message);
  }
};

// الحصول على قائمة المتابعين أو المتابعين
exports.getFollowersOrFollowing = async (userEmail, type) => {
  try {
    const user = await Followers.findOne({ email: userEmail });
    if (!user) throw new Error('User not found');

    return user[type]; // يمكن أن تكون "followers" أو "following"
  } catch (error) {
    throw new Error('Error fetching data: ' + error.message);
  }
};

exports.isFollowing = async (userEmail, followEmail) => {
    try {
      const user = await Followers.findOne({ email: userEmail });
      if (!user) throw new Error('User not found');
  
      // تحقق إذا كان followEmail موجودًا في قائمة following
      return user.following.includes(followEmail);
    } catch (error) {
      throw new Error('Error checking following status: ' + error.message);
    }
  };

  // الحصول على الكتب لجميع المستخدمين الذين يتابعهم userEmail
exports.getFollowingBooks = async (userEmail) => {
    try {
      // الحصول على قائمة المتابعة (following)
      const user = await Followers.findOne({ email: userEmail });
      if (!user) throw new Error('User not found');
  
      const followingList = user.following;
  
      // استدعاء getBooksByEmail لكل مستخدم في قائمة following
      const booksPromises = followingList.map((email) => BookServices.getBooksByEmail(email));
      const booksArrays = await Promise.all(booksPromises);
  
      // دمج جميع القوائم في قائمة واحدة
      return booksArrays.flat();
    } catch (error) {
      throw new Error('Error fetching books from following list: ' + error.message);
    }
  };


  exports.searchFollowersOrFollowing = async (userEmail, searchQuery, type) => {
    try {
      // Verify type is valid
      if (!['followers', 'following'].includes(type)) {
        throw new Error('Invalid type. Use "followers" or "following".');
      }
  
      // Find the user's followers or following list
      const user = await Followers.findOne({ email: userEmail });
      if (!user) throw new Error('User not found');
  
      const emailList = user[type]; // Either followers or following
  
      if (!emailList || emailList.length === 0) {
        return []; // No followers or following to search
      }
  
      // Split search query into parts
      const searchTerms = searchQuery.trim().split(' ');
      const firstNameQuery = searchTerms[0] || '';
      const lastNameQuery = searchTerms[1] || '';
  
      // Build the search criteria
      const searchCriteria = {
        email: { $in: emailList },
        $or: [
          { firstName: { $regex: firstNameQuery, $options: 'i' } },
          { lastName: { $regex: firstNameQuery, $options: 'i' } }
        ]
      };
  
      // If there are two search terms, add a condition for full name match
      if (lastNameQuery) {
        searchCriteria.$or.push({
          $and: [
            { firstName: { $regex: firstNameQuery, $options: 'i' } },
            { lastName: { $regex: lastNameQuery, $options: 'i' } }
          ]
        });
      }
  
      // Search users based on criteria
      const results = await UserServices.searchUsersByCriteria(searchCriteria);
      return results;
    } catch (error) {
      throw new Error('Error searching followers or following: ' + error.message);
    }
  };