/*

there's this wierdo error were it will only allow you to upload a max of 5 songs, before it then only does 2?

*valve, please fix*
*/

const progressBar = document.getElementById('progress');
const status = document.getElementById('status');


function uploadFile(renamedFile, fileName) {
    var httpc = new XMLHttpRequest(); // simplified for clarity
    var url = "songUpload.php";
    httpc.open("POST", url, true); // sending as POST

    httpc.onreadystatechange = function() { //Call a function when the state changes.
        if(httpc.readyState == 4 && httpc.status == 200) { // complete and no errors
            console.log(httpc.responseText)
            if (httpc.responseText != "file upload success") {
                //console.log("file upload successfully");
                console.error(httpc.responseText);  
                throw new Error('Intentional error');
                return
            }
            /*else {

            }*/
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
    data.append('file', renamedFile, fileName);
    httpc.send(data);
}
function uploadImageFile(renamedFile, fileName) {
    var httpc = new XMLHttpRequest(); // simplified for clarity
    var url = "imageUpload.php";
    httpc.open("POST", url, true); // sending as POST

    httpc.onreadystatechange = function() { //Call a function when the state changes.
        if(httpc.readyState == 4 && httpc.status == 200) { // complete and no errors
            console.log(httpc.responseText)
            if (httpc.responseText != "file upload success") {
                //console.log("file upload successfully");
                console.error(httpc.responseText);  
                throw new Error('Intentional error');
                return
            }
            /*else {

            }*/
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
    data.append('file', renamedFile, fileName);
    httpc.send(data);
}

/*
function getUsernameFromUuid(uuid, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "getUsername.php");
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onload = function() {
    if (xhr.status === 200) {
      const username = JSON.parse(xhr.responseText).username;
      callback(username);
    } else {
      callback(null);
    }
  };
  xhr.send(uuid);
}
*/
function getUsernameFromUuid(uuid, callback) {
  // Define the URL of the PHP file
  var url = "getUsername.php";

  // Define the string to be sent in the request body
  var data = uuid;

  // Create an XHR object
  var xhr = new XMLHttpRequest();

  // Set up the callback function to handle the response
  xhr.onload = function() {
    if (xhr.status === 200) {
      callback(xhr.responseText);
    }
  };

  // Open the request
  xhr.open("POST", url, true);

  // Set the Content-Type header to indicate the type of data being sent
  xhr.setRequestHeader("Content-Type", "text/plain");

  // Send the request with the data in the request body
  xhr.send(data);
}

function uploadAlbumDataToDB(data) {
    var httpc = new XMLHttpRequest(); // simplified for clarity
    var url = "albumDataUpload.php";
    httpc.open("POST", url, true); // sending as POST

    httpc.onreadystatechange = function() { //Call a function when the state changes.
        if(httpc.readyState == 4 && httpc.status == 200) { // complete and no errors
          var response = httpc.responseText;
          console.log("response from php for uploadAlbumDataToDB", response);
        }
    };
    httpc.send(data);
    
}

function addToUsersLibrary(artistID, albumEPsingleID) {
  var httpc = new XMLHttpRequest(); // simplified for clarity
  var url = "addToUsersLibrary.php";
  httpc.open("POST", url, true); // sending as POST

  httpc.onreadystatechange = function() { //Call a function when the state changes.
      if(httpc.readyState == 4 && httpc.status == 200) { // complete and no errors
          console.log(httpc.responseText)
          /*
          if (httpc.responseText != "file upload success") {
              //console.log("file upload successfully");
              console.error(httpc.responseText);  
              throw new Error('Intentional error');
              return
          }*/
          /*else {

          }*/
      }
  };
  var date = Date.now()
  const data = new FormData();
  data.append("artistID", artistID);
  data.append("albumEPsingleID", albumEPsingleID);
  data.append("date", date);
  httpc.send(data);

}



const form = document.getElementById("albumForm");

function getFileExtension(file) {
  const parts = file.name.split(".");
  if (parts.length === 1) {
    return "";
  }
  return parts.pop().toLowerCase();
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const albumName = form.elements.albumName.value;
  const albumDescription = form.elements.albumDescription.value
  const albumImage = form.elements.albumImage.files[0];
  const songs = [];

  //initialise the json object that contains all the songs data
  const songsJsonObject = {};

  console.log("form elements length", form.elements.length)
  for (let i = 0; i < form.elements.length; i++) {
    const element = form.elements[i];

    if (element.name.startsWith("songName_")) {
      const index = element.name.split("_")[1];
      const songName = element.value;
      const songFile = element.nextElementSibling.files[0];

      const audio = document.createElement("audio");
      audio.src = URL.createObjectURL(songFile);
      audio.addEventListener("loadedmetadata", function() {
        const duration = audio.duration;
          
          //do song upload here
          
          //naming the new file in a proper way
          var fileExtension = "." + getFileExtension(songFile);
          //console.log("the file extension of the song", fileExtension)
          var uuid = self.crypto.randomUUID();


          var newMusicLocation = "music/" + uuid + fileExtension; 

          uploadFile(songFile, newMusicLocation);
          //file: songFile,

        const prefix = self.crypto.randomUUID();
        const arrayName = prefix + i;
        songsJsonObject[arrayName] = [songName, newMusicLocation, duration];
        //songs.push({ name: songName, musicFileLocation: newMusicLocation, duration: duration });
      });
    }
  }

    //album name and album image ready for processing, I.E. the album name stays the same and then the album image would be uploaded to the server and then i would get a new variable called albumImageLocation, which would then be added to the database with album name and the json file
  //console.log(albumName);
  //upload the album image and then get a new albumimage location
  //console.log(albumImage);
    //do song upload here
  
  //naming the new file in a proper way
  var fileExtension = "." + getFileExtension(albumImage);
  var uuid = self.crypto.randomUUID();
  var newAlbumImageLocation = "pictures/" + uuid + fileExtension; 
  uploadImageFile(albumImage, newAlbumImageLocation);

  //console.log(newAlbumImageLocation)
  
  //get artist name from artist UUID
  var artistNameUUID = localStorage.getItem("UUID");
  //console.log("artist UUID", artistNameUUID)

  // getting the artists username
  getUsernameFromUuid(artistNameUUID, function(responseText) {
    artistName = responseText

    //console.log(artistName);

    //album id
    var albumEPsingleID = self.crypto.randomUUID();

    //date created
    var dateCreated = Date.now()

    /*album name                | x
      album id                  | x
      artist name               | x
      artist id                 | x
      album picture location    | x
      song audio file location  | x
      date created              


      time to upload the json that will contain the song infos
      and then the fields which are 
      album name
      album id
      artist name
      artist id
      album picture location

      initialise sending all this off
    
     */

    // Check if a variable is a JSON object
    function isJson(str) {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    }

    //console.log(songsJsonObject);
    //console.log("is songsJsonObject a json?", isJson(songsJsonObject));


    const albumInformation = new FormData();
    albumInformation.append('albumName', albumName);
    albumInformation.append('albumEPsingleID', albumEPsingleID);
    albumInformation.append('albumDescription', albumDescription)
    albumInformation.append('artistName', artistName);
    albumInformation.append('artistID', artistNameUUID);
    albumInformation.append('albumImageLocation', newAlbumImageLocation);
    albumInformation.append('dateCreated', dateCreated);
    //albumInformation.append('songsJson', JSON.stringify(songs));
    albumInformation.append('songsJson', JSON.stringify(songsJsonObject));

    //transfer to a function that sends it all off to the DB

    console.log("json", JSON.stringify(songsJsonObject))

    //console.log(songs)
    uploadAlbumDataToDB(albumInformation);

    //add this song albumEPid to the uploaders library
    addToUsersLibrary(artistNameUUID, albumEPsingleID);

});
  
    
    
});




const addSongButton = document.getElementById("addSong");

addSongButton.addEventListener("click", function(event) {
  event.preventDefault();

  const songs = document.getElementById("songs");
  const songCount = songs.children.length;
  const songDiv = document.createElement("div");
  songDiv.classList.add("song");

  const songNameInput = document.createElement("input");
  songNameInput.type = "text";
  songNameInput.name = `songName_${songCount}`;
  songNameInput.placeholder = "Song Name";
  songNameInput.required = true;

  const songFileInput = document.createElement("input");
  songFileInput.type = "file";
  songFileInput.name = `songFile_${songCount}`;
  songFileInput.accept = "audio/*";
  songFileInput.required = true;

  const removeSongButton = document.createElement("button");
  removeSongButton.type = "button";
  removeSongButton.textContent = "Remove Song";

  removeSongButton.addEventListener("click", function(event) {
    event.preventDefault();
    songDiv.remove();
  });

  songDiv.appendChild(songNameInput);
  songDiv.appendChild(songFileInput);
  songDiv.appendChild(removeSongButton);
  songs.appendChild(songDiv);
});