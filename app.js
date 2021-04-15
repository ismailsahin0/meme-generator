const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const fs = require('fs');


const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}!`));

// Serve HTML
app.get('/', (req, res) => {
  res.sendFile('./public/home.html', {
    root: __dirname
  });
});


app.post('/input', (req, res) => {
  https://api.memegen.link/images/custom/deneme/ismail.png?background=http://www.gstatic.com/webp/gallery/1.png
  var config = {
    method: 'get',
    url: ' https://api.memegen.link/images/custom/' + req.body.top + '/' + req.body.bottom + '.png?background=' + req.body.imageUrl + '',
    responseType: 'stream'
  };

  axios(config)
    .then(function (response) {
      //console.log(JSON.stringify(response.data));
      stream = response.data.pipe(fs.createWriteStream("./public/result.jpg"));
      stream.on('finish', function(){res.redirect('/result');});
      
    })
    .catch(function (error) {
      console.log(error);
      res.redirect('/error');
    });

  //generateMeme(req.body.top, req.body.bottom, req.body.imageUrl);
  //res.redirect('/result');
});

app.get('/result', (req, res) => {
  res.sendFile('./public/result.html', {
    root: __dirname
  });
});

app.get('/error', (req, res) => {
  res.sendFile('./public/error.html', {
    root: __dirname
  });
});



function generateMeme(top, bottom, imageUrl) {
  var config = {
    method: 'post',
    url: 'https://meme.as-a-service.dev/?top=' + top + '&bottom=' + bottom + '&image=' + imageUrl + '',
    responseType: 'stream'
  };

  axios(config)
    .then(async function (response) {
      //console.log(JSON.stringify(response.data));
      var file = response.data.pipe(fs.createWriteStream("./public/result.jpg"));
      return file;
    })
    .catch(function (error) {
      console.log(error);
    });

}