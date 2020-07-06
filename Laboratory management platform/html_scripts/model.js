
const express = require('express');
const crypto = require('crypto');
const {Datastore} = require('@google-cloud/datastore');

// Instantiate a datastore client
const projectId = 'labattend';
const keyFilename = './labattendcred.json';
const datastore = new Datastore(({projectId,keyFilename}));

////SELECT * FROM `laboratories` WHERE __key__ = KEY(`laboratories`, 5705188677517312)
//var Promise = require('bluebird');
var {Storage} = require('@google-cloud/storage');

var storage = new Storage(({
  projectId: 'labattend',
  keyFilename: './labattendcred.json'
}))

var BUCKET_NAME = 'profiles-labattend'
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.39.0/storage/bucket
var myBucket = storage.bucket(BUCKET_NAME)

var upload = async(url)=>{
    var filename = url
    await storage.bucket(BUCKET_NAME).upload(filename, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    // By setting the option `destination`, you can change the name of the
    // object you are uploading to a bucket.
    metadata: {
      // Enable long-lived HTTP caching headers
      // Use only if the contents of the file will never change
      // (If the contents will change, use cacheControl: 'no-cache')
      cacheControl: 'public, max-age=31536000',
    },
  });
}

var getMyProfileUrl = async (user_id)=>{
  //  console.log("primesc id pt test url", user_id)
  var img_name = user_id + '.png'
  var url;
  var file = await storage.bucket(BUCKET_NAME).file(img_name)
   
   

  //console.log("am gasit imaginea", file.exists, file.baseURL)
let promise =  new Promise(async function(resolve, reject) {
  await file.getMetadata(function(err) {
          if(err!=null){
            if (err.code === 404) {
              // console.log("messenger nu gasesc url pt",user_id)
               reject(undefined)
            }
             reject(undefined)
          } 
          else{
           // console.log("messenger intradevraraaa exista")
            url = `https://storage.googleapis.com/${BUCKET_NAME}/${img_name}`
             
            //console.log("messenger inside"+url)
             resolve(url)
          }
           
        });
})
 await promise.then(
  result => url = result,
  reject => url = undefined 
    // shows "done!" after 1 second
  //error => alert(error) // doesn't run
)

 
  //console.log("messenger url:",url)
  if(url != undefined){
   // console.log("messenger returnez url")
    return url;
}
  else{
    //console.log("messenger returnez undefined")
    return undefined;
  }
}


var getStudentsUrl = async (user_id)=>{
    console.log("INDEX primesc id pt test url", user_id)
  var img_name = user_id + '.png'
  var url;
  var file = await storage.bucket(BUCKET_NAME).file(img_name)
   
   

  //console.log("am gasit imaginea", file.exists, file.baseURL)
let promise =  new Promise(async function(resolve, reject) {
  await file.getMetadata(function(err) {
          if(err!=null){
            if (err.code === 404) {
               console.log("INDeX  nu gasesc url pt",user_id)
               resolve("no")
            }
             
          } 
          else{
            console.log("INDeX  intradevraraaa exista")
            url = `https://storage.googleapis.com/${BUCKET_NAME}/${img_name}`
             
            console.log("INDeX   inside"+url)
             resolve(url)
          }
           
        });
})
 await promise.then(
  result => {
    if(result == "no")
        url = undefined
    else
        url = result
   }
)

 
   
  if(url != undefined){
    console.log("INDeX returnez url")
    return url;
}
  else{
    console.log("INDeX returnez undefined")
    return undefined;
  }
}


var login = async (email, pass) => {
   console.log("mail:"+email+"name"+pass);
   /*datastore.save({
    key: datastore.key('login'),
    data: {email,pass},
  	});
*/


	var resu;
 	 pass = encodePass(pass);
     const query = datastore.createQuery('login').filter('email', '=', email.toString()).filter('pass','=',pass.toString()).limit(1);
      await datastore
     .runQuery(query)
     .then(data =>{
     	 resu = data;
	});
     console.log(resu[0]);
    
    if(resu[0].length < 1)
 	return false;
 	return true;
  	
}

var encodePass = pwd => crypto.createHash('sha256').update(pwd).digest('hex');
var register = async (email, pass, firstname, lastname) => {
	var registered;
	pass = encodePass(pass);
    const reg = await datastore.save({
    key: datastore.key('login'),
    data: {email,pass,firstname,lastname}})
    .then(function onSuccess(entity){
    	registered = true;
    })
    .catch(function onError(error){
    	registered = false;
    	console.log("error register"+error);
    });

    if(registered)return true;
    return false;  
}

 var getLabs = async () => {
    var query = datastore.createQuery('labs').select(['name']);
    var [labs] = await datastore.runQuery(query);
    var lab_names=[];
    //console.log("labs"+labs[0]);
    for(let i in labs) {
        labs[i].id = labs[i][datastore.KEY];     
        lab_names[i]=labs[i].name;
    }
    //console.log(lab_names);
    return lab_names;
}


 var getLabsForStudent = async (student_id) => {

    var query = datastore.createQuery('records').filter('student_id','=',student_id);
    var [labs] = await datastore.runQuery(query);
    var lab_ids=[];
    //get all lectures student is asigned
    for(let i in labs) {  
        lab_ids[i]=labs[i].lecture_code;
    }
   	// get unique lab lecture names and its codes
    const ids = Array.from(new Set(lab_ids));
    var lab_names = [];
    for(let j in  ids){
        if(ids[j]==undefined || ids[j].length<2){

        }
        else{
        var queryi = datastore.createQuery('lectures').filter('lecture_code','=', ids[j]);
        var [lectures] = await datastore.runQuery(queryi);
    	if(lectures[0]!=undefined)
        lab_names.push({name:lectures[0].name, code:lectures[0].lecture_code}); 
        }
    }
    return lab_names;
}

var getLaboratoryInformationsForNameFinal = async (lecture_code,student_id)=>{
    
    var query = datastore.createQuery('records').filter('student_id','=',student_id).filter('lecture_code','=',lecture_code);
    var [student_rows] = await datastore.runQuery(query);

    var infos=[];
    var week = 0;
    var index = 0;
        for(week =1; week<=14;week++){
             
            for(let j in student_rows){
                if(week === parseInt(student_rows[j].week_number,10)){

                    infos[index] = student_rows[j];
                    index = index + 1;
                    break; 
                }       
            }
        }
     
    for(let i in infos){
        console.log("here nota"+infos[i].grade+" lab id"+infos[i].lab_id + " week"+infos[i].week_number);
    }
    return infos;
}

