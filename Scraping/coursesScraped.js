// ******************Name and Link is a JSON Key Value Pair,because of MAP function implemented**************************************************************/
//******************OUTPUT IS AN ARRAY OF JSON OBJECTS ****************/

var request = require('request');
var cheerio = require('cheerio');
var searchTerm = 'data science';

                //************************Initial URL appending**********************************/
var initalUrl = 'https://digitaldefynd.com/?s='+searchTerm;

request(initalUrl,function(err,resp,body){
  $=cheerio.load(body);
  link = $('header.entry-header h2.entry-title a');
  // $(links).each(function(i,link){
  //  console.log("Redirection Link:",$(link).attr('href')); 
  // });
// });
  
            //*************Catching the URL and progressing further************/

var url = $(link).attr('href');
// console.log("Same url:",url);
request(url, function(err, resp, body){
  $ = cheerio.load(body);
  links = $('div.clearfix div.article-content div.entry-content h3 span a'); //jquery get all hyperlinks
  ratings = $('div.clearfix div.article-content div.entry-content p strong:contains(Rating)'); 
  
          //************************Printing all Course Links*************** */
  var courseName = [];
  var courseLink = [];
  $(links).each(function(i, link){
    courseName.push($(link).text());
    courseLink.push($(link).attr('href'));
    return courseName,courseLink;
    });
    // console.log("courseName is:",courseName);
    // console.log("courseLink is:",courseLink);
    // wantedCourseName = JSON.stringify(courseName);
    // console.log(wantedCourseName);
    // wantedCourseLink = JSON.stringify(courseLink);
    // console.log(wantedCourseLink);
    // **********************HashTable for courseName & courseLink**********************//
    var output1 = courseLink.map(function(obj,index){
      var myobj = {};
      myobj[courseName[index]] = obj;
      return myobj;
    })
    // console.log("Key value pair for Name & Link"+":\n",output1);
    console.log("Name & Link Pair:");
    var wantedOutput1 = JSON.stringify(output1);
    console.log(wantedOutput1);
        //***************************Printing all Ratings*******************************************/
  var ratingArray = [];
  $(ratings).each(function(i, rating){
      
    ratingArray.push($(rating).text());
      return ratingArray
      });
      // console.log("ratingArray is:",ratingArray);
      
      //***************************HashTable for courseName & courseRating ************/
      var output2 = ratingArray.map(function(obj,index){
        var myobj = {};
        myobj[courseName[index]] = obj;
        return myobj;
      })
      //console.log("Key value pair for Name & Rating"+":\n",output2);
      console.log("Name & Rating Pair:");
      var wantedOutput2 = JSON.stringify(output2);
      console.log(wantedOutput2);
    });
});