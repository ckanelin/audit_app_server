const MongoClient = require('mongodb').MongoClient;
const bodyParser= require('body-parser');

const express = require('express');
const app = express();
const port = 8080;

const pbc = require('./database/pbc');

const connectionString = "mongodb+srv://cklin:vMDf8oZ4quWAficj@naivebaes.fgmo4.mongodb.net/AuditApp?retryWrites=true&w=majority";

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});


MongoClient.connect(connectionString, { 
    useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('audit-app');

    app.use(express.json());
    app.post('/pbcrequpload', (req,res) => { pbc.handlePBCReqUpload(req,res,db);});

  })
  .catch(error => console.error(error))


