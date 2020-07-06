/*document.getElementById("front").addEventListener('click', function(){
	document.getElementById("back").style.display="block";
	document.getElementById("front").style.display="none";
})
*/

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



document.getElementById("backBtn").addEventListener('click', function(){
	document.getElementById("back").style.display="none";

	document.getElementById("front").style.display="block";
	clearInterval(loadInterval)
})
 
var listOpen = false;
async function openList(){
	if(!listOpen){
	document.getElementById("messages").style.display="none"; //10%
	document.getElementById("list").style.width="100%";
	document.getElementById("list").style.display="block";
	document.getElementById("searchInput").style.display="block";
	document.getElementById("openListBtn").innerHTML="X";
	document.getElementById("closeListBtn").style.display="block"
	document.getElementById("pTitle").style.display="block"
	listOpen = true;
	await loadAllPersons();
	}
	else{
		document.getElementById("closeListBtn").style.display="none"
		document.getElementById("messages").style.display="block";
		document.getElementById("messages").style.width="100%";
		document.getElementById("list").style.width="0%";
		document.getElementById("list").style.display="none";
		document.getElementById("searchInput").style.display="none"
		document.getElementById("openListBtn").innerHTML="People";
		document.getElementById("pTitle").style.display="none"
		
		listOpen = false;
	}
}

var people = []
var currentSelected;
async function loadPersons(){
	people = []
	await $.post("/load_persons_for_messenger")
    .done(persons => {
        if(!persons) return;
        for(let i in persons){
        	if(persons[i].seen ==false)
        	people.push(persons[i])        	 
        	//console.log("d",persons[i].name,persons[i].id);
        }
        for(let i in persons){
        	if(persons[i].seen ==true)
        	people.push(persons[i])        	 
        	//console.log("d",persons[i].name,persons[i].id);
        }


         constructFront()
    });
}

//Function that load all persons related to this user
var s_people =[]
async function loadAllPersons(){
	await $.post("/sload_persons_for_search")
    .done(persons => {
        if(!persons) return;
        var div = document.getElementById("searchedPeople")
        div.innerHTML=""
        for(let i in persons){

        	s_people[i] = persons[i]        	 
        	console.log("searched",persons[i].name,persons[i].id);
        	var p = document.createElement("DIV")
        	p.className = "frontPerson"
			p.style.padding="8px"
			p.id= i.toString()
			p.style.borderRadius="10px"
        	p.style.color="white"
        	p.innerHTML = s_people[i].name;
        	div.appendChild(p)
        	p.addEventListener('click',async function(){
        	fromSearch = true
        	currentSelected = parseInt(this.id,10)
        	document.getElementById("front").style.display = "none"
        	document.getElementById("back").style.display = "block"
        	console.log("starting conv with", s_people[currentSelected].id)
        	var convsBox = document.getElementById("conversation")
	        convsBox.innerHTML = ""
        	await loadConversation(s_people[currentSelected].id)
        	document.getElementById("speakWith").innerHTML = s_people[currentSelected].name;
        	clearInterval(loadInterval);
							   loadInterval = setInterval(() => {
							    loadConversation(s_people[currentSelected].id);
							  }, 2000)
        })
        }
          
    });
}
var fromSearch=false;
var loadInterval
setInterval(() => {
							    loadPersons();
							  }, 6000)
function constructFront(){
	var namesBox = document.getElementById("names");
	namesBox.innerHTML = ""
	for(let i in people){
		var d = document.createElement("DIV")
		d.className = "frontPerson"
		d.style.padding="8px"
		d.style.borderRadius="10px"
        d.innerHTML = people[i].name;
        d.id = i.toString()
        if(people[i].seen ==false){
        	d.style.backgroundColor="red"
        	 d.innerHTML += "<br><span style=\"font-size:13px\">New message</span>"
        }
        else
        	d.style.backgroundColor="black"
        namesBox.appendChild(d)
        d.addEventListener('click',async function(){
        	fromSearch = false
        	currentSelected = parseInt(this.id,10)
        	document.getElementById("front").style.display = "none"
        	document.getElementById("back").style.display = "block"
        	console.log("starting conv with", people[currentSelected].id)
        	var convsBox = document.getElementById("conversation")
	        convsBox.innerHTML = ""
        	await loadConversation(people[currentSelected].id)
        	document.getElementById("speakWith").innerHTML = people[currentSelected].name;
        	clearInterval(loadInterval);
							   loadInterval = setInterval(() => {
							    loadConversation(people[currentSelected].id);
							  }, 2000)
        })

	}
}

window.onbeforeunload = function(event){
	clearInterval(loadInterval)
}

loadPersons();

async function loadConversation(p_id){
	await $.post("/load_conversation",{id:p_id})
		.done(convs => {
	        if(!convs) return;
	        var convsBox = document.getElementById("conversation")
	        convsBox.innerHTML = ""
	        for(let i in convs){
	        	console.log(convs[i])
	        	var p = document.createElement("DIV")
	        	var span = document.createElement("SPAN")
	        	span.className="messageFragment"
	        	span.innerHTML = convs[i].text
	        	p.appendChild(span)
	        	if(convs[i].position =="left"){
	        		p.className = "left"
	        	}
	        	else{
	        		p.className = "right"
	        	}
	        	convsBox.appendChild(p)
	        }
	    });
	    	var b = document.getElementById("conversation");
	        b.scrollTop = 10000000;
}

async function sendMsg(){
	var input = document.getElementById("textMsg")
	var text = input.value
	if(text == "")return
	//var p = document.createElement("P")
	//p.innerHTML = input.value
	//input.value = ""
	//document.getElementById("conversation").appendChild(p)
	var sendToId;
	if(fromSearch)
		sendToId = s_people[currentSelected].id
	else
		sendToId = people[currentSelected].id
	await $.post("/send_message_to",{id:sendToId, text:text})
						.done(async function(){
							//await loadMessages();
							  console.log("send mess done")
							  await loadConversation(sendToId)
							  //refreshMessages(res[currentId].id);
							  input.value="";

						});
}

//search contacts
function searchContact() {
	console.log("search")
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("searchedPeople").children;

  for (i = 0; i < table.length; i++) {
     
    console.log("hhh"+table[i].innerHTML)
     
      txtValue = table[i].innerHTML;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {

        table[i].style.display = "";
      } else {
        table[i].style.display = "none";
      }
          
  }
}
 