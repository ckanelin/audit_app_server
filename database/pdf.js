const handlePDFUpload = (res,req,db) => {
    const text = req.body;
    const pdfCollections = db.collection('pdf');
    pdfCollections.insertMany(text.data).then(results => {
		res.send('success');
	}).catch(error => {res.status(400).json('Cannot upload pdf');})
}

module.exports = {
    handlePDFUpload: handlePDFUpload
}