function mainHideAndResize() {
    //console.log("hide and resize called");
    
    let songsTableHead = document.getElementById("songsTableHead");
    let songsTableHeadAlbum = document.getElementsByClassName("songs-table-head-album");
    let songsTableHeadArtist = document.getElementsByClassName("songs-table-head-artist");
    
    let songTableAlbum = document.getElementsByClassName("song-table-album");
    let songsTableArtist = document.getElementsByClassName("song-table-artist");
    let songsRecord = document.getElementsByClassName("song-record");
    
    
    
    //when the window size changes, call the function
    window.addEventListener('resize', resizeAndHide);
    function resizeAndHide() {
        var bodyRect = document.querySelector('#main').getBoundingClientRect();
        var bodyLeft = bodyRect.left
        var bodyRight = bodyRect.right
        var bodyWidth = bodyRight - bodyLeft
        //console.log("the window has been resized, ", bodyWidth)
        
        if (bodyWidth > 1000) {
            //console.log("greater than 1k")
            
           
            
            //the head section
            songsTableHead.style.gridTemplateColumns = "4fr 3fr 4fr 6rem";
            for(var i=0; i<songsTableHeadAlbum.length; i++) { 
              songsTableHeadAlbum[i].style.display='block';
            }
            for(var i=0; i<songsTableHeadArtist.length; i++) { 
              songsTableHeadArtist[i].style.display='block';
            }
            
            //the "table" section
            for(var i=0; i<songsRecord.length; i++) { 
              songsRecord[i].style.gridTemplateColumns = "4fr 3fr 4fr 6rem";
            }
            
            for(var i=0; i<songTableAlbum.length; i++) { 
              songTableAlbum[i].style.display='block';
            }
            for(var i=0; i<songsTableArtist.length; i++) { 
              songsTableArtist[i].style.display='block';
            }
            
            
            
            //show all the 4 columns, and set the grid-template-columns: too have 4 values
        }
        else if (bodyWidth < 999 && bodyWidth > 701) {
            //console.log("inbetween 1k and 700")
            
            
            //the head section
            songsTableHead.style.gridTemplateColumns = "5fr 5fr 6rem";
            for(var i=0; i<songsTableHeadArtist.length; i++) { 
              songsTableHeadArtist[i].style.display='block';
            }
            for(var i=0; i<songsTableHeadAlbum.length; i++) { 
              songsTableHeadAlbum[i].style.display='none';
            }
            
            //the "table" section
            for(var i=0; i<songsRecord.length; i++) { 
              songsRecord[i].style.gridTemplateColumns = "5fr 5fr 6rem";
            }
            for(var i=0; i<songTableAlbum.length; i++) { 
              songTableAlbum[i].style.display='none';
            }
            for(var i=0; i<songsTableArtist.length; i++) { 
              songsTableArtist[i].style.display='block';
            }
            
            //songsTableHeadAlbum.style.display = "none"
            //for this one it will only show 3 columns, those being song name, artist and time, and then the grid-template-columns: will have 3 values, removing the one that represents albums
        }
        else if (bodyWidth < 700) {
            //console.log("under 700")
            
            //the head section
            songsTableHead.style.gridTemplateColumns = "1fr 6rem";
            for(var i=0; i<songsTableHeadAlbum.length; i++) { 
              songsTableHeadAlbum[i].style.display='none';
            }
            for(var i=0; i<songsTableHeadArtist.length; i++) { 
              songsTableHeadArtist[i].style.display='none';
            }
            
            //the "table" section
            for(var i=0; i<songsRecord.length; i++) { 
              songsRecord[i].style.gridTemplateColumns = "1fr 6rem";
            }
            for(var i=0; i<songTableAlbum.length; i++) { 
              songTableAlbum[i].style.display='none';
            }
            for(var i=0; i<songsTableArtist.length; i++) { 
              songsTableArtist[i].style.display='none';
            }
            
            
            //this will then also hide the artist column, and how that is represented in grid template comlumns, but then it will also remove the top header and , but only with visibility hidden
            
            //instead it will make the artist name be visible under the song name
        }
        
        
        
    }
    //also on call of the this file, run it so that it can just set everything to be in the proper way initially
    resizeAndHide()
}

