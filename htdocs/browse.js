/* 
JS for creating the music objects, and then hydrating them with dynamic data


*/


async function getValueFromDatabaseBrowse(libraryIndex) {

    async function getItemsInCatalogue() {
      try {
        const response = await fetch('getNoItemsInLibraryBrowse.php');
        const data = await response.json();
        const myVar = data;
        return myVar;
      } catch (error) {
        console.error(error);
      }
    }

    const rows = await getItemsInCatalogue();
    //console.log(rows); // Outputs "Hello world!"

    // Return the retrieved value
    return rows;
}

async function getLibraryItemFromDatabaseBrowse(libraryIndex) {
    // Make a request to the server to retrieve the value
    //console.warn("get libraryItem from getLibraryItemFromDatabase")


    const response = await fetch('libraryBrowse.php', {
        method: 'POST',
        body: JSON.stringify({ libraryIndex: libraryIndex}),
        headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();

    // Return the retrieved value
    return data.libraryItem;
}

async function getNoItemsInLibrary() {
  //console.log("async function get items in library()")
  // Wait for the value to be retrieved from the database
  const number = await getValueFromDatabaseBrowse(libraryIndex);

  //console.log(`The number of items in the library associated with UUID ${uuid} is ${number}`);

  // Return the retrieved value
  return number;
}


function buildMusicBrowseObject(CounterStart) {
    //really in this object is should be so that the counter variable naming class was given something more meaningful, however it is that now, and i think it is fine to leave it at that
    
    //counterMax will be the value for if the user has only that many objects in thier library, so in this way we don't get errors with more objects being loaded into the DOM, than there are actual objects in the users library also there may be performance reasons for only loading the most recent 100, as well as the fact that at that point it might be more slow for the user, and then they should really just search for it, or use some of the other types of search, IE albums, songs, artists, rather than *just* recently added
    //find out how many songs a user has in their library.

    getNoItemsInLibrary().then((number) => {
    // Use the retrieved value here
    var noInLibrary = number;
    //console.log("noInLibrary", noInLibrary);

    //the max amount of musicObjects/tiles that can be loaded in is gotten from the server, by seeing how many songs that user has in their library
    var counterMax = noInLibrary;

    var counter = CounterStart;
    var counterTarget = CounterStart + 14;
     
    if (counterMax < counterTarget) {
        counterTarget = counterMax;
    }

    //console.log(counterTarget);

    async function awaitForMusicObjectReturn() {
        var artistNameUUID = localStorage.getItem("UUID");
        //const libraryItemArray = await getLibraryItems(libraryIndex, artistNameUUID);
        const libraryItemArray = await getLibraryItemFromDatabaseBrowse(libraryIndex);
        //console.log("CurrentLibrary Index = ", libraryIndexValue);


        libraryIndex = libraryItemArray["newLibraryIndex"];

        //console.log(libraryItemArray);

        var RalbumEPsingleID = libraryItemArray["albumEPsingleID"];
        var RalbumEPsong_description = libraryItemArray["albumEPsong_description"];
        var RalbumImageLocation = libraryItemArray["albumImageLocation"];
        var RalbumName = libraryItemArray["albumName"];
        var RartistID = libraryItemArray["artistID"];
        var RartistName = libraryItemArray["artistName"];
        var RdateCreated = libraryItemArray["dateCreated"];
        var RnewLibraryIndex = libraryItemArray["newLibraryIndex"];
        var RsongsJson = libraryItemArray["songsJson"];
        

        //build the music object
        var pictureAddress = RalbumImageLocation;
        var pictureAltValue = RalbumName;
        var musicID = RalbumEPsingleID; //this can be any ID
        var howToHandle = "TYPEbrowse" //the 2 types that a music object can support are: TYPEalbumEPsingle; TYPEplaylist
        var albumName = RalbumName;
        var albumArtist = RartistName;

        //encode the libraryItemArray
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

        const encodedArray = base64Encode(JSON.stringify(libraryItemArray));
        
        //onclick="hydrateExpandedMusicObject('`+encodedArray+`')"

        var musicObject = `<div class="music-objects-grid-item" >

            <!-- onclick event for generating the expanded view, as well as this onclick event needing the playlistID and albumEPsingleID -->
            <div class="music-object-container-box">
                <div class="music-object-picture-container" >
                    <div class="picture-container" onclick="window.history.pushState(null, null, ' ` + "album#" + RalbumEPsingleID + `')"> 
                        <img src="` + pictureAddress +`" class="picture-class" alt="` + pictureAltValue + `">  
                    </div>
                    +
                    `
                    +
                    /*
                    <a href="/album#` +   RalbumEPsingleID +`">
                    <div class="picture-container"> 
                        <img src="` + pictureAddress +`" class="picture-class" alt="` + pictureAltValue + `">  
                    </div>
                    </a>
                    */
                    `
                    <div class="music-object-controls"> 
                        <!-- individual box for the play control -->
                        <div class="music-controls-play">
                            <div class="music-object-blur-border">
                                <div class="music-object-blur-circle"></div>
                            </div>
                            <!-- coloured circle -->
                            <div class="music-controls-coloured-circle"></div>

                            <!-- play icon -->
                            <div class="music-controls-button" onclick='ADDnewPlayerArray("` + encodedArray +`", "false")'>
                                <div class="svg-image-buttons-relative-container">
                                    <div class="svg-image-buttons-absolute-container">
                                        <img
                                         src="orangeMusicFiles/assets/iconsv2/play%20button.2.svg"
                                         height="20"
                                         alt="play button"
                                         />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <!-- individual box for the music menu options -->
                        <div class="music-controls-play">
                            <!-- blurred circle -->
                            <div class="music-object-blur-border"><div class="music-object-blur-circle"></div></div>

                            <!-- coloured circle -->
                            <div class="music-controls-coloured-circle"></div>

                            <!-- menu icon -->
                            <div class="music-controls-button" onclick="loadContextMenu(this, '` + musicID + `', '` + howToHandle +`', '` + encodedArray + `')">
                                <div class="svg-image-buttons-relative-container">
                                    <div class="svg-image-buttons-absolute-container">
                                        <img
                                         src="orangeMusicFiles/assets/icons/menu%20options%20button.svg"
                                         width="15"
                                         class="music-menu-options"
                                         alt="menu icon"
                                         />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- text for the music object -->
                <div class="music-object-text-container">
                    <div class="music-object-text-object-name">
                        ` + albumName + `
                    </div>

                    <div class="music-object-text-object-creator">
                        ` + albumArtist + `
                    </div>
                </div>
            </div>
        </div>`
        //musicObjectsGridContainer
        document.getElementById("musicObjectsGridContainer").innerHTML += musicObject
        
        


        LoadedMusicObjects++;
        return libraryIndex;
    }

    function syncWhileLoop(condition, body, callback) {
      function loop() {
        if (condition()) {
          body().then(() => {
            loop();
          });
        } else {
          callback();
        }
      }
      loop();
    }

    syncWhileLoop(
        () => counter < counterTarget,
        async () => {
            libraryIndex = await awaitForMusicObjectReturn(libraryIndex);
            counter++;
            //libraryIndex--;
      },
      () => console.log("done 1")
    );

    });
    
}

function buildBrowseCatalogue() {
    //make sure that the two containers are empty
    document.getElementById("musicObjectsGridContainer").innerHTML = "";
    document.getElementById("expandedMusicObjectView").innerHTML = "";

    let musicObjectsContainer = document.getElementById('musicObjectsGridContainer');
    let expandedMusicObjectView = document.getElementById('expandedMusicObjectView');
    musicObjectsContainer.style.visibility = "visible";
    musicObjectsContainer.style.display = "grid";
    musicObjectsContainer.style.position = "relative";
    expandedMusicObjectView.style.visibility = "hidden";
    expandedMusicObjectView.style.position = "absolute";

    
    LoadedMusicObjects = 0;
    
    window.libraryIndex = 9999999999999;

    buildMusicBrowseObject(LoadedMusicObjectsBrowse)
    var scrollIncreaseMultiplier = 1
    
    var element = document.getElementById("main")
    element.addEventListener("scroll", function(event)
    {
        var element = event.target;
        
        var scrollHeight = element.scrollHeight
        var scrollTop = element.scrollTop
        var clientHeight = element.clientHeight
        
        
        var scrollHeightMinusTop = Math.floor(scrollHeight - scrollTop)
        //if (scrollHeightMinusTop > )
        
        //console.log(scrollHeightMinusTop, clientHeight)
        if (scrollHeightMinusTop <= clientHeight)
    {
        console.log("hit the bottom");
        buildMusicBrowseObject(LoadedMusicObjects)
        scrollIncreaseMultiplier += 1
    }
});

}




