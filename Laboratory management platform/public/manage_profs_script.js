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

function clearInput(){
	document.getElementById("myInput").value="";
	document.getElementById("studentsList").innerHTML="";
  document.getElementById("searchStudentInput").style.display="none";
}


var arra=[];
var selectedBoxOn = false;
var lectureCode;

function autocomplete2(){
  var inp = document.getElementById("myInput");
  var select = document.getElementById("selectBox");
  select.innerHTML ="";
  for(var i=0;i<arra.length;i++){
  var option = document.createElement("P");
        option.innerHTML=arra[i];
        option.id=i;
        option.style.cursor="pointer";
        option.style.backgroundColor="white";
        option.style.margin=0;
        option.style.fontSize="20px";
        if(arra[i]!="")
        option.style.borderBottom="1px solid grey";
        select.appendChild(option);
        option.addEventListener('click',function(){
          inp.value = arra[parseInt(this.id,10)];
          select.style.display="none";
        })
    }
        if(!selectedBoxOn){
          select.style.display="block";
          selectedBoxOn=true;
        }
        else {
          select.style.display="none";
          selectedBoxOn=false;
        }
        
}

//search for student
function searchStudent() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchStudentInput");
  if(input == "")return;
  filter = input.value.toUpperCase();
  table = document.getElementById("studentsTable");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {

        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}






//search for lab



