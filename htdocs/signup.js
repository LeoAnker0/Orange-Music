const progressBar = document.getElementById('progress');
const status = document.getElementById('status');

function uploadFile(renamedFile, fileName) {
    var httpc = new XMLHttpRequest(); // simplified for clarity
    var url = "imageUpload.php";
    httpc.open("POST", url, true); // sending as POST

    httpc.onreadystatechange = function() { //Call a function when the state changes.
        if(httpc.readyState == 4 && httpc.status == 200) { // complete and no errors
            if (httpc.responseText == "file upload success") {
                //console.log("file upload successfully");
            }
            else {
                let formErrorMessageContainer = document.getElementById("formErrorMessageContainer");
                let formErrorMessage = document.getElementById("formErrorMessage");

                formErrorMessageContainer.style.display = "block";
                formErrorMessage.innerHTML = httpc.responseText;
                console.log(httpc.responseText);  
                throw new Error('Intentional error');
                return

            }
        }
    };
    
    const data = new FormData();
    data.append('file', renamedFile, fileName);
    httpc.send(data);
}

function checkEmailUnique(email) {
    var httpc = new XMLHttpRequest(); // simplified for clarity
    var url = "checkEmailUnique.php";
    httpc.open("POST", url, true); // sending as POST

    httpc.onreadystatechange = function() { //Call a function when the state changes.
            console.log("on ready state");

        if(httpc.readyState == 4 && httpc.status == 200) { // complete and no errors
                //console.log("after beeing sent");

            if (httpc.responseText == "email already exists") {
                console.log("email already exists, try logging in?");
                let formErrorMessageContainer = document.getElementById("formErrorMessageContainer");
                let formErrorMessage = document.getElementById("formErrorMessage");

                formErrorMessageContainer.style.display = "block";
                formErrorMessage.innerHTML = httpc.responseText;
                //return false;
            }
            else if (httpc.responseText == "email free") {
                //console.log("the email is free, go right ahead");
                //return true;
                
                //call the next function
                ifEmailsAreUnique();
                
            }
            else {
                console.log(httpc.responseText); 
                //return false;
            }
           
        }
    };

    // Add an event listener to the XMLHttpRequest object's progress event
  httpc.upload.addEventListener('progress', function(e) {
    // Calculate the percentage of the file that has been uploaded
    const percent = Math.round((e.loaded / e.total) * 100);

    // Update the progress bar and status message
    progressBar.style.display = 'block';
    progressBar.style.width = percent + '%';
    status.innerHTML = 'Uploading... ' + percent + '%';
  });
    
    const data = new FormData();
    data.append('email', email);
    httpc.send(data);
}

function uploadFormDataToDB(data) {
    var httpc = new XMLHttpRequest(); // simplified for clarity
    var url = "signup.php";
    httpc.open("POST", url, true); // sending as POST

    httpc.onreadystatechange = function() { //Call a function when the state changes.
        if(httpc.readyState == 4 && httpc.status == 200) { // complete and no errors
            
            if (httpc.responseText == "Record added successfully") {
                
                console.log("new user has been added, perhaps trigger a launching of the user sign in page");
                // Set the URL of the new page
                var newUrl = 'login.html';

                // Change the page
                //window.location.href = newUrl;

                let formErrorMessageContainer = document.getElementById("formErrorMessageContainer");
                let formErrorMessage = document.getElementById("formErrorMessage");

                formErrorMessageContainer.style.display = "block";
                formErrorMessage.innerHTML = "press the log in button";
            }
            else {
                //if the operation wasn't successful.
                console.log(httpc.responseText);  
                let formErrorMessageContainer = document.getElementById("formErrorMessageContainer");
                let formErrorMessage = document.getElementById("formErrorMessage");

                formErrorMessageContainer.style.display = "block";
                formErrorMessage.innerHTML = httpc.responseText;
            }
        }
    };
    httpc.send(data);
    
}
 

function getDataSignup(form) {
    let formErrorMessageContainer = document.getElementById("formErrorMessageContainer");
    formErrorMessageContainer.style.display = "none";
  var formData = new FormData(form);

  for (var pair of formData.entries()) {
      if (pair[0] == "username") {
          window.username = pair[1]
      }
      if (pair[0] == "password") {
          window.password = pair[1]
      }
      if (pair[0] == "file") {
          window.file = pair[1]
      }
      if (pair[0] == "email") {
          window.email = pair[1]
      }
      if (pair[0] == "description") {
          window.description = pair[1]
      }
      
  }
    
    //checks if the email is unique in the database, and then this function calls a different function which deals with the proceeding things.
    checkEmailUnique(email);
    
  
    
    //upload these values to the database
}




function ifEmailsAreUnique() {
        
    console.log("if emails are unique");
    
    
    //console.log(username);
    //console.log(password);
    //console.log(file);
    //console.log(email);
    //console.log(description);
    
    //rename the file with a uuid
    //perhaps in future add redundancy for different file types by adding an if statement for the file type or something else?
    var uuid = self.crypto.randomUUID();
    var blob = file.slice(0, file.size, 'image/jpg'); 
    var renamedFile = new File([blob], uuid + ".jpg", {type: 'image/jpg'});
    var fileName = uuid + ".jpg";
    
    //this is the file path that will be uploaded to the DB
    var newFilePath = './pictures/' + fileName;
    
    //call the upload file function
    uploadFile(renamedFile, fileName);
    
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
    
    //get another UUID for the user id and a 
    var id = self.crypto.randomUUID();
    //get the current time in unix millies
    var joinDate = Date.now();
    
   //upload these values to the database
    
    //adding all the data to a form which can be sent to a funtion which sends the data to the DB
    const data = new FormData();
    data.append('username', username);
    data.append('hash', hashedPassword);
    data.append('filePath', newFilePath);
    data.append('email', email);
    data.append('description', description);
    data.append('id', id);
    data.append('joinDate', joinDate);
    
    //sends the form to the function
    uploadFormDataToDB(data);
    
}





document.getElementById("signup").addEventListener("submit", function (e) {
  e.preventDefault();
  getDataSignup(e.target);
});
