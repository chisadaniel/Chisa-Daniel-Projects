
'use strict';
 var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
const { parse } = require('querystring');
const model = require('./html_scripts/model');
const express = require('express');
const crypto = require('crypto');
const session = require('express-session');
const app = express();
var nodemailer = require('nodemailer');
app.enable('trust proxy');
 

  app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: 'trolololo'
    }));

// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GOOGLE_CLOUD_PROJECT environment variable. See
// https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// These environment variables are set automatically on Google App Engine
const {Datastore} = require('@google-cloud/datastore');

// Instantiate a datastore client
const datastore = new Datastore();

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', async (req, res, next) => {
    res.sendFile(__dirname + '/html_pages/login.html');
  
});

app.get('/register', async (req, res, next) => {

    res.sendFile(__dirname + '/html_pages/register.html');
  
});

app.get('/logout', async(req,res)=>{
    req.session.destroy();
    res.redirect('/');
});

app.get('/main', async (req,res,next) =>{
    if(!req.session.user_id) return res.redirect('/');
    res.sendFile(__dirname + '/html_pages/index.html');

});

app.get('/img', async (req,res,next) =>{
    if(!req.session.user_id) return res.redirect('/');
    res.sendFile(__dirname + '/html_pages/img.html');

});

app.get('/lectures_infos', async (req,res,next) =>{
    if(!req.session.user_id) return res.redirect('/');
    res.sendFile(__dirname + '/html_pages/lectures_infos.html');

});

app.get('/mess', async (req,res,next) =>{
    if(!req.session.user_id) return res.redirect('/');
    res.sendFile(__dirname + '/html_pages/messenger.html');

});

app.get('/grading', async (req,res,next) =>{
    if(!req.session.user_id) return res.redirect('/');
    res.sendFile(__dirname + '/html_pages/grading.html');

});

app.get('/lecture', async (req,res,next) =>{
    if(!req.session.user_id) return res.redirect('/');
    res.sendFile(__dirname + '/html_pages/create_lecture.html');

});

app.get('/lectures', async (req,res,next) =>{
    if(!req.session.user_id) return res.redirect('/');
    res.sendFile(__dirname + '/html_pages/your_lectures.html');

});

app.get('/overview', async (req,res,next) =>{
    if(!req.session.user_id) return res.redirect('/');
    
    res.sendFile(__dirname + '/html_pages/download.html');

});

app.get('/manage', async (req,res,next) =>{
    if(!req.session.user_id) return res.redirect('/');
    res.sendFile(__dirname + '/html_pages/manage_profs.html');

});

app.get('/messenger', async (req,res,next) =>{
    if(!req.session.user_id) return res.redirect('/');
    res.sendFile(__dirname + '/html_pages/messenger.html');

});
app.get('/smessenger', async (req,res,next) =>{
    if(!req.session.user_id) return res.redirect('/');
    res.sendFile(__dirname + '/html_pages/smessenger.html');

});

app.get('/mylabs', async (req,res,next) =>{
    if(!req.session.user_id) return res.redirect('/');
    res.sendFile(__dirname + '/html_pages/manage_studs.html');

});

app.get('/forgot', async (req,res,next) =>{
    res.sendFile(__dirname + '/html_pages/forgot.html');

});
app.get('/profs', async (req,res,next) =>{
    if(!req.session.user_id) return res.redirect('/');
    res.sendFile(__dirname + '/html_pages/profs_index.html');

});

app.get('/profile', async (req,res,next) =>{
    if(!req.session.user_id) return res.redirect('/');
    res.sendFile(__dirname + '/html_pages/profile.html');

});


app.get('/create', async (req,res,next) =>{
    if(!req.session.user_id) return res.redirect('/');
    res.sendFile(__dirname + '/html_pages/create_lab.html');

});

app.post('/check_if_mail_exists', async(req,res)=>{
    let body = '';
    if (req.method === 'POST') {
    
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        
        var vars =  parse(body);
        var email = vars.email;

        try{        

                    var exists = await   model.checkEmail(email);
                    console.log("email exists"+exists);
                    if(exists) {
                      res.status(200).send('OK');
                    }
                    else{
                      res.status(406).send('Conflict');
                    }
    
        }
        catch(e){
            console.log(e);
        }    
      });  

    }
});



