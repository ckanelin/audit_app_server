const MongoClient = require('mongodb').MongoClient;

const express = require('express');
const app = express();
const port = 8000;

const connectionString = "mongodb+srv://cklin:vMDf8oZ4quWAficj@naivebaes.fgmo4.mongodb.net/AuditApp?retryWrites=true&w=majority";

MongoClient.connect(connectionString, { 
    useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('audit-app')

  })
  .catch(error => console.error(error))

// async function main(){
//     /**
//      * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//      * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//      */
//     const uri = "mongodb+srv://cklin:vMDf8oZ4quWAficj@naivebaes.fgmo4.mongodb.net/AuditApp?retryWrites=true&w=majority";
//     const client = new MongoClient(uri);
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
//         // Make the appropriate DB calls
//         await  listDatabases(client);
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }
// main().catch(console.error);

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
