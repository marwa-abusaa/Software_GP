const CoursesService = require('../services/courses.services');

exports.addCourse =  async (req,res,next)=>{
    try {
        const { supervisorId,title,courseType,description,supervisorName,score,link} = req.body;
        let courseData = await CoursesService.addCourse(supervisorId,title,courseType,description,supervisorName,score,link);
        res.json({status: true,success:courseData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.getSupervisorCourses =  async (req,res,next)=>{
    try {
        const { supervisorId } = req.body;
        let courseData = await CoursesService.getSupervisorCourses(supervisorId);
        res.json({status: true,success:courseData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.deleteCourse =  async (req,res,next)=>{
    try {
        const { id } = req.body;
        let deletedData = await CoursesService.deleteCourse(id);
        res.json({status: true,success:deletedData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.getCourseDetails =  async (req,res,next)=>{
    try {
        const { id } = req.body;
        let courseData = await CoursesService.getCourseDetails(id);
        res.json({status: true,success:courseData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.getAllCourses =  async (req,res,next)=>{
    try {
        let courses = await CoursesService.getAllCourses();
        res.json({status: true,success:courses});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}