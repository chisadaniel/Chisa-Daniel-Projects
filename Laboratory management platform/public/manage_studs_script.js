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

//SEARCH



var laboratories = [];
var finalSituation ;
function sortLaboratories() {
  
  for(var i=0;i<laboratories.length-1;i++){
  var first = laboratories[i].name.toLowerCase().charCodeAt(0);
    for(var j =i+1; j<laboratories.length; j++){
      var second = laboratories[j].name.toLowerCase().charCodeAt(0);
      
      if(first >second){
        //swap students names
          var aux = laboratories[i];
          laboratories[i] = laboratories[j];
          laboratories[j] = aux;
          first = laboratories[i].name.toLowerCase().charCodeAt(0);
         
      }
      
    }
  }
}

var currentShown;

function makeLabs(){

	var wrapper = document.getElementById("labsSpace");
	wrapper.className="middle";
	for( let i=0; i<laboratories.length; i++){
		var div = document.createElement("DIV");
		var div2 = document.createElement("DIV");
		div2.id="dd"+i.toString();

		div2.className="laboratorySpace";

		div.id = "d"+i.toString();
		var p = document.createElement("P");
		p.id = i.toString();
		var arrow = document.createElement("i");

		arrow.className="down";
		p.appendChild(arrow);
		p.innerHTML += laboratories[i].name.toUpperCase();
		p.style.cursor="pointer";
		p.style.backgroundColor="#FFD662";
		 
		 
		div.appendChild(p);
		div.appendChild(div2);
		wrapper.appendChild(div);
		p.addEventListener('click',async function(){

			if(currentShown == parseInt(this.id,10)){
				var d = document.getElementById("dd"+this.id);
				if(d.innerHTML != ""){d.innerHTML="";}
				currentShown = -1;
				return;
			}
			else{
				for(let j=0;j<laboratories.length;j++)
				{
				var d = document.getElementById("dd"+j.toString());
				if(d.innerHTML != ""){d.innerHTML="";}
				}
			}
			
			console.log("pressed"+this.id);
			try{await getStudentFinalGrades(parseInt(this.id,10));}
			catch(e){
				console.log(e);
				finalSituation = undefined;
			}
			getInfosForLab("dd"+this.id,parseInt(this.id,10));
			currentShown = parseInt(this.id,10);

		});
		

	}

}

async function getStudentFinalGrades(index){
	await $.post("/get_student_final_grades_manage",{
		code:laboratories[index].code
	}).done(situation => {
        if(situation == undefined) return;
       	finalSituation = situation; 
       	console.log(finalSituation.midterm+ finalSituation.extra_points+finalSituation.final_exam);
    })
    .fail(()=>{
    	console.log("fails")
    });
}

async function  load_labs() {
    var arr=[];
   await $.post("/labs_load_for_student").done(labs_list => {
        if(!labs_list) return;
        for(var i=0; i<labs_list.length;i++){        
        laboratories[i] =  labs_list[i];
        console.log("lecture name:"+laboratories[i].name+" "+laboratories[i].code);
        }  
    })
   await sortLaboratories();
   console.log("here labora"+laboratories);
   makeLabs();
}
//LOAD LABS 
load_labs();

 

var laboratoryData = [];
var currentLabName;


