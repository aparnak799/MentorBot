var request = require('request');
var cheerio = require('cheerio');
// var searchTerm = 'screen+scraping';
var url = 'https://digitaldefynd.com/best-python-tutorial-class-certification-course-training-online/';
request(url, function(err, resp, body){
  $ = cheerio.load(body);
  links = $('div.clearfix div.article-content p strong a'); //jquery get all hyperlinks
  $(links).each(function(i, link){
    console.log($(link).text() + ':\n  ' + $(link).attr('href'));
  });
});
