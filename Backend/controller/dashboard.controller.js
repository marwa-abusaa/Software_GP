
const db = require('../config/db');

exports.getCount = async (req, res, next) => {
    try {
        const { collectionName, role } = req.params; // استخراج اسم المجموعة والدور من الرابط

        // الوصول إلى المجموعة المطلوبة
        const collection = db.collection(collectionName);

        // إذا تم تمرير الدور، احسب عدد العناصر التي تطابق الدور
        const query = role ? { role } : {};

        // عدّ العناصر في المجموعة
        const count = await collection.countDocuments(query);

        res.status(200).json({ status: true, count }); // رد يحتوي على عدد العناصر
    } catch (error) {
        console.error(error);
        next(error); // تمرير الخطأ إلى معالج الأخطاء
    }
};
