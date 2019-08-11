var connection = require("./connection.js");
var orm = {
    selectAll: function() {
        connection.query("select * FROM burgers", function(err, result) {
          if (err) throw err;
          console.log(result);
        });
    },
    insertOne: function(newBurger) {
        var queryString = "INSERT INTO burgers(burger_name, devoured) Values(?, false)";
        console.log(queryString);
        connection.query(queryString, [newBurger], function(err, result) {
          if (err) throw err;
          console.log(result);
        });
      },
    updateOne: function(selectedBurger) {
        var queryString = "UPDATE burgers SET devoured = TRUE where id=?";
        connection.query(queryString,[selectedBurger], function(err, result) {
          if (err) throw err;
          console.log(result);
        });
    }
  };
  module.exports = orm;