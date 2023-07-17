// Create Web server 
// Run: node comments.js
// Node.js - ExpressJS Framework - Comments Application

// Import express module
var express = require('express'); 
// Import body-parser
var bodyParser = require('body-parser');
// Import morgan
var morgan = require('morgan');
// Import mongoose
var mongoose = require('mongoose');
// Import comment model
var Comment = require('./models/comment');
// Import dish model
var Dish = require('./models/dish');
// Import promotion model
var Promotion = require('./models/promotion');
// Import leader model
var Leader = require('./models/leader');
// Import config file
var config = require('./config');

// Set up express app
var app = express();

// Connect to MongoDB database
// 'mongodb://localhost:27017/conFusion'
mongoose.connect(config.database);

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up morgan
app.use(morgan('dev'));

// Set up port
var port = process.env.PORT || 3000;

// Set up router
var router = express.Router();

// Middleware
router.use(function(req, res, next) {
    console.log('Something is happening');
    next();
});

// Test route
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to our API!' });   
});

// Routes that end in /comments
router.route('/comments')
    // Create a comment
    .post(function(req, res) {
        var comment = new Comment();
        comment.rating = req.body.rating;
        comment.comment = req.body.comment;
        comment.author = req.body.author;
        comment.dish = req.body.dish;

        comment.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Comment created!' });
        });
    })
    // Get all comments
    .get(function(req, res) {
        Comment.find(function(err, comments) {
            if (err)
                res.send(err);
            res.json(comments);
        });
    });

// Routes that end in /comments/:comment_id
router.route('/comments/:comment_id')
    // Get the comment with that id
    .get(function(req, res) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if (err)
                res.send(err);
            res.json(comment);
        });
    })