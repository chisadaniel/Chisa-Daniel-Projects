//Notify when new messages appear
async function loadPersons(){
  await $.post("/load_persons_for_messenger")
    .done(persons => {
        if(!persons) return;
        var count = 0
        for(let i in persons){
          if(persons[i].seen ==false)
            count += 1
        }
        if(count != 0){
          document.getElementById("countSeen").style.display = "block"
          document.getElementById("countSeen").innerHTML = count
        }
           
    });
}
setInterval(() => {loadPersons();}, 6000)
loadPersons()


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

var currentStudents = [];
var currentLabName = "";
var currentCode = "";
var currentWeek = "";
var studentIds = [];
var studentGrades = [];
var pseudoGrades = [];
var showFlag= 0;
var existsSession = false;
var i1;
var i2;
var i3;
var i4;
var lectureCode;

function sortStudents() {
  console.log("sorting names");
  for(var i=0;i<currentStudents.length-1;i++){
  var first = currentStudents[i].toLowerCase().charCodeAt(0);
    for(var j =i+1; j<currentStudents.length; j++){
      var second = currentStudents[j].toLowerCase().charCodeAt(0);
      
      if(first >second){
        //swap students names
          var aux = currentStudents[i];
          currentStudents[i] = currentStudents[j];
          currentStudents[j] = aux;
        //swap students ids
          var a = studentIds[i];
          studentIds[i] = studentIds[j];
          studentIds[j]=a;
        //swap students grades
          var a2 = studentGrades[i];
          studentGrades[i] = studentGrades[j];
          studentGrades[j]=a2;
      }
      
    }
  }
}



function showLab(){
  var lab_name = document.getElementById('myInput').value;
  var lab_code = document.getElementById('labCode').value;
  if(lab_name.length !=0 && lab_code.length != 0){
  document.getElementById("labZone").innerHTML = "";
  document.getElementById('myInput').value="";
  document.getElementById('labCode').value="";

  var node = document.createElement("H3");                 // Create a <li> node
  var textnode = document.createTextNode("Welcome to "+lab_name);         // Create a text createTextNode
  node.appendChild(textnode);                              // Append the text to <li>
  document.getElementById("labZone").appendChild(node);
  
  document.getElementById("labZone").style.display = 'block';
  }
 } 



