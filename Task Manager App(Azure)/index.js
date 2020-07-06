const model = require('./model');
const express = require('express');
const session = require('express-session');
const { parse } = require('querystring');
const app = express();
var path = require('path');
 app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: 'trolololo'
    }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', async (req, res, next) => {

    res.sendFile(__dirname + '/html_pages/login.html');
  
});

app.get('/dash', async(req, res, next)=>{
	if(!req.session.user_id)return;
	res.sendFile(__dirname + '/html_pages/tasks.html');
});

app.get('/register', async(req,res,next)=>{
	res.sendFile(__dirname + '/html_pages/register.html');
});
app.get('/logout', async(req,res,next)=>{
	req.session.destroy();
	res.redirect('/');
});

app.post('/connect', async(req,res,next)=>{

	let body = '';
    if (req.method === 'POST') {
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var result = await model.connect(vars.email, vars.pass);
        console.log("login res"+result);
        if(result){
        	 req.session.user_id = await model.getUserId(vars.email, vars.pass);
        	 req.session.save();
        	 res.status(200).send("OK");
        	 }
        else {
        	res.status(404).send("Not Found");
        	return;
        }
        
	});
	}
});


app.post('/register', async(req,res,next)=>{

	let body = '';
    if (req.method === 'POST') {
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var result = await model.register(vars.email, vars.pass);
         
        if(result){
        	 req.session.user_id = await model.getUserId(vars.email, vars.pass);
        	 req.session.save();
        	 res.status(200).send("OK");
        	 }
        else {
        	res.status(404).send("Not Found");
        	return;
        }
         
	});
	}
});



app.post('/addTask', async(req,res,next)=>{

	let body = '';
    if (req.method === 'POST') {
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var result = await model.addTask(vars.description, req.session.user_id);
        if(result){
        	 res.status(200).send("OK");
        	 }
        else {
        	res.status(404).send("Not Found");
        	return;
        }
         
	});
	}
});


app.post('/loadTasks', async(req,res,next)=>{
    var result = await model.loadTasks(req.session.user_id);
    res.send(result);
});

app.post('/checkTask', async(req,res,next)=>{

	let body = '';
    if (req.method === 'POST') {
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var result = await model.checkTask(vars.check, vars.desc, req.session.user_id);
         
        if(result){
        	 res.status(200).send("OK");
        	 return;
        	 }
        else {
        	res.status(404).send("Not Found");
        	return;
        }
         
	});
	}
});

app.post('/deleteTask', async(req,res,next)=>{

	let body = '';
    if (req.method === 'POST') {
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        var vars =  parse(body);
        var result = await model.deleteTask(vars.desc, req.session.user_id);
         
        if(result){
        	 res.status(200).send("OK");
        	 return;
        	 }
        else {
        	res.status(404).send("Not Found");
        	return;
        }
         
	});
	}
});



const PORT = process.env.PORT || 8083;
app.listen(process.env.PORT || 8083, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});