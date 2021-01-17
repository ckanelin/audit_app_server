const AnalyzePDFs = require("../model/AnalyzePDFs.js");

const handlePDFUpload = (res,req, db) => {
    const text = req.body;
    const pdfCollections = db.collection('pdf');
    console.log(text);
    pdfCollections.insertMany(text).then(results => {
		res.send('success');
	}).catch(error => {
        // res.status(400).json('Cannot upload pdf');
        res.send('fail');
    })
}

const handlePDFDownload = (res,req,db) => {
    const text = req.body;
    const pdfCollections = db.collection('pdf');

    pdfCollections.find().toArray()
	.then(results => {
        console.log(results.length);
    })
	.catch(error => console.error(error));
}

module.exports = {
    handlePDFUpload: handlePDFUpload
}