var getExamsGradesForStudent = async (lecture_code,student_id)=>{
    
    var query = datastore.createQuery('exam_grades').filter('student_id','=',student_id).filter('lecture_id','=',lecture_code);
    var [student_rows] = await datastore.runQuery(query);
    if(student_rows[0]==undefined){
        return ({extra_points:undefined, midterm:undefined, final_exam:undefined});
    }
    var e,m,f;
    if(student_rows[0]!=undefined){
        if(student_rows[0].extra_points !=undefined){
            e = student_rows[0].extra_points;
        }
        else
            e = undefined;
        if(student_rows[0].midterm !=undefined){
            m = student_rows[0].midterm;
        }
        else
            m = undefined;
        if(student_rows[0].final_exam !=undefined){
            f = student_rows[0].final_exam;
        }
        else
            f = undefined;
    }

    return ({extra_points:e, midterm:m, final_exam: f});
}


var getLectureGradesForStudent = async (lecture_code,student_id)=>{

    var query = datastore.createQuery('records').filter('student_id','=',student_id).filter('lecture_code','=',lecture_code);
    var [student_rows] = await datastore.runQuery(query);
    var infos=[];
    var week = 0;
    var index = 0;
        for(week =1; week<=14;week++){
             
            for(let j in student_rows){
                if(week === parseInt(student_rows[j].week_number,10)){

                    infos[index] = student_rows[j];
                    index = index + 1;
                    break; 
                }       
            }
        }
    return infos;
}


var getLaboratoryInformationsForName = async (lab_name,student_id)=>{
	var query = datastore.createQuery('labs').filter('labs_code','=',lab_name);
    var [labs] = await datastore.runQuery(query);
    var key = labs[0][datastore.KEY].id;
    console.log("KEY" +key)
    var query = datastore.createQuery('records').filter('student_id','=',student_id).filter('lab_id','=',key);
    var [student_rows] = await datastore.runQuery(query);

    var infos=[];
    var week = 0;
    var index = 0;
    	for(week =1; week<=14;week++){
    		 
	    	for(let j in student_rows){
	    		if(week === parseInt(student_rows[j].week_number,10)){

	    			infos[index] = student_rows[j];
	    			index = index + 1;
	    			break; 
	    		}		
	    	}
    	}
     

    for(let i in infos){
    	console.log("here nota"+infos[i].grade+" lab id"+infos[i].lab_id + " week"+infos[i].week_number);
    }
    return infos;
}


var getLaboratoryInformationsForName2 = async (lab_name,student_id)=>{
    var query = datastore.createQuery('labs').filter('name','=',lab_name);
    var [labs] = await datastore.runQuery(query);
    var key = labs[0][datastore.KEY].id;
    console.log("KEY" +key)
    var query = datastore.createQuery('records').filter('student_id','=',student_id).filter('lab_id','=',key);
    var [student_rows] = await datastore.runQuery(query);

    var infos=[];
    var week = 0;
    var index = 0;
        for(week =1; week<=14;week++){
             
            for(let j in student_rows){
                if(week === parseInt(student_rows[j].week_number,10)){

                    infos[index] = student_rows[j];
                    index = index + 1;
                    break; 
                }       
            }
        }
     

    for(let i in infos){
        console.log("here nota"+infos[i].grade+" lab id"+infos[i].lab_id + " week"+infos[i].week_number);
    }
    return infos;


}


var getStudentsIds = async(lab_name,prof_id) =>{
	
	//get lab_id
	var query = datastore.createQuery('labs').filter('name', '=', lab_name).filter('prof_id','=',prof_id);
    var [tasks] = await datastore.runQuery(query)
    var lab_id = tasks[0][datastore.KEY].id;
    var week_number = tasks[0].week_number;
    
    // get students ids on this lab at this week
	var queryi = datastore.createQuery('records').filter('lab_id', '=', lab_id).filter('week_number','=',week_number);//.select(['name']);
    var [students] = await datastore.runQuery(queryi);
    var studs_ids=[];
    //console.log("labs"+labs[0]);
    for(let i in students) {     
        studs_ids[i]=students[i].student_id;
    }
    //console.log(lab_names);
    return studs_ids;
}

var getStudentsIdsPerWeek = async(lab_name, week_no, prof_id) =>{
	
	//get lab_id
	var query = datastore.createQuery('labs').filter('name', '=', lab_name).filter('prof_id','=',prof_id);
    var [tasks] = await datastore.runQuery(query)
    var lab_id = tasks[0][datastore.KEY].id;
    var week_number = week_no;
    
    // get students ids on this lab at this week
	var queryi = datastore.createQuery('records').filter('lab_id', '=', lab_id).filter('week_number','=',week_number);//.select(['name']);
    var [students] = await datastore.runQuery(queryi);
    var studs_ids=[];
    //console.log("labs"+labs[0]);
    for(let i in students) {     
        studs_ids[i]=students[i].student_id;
    }
    //console.log(lab_names);
    return studs_ids;
}


var removeStudent = async(lab_name, student_id, prof_id)=>{
	//get lab_id
	var query = datastore.createQuery('labs').filter('name', '=', lab_name).filter('prof_id','=',prof_id);
    var [tasks] = await datastore.runQuery(query)
    var lab_id = tasks[0][datastore.KEY].id;
    var week_number = tasks[0].week_number;
    
    var deleted;
    // get students ids on this lab at this week
	var queryi = datastore.createQuery('records').filter('lab_id', '=', lab_id).filter('week_number','=',week_number).filter('student_id','=',student_id);
    var [student] = await datastore.runQuery(queryi);
    var key = student[0][datastore.KEY];
    await datastore.delete(key)
    .then(function onSuccess(entity){
    	deleted = true;
    })
    .catch(function onError(error){
    	deleted = false;
    	console.log("error register"+error);
    });
    return deleted;
}



var getStudentsNames = async(lab_name, prof_id)=>{
	//get lab_id
	var query = datastore.createQuery('labs').filter('name', '=', lab_name).filter('prof_id','=',prof_id);
    var [tasks] = await datastore.runQuery(query)
    var lab_id = tasks[0][datastore.KEY].id;
    var week_number = tasks[0].week_number;
    
    // get students ids on this lab at this week
	var queryi = datastore.createQuery('records').filter('lab_id', '=', lab_id).filter('week_number','=',week_number);//.select(['name']);
    var [students] = await datastore.runQuery(queryi);
    var studs_names=[];
    //console.log("labs"+labs[0]);
    for(let i in students) {    
    	const [student] = await datastore.get(datastore.key(['login', parseInt(students[i].student_id)])); 
        studs_names[i]=student.firstname +" "+student.lastname;
    }
    //console.log(lab_names);
    return studs_names;
}

