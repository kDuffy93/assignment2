
let mongoose = require('mongoose');

let plm = require('passport-local-mongoose');
var department = require ('../models/department');
// create book schema (class)
var userSchema = new mongoose.Schema({
    firstName: {
        type: String,
  required: 'Employee surname is missing. Please enter one now.'
    },
    surName: {
        type: String,
  required: 'Employee surname is missing. Please enter one now.'
    },
    departmentname: {
      type: mongoose.Schema.Types.Object, ref: 'department'
    }
});  
userSchema.plugin(plm);

// make it public
module.exports = mongoose.model('user', userSchema);
