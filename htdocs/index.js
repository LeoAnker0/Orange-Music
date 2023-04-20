function includeJs(jsFilePath) {
    var js = document.createElement("script");

    js.type = "text/javascript";
    js.src = jsFilePath;

    document.body.appendChild(js);
}

function main() {
    //the logic for signingin/up and staying logged in as well
    includeJs("orangeMusicFiles/logic/logic.first.login.js");
    
    //the logic for the audio player
    includeJs("orangeMusicFiles/logic/logic.0.audioPlayer.js");
    //the logic for the context menus
    includeJs("orangeMusicFiles/logic/logic.1.menu.js");

    //the logic for retrieving the account picture
    includeJs("orangeMusicFiles/logic/logic.8.loadAccountImage.js");
    
    //for the main library view
    window.LoadedMusicObjects = 0
    includeJs("orangeMusicFiles/logic/logic.2.musicObjects.js");
    
    //deals with fleshing out the playlists dropdown, as well as the search bar
    //includeJs("orangeMusicFiles/logic/logic.3.hydrateNav.js");
    includeJs("orangeMusicFiles/logic/logic.5.search.js");
    includeJs("inputDetect.js")

    //for the music object view
    includeJs("orangeMusicFiles/logic/logic.7.hydrateExpandedMusicObject.js");
    //includeJs("orangeMusicFiles/logic/logic.6.hideAndResize.js");

    //for the browse catalogue
    includeJs("browse.js");
    
    //for the redirector
    includeJs("redirect.js");

    //for the add/remove library functions
    includeJs("addOrRemoveFromLibrary.js");

}


main()