var getStudentsNamesPerWeek = async(lab_name,week_no, prof_id)=>{
	//get lab_id
	var query = datastore.createQuery('labs').filter('name', '=', lab_name).filter('prof_id','=',prof_id);
    var [tasks] = await datastore.runQuery(query)
    var lab_id = tasks[0][datastore.KEY].id;
    var week_number = week_no;
    
    // get students ids on this lab at this week
	var queryi = datastore.createQuery('records').filter('lab_id', '=', lab_id).filter('week_number','=',week_number); 
    var [students] = await datastore.runQuery(queryi);
    var studs_names=[];
     
    for(let i in students) {    
    	const [student] = await datastore.get(datastore.key(['login', parseInt(students[i].student_id)])); 
        studs_names[i]=student.firstname +" "+student.lastname;
    }
     
    return studs_names;
}


var getStudentsProfilePerSemester = async(lab_name, prof_id)=>{
	
	//get lab_id
	var query = datastore.createQuery('labs').filter('name', '=', lab_name).filter('prof_id','=',prof_id);
    var [tasks] = await datastore.runQuery(query)
    var lab_id = tasks[0][datastore.KEY].id;
     
    // get all students on this semester at this object 
	var queryi = datastore.createQuery('records').filter('lab_id', '=', lab_id); 
    var [students] = await datastore.runQuery(queryi);
    
    

    var students_ids=[];
    //get all students ids
    for(let i in students) {
        students_ids[i]=students[i].student_id;
    }
     
    
   	// get unique students ids 
    const ids = Array.from(new Set(students_ids));
    students_profile = []
    
    var nr_matricol;
    var group;
    for(let j in  ids){
    	//get student nr matricol and group
    	var infos=[];
    	nr_matricol ="";
    	group = "";
    	infos = await getStudentsInformations(ids[j]);
    	if(infos != undefined){
	    	if(infos[0] != undefined) nr_matricol = infos[0];
	    		else nr_matricol = "-";
	    	if(infos[1] != undefined) group = infos[1];
	    		else group = "-";
    	}

    	//get student firstname, lastname
    	 const [student] = await datastore.get(datastore.key(['login', parseInt(ids[j])]));
    	 if(student!=undefined){
    	 	//get student grades and attendences 
    	 	var student_situation = await getLaboratoryInformationsForName2(lab_name, ids[j]);
    		var w1="none",w2="none",w3="none",w4="none",w5="none",w6="none",w7="none",w8="none",w9="none",w10="none",w11="none",w12="none",w13="none",w14="none";
    		for(let k=0; k<student_situation.length; k++){

    			if(student_situation[k].week_number!= undefined){
    				console.log("saptamana" + student_situation[k].week_number + typeof(student_situation[k].week_number));
    				switch(student_situation[k].week_number.toString()){
    				case "1": w1 = student_situation[k].grade; break;
    				case '2': w2 = student_situation[k].grade; break;
    				case '3': w3 = student_situation[k].grade; break;
    				case '4': w4 = student_situation[k].grade; break;
    				case '5': w5 = student_situation[k].grade; break;
    				case '6': w6 = student_situation[k].grade; break;
    				case '7': w7 = student_situation[k].grade; break;
    				case '8': w8 = student_situation[k].grade; break;
    				case '9': w9 = student_situation[k].grade; break;
    				case '10': w10 = student_situation[k].grade; break;
    				case '11': w11 = student_situation[k].grade; break;
    				case '12': w12 = student_situation[k].grade; break;
    				case '13': w13 = student_situation[k].grade; break;
    				case '14': w14 = student_situation[k].grade; break;

    			    }
    		    }
    		}

    	 	students_profile.push({id: ids[j], firstname: student.firstname, lastname: student.lastname, nr_matricol: nr_matricol, group: group, w1: w1, w2: w2, w3: w3, w4: w4, w5: w5, w6: w6, w7: w7, w8: w8, w9: w9, w10: w10, w11: w11, w12: w12, w13: w13, w14: w14 }); 
    	



    	}
    }

    //sort students alfabetically 
    for(var i=0;i<students_profile.length-1;i++){
  		var first = students_profile[i].firstname.toLowerCase().charCodeAt(0);
  		console.log("f"+first);
	    for(var j =i+1; j<students_profile.length; j++){
	      var second = students_profile[j].firstname.toLowerCase().charCodeAt(0);
	      console.log("s"+second);
	      if(first >second){
	      	 console.log("interschimb"+students_profile[i].firstname+" cu "+students_profile[j].firstname);
	        //swap students names
	          var aux = students_profile[i];
	          students_profile[i] = students_profile[j];
	          students_profile[j] = aux;
	          first = students_profile[i].firstname.toLowerCase().charCodeAt(0);
	         
	      }  
	    }
   }

   return students_profile;
}


var getFinalStudents = async(lecture_id)=>{ 
    // get all students on this semester at this object 
    var queryi = datastore.createQuery('records').filter('lecture_code', '=', lecture_id); 
    var [students] = await datastore.runQuery(queryi);
    
    var students_ids=[];
    //get all students ids
    for(let i in students) {
        students_ids[i]=students[i].student_id;
    }
     
    // get unique students ids 
    const ids = Array.from(new Set(students_ids));
    students_profile = []
    
    var nr_matricol;
    var group;
    for(let j in  ids){
        //get student nr matricol and group
        var infos=[];
        nr_matricol ="";
        group = "";
        infos = await getStudentsInformations(ids[j]);
        if(infos != undefined){
            if(infos[0] != undefined) nr_matricol = infos[0];
                else nr_matricol = "-";
            if(infos[1] != undefined) group = infos[1];
                else group = "-";
        }

        //get student firstname, lastname
         const [student] = await datastore.get(datastore.key(['login', parseInt(ids[j])]));
         if(student!=undefined){
            //get student grades and attendences 
            var student_situation = await getLaboratoryInformationsForNameFinal(lecture_id, ids[j]);
            var examsGrades = await getExamsGradesForStudent(lecture_id, ids[j]);
            var w1="none",w2="none",w3="none",w4="none",w5="none",w6="none",w7="none",w8="none",w9="none",w10="none",w11="none",w12="none",w13="none",w14="none";
            for(let k=0; k<student_situation.length; k++){

                if(student_situation[k].week_number!= undefined){
                    console.log("saptamana" + student_situation[k].week_number + typeof(student_situation[k].week_number));
                    switch(student_situation[k].week_number.toString()){
                    case "1": w1 = student_situation[k].grade; break;
                    case '2': w2 = student_situation[k].grade; break;
                    case '3': w3 = student_situation[k].grade; break;
                    case '4': w4 = student_situation[k].grade; break;
                    case '5': w5 = student_situation[k].grade; break;
                    case '6': w6 = student_situation[k].grade; break;
                    case '7': w7 = student_situation[k].grade; break;
                    case '8': w8 = student_situation[k].grade; break;
                    case '9': w9 = student_situation[k].grade; break;
                    case '10': w10 = student_situation[k].grade; break;
                    case '11': w11 = student_situation[k].grade; break;
                    case '12': w12 = student_situation[k].grade; break;
                    case '13': w13 = student_situation[k].grade; break;
                    case '14': w14 = student_situation[k].grade; break;

                    }
                }
            }
             
             
            students_profile.push({id: ids[j], firstname: student.firstname, lastname: student.lastname, nr_matricol: nr_matricol, group: group, w1: w1, w2: w2, w3: w3, w4: w4, w5: w5, w6: w6, w7: w7, w8: w8, w9: w9, w10: w10, w11: w11, w12: w12, w13: w13, w14: w14, extraPoints:examsGrades.extra_points, midterm:examsGrades.midterm, finalGrade:examsGrades.final_exam }); 



        }
    }

    //sort students alfabetically 
    for(var i=0;i<students_profile.length-1;i++){
        var first = students_profile[i].firstname.toLowerCase().charCodeAt(0);
        console.log("f"+first);
        for(var j =i+1; j<students_profile.length; j++){
          var second = students_profile[j].firstname.toLowerCase().charCodeAt(0);
          console.log("s"+second);
          if(first >second){
             console.log("interschimb"+students_profile[i].firstname+" cu "+students_profile[j].firstname);
            //swap students names
              var aux = students_profile[i];
              students_profile[i] = students_profile[j];
              students_profile[j] = aux;
              first = students_profile[i].firstname.toLowerCase().charCodeAt(0);
             
          }  
        }
   }

   return students_profile;
}



