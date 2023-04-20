/* JS for the pop up context menu(s)  --------------------------------------------------------------------------------------------------------------------------------------- */

// get offset calculates the position of an element
function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}
// function getXY returns the different positions in different formats
function getXY(element) {
     // uses getOffset to find the location of the clicked element
    var x = getOffset(element).left
    var y = getOffset(element).top

    //gets the width and height of the window, so that the position of the context menu can be a %top/%left
    let body = document.querySelector('body')
    let windowWidth = body.offsetWidth;
    let windowHeight = body.offsetHeight;
    return {
        percentX:  Math.round(((x / windowWidth) * 100)*100) /100,
        percentY: Math.round(((y / windowHeight) * 100)*100) /100,
        pixelX: x,
        pixelY: y
    }
  
}

/* contains the HTML for the main context menu, and then squishes it into a variable, so that i can work with it more easily ----------------------------- */
function contextMenuTemplateSquish() {
    // with the power of hydration we should add the ability for when building the list to know if the song/whatever is in your library, and if it isn't then to change the option from remove from library, to add to library
    let contextMenuTemplate = ` 
<div class="popup-context-menu" id="popupID">
    <div class="popup-round-corners">
        <div class="popup-content" id="contextMenuBlur">

            <div class="popup-item">
                Add to Playlist 

                <span class="popup-items-svg">
                    <img
                         src="assets/icons/playlist.svg"
                         height="15"
                         class="music-menu-options"
                         />

                </span>
            </div>
            <div class="popup-item-underline"></div>

            <div class="popup-item" onclick="doDeleteFromLibrary()">
                Delete from Library
            </div>
            <div class="popup-item-underline"></div>
            <div class="popup-item">
                Play next 
                <span class="popup-items-svg">
                    <img
                         src="assets/icons/playlist.svg"
                         height="15"
                         class="music-menu-options"
                         />

                </span>
            </div>
            <div class="popup-item-underline"></div>

            <div class="popup-item">
                Play later 
                <span class="popup-items-svg">
                    <img
                         src="assets/icons/playlist.svg"
                         height="15"
                         class="music-menu-options"
                         />

                </span>
            </div>
            <div class="popup-item-underline"></div>
             <div class="popup-item">
                Love 
                 <span class="popup-items-svg">
                    <img
                         src="assets/icons/playlist.svg"
                         height="15"
                         class="music-menu-options"
                         />

                </span>
            </div>
            <div class="popup-item-underline"></div>

            <div class="popup-item">
                Suggest Less Like This 
                <span class="popup-items-svg">
                    <img
                         src="assets/icons/playlist.svg"
                         height="15"
                         class="music-menu-options"
                         />
                </span>
            </div>
        </div>
    </div>
</div>
`
return {
    contextMenu: contextMenuTemplate   
}
}

// notes for this one include the requirement that it can get data from the database about the different playlists that the user has and then add them as the playlist item and append it, so i imagine we will have a lovely little function that will loop for as many playlists as we have in our library and then append them to the playlistTemplate, and i think the way we do that will be by first loading the playlist menu into HTML, and then after, triggering the appendding of indivual playlist items, since in this way we don't have to mess with our string, and instead we just get to mess with HTML which i guess is worse... but on the other hand it means that we will have to use the "innerHTML += '...' " method rather than just "innerHTML = '...' "

function contextPlaylistTemplateSquish() {
    let contextPlaylistTemplate = `
    <div class="popup-context-playlist" id="popupPlaylistID">
        <div class="popup-round-corners">
            <div class="popup-content" id="playlistContentAppend">
                <div class="playlist-item-wrapper">
                    <div class="popup-playlist-text"> 
                        New Playlist
                    </div>
                    <div class="popup-items-svg-playlist">
                        <img
                         src="assets/icons/derpy.svg"
                         height="15"
                         class="music-menu-options"
                         />
                    </div>
                </div>
                <div class="popup-item-underline"></div>
                <!-- so then below here we would get the other playlists that the user has in thier library -->
            </div>
        </div>
    </div>`
    return {
        contextPlaylist: contextPlaylistTemplate   
    } 
}

