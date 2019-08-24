// DEPENDENCIES
var connection = require("./connection.js");




function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
    return arr.toString();
  }

function objToSql(ob) {
    var arr = [];
  
   
    for (var key in ob) {
      var value = ob[key];

      if (Object.hasOwnProperty.call(ob, key)) {
     
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
      
        arr.push(key + " = " + value);
      }
    }
  
  
    return arr.toString();
}



var orm = {

    selectAll: function(table, cb) {
        // SELECT * FROM table
        var queryString = 'SELECT * FROM ' + table;
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
            // console.log(result);
        });
    },
    insertOne: function(table, col1, col2, vals, cb) {
        // INSERT INTO table (col1, col2) VALUES (val1, val2)
        var queryString = 'INSERT INTO ' + table;

        queryString += ' (' + col1 + ', ' + col2 + ') ';
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        connection.query(queryString, vals, function(err, result) {
            if (err) throw err;
            cb(result);
            // console.log(queryString);
        });
    },
    updateOne: function(table, objColVals, condition, cb) {
        // UPDATE table SET col1 = val1 WHERE col2 = val2
        var queryString = 'UPDATE ' + table;
        queryString += ' SET ';
        queryString += objToSql(objColVals);
        queryString += ' WHERE ';
        queryString += condition;

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
            // console.log(queryString);
        });
    }
};



// Export for burger.js
module.exports = orm;
