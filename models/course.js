

let mongoose = require('mongoose');

// create book schema (class)
var courseSchema = new mongoose.Schema({
    coursename: {
        type: String,
        required: 'Course Name is missing. Please enter one.'
    },
     coursetype: {
      type: String,
        required: 'Course type is missing. Please enter one.'
    }
});

// make it public
module.exports = mongoose.model('course', courseSchema);