function buildPlaylistMenu(x, y) {
    let playlistMenuConstruct = contextPlaylistTemplateSquish().contextPlaylist
    document.getElementById("shadowMenuPopupPlaylist").innerHTML = playlistMenuConstruct
    
    let topValue = "calc(" + ((y) + "px") + " + " + "1.7rem" + ")" 
    let leftValue = "calc(" + ((x) + "px") + " + " + "1.7rem" + ")" 
    document.getElementById("shadowMenuPopupPlaylist").style.top = topValue;
    document.getElementById("shadowMenuPopupPlaylist").style.left = leftValue;
}



/* takes the squished HTML and inserts it into the page, along with then updating the left and top attributes so that it is in the right place in the page */
function buildContextMenu(x, y) {
    let contextMenuConstruct = contextMenuTemplateSquish().contextMenu
    document.getElementById("shadowMenuPopup").innerHTML = contextMenuConstruct
    
    // the two little variables below exist so that i can adjust the positionong of the objects without it being a total pain, and we use calc so that i can work with my preferred rem
    let topValue = "calc(" + ((y) + "px") + " + " + "1.7rem" + ")" 
    let leftValue = "calc(" + ((x) + "px") + " + " + "1.7rem" + ")" 
    document.getElementById("shadowMenuPopup").style.top = topValue;
    document.getElementById("shadowMenuPopup").style.left = leftValue;
}



/* move the context menu so that it doens't overflow out the right

and getting the current xy of the popup

i will achieve this by getting the width of the popup

and then i will find the total width of the viewport

and then move then menu sufficiently, so that it doesn't overflow
*/
function convertRemToPixels(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function movePopupMenu(x, y) {
    let menu = document.querySelector('#popupID')
    let rightEdge = (x + menu.offsetWidth)
    let body = document.querySelector('#shadowDOM')
    let rightCutoff = body.offsetWidth;

    let menuWidth = ((rightEdge - x))
    let leftValue = "calc(" + ((x - menuWidth) + "px") + " + " + "1.7rem" + ")" 
    
    if (rightEdge > rightCutoff) { 
        document.getElementById("shadowMenuPopup").style.left = leftValue;
    }
    
    
    window.popupOverflowing = false
    window.contextMenuY = 0
    
    //if overflow Y...
    var bodyRect = document.querySelector('#shadowDOM').getBoundingClientRect();
    let bottomCutoff = bodyRect.bottom
    var popupRect = document.querySelector('#popupID').getBoundingClientRect();
    
    let popupHeight = document.querySelector('#popupID').scrollHeight
    let popupBottom = popupHeight + popupRect.top
    
    let playlistBottomEstimate = convertRemToPixels(4)
    popupBottom += playlistBottomEstimate
    
    
    if (popupBottom > bottomCutoff) {
        var popupTop = "calc( " + "-" + (popupHeight) + "px" + " - " + " 1.7rem" + ")"
        
        document.getElementById('popupID').style.top = popupTop;
        
        window.popupOverflowing = true
        window.contextMenuY = popupTop
    }
    
    
    return {
        rightEdge: rightEdge   
    } 
    
    
    
    
    
    
    
}

function movePlaylistMenu(x, rightEdgeOfContext) {
    //perparing the different values so that the playlist popup can be positioned in the correct place, if it doesn't overflow
    let contextsRightEdge = rightEdgeOfContext
    let leftValue = "calc(" + contextsRightEdge + "px" + " + " + "1.7rem" + ")"
    let body = document.querySelector('#shadowDOM')
    let rightCutoff = body.offsetWidth;
    
    //initial moving of the popup so that it appears
    document.getElementById("shadowMenuPopupPlaylist").style.left = leftValue;
    
    //find the right edge of the playlist popup, so that if it overflows, it can be moved to a place where it doesn't overflow
    let playlist = document.querySelector('#popupPlaylistID')
    let playlistRightEdge = (leftValue + playlist.offsetWidth)
    
    //find the width of the playlist in px
    var playlistRect = document.querySelector('#popupPlaylistID').getBoundingClientRect();
    let playlistRightEdgeUpdated = playlistRect.right
    let playlistLeftEdgeUpdated = playlistRect.left
    let playlistTop = playlistRect.top
    let playlistWidth = playlistRightEdgeUpdated - playlistLeftEdgeUpdated                                                
    // if it now overflows, it will be moved to the left of the main context menu
    if (playlistRightEdgeUpdated > rightCutoff) {
        // gets the new position where the playlist popup can be moved to
        let contextRect = document.querySelector('#popupID').getBoundingClientRect()
        let xOfContextLeft = contextRect.left
        let newLeftValue = xOfContextLeft - playlistWidth
        
        //moves it to the right place
        document.getElementById("shadowMenuPopupPlaylist").style.left = newLeftValue + "px"
    }
    
    
    if (popupOverflowing === true) {
        var popupRect = document.querySelector('#popupID').getBoundingClientRect();
        
        let popupTop = popupRect.top
        
        
        
        let movePopupToo = "calc( (" + "-" + playlistTop + "px " + " + " + popupTop + "px)" + " - 13rem" + ")"
        
        document.getElementById("popupPlaylistID").style.top = movePopupToo
    }
}

//hydrate playlist meny, basically just fills the playlist menu with the important bits, playlists
function hydratePlaylistMenu() {
    //up here there will be all the connection code required that will get me all the informations from the database into a handy little list, which i will then loop through and plop into place with the current code
    
    //it might be worth including a playlist ID hidden somewhere in here, so that for an on click event it will be possible to then know what playlist you wanted the albumEPsingle/playlist to be added to
    
    var counter = 0
    var counterStop = 30
    while (counter < counterStop) {
        counter += 1
        
        var playListName = "really cool original playlist " + counter
        
        var playlistItemContent = ` 
        <div class="playlist-item-wrapper">
            <div class="popup-playlist-text">` + 
                playListName +
            `</div>
            <div class="popup-items-svg-playlist">
                <img
                     src="assets/icons/playlist.svg"
                     height="15"
                     class="music-menu-options"
                     />
            </div>
        </div>
`
        var playlistItemUnderline = '<div class="popup-item-underline"></div>'
        
        document.getElementById("playlistContentAppend").innerHTML += playlistItemContent
        document.getElementById("playlistContentAppend").innerHTML += playlistItemUnderline
        //if ((counter + 1) < counterStop) {
        //    document.getElementById("playlistContentAppend").innerHTML += playlistItemUnderline
        //}
    }
}


/* gets coordinates, and then builds the context menu, and then i'm still working on it then also being able to remove itself this is the main one -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

function loadContextMenu(element, musicID, howToHandle, encodedSongArray) {
    //redirect to the proper handler of the playlist, there will be duplication of code, because i spaghetti JS, but it will allow for more robust code
    if (howToHandle === "TYPEsong") {
        console.log("it's a song") 
        handleTYPEsong(musicID, element)
    }
    else if (howToHandle === "TYPEalbumEPsingle") {
        //console.log("it's a albumEPsingle type, id = : ", musicID) 
        handleTYPEalbumEPsingle(musicID, element, encodedSongArray)
    }
    else if (howToHandle === "TYPEplaylist") {
        console.log("it's a playlist type") 
        handleTYPEplaylist(musicID, element)
    }
    else if (howToHandle === "TYPEqueue") {
        console.log("it's a queue type") 
        handleTYPEqueue(musicID, element)
    }
    else if (howToHandle === "TYPEbrowse") {
        console.log("it's a browse type") 
        handleTYPEbrowse(musicID, element, encodedSongArray)
    }
    

    
    
    
    /*make the hovered icons below the container visible 
    
    and i will do this by selecting the individual box and then changing the styling for that exact one, too opacity 100
    
    however must remeber to also then set the opacity to 0 when hideshadowDOM is activated
    
    ... a work in progress for later and i have infinte time, also future me, try using focus?
    */
}

