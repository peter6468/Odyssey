

const axios = require("axios");
const db = require("../models");
const cheerio = require("cheerio");
// Defining methods for the nytController

const scrape = () => {
axios.get("https://www.arabnews.com/economy").then(function (response) {
// Then, we load that into cheerio and save it to $ for a shorthand selector
let $ = cheerio.load(response.data);
$(".article-item-title").each(function (i, element) { //index_value result.value
// Save an empty result object
let result = {};

// Add the text and href of every link, and save them as properties of the result object
result.title = $(this).children().text();
result.link = "https://www.arabnews.com" + $(this).find("a[href]").attr('href');
db.Article.create(result)
.then(function (dbArticle) {

})
.catch(function (err) {
// If an error occurred, send it to the client
return res.json(err);
});
});

// If we were able to successfully scrape and save an Article, send a message to the client
return axios.get("https://www.aljazeera.com/");
}).then(res => {
let $ = cheerio.load(res.data);
let titlesArray = [];

// Now, we grab every h2 within an article tag, and do the following:
$(".latest-news-topic").each(function (i, element) {
// Save an empty result object
let result = {};

result.title = $(this)
.children()
.text();
result.link = "https://www.aljazeera.com" + $(this)
.children()
.attr("href");
result.summary = $(".article-heading-des").text();


console.log(result, "this is the result for alja");
// Create a new Article using the `result` object built from scraping
db.Article.create(result)
.then(function (dbArticle) {
})
.catch(function (err) {
console.log(err, "------------------------")
});
});
})
}

module.exports = {
findAll: function(req,res){
scrape();
db.Article.find({}).then(articles => res.json(articles)).catch(err => res.json(err))
}
};