var getStudentsForLectureOwner = async(laboratory_id)=>{
    
    //get lab_id
    var query = datastore.createQuery('labs').filter('labs_code', '=', laboratory_id);
    var [tasks] = await datastore.runQuery(query)
    var lab_id = tasks[0][datastore.KEY].id;
     
    // get all students on this semester at this object 
    var queryi = datastore.createQuery('records').filter('lab_id', '=', lab_id); 
    var [students] = await datastore.runQuery(queryi);
    
    

    var students_ids=[];
    //get all students ids
    for(let i in students) {
        students_ids[i]=students[i].student_id;
    }
     
    
    // get unique students ids 
    const ids = Array.from(new Set(students_ids));
    students_profile = []
    
    var nr_matricol;
    var group;
    for(let j in  ids){
        //get student nr matricol and group
        var infos=[];
        nr_matricol ="";
        group = "";
        infos = await getStudentsInformations(ids[j]);
        if(infos != undefined){
            if(infos[0] != undefined) nr_matricol = infos[0];
                else nr_matricol = "-";
            if(infos[1] != undefined) group = infos[1];
                else group = "-";
        }

        //get student firstname, lastname
         const [student] = await datastore.get(datastore.key(['login', parseInt(ids[j])]));
         if(student!=undefined){
            //get student grades and attendences 
            var student_situation = await getLaboratoryInformationsForName(laboratory_id, ids[j]);
            var w1="none",w2="none",w3="none",w4="none",w5="none",w6="none",w7="none",w8="none",w9="none",w10="none",w11="none",w12="none",w13="none",w14="none";
            for(let k=0; k<student_situation.length; k++){

                if(student_situation[k].week_number!= undefined){
                    console.log("saptamana" + student_situation[k].week_number + typeof(student_situation[k].week_number));
                    switch(student_situation[k].week_number.toString()){
                    case "1": w1 = student_situation[k].grade; break;
                    case '2': w2 = student_situation[k].grade; break;
                    case '3': w3 = student_situation[k].grade; break;
                    case '4': w4 = student_situation[k].grade; break;
                    case '5': w5 = student_situation[k].grade; break;
                    case '6': w6 = student_situation[k].grade; break;
                    case '7': w7 = student_situation[k].grade; break;
                    case '8': w8 = student_situation[k].grade; break;
                    case '9': w9 = student_situation[k].grade; break;
                    case '10': w10 = student_situation[k].grade; break;
                    case '11': w11 = student_situation[k].grade; break;
                    case '12': w12 = student_situation[k].grade; break;
                    case '13': w13 = student_situation[k].grade; break;
                    case '14': w14 = student_situation[k].grade; break;

                    }
                }
            }

            students_profile.push({id: ids[j], firstname: student.firstname, lastname: student.lastname, nr_matricol: nr_matricol, group: group, w1: w1, w2: w2, w3: w3, w4: w4, w5: w5, w6: w6, w7: w7, w8: w8, w9: w9, w10: w10, w11: w11, w12: w12, w13: w13, w14: w14 }); 
        



        }
    }

    //sort students alfabetically 
    for(var i=0;i<students_profile.length-1;i++){
        var first = students_profile[i].firstname.toLowerCase().charCodeAt(0);
        console.log("f"+first);
        for(var j =i+1; j<students_profile.length; j++){
          var second = students_profile[j].firstname.toLowerCase().charCodeAt(0);
          console.log("s"+second);
          if(first >second){
             console.log("interschimb"+students_profile[i].firstname+" cu "+students_profile[j].firstname);
            //swap students names
              var aux = students_profile[i];
              students_profile[i] = students_profile[j];
              students_profile[j] = aux;
              first = students_profile[i].firstname.toLowerCase().charCodeAt(0);
             
          }  
        }
   }

   return students_profile;
}




var getStudentsGrades = async(lab_name,prof_id) =>{
	
	//get lab_id
	var query = datastore.createQuery('labs').filter('name', '=', lab_name).filter('prof_id','=',prof_id);
    var [tasks] = await datastore.runQuery(query)
    var lab_id = tasks[0][datastore.KEY].id;
    var week_number = tasks[0].week_number;
    
    // get students ids on this lab at this week
	var queryi = datastore.createQuery('records').filter('lab_id', '=', lab_id).filter('week_number','=',week_number);//.select(['name']);
    var [students] = await datastore.runQuery(queryi);
    var studs_ids=[];
    //console.log("labs"+labs[0]);
    for(let i in students) {     
        studs_ids[i]=students[i].grade;
    }
    //console.log(lab_names);
    return studs_ids;
}



var getStudentsGradesPerWeek = async(lab_name, week_no, prof_id) =>{
	
	//get lab_id
	var query = datastore.createQuery('labs').filter('name', '=', lab_name).filter('prof_id','=',prof_id);
    var [tasks] = await datastore.runQuery(query)
    var lab_id = tasks[0][datastore.KEY].id;
    var week_number = week_no;
    
    // get students ids on this lab at this week
	var queryi = datastore.createQuery('records').filter('lab_id', '=', lab_id).filter('week_number','=',week_number);//.select(['name']);
    var [students] = await datastore.runQuery(queryi);
    var studs_ids=[];
    //console.log("labs"+labs[0]);
    for(let i in students) {     
        studs_ids[i]=students[i].grade;
    }
    //console.log(lab_names);
    return studs_ids;
}


