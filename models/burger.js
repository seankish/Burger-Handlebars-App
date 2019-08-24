
var orm = require("../config/orm.js");




var burger = {

    
    selectAll: function(cb) {
        
        orm.selectAll("burgers", function(res) {
            cb(res);
        });
    },
   
    insertOne: function(vals, cb) {
     
        orm.insertOne("burgers", "burger_name", "devoured", vals, function(res) {
            cb(res);
        });
    },
    
    updateOne: function(objectVals, condition, cb) {
 
        orm.updateOne("burgers", objectVals, condition, function(res) {
            cb(res);
        });
    }

}




module.exports = burger;