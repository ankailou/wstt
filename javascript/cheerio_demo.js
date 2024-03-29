var cheerio = require('cheerio');
var request = require('request');

var header = []
var data = []

//Request a wikipedia page of your choosing
request({
    method: 'GET',
    url: 'https://en.wikipedia.org/wiki/Node.js'
}, function(err, response, body) {
    //Error check to make sure you got the page
    if (err) return console.error(err);
    
    //Load the page into cheerio
    $ = cheerio.load(body);

    //Select the table header from each table row
    $('.infobox tr th').each(function(){
        //Push the table header into our header array
        header.push($(this).text());
        //Push the next element (table data) into our data array
        data.push($(this).next().text());
    });

    //Print out each header with its information on the command line
    for (i = 0; i < header.length; i++) {
        console.log(header[i] + ' = ' + data[i]);
    }
});
