$(document).ready(function(){
    $("#loginBtn").click(function(){  
        var pass = $("#input_pass").val();
        var email = $("#input_email").val();
        if(pass === "" || email ===""){
            document.getElementById("status").innerHTML = "Complete all fields!";
            return;
        }
        
        $.post("/connect",
            { email: $("#input_email").val(), pass: $("#input_pass").val()})
        .done(function() {
          window.location.href="/dash";
        })
        .fail(function(jqxhr, settings, ex) { 
             document.getElementById("status").innerHTML = "Wrong email or password!";
             document.getElementById("status").style.color="red";
             return;
        });
    });


    $("#registerBtn").click(function(){  
        var pass = $("#input_pass").val();
        var pass2 = $("#input_cpass").val();
        var email = $("#input_email").val();

        if(pass === "" || email ==="" || pass2 === ""){
            document.getElementById("status").innerHTML = "Complete all fields!";
            document.getElementById("status").style.color="red";
            return;
        }
        if(pass != pass2){
          document.getElementById("status").innerHTML = "Passwords are not the same!";
          document.getElementById("status").style.color="red";
            return;
        }
        
        $.post("/register",
            { email: $("#input_email").val(), pass: $("#input_pass").val()})
        .done(function() {
          window.location.href="/dash";
        })
        .fail(function(jqxhr, settings, ex) { 
             document.getElementById("status").innerHTML = "Email already exists!";
             document.getElementById("status").style.color="red";
             return;
        });
    });
});