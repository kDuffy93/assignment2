let express = require('express');
let router = express.Router();

let course = require('../models/course');
let user = require('../models/users');
let userCourse = require('../models/usercourses');
let passport = require('passport');
let session = require('express-session');
let localStrategy = require('passport-local').Strategy;
let plm = require('passport-local-mongoose');

//auth on every page
var department = require ('../models/department');
  /* GET department page */
  router.use( function(req, res, next) {
  
if(!req.user){
  req.session.messages =["You must be logged-in to view this page"];
  req.session.messages1 = ["please enter you're credentials below"];
   
  res.redirect('/login')
}
next();
  });


/* GET the employee dashboard */
router.get('/', function(req, res, next) {
res.render('employeeDashboard', { title: 'Employee Dashboard', user: req.user });
});



//------------------------------for departments------------------------------------------------


router.get('/department', function(req, res, next) {

   // use mongoose model to query mongodb for all books
   department.find(function(err, departments) {
     
      if (err) {
         console.log(err);
         res.end(err);
         return;
      }
      // no error so send the books to the index view
      res.render('employee/department/departmentIndex', {
         departments: departments,
         title: 'Departments Index' , user: req.user 
      });
   });
});

router.get('/department/add', function(req, res, next) {

res.render('employee/department/add', { 
         title: 'Add Department' , user: req.user 
 });

});


router.post('/department/add', function(req, res, next) {
 
  department.create(
    {
        departmentname : req.body.departmentname
     }, function (err, departments)
        {
          if (err) 
          {
              console.log(err);
              res.render('error');
              return;
          }
           res.redirect('/employeeDashboard/department');

    });
      });
 

  router.get('/department/delete/:_id', function(req, res, next) {

    let _id = req.params._id;
  department.remove({ _id: _id }, function (err, departments) {
          if (err) 
          {
              console.log(err);
              res.render('error');
              return;
          }
           res.redirect('/employeeDashboard/department');

    });
  
  });

  router.get('/department/:_id', function(req, res, next) {
 
   // grab id from the url
   let _id = req.params._id;

   // use mongoose to find the selected book
   department.findById(_id, function(err, department) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
      res.render('employee/department/edit', {
         department: department,
         title: 'Edit Department' , user: req.user 
      });
   });
 
});


router.post('/department/:_id', function(req, res, next) {
 
   // grab id from url
   let _id = req.params._id;


   // populate new book from the form
   let Department = new department({
      _id: _id,
      departmentname : req.body.departmentname
   });

   department.update({ _id: _id }, Department,  function(err) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
      res.redirect('/employeeDashboard/department');
   });
  
});


//------------------------------for users------------------------------------------------



  /* GET department page */
router.get('/manageEmployee', function(req, res, next) {
 
  

   // use mongoose model to query mongodb for all books
   user.find(function(err, users) {
     
      if (err) {
         console.log(err);
         res.end(err);
         return;
      }



      // no error so send the books to the index view
   
      res.render('employee/manageEmployees/manageEmployeeIndex', {
         users: users,
         title: 'Users Index' , user: req.user 
      });
   });
 
});


router.get('/manageEmployees/add', function(req, res, next) {
  


 
  department.find(function(err, departments) {
     
      if (err) {
         console.log(err);
         res.end(err);
         return;
      }
      // no error so send the books to the index view
      res.render('employee/manageEmployees/add', { 
         departments: departments,
         title: 'Add User',
         user: req.user

      });
 });

});


router.post('/manageEmployees/add', function(req, res, next) {


  user.register(new user(
    {
       username: req.body.username,
        firstName : req.body.firstName,
        surName : req.body.surName,
        departmentname :  req.body.departmentname
     }),
     req.body.password, function (err, departments)
        {
          if (err) 
          {
              console.log(err);
              res.render('error'), { title: 'create new employee error'};
              return;
          }
           res.redirect('/employeeDashboard/manageEmployee');
       
    });
 
  });

  router.get('/manageEmployees/delete/:_id', function(req, res, next) {

    let _id = req.params._id;
  user.remove({ _id: _id }, function (err, departments) {
          if (err) 
          {
              console.log(err);
              res.render('error');
              return;
          }
           res.redirect('/employeeDashboard/manageEmployee');

    });

  });

  router.get('/manageEmployees/:_id', function(req, res, next) {

   // grab id from the url
   let _id = req.params._id;
   department.find(function(err, departments) {
     
      if (err) {
         console.log(err);
         res.end(err);
         return;
      }
  

   // use mongoose to find the selected book
   user.findById(_id, function(err, user) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
     var dptName = user.departmentname;
      res.render('employee/manageEmployees/edit', {
         user: user,
          departments: departments,
         title: 'Edit User',
         dptName: dptName, user: req.user 

      });
    });
  });

});

// post for register / add new employee

router.post('/manageEmployees/:_id', function(req, res, next) {

   // grab id from url
   let _id = req.params._id;


   // populate new book from the form
   let User = new user({
   
      _id: _id,
      username: req.body.username,
      firstName : req.body.firstName,
      surName : req.body.surName,
      departmentname : req.body.departmentname
      
   });
 

   user.update({ _id: _id }, User,  function(err) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
      res.redirect('/employeeDashboard/manageEmployee');
   });
 
});
//------------------------------for employee Certificates------------------------------------------------
router.get('/manageEmployees/employeeCertifications/:_id', function(req, res, next) {
 
   // grab id from the url
   let _id = req.params._id;
   user.findById(_id, function(err, users) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
course.find(function(err, courses) {
     
      if (err) {
         console.log(err);
         res.end(err);
         return;
      }

       res.render('employee/manageEmployees/cert', {
         users: users,
         uid: users._id,
courses: courses,
         title: 'Departments Index' , user: req.user 
   });
 });
});
});


router.post('/manageEmployees/employeeCertifications/:_id', function(req, res, next) {

   // grab id from url
   let user_id = req.params._id;

 userCourse.find({ 'userid' :  user_id },function(err, selectedUsersCourses) {
     
      if (err) {
         console.log(err);
         res.end(err);
         return;
      }
      
 if(selectedUsersCourses.length != 0)   
 {


for (let i=0; i < selectedUsersCourses.length; i++) {

if(req.body.coursename == selectedUsersCourses[i].coursename)
{
 let updatedUserCourse = new userCourse({
      _id: selectedUsersCourses[i]._id,
      userid: user_id,
      coursename: req.body.coursename,
      expiry : req.body.expiry
      
   });
 

   userCourse.update({ _id: selectedUsersCourses[i]._id }, updatedUserCourse,  function(err) {
      if (err) {
         console.log("from update" + err);
         res.render('error');
         return;
      }
     
   });
 res.redirect('/employeeDashboard/manageEmployee');
     return;
}

}
 }
else
{
userCourse.create(
    {
      userid: user_id,
      coursename: req.body.coursename,
      expiry : req.body.expiry
      
   });
 
      res.redirect('/employeeDashboard/manageEmployee');
     return;
}


   // populate new book from the form
  
   });
    });


    router.get('/manageEmployees/viewEmployeeCertifications/:_id', function(req, res, next) {

 
   // grab id from the url
   let _id = req.params._id;
    user.findById(_id, function(err, users) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
   
   userCourse.find({ 'userid' :   _id }, function(err, userCourses) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }


       res.render('employee/manageEmployees/viewemployeecertifications', {
         user: user,
         userCourses: userCourses,
         title: 'Departments Index' , user: req.user 
   });
 });
});
});


   







module.exports = router;
