// WEB HOOKS IMPLEMENTATION

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.post('/send-course-details',(req,res)=>{
    const searchTerm = 'python';
    
    var initalUrl = 'https://digitaldefynd.com/?s='+searchTerm;
    request(initalUrl,function(err,resp,body){
        $=cheerio.load(body);
        link = $('header.entry-header h2.entry-title a');
        var linkOutput = ("Redirection Link:",$(link).attr('href'));

    http.get(linkOutput,(responseFromAPI)=>{

        var url = $(link).attr('href');
        
        request(url, function(err, resp, body){
        $ = cheerio.load(body);
        links = $('div.clearfix div.article-content div.entry-content h3 span strong a'); //jquery get all hyperlinks
        var array = [];

        $(links).each(function(i, link){
        var responseText = ( $(link).text() + " : " + $(link).attr('href'));
        array.push(responseText);
        return array;
        });

        var newArr = []
        var newArr = array.splice(0,3);
       
        var obj = JSON.stringify(newArr);

        let completeResponse = '';
        responseFromAPI.on('data', (chunk) => {
            completeResponse += chunk;
        });
        responseFromAPI.on('end', () => {
            const course_details = JSON.parse(completeResponse);
            let dataToSend = course_name === 'Python' ? `I don't have the required info on that. Here's some info on 'Python' instead.\n` : '';
            dataToSend += `${course_details.name} link is : ${course_details.link}`;

            return res.json({
                speech: dataToSend,
                displayText: dataToSend,
                source: 'course_details'
            });
        });
    }, (error) => {
        return res.json({
            speech: 'Something went wrong!',
            displayText: 'Something went wrong!',
            source: 'course_details'
                });
            });
        }); 
    });
});

app.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});
