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