
var screenshotmachine = require('screenshotmachine');
var fs = require('fs'); // to save the image locally
var drive = require("./gdrive_api")

var customerKey = '6abd21';
    secretPhrase = ''; //leave secret phrase empty, if not needed
    options = {
      url : 'https://www.google.com',   //will be replaced on runtime
      dimension : '1920x1080', 
      device : 'desktop',
      format: 'jpg',
      cacheLimit: '0',
      delay: '200',
    }

//could also be an external json file
var sitesToScreenshot = [
    {
        id:1,
        name:'iFunded',
        website:'https://ifunded.de/en/'
    },
    {
        id:2,
        name:'Property Partner',
        website:'https://www.propertypartner.co'
    },
    {
        id:3,
        name:'Property Moose',
        website:'https://propertymoose.co.uk'
    },
    {
        id:4,
        name:'Homegrown',
        website:'https://www.homegrown.co.uk'
    },
    {
        id:5,
        name:'Realty Mogul',
        website:'https://www.realtymogul.com'
    }
]

console.log("Generating screenshots.... Please wait!");
sitesToScreenshot.forEach( function(site){
  let output_name = site.id + "_" + site.name + ".jpg";
  let img_path = "./img_local/" + output_name;
  options["url"] = site.website
  var apiUrl = screenshotmachine.generateScreenshotApiUrl(customerKey, secretPhrase, options);
  screenshotmachine.readScreenshot(apiUrl).pipe(fs.createWriteStream(img_path).on('close',  function() {
    drive.uploadFile(output_name, img_path);
  }));
  
})

