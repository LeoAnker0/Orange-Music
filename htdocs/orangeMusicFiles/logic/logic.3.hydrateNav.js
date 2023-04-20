function hydrateNav() {
    
    //counter here is valid, but the counter target should be the amount of playlists that there are in the users library, rather than a set number like 30
    
    //sets the content of the playlist container to be the single hint
    let playlistHint = `<li class="nav-item" id="nav-link"><a class="nav-link-hint"><span class="link-text-hint">Playlists</span></a></li>`
    document.getElementById("playlistContainer").innerHTML = playlistHint
    
    var counter = 0
    var counterTarget = 30
     
    while (counter < counterTarget) {
        var playlistTitle = "playlist title if it was" + counter

        var playlistItem = `
<li class="nav-item">
    <a href="#" class="nav-link">
      <span class="link-text">` + playlistTitle + `</span>
      <div class="navbar-nav-item-svg-locator-playlists">
          <div class="svg-image-buttons-relative-container">
              <div class="svg-image-buttons-absolute-container">
                <img
                     src="orangeMusicFiles/assets/icons/playlist.svg"
                     height="15"
                     alt="playlist icon"
                 />
              </div>

          </div>
      </div>
  </a>
</li>`
        counter += 1
        
        document.getElementById("playlistContainer").innerHTML += playlistItem
    }
}

hydrateNav()