/* "hides" the "shadow DOM" so that the user can interact with the website like normally */
function hideShadowDOM() {
    document.getElementById('shadowDOM').style.display = "none";
    document.getElementById("shadowMenuPopup").innerHTML = ""
    document.getElementById("shadowMenuPopupPlaylist").innerHTML = ""
}



/* the diferent handlers for the different ID types, after they have been redirected ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function handleTYPEsong(songID, element) {
    var x = getXY(element).pixelX //pixelX is the pixels from the left
    var y = getXY(element).pixelY //pixelY is the pixels from the top
    
    //make playlist visible
    shadowDOM = document.getElementById('shadowDOM')
    shadowDOM.style.display = "block";
    
    //buildContextMenu(x, y)
    //builuidContextMenu(x, y)
    buildAlbumEPsingleMenu(x, y, songID)
    let rightEdgeofContext = movePopupMenu(x, y).rightEdge
    
    buildPlaylistMenu(x, y)
    movePlaylistMenu(x, rightEdgeofContext)
    hydratePlaylistMenu()
}

function handleTYPEalbumEPsingle(albumEPsingleID, element, encodedSongArray) {
    var x = getXY(element).pixelX //pixelX is the pixels from the left
    var y = getXY(element).pixelY //pixelY is the pixels from the top
    
    //make playlist visible
    shadowDOM = document.getElementById('shadowDOM')
    shadowDOM.style.display = "block";
    
    //buildContextMenu(x, y)
    //builuidContextMenu(x, y)
    buildAlbumEPsingleMenu(x, y, albumEPsingleID, encodedSongArray)
    let rightEdgeofContext = movePopupMenu(x, y).rightEdge

    document.getElementById('shadowDOM').style.display = "block";
    document.getElementById('shadowMenuPopup').style.display = "block";
    document.getElementById('shadowMenuPopupPlaylist').style.display = "block";
    
    //buildPlaylistMenu(x, y)
    //movePlaylistMenu(x, rightEdgeofContext)
    //hydratePlaylistMenu()
}

function buildAlbumEPsingleMenu(x, y, albumEPsingleID, encodedSongArray) {
    
    var deleteFromLibrary = true
    var addOrRemoveHTML = ``
    if (deleteFromLibrary === true) {
        addOrRemoveHTML = `
            <div class="popup-item" onclick="doDeleteFromLibrary()">
                Delete from Library
            </div>`
    }
    else {
         addOrRemoveHTML = `
            <div class="popup-item" onclick="doAddToLibrary()">
                Add to Library
            </div>`
    }
    
    //add an action call for  the remove, play next and play last actions
    var contextMenuConstruct = `
<div class="popup-context-menu" id="popupID">
    <div class="popup-round-corners">
        <div class="popup-content" id="contextMenuBlur">
            ` + /*
            <div class="popup-item">
                Add to Playlist 

                <span class="popup-items-svg">
                    <img
                         src="assets/icons/playlist.svg"
                         height="15"
                         class="music-menu-options"
                         />

                </span>
            </div>*/
            `
            <div class="popup-item-underline"></div>
                 <div class="popup-item" onclick="removeAlbumFromLibrary('` + albumEPsingleID +`')">
                    Delete from Library
                </div>
            <div class="popup-item-underline"></div>
    

            <div class="popup-item" onclick="ADDtoPlayNext('` + encodedSongArray + `', 'false')">
                Play next `+/*
                <span class="popup-items-svg">
                    <img
                         src="assets/icons/playlist.svg"
                         height="15"
                         class="music-menu-options"
                         />

                </span>*/`
            </div>
            <div class="popup-item-underline"></div>

            <div class="popup-item" onclick="ADDtoEndOfQueue('` + encodedSongArray + `', 'false')">
                Play later `+/*
                <span class="popup-items-svg">
                    <img
                         src="assets/icons/playlist.svg"
                         height="15"
                         class="music-menu-options"
                         />

                </span>*/`
            </div>
            `+/*
            <div class="popup-item-underline"></div>
             <div class="popup-item">
                Love 
                 <span class="popup-items-svg">
                    <img
                         src="assets/icons/playlist.svg"
                         height="15"
                         class="music-menu-options"
                         />

                </span>
            </div>
            <div class="popup-item-underline"></div>
           

            <div class="popup-item">
                Suggest Less Like This 
                <span class="popup-items-svg">
                    <img
                         src="assets/icons/playlist.svg"
                         height="15"
                         class="music-menu-options"
                         />
                </span>
            </div>
            */`
        </div>
    </div>
</div>



`
    
    
    // part two --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    document.getElementById("shadowMenuPopup").innerHTML = contextMenuConstruct
    
    // the two little variables below exist so that i can adjust the positionong of the objects without it being a total pain, and we use calc so that i can work with my preferred rem
    let topValue = "calc(" + ((y) + "px") + " + " + "1.7rem" + ")" 
    let leftValue = "calc(" + ((x) + "px") + " + " + "1.7rem" + ")" 
    document.getElementById("shadowMenuPopup").style.top = topValue;
    document.getElementById("shadowMenuPopup").style.left = leftValue;

}
function handleTYPEbrowse(albumEPsingleID, element, encodedSongArray) {
    var x = getXY(element).pixelX //pixelX is the pixels from the left
    var y = getXY(element).pixelY //pixelY is the pixels from the top
    
    //make playlist visible
    shadowDOM = document.getElementById('shadowDOM')
    shadowDOM.style.display = "block";
    
    //buildContextMenu(x, y)
    //builuidContextMenu(x, y)
    buildBrowseMenu(x, y, albumEPsingleID, encodedSongArray)
    let rightEdgeofContext = movePopupMenu(x, y).rightEdge

    document.getElementById('shadowDOM').style.display = "block";
    document.getElementById('shadowMenuPopup').style.display = "block";
    document.getElementById('shadowMenuPopupPlaylist').style.display = "block";
    
    //buildPlaylistMenu(x, y)
    //movePlaylistMenu(x, rightEdgeofContext)
    //hydratePlaylistMenu()
}

