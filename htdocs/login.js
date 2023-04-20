function doesEmailExist(email) {
    var httpc = new XMLHttpRequest(); // simplified for clarity
    var url = "checkEmailUnique.php";
    httpc.open("POST", url, true); // sending as POST

    httpc.onreadystatechange = function() { //Call a function when the state changes.

        if(httpc.readyState == 4 && httpc.status == 200) { // complete and no errors
                //console.log("after beeing sent");
            
            
            if (httpc.responseText == "email already exists") {
                console.log("the email is in the database")
                ifEmailDoesExist();
            }
            else if (httpc.responseText == "email free") {
                console.log("the email is free, go right ahead");
                //return true;
                
                //call the next function
                console.error("email doesn't exist try signing up");
                
                let formErrorMessageContainer = document.getElementById("formErrorMessageContainer");
                let formErrorMessage = document.getElementById("formErrorMessage");

                formErrorMessageContainer.style.display = "block";
                formErrorMessage.innerHTML = "we can't find this email, try signing up";
            }
            else {
                console.error(httpc.responseText); 
                //return false;
            }
           
        }
    };
    
    const data = new FormData();
    data.append('email', email);
    httpc.send(data);
}

function checkIfPasswordMatches(data) {
    //for this function i intend to send both the email and password to the php, where in the php box we can check if the hash matches, and then if it does we can retrieve the UUID, and else we will prompt the user to try again, and refresh the form.
    var httpc = new XMLHttpRequest(); // simplified for clarity
    var url = "doesPasswordMatchEmail.php";
    httpc.open("POST", url, true); // sending as POST

    httpc.onreadystatechange = function() { //Call a function when the state changes.

        if(httpc.readyState == 4 && httpc.status == 200) { // complete and no errors
                //console.log("after beeing sent");
            var response = httpc.responseText;
            let prefix = "success";

            if (response.startsWith(prefix)) {
                //here we get the UUID returned from the server
                console.log("the passwords match")
                let UUID = response.slice(7);
                localStorage.setItem("UUID", UUID);
                // Set the URL of the new page
                var newUrl = 'library';

                // Change the page
                window.location.href = newUrl;
                //var storedString = localStorage.getItem("UUID");
                //at this point we are interested in finding the right way to store it in local storage so that we can use this  as the main identifier going forward
                
            } else {
                if (response == "password doesnt match") {
                    console.error("password doesnt match");
                    let formErrorMessageContainer = document.getElementById("formErrorMessageContainer");
                    let formErrorMessage = document.getElementById("formErrorMessage");
                    
                    formErrorMessageContainer.style.display = "block";
                    formErrorMessage.innerHTML = "the password is incorrect";
                    
                    //ask the user to try the password again
                }
                else {
                    console.error(response);
                }
            }
        }
    };
    
    httpc.send(data);
    
}
 

function getDataLogin(form) {
  var formData = new FormData(form);

  console.log("get data login called")

  for (var pair of formData.entries()) {
      if (pair[0] == "email") {
          window.email = pair[1]
      }
      if (pair[0] == "password") {
          window.password = pair[1]
      }
      
  }
    
    //checks if the email is unique in the database, and then this function calls a different function which deals with the proceeding things.
    doesEmailExist(email);
    
  
    
    //upload these values to the database
}




function ifEmailDoesExist() {
        
    
    
    //hash the password
    const cyrb53 = (str, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
    var hashedPassword = cyrb53(password);
   
    
    //adding all the data to a form which can be sent to a funtion which sends the data to the DB
    const data = new FormData();
    data.append('hash', hashedPassword);
    data.append('email', email);
    
    checkIfPasswordMatches(data);
    
    //sends the form to the function
    //uploadFormDataToDB(data);
    
}


function main() {
    //add handling for being able to check every so often if the programme should be stopped.
    
    
document.getElementById("signup").addEventListener("submit", function (e) {
  e.preventDefault();
  getDataLogin(e.target);
});
    
}

main();