async function getInfosForLab(divId, index){
	var labName = $("#myInput").val();
	currentLabName = labName;
	$.post("/load_laboratory_infos_for_name",
		{lab:laboratories[index].code})
	.done(infos => {
        if(!infos) return;
     
    	   
    	   var attendences = 0;
    	   var points = 0;
		   var div = document.getElementById(divId);//laboratorySpace
		   div.style.width="100%";
		   //div.innerHTML="";
		   var table= document.createElement("TABLE");
		        
		   table.id="studentsTable";
		   table.align="center";
		   table.width="100%";
		   table.fontSize="1.5em";
		    

		   div.appendChild(table);
		   var row = table.insertRow(0);
		   var cell1 = row.insertCell(0);
		   var cell2 = row.insertCell(1);
		   var cell3  = row.insertCell(2);
		   cell2.style.borderLeft = "1px solid black";
		   cell3.style.borderLeft = "1px solid black";
		    

		   cell1.innerHTML = "WEEK";
		   cell2.innerHTML = "ATTENDENCE";
		   cell3.innerHTML = "POINTS";
		   cell1.style.width = "50%";
		   cell2.style.width = "25%";
		   cell3.style.width = "25%";

		   document.getElementById("studentsTable").rows[0].style.backgroundColor="#E08119";
		   document.getElementById("studentsTable").rows[0].style.borderBottom="1px solid black";
		   

		   for (var i = 0; i < infos.length; i++) {

		   	if(infos[i].attendence != undefined){
		   		attendences += 1;
		   	}
		   	if(parseInt(infos[i].grade,10)>0){
		   		points += parseInt(infos[i].grade,10); 
		   	}
		                     
		              
		    row = table.insertRow(i+1);
		    document.getElementById("studentsTable").rows[i+1].style.backgroundColor="#F5D6C6";

		    document.getElementById("studentsTable").rows[i+1].style.borderBottom="1px solid black";

		    cell1 = row.insertCell(0);
		    cell2 = row.insertCell(1);
		    cell3 = row.insertCell(2);
		    //cell4 = row.insertCell(3);
		    

		    cell1.innerHTML = "#"+infos[i].week_number;  
		    cell2.innerHTML = infos[i].attendence.toUpperCase();
		    if(infos[i].grade == ""){
		    	cell3.innerHTML = "0";
		    }
		    else cell3.innerHTML = infos[i].grade;
		    

		    document.getElementById("studentsTable").rows[i+1].cells[0].style.width="50%";
		    document.getElementById("studentsTable").rows[i+1].cells[1].style.width="25%";
		    
		    document.getElementById("studentsTable").rows[i+1].cells[2].style.width="25%";

		  
			}

			 
			row = table.insertRow(infos.length+1);
			row.style.backgroundColor="#F5D6C6";
			
			cell1 = row.insertCell(0);
		    cell2 = row.insertCell(1);
		    cell3 = row.insertCell(2);
		    cell1.innerHTML = "BONUS POINTS";
		    cell2.innerHTML = "";
		    if( finalSituation.extra_points != undefined)
		    	cell3.innerHTML = finalSituation.extra_points;
		    else 
		    	cell3.innerHTML = "NOT YET";


			row = table.insertRow(infos.length+2);
			row.style.backgroundColor="#EFC050";
			row.style.borderTop = "3px solid black";
			cell1 = row.insertCell(0);
		    cell2 = row.insertCell(1);
		    cell3 = row.insertCell(2);
		    cell1.innerHTML = "TOTAL";
		    cell2.innerHTML = attendences.toString();
		    if(  finalSituation.extra_points != undefined )
		    points = points + parseInt(finalSituation.extra_points,10);
		    cell3.innerHTML = points.toString();

		     row = table.insertRow(infos.length+3);
			row.style.backgroundColor="#E08119";
			row.style.borderTop = "3px solid black";
			cell1 = row.insertCell(0);
		    cell2 = row.insertCell(1);
		    cell3 = row.insertCell(2);
		    cell1.innerHTML = "EXAMS";
		 
		    row = table.insertRow(infos.length+4);
			row.style.backgroundColor="#F5D6C6";
			row.style.borderTop = "1px solid black";
			cell1 = row.insertCell(0);
		    cell2 = row.insertCell(1);
		    cell3 = row.insertCell(2);
		    cell1.innerHTML = "MIDTERM EXAM";
		    cell2.innerHTML = "";
		    row.style.borderBottom="1px solid black";
		    if( finalSituation.midterm != undefined)
		    	cell3.innerHTML = finalSituation.midterm;
		    else 
		    	cell3.innerHTML = "NOT YET";

		    row = table.insertRow(infos.length+5);
			row.style.backgroundColor="#F5D6C6";
			cell1 = row.insertCell(0);
		    cell2 = row.insertCell(1);
		    cell3 = row.insertCell(2);
		    cell1.innerHTML = "FINAL EXAM";
		    cell2.innerHTML = "";
		    if(finalSituation.final_exam != undefined)
		    	cell3.innerHTML = finalSituation.final_exam;
			else
				cell3.innerHTML = "NOT YET";
    })
}


 
