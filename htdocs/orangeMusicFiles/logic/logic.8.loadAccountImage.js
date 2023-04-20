function getUsersProfilePicAddress(uuid) {
	//console.log("running getUserProfilePic")
    var httpc = new XMLHttpRequest(); // simplified for clarity
    var url = "orangeMusicFiles/logic/getUserProfilePic.php";
    httpc.open("POST", url, true); // sending as POST

    httpc.onreadystatechange = function() { //Call a function when the state changes.

        if(httpc.readyState == 4 && httpc.status == 200) { // complete and no errors
            //console.log("after beeing sent");
            //console.log(httpc.responseText); 
            
            
            if (httpc.responseText != "error") {
            	//console.log("not an error")
            	var user_picture_location = httpc.responseText;
            	//console.log(user_picture_location);

            	//change the src of the img
            	var profilePicId = document.getElementById("accountProfilePicImageID");
            	profilePicId.src = user_picture_location;

            }

            else {
                console.error("there was an error... ??? *spooky*"); 
                //return false;
            }
           
        }
    };
    
    const data = new FormData();
    data.append('uuid', uuid);
    httpc.send(data);
}

function main() {
	var uuid = localStorage.getItem('UUID');

	//console.log(uuid, "from the get account image")

	getUsersProfilePicAddress(uuid)

}

main()