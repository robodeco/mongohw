var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var request = require("request");

var db = require("./models");

var app = express();
var PORT = 3000;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/webScraper_db";

app.use(logger("dev"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

//routes

app.get("/scrape", function(req, res) {

  axios.get("https://www.reddit.com/r/ProgrammerHumor/").then(function(response) {

    var $ = cheerio.load(response.data);
    var result = {};

    $(".title").each(function(i, element) {

      result.link = $(element).children().attr("href");
      result.title = $(element).text();

        db.Headline.create(result).then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch (function(err){
          return res.json(err);
          });


        db.Note.create(result).then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch (function(err){
          return res.json(err);
          });


      res.send("scrape complete");
    });
  })
  .catch(error => console.error(error));
});

app.get("/articles", function(req, res) {

  // db.Article.find({})
  //   .then(function(dbArticle) {
  //     res.json(dbArticle);
  //   })
  //   .catch(function(err) {
  //     res.json(err);
  //   });
});

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
