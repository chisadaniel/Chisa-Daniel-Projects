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


$(document).ready(function(){
    $("#update").click(function(){  
    	var nr_matricol = $("#nr_mat").val();
    	var grupa = $("#grupa").val();
    	 
    	 
    	if(nr_matricol === "" || grupa ===""){
    		document.getElementById("status").innerHTML = "Complete all fields!";
    		return;
    	}
    	 
    	 
	          	$.post("/insert_nr_mat_and_group",
	          		{nr_mat:$("#nr_mat").val(), group:$("#grupa").val()})
	          	.done(function(){
	          		document.getElementById("status").innerHTML = "Updated!";
             		document.getElementById("status").style.color="green";
             		document.getElementById("snr_mat").innerHTML= nr_matricol.toUpperCase(); 
	       			document.getElementById("sgrupa").innerHTML = grupa.toUpperCase();

	          	})
	          	.fail(function(){
	          		document.getElementById("status").innerHTML = "Can't update!";
             		document.getElementById("status").style.color="red";
	          	});

	     return;
	      
    });
});

function getInfos(){

	  $.post("/load_student_profile_infos")
	    .done(profile_infos => {
	        if(!profile_infos) return;
	        console.log("here"+profile_infos);
	       	document.getElementById("sname").innerHTML = profile_infos[0].toUpperCase();
	       	if(profile_infos[1] != undefined) document.getElementById("snr_mat").innerHTML= profile_infos[1].toUpperCase(); 
	       	if(profile_infos[2] != undefined) document.getElementById("sgrupa").innerHTML = profile_infos[2].toUpperCase();

	    });
}

function getProfileUrl(){

	  $.post("/get_my_profile_url")
	    .done(url => {
	        if(!url) return;
	        console.log("url "+url);
	       	document.getElementById("profileImg").src = url;
	    });
}

function show(){
	var form = document.getElementById("update_form");
	if(form.style.display ==="none")
		form.style.display = "";
	else form.style.display = "none";
}

getInfos();
getProfileUrl();

var uploadIsShow = false;
function showUpload(){
	if(!uploadIsShow){
		document.getElementById("uploadBox").style.display="block"
		uploadIsShow = true
	}
	else{
		document.getElementById("uploadBox").style.display="none"
		uploadIsShow = false
	}
}

 