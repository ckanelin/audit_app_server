const handlePBCUpload = (req, res, db) => {
	const text = req.body;
	const pbcCollections = db.collection('pbc')

	pbcCollections.remove();
	pbcCollections.insertMany(text).then(results => {
		res.send('success');
	}).catch(error => {res.status(400).json('Cannot register user');})

}

const handlePBCDownload = (req, res, db) => {
	const text = req.body;
	const pbcCollections = db.collection('pbc')

	pbcCollections.find().toArray()
	.then(results => {
	res.send(results);
	})
	.catch(error => console.error(error));
}

module.exports = {
	handlePBCUpload: handlePBCUpload,
	handlePBCDownload: handlePBCDownload
}