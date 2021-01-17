require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;

const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;

const pbc = require('./database/pbc');
const pdf = require('./database/pdf');

const connectionString = process.env.CONNECTION_STRING;
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello world');
});

// const PORT = (process.env.PORT||8080);
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`App is running`);
});

MongoClient.connect(connectionString, { 
  useUnifiedTopology: true })
.then(client => {
  console.log('Connected to Database');
  const db = client.db('audit-app');

  app.use(express.json());
  app.post('/pbcupload', (req,res) => { pbc.handlePBCUpload(req,res,db);});
  app.get('/pbcdownload', (req,res) => { pbc.handlePBCDownload(req,res,db);})
  app.post('/pdfupload', (req, res) => { pdf.handlePDFUpload(req,res,db);})
  app.get('/pdfdownload', (req,res) => { 
    const pdf_kv = pdf.handlePDFDownload(req,res,db);
  })

})
.catch(error => {
  console.error(error);
})

