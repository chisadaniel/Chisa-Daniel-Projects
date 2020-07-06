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

var labname;
var acronym;
var code;

//CREATE LAB
async function createLab(){
  labname = $("#labName").val().toUpperCase();
  if(labname == ""){
    document.getElementById("respond").innerHTML = "Please enter the name of laboratory!";
            document.getElementById("respond").style.color = "red";
    return;
  }
  acronym = $("#lectureAcronym").val().toUpperCase();
  if(acronym == ""){
    document.getElementById("respond").innerHTML = "Please enter the acronym!";
            document.getElementById("respond").style.color = "red";
    return;
  }
  code = document.getElementById("lectureCode").value;
  $.post("/create_lecture",
    { myData: labname, acro: acronym, code:code }, 
       async function(data, status, xhr) {
          console.log("status at return"+data+status+xhr);

          if(status==="success"){
            document.getElementById("lectureCode").value = code;
            document.getElementById("respond").innerHTML = "Lecture created! Provide this generated code needed for laboratory creation!";
            document.getElementById("respond").style.color = "green";

          }
          else if(status ==="cant"){
            document.getElementById("respond").innerHTML = "Can't create...";
            document.getElementById("respond").style.color = "red";
          }
        })
  .done(function() {/* alert('Request done!');*/ })
  .fail(function(jqxhr, settings, ex) { 
             document.getElementById("respond").innerHTML = "Can't create, this lecture already exists!";
            document.getElementById("respond").style.color = "red"; }
            );

}

function generateCode() {
  let r="";
  var max=9;
  r=r+Math.floor(Math.random() * Math.floor(max)).toString();
  r=r+Math.floor(Math.random() * Math.floor(max)).toString();
  return $("#lectureAcronym").val().toUpperCase()+"_"+r;
}

function getCode(){
  var codeBox = document.getElementById("lectureCode");
  if( $("#lectureAcronym").val().toUpperCase()=="")codeBox.value="";
  else
    codeBox.value = generateCode();
}