var getProfileInfos = async(student_id)=>{
	var infos = [];
	const [student] = await datastore.get(datastore.key(['login', parseInt(student_id)]));
	infos[0] = student.firstname + " " + student.lastname;

	var query = datastore.createQuery('student_infos').filter('student_id', '=', student_id);
    var [s] = await datastore.runQuery(query);
    if(s[0] != undefined){
    infos[1] = s[0].nr_matricol;
    infos[2] = s[0].group;
	}
    return infos;
}


var getStudentStatus = async(lab_name,code, student_id)=>{
	//get lab_id
	var query = datastore.createQuery('labs').filter('name', '=', lab_name).filter('code','=',code);
    var [tasks] = await datastore.runQuery(query)
    var lab_id = tasks[0][datastore.KEY].id;
    var week_number = tasks[0].week_number;

    var queryi = datastore.createQuery('records').filter('lab_id', '=', lab_id).filter('week_number','=',week_number).filter('student_id','=',student_id);//.select(['name']);
    var [students] = await datastore.runQuery(queryi);
    var studs_ids=[];
    //console.log("labs"+labs[0]);
    studs_ids[0]=students[0].attendence;
    studs_ids[1]=students[0].grade;
    studs_ids[2]=week_number;
    //console.log(lab_names);
    return studs_ids;

}


var updateGrade = async(lab_name, grade, stud_id, week_no, lecture_code, prof_id) =>{
	
	//get lab_id
	var query = datastore.createQuery('labs').filter('name', '=', lab_name).filter('prof_id','=',prof_id);
    var [tasks] = await datastore.runQuery(query)
    var lab_id = tasks[0][datastore.KEY].id;
    var week_number = week_no; //tasks[0].week_number;
    
    // get students ids on this lab at this week
	var queryi = datastore.createQuery('records').filter('lab_id', '=', lab_id).filter('week_number','=',week_number).filter('student_id','=',stud_id);
    var [students] = await datastore.runQuery(queryi);
    
    const k = students[0][datastore.KEY];
	const [entity] = await datastore.get(k);
	entity.grade=grade;
    entity.lecture_code = lecture_code;
	await datastore.update(entity);
}
//updateExtraPoints(vars.points, vars.student_id, vars.lec_code)

var updateExtraPoints = async(points, student_id, lec_code) =>{
    
     // get student's field
     var queryi = datastore.createQuery('exam_grades').filter('student_id', '=', student_id.toString()).filter('lecture_id','=',lec_code);
     var [students] = await datastore.runQuery(queryi);
    
    if(students[0]!=undefined){
        console.log("prima latura");
    const k = students[0][datastore.KEY];
    const [entity] = await datastore.get(k);
    entity.extra_points=points;
    await datastore.update(entity);
    }
    else{
        console.log("a 2a latura");
    var extra_points = points;
    var lecture_id = lec_code;
    var midterm = "";
    var final_exam = "";
    await datastore.save({
    key: datastore.key('exam_grades'),
    data: {extra_points, final_exam, lecture_id, midterm, student_id}})
    } 
}

var updateMidterm = async(points, student_id, lec_code) =>{
    
     // get student's field
     var queryi = datastore.createQuery('exam_grades').filter('student_id', '=', student_id.toString()).filter('lecture_id','=',lec_code);
     var [students] = await datastore.runQuery(queryi);
    
    if(students[0]!=undefined){
    console.log("prima latura");
    const k = students[0][datastore.KEY];
    const [entity] = await datastore.get(k);
    entity.midterm=points;
    await datastore.update(entity);
    }
    else{
    console.log("a 2a latura");
    var extra_points ="";
    var lecture_id = lec_code;
    var midterm = points;
    var final_exam = "";
    await datastore.save({
    key: datastore.key('exam_grades'),
    data: {extra_points, final_exam, lecture_id, midterm, student_id}})
    } 
}


var updateFinalExam = async(points, student_id, lec_code) =>{
    
     // get student's field
     var queryi = datastore.createQuery('exam_grades').filter('student_id', '=', student_id.toString()).filter('lecture_id','=',lec_code);
     var [students] = await datastore.runQuery(queryi);
    
    if(students[0]!=undefined){
    console.log("prima latura");
    const k = students[0][datastore.KEY];
    const [entity] = await datastore.get(k);
    entity.final_exam=points;
    await datastore.update(entity);
    }
    else{
    console.log("a 2a latura");
    var extra_points ="";
    var lecture_id = lec_code;
    var midterm = "";
    var final_exam = points;
    await datastore.save({
    key: datastore.key('exam_grades'),
    data: {extra_points, final_exam, lecture_id, midterm, student_id}})
    } 
}

var changePassword = async(stud_id, new_pass) =>{
	
	new_pass = encodePass(new_pass); 
    const [entity] = await datastore.get(datastore.key(['login', parseInt(stud_id)]));
	entity.pass=new_pass;
	await datastore.update(entity);
}


var getProfLabs = async (id) => {
    var query = datastore.createQuery('labs').filter('prof_id', '=', id.toString());//.select(['name']);
    var [labs] = await datastore.runQuery(query);
    var lab_names=[];
    //console.log("labs"+labs[0]);
    for(let i in labs) {
        labs[i].id = labs[i][datastore.KEY];     
        //lab_names[i]=labs[i].name;
        lab_names.push({name:labs[i].name, lab_id:labs[i].labs_code});
    }
    //console.log(lab_names);
    return lab_names;
}
var getProfLectures = async (id) => {
    var query = datastore.createQuery('lectures').filter('owner_id', '=', id.toString()).filter('labs_code','=',''); 
    var [labs] = await datastore.runQuery(query);
    var lab_names=[];
    //console.log("labs"+labs[0]);
    for(let i in labs) {
        labs[i].id = labs[i][datastore.KEY];     
        lab_names.push({name:labs[i].name, id:labs[i].lecture_code});
    }
    //console.log(lab_names);
    return lab_names;
}

//return distinct ids of laboratories for given lecture id
var getLabsIdsForLecture = async (lecture_id,id) => {
    var query = datastore.createQuery('lectures').filter('owner_id', '=', id.toString()).filter('lecture_code','=',lecture_id); 
    var [labs] = await datastore.runQuery(query);
    var lab_names=[];
    //console.log("labs"+labs[0]);
    for(let i in labs) {
        if(labs[i].labs_code!="")    
        lab_names.push({id:labs[i].labs_code});
    }
    //console.log(lab_names);
    return lab_names;
}

