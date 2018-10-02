var request = require('request');
var token = require('./secrets');
var fs = require('fs');
var request =require('request');


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb){
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + token.GITHUB_TOKEN
    }
  };


  request(options, function(err, res, body){
    var jsonObject = JSON.parse(body);
    cb(err, jsonObject);
  });

}

var input1 = process.argv[2];
var input2 = process.argv[3];

if (input1 != undefined && input2 != undefined) {
  getRepoContributors(input1, input2, function(err, result) {

    console.log("Errors:", err);

    result.forEach(function(element){
      var url = element.avatar_url;
      var filePath ='avatars/' + element.login + '.jpg'
      downloadImageByURL(url,filePath);
  });

  });
} else {
  console.log("Ya dun goofed! You need to give me the values! \n May I suggest 'Jquery' perhaps?")
}

function downloadImageByURL(url, filePath) {
  //I will access a URL and then I will download the imaf=ge from it
  request.get(url)
  .on('error', function (err){
    console.log('Danger Will Robinson! ----- ', err);
  })
  .on('response', function(response){
    console.log(response.statusMessage)
    console.log(response.headers['content-type'])
  })
  .pipe(fs.createWriteStream(filePath));
}













