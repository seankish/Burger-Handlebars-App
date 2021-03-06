// DEPENDENCIES
var express = require("express");
var burger = require("../models/burger.js");

var router = express.Router();


router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var handlebars = {
            burgers: data
        };
        res.render('index', handlebars);
    });
});


router.post("/api/burgers", function(req, res) {
    burger.insertOne([req.body.burger_name, req.body.devoured], function(result) {
        res.json({ id: result.insertId });
    });
});


router.put("/api/burgers/:id", function(req, res) {
    var condition = 'id = ' + req.params.id;
    burger.updateOne(
        {
            devoured: req.body.devoured
        }, 
        condition,
        function(result) {
            if (result.changedRows === 0) {
               
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});




module.exports = router;