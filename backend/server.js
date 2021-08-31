var http = require('http'); 
var https = require('https');
var request = require('request');
var cheerio = require('cheerio');
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


const pool = new Pool({
 connectionString: process.env.connectionString
//  ssl: { rejectUnauthorized: false }
});


const PUBMED_BASE_URL = "https://pubmed.ncbi.nlm.nih.gov/";



app.get('/abstract/:id',
  function(req, res, next){

    request({
      method: 'GET',
      url: PUBMED_BASE_URL + req.params.id
  }, (err, result, body) => {
      //console.log(result);

      Object.keys(result).forEach((prop)=> console.log(prop));
      console.log("Status code: " + result.statusCode);

      //Handle error with request, somehow could not reach pubmed
      if (err){
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }

      //Verify page exists
      if(!result.hasOwnProperty("statusCode") || result.statusCode != 200)
        return res.status(400).json({
          success: false,
          message: "Invalid article ID"
        });

      //Page exists, so now lets scrape the abstract
      try{
        var $ = cheerio.load(body);
        var abstract = $("#enc-abstract");
        
        //Abstract div is not on the page, return a 404 to the user
        if(abstract == undefined){
          return res.status(404).json({
            success: false,
            message: "Abstract not found"
          });
        }

        //Abstract div is on the page, return the text from the div
        return res.status(200).json({
          success: true,
          data: {
            abstract: abstract.text()
          }
        });



      }
      catch(err){
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    
  });
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