function buildBrowseMenu(x, y, albumEPsingleID, encodedSongArray) {
    //add an action call for  the remove, play next and play last actions
    var contextMenuConstruct = `
<div class="popup-context-menu" id="popupID">
    <div class="popup-round-corners">
        <div class="popup-content" id="contextMenuBlur">
            ` + /*
            <div class="popup-item">
                Add to Playlist 

                <span class="popup-items-svg">
                    <img
                         src="assets/icons/playlist.svg"
                         height="15"
                         class="music-menu-options"
                         />

                </span>
            </div>*/
            `
            <div class="popup-item-underline"></div>
                 <div class="popup-item" onclick="addAlbumToLibrary('` + albumEPsingleID +`')">
                    Add to Library
                </div>
            <div class="popup-item-underline"></div>
    

            <div class="popup-item" onclick="ADDtoPlayNext('` + encodedSongArray + `', 'false')">
                Play next `+/*
                <span class="popup-items-svg">
                    <img
                         src="assets/icons/playlist.svg"
                         height="15"
                         class="music-menu-options"
                         />

                </span>*/`
            </div>
            <div class="popup-item-underline"></div>

            <div class="popup-item" onclick="ADDtoEndOfQueue('` + encodedSongArray + `', 'false')">
                Play later `+/*
                <span class="popup-items-svg">
                    <img
                         src="assets/icons/playlist.svg"
                         height="15"
                         class="music-menu-options"
                         />

                </span>*/`
            </div>
            `+/*
            <div class="popup-item-underline"></div>
             <div class="popup-item">
                Love 
                 <span class="popup-items-svg">
                    <img
                         src="assets/icons/playlist.svg"
                         height="15"
                         class="music-menu-options"
                         />

                </span>
            </div>
            <div class="popup-item-underline"></div>
           

            <div class="popup-item">
                Suggest Less Like This 
                <span class="popup-items-svg">
                    <img
                         src="assets/icons/playlist.svg"
                         height="15"
                         class="music-menu-options"
                         />
                </span>
            </div>
            */`
        </div>
    </div>
</div>



`
    
    
    // part two --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    document.getElementById("shadowMenuPopup").innerHTML = contextMenuConstruct
    
    // the two little variables below exist so that i can adjust the positionong of the objects without it being a total pain, and we use calc so that i can work with my preferred rem
    let topValue = "calc(" + ((y) + "px") + " + " + "1.7rem" + ")" 
    let leftValue = "calc(" + ((x) + "px") + " + " + "1.7rem" + ")" 
    document.getElementById("shadowMenuPopup").style.top = topValue;
    document.getElementById("shadowMenuPopup").style.left = leftValue;

}

function handleTYPEplaylist(playlistID, element) {
    var x = getXY(element).pixelX //pixelX is the pixels from the left
    var y = getXY(element).pixelY //pixelY is the pixels from the top
    
    //make playlist visible
    shadowDOM = document.getElementById('shadowDOM')
    shadowDOM.style.display = "block";
    
    buildContextMenu(x, y)
    let rightEdgeofContext = movePopupMenu(x, y).rightEdge
    
    buildPlaylistMenu(x, y)
    movePlaylistMenu(x, rightEdgeofContext)
    hydratePlaylistMenu()
}

function handleTYPEqueue(queueID, element) {
    var x = getXY(element).pixelX //pixelX is the pixels from the left
    var y = getXY(element).pixelY //pixelY is the pixels from the top
    
    //make playlist visible
    shadowDOM = document.getElementById('shadowDOM')
    shadowDOM.style.display = "block";
    
    buildContextMenu(x, y)
    let rightEdgeofContext = movePopupMenu(x, y).rightEdge
    
    buildPlaylistMenu(x, y)
    movePlaylistMenu(x, rightEdgeofContext)
    hydratePlaylistMenu()
}



