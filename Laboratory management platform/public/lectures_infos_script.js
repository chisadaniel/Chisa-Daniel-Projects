//MENU 
var openMenu = false;
function openNav() {
  if(!openMenu){
	  document.getElementById("mySidenav").style.width = "250px";
	  document.getElementById("main").style.marginLeft = "250px";
	  openMenu = true;
  }
  else{
  	closeNav();
  	openMenu = false;
  }
}

function closeNav() {
  openMenu = false;
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  
}

//inside main menu
var profMenuOn =false;
var teacherBtn = document.getElementById("teacherBtn");
teacherBtn.addEventListener('click', function(){
	var profSection = document.getElementById("profSection");
	if(!profMenuOn){
		profSection.style.display=""; 
		profMenuOn = true;
	}
	else{
		profSection.style.display="none"; 
		profMenuOn = false;
	}
});

var ownMenuOn =false;
var ownBtn = document.getElementById("ownerBtn");
ownBtn.addEventListener('click', function(){
	var ownSection = document.getElementById("ownSection");
	if(!ownMenuOn){
		ownSection.style.display=""; 
		ownMenuOn = true;
	}
	else{
		ownSection.style.display="none"; 
		ownMenuOn = false;
	}
});


//search for lab drop-down
var lab_name;
var arra=[];
var selectedBoxOn = false;
 


async function getLabNameById(laboratory_id){
	var laboratoryName;
	await $.post("/get_lab_name_by_id",{
		lab_id:laboratory_id
	}).done(labname => {
	        if(!labname) return;
	        laboratoryName = labname.name;
	    });
	return laboratoryName;   
}


var lecturesIds=[];

 //LOAD Lectures 
async function  load_labs() {
    arra=[];
  await $.post("/lectures_load_profs").done(labs_list => {
        if(!labs_list) return;
        for(var i=0;i<labs_list.length;i++){   	
        	arra[i]=labs_list[i].name;
        	lecturesIds[i]=labs_list[i].id;
        	console.log("HERE IS THE LECTURE "+lecturesIds[i]);
    	} 
    })   
  await getLabInfos();
}
load_labs();
 

//load labs infos for one certain lecture
var labs_infos=[];
async function loadLabsInfos(index){
	labs_infos =[];
	 await $.post("/load_labs_infos_for_lectures",{
	 	lab_id:lecturesIds[index]
	 }).done(labs => {
        if(!labs) return;
        for(var i=0;i<labs.length;i++){   	
        	labs_infos[i] = labs[i];
        	
    	}         
    })   
}


//dynamic construct of table
async  function constructTable2(){
   
   
   var div = document.getElementById("studentsList");
   div.style.marginTop = "1%";
   div.innerHTML="";
   var table= document.createElement("TABLE");
   table.id="studentsTable";
   table.align="center";
   table.width="100%";
   div.appendChild(table);

   for(var i=0;i<arra.length;i++){
   	   var ttr = document.createElement("TR");
	   var tableTitle = document.createElement("TD");
	   tableTitle.innerHTML = arra[i].toUpperCase() + " #CODE: "+lecturesIds[i];
	   tableTitle.style.backgroundColor="#E08119";
	   tableTitle.style.margin="0";
	   tableTitle.style.borderTop="1px solid black";
	   tableTitle.style.borderLeft="1px solid black";
	   tableTitle.style.borderRight="1px solid black";
	   tableTitle.style.borderBottom="1px solid black";
	   tableTitle.style.fontSize ="1.1em";
	   tableTitle.style.padding="1%";
	   tableTitle.colSpan="3";
	   ttr.appendChild(tableTitle);
	   table.appendChild(ttr);
   
   	  var row = document.createElement("TR");
	  var cell1 = document.createElement("TD");
	  var cell2 = document.createElement("TD");
	  var cell3  = document.createElement("TD");   
	  cell1.innerHTML = "LABORATORY NAME";
	  cell2.innerHTML = "OWNER";
	  cell3.innerHTML = "STUDENTS GROUP";
	  row.appendChild(cell1);
	  row.appendChild(cell2);
	  row.appendChild(cell3);
	  table.appendChild(row);
	   
	  row.style.backgroundColor="#E08119";
	  row.style.borderBottom="1px solid black";

	  await loadLabsInfos(i);
		for(var j=0; j<labs_infos.length; j++){
		  row = document.createElement("TR");
		  cell1 = document.createElement("TD");
	  	  cell2 = document.createElement("TD");
	  	  cell3  = document.createElement("TD");
		  cell1.innerHTML = labs_infos[j].laboratory_name;
		  cell2.innerHTML = labs_infos[j].name;
		  cell3.innerHTML = labs_infos[j].group; 

		  row.appendChild(cell1);
		  row.appendChild(cell2);
		  row.appendChild(cell3); 
		  row.style.borderBottom="1px solid black";
		  table.appendChild(row);
		}
	}
}






async function getLabInfos(){
	await constructTable2();
	document.getElementById("loadCircle").style.display="none";
}


 


   