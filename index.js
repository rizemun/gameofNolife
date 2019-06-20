const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const http = require('http');
const md5 = require('md5');
const session = require('express-session');
const cookieParser = require('cookie-parser');

let server = http;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'rizemun',
    password: '0000',
    database: 'gameofnolife'
});

console.log('Server is starting.');

//Check connection
connection.connect(function (err) {
    if (err) throw err;
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
app.use(bodyParser.urlencoded({extended: false}))
//parse application/json
app.use(bodyParser.json());

app.use(function (req, res, next) {
    req.testing = 'testing';
    return next();
});

app.use(express.static(path.join(__dirname, 'static')));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

//Home route
app.get('/', function (req, res) {

    // res.sendFile('./html/index.html');
    connection.query('SELECT * FROM user', function (err, result, fields) {
        if (err) throw err;


        // res.render('index', {
        //     title: 'List of users',
        //     users: result,
        // });


        res.render('registration', {
            title: 'Registration',
            username: ''
        });
    });


    console.log(req.session);
    console.log(req.cookie);
});




app.get('/item', function(req, res) {
    console.log(req.session);
    req.session.message = 'Hello World';
    console.log(req.session);
});

app.post('/', function (req, res) {

    switch (req.body.act) {
        case 'auth':

            let login = req.body.login;
            let md5password = md5(req.body.password);
            connection.query(
                'SELECT * FROM user WHERE login = ? AND  password = ?',
                [login, md5password],
                function (err, result, fields) {
                    if (err) throw err;

                    res.render('registration', {
                        title: 'Registration',
                        username: result[0].nickname
                    });
                });


            break;
        case 'registration':

            break;
    }

    console.log(req.headers);



});


app.get('/ws/:id', function (req, res) {
    // res.sendFile(path.join(__dirname, 'html/index.html'))
    let obj = {title: "Новость", id: 4}
    res.render('ws', {
        id: req.params.id,
        obj: obj
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

*/

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




//Start server

let port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Server started on port 3000');
});
