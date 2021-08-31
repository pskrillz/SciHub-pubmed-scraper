var http = require('http'); 
var https = require('https');
var bodyParser = require('body-parser');
const express = require('express');
const { Pool } = require('pg')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


// Tell node not to care about self signed certificates
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;







const app = express();
const port = 5000 || process.env.PORT;
// const connectionString = 'postgres://medtkyjhvkehgg:774a2a40ed2549844969c339696f8e8b822c8774039e97f0a9639e080118551c@ec2-44-195-201-3.compute-1.amazonaws.com:5432/dfnmcotkcoa6fs?sslmode=require'


const pool = new Pool({
 //1 connectionString: connectionString,
 connectionString: process.env.connectionString
//  ssl: { rejectUnauthorized: false }
});



app.get('/articles',
  function(req, res, next){
    pool.query(`SELECT * FROM public."ExternalArticle"`, (err, result) => {

      console.log(err, result);
      
      //Error connecting to DB
      if(err){
        console.log(err);
        return res.status(500).json({
          success: false
        });
      }
      //Successfully grabbed the data, parse it
      else{
        console.log("Successfully grabbed data");
        return res.status(200).json({
          success: true,
          data: result.rows
        });
      }
      
      
      
    });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})





