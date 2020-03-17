var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var mongoose = require('mongoose');

// Connect to the mongoDB
// mongoose.connect("mongodb+srv://code:1234@tododb-sjuuh.mongodb.net/test?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

// Connecting to localhost mongoDB
// "C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath D:\MongoDB\data\db
mongoose.connect("mongodb://localhost:27017/test", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

// Create a schema - this is like a database blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

// ToDo model
// nodeJS model variable = mongoDB(model name, model schema we are basing the model on);
var Todo = mongoose.model('Todo', todoSchema);


module.exports = function(app){
    
    app.get('/todo', function(req, res){
        // get data from mongoDB and pass it to the view
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, function(req, res){
        // get data from the view and add it to mongoDB
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        });        
    });

    app.delete('/todo/:item', function(req, res){
        // delete the rquested item from mongoDB
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });
};