var getLabsInformations = async (lecture_id, id) => {
    var query = datastore.createQuery('lectures').filter('owner_id', '=', id.toString()).filter('lecture_code','=',lecture_id); 
    var [labs] = await datastore.runQuery(query);
    var labs_code=[];
    //console.log("labs"+labs[0]);
    for(let i in labs) {
        if(labs[i].labs_code!="")    
        labs_code.push(labs[i].labs_code);
    }
    var data=[];
    for(let j in  labs_code){
        var queryi = datastore.createQuery('labs').filter('labs_code', '=', labs_code[j]); 
        var [laboratories] = await datastore.runQuery(queryi);
        var lab_name = laboratories[0].name;
        var prof_id = laboratories[0].prof_id;
        var [prof] = await datastore.get(datastore.key(['login', parseInt(prof_id)]));
        var name = prof.firstname+" "+prof.lastname;
        data.push({name: name, laboratory_name:lab_name, group: labs_code[j].substring(labs_code[j].length-2,labs_code[j].length)});
    }
    return data;
}


var getLabCodeForLecture = async (laboratory_id) => {
    var query = datastore.createQuery('lectures').filter('labs_code','=',laboratory_id); 
    var [labs] = await datastore.runQuery(query);
    return labs[0].lecture_code;
}


var getLabNameById = async (laboratory_id) => {
    var query = datastore.createQuery('labs').filter('labs_code', '=', laboratory_id); 
    var [labs] = await datastore.runQuery(query);
    return labs[0].name;
}


var updateStartingLab = async (lab_name, mycode, week_no, id)=>{
	var registered;
	var query = datastore.createQuery('labs').filter('name', '=', lab_name).filter('prof_id','=',id);
    var [tasks] = await datastore.runQuery(query)

    var lab_id = tasks[0][datastore.KEY].id;
    const k = tasks[0][datastore.KEY];

    //const taskKey = datastore.key('labs');
	const [entity] = await datastore.get(k);//.filter('name', '=', lab_name).filter('prof_id','=',id);

	console.log(entity);
	entity.week_number=week_no;
	entity.code=mycode;
	await datastore.update(entity)
.then(function onSuccess(entity){
    	registered = true;
    })
    .catch(function onError(error){
    	registered = false;
    	console.log("error register"+error);
    });
 if(registered)return true;
 return false;

}


var stopLabAttendence = async (lab_name, mycode, week_no, id)=>{
	var registered;
	var query = datastore.createQuery('labs')
	.filter('name', '=', lab_name)
	.filter('prof_id','=',id)
	.filter('week_number','=', week_no)
	.filter('code','=', mycode);

    var [tasks] = await datastore.runQuery(query)
    var lab_id = tasks[0][datastore.KEY].id;
    const k = tasks[0][datastore.KEY];

    //const taskKey = datastore.key('labs');
	const [entity] = await datastore.get(k);//.filter('name', '=', lab_name).filter('prof_id','=',id);
	var nothing="";
	console.log(entity);
	entity.code=nothing;
	await datastore.update(entity)
.then(function onSuccess(entity){
    	registered = true;
    })
    .catch(function onError(error){
    	registered = false;
    	console.log("error register"+error);
    });
 if(registered)return true;
 return false;

}



var createLab = async (name, lec_code,lgroup, prof_id)=>{

	var resu; 
    const query = datastore.createQuery('labs').filter('name', '=', name.toString()).limit(1);//.filter('prof_id','=',prof_id.toString())
      await datastore
     .runQuery(query)
     .then(data =>{
     	 resu = data;
	});
    if(resu[0].length > 0)return false;
    var lecture;
    const queryi = datastore.createQuery('lectures').filter('lecture_code', '=', lec_code.toString())
    .limit(1);
     var [lecture] = await datastore.runQuery(queryi);

    var labs_code = lecture[0].acronym+"_"+lgroup;
    var registered;
	var code="";
    const reg = await datastore.save({
    key: datastore.key('labs'),
    data: {code, name, prof_id, labs_code}})
    .then(function onSuccess(entity){
    	registered = true;
    })
    .catch(function onError(error){
    	registered = false;
    	console.log("error create lab"+error);
    });
    var acronym = lecture[0].acronym;
      
    var lecture_code = lecture[0].lecture_code;
    name = lecture[0].name;
    var owner_id = lecture[0].owner_id;

    if(registered){
         await datastore.save({
            key: datastore.key('lectures'),
            data: {acronym, labs_code, lecture_code, name, owner_id}});
        return true;
    }
    return false;  
}


var createLecture = async (lname, acro, code, prof_id)=>{

    var resu; 
    //check if code was not used yet, it is primary key 
    const queryi = datastore.createQuery('lectures').filter('lecture_code', '=', code.toString())
    .limit(1);
      await datastore
     .runQuery(queryi)
     .then(data =>{
         resu = data;
    });
     console.log(resu[0]);
    if(resu[0].length > 0)return false;

    //check if new lecture was not created before
    const query = datastore.createQuery('lectures').filter('acronym', '=', acro.toString())
    .filter('name', '=', lname.toString())
    .limit(1);
      await datastore
     .runQuery(query)
     .then(data =>{
         resu = data;
    });
     console.log(resu[0]);
    if(resu[0].length > 0)return false;
    
    var registered;
    var acronym = acro;
    var labs_code = "";
    var lecture_code = code;
    var name = lname;
    var owner_id = prof_id;
    const reg = await datastore.save({
    key: datastore.key('lectures'),
    data: {acronym, labs_code, lecture_code, name, owner_id}})
    .then(function onSuccess(entity){
        registered = true;
    })
    .catch(function onError(error){
        registered = false;
        console.log("error create lab"+error);
    });

    if(registered)return true;
    return false;  
}


var checkLectureCode = async (code)=>{

    var resu; 
    //check if code was not used yet, it is primary key 
    const queryi = datastore.createQuery('lectures').filter('lecture_code', '=', code)
    .limit(1);
      await datastore
     .runQuery(queryi)
     .then(data =>{
         resu = data;
    });
     console.log(resu[0]);
    if(resu[0].length > 0)return true;
    return false;
}

var checkExistingLab = async (code, labGroup)=>{

    
    //get acronym of the lecture
    const query = datastore.createQuery('lectures').filter('lecture_code', '=', code.toString())
    .limit(1);
     var [resu] = await datastore
     .runQuery(query);
      
    var lab_code = resu[0].acronym+"_"+labGroup; 
    var result;
    //check if already doesnt exists laboratory for this group
    const queryi = datastore.createQuery('lectures').filter('lecture_code', '=', code.toString())
    .filter('labs_code', '=', lab_code.toString())
    .limit(1);
      await datastore
     .runQuery(queryi)
     .then(data =>{
         result = data;
    });
    if(result[0].length > 0)return false;
    return true;
}

var getLectureName = async (code)=>{
    var resu; 
    //check if code was not used yet, it is primary key 
    const queryi = datastore.createQuery('lectures').filter('lecture_code', '=', code.toString());
    var [lec] = await datastore.runQuery(queryi);
    if(lec[0]!=undefined)return lec[0].name;  
}



