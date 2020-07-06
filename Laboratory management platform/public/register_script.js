

$(document).ready(function(){
    $("#registerBtn").click(function(){  
    	var pass = $("#input_pass").val();
    	var cpass = $("#input_cpass").val();
    	var fn = $("#firstname").val();
    	var ln = $("#lastname").val();
    	var email = $("#input_email").val();
    	if(fn === "" || ln === "" || email ===""){
    		document.getElementById("status").innerHTML = "Complete all fields!";
    		return;
    	}
    	if(pass.trim() != cpass.trim()){
    		document.getElementById("status").innerHTML = "Passwords are not the same!";
    		return;
    	}
    	$.post("/check_if_mail_exists",
    		{ email: $("#input_email").val()}, 
	        function(data, status, xhr) {
	        	 
	          if(data === "OK"){ 	//email was not used by other user
	          	$("#register_form").submit();
	          	//window.location="/";
	          	return;
	          }
	          return;
	        })
  		.done(function() {return;})
  		.fail(function(jqxhr, settings, ex) { 
  			//console.log(jqxhr+settings+ex);
             document.getElementById("status").innerHTML = "Email already exists!";
             return;
  		});
    });


    $("#sendBtn").click(function(){  
    	
    	var email = $("#input_email").val();
    	if(email ===""){
    		document.getElementById("statusPass").innerHTML = "Complete all fields!";
    		return;
    	}
    	
    	$.post("/check_if_mail",
    		{ email: $("#input_emailPass").val()}, 
	        function(data, status, xhr) {
	        	 
	          if(data === "OK"){ 	
	          	$.post('/send_email_with_code',{email:$("#input_emailPass").val()},
	          		function(data2){
	          			//console.log(data2)
	          			if(data2 === "OK"){
	          			document.getElementById("statusPass").innerHTML = "We sent you an email with verification code.";
	          			document.getElementById("statusPass").style.color = "black";
	          			document.getElementById("sendcode_form").style.display = "none";
	          			document.getElementById("reset_form").style.display = "";	
	          		}
	          		});
	          	
	          	return;
	          }
	          return;
	        })
  		.done(function() {return;})
  		.fail(function(jqxhr, settings, ex) { 
             document.getElementById("statusPass").innerHTML = "No account has this email!";
  		});
    });

    $("#resetBtn").click(function(){  
    	
    	var code = $("#resetCode").val();
    	var pass = $("#resetPass").val();
    	if(code ==="" || pass == ""){
    		document.getElementById("statusPass").innerHTML = "Complete all fields!";
    		return;
    	}
    	
    	$.post("/check_if_valid_code",
    		{ code: $("#resetCode").val()}, 
	        function(data, status, xhr) {
	        	 
	          if(data === "OK"){ 	
	          	$.post('/change_password',{code:$("#resetCode").val(), pass: $("#resetPass").val()},
	          		function(data2){
	          			//console.log(data2)
	          			if(data2 === "OK"){
	          			document.getElementById("statusPass").innerHTML = "Password was changed!";
	          			document.getElementById("statusPass").style.color = "green";	
	          		}
	          		});
	          	
	          	return;
	          }
	          return;
	        })
  		.done(function() {return;})
  		.fail(function(jqxhr, settings, ex) { 
             document.getElementById("statusPass").innerHTML = "Verification code is not valid!";
  		});
    });




});

