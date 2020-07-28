const express = require('express')
const bodyParser = require('body-parser')
const finder = require('./find')
const app = express()


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index')
})

app.post('/', function(req, res) {
    res.render('index');
    if(req.body.tempDir != "" && req.body.tempDir != undefined){
        finder.find(req.body.tempDir)
    }
})

app.listen(3000, function () {
  console.log('Shit, here we go again!')
})