var attendToLab = async (lab_name, lab_code, student_id)=>{
	var queryi = datastore.createQuery('labs').filter('name', '=', lab_name);
	 var [lab] = await datastore.runQuery(queryi)
	console.log("hererere"+lab[0].week_number+" "+lab[0].code);

	if(lab[0].code!=lab_code)return 0;

	var resu; 
    const query = datastore.createQuery('records')
    				.filter('lab_id', '=', lab[0][datastore.KEY].id)
    				.filter('student_id','=',student_id)
    				.filter('week_number','=',lab[0].week_number).limit(1);//.filter('prof_id','=',prof_id.toString())
      await datastore
     .runQuery(query)
     .then(data =>{
     	 resu = data;
	});
    // console.log(resu[0]);
    if(resu[0].length > 0)return 1;
 	
	var registered;
	var attendence="yes";
	var grade="";
	var lab_id=lab[0][datastore.KEY].id;
	var week_number = lab[0].week_number;
    const reg = await datastore.save({
    key: datastore.key('records'),
    data: {attendence, grade, lab_id, student_id, week_number}})
    .then(function onSuccess(entity){
    	registered = true;
    })
    .catch(function onError(error){
    	registered = false;
    	console.log("error create lab"+error);
    });

    if(registered)return 2;
    return 3;  


}


var getSessionId = async(email, pass)=>{
	
   /*	var queryi = await datastore.createQuery('login').filter('email', '=', email.toString()).filter('pass','=',pass.toString());
	await queryi.run(function(err, entities) {

		var keys = entities.map(function(entity) {
		        // datastore.KEY is a Symbol
		        id=entity[datastore.KEY].id;
		        console.log("Keyyy"+entity[datastore.KEY].id);
		        return entity[datastore.KEY];
		    });
});*/
	pass = encodePass(pass);
	var query = datastore.createQuery('login').filter('email', '=', email.toString()).filter('pass','=',pass.toString());
    var [tasks] = await datastore.runQuery(query)
    return tasks[0][datastore.KEY].id;
}

var getResetPassCode = async(email) => {
	
	var data=[];
	var query = datastore.createQuery('login').filter('email', '=', email.toString());
    var [tasks] = await datastore.runQuery(query)
    data[0] = tasks[0][datastore.KEY].id;
    data[1] = tasks[0].firstname;
    data[2] = tasks[0].lastname;
    return data;
}

var checkEmail = async(email)=>{
	var query = datastore.createQuery('login').filter('email', '=', email);
	var [tasks] = await datastore.runQuery(query);
	 
	if(tasks[0]== undefined)return true;
	return false;

}

var checkNrMat = async(nr_mat)=>{
	var query = datastore.createQuery('student_infos').filter('nr_matricol', '=', nr_mat);
	var [tasks] = await datastore.runQuery(query);
	 
	if(tasks[0]== undefined)return true;
	return false;
}

var getStudentsInformations = async (student_id)=>{
	var query = datastore.createQuery('student_infos').filter('student_id', '=', student_id);
	var [tasks] = await datastore.runQuery(query);
	var infos = []
	if(tasks[0]!=undefined){
	infos[0] = tasks[0].nr_matricol;
	infos[1] = tasks[0].group;
	return infos;
	}
	return undefined;
}

var updateNrAndGroup = async(nr_matricol, group, student_id)=>{
	var query = datastore.createQuery('student_infos').filter('student_id', '=', student_id);
	var [tasks] = await datastore.runQuery(query);
	 

	 var registered;
	if(tasks[0]== undefined){
		
		
    	const reg = await datastore.save({
	    key: datastore.key('student_infos'),
	    data: {group, nr_matricol,student_id}})
	    .then(function onSuccess(entity){
	    	registered = true;
	    })
	    .catch(function onError(error){
	    	registered = false;
	    	console.log("error register"+error);
	    });    
	}
	else{

		 
	    const k = tasks[0][datastore.KEY];
		const [entity] = await datastore.get(k); 
		entity.nr_matricol=nr_matricol;
		entity.group=group;
		await datastore.update(entity)
			.then(function onSuccess(entity){
	    	registered = true;
	    	})
	    .catch(function onError(error){
	    	registered = false;
	    	console.log("error register"+error);
	    });

	}
	if(registered)return true;
	return false;		
	 
}

var checkCode = async(code)=>{

	const [entity] = await datastore.get(datastore.key(['login', parseInt(code)]));
	if(entity == undefined)return true;
	return false;
}

var checkConnection = async(email, pass) =>{
	pass = encodePass(pass);
	var query = datastore.createQuery('login').filter('email', '=', email).filter('pass','=',pass);
	var [tasks] = await datastore.runQuery(query);
	 
	if(tasks[0]== undefined)return false;
	return true;
}

var sendMessage = async(to_id, text, from_id)=>{
    var time = new Date();
    var seen = false;
    await datastore.save({
    key: datastore.key('messenger'),
    data: {text, from_id, to_id, time, seen}})

    var query = datastore.createQuery('messenger').filter('text', '=', from_id+to_id);
    var [status] = await datastore.runQuery(query);
    if(status[0]!=undefined){
        const [entity] = await datastore.get(status[0][datastore.KEY])
        entity.seen = false
        await datastore.update(entity)
    }
    else{

        text = from_id + to_id;
        from_id = ""
        to_id = ""
        await datastore.upsert({
        key: datastore.key('messenger'),
        data: {text, from_id, to_id, time, seen}})
    }
}



var getPersons = async (user_id)=>{
    var query = datastore.createQuery('messenger').filter('to_id', '=', user_id);
    var [pers] = await datastore.runQuery(query);
    var queryi = datastore.createQuery('messenger').filter('from_id', '=', user_id);
    var [pers2] = await datastore.runQuery(queryi);
    

    var sorted_persons =[]
    if(pers!=undefined)
        for(let i in pers){
            sorted_persons.push(pers[i])
            //console.log("pers", pers[i])
        }
    if(pers2!=undefined)
        for(let i in pers2){
            sorted_persons.push(pers2[i])
            //console.log("pers2", pers[i])
        }
    //sort by date persons who sent messages
    var temp = []
    var ids = []
    if(sorted_persons!=undefined){
        sorted_persons = sorted_persons.sort((a, b) => a.time - b.time)
        //console.log("sorted p1", sorted_persons)
        //get ids
            for(let i in sorted_persons){
                if(sorted_persons[i].from_id == user_id)
                    temp.push(sorted_persons[i].to_id)
                if(sorted_persons[i].to_id == user_id)
                    temp.push(sorted_persons[i].from_id)
            }  
    //console.log("temp", temp)  
    ids = Array.from(new Set(temp));
    //console.log("ids", ids)
    }
     
    var p_buff =[]
    if(ids!=undefined){                
        for(let i in ids){
            var p_id = ids[i];
             var q = datastore.createQuery('messenger')
             .filter('text','=',p_id+user_id) 
            var [unread] = await datastore.runQuery(q);
            var seen = true;
            if(unread[0]!=undefined)
                seen = unread[0].seen;
            const [entity] = await datastore.get(datastore.key(['login', parseInt(p_id)]));
            var url = await getMyProfileUrl(entity[datastore.KEY].id)
            p_buff.push({name:entity.firstname+" "+entity.lastname, id:entity[datastore.KEY].id, seen: seen, profile_url:url})
           // console.log("pbuff", p_buff)
        }
    }
    return p_buff;
}


