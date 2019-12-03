//*********************Name & URL is fully a String,because no MAP function is used*****************************************/
//*********************OUTPUT IS A STRING ARRAY ************************************/
var request = require('request');
var cheerio = require('cheerio');
var searchTerm = 'python';
var initalUrl = 'https://digitaldefynd.com/?s='+searchTerm;
request(initalUrl,function(err,resp,body){
$=cheerio.load(body);
link = $('header.entry-header h2.entry-title a');
// $(links).each(function(i,link){
  var linkOutput = ("Redirection Link:",$(link).attr('href'));
// });
//});
//   console.log(linkOutput);
  var stringified = JSON.stringify(linkOutput);
  console.log(stringified);
//   console.log("Stringified URL is:",stringified);
//   console.log(typeof(stringified));
  
var url = $(link).attr('href');
//console.log("Same url:",url);
request(url, function(err, resp, body){
$ = cheerio.load(body);
links = $('div.clearfix div.article-content div.entry-content h3 span strong a'); //jquery get all hyperlinks
var array = [];

$(links).each(function(i, link){
  var responseText = ( $(link).text() + " : " + $(link).attr('href'));
  array.push(responseText);
  return array;
});
// var resText = JSON.stringify(array)
// console.log(resText[1])

// console.log("This is array[1]:",array[1]);
// console.log("Type of array is :",typeof(array));  => Object
var newArr = []
var newArr = array.splice(0,3);
// console.log(newArr);
var obj = JSON.stringify(newArr);
console.log(obj);
// console.log("I am hoping this is how you want it:",obj);
// console.log("Type is :",typeof(obj));              => String
    });
});