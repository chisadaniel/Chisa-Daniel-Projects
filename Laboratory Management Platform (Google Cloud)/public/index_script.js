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



var currentLabName="";
var currentCode="";
var showFlag= 0;


async function  showStudentStatusLab(){

  var arr=[];
   await $.post("/get_student_status",
      { myLab: currentLabName, myCode: currentCode})
    .done(labs_list => {
        if(!labs_list) return;
        arr = [];
        arr = arr.concat(labs_list);

        console.log("student status:"+arr); 
        var tableTitle = document.getElementById("studStatus");
        tableTitle.innerHTML=" WEEK #"+arr[2]+"<br>"+currentLabName.toUpperCase()+"<br> ATTENDANCE:  <span style=\"color:green;\">"+arr[0].toUpperCase() + "</span>, GRADE: "+arr[1];
        tableTitle.style.backgroundColor="#E08119";
         tableTitle.style.margin="0";
         
         tableTitle.style.border="1px solid black";
         tableTitle.style.fontSize ="1.1em";
         tableTitle.style.padding="1%";
        //return arr;
    });

}



function attendToLab(){
  if($("#myInput").val()==""){
    document.getElementById("attendStatus").innerHTML = "Please enter the name of laboratory!";
    document.getElementById("attendStatus").style.color = "red"; 
    return;
  }
  if($("#labCode").val()==""){
    document.getElementById("attendStatus").innerHTML = "Please enter the attendence code!";
    document.getElementById("attendStatus").style.color = "red"; 
    return;
  }
  
$.post("/attend_to_lab",
    { myLab: $("#myInput").val(), myCode: $("#labCode").val() }, 
        function(data, status, xhr) {
          console.log("status at return"+data+status+xhr);

          if(status==="success"){
              document.getElementById("attendStatus").innerHTML = "Attendence done!";
              document.getElementById("attendStatus").style.color = "green";
              document.getElementById("refreshBtn").style.display="";
              currentLabName = $("#myInput").val();
              currentCode = $("#labCode").val();
              showStudentStatusLab();
          }
          else if(status ==="cant"){
            //document.getElementById("respond").innerHTML = "Can't create...";
            //document.getElementById("respond").style.color = "red";
          }
        })
  .done(function() {/* alert('Request done!');*/ })
  .fail(function(data) {  
              console.log(data.status);
               
            if(data.status===409){
             document.getElementById("attendStatus").innerHTML = "You are already registered to this laboratory!";
             document.getElementById("attendStatus").style.color = "green"; 
             currentLabName = $("#myInput").val();
             currentCode = $("#labCode").val();
             document.getElementById("refreshBtn").style.display="";
             showStudentStatusLab();
            }
            if(data.status ===406){
             document.getElementById("attendStatus").innerHTML = "Wrong attendence code!";
             document.getElementById("attendStatus").style.color = "red"; 
            }
            if(data.status ===506){
             document.getElementById("attendStatus").innerHTML = "Cant attend to this lab anymore!";
             document.getElementById("attendStatus").style.color = "red"; 
            }


          }
        );
 } 


document.getElementById("refreshBtn").addEventListener('click',function(){
  showStudentStatusLab();
});


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
function  load_labs() {
    var arr=[];
    $.post("/labs_load").done(labs_list => {
        if(!labs_list) return;

        arr = countries.concat(labs_list);
        autocomplete(document.getElementById("myInput"), arr);
        console.log("ins"+arr);     
        return arr;
    })
}
//LOAD LABS 
load_labs();


