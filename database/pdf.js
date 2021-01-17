const AnalyzePDFs = require("../model/AnalyzePDFs.js");

const handlePDFUpload = (req,res, db) => {
    const text = req.body;
	const pdfCollections = db.collection('pdf')
   
	pdfCollections.remove();
	pdfCollections.insertMany(text).then(results => {
		res.send('success');
	}).catch(error => {res.status(400).json('Cannot upload pdfs');})
}

async function handlePDFDownload (req,res,db) {
    const text = req.body;
    const pdfCollections = db.collection('pdf');

    pdfCollections.find().toArray()
	.then(results => {
        const analyzePDFs = new AnalyzePDFs();
        const arrayLength = results.length;
        const sampleUploadMap = new Map();

        for(i=0; i < arrayLength; i++){
            sampleUploadMap.set(results[i].id,results[i].name);
        }

        analyzePDFs
        .analyze(sampleUploadMap, ["Total", "Tax"])
        .then((value) => {
            return value;
        }).then((data)=> {
            console.log(data);
            res.send(JSON.stringify(data));
        })
    })
	.catch(error => console.error(error));
}

module.exports = {
    handlePDFUpload: handlePDFUpload,
    handlePDFDownload: handlePDFDownload
}