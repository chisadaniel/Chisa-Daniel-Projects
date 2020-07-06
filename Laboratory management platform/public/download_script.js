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

//search bar
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


 //LOAD LABS 
function  load_labs() {
    arra=[];
    $.post("/labs_load_profs").done(labs_list => {
        if(!labs_list) return;
       for(var i=0;i<labs_list.length;i++){
          arra[i]=labs_list[i].name;
        }      
         autocomplete(document.getElementById("myInput"), arra);   
    })
}
load_labs();

var currentStudents = [];
var studentIds = [];
var studentGrades = [];
var currentLabName;
var week_number;

//load students informations
async function loadStudents(lab_name){
	await $.post("/load_students_profile_per_semester",
      { myLab: lab_name})
    .done(students_list => {
        if(!students_list) return;
        
        for(let i=0; i<students_list.length;i++){
        	currentStudents[i] = students_list[i];
        	console.log(students_list[i].firstname +" "+ students_list[i].lastname );
        	console.log(students_list[i]);
        }
    });   
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



//dynamic construct of table
async  function constructTable(){
	document.getElementById("searchStudentInput").style.display="";
   var ttr=document.createElement("TR");
   var div = document.getElementById("studentsList");
   div.style.marginTop = "1%";
   div.innerHTML="";
   var table= document.createElement("TABLE");
   table.id="studentsTable";
   table.align="center";
   table.width="100%";
   tableTitle = document.createElement("TD");
   tableTitle.id="title";
   tableTitle.innerHTML = currentLabName.toUpperCase();
   tableTitle.style.backgroundColor="#E08119";
   tableTitle.style.margin="0";
   tableTitle.style.borderTop="1px solid black";
   tableTitle.style.borderLeft="1px solid black";
   tableTitle.style.borderRight="1px solid black";
   tableTitle.style.borderBottom="1px solid black";
   tableTitle.style.fontSize ="1.1em";
   tableTitle.style.padding="1%";
   //div.appendChild(tableTitle);
   div.appendChild(table);
   tableTitle.colSpan="33";
   ttr.appendChild(tableTitle);
   table.appendChild(ttr);
   
   	  var row = document.createElement("TR");

	  var cell1 = document.createElement("TD");
	  var cell2 = document.createElement("TD");
	  var cell3  = document.createElement("TD");
	   

	  cell1.innerHTML = "STUDENT";
	  cell2.innerHTML = "WEEK NO";
	  cell3.innerHTML = "TOTAL";
	  cell1.colSpan = "3"; 
	  //cell1.width="20%";
	  //cell2.width="90%";
	  //cell3.width="20%";
	  cell2.colSpan = "28";
	  cell3.colSpan = "2";
	    
	  row.appendChild(cell1);
	  row.appendChild(cell2);
	  row.appendChild(cell3);

	  table.appendChild(row);
	   
	  row.style.backgroundColor="#E08119";
	  row.style.borderBottom="1px solid black";

	  row = document.createElement("TR");
	  cell1 = document.createElement("TD");
	  cell2 = document.createElement("TD");
	  cell3 = document.createElement("TD");
	  cell1.innerHTML = "NAME";
	  cell2.innerHTML = "NR_MAT";
	  cell3.innerHTML = "GROUP";
	  cell1.rowSpan="2";
	  cell2.rowSpan="2";
	  cell3.rowSpan="2";
	   
	  var a_total = document.createElement("TD");
	  a_total.innerHTML="TA";
	  a_total.rowSpan = "2";
	  var p_total = document.createElement("TD");
	  p_total.innerHTML="TP";
	  p_total.rowSpan = "2";
	  
	  var w1 = document.createElement("TD");
	  var w2 = document.createElement("TD");
	  var w3 = document.createElement("TD");
	  var w4 = document.createElement("TD");
	  var w5 = document.createElement("TD");
	  var w6 = document.createElement("TD");
	  var w7 = document.createElement("TD");
	  var w8 = document.createElement("TD");
	  var w9 = document.createElement("TD");
	  var w10 = document.createElement("TD");
	  var w11 = document.createElement("TD");
	  var w12 = document.createElement("TD");
	  var w13 = document.createElement("TD");
	  var w14 = document.createElement("TD");

	  w1.innerHTML ="#1";
	  w2.innerHTML ="#2";
	  w3.innerHTML ="#3";
	  w4.innerHTML ="#4";
	  w5.innerHTML ="#5";
	  w6.innerHTML ="#6";
	  w7.innerHTML ="#7";
	  w8.innerHTML ="#8"; 
	  w9.innerHTML ="#9";
	  w10.innerHTML ="#10";
	  w11.innerHTML ="#11";
	  w12.innerHTML ="#12";
	  w13.innerHTML ="#13";
	  w14.innerHTML ="#14";

	  w1.colSpan="2";
	  w2.colSpan="2";
	  w3.colSpan="2";
	  w4.colSpan="2";
	  w5.colSpan="2";
	  w6.colSpan="2";
	  w7.colSpan="2";
	  w8.colSpan="2";
	  w9.colSpan="2";
	  w10.colSpan="2";
	  w11.colSpan="2";
	  w12.colSpan="2";
	  w13.colSpan="2";
	  w14.colSpan="2";

	  row.appendChild(cell1);
	  row.appendChild(cell2);
	  row.appendChild(cell3);

	  row.appendChild(w1);
	  row.appendChild(w2);
	  row.appendChild(w3);
	  row.appendChild(w4);
	  row.appendChild(w5);
	  row.appendChild(w6);
	  row.appendChild(w7);
	  row.appendChild(w8);
	  row.appendChild(w9);
	  row.appendChild(w10);
	  row.appendChild(w11);
	  row.appendChild(w12);
	  row.appendChild(w13);
	  row.appendChild(w14);

	  row.appendChild(a_total);
	  row.appendChild(p_total);

	  table.appendChild(row);
	  row.style.backgroundColor="#E08119";
	  row.style.borderBottom="1px solid black";

	  var row2 = document.createElement("TR");
	  var a1 = document.createElement("TD");
	  a1.innerHTML="A";
	  var p1 = document.createElement("TD");
	  p1.innerHTML = "P";
	  var a2 = document.createElement("TD");
	  a2.innerHTML="A";
	  var p2 = document.createElement("TD");
	  p2.innerHTML = "P";
	  var a3 = document.createElement("TD");
	  a3.innerHTML="A";
	  var p3 = document.createElement("TD");
	  p3.innerHTML = "P";
	  var a4 = document.createElement("TD");
	  a4.innerHTML="A";
	  var p4 = document.createElement("TD");
	  p4.innerHTML = "P";
	  var a5 = document.createElement("TD");
	  a5.innerHTML="A";
	  var p5 = document.createElement("TD");
	  p5.innerHTML = "P";
	  var a6 = document.createElement("TD");
	  a6.innerHTML="A";
	  var p6 = document.createElement("TD");
	  p6.innerHTML = "P";
	  var a7 = document.createElement("TD");
	  a7.innerHTML="A";
	  var p7 = document.createElement("TD");
	  p7.innerHTML = "P";
	  var a8 = document.createElement("TD");
	  a8.innerHTML="A";
	  var p8 = document.createElement("TD");
	  p8.innerHTML = "P";
	  var a9 = document.createElement("TD");
	  a9.innerHTML="A";
	  var p9 = document.createElement("TD");
	  p9.innerHTML = "P";
	  var a10 = document.createElement("TD");
	  a10.innerHTML="A";
	  var p10 = document.createElement("TD");
	  p10.innerHTML = "P";
	  var a11 = document.createElement("TD");
	  a11.innerHTML="A";
	  var p11 = document.createElement("TD");
	  p11.innerHTML = "P";
	  var a12 = document.createElement("TD");
	  a12.innerHTML="A";
	  var p12 = document.createElement("TD");
	  p12.innerHTML = "P";
	  var a13 = document.createElement("TD");
	  a13.innerHTML="A";
	  var p13 = document.createElement("TD");
	  p13.innerHTML = "P";
	  var a14 = document.createElement("TD");
	  a14.innerHTML="A";
	  var p14 = document.createElement("TD");
	  p14.innerHTML = "P";

	  row2.appendChild(a1);
	  row2.appendChild(p1);
	  row2.appendChild(a2);
	  row2.appendChild(p2);
	  row2.appendChild(a3);
	  row2.appendChild(p3);
	  row2.appendChild(a4);
	  row2.appendChild(p4);
	  row2.appendChild(a5);
	  row2.appendChild(p5);
	  row2.appendChild(a6);
	  row2.appendChild(p6);
	  row2.appendChild(a7);
	  row2.appendChild(p7);
	  row2.appendChild(a8);
	  row2.appendChild(p8);
	  row2.appendChild(a9);
	  row2.appendChild(p9);
	  row2.appendChild(a10);
	  row2.appendChild(p10);
	  row2.appendChild(a11);
	  row2.appendChild(p11);
	  row2.appendChild(a12);
	  row2.appendChild(p12);
	  row2.appendChild(a13);
	  row2.appendChild(p13);
	  row2.appendChild(a14);
	  row2.appendChild(p14);


	  table.appendChild(row2);

	  row2.style.backgroundColor="#E08119";
	  row2.style.borderBottom="1px solid black";
//populate table with infos
	for(var i=0; i<currentStudents.length; i++){
		var p=0;
		var a=0;
		row2 = document.createElement("TR");
		row2.style.backgroundColor="#F3E0BE";
	    row2.style.borderBottom="1px solid black";

	    var name = document.createElement("TD");
	    name.style.textAlign = "left";
	    name.innerHTML =(i+1).toString()+ ". "+ currentStudents[i].firstname.toUpperCase() + " " + currentStudents[i].lastname.toUpperCase();
	    var nr_mat = document.createElement("TD");
	    if(currentStudents[i].nr_matricol != ""){
	    	nr_mat.innerHTML = currentStudents[i].nr_matricol;
	    }
	    else 
	    	nr_mat.innerHTML = "-";
	    var group = document.createElement("TD");
	    if(currentStudents[i].group != "")
	    	group.innerHTML = currentStudents[i].group.toUpperCase();
	    else 
	    	group.innerHTML = "-";
	    var points = document.createElement("TD");
	    var attendences = document.createElement("TD");

	  //complete attendeces and point for each week
	  var a1 = document.createElement("TD");
	  var p1 = document.createElement("TD");
	  if(currentStudents[i].w1 == "" || parseInt(currentStudents[i].w1,10)>=0){
	  		a1.innerHTML="1";
	  		a += 1;
	  		if (parseInt(currentStudents[i].w1,10) >=0){
	  			var grade = parseInt(currentStudents[i].w1,10);
	  			p1.innerHTML = grade.toString();
	  			p += grade;
	  		}
	  		else p1.innerHTML ="0";
	  }
	  else {
	  		a1.innerHTML="0";
	  		p1.innerHTML = "0";
	  }
	  	   
	  var a2 = document.createElement("TD");
	  var p2 = document.createElement("TD");
	  if(currentStudents[i].w2 =="" || parseInt(currentStudents[i].w2,10)>=0){
	  		a2.innerHTML="1";
	  		a += 1;
	  		if (parseInt(currentStudents[i].w2,10) >=0){
	  			var grade = parseInt(currentStudents[i].w2,10);
	  			p2.innerHTML = grade.toString();
	  			p += grade;
	  		}
	  		else p2.innerHTML ="0";
	  }
	  else{
	  		a2.innerHTML="0";
	  		p2.innerHTML = "0";
	  }
	  
	  var a3 = document.createElement("TD");
	  var p3 = document.createElement("TD");
	  if(currentStudents[i].w3 =="" || parseInt(currentStudents[i].w3,10)>=0){
	  		a3.innerHTML="1";
	  		a += 1;
	  		if (parseInt(currentStudents[i].w3,10) >=0){
	  			var grade = parseInt(currentStudents[i].w3,10);
	  			p3.innerHTML = grade.toString();
	  			p += grade;
	  		}
	  		else p3.innerHTML ="0";
	  }
	  else{
	  		a3.innerHTML="0";
	  		p3.innerHTML = "0";
	  }

	  var a4 = document.createElement("TD");
	  var p4 = document.createElement("TD");
	  if(currentStudents[i].w4 =="" || parseInt(currentStudents[i].w4,10)>=0){
	  		a4.innerHTML="1";
	  		a += 1;
	  		if (parseInt(currentStudents[i].w4,10) >=0){
	  			var grade = parseInt(currentStudents[i].w4,10);
	  			p4.innerHTML = grade.toString();
	  			p += grade;
	  		}
	  		else p4.innerHTML ="0";
	  }
	  else{
	  		a4.innerHTML="0";
	  		p4.innerHTML = "0";
	  }

	  var a5 = document.createElement("TD");
	  var p5 = document.createElement("TD");
	  if(currentStudents[i].w5 =="" || parseInt(currentStudents[i].w5,10)>=0){
	  		a5.innerHTML="1";
	  		a += 1;
	  		if (parseInt(currentStudents[i].w5,10) >=0){
	  			var grade = parseInt(currentStudents[i].w5,10);
	  			p5.innerHTML = grade.toString();
	  			p += grade;
	  		}
	  		else p5.innerHTML ="0";
	  }
	  else{
	  		a5.innerHTML="0";
	  		p5.innerHTML = "0";
	  }

	  var a6 = document.createElement("TD");
	  var p6 = document.createElement("TD");
	  if(currentStudents[i].w6 =="" || parseInt(currentStudents[i].w6,10)>=0){
	  		a6.innerHTML="1";
	  		a += 1;
	  		if (parseInt(currentStudents[i].w6,10) >=0){
	  			var grade = parseInt(currentStudents[i].w6,10);
	  			p6.innerHTML = grade.toString();
	  			p += grade;
	  		}
	  		else p6.innerHTML ="0";
	  }
	  else{
	  		a6.innerHTML="0";
	  		p6.innerHTML = "0";
	  }

	  var a7 = document.createElement("TD");
	  var p7 = document.createElement("TD");
	  if(currentStudents[i].w7 =="" || parseInt(currentStudents[i].w7,10)>=0){
	  		a7.innerHTML="1";
	  		a += 1;
	  		if (parseInt(currentStudents[i].w7,10) >=0){
	  			var grade = parseInt(currentStudents[i].w7,10);
	  			p7.innerHTML = grade.toString();
	  			p += grade;
	  		}
	  		else p7.innerHTML ="0";
	  }
	  else{
	  		a7.innerHTML="0";
	  		p7.innerHTML = "0";
	  }
	   
	  var a8 = document.createElement("TD");
	  var p8 = document.createElement("TD");
	  if(currentStudents[i].w8 =="" || parseInt(currentStudents[i].w8,10)>=0){
	  		a8.innerHTML="1";
	  		a += 1;
	  		if (parseInt(currentStudents[i].w8,10) >=0){
	  			var grade = parseInt(currentStudents[i].w8,10);
	  			p8.innerHTML = grade.toString();
	  			p += grade;
	  		}
	  		else p8.innerHTML ="0";
	  }
	  else{
	  		a8.innerHTML="0";
	  		p8.innerHTML = "0";
	  }
	  
	  var a9 = document.createElement("TD");
	  var p9 = document.createElement("TD");
	  if(currentStudents[i].w9 =="" || parseInt(currentStudents[i].w9,10)>=0){
	  		a9.innerHTML="1";
	  		a += 1;
	  		if (parseInt(currentStudents[i].w9,10) >=0){
	  			var grade = parseInt(currentStudents[i].w9,10);
	  			p9.innerHTML = grade.toString();
	  			p += grade;
	  		}
	  		else p9.innerHTML ="0";
	  }
	  else{
	  		a9.innerHTML="0";
	  		p9.innerHTML = "0";
	  }

	  var a10 = document.createElement("TD");
	  var p10 = document.createElement("TD");
	  if(currentStudents[i].w10 =="" || parseInt(currentStudents[i].w10,10)>=0){
	  		a10.innerHTML="1";
	  		a += 1;
	  		if (parseInt(currentStudents[i].w10,10) >=0){
	  			var grade = parseInt(currentStudents[i].w10,10);
	  			p10.innerHTML = grade.toString();
	  			p += grade;
	  		}
	  		else p10.innerHTML ="0";
	  }
	  else{
	  		a10.innerHTML="0";
	  		p10.innerHTML = "0";
	  }
	  
	  var a11 = document.createElement("TD");
	  var p11 = document.createElement("TD");
	  if(currentStudents[i].w11 =="" || parseInt(currentStudents[i].w11,10)>=0){
	  		a11.innerHTML="1";
	  		a += 1;
	  		if (parseInt(currentStudents[i].w11,10) >=0){
	  			var grade = parseInt(currentStudents[i].w11,10);
	  			p11.innerHTML = grade.toString();
	  			p += grade;
	  		}
	  		else p11.innerHTML ="0";
	  }
	  else{
	  		a11.innerHTML="0";
	  		p11.innerHTML = "0";
	  }
	 
	  var a12 = document.createElement("TD");
	  var p12 = document.createElement("TD");
	  if(currentStudents[i].w12 =="" || parseInt(currentStudents[i].w12,10)>=0){
	  		a12.innerHTML="1";
	  		a += 1;
	  		if (parseInt(currentStudents[i].w12,10) >=0){
	  			var grade = parseInt(currentStudents[i].w12,10);
	  			p12.innerHTML = grade.toString();
	  			p += grade;
	  		}
	  		else p12.innerHTML ="0";
	  }
	  else{
	  		a12.innerHTML="0";
	  		p12.innerHTML = "0";
	  }
	
	var a13 = document.createElement("TD");
	var p13 = document.createElement("TD");
	if(currentStudents[i].w13 =="" || parseInt(currentStudents[i].w13,10)>=0){
	  	a13.innerHTML="1";
	  	a += 1;
	  	if (parseInt(currentStudents[i].w13,10) >=0){
	  		var grade = parseInt(currentStudents[i].w13,10);
	  		p13.innerHTML = grade.toString();
	  		p += grade;
	  	}
	  	else p13.innerHTML ="0";
	}
	else{
	  	a13.innerHTML="0";
	  	p13.innerHTML = "0";
	}

	var a14 = document.createElement("TD");
	var p14 = document.createElement("TD");
	if(currentStudents[i].w14 =="" || parseInt(currentStudents[i].w14,10)>=0){
	  	a14.innerHTML="1";
	  	a += 1;
	  	if (parseInt(currentStudents[i].w14,10) >=0){
	  		var grade = parseInt(currentStudents[i].w14,10);
	  		p14.innerHTML = grade.toString();
	  		p += grade;
	  	}
	  	else p14.innerHTML ="0";
	}
	else{
	  	a14.innerHTML="0";
	  	p14.innerHTML = "0";
	}
//append to current row name nr mat and group of student
	row2.appendChild(name);
	row2.appendChild(nr_mat);
	row2.appendChild(group);
//append to current row attendeces and points of student for each week
	  row2.appendChild(a1);
	  row2.appendChild(p1);
	  row2.appendChild(a2);
	  row2.appendChild(p2);
	  row2.appendChild(a3);
	  row2.appendChild(p3);
	  row2.appendChild(a4);
	  row2.appendChild(p4);
	  row2.appendChild(a5);
	  row2.appendChild(p5);
	  row2.appendChild(a6);
	  row2.appendChild(p6);
	  row2.appendChild(a7);
	  row2.appendChild(p7);
	  row2.appendChild(a8);
	  row2.appendChild(p8);
	  row2.appendChild(a9);
	  row2.appendChild(p9);
	  row2.appendChild(a10);
	  row2.appendChild(p10);
	  row2.appendChild(a11);
	  row2.appendChild(p11);
	  row2.appendChild(a12);
	  row2.appendChild(p12);
	  row2.appendChild(a13);
	  row2.appendChild(p13);
	  row2.appendChild(a14);
	  row2.appendChild(p14);
	  //asign a and p 
	  attendences.innerHTML = a.toString();
	  points.innerHTML = p.toString();
	  row2.appendChild(attendences);
	  row2.appendChild(points);
	  table.appendChild(row2);
	}

	document.getElementById("download").style.display="";

}


async function getLabInfos(){
	var status = document.getElementById("status");
    lab_name = $("#myInput").val();
	if(lab_name == "" ){
	status.innerHTML = "Please choose the laboratory you want infos for";
	status.style.color = "red";
	return;
	}
	else{
	setCookie("laboratory",lab_name,1);
	document.getElementById("loadCircle").style.display="";
	currentLabName = lab_name;
	currentStudents = [];
  	studentIds = [];
  	studentGrades = [];
	
	status.innerHTML = "";
	await loadStudents(lab_name);

	if(currentStudents.length == 0){
		status.innerHTML = "No students found!";
		status.style.color = "red"
		document.getElementById("loadCircle").style.display="none";
		return;
	}

	await constructTable();
	
	document.getElementById("loadCircle").style.display="none";
	}
}

//download excel function
function download2(){
	var htmltable= document.getElementById('studentsTable');
    var html = htmltable.outerHTML;
    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html)); 
}

//clear input when user clicks inside it
function clearInput(){
	document.getElementById("myInput").value ="";
	document.getElementById("studentsList").innerHTML="";
	document.getElementById("download").style.display="none";
	document.getElementById("searchStudentInput").style.display="none";
}

//setting cookies for better usability
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

//checking when page is reloaded to load the last search
if (sessionStorage.getItem("is_reloaded")){ 
	document.getElementById("myInput").value = getCookie("laboratory");
	getLabInfos();
}
sessionStorage.setItem("is_reloaded", true); 
 