$(document).ready(function(){
    $("#loginStuds").click(function(){  
        var pass = $("#input_pass").val();
        var email = $("#input_email").val();
        if(pass === "" || email ===""){
            document.getElementById("status").innerHTML = "Complete all fields!";
            return;
        }
        
        $.post("/check_connection",
            { email: $("#input_email").val(), pass: $("#input_pass").val()}, 
            function(data, status, xhr) {
                 
              if(data === "OK"){    //email was not used by other user
                $("#firstForm").submit();
                return;
              }
              return;
            })
        .done(function() {return;})
        .fail(function(jqxhr, settings, ex) { 
             document.getElementById("status").innerHTML = "Wrong email or password!";
             document.getElementById("status").style.color="red";
             return;
        });
    });

    $("#loginProfs").click(function(){  
        var pass = $("#input_pass1").val();
        var email = $("#input_email1").val();
        if(pass === "" || email ===""){
            document.getElementById("status").innerHTML = "Complete all fields!";
            return;
        }
        
        $.post("/check_connection",
            { email: $("#input_email1").val(), pass: $("#input_pass1").val()}, 
            function(data, status, xhr) {
                 
              if(data === "OK"){    //email was not used by other user
                $("#secondForm").submit();
                return;
              }
              return;
            })
        .done(function() {return;})
        .fail(function(jqxhr, settings, ex) { 
             document.getElementById("status").innerHTML = "Wrong email or password!";
             document.getElementById("status").style.color="red";
             return;
        });
    });


  
});

function hideStudentsLogin(){
  var btn = document.getElementById("profsBtn");
  if(btn.innerHTML == "Profs"){
  document.getElementById("firstForm").style.display = "none";
  document.getElementById("secondForm").style.display = "block";
  document.getElementById("profsBtn").innerHTML = "Studs";
 }
 else{
  document.getElementById("firstForm").style.display = "block";
  document.getElementById("secondForm").style.display = "none";
  document.getElementById("profsBtn").innerHTML = "Profs";
 }
  }

document.getElementById("studentBox").addEventListener('click', function(){
  document.getElementById("studentBox").style.display="none"
  document.getElementById("profsBox").style.display="none"
  document.getElementById("firstForm").style.display = "block";
  document.getElementById("loginTitle").style.display="block";
  document.getElementById("backBox").style.display="block";
  document.getElementById("miniTitle").innerHTML = "Welcome Student!"
})
document.getElementById("profsBox").addEventListener('click', function(){
  document.getElementById("studentBox").style.display="none"
  document.getElementById("profsBox").style.display="none"
  document.getElementById("loginTitle").style.display="block";
  document.getElementById("secondForm").style.display = "block";
  document.getElementById("backBox").style.display="block";
  document.getElementById("miniTitle").innerHTML = "Welcome Professor!"
})
document.getElementById("backBtn").addEventListener('click', function(){
  document.getElementById("status").style.display="none"
  document.getElementById("backBox").style.display="none"
  document.getElementById("loginTitle").style.display="none";
  document.getElementById("firstForm").style.display = "none";
  document.getElementById("secondForm").style.display = "none";
  document.getElementById("studentBox").style.display="inline-block"
  document.getElementById("profsBox").style.display="inline-block"
})