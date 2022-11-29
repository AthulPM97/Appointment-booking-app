
window.addEventListener('DOMContentLoaded', () => {
  //get all keys from crudcrud
  axios.get(' https://crudcrud.com/api/efcf04bed4ea403589174fee592751c0/appointementData')
  .then((response) => {
      var users = response.data;
      users.forEach(user => {
        addNewLineElement(user);
      });
    })
    .catch(err => console.log(err));
}); 
  
const submitButton = document.getElementById("submit");
//submit button click event
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const emailId = document.getElementById("email").value;
  const name = document.getElementById("name").value;
  if (emailId.length > 0 && name.length > 0) {
    const object = {
      name: name,
      emailId: emailId 
    };
    axios.post(' https://crudcrud.com/api/efcf04bed4ea403589174fee592751c0/appointementData',
    object)
    .then((response) => {
      console.log(response);
      addNewLineElement(response.data);
    })
    .catch(err => console.log(err));
  }
});

function addNewLineElement(object) {
  const ul = document.getElementById("users");
  const li = document.createElement("li");

  li.appendChild(
    document.createTextNode(object.name + " " + object.emailId + " ")
  );
  
  //edit button
  const a1 = document.createElement("input");
  a1.type = "button";
  a1.value = "Edit";
  a1.addEventListener("click", () => {
    console.log(object);
    document.getElementById("name").value = object.name;
    document.getElementById("email").value = object.emailId;
    li.remove();
  });
  a1.className = "delete";
  a1.style.border = "2px solid green";
  li.appendChild(a1);

  //delete button
  const a = document.createElement("input");
  a.type = "button";
  a.value = "delete";

  //delete event
  a.addEventListener("click", () => {
    //localStorage.removeItem(object.emailId);
    console.log(object._id);
    axios.delete(` https://crudcrud.com/api/efcf04bed4ea403589174fee592751c0/appointementData/${object._id}`)
    li.remove();
  });
  a.className = "delete";
  a.style.border = "2px solid red";
  li.appendChild(a);

  ul.appendChild(li);
}