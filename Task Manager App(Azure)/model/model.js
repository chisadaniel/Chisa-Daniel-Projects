 const {CosmosClient} = require("@azure/cosmos");
 const endpoint="https://database2020.documents.azure.com:443/";
 const key = "I9hVfTa3g36o7tcBqtY6B2NgDrycpO4neQJ7cswwl1VvCj8QoyQkIdHC1ruXAP0bVv3RYDcDDil8a66sndX10A";
 

 const client = new CosmosClient({ endpoint, key });
 const database = client.database("Tasks");
 const container = database.container("Login");
 
async function test(){
  //const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
  //console.log(database.id);

const login =  { email: "a@y", password:"123"};
await container.items.create(login);
}
 

async function test2(){
	 
const { resources } = await container.items
  .query("SELECT * from Login")
  .fetchAll();
  const id=resources[0].id;
  console.log("this id "+id);
  for (const person of resources) {
  console.log(person.email+" "+person.password + " "+person.id);
}

 
 const res = await container.item('5180be27-dd35-4c62-b987-6ca25da2a076');
console.log(res.password);

} 
  
  test2();
 

