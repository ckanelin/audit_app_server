require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;

const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;

const pbc = require('./database/pbc');
const pdf = require('./database/pdf');

const connectionString = "mongodb+srv://cklin:vMDf8oZ4quWAficj@naivebaes.fgmo4.mongodb.net/AuditApp?retryWrites=true&w=majority";

app.use(cors())

app.get('/', (req, res) => {
  MongoClient.connect(connectionString, { 
    useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('audit-app');s

    app.use(express.json());
    app.post('/pbcupload', (req,res) => { pbc.handlePBCUpload(req,res,db);});
    app.get('/pbcdownload', (req,res) => { pbc.handlePBCDownload(req,res,db);});
    app.post('/pdfupload', (req, res) => { pdf.handlePDFUpload(req,res,db);})

  })
  .catch(error => {
    console.error(error);
  })
  res.send('Hello world');
});

app.listen(process.env.PORT||8080, () => {
  console.log(`App is running`);
});



