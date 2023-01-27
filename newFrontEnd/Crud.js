const postList = document.querySelector('.list');
const postList1 = document.querySelector('.loginPopup');
let tmpData = '';
const addUserForm = document.querySelector('.postForm');
const url = 'https://localhost:44377/api/User';
const firstName1 = document.getElementById('firstName');
const lastName1 = document.getElementById('lastName');
const email1 = document.getElementById('email');
const userName1 = document.getElementById('userName');
const userID1 = document.getElementById('UserID');
let output = '';
let userNameCheck = [];
const btnSubmit = document.querySelector('formSubmit');
const firstNameVal = firstName1.value.trim();
const lastNameVal =  lastName1.value.trim();
const emailVal = email1.value.trim();
const userNameVal = userName1.value.trim();
///////////////// username and email arrays//////////////////////////
//  fetch(url)
// .then(res=>res.json())
// .then(data => {
//   data.forEach(post =>{
//    // const userNameArr1 = [];
//    // console.log(post.firstName)
//    const userNameArr1 = post.userName;
//    console.log(userNameArr1);
//   })
// });
document.getElementById("AddUp").disabled = true;

//////////////////display users on the table///////////////////////////
const getUsers = (post)=>{
    post.forEach(post =>{
        tmpData+="<tr data-id =" +post.id+">"
        //tmpData+="<td>"+post.id+"</td>";
        tmpData+="<td class = 'fName'>"+post.firstName+"</td>";
        tmpData+="<td class = 'lastName'>"+post.lastName+"</td>";
        tmpData+="<td class = 'email'>"+post.email+"</td>";
        tmpData+="<td class = 'userName'>"+post.userName+"</td>";
        tmpData+="<td data-id =" +post.id+"><button  id='Edit-button'>Edit </button></td>"
        tmpData+="<td data-id =" +post.id+"><button  id ='Delete-button'>delete </button></td>"
        tmpData +="</tr>"

    })
    document.getElementById("tbData").innerHTML = tmpData;
}
//Get - Read the post
//Method to Get
fetch(url)
.then(res=>res.json())
.then(data => getUsers(data));

////form control //////////////////////////////////////
function openForm() {
    document.getElementById("popupForm").style.display = "block";
  }
  function closeForm() {
    document.getElementById("popupForm").style.display = "none";
  }


//addUserForm.addEventListener('submit',(e)=>{
//console.log(firstName1.value)
//e.preventDefault();
function addUser()
{ 
let sendData = {
    firstName:firstName1.value,
    lastName:lastName1.value,
    email: email1.value,
    userName: userName1.value
}
// console.log(JSON.stringify(sendData))
fetch(url,
    {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
       // mode: 'no-cors', // no-cors, *cors, same-origin
       // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
       // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
       // redirect: 'follow', // manual, *follow, error
       // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(sendData)
})
.then(res =>res.json())
.then(data => {
     const dataArr = [];
     dataArr.push(data);
     getUsers(dataArr);
     ()=> location.reload();
})
}
//})

/////edit a user and delete
postList.addEventListener('click', (e)=>{
   e.preventDefault();
   let delButtonIsPressed = e.target.id =='Delete-button';
   let editButtonIsPressed = e.target.id =='Edit-button';


  let id = e.target.parentElement.dataset.id;
   //delete-remove user...........
   // deltet method
   if(delButtonIsPressed){
    let text = "ARE YOU SURE?";
    if (confirm(text) == true)
    {   
    console.log(id);
   fetch(`${url}/id?id=${id}`,{
    method:'DELETE',
   }) 
.then(res => res.json())
.then(()=>location.reload())
   }
   else{
    ()=> location.reload();
   }
}
if (editButtonIsPressed)
{
  //////////hide the add and reset buttons////////////////////////
  // var x = document.getElementById('.myDIV');
  // x.style.property.display = "block";

 
  
  //////////////// and display save changes///////////////////////////
    
    fetch(`${url}/id?id=${id}`) 
    .then(res=>res.json())
    .then(data => {
    let userID = data.id;
    let fname = data.firstName;
    let lname = data.lastName;
    let hemail = data.email;
    let uzname = data.userName;
    
    ///display in text box.............
    userID1.value = userID;
    firstName1.value = fname;
    lastName1.value = lname;
    email1.value = hemail;
    userName1.value = uzname; 
 });
 document.getElementById("SaveChanges").style.display = "block";
 document.getElementById("myDIV").style.display = "none";
 document.getElementById("userName").disabled = true;
 
}
///update the users details.............
///////////method fetch 

});


function editUser(){

  let editID = userID1.value;
  
    let sendData = {
        firstName:firstName1.value,
        lastName:lastName1.value,
        email: email1.value,
        userName: userName1.value
    }
    // console.log(JSON.stringify(sendData))
    fetch(`https://localhost:44377/api/User/id?id=${editID}`,
        {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
           // mode: 'no-cors', // no-cors, *cors, same-origin
           // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
           // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
           // redirect: 'follow', // manual, *follow, error
           // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(sendData)
    })
    .then(res => {
      res.json()
      console.log(res);
    })
    .then(() => location.reload())
    .catch(error => console.log('error', error));
    // // .then(data => {
    // //      const dataArr = [];
    // //      dataArr.push(data);
    // //      getUsers(dataArr);
    // //      ()=> location.reload();
    // })
}
////////////////////////////////////check if email is in a valid format//////////////////////

