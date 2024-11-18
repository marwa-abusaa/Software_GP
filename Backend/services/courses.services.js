//const { deleteToDo } = require("../controller/todo.controller");
const CoursesModel = require("../models/courses.model");

class CoursesService{
    static async addCourse(supervisorId,title,courseType,description,supervisorName,score,link){
            const addCourse = new CoursesModel({supervisorId,title,courseType,description,supervisorName,score,link});
            return await addCourse.save();
    }

    static async getSupervisorCourses(supervisorId) {
        const coursesList = await CoursesModel.find({supervisorId})
        return coursesList;
    }

    static async getCourseDetails(id) {
        const coursesDetails = await CoursesModel.findById(id);
        return coursesDetails;
    }
    
    static async getAllCourses() {
        const coursesList = await CoursesModel.find({});
        return coursesList;
    }    


   static async deleteCourse(id){
        const deleted = await CoursesModel.findByIdAndDelete({_id:id})
        return deleted;
   }
}

module.exports = CoursesService;