app.post('/check_numar_matricol', async(req,res)=>{
    let body = '';
    if (req.method === 'POST') {
    
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        
        var vars =  parse(body);
        var nr_mat = vars.nr_mat;

        try{        

                    var exists = await   model.checkNrMat(nr_mat);
                    console.log("nr mat exists"+exists);
                    if(exists) {
                      res.status(200).send('OK');
                    }
                    else{
                      res.status(406).send('Conflict');
                    }
    
        }
        catch(e){
            console.log(e);
        }    
      });  

    }
});

app.post('/insert_nr_mat_and_group', async(req,res)=>{
    if(!req.session.user_id) return res.redirect('/');
    let body = '';
    if (req.method === 'POST') {
    
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        
        var vars =  parse(body);
        var nr_mat = vars.nr_mat;
        var group = vars.group;

        try{        

                    var exists = await   model.updateNrAndGroup(nr_mat,group,req.session.user_id);
                    console.log("nr mat exists"+exists);
                    if(exists) {
                      res.status(200).send('OK');
                    }
                    else{
                      res.status(406).send('Conflict');
                    }
    
        }
        catch(e){
            console.log(e);
        }    
      });  

    }
});


app.post('/load_student_profile_infos', async(req,res)=>{
    if(!req.session.user_id) return res.redirect('/');
    if (req.method === 'POST') {           
        var infos = await model.getProfileInfos(req.session.user_id);
        res.json(infos);              
    }
});

app.post('/load_persons_for_messenger', async(req,res)=>{
    
        var persons = await model.getPersons(req.session.user_id);
        res.json(persons);              
});

app.post('/load_persons_for_search', async(req,res)=>{
    
        var persons = await model.getPersonsForSearch(req.session.user_id);
        res.json(persons);              
});

app.post('/sload_persons_for_search', async(req,res)=>{
    
        var persons = await model.sgetPersonsForSearch(req.session.user_id);
        res.json(persons);              
});

app.post('/send_message_to', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        await model.sendMessage(vars.id, vars.text, req.session.user_id);
        //console.log("tasks"+tasks);
        res.status(200)
        res.send()
    });
});

app.post('/send_image', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        await model.upload(vars.image);
        //console.log("tasks"+tasks);
        res.status(200)
        res.send()
    });
});


//var Promise = require('bluebird');
var {Storage} = require('@google-cloud/storage');

var storage = new Storage(({
  projectId: 'labattend',
  keyFilename: './labattendcred.json'
}))

var BUCKET_NAME = 'profiles-labattend'
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.39.0/storage/bucket
var myBucket = storage.bucket(BUCKET_NAME)

app.post('/fileupload', async (req, res) => {
 var form = new formidable.IncomingForm();
    form.parse(req,async  function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var filename = req.session.user_id + '.png'
      await storage.bucket(BUCKET_NAME).upload(oldpath, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    destination: filename,
    // By setting the option `destination`, you can change the name of the
    // object you are uploading to a bucket.
    metadata: {
      // Enable long-lived HTTP caching headers
      // Use only if the contents of the file will never change
      // (If the contents will change, use cacheControl: 'no-cache')
      cacheControl: 'no-cache'//'private, max-age=0',
    },
  });
      res.redirect('/profile');
      res.end();
});
})

app.post('/get_my_profile_url', async (req, res) => {
        var url = await model.getMyProfileUrl(req.session.user_id);
        res.json(url)
});


app.post('/get_student_url', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var messages = await model.getStudentsUrl(vars.student_id);
        res.json(messages)
    });
});

app.post('/load_conversation', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var messages = await model.loadConversation(vars.id, req.session.user_id);
        res.json(messages)
    });
});

app.post('/check_if_mail', async(req,res)=>{
    let body = '';
    if (req.method === 'POST') {
    
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        
        var vars =  parse(body);
        var email = vars.email;

        try{        

                    var exists = await   model.checkEmail(email);
                    console.log("email exists"+exists);
                    if(exists) {
                      res.status(406).send('Conflict');
                    }
                    else{
                      
                      res.status(200).send('OK');
                    }
    
        }
        catch(e){
            console.log(e);
        }    
      });  

    }
});


app.post('/check_if_valid_code', async(req,res)=>{
    let body = '';
    if (req.method === 'POST') {
    
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        
        var vars =  parse(body);
        var code = vars.code;

        try{        

                    var exists = await   model.checkCode(code);
                    console.log("code exists"+exists);
                    if(exists) {
                      res.status(406).send('Conflict');
                    }
                    else{
                      
                      res.status(200).send('OK');
                    }
    
        }
        catch(e){
            console.log(e);
        }    
      });  

    }
});


