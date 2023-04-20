/* JS for the search bar --------------------------------------------------------------------- */
const clearIcon = document.querySelector(".clearIcon");
const searchBar = document.querySelector(".search");

searchBar.addEventListener("keyup", () => {
if(searchBar.value && clearIcon.style.visibility != "visible"){
  clearIcon.style.visibility = "visible";
} else if(!searchBar.value) {
  clearIcon.style.visibility = "hidden";
}   
});

clearIcon.addEventListener("click", () => {
searchBar.value = "";
clearIcon.style.visibility = "hidden";
})




const inputField = document.getElementById("searchBar");
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    const inputContents = inputField.value;
    //console.log(inputContents);
    searchPath = "search#" + inputContents;
    window.history.pushState(null, null, searchPath);
    document.getElementById("musicObjectsGridContainer").innerHTML = "";
    document.getElementById("expandedMusicObjectView").innerHTML = "";
    document.getElementById("expandedMusicObjectView").style.visibility = "hidden";
      

      }
});



function buildSearchBasedOnString(string) {

    const inputContents = string

    document.getElementById("musicObjectsGridContainer").innerHTML = "";
    document.getElementById("expandedMusicObjectView").innerHTML = "";
    document.getElementById("expandedMusicObjectView").style.visibility = "hidden";
    const data = new FormData();
    data.append("searchTerm", inputContents);

    var httpc = new XMLHttpRequest(); // simplified for clarity
    var url = "fuzzySearch.php";
    httpc.open("POST", url, true); // sending as POST
    inputField.value = "";
    httpc.onreadystatechange = function() { //Call a function when the state changes.
        if(httpc.readyState == 4 && httpc.status == 200) { // complete and no errors
          var response = httpc.responseText;
          if (response == "null") {
            console.log("there were no results");
            document.getElementById("musicObjectsGridContainer").innerHTML = "<h1>There were no results</h1>";
          } else {
           var resultArray = JSON.parse(response);
           resultArray.forEach(function(element) {
              //console.log(element);
              document.getElementById("musicObjectsGridContainer").style.display = "grid";
              document.getElementById("musicObjectsGridContainer").style.visibility = "visible";



        var RalbumEPsingleID = element["albumEPsingleID"];
        var RalbumEPsong_description = element["albumEPsong_description"];
        var RalbumImageLocation = element["albumImageLocation"];
        var RalbumName = element["albumName"];
        var RartistID = element["artistID"];
        var RartistName = element["artistName"];
        var RdateCreated = element["dateCreated"];
        var RsongsJson = element["songsJson"];
        

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

        const encodedArray = base64Encode(JSON.stringify(element));
        
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
       
            });


          }
        }
    };
    httpc.send(data);
      
}


function buildSearchPageForMobile() {
  console.log("build mobiloe serach paeg caleld")
  document.getElementById("musicObjectsGridContainer").innerHTML = "";
  document.getElementById("expandedMusicObjectView").innerHTML = "";
  document.getElementById("expandedMusicObjectView").style.visibility = "hidden";
  var searchPageHtml = `
  <!-- search bar -->
  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
          <div class="search-bar-wrapper">
                <!-- ignore the label, it's for accessibility -->
                <label for="searchBar2" class="hideLabels">Search Bar</label>
                <input class="search" placeholder="Search" type="text" id="searchBarTwo">
            
            <img class="search-icon" src="orangeMusicFiles/assets/icons/search%20icon.svg" alt="search icon"/>
            <img class="clearIcon" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxLjk3NiA1MS45NzYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxLjk3NiA1MS45NzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPGc+Cgk8cGF0aCBkPSJNNDQuMzczLDcuNjAzYy0xMC4xMzctMTAuMTM3LTI2LjYzMi0xMC4xMzgtMzYuNzcsMGMtMTAuMTM4LDEwLjEzOC0xMC4xMzcsMjYuNjMyLDAsMzYuNzdzMjYuNjMyLDEwLjEzOCwzNi43NywwICAgQzU0LjUxLDM0LjIzNSw1NC41MSwxNy43NCw0NC4zNzMsNy42MDN6IE0zNi4yNDEsMzYuMjQxYy0wLjc4MSwwLjc4MS0yLjA0NywwLjc4MS0yLjgyOCwwbC03LjQyNS03LjQyNWwtNy43NzgsNy43NzggICBjLTAuNzgxLDAuNzgxLTIuMDQ3LDAuNzgxLTIuODI4LDBjLTAuNzgxLTAuNzgxLTAuNzgxLTIuMDQ3LDAtMi44MjhsNy43NzgtNy43NzhsLTcuNDI1LTcuNDI1Yy0wLjc4MS0wLjc4MS0wLjc4MS0yLjA0OCwwLTIuODI4ICAgYzAuNzgxLTAuNzgxLDIuMDQ3LTAuNzgxLDIuODI4LDBsNy40MjUsNy40MjVsNy4wNzEtNy4wNzFjMC43ODEtMC43ODEsMi4wNDctMC43ODEsMi44MjgsMGMwLjc4MSwwLjc4MSwwLjc4MSwyLjA0NywwLDIuODI4ICAgbC03LjA3MSw3LjA3MWw3LjQyNSw3LjQyNUMzNy4wMjIsMzQuMTk0LDM3LjAyMiwzNS40NiwzNi4yNDEsMzYuMjQxeiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" 
            alt="clear icon"
                 />
          
        </div>

   `
   document.getElementById("musicObjectsGridContainer").innerHTML = searchPageHtml;

   const inputFieldTwo = document.getElementById("searchBarTwo");
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    const inputContents = inputFieldTwo.value;
    console.log(inputContents);
    searchPath = "search#" + inputContents;
    window.history.pushState(null, null, searchPath);
    document.getElementById("musicObjectsGridContainer").innerHTML = "";
    document.getElementById("expandedMusicObjectView").innerHTML = "";
    document.getElementById("expandedMusicObjectView").style.visibility = "hidden";
      
     }
});

}