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

getRepoContributors("jquery", "jquery", function(err, result) {
  var returnMe = [];

  for (var i = 0; i < result.length; i++) {
    returnMe.push(result[i].avatar_url);
  }

  console.log("Errors:", err);
  console.log("Result:", returnMe);
});

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

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./avatars/kvirani.jpg");


