app.post('/change_password', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var tasks = await model.changePassword(vars.code, vars.pass);
        //console.log("tasks"+tasks);
        res.send("OK");
    });
});


app.post('/send_email_with_code', async (req,res)=>{
    let body = '';
    if (req.method === 'POST') {
    
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var email = vars.email;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'app2020labattend@gmail.com',
    pass: 'licenta2020'
  }
});
var infos = await model.getResetPassCode(email);

var text = "<h3>Dear " + infos[1]+ " " + infos[2]+",</h3><p>We received an request for password reset.</p> <p>Verification code: "+infos[0]+"</p><br><br> LabAttend";
var mailOptions = {
  from: 'app2020labattend@gmail.com',
  to: email,
  subject: '[LabAttend-NO-REPLY] Reset password request ',
  html: text
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    res.send("OK");
  }
});
});
}
});


app.post('/check_connection', async(req,res)=>{
    let body = '';
    if (req.method === 'POST') {
    
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        
        var vars =  parse(body);
        var email = vars.email;
        var pass = vars.pass;

        try{        

                    var exists = await   model.checkConnection(email,pass);
                    if(exists) {
                      res.status(200).send('OK');
                    }
                    else{
                      res.status(406).send('Conflict');
                    }
    
        }
        catch(e){
            console.log(e);
        }    
      });  

    }
});




app.post('/api/login', async (req, res) => {
   
    var mail;
    var pass;
    let body = '';
    if (req.method === 'POST') {
    
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        
        
        //res.end('ok tralala');
         var vars =  parse(body);
        req.session.mail = vars.mail;
        req.session.pass = vars.pass;
        console.log(req.session.mail);
        
       try{        


                    console.log( req.session.mail);

                    var login_data = await   model.login(req.session.mail, req.session.pass);

                    console.log("LOGIIIN DATA"+login_data);
                      
                    
                    if(!login_data) {

                      console.log("wrong email");
                      res.redirect('/');
                      return;// res.json({error: 'Wrong email or password.'});
                    }
                    console.log("here",login_data);

                    //req.session.connected = true;
                    req.session.user_id = await model.getSessionId(req.session.mail, req.session.pass);
                    req.session.save();
                    res.redirect('/main');
                    console.log("user id:"+req.session.user_id);
                   }
                  catch(e){
                    console.log(e);
                  }    
    });
  }
});

app.post('/api/login/profs', async (req, res) => {
   
    var mail;
    var pass;
  
    let body = '';
    if (req.method === 'POST') {
    
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        
        
        //res.end('ok tralala');
         var vars =  parse(body);
        req.session.mail = vars.mail;
        req.session.pass = vars.pass;
        console.log(req.session.mail);
        
       try{        
                    console.log( req.session.mail);

                    var login_data = await   model.login(req.session.mail, req.session.pass);

                    console.log("LOGIIIN DATA"+login_data);
                      
                    
                    if(!login_data) {

                      console.log("wrong email");
                      res.redirect('/');
                      return;// res.json({error: 'Wrong email or password.'});
                    }
                    console.log("here",login_data);

                    //req.session.connected = true;
                    req.session.user_id = await model.getSessionId(req.session.mail, req.session.pass);
                    //req.session.save();
                    res.redirect('/profs');
                    console.log("user id:"+req.session.user_id);
                   }
                  catch(e){
                    console.log(e);
                  }    
    });
  }
});


app.post('/error',(req,res)=>{
  res.json({error: "something went wrong at registration"});
});

app.post('/api/register', async(req,res) =>{

  let body = '';
  if (req.method === 'POST') {  
    
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);

        req.session.mail = vars.email;
        req.session.pass = vars.pass;
        var cpass = vars.cpass;
        if(cpass != vars.pass) {
          res.sendFile(__dirname + '/html_pages/register.html');
          return res.json({error:'Passwords are not the same!'});
        }
        console.log(req.session.mail);
        
       try{
                    console.log( req.session.mail);

                    var login_data = await   model.register(req.session.mail, req.session.pass, vars.firstname, vars.lastname);

                    console.log("REGISTER DATA"+login_data);
                      
                    if(!login_data) {
                      res.redirect('/error');
                    }
                    else{
                      res.redirect('/');
                    }
    }
    catch(e){
              console.log(e);
    }    
    });
  }
});


