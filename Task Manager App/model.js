 const {CosmosClient} = require("@azure/cosmos");
 const dbconfig = require('./dbconfiguration');
 const endpoint=dbconfig.endpoint;
 const key =dbconfig.key; 
 

 const client = new CosmosClient({ endpoint, key });
 const database = client.database("Tasks");
 const container = database.container("Login");
 const container2 = database.container("Todo");
 
 
 
var connect = async(email,pass)=>{
	const { resources } = await container.items
  	.query({
  		query: "SELECT * from Login where Login.email=@email and Login.password=@pass",
  		parameters:[{name:"@email", value:email},
  					{name:"@pass", value:pass}]
  		})
  	.fetchAll();
  	 
  	if(resources[0] != undefined)return true;
  	return false;
}

var register = async(email,pass)=>{
	
	const { resources } = await container.items
  	.query({
  		query: "SELECT * from Login where Login.email=@email",
  		parameters:[{name:"@email", value:email}]
  		})
  	.fetchAll();
  	if(resources[0] != undefined) return false;
	 
	const client =  { email: email, password:pass};
	await container.items.create(client)
	 
	var created = await connect(email,pass); 
  	if(created)return true;
  	return false;
}

var getUserId = async(email, pass)=>{
	const { resources } = await container.items
  	.query({
  		query: "SELECT * from Login where Login.email=@email and Login.password=@pass",
  		parameters:[{name:"@email", value:email},
  					{name:"@pass", value:pass}]
  		})
  	.fetchAll();
  	console.log("user id"+resources[0].id);
  	return resources[0].id;
}

var addTask = async(desc, user_id)=>{
	const { resources } = await container2.items
  	.query({
  		query: "SELECT * from Todo where Todo.description=@description and Todo.owner=@userid",
  		parameters:[{name:"@description", value:desc},
  					{name:"@userid", value:user_id}]
  		})
  	.fetchAll();

  	if(resources[0]!= undefined) return false;
	 
	const task =  { description: desc, owner:user_id, checked:false};
	await container2.items.create(task);
	 
  	return true; 	 
}

var loadTasks = async(user_id)=>{
	
	var tasks = [];
	const { resources } = await container2.items
  	.query({
  		query: "SELECT * from Todo where Todo.owner=@userid",
  		parameters:[{name:"@userid", value:user_id}]
  		})
  	.fetchAll();
  	for(let i=0; i<resources.length; i++){
  		tasks.push({description: resources[i].description, checked: resources[i].checked, id: resources[i].id });
  	}

  	return tasks;	 
}

var checkTask = async(check, desc, userid)=>{
	console.log("receive:"+check+" "+desc+" "+userid);


	const { resources } = await container2.items
  	.query({
  		query: "SELECT * from Todo where Todo.description=@desc and Todo.owner=@userid",
  		parameters:[{name:"@desc", value:desc},
  					{name:"@userid", value:userid}]
  		})
  	.fetchAll();


  console.log(resources[0].id +" "+ resources[0].description+" val"+resources[0].checked);
	 
	//const { id } = resources[0].id;
	if(check == "true"){
		resources[0].checked = true;
	}
	else
		resources[0].checked = false;
	

	const { resource: updatedItem } = await container2
 	 .item(resources[0].id)
  	 .replace(resources[0]);
  	 return true;
}


var deleteTask = async(desc, userid)=>{
	 
	const { resources } = await container2.items
  	.query({
  		query: "SELECT * from Todo where Todo.description=@desc and Todo.owner=@userid",
  		parameters:[{name:"@desc", value:desc},
  					{name:"@userid", value:userid}]
  		})
  	.fetchAll();

	const { resource: updatedItem } = await container2
 	 .item(resources[0].id)
  	 .delete();
  	 return true;
}

 module.exports={
 	connect:connect,
 	register:register,
 	getUserId: getUserId,
 	addTask: addTask,
 	loadTasks: loadTasks,
 	checkTask: checkTask,
 	deleteTask: deleteTask
 }

 