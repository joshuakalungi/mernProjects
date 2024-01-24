{/*import the express module inorder to intialize an express app*/}

import express from 'express'
import devBundle from './devBundle'
import path from 'path'
import template from './../template'
import { MongoClient } from 'mongodb'

const app = express()
{/* then we will use this express app to build out the rest of the Node server application*/}
devBundle.compile(app)
{/* we will use the Express app to listen on the port 3000*/}

const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
{/* we will use the Express app to serve static files from the dist folder*/}

app.get('/', (req, res) => {
    res.status(200).send(template())
})

let port = process.env.PORT || 3000
app.listen(port, function onStart(err) {
    if (err) {
        console.log(err)
    }
    console.info('Server started on port %s.', port)
})
{/* we will use the Express app to listen on the port 3000*/}

{/* we will connect to the MongoDB database using the Mongoose library*/}
// Database Connection URL
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup'
// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },(err, db)=>{
  console.log("Connected successfully to mongodb server")
  db.close()
})