function hydrateExpandedMusicObject() {
    //first remove all content from the library page...
    document.getElementById("musicObjectsGridContainer").innerHTML = "";
    document.getElementById("expandedMusicObjectView").innerHTML = "";
    
    let musicObjectsContainer = document.getElementById('musicObjectsGridContainer');
    let expandedMusicObjectView = document.getElementById('expandedMusicObjectView');
    musicObjectsContainer.style.visibility = "hidden";
    musicObjectsContainer.style.position = "absolute";
    expandedMusicObjectView.style.visibility = "visible";
    expandedMusicObjectView.style.position = "relative";
    LoadedMusicObjects = 0;


    function getHashState() {
        var hash = window.location.hash;
        if (hash.startsWith("#")) {
          return hash.slice(1);
        }
        return null;
    }

    var currentHash = getHashState();
    var currentHydrateAlbumID = currentHash;

    //console.log("albumHashID: ", currentHydrateAlbumID);

    //create an async call to the php that returns songsJson for this album ID
    function getSongsForAlbumEPsingle(albumEPsingleID) {
      return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              var response = JSON.parse(xhr.responseText);
              resolve(response.songsJson);
            } else {
              reject(xhr.statusText);
            }
          }
        };
        xhr.open("POST", "getSongsJson.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("albumEPsingleID=" + encodeURIComponent(albumEPsingleID));
      });
    }

    // Example usage
    getSongsForAlbumEPsingle(currentHydrateAlbumID).then(function(songsJsonRow) {
    decodedDataArray = songsJsonRow;


    var EalbumEPsingleID = decodedDataArray["albumEPsingleID"];
    var EalbumEPsong_description = decodedDataArray["albumEPsong_description"];
    var EalbumImageLocation = decodedDataArray["albumImageLocation"];
    var EalbumName = decodedDataArray["albumName"];
    var EartistID = decodedDataArray["artistID"];
    var EartistName = decodedDataArray["artistName"];
    var EdateCreated = decodedDataArray["dateCreated"];
    var EnewLibraryIndex = decodedDataArray["newLibraryIndex"];
    var EsongsJson = decodedDataArray["songsJson"];

    let tabTitleContents = EalbumName + " by " + EartistName + " on Orange Music";
    document.querySelector('title').textContent = tabTitleContents;


    //encode the dataArray
    function base64Encode(str) {
      let base64Table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      let result = '';
      let padding = '';
      let i, j;

      for (i = 0; i < str.length; i += 3) {
        let chunk = (str.charCodeAt(i) << 16) | (str.charCodeAt(i + 1) << 8) | str.charCodeAt(i + 2);

        for (j = 0; j < 4; j++) {
          if (i + j * 0.75 >= str.length) {
            padding += '=';
            result += 'A';
          } else {
            let index = (chunk >> 18 - j * 6) & 0x3F;
            result += base64Table.charAt(index);
          }
        }
      }

      return result.substring(0, result.length - padding.length) + padding;
    }
    const encodedDataArray = base64Encode(JSON.stringify(decodedDataArray));

    
    //first create the top box
    
    let expandedMusicObjectContainer = document.getElementById('expandedMusicObjectView');
    
    
    var coverImage = EalbumImageLocation;
    var objectName = EalbumName;
    var objectCreator = EartistName;
    var objectDescription = EalbumEPsong_description;
    
    var objectID = EalbumEPsingleID;
    var objectType = "TYPEalbumEPsingle";
    
    
    var expandedMusicObjectTop = `
    <div class="expanded-music-object-top-information-area">
        <div class="grid-container">
            <div class="square-1">
                <img src="` + coverImage +`" class="expanded-music-object-big-image"/> 
            </div>
            <div class="square-2">
                <div class="six-rem-high-spacer"></div>
                <div class="mainInfoContentContainerBox">
                    <div class="expanded-music-object-top-bold-text-area">
                        <span class="expanded-music-object-playlist-title">` + objectName + `</span><br>
                        <span class="expanded-music-object-playlist-creator">` + objectCreator + `</span>
                    </div>
                    <div class="one-rem-high-spacer"></div>

                    <div class="expanded-music-object-top-description-container">
                        <div class="expanded-music-object-top-description" id="expandedMusicObjectTopDescription">
                            ` + objectDescription + `
                        </div>
                        <div class="expanded-music-object-view-more-description-button" id="moreButton">
                            <div class="more-description-button-gradient"></div>
                            <div class="more-description-button-black" onclick="window.alert('` + objectDescription + `')">MORE</div>
                        </div>
                    </div>
                    <div class="centreTheButtonsInExpandedMusic">
                    <div class="expanded-music-object-top-button-array">
                        <div class="expanded-music-object-play-button" onclick='ADDnewPlayerArray("` + encodedDataArray +`", "false")'>   <img
                                         src="orangeMusicFiles/assets/iconsv2/play%20button.svg"
                                         alt="play playlist button"
                                         width="10"
                                         id="play button"
                        /><span class="music-object-play-button-spacers">Play</span></div>
                        <div class="expanded-music-object-shuffle-button" onclick='ADDnewPlayerArray("` + encodedDataArray +`", "true")'><img
                                         src="orangeMusicFiles/assets/icons/shuffle%20button.svg"
                                         alt="play playlist shuffled button"
                                         width="13"
                                         id="shuffle button"
                                        /><span class="music-object-play-button-spacers">Shuffle</span></div></div>
                    </div>
                    </div>
                    `
                    + 
                    /*
                    <div class="expanded-music-object-main-context-menu"><span class="onclickClass" onclick="loadContextMenu(this, '` + objectID + `', '` + objectType + `')">
                        <img
                             src="orangeMusicFiles/assets/icons/menu%20options%20button.svg"
                             alt="menu button"
                             width="15"
                         />
                    </span></div>*/
                    `
                </div>
            </div>
        </div>


    </div>


   `

    expandedMusicObjectContainer.innerHTML = expandedMusicObjectTop;
    const myDiv = document.getElementById('expandedMusicObjectTopDescription');
    console.log(" description box height:  ", myDiv.scrollHeight);
    if (myDiv.clientHeight < myDiv.scrollHeight) {
      console.log('Div is overflowing with text');
      moreButton.style.display = "flex";
    } else {
      console.log('Div is not overflowing');
      moreButton.style.display = "none";
    }
    
    //then fill in the table
    //top first

    var songInfoContainerHTML = "<div class='song-info-container' id='songInfoContainer'></div>"
    expandedMusicObjectContainer.innerHTML += songInfoContainerHTML;
    let songInfoContainer = document.getElementById('songInfoContainer');

    var expandedMusicObjectTableTop = `
  <div class="main-expanded-object-view-area-song-container">
      <div class="songs-table-head" id="songsTableHead">
          <div class="songs-table-head-song">Song</div>
          <div class="songs-table-head-artist">Artist</div>
          <div class="songs-table-head-album">Album</div>
          <div class="songs-table-head-time">Time</div>
      </div>`


    songInfoContainer.innerHTML += expandedMusicObjectTableTop
    
    
    // the variable that contains all the data for here EsongsJson
    var decodedSongs = JSON.parse(EsongsJson);

    const songsArray = [];

    for (const key in decodedSongs) {
        //console.log(key + ': ' + decodedSongs[key]);
        songsArray.push(decodedSongs[key]);
    }

    //console.log("songsArray: ", songsArray);

    //console.log(decodedSongs[0]);

    var counter = 0
    var counterTarget = songsArray.length;
    
    while (counter < counterTarget) {
        //console.log(songsArray[counter][0]);
        var songImage = EalbumImageLocation;
        var songName = songsArray[counter][0];
        var songArtist = EartistName;
        var songAlbum = EalbumName;
        var songDuration = songsArray[counter][2];
        
        if(counter % 2==0){

           //The number is even
            var backgroundTransparent = "";
        }
        else {
            var backgroundTransparent = 'style="background-color:transparent;"';
           //The number is odd
        }
        
        
        var expandedMusicObjectTableRow = `
<div class="songs-table">
  <div class="song-record"` + backgroundTransparent +`>
      <div class="song-table-song">
        <img src="` + songImage + `" class="song-table-image">
        <span class="song-table-song-span">` + songName + `</span>
      </div>
      <div class="song-table-artist">` + songArtist + `</div>
      <div class="song-table-album">` + songAlbum + `</div>
      <div class="song-table-time"><span>` + formatTime(songDuration) + `</span><span class="access-menu-for-song-song-table" onclick="loadContextMenu(this, ` + EalbumEPsingleID + `', 'TYPEsong')">
        <img
             src="orangeMusicFiles/assets/icons/menu%20options%20button.svg"
             alt="menu button"
             width="13"
         />
    </span></div></div></div>` 
        
        songInfoContainer.innerHTML += expandedMusicObjectTableRow
        
        counter ++
    }
    songInfoContainer.innerHTML += "</div>"
    
    var head = document.getElementsByTagName('HEAD')[0];

    // Create new link Element
    var link = document.createElement('link');


    // Append link element to HTML head
    head.appendChild(link);
    
    //call hide and resize
    mainHideAndResize()

    }).catch(function(error) {
      console.error("Error getting songs:", error);
    });

    /*

    
    */
    
}

//hydrateExpandedMusicObject()
