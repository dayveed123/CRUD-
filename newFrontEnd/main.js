////GET USER AND POPULATE TABLE FUNCTION
function fetchData()
{
    fetch("https://localhost:7189/api/User").then(
(res)=>res.json()
).then ((Response)=>{

var tmpData = "";
console.log(Response);
Response.forEach((costumer)=>{
tmpData+="<tr>"
tmpData+="<td>"+costumer.firstName+"</td>";
tmpData+="<td>"+costumer.lastName+"</td>";
tmpData+="<td>"+costumer.email+"</td>";
tmpData+="<td>"+costumer.userName+"</td>";
tmpData+="<td><button class='form_action_button'>Edit </button></td>"
tmpData+="<td><button class='form_action_button'>delete </button></td>"
tmpData +="</tr>"


})
    document.getElementById("tbData").innerHTML = tmpData;
});

} 
///call function to GET All users
fetchData(); 

////add user function
function addUser(){
  let payload = {};
  payload[' FirstName'] = document.getElementById("firstName").value;
  payload['LastName'] = document.getElementById("lastName").value;
  payload['Email'] = document.getElementById("email").value;
  payload['UserName'] = document.getElementById("userName").value;

  fetch ("https://localhost:7189/api/User",{
    method:"POST",
    headers:{
       
        "Content-Type":"application/json"
    },
    body:JSON.stringify(payload)
  }).then((res)=>res.json()).then((Response)=>{
    document.getElementById("message").innerHTML = Response.message
  })
   // fetchData();
  }