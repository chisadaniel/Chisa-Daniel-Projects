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
var lectureCode;
var group;
var existsLectureCode=true;
var existsLaboratoryForThisGroup=true;

//CREATE LAB
async function createLab(){
  labname = $("#labName").val().toUpperCase();
  if(labname == ""){
    document.getElementById("respond").innerHTML = "Please enter the name of laboratory!";
            document.getElementById("respond").style.color = "red";
    return;
  }
  group = $("#group").val().toUpperCase();
  if(group == ""){
    document.getElementById("respond").innerHTML = "Please enter the group!";
            document.getElementById("respond").style.color = "red";
    return;
  }
  lectureCode = $("#lectureCode").val().toUpperCase();
  if(lectureCode == ""){
    document.getElementById("respond").innerHTML = "Please enter the lecture code!";
            document.getElementById("respond").style.color = "red";
    return;
  }
  console.log("pas1");
  //check if current lecture code is valid
  await $.post("/check_for_lecture_code",
    { code: lectureCode }) 
  .done(function() {existsLectureCode=false;})
  .fail(function(jqxhr, settings, ex) {
        existsLectureCode=true;
        document.getElementById("respond").innerHTML = "This lecture code does not belong to any lectures! Contact the owner of lecture!";
            document.getElementById("respond").style.color = "red";
    });
  if(existsLectureCode)return;
  console.log("pas2");
  //check if already not exists a lab for this group
  await $.post("/check_for_existing_lab",
    { code: lectureCode, labGroup:group }, 
        function(data, status, xhr) {
          console.log("status at return"+data+status+xhr);

          if(status==="success"){
             existsLaboratoryForThisGroup=false;
          }
          else if(status ==="cant"){
            document.getElementById("respond").innerHTML = "Can't create...";
            document.getElementById("respond").style.color = "red";
          }
        })
  .done(function() {})
  .fail(function(jqxhr, settings, ex) {
      document.getElementById("respond").innerHTML = "Already exists an laboratory for this group!";
      document.getElementById("respond").style.color = "red";
      existsLaboratoryForThisGroup = true;
  });

  console.log("pas3");
if(existsLaboratoryForThisGroup)return;
  console.log("pas4");
 console.log("ajung la cl");
  $.post("/create_lab",
    { myData: $("#labName").val(), code:lectureCode, lgroup: group }, 
        function(data, status, xhr) {
          console.log("status at return"+data+status+xhr);

          if(status==="success"){
            document.getElementById("respond").innerHTML = "Laboratory created! Now you can start sessions for this lab!";
            document.getElementById("respond").style.color = "green";
          }
          else if(status ==="cant"){
            document.getElementById("respond").innerHTML = "Can't create...";
            document.getElementById("respond").style.color = "red";
          }
        })
  .done(function() {/* alert('Request done!');*/ })
  .fail(function(jqxhr, settings, ex) { 
             document.getElementById("respond").innerHTML = "Can't create, this laboratory already exists!";
            document.getElementById("respond").style.color = "red"; }
            );

}

async function getName(){
    console.log("apelez getnume");
    await $.post("/get_lecture_name",{code:$("#lectureCode").val().toUpperCase()})
          .done(result  => {
                console.log("here"+result.r);
                if(!result) return;
                if(result.r == undefined)return;
                document.getElementById("lectureName").value = result.r;               
          })
          .fail(()=>{
            console.log("fail");
          })


} 
