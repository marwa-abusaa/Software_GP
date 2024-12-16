const UserMarkModel = require("../models/userMark.model");
const UserModel = require("../models/user.model");
const CourseModel = require('../models/courses.model');


class UserMarkService{
    static async addTotalMark(userEmail,courseId,UserTotalMark,totalMark){
            const addTotalMark = new UserMarkModel({userEmail,courseId,UserTotalMark,totalMark});
            return await addTotalMark.save();
    }

    static async checkUserAttempt(userEmail, courseId) {
        return await UserMarkModel.findOne({ userEmail, courseId });
    }

    static async getChildrenMark(courseId) {
        // استرجاع العلامات بناءً على courseId
        const marks = await UserMarkModel.find({ courseId });
    
        // استبدال البريد الإلكتروني باسم المستخدم
        const results = await Promise.all(
            marks.map(async (mark) => {
                // البحث عن المستخدم باستخدام البريد الإلكتروني
                const user = await UserModel.findOne({ email: mark.userEmail });              
    
                return {
                    userName: user ?  `${user.firstName} ${user.lastName}` : "Unknown",// عرض الاسم إذا وجد أو "غير معروف"
                    courseId: mark.courseId,
                    UserTotalMark: mark.UserTotalMark,
                    totalMark: mark.totalMark,
                };
            })
        );
    
        return results;
    }

    static async getMyCourseGrade(userEmail, courseId) {
        // استرجاع العلامات بناءً على courseId
        const marks = await UserMarkModel.find({ userEmail, courseId });
      
        // البحث عن معلومات الدورة التدريبية
        const course = await CourseModel.findById(courseId); // جدول الدورات
    
        // استبدال البريد الإلكتروني باسم المستخدم وإضافة اسم الدورة
        const results = await Promise.all(
            marks.map(async (mark) => {
                // البحث عن المستخدم باستخدام البريد الإلكتروني
                const user = await UserModel.findOne({ email: mark.userEmail });
    
                return {
                    userName: user ? `${user.firstName} ${user.lastName}` : "Unknown", // عرض الاسم إذا وجد أو "غير معروف"
                    courseId: mark.courseId,
                    courseName: course ? course.title : "Unknown Course", // إضافة اسم الدورة أو "غير معروف"
                    UserTotalMark: mark.UserTotalMark,
                    totalMark: mark.totalMark,
                };
            })
        );
    
        return results;
    }

    static async getMyGrades(userEmail) {
        // استرجاع العلامات بناءً على userEmail
        const marks = await UserMarkModel.find({ userEmail });
    
        // استبدال البريد الإلكتروني باسم المستخدم وإضافة اسم الدورة
        const results = await Promise.all(
            marks.map(async (mark) => {
                // البحث عن المستخدم باستخدام البريد الإلكتروني
                const user = await UserModel.findOne({ email: mark.userEmail });
    
                // البحث عن الدورة التدريبية باستخدام courseId
                const course = await CourseModel.findById(mark.courseId);
    
                return {
                    userName: user ? `${user.firstName} ${user.lastName}` : "Unknown", // عرض الاسم إذا وجد أو "غير معروف"
                    courseName: course ? course.title : "Unknown Course", // اسم الدورة إذا وجد
                    courseId:mark.courseId,
                    UserTotalMark: mark.UserTotalMark,
                    totalMark: mark.totalMark,
                };
            })
        );
    
        return results;
    }
    
    

}

module.exports = UserMarkService;