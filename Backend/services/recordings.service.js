const RecordingsModel = require("../models/recordings.model");

class RecordingsService{

static async addNewRecord(pdfId, url) {
    try {
        console.log("-----pdfId --- url-----", pdfId, url);
        
        const addRecord = new RecordingsModel({ pdfId, url});
        return await addRecord.save();  // <--- Ensure you're returning this
    } catch (err) {
        throw err;
    }
} 

}
module.exports = RecordingsService;