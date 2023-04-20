// currently nothing here, but eventually this will be the javascript file that is responsible for assuring account stuff is all in order, as well as allowing the user to login, this will be the first javascript that loads, or it will be one that the html file will call on body load, so that it can then get the user connected to their account and then also deal with the session variable, IE keeping the user logged in

//the reason for this nesting is that i want this script to recognise if there is a user logged in already, and if they are, then stay logged in and not prompt user for login, and if not, then either get them to sign in or sign up

//console.log("logic for login")


function main() {
    //check if there is something in local storage
    if (localStorage.getItem('UUID') !== null) {
      // The 'uuid' key exists in local storage
      //console.log('UUID exists in local storage');
      var uuid = localStorage.getItem('UUID');

    // Use the retrieved UUID
    //console.log(uuid);

    //now since this is only a a precursor, i don't have to call the other things.

    } else {
      // The 'uuid' key does not exist in local storage
      console.log('UUID does not exist in local storage');

      //and since this means that the user isn't signed in, they will then have to sign in/up.
      //and i do this by calling the login script.
      // Set the URL of the new page
        var newUrl = 'login.html';

        // Change the page
        window.location.href = newUrl
    }

    


}

main()