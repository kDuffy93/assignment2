let express = require('express');
let router = express.Router();


let user = require('../models/users');
let passport = require('passport');
let session = require('express-session');
let localStrategy = require('passport-local').Strategy;
let plm = require('passport-local-mongoose');

/* GET the employee dashboard */
router.get('/', function(req, res, next) {
  if(!req.user)
  {
res.render('employeeDashboard', { title: 'Employee Dashboard' });
  }
  else{
res.redirect('/login');
  }
});

//------------------------------for departments------------------------------------------------
var department = require ('../models/department');


  /* GET department page */
router.get('/department', function(req, res, next) {
 if(!req.user)  {

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
         title: 'Departments Index' 
      });
   });
  }
  else{
res.redirect('/login');
  }
});

router.get('/department/add', function(req, res, next) {
 if(!req.user)
   {
res.render('employee/department/add', { 
         title: 'Add Department' 
 });
  }
  else{
res.redirect('/login');
  }
});


router.post('/department/add', function(req, res, next) {
 if(!req.user)
   {
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
  }
  else{
    res.redirect('/login');
  }
  });

  router.get('/department/delete/:_id', function(req, res, next) {
 if(!req.user)
   {
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
  }
  else
  {
res.redirect('/login');
  }
  });

  router.get('/department/:_id', function(req, res, next) {
 if(!req.user)
  {
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
         title: 'Edit Department'
      });
   });
  }
  else{
res.redirect('/login');
  }
});


router.post('/department/:_id', function(req, res, next) {
 if(!req.user)
  {
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
  }
  else{
res.redirect('/login');
  }
});


//------------------------------for users------------------------------------------------



  /* GET department page */
router.get('/manageEmployee', function(req, res, next) {
 if(!req.user)
  {
  

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
         title: 'Users Index'
      });
   });
  }
  else{
res.redirect('/login');
  }
});


router.get('/manageEmployees/add', function(req, res, next) {
  
 if(!req.user)
  {

 
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
}
else
{
  res.redirect('/login');

}
});


router.post('/manageEmployees/add', function(req, res, next) {
 if(!req.user)
  {

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
  }
  else{
res.redirect('/login');
  }
  });

  router.get('/manageEmployees/delete/:_id', function(req, res, next) {
 if(!req.user)
  {
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
  }
  else{
res.redirect('/login');
  }
  });

  router.get('/manageEmployees/:_id', function(req, res, next) {
 if(!req.user)
  {
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
         dptName: dptName

      });
    });
  });
}
else{
res.redirect('/login');
}
});

// post for register / add new employee

router.post('/manageEmployees/:_id', function(req, res, next) {
 if(!req.user)
  {
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
  }
  else{
res.redirect('/login');
  }
});


module.exports = router;
