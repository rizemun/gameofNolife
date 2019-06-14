const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const http = require('http');

let server = http;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'rizemun',
  password: '0000',
  database: 'gameofnolife'
});

console.log('Server is starting.');

//Check connection
connection.connect(function(err){
  if(err) throw err;
  console.log('Connected to MySQL')
});


//Init app
const app = express();
const expressWs = require('express-ws')(app);


let olo = require('./models/user')(connection);





/*
//Bring in models
let Article = require('./models/article');
*/


//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json
app.use(bodyParser.json());

app.use(function(req, res, next){
  req.testing = 'testing';
  return next();
});

console.log('start routines');

//Home route
app.get('/', function(req, res) {
    // res.sendFile('./html/index.html');
    connection.query('SELECT * FROM user', function (err, result, fields) {
        if (err) throw err;

        console.log(result);

        res.render('index', {
            title: 'List of users',
            users: result,
        });
    });

});

app.get('/ws/:id', function(req, res) {
  // res.sendFile(path.join(__dirname, 'html/index.html'))
  let obj = {title:"Новость",id: 4}
  res.render('ws',{
    id: req.params.id,
    obj:obj
  });
});


/*
//Get Single article
app.get('/article/:id',function(req, res){
  Article.findById(req.params.id,function(err, article){
    res.render('article',{
      article: article
    });
  })
});

//Add route
app.get('/articles/add', function(req, res){
  res.render('add_article', {
    title: 'Add Article'
  })
});


//Add Sumbit POST route
app.post('/articles/add',function(req, res){
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;
  article.save(function(err){
    if(err){
      console.log(err);
    }
    else {
      res.redirect('/');
    }
  });

});


app.ws('/', function(ws, req){

  ws.on('message',function(msg) {
    console.log(msg);
    let clientsList = expressWs.getWss().clients;

    // console.log(clientsList)
    clientsList.forEach(function(client){
      client.send(msg)
    })

  });
  console.log('socket', req.testing);
});


*/

//Start server
app.listen(3000, function(){
  console.log('Server started on port 3000');
});
