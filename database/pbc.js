const handlePBCReqUpload = (req, res, db) => {
	const text = req.body;
      const pbcCollections = db.collection('pbc')

      pbcCollections.insertOne(text).then(results => {
		res.send('success');
	  }).catch(error => {res.status(400).json('Cannot register user');})
}

module.exports = {
	handlePBCReqUpload: handlePBCReqUpload
}