function autocomplete(inp, arr) {
   
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
    
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
    
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
  
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
   
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
  
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

var laboratoryIds=[];
 
function  load_labs() {
    arra=[];
    $.post("/labs_load_profs").done(labs_list => {
        if(!labs_list) return;
        for(var i=0;i<labs_list.length;i++){
          arra[i]=labs_list[i].name;
          laboratoryIds[i] = labs_list[i].lab_id;
        }         
         autocomplete(document.getElementById("myInput"), arra);   
    })
}
//LOAD LABS 
load_labs();


async function getLectureId(laboratory_id){
  await $.post("/get_lecture_code",{
    lab_id:laboratory_id
  }).done(labname => {
          if(!labname) return;
          lectureCode = labname.code;
      });  
}

var currentStudents = [];
var studentIds = [];
var studentGrades = [];
var currentLabName;
var week_number;

async function loadStudentsNames(week_no){
	await $.post("/load_names_per_week",
      { myLab: currentLabName, week_no: week_no})
    .done(labs_list => {
        if(!labs_list) return;
        currentStudents = [];
        currentStudents = currentStudents.concat(labs_list);
    	console.log(currentStudents);
    });

    await $.post("/load_students_ids_per_week",
      { myLab: currentLabName, week_no: week_no})
    .done(labs_list => {
        if(!labs_list) return;
        studentIds = [];
        studentIds = studentIds.concat(labs_list);
    	console.log(studentIds);
    });

     await $.post("/load_students_grades_per_week",
      { myLab: currentLabName, week_no: week_no})
    .done(labs_list => {
        if(!labs_list) return;
        studentGrades = [];
        studentGrades = studentGrades.concat(labs_list);
        console.log(studentGrades);
    });
}


function getGroupAndMatricol(stud_id){
  
  $.post("/load_students_infos_session",
      { student_id: stud_id})
    .done(infos => {
        console.log("grupa"+infos[0]+infos[1]);
        var group = document.getElementById("groupOfSelectedStudent");
        group.innerHTML = "GRUPA: <br>"+infos[1].toUpperCase();
        var id = document.getElementById("idOfSelectedStudent");
        id.innerHTML = "NR MATRICOL:<br>"+infos[0].toUpperCase();
          
    })
    .fail(function(){ 
          var group = document.getElementById("groupOfSelectedStudent");
          group.innerHTML = "GRUPA: <br>"+"NOT SET";
          var id = document.getElementById("idOfSelectedStudent");
          id.innerHTML = "NR MATRICOL:<br>"+"NOT SET";      
    });
}



//Show list of students who attend to lab
function showListOfStudents(){
  document.getElementById("searchStudentInput").style.display="";
  var popupIsOn = false;
  var closePopupPressed = false;
  var removePressed = false;
  var index = 0;
   
   

   var div = document.getElementById("studentsList");
   div.style.marginTop = "1%";
   div.innerHTML="";
   var table= document.createElement("TABLE");
   table.id="studentsTable";
   table.align="center";
   table.width="100%";
   tableTitle = document.createElement("P");
   tableTitle.innerHTML = currentLabName.toUpperCase()+" WEEK #"+week_number.toString();
   tableTitle.style.backgroundColor="#E08119";
   tableTitle.style.margin="0";
   tableTitle.style.borderTop="1px solid black";
   tableTitle.style.borderLeft="1px solid black";
   tableTitle.style.borderRight="1px solid black";
   tableTitle.style.fontSize ="1.1em";
   tableTitle.style.padding="1%";
   div.appendChild(tableTitle);
   div.appendChild(table);
   
   


   var row = table.insertRow(0);

  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3  = row.insertCell(2);
  var cell4 = row.insertCell(3);

  cell1.innerHTML = "STUDENT NAME";
  cell2.innerHTML = "GRADE";
   cell3.innerHTML = "NEW GRADE";
   cell4.innerHTML = "MODIFY";
document.getElementById("studentsTable").rows[0].style.backgroundColor="#E08119";

document.getElementById("studentsTable").rows[0].style.borderBottom="1px solid black";
document.getElementById("studentsTable").rows[0].cells[0].style.width="40%";

  for (var i = 0; i < studentIds.length; i++) {
    var node =document.createElement("SPAN");                 
    var textnode = document.createTextNode("Welcome to"+"grade=0");         // Create a text createTextNode
    node.appendChild(textnode);                              // Append the text to <li>

    var inp = document.createElement("INPUT");
     
    inp.id="i"+i.toString();
     inp.style.width="45%";
    inp.style.height="100%";
    inp.style.fontSize="1em";

    var btn = document.createElement("BUTTON");
    btn.type="button";
     
    btn.style.backgroundColor="#F96714";
    btn.id="b"+i.toString();
    btn.innerHTML="GRADE";
    btn.style.margin="1%";
    btn.style.height="100%";
    btn.style.align="center";
    btn.onclick=function(){

      var inp=document.getElementById("i"+this.id.substr(1,this.id.length));
      var idd = this.id;
      if(inp.value!=""){
        console.log("updatez nota");
         
        document.getElementById("studentsTable").rows[parseInt(this.id.substr(1,this.id.length),10)+1].cells[1].innerHTML=inp.value;
        var id=studentIds[parseInt(this.id.substr(1,this.id.length),10)];
        $.post("/update_grade",{ myLab: currentLabName, myGrade: inp.value, myId: id,  week:week_number,  lec_code: lectureCode })
        .done(function(){
          console.log("inainte update done");
        //recent changed  load_students_grades();
          console.log("update done");
          //document.getElementById("studentsTable").rows[parseInt(idd.substr(1,idd.length),10)+1].cells[1].style.backgroundColor="green";
                  
        });
        inp.value="";  

      }
    }

    

     
    row = table.insertRow(i+1);
    document.getElementById("studentsTable").rows[i+1].style.backgroundColor="#F5D6C6";

    document.getElementById("studentsTable").rows[i+1].style.borderBottom="1px solid black";

    cell1 = row.insertCell(0);

    cell1.className="popup";
    cell1.id=i.toString();
    var span = document.createElement("SPAN");
    span.className = "popuptext";
    span.id = "myPopup";
    
    var closeBtn = document.createElement("BUTTON");
    closeBtn.onclick = async function(){
      console.log("close pressed");
      //span.style.display = "hidden";  

      var popup = document.getElementById("myPopup"); 
      popup.classList.toggle("show");

      popupIsOn = false;   
      closePopupPressed=true; 
      if(removePressed == true){
        await showListOfStudents();
        await showListOfStudents();
        removePressed = false;
      }
    }

    closeBtn.innerHTML = "x";
    closeBtn.style.float = "right";
    closeBtn.style.marginRight = "5%";
    closeBtn.style.backgroundColor="#555"
    
    
    
    var studId = document.createElement("P");
    studId.id ="idOfSelectedStudent";

    var nameStudent = document.createElement("P");
    nameStudent.id= "nameOfSelectedStudent";

    var groupStudent = document.createElement("P");
    groupStudent.id = "groupOfSelectedStudent"; 

    var statusPopup = document.createElement("P");
    statusPopup.id = "statusPopup"; 
    
    var deleteStudent = document.createElement("BUTTON");
    deleteStudent.innerHTML="remove";

    //function for remove a stundent from attendence list
    deleteStudent.addEventListener('click',function(){
      if(removePressed == false){
            console.log("vreau sa elimin studentul cu id "+studentIds[index]);
            $.post("/removeStudent",
              { myLab: currentLabName, student_id: studentIds[index]})
            .done(async function(result) {
              var status = document.getElementById("statusPopup");
              if(result){
              removePressed = true;
              status.innerHTML="Student will be removed.<br>Updates will appear soon!";
              status.style.color = "yellow";  
              //await showListOfStudents();
              //await showListOfStudents();
              }
              else{
                 status.innerHTML="Cannot remove!";
                 status.style.color = "red";
              }

            });
     } 
    });

    span.appendChild(closeBtn);
    span.appendChild(nameStudent);
    span.appendChild(studId);
    span.appendChild(groupStudent);
    span.appendChild(statusPopup);
    span.appendChild(deleteStudent);
    cell1.appendChild(span);


    cell1.addEventListener('click', function(){
    
      if(popupIsOn == false && closePopupPressed ==false){
        index =parseInt(this.id,10);
        getGroupAndMatricol(studentIds[index]);
        var name = document.getElementById("nameOfSelectedStudent");
        name.innerHTML ="  <br>"+ currentStudents[index].toUpperCase();
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
        popupIsOn=true;
      }
      if(closePopupPressed == true){
        closePopupPressed = false;
      }

    });



    cell2 = row.insertCell(1);
    cell3 = row.insertCell(2);
    cell4 = row.insertCell(3);
    cell1.style.textAlign = "left";
    var order_number = i+1;

    var name = document.createElement("P");
    name.innerHTML = order_number.toString()+". "+currentStudents[i].toUpperCase();

    cell1.appendChild(name); 
    cell2.innerHTML = studentGrades[i];
    cell3.appendChild(inp);
    cell4.appendChild(btn);

    document.getElementById("studentsTable").rows[i+1].cells[0].style.width="50%";
    document.getElementById("studentsTable").rows[i+1].cells[1].style.width="5%";
    document.getElementById("studentsTable").rows[i+1].cells[1].style.fontSize="1em";
    document.getElementById("studentsTable").rows[i+1].cells[2].style.width="10%";
    document.getElementById("studentsTable").rows[i+1].cells[3].style.width="35%";
    document.getElementById("studentsTable").rows[i+1].cells[3].style.padding="0";
	}


}


//get lab infos
async function getLabInfos(week_no){
	var status = document.getElementById("status");
	var lab_name = $("#myInput").val();
	if(lab_name == "" ){
	status.innerHTML = "Please choose the laboratory you want infos for";
	status.style.color = "red";
	return;
	}
	else{
  lectureCode=undefined;
  var labID = laboratoryIds[arra.indexOf(currentLabName)];
  if(labID != undefined){
   await getLectureId(labID);
   console.log("HERE LECTUREEEEEEEE CODe"+lectureCode);
  }  
	week_number = week_no;
	currentLabName = lab_name;
	currentStudents = [];
  	studentIds = [];
  	studentGrades = [];
	console.log(week_no);
	status.innerHTML = "";
	await loadStudentsNames(week_no.toString().trim());


	showListOfStudents();

	}
}