//Function for drop-down options
var selectedBoxOn = false;
var arr=[];
function autocomplete2(){
  var inp = document.getElementById("myInput");
  var select = document.getElementById("selectBox");
  select.innerHTML ="";
  for(var i=0;i<arr.length;i++){
  var option = document.createElement("P");
        option.innerHTML=arr[i];
        option.id=i;
        option.style.cursor="pointer";
        option.style.backgroundColor="white";
        option.style.margin=0;
        option.style.fontSize="20px";
        
        if(arr[i]!="")
        option.style.borderBottom="1px solid grey";
        select.appendChild(option);
        option.addEventListener('click',function(){
          inp.value = arr[parseInt(this.id,10)];
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


//SEARCH 



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

/*An array containing all the country names in the world:*/


/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/



var countries = [];
var laboratoryIds=[];
function  load_labs() {
     arr=[];
     laboratoryIds=[];
    $.post("/labs_load_profs").done(labs_list => {
        if(!labs_list) return;

        //arr = countries.concat(labs_list);
        for(var i=0;i<labs_list.length;i++){
          arr[i]=labs_list[i].name;
          laboratoryIds[i] = labs_list[i].lab_id;
          console.log("lab code"+laboratoryIds[i]);
        }
        autocomplete(document.getElementById("myInput"), arr);
        console.log("ins"+arr);     
        return arr;
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




async function load_students_names(){
     
   await $.post("/load_students_names",
      { myLab: currentLabName})
    .done(labs_list => {
        if(!labs_list) return;
        currentStudents = [];
        currentStudents = currentStudents.concat(labs_list);

        console.log("students names:"+currentStudents); 
        //return arr;
    });

  
   await  $.post("/load_students_ids",
      { myLab: currentLabName})
    .done(labs_list => {
        if(!labs_list) return;
        studentIds = [];
        studentIds = studentIds.concat(labs_list);
        console.log("students:"+studentIds); 
        //return arr;
    });

   await  $.post("/load_students_grades",
      { myLab: currentLabName})
    .done(labs_list => {
        if(!labs_list) return;
        studentGrades = [];
        studentGrades = studentGrades.concat(labs_list);

        console.log("students grades:"+studentGrades); 
        //return arr;
    });

}

var studentProfileUrl;
async function getStudentProfileUrl (stud_id){
  console.log("trimit la srver pt url id ",stud_id)
  studentProfileUrl = undefined
  await $.post("/get_student_url",
      { student_id: stud_id})
    .done(infos => {
          if(infos == undefined){
                   
            return
          }
          studentProfileUrl = infos
          console.log("get url function", studentProfileUrl)
    })
    .catch(err=>{
      console.log("eroare",err)
    })
}

async function getGroupAndMatricol(stud_id){
  try{
 await $.post("/load_students_infos_session",
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

}catch(e){}

}

function  load_students_ids() {

     
   
    
}
function  load_students_grades() {
     
   
}

//<input type="text" id="searchStudentInput" onkeyup="searchStudent()" placeholder="Search for names..">
function searchStudent() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchStudentInput");
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

//Show list of students who attend to lab
async function showListOfStudents(){
  document.getElementById("searchStudentInput").style.display="";
  var popupIsOn = false;
  var closePopupPressed = false;
  var removePressed = false;
  var index = 0;
  console.log("showF");
  load_students_ids();
  load_students_grades();
  await load_students_names();
  //sortStudents();
  console.log("pseude before"+pseudoGrades);
  console.log("inside ids"+studentIds);

   var div = document.getElementById("studentsList");
   div.innerHTML="";
   var table= document.createElement("TABLE");
  // table.border=1;
   table.id="studentsTable";
   table.align="center";
   table.width="100%";
   //construct table title and style
   tableTitle = document.createElement("P");
   tableTitle.innerHTML = currentLabName.toUpperCase()+" WEEK #"+currentWeek.toString();
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

  cell1.innerHTML = "Student Name";
  cell2.innerHTML = "Current Grade";
  cell3.innerHTML = "Enter Grade";
  cell4.innerHTML = "Grade Student";
  document.getElementById("studentsTable").rows[0].style.backgroundColor="#E08119";

  document.getElementById("studentsTable").rows[0].style.borderBottom="1px solid black";
  document.getElementById("studentsTable").rows[0].cells[0].style.width="40%";

  for (var i = 0; i < studentIds.length; i++){
    await getStudentProfileUrl(studentIds[i])
    console.log("studentuuuu id", studentIds[i])
    var node = document.createElement("SPAN");                 
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
    btn.innerHTML="Grade";
    btn.style.margin="1%";
    btn.style.height="100%";
    btn.style.align="center";
    btn.onclick=function(){

      var inp=document.getElementById("i"+this.id.substr(1,this.id.length));
      var idd = this.id;
      if(inp.value!=""){
        console.log("updatez nota");
        pseudoGrades[i] = inp.value;
        document.getElementById("studentsTable").rows[parseInt(this.id.substr(1,this.id.length),10)+1].cells[1].innerHTML=inp.value;
        var id=studentIds[parseInt(this.id.substr(1,this.id.length),10)];
        $.post("/update_grade",{ myLab: currentLabName, myGrade: inp.value, myId: id, week: currentWeek, lec_code: lectureCode })
        .done(function(){
          console.log("inainte update done");
        //recent changed  load_students_grades();
          console.log("update done");
          //document.getElementById("studentsTable").rows[parseInt(idd.substr(1,idd.length),10)+1].cells[1].style.backgroundColor="green";
          pseudoGrades[i]=studentGrades[i];        
        });
        inp.value="";  

      }
    }

    

    console.log("pseudo after"+pseudoGrades);
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
    deleteStudent.addEventListener('click', async function(){
      if(removePressed == false){
            console.log("vreau sa elimin studentul cu id "+studentIds[index]);
           await $.post("/removeStudent",
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


    cell1.addEventListener('click',function(){
    
      console.log("enter popup click on:"+popupIsOn);
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
        console.log("in true");
        closePopupPressed = false;
      }

    });



    cell2 = row.insertCell(1);
    cell3 = row.insertCell(2);
    cell4 = row.insertCell(3);
    cell1.style.textAlign = "left";
    var order_number = i+1;

    //var name = document.createElement("P");
    //name.innerHTML = order_number.toString()+". "+currentStudents[i].toUpperCase();
    var name = document.createElement("div")
    name.style.textAlign = "center"
    var p_img = document.createElement("img")
    p_img.style.margin="0 auto"
    //p_img.style.padding="25px"
    console.log("profile url ffffffffffffffffffffffffff", studentProfileUrl)
    if(studentProfileUrl != undefined){
      p_img.src = studentProfileUrl
      console.log(" url diferit de undefined", p_img.src)
    }
    else{
      p_img.src = '/student.png'
      console.log("url undefined", p_img.src)
    }
    p_img.style.width="70px";
    p_img.style.height="80px";
    p_img.className="studentsProfileClass"
    name.appendChild(p_img)
    var n = document.createElement("p")
    n.innerHTML = order_number.toString()+". "+currentStudents[i].toUpperCase();
    name.appendChild(n)

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



//Start Lab

async function startLab(){

  document.getElementById("labStatus").innerHTML="";
  currentStudents = [];
  studentIds = [];
  studentGrades = [];
  lectureCode=undefined;
 
 
  currentLabName = $("#myInput").val();
  currentWeek = document.getElementById("weekNo").value;
  currentCode = document.getElementById("labCode").value;
  var week = parseInt(currentWeek,10);
  if(week < 1 || week > 14){
    document.getElementById("labStatus").innerHTML = "Please select a week number between 1 and 14!";
    document.getElementById("labStatus").style.color = "red";
    return;
  }

  if(currentLabName === "" || currentWeek === "" || currentCode === ""){
    document.getElementById("labStatus").innerHTML = "Please complete all laboratory fields before start!";
    document.getElementById("labStatus").style.color = "red";
    return;
  }

  var labID = laboratoryIds[arr.indexOf(currentLabName)];
  if(labID != undefined){
   await getLectureId(labID);
   console.log("HERE LECTUREEEEEEEE CODe"+lectureCode);
 }
   i1 = setInterval(load_students_grades, 60000);
  i2 = setInterval(load_students_ids, 60000);
  i3 = setInterval(showListOfStudents,60000);
  i4 = setInterval(load_students_names,60000);
  existsSession = true;
  setCookie("slab",currentLabName,1);
  setCookie("scode",currentCode,1);
  setCookie("sweek",currentWeek,1);
  $.post("/insert_starting_data_lab",
    { myLab: $("#myInput").val(), myCode: $("#labCode").val(), myWeek: $("#weekNo").val() }, 
        function(data, status, xhr) {
          console.log("status at return"+data+status+xhr);

          if(status==="success"){

              document.getElementById("labStatus").innerHTML = "Session started! Searching for students...";
              document.getElementById("labStatus").style.fontSize = "1.5em";
              document.getElementById("labStatus").style.color = "green";
              document.getElementById("refreshBtn").style.display="";
               
              document.getElementById("loadCircle").style.display = "";
              showListOfStudents();
          }
          else if(status ==="cant"){
            //document.getElementById("respond").innerHTML = "Can't create...";
            //document.getElementById("respond").style.color = "red";
          }
        })
  .done(function() {/* alert('Request done!');*/ })
  .fail(function(jqxhr, settings, ex) { 
             document.getElementById("labStatus").innerHTML = "Sorry, can't start the session!";
             document.getElementById("labStatus").style.fontSize = "1.5em";
             document.getElementById("labStatus").style.color = "red"; 
          }
            );
}

function stopLab(){
  setCookie("slab","",1);
  setCookie("scode","",1);
  setCookie("sweek","",1);
  document.getElementById("labStatus").innerHTML="";
  if(!existsSession){
    document.getElementById("labStatus").innerHTML="There is no laboratory session to be stopped!";
    document.getElementById("labStatus").style.color = "red";
    return;
  }
  load_students_grades();
  load_students_ids();
  clearInterval(i1);
  clearInterval(i2);
  clearInterval(i3);
  clearInterval(i4);
  document.getElementById("loadCircle").style.display = "none";
  $.post("/stop_lab_attendence",
    { myLab: currentLabName, myCode: currentCode, myWeek: currentWeek }, 
        function(data, status, xhr) {
          console.log("status at return"+data+status+xhr);

          if(status==="success"){
              document.getElementById("labStatus").innerHTML = "Session stopped, students can't attend now!";
              document.getElementById("labStatus").style.fontSize = "1.5em";
              document.getElementById("labStatus").style.color = "red";
             
             // showListOfStudents();
              
          }
        })
  .done(function() {/* alert('Request done!');*/ })
  .fail(function(jqxhr, settings, ex) { 
             document.getElementById("labStatus").innerHTML = "Sorry, can't stop the session!";
             document.getElementById("labStatus").style.fontSize = "1.5em";
             document.getElementById("labStatus").style.color = "red"; 
          }
            );
  //currentLabName = "";
  //currentCode = "";
  //currentWeek = "";
}


// let r = Math.random().toString(12).substring(4);
//console.log("random", r);
function generateCode() {

let r="";
var max=9;
r=r+Math.floor(Math.random() * Math.floor(max)).toString();
r=r+Math.floor(Math.random() * Math.floor(max)).toString();
r=r+Math.floor(Math.random() * Math.floor(max)).toString();
r=r+Math.floor(Math.random() * Math.floor(max)).toString();
r=r+Math.floor(Math.random() * Math.floor(max)).toString();
document.getElementById("labCode").value = r;
}


var refreshBtn = document.getElementById("refreshBtn");
refreshBtn.addEventListener('click', function(){showListOfStudents();}); 

//console.log(generateCode());

function clearInput(){
  document.getElementById("myInput").value = "";
}


function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


if (sessionStorage.getItem("is_reloaded")){ 
  var slab = getCookie("slab");
  var scode = getCookie("scode");
  var sweek = getCookie("sweek"); 
  if(slab !=""){
  document.getElementById("myInput").value = slab;
  document.getElementById("weekNo").value = sweek;
  document.getElementById("labCode").value = scode;
  startLab();
  }
}
sessionStorage.setItem("is_reloaded", true); 

var slab = getCookie("slab");
  var scode = getCookie("scode");
  var sweek = getCookie("sweek"); 
  if(slab !=""){
  document.getElementById("myInput").value = slab;
  document.getElementById("weekNo").value = sweek;
  document.getElementById("labCode").value = scode;
  startLab();
  }