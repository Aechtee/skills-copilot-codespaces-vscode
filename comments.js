// Create web server

// Import modules
var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var User = require('../models/user');

// Create comment
router.post('/create', function(req, res){
	var comment = new Comment({
		content: req.body.content,});
    comment.save(function(err, comment){ // Save comment
        if(err) return res.status(500).json({error: err});
        res.json({message: 'Comment created', comment: comment});
    })});