const isEmail = (emailVal) => {
  var atSymbol = emailVal.indexOf('@');
  if(atSymbol < 1) return false;
  var dot = emailVal.lastIndexOf('.');
  if(dot <= atSymbol + 2) return false;
  if (dot === emailVal.length -1) return false;
  return true;
}
  ////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////

//////////////////////check if email exist ///////////////////////////////////////
// const usedEmail = (emailVal) => {
//   fetch(url)
//   .then(res=>res.json())
//   .then(data1 => {
//     data1.forEach(post =>{
//      // const userNameArr1 = [];
//      // console.log(post.firstName)
//      const emailArr1 = post.email;
//      let emailCheck = [(emailArr1)];
//      for (let i = 0; i < emailCheck.length; i++) 
//      {
//       if (emailCheck[i] === emailVal) return false;
//     }

//     })
//   });
// }


/////////////////////////////////////////////////
/// TEXT FIELD VERIFICATION /......///////
addUserForm.addEventListener('submit',(e)=>{
e.preventDefault();
if (firstName1.value == "" || lastName1.value == "" || email1.value == "" || userName1.value == "")
{
  alert("PLEASE FILL IN ALL FIELDS");
  console.log(UUname.value);
}
else if (firstName1.value.length <= 2 )
{
  alert("First Name Invalid");
}
else if (lastName1.value.length <= 2)
{
  alert("last Name is invalid");
}
else if (email1.value.length <= 2)
{
  alert("Invalid Email");
}
else if(!isEmail(email1.value))
{
  alert("Invalid Email")
} 
else if (userName1.value.length <= 2)
{
  alert("Invalid Username"); 
}
///////////////// check for duplicate///////////...........
// else if (userName1.value.length >= 3)
// {
//   fetch(url)
//   .then(res=>res.json())
//   .then(data => {
//     data.forEach(post =>{
//      // const userNameArr1 = [];
//      // console.log(post.firstName)
     
//      const userNameArr1 = post.userName;
//      userNameCheck = [(userNameArr1)];
//      console.log(userNameArr1.value);
 
//     })
//      //////////////////////////////////////////////////////////////////
//     //  if(userNameCheck.includes(userNameVal))
//     //  {
//     //   alert(userNameVal + "is taken");
//     //   return;
//     //  }
//     //  {
//     //   alert ("good to go");
//     //  }
//      /////////////////////////////////////////////////////////////////

//      for (let i = 0; i < userNameCheck.length; i++) 
//      {
//       if (userNameCheck[i] === userName1.value)
//       {
//         alert('The name already exist');
//         userName1.value ="";
//         return false;
        
//       }
//       else
//       {
        
//   let sendData = {
//     firstName:firstName1.value,
//     lastName:lastName1.value,
//     email: email1.value,
//     userName: userName1.value
// }
// // console.log(JSON.stringify(sendData))
// fetch(url,
//     {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//        // mode: 'no-cors', // no-cors, *cors, same-origin
//        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//        // credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//           'Content-Type': 'application/json'
//           // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//        // redirect: 'follow', // manual, *follow, error
//        // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         body: JSON.stringify(sendData)
// })
// .then(res =>res.json())
// .then(data => {
//      const dataArr = [];
//      dataArr.push(data);
//      getUsers(dataArr);
//      ()=> location.reload();
// })
//       }
//     }
    

//   });
// }
////////////////// duplicate//////////////.................
else 
{
  let sendData = {
    firstName:firstName1.value,
    lastName:lastName1.value,
    email: email1.value,
    userName: userName1.value
}
// console.log(JSON.stringify(sendData))
fetch(url,
    {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
       // mode: 'no-cors', // no-cors, *cors, same-origin
       // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
       // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
       // redirect: 'follow', // manual, *follow, error
       // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(sendData)
})
.then(res =>res.json())
.then(data => {
     const dataArr = [];
     dataArr.push(data);
     getUsers(dataArr);
     ()=> location.reload();
})
}
}); 





//////// DISABLE SPACE BAR AND WHITESPACES/////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function keyDown(e) { 
  var e = window.event || e;
  var key = e.keyCode;
  //space pressed
   if (key == 32) { //space
    e.preventDefault();
   }
         
}


    //  for (let i = 0; i < userNameCheck.length; i++) {
    //   if (userNameCheck[i] === userName1.value) {
    //     alert('The name already exist')
    //   }
    //  }
    // return false;
function checkUserName ()
{
  fetch(url)
  .then(res=>res.json())
  .then(data => {
    data.forEach(post =>{
     // const userNameArr1 = [];
     // console.log(post.firstName)
     const userNameArr1 = post.userName;
     userNameCheck = [(userNameArr1)];
    
 
    
     //////////////////////////////////////////////////////////////////
    //  if(userNameCheck.includes(userNameVal))
    //  {
    //   alert(userNameVal + "is taken");
    //   return;
    //  }
    //  {
    //   alert ("good to go");
    //  }
     /////////////////////////////////////////////////////////////////
console.log(userNameCheck.value);
     for (let i = 0; i < userNameCheck.length; i++) 
     {
      if (userNameCheck[i] === userName1.value)
      {
       // document.getElementById("AddUp").disabled = true;
        alert('The name already exist');
        userName1.value = "";
        
      
        return false;
      }
      else
      {
       // document.getElementById("AddUp").disabled = false;
       //
      }
    }
    
    })
  });
}

////////////////////////////////////////////////////
if  (firstName1.value != "" || lastName1.value != "" || email1.value != "" || userName1.value != "")
{
  document.getElementById("AddUp").disabled = false;
}