var getPersonsForSearch = async (user_id)=>{

    var query = datastore.createQuery('labs').filter('prof_id', '=', user_id);
    var [labs] = await datastore.runQuery(query);
    //console.log("labs", labs)
    var all_ids = [];
    if(labs!=undefined)
    for(let i in labs){
       
        var queryi = datastore.createQuery('records').filter('lab_id', '=', labs[i][datastore.KEY].id.toString());
        var [studs] = await datastore.runQuery(queryi);
        var studs_ids = []
        //console.log("studs ", studs)
        for(let j in studs){
            all_ids.push(studs[j].student_id)
        }

        all_ids = Array.from(new Set(all_ids));
    }

    var result = []
    if(all_ids != undefined)
    for(let i in all_ids){
        const [entity] = await datastore.get(datastore.key(['login', parseInt(all_ids[i])]));
        result.push({id:all_ids[i], name: entity.firstname+" "+entity.lastname})
    }

    return result;
}

//method for student search
var sgetPersonsForSearch = async (user_id)=>{

    
    var all_ids = [];
    var queryi = datastore.createQuery('records').filter('student_id', '=', user_id);
    var [labs] = await datastore.runQuery(queryi);
    
    if(labs!=undefined)
    for(let i in labs){
        all_ids.push(labs[i].lab_id)    
    }
    all_ids = Array.from(new Set(all_ids));

    var prof_ids = []
    if(all_ids != undefined)
    for(let i in all_ids){
        const [entity] = await datastore.get(datastore.key(['labs', parseInt(all_ids[i])]));
        if(entity!=undefined)
            prof_ids.push(entity.prof_id)
    }
    prof_ids = Array.from(new Set(prof_ids));


    var result = []
    if(prof_ids != undefined)
    for(let i in prof_ids){
        const [entity] = await datastore.get(datastore.key(['login', parseInt(prof_ids[i])]));
        result.push({id:prof_ids[i], name: entity.firstname+" "+entity.lastname})
    }

    return result;
}


var loadConversation = async (req_id, current_id)=>{
    var query = datastore.createQuery('messenger').filter('to_id', '=', current_id).filter('from_id', '=', req_id);
    var [pers] = await datastore.runQuery(query);
    var queryi = datastore.createQuery('messenger').filter('from_id', '=', current_id).filter('to_id', '=', req_id);
    var [pers2] = await datastore.runQuery(queryi);
    
    var kk = req_id+current_id
    var q  = datastore.createQuery('messenger')
        .filter('text','=', kk)
    var [read] = await datastore.runQuery(q);
    //console.log("read", read)
    //console.log("filter",kk)
    if(read[0]!=undefined){
       // console.log("DIIIFFF FROM UNDF")
        const [status_row] = await datastore.get(read[0][datastore.KEY]);
        status_row.seen = true;
        await datastore.update(status_row) 
    }

    var sorted_persons =[]
    if(pers!=undefined)
        for(let i in pers){
            sorted_persons.push(pers[i])
            //console.log("pers", pers[i])
        }
    if(pers2!=undefined)
        for(let i in pers2){
            sorted_persons.push(pers2[i])
           // console.log("pers2", pers[i])
        }
    //sort by date persons who sent messages
    var temp = []
    var left = "left"
    var right = "right"
    if(sorted_persons!=undefined){
        sorted_persons = sorted_persons.sort((a, b) => a.time - b.time)
        //console.log("sorted p1", sorted_persons)
        //get ids
            for(let i in sorted_persons){
                if(sorted_persons[i].from_id == current_id)
                    temp.push({text:sorted_persons[i].text, position: right})
                if(sorted_persons[i].to_id == current_id)
                    temp.push({text:sorted_persons[i].text, position: left})
            }  
     
    }
 
    return temp;
}

module.exports = {
    sgetPersonsForSearch:sgetPersonsForSearch,
    getPersonsForSearch: getPersonsForSearch,
    loadConversation: loadConversation,
    sendMessage:sendMessage,
    getPersons: getPersons,
    login: login,
    register: register,
    getLabs: getLabs,
    getSessionId: getSessionId,
    createLab: createLab,
    getProfLabs: getProfLabs,
    updateStartingLab: updateStartingLab,
    attendToLab: attendToLab,
    getStudentsIds: getStudentsIds,
    getStudentsGrades: getStudentsGrades,
    updateGrade: updateGrade,
    stopLabAttendence: stopLabAttendence,
    getStudentStatus: getStudentStatus,
    checkEmail: checkEmail,
    checkConnection: checkConnection,
    getResetPassCode: getResetPassCode,
    checkCode: checkCode,
    changePassword: changePassword,
    getStudentsNames: getStudentsNames,
    checkNrMat: checkNrMat,
    updateNrAndGroup: updateNrAndGroup,
    getProfileInfos: getProfileInfos,
    getStudentsInformations: getStudentsInformations,
    removeStudent: removeStudent,
    getStudentsNamesPerWeek: getStudentsNamesPerWeek,
    getStudentsIdsPerWeek: getStudentsIdsPerWeek,
    getStudentsGradesPerWeek: getStudentsGradesPerWeek,
    getLabsForStudent: getLabsForStudent,
    getLaboratoryInformationsForName:getLaboratoryInformationsForName,
    getStudentsProfilePerSemester: getStudentsProfilePerSemester,
    createLecture: createLecture,
    checkLectureCode: checkLectureCode,
    getLectureName: getLectureName,
    checkExistingLab: checkExistingLab,
    getProfLectures: getProfLectures,
    getLabsIdsForLecture: getLabsIdsForLecture,
    getStudentsForLectureOwner: getStudentsForLectureOwner,
    getLaboratoryInformationsForName2: getLaboratoryInformationsForName2,
    getLabNameById: getLabNameById,
    getLabCodeForLecture: getLabCodeForLecture,
    getLaboratoryInformationsForNameFinal: getLaboratoryInformationsForNameFinal,
    getFinalStudents: getFinalStudents,
    updateExtraPoints: updateExtraPoints,
    updateMidterm: updateMidterm,
    updateFinalExam: updateFinalExam,
    getLectureGradesForStudent: getLectureGradesForStudent,
    getExamsGradesForStudent:getExamsGradesForStudent,
    getLabsInformations: getLabsInformations,
    upload: upload,
    getMyProfileUrl: getMyProfileUrl,
    getStudentsUrl: getStudentsUrl
}