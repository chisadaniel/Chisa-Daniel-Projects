
var tasks = [];


function sortTasks() {
  
  for(var i=0;i<tasks.length-1;i++){
  	var first = tasks[i].description.toLowerCase().charCodeAt(0);
    for(var j =i+1; j<tasks.length; j++){
      var second = tasks[j].description.toLowerCase().charCodeAt(0);
      
      if(first >=second){
        
          var aux = tasks[i];
          tasks[i] = tasks[j];
          tasks[j] = aux;
          first = tasks[i].description.toLowerCase().charCodeAt(0);
         
      }
      
    }
  }
}



 async function addTask(){
 	document.getElementById("status").innerHTML = "";
 	var input = document.getElementById("task_desc").value;
 	if(input == "")return;
 	document.getElementById("task_desc").value=""; 
	await $.post("/addTask",
            { description: input })
        .done(function() {
           document.getElementById("status").innerHTML = "Task created!";
           document.getElementById("status").style.color = "green";

        })
        .fail(function(jqxhr, settings, ex) { 
             document.getElementById("status").innerHTML = "Task already exists!";
             document.getElementById("status").style.color="red";
             return;
        });	
   await loadTasks();

 }

 document.getElementById("task_desc").addEventListener('click',function(){
 	document.getElementById("task_desc").value="";
 });

var checked=[];

async function createTasks(){
	
	console.log("constructing tasks...");
	var place = document.getElementById("taskSpace");
	for(let i=0; i<tasks.length;i++){
		console.log("add"+ tasks[i].description+tasks[i].checked);
		
    	var div = document.createElement("DIV");
    	div.style.textAlign="left";
    	div.style.marginLeft="20px";
    	var button = document.createElement("BUTTON");
    	 
    	button.className="checkBtn";
    	button.textDecoration="none";
    	var label = document.createElement("LABEL");

    	//storage for check/ uncheck images
    	button.id=i.toString();
    	if(tasks[i].checked){
	    	checked[i]=true;
	    	button.style.backgroundImage="url('https://tasksstorage2020.blob.core.windows.net/images/check.png')"; /// /check.png
	    	button.style.backgroundSize="40px 40px";
	    	label.style.color="black";

    	}
    	else{
    		checked[i]=false;
    		button.style.backgroundImage="url('https://tasksstorage2020.blob.core.windows.net/images/uncheck.png')";
    		button.style.backgroundSize="40px 40px";
    	}

    	var del = document.createElement("BUTTON");
    	del.className="checkBtn";
    	del.style.backgroundImage="url('https://tasksstorage2020.blob.core.windows.net/images/delete.png')"; 
	    del.style.backgroundSize="40px 40px";
	    del.id=i.toString();
	    del.onclick=async function(){
	    	await $.post("/deleteTask",{
    				 desc:tasks[parseInt(this.id,10)].description
    				})
			        .done(function() {
			        	 loadTasks();
			        });	         
	    }


    	button.onclick=async function(){
    			if(checked[parseInt(this.id,10)]){
    				var c="false";
    				await $.post("/checkTask",{
    					check:c, desc:tasks[parseInt(this.id,10)].description
    				})
			        .done(function() {
    					checked[parseInt(this.id,10)]=false;
			        });
			          loadTasks();
			        
    			}
    			else{
    				var d = "true";
    				await $.post("/checkTask",{
    					check:d, desc:tasks[parseInt(this.id,10)].description
    				})
			        .done(function() {
    				checked[parseInt(this.id,10)]=true;
    				});
    				  loadTasks();
    				
    			}
    	}

    	div.className="task";
    	
    	label.for = i.toString();
    	label.innerHTML=tasks[i].description.toUpperCase();
    	label.style.marginLeft="20px";
    	div.appendChild(del);
    	div.appendChild(button);
    	div.appendChild(label);
    	place.appendChild(div);
    	console.log("end  iter ");
    }    

}


async function loadTasks(){
	tasks =[];
	checked = [];
	await $.post("/loadTasks")
        .done(task_list => {
        	for(let i=0;i<task_list.length; i++)
        		tasks[i]=task_list[i];
        });
    console.log("tasks loaded");
    document.getElementById("taskSpace").innerHTML="";
    await sortTasks();
    await createTasks();
}


loadTasks();