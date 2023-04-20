function removeAlbumFromLibrary(albumEPsingleID) {
	uuid = localStorage.getItem("UUID");

	var httpc = new XMLHttpRequest(); // simplified for clarity
	var url = "removeAlbumFromLibrary.php";
	httpc.open("POST", url, true); // sending as POST

	httpc.onreadystatechange = function() { //Call a function when the state changes.
	  if(httpc.readyState == 4 && httpc.status == 200) { // complete and no errors
	      console.log(httpc.responseText)
	      document.getElementById('shadowDOM').style.display = "none";
    document.getElementById('shadowMenuPopup').style.display = "none";
    document.getElementById('shadowMenuPopupPlaylist').style.display = "none";
	  	document.getElementById("musicObjectsGridContainer").innerHTML = "";
	    document.getElementById("expandedMusicObjectView").innerHTML = "";
	    window.LoadedMusicObjectsBrowse = 0;
	    buildLibrary();
	  }
	};
	var date = Date.now()
	const data = new FormData();
	data.append("artistID", uuid);
	data.append("albumEPsingleID", albumEPsingleID);
	httpc.send(data);

}

function addAlbumToLibrary(albumEPsingleID) {
	uuid = localStorage.getItem("UUID");

	var httpc = new XMLHttpRequest(); // simplified for clarity
	var url = "addAlbumToLibrary.php";
	httpc.open("POST", url, true); // sending as POST

	httpc.onreadystatechange = function() { //Call a function when the state changes.
	  if(httpc.readyState == 4 && httpc.status == 200) { // complete and no errors
		console.log(httpc.responseText)

		//then hide the popup menu

		//then reload the page
		document.getElementById('shadowDOM').style.display = "none";
	    document.getElementById('shadowMenuPopup').style.display = "none";
	    document.getElementById('shadowMenuPopupPlaylist').style.display = "none";
	  }
	};
	var date = Date.now()
	const data = new FormData();
	data.append("artistID", uuid);
	data.append("albumEPsingleID", albumEPsingleID);
	data.append("date", Date.now());
	httpc.send(data);

}