const submitButton = document.getElementById("submit");

if (document.readyState !== "loading") {

  //get all keys from crudcrud
  axios.get('https://crudcrud.com/api/8dda5773de6d43cfa6863d7ae682a483/appointementData')
  .then((response) => {
    response.forEach((key) => {
      addNewLineElement(key);
    });
  }) 
  .catch(err => console.log(err));
  console.log("keys", keys);
}
// const listOfPeople = []
//submit button click event
submitButton.addEventListener("click", (e) => {
  //e.preventDefault();
  const emailId = document.getElementById("email").value;
  const name = document.getElementById("name").value;
  if (emailId.length > 0 && name.length > 0) {
    const object = {
      name: name,
      emailId: emailId 
    };
    axios.post('https://crudcrud.com/api/8dda5773de6d43cfa6863d7ae682a483/appointementData',
    object)
    .then((response) => {
      console.log(response);
      addNewLineElement(response);
    })
    .catch(err => console.log(err));
    //localStorage.setItem(emailId, JSON.stringify(object));
    //addNewLineElement(object);
  }
});

function addNewLineElement(object) {
  const ul = document.getElementById("users");
  const li = document.createElement("li");

  li.appendChild(
    document.createTextNode(object.name + " " + object.emailId + " ")
  );
  // li.appendChild()
  console.log(document.createElement("i"));
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
  console.log(a1);
  li.appendChild(a1);

  //delete button
  const a = document.createElement("input");
  a.type = "button";
  a.value = "delete";
  //delete event
  a.addEventListener("click", () => {
    localStorage.removeItem(object.emailId);
    li.remove();
  });
  a.className = "delete";
  a.style.border = "2px solid red";
  console.log(a);
  li.appendChild(a);
  console.log(li);

  ul.appendChild(li);
}