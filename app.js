var express = require('express');
var todoController = require('./controllers/todoController');

// set up as an express app
var app = express();

// set up template engine
app.set('view engine', 'ejs');

// serve static files using inbuild express middleware
app.use(express.static('./public'));

// fire controllers
todoController(app);



// listen to port
app.listen(3000);
console.log('app is live at 127.0.0.1:3000');