app.post('/labs_load', async (req, res) => {
    //if(!req.session.user_id) return res.redirect('/');

    var tasks = await model.getLabs();
    console.log("tasks"+tasks);
    res.json(tasks)
});

app.post('/labs_load_for_student', async (req, res) => {
    //if(!req.session.user_id) return res.redirect('/');
    var tasks = await model.getLabsForStudent(req.session.user_id);
    console.log("tasks"+tasks);
    res.json(tasks)
});


app.post('/load_laboratory_infos_for_name', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var tasks = await model.getLectureGradesForStudent(vars.lab, req.session.user_id);
        //console.log("tasks"+tasks);
        res.json(tasks);
    });
});


//getStudentFinalGrades
app.post('/get_student_final_grades_manage', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var tasks = await model.getExamsGradesForStudent(vars.code, req.session.user_id);
        //console.log("tasks"+tasks);
        res.json(tasks);
    });
});

app.post('/labs_load_profs', async (req, res) => {
    //if(!req.session.user_id) return res.json({error: 'You need to login.'})
    var tasks = await model.getProfLabs(req.session.user_id);
    console.log("tasks"+tasks);
    res.json(tasks)
});

app.post('/lectures_load_profs', async (req, res) => {
    //if(!req.session.user_id) return res.json({error: 'You need to login.'})
    var tasks = await model.getProfLectures(req.session.user_id);
    console.log("tasks"+tasks);
    res.json(tasks)
});

 


app.post('/load_students_ids', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var tasks = await model.getStudentsIds(vars.myLab, req.session.user_id);
        //console.log("tasks"+tasks);
        res.json(tasks);
    });
});


app.post('/load_students_ids_per_week', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var tasks = await model.getStudentsIdsPerWeek(vars.myLab, vars.week_no, req.session.user_id);
        //console.log("tasks"+tasks);
        res.json(tasks);
    });
});





app.post('/removeStudent', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var respond = await model.removeStudent(vars.myLab, vars.student_id, req.session.user_id);
        //console.log("tasks"+tasks);
        res.send(respond);
    });
});


app.post('/load_students_infos_session', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var infos = await model.getStudentsInformations(vars.student_id);
        //console.log("tasks"+tasks);
        res.json(infos);
    });
});


app.post('/load_students_names', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var tasks = await model.getStudentsNames(vars.myLab, req.session.user_id);
        //console.log("tasks"+tasks);
        res.json(tasks);
    });
});





app.post('/load_names_per_week', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var tasks = await model.getStudentsNamesPerWeek(vars.myLab, vars.week_no, req.session.user_id);
        //console.log("tasks"+tasks);
        res.json(tasks);
    });
});


app.post('/load_students_profile_per_semester', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var tasks = await model.getStudentsProfilePerSemester(vars.myLab, req.session.user_id);
        //console.log("tasks"+tasks);
        res.json(tasks);
    });
});

app.post('/load_students_profile_for_lecture_owner', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var tasks = await model.getStudentsForLectureOwner(vars.id);
        //console.log("tasks"+tasks);
        res.json(tasks);
    });
});

app.post('/load_final_students', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var tasks = await model.getFinalStudents(vars.id);
        //console.log("tasks"+tasks);
        res.json(tasks);
    });
});

app.post('/load_labs_ids_for_lecture', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var tasks = await model.getLabsIdsForLecture(vars.lab_id, req.session.user_id);
        //console.log("tasks"+tasks);
        res.json(tasks);
    });
});

app.post('/load_labs_infos_for_lectures', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var tasks = await model.getLabsInformations(vars.lab_id, req.session.user_id);
        //console.log("tasks"+tasks);
        res.json(tasks);
    });
});


app.post('/get_lecture_code', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var tasks = await model.getLabCodeForLecture(vars.lab_id);
        res.json({code:tasks});
    });
});



app.post('/get_lab_name_by_id', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var tasks = await model.getLabNameById(vars.lab_id);
        //console.log("tasks"+tasks);
        res.json({name:tasks});
    });
});


app.post('/load_students_grades', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var tasks = await model.getStudentsGrades(vars.myLab, req.session.user_id);
        //console.log("tasks"+tasks);
        res.json(tasks);
    });
});


app.post('/load_students_grades_per_week', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var tasks = await model.getStudentsGradesPerWeek(vars.myLab, vars.week_no, req.session.user_id);
        //console.log("tasks"+tasks);
        res.json(tasks);
    });
});



app.post('/get_student_status', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var tasks = await model.getStudentStatus(vars.myLab, vars.myCode, req.session.user_id);
        //console.log("tasks"+tasks);
        res.json(tasks);
    });
});


app.post('/update_grade', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var tasks = await model.updateGrade(vars.myLab, vars.myGrade, vars.myId, vars.week, vars.lec_code, req.session.user_id);
        //console.log("tasks"+tasks);
        res.status(200).send('grade was updated');
    });
});

app.post('/update_extra_points', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var tasks = await model.updateExtraPoints(vars.points, vars.student_id, vars.lec_code);
        //console.log("tasks"+tasks);
        res.status(200).send('grade was updated');
    });
});


app.post('/update_midterm', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var tasks = await model.updateMidterm(vars.points, vars.student_id, vars.lec_code);
        //console.log("tasks"+tasks);
        res.status(200).send('grade was updated');
    });
});

app.post('/update_exam', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var tasks = await model.updateFinalExam(vars.points, vars.student_id, vars.lec_code);
        //console.log("tasks"+tasks);
        res.status(200).send('grade was updated');
    });
});

app.post('/create_lab', async(req,res)=>{
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
    var result = await model.createLab(vars.myData, vars.code, vars.lgroup, req.session.user_id); 
    console.log("resuuuuult"+result);
    if(result){res.json({success: 'Register successfuly.'});}
    if(result == false){ res.status(406).send('Already exists');}
  console.log(vars.myData);

});
});


app.post('/create_lecture', async(req,res)=>{
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
    var result = await model.createLecture(vars.myData, vars.acro, vars.code, req.session.user_id); 
    console.log("resuuuuult"+result);
    if(result){res.json({success: 'Register successfuly.'});}
    if(result == false){ res.status(406).send('Already exists');}
  console.log(vars.myData);

});
});

app.post('/check_for_lecture_code', async(req,res)=>{
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
    var result = await model.checkLectureCode(vars.code); 
    console.log("resuuuuult"+result);
    if(result == true){res.status(200).send('Success');}
    else if(result == false){ res.status(406).send('Already exists');}
});
});

app.post('/check_for_existing_lab', async(req,res)=>{
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
    var result = await model.checkExistingLab(vars.code, vars.labGroup); 
    if(result == true){res.json({success: 'Register successfuly.'});}
    if(result == false){ res.status(404).send('Already exists');}
});
});

app.post('/get_lecture_name', async (req, res) => {
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var name = await model.getLectureName(vars.code);
        res.json({r:name});
    });
});



app.post('/insert_starting_data_lab', async(req,res)=>{
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
    console.log(vars.myLab+vars.myCode+vars.myWeek);

    var result = await model.updateStartingLab(vars.myLab, vars.myCode,vars.myWeek, req.session.user_id); 
    //console.log("resuuuuult"+result);
    if(result){res.json({success: 'Register successfuly.'});}
    if(result == false){ res.status(406).send('Already exists');}
  //console.log(vars.myData);*/

});
});

app.post('/stop_lab_attendence', async(req,res)=>{
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
    console.log(vars.myLab+vars.myCode+vars.myWeek);

    var result = await model.stopLabAttendence(vars.myLab, vars.myCode,vars.myWeek, req.session.user_id); 
    //console.log("resuuuuult"+result);
    if(result){res.json({success: 'Register successfuly.'});}
    if(result == false){ res.status(406).send('Already exists');}
  //console.log(vars.myData);*/

});
});




app.post('/attend_to_lab', async(req,res)=>{
  let body="";
  req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
    console.log(vars.myLab+vars.myCode);

    var result = await model.attendToLab(vars.myLab, vars.myCode, req.session.user_id); 
    //console.log("resuuuuult"+result);
    if(result == 2){res.json({success: 'Attend successfuly.'});}
    if(result == 0){ res.status(406).send('Wrong code');}
    if(result == 1){ res.status(409).send('Already');}
    if(result == 3){ res.status(506).send('Cant attend');}
  //console.log(vars.myData);*/

});
});





const PORT = process.env.PORT || 8083;
app.listen(process.env.PORT || 8083, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});


module.exports = app;
