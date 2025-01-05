const RecordingsServices = require('../services/recordings.service');
const RecordingsModel = require("../models/recordings.model");


exports.addRecord = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const { pdfId, url} = req.body;

        // Check for missing parameters
        if (!url || !pdfId ) {
            console.log("BODY    "+ pdfId, url)
            return res.status(400).json({ status: false, error: 'URL and pdfId are required' }); // 400 Bad Request
        }

        // Register the recorde
        const response = await RecordingsServices.addNewRecord(pdfId,url);
        res.status(201).json({ status: true, success: 'Image has been added successfully' }); // 201 Created
    } catch (err) {
        console.log("---> err -->", err);
        next(err); // Forward error to the error handler
    }
}

exports.getAudioRecordsByPdfId = async (req, res, next) => {
    try {
        const { pdfId } = req.body;

        if (!pdfId) {
            return res.status(400).json({ status: false, error: "pdfId is required" });
        }

        const records = await RecordingsModel.find({ pdfId: pdfId }); // Assuming "Recordings" is your Mongoose model

        if (!records.length) {
            return res.status(404).json({ status: false, error: "No audio records found" });
        }

        res.status(200).json({ status: true, data: records });
    } catch (err) {
        console.log("---> Error --->", err);
        next(err);
    }
};





