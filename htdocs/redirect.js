//initial redirector 
//read the pathname
window.onload = function() {
    var currentPath = window.location.pathname;
    //if there is no preexisting path
    function getHashState() {
        var hash = window.location.hash;
        if (hash.startsWith("#")) {
            return hash.slice(1);
        }
        return null;
    }
    //console.log("currentPath: ", currentPath)
    if (currentPath == "/") {
        window.history.pushState(null, null, "library");
        document.getElementById("musicObjectsGridContainer").innerHTML = "";
        document.getElementById("expandedMusicObjectView").innerHTML = "";
        buildLibrary();
    } else if (currentPath == "/library") {
        document.getElementById("musicObjectsGridContainer").innerHTML = "";
        document.getElementById("expandedMusicObjectView").innerHTML = "";
        window.LoadedMusicObjectsBrowse = 0;
        buildLibrary();
    } else if (currentPath == "/album") {
        //document.getElementById("musicObjectsGridContainer").innerHTML = "";
        //document.getElementById("expandedMusicObjectView").style.display = "block";
        document.getElementById("expandedMusicObjectView").style.visibility = "visible";
        //window.LoadedMusicObjects = 0;
        //buildLibrary();
        console.log("load album");

        hydrateExpandedMusicObject();
    } else if (currentPath == "/browse") {
        //document.getElementById("musicObjectsGridContainer").innerHTML = "";
        //document.getElementById("expandedMusicObjectView").innerHTML = "";
        //window.LoadedMusicObjects = 0;
        window.LoadedMusicObjectsBrowse = 0;
        buildBrowseCatalogue();

    } else if (currentPath == "/search") {
        buildSearchBasedOnString(getHashState());
    } else if (currentPath == "/searchPage") {
        buildSearchPageForMobile();
    }

    window.addEventListener("popstate", function(event) {
        if (event.state !== null) {
            console.log("History state has changed to", event.state);
        }
    });
};

//catches all the changes to the url/history
function onHistoryChange(callback) {
    var currentState = getCurrentState();

    function handleStateChange(event) {
        var newState = getCurrentState();
        if (newState !== currentState) {
            currentState = newState;
            callback(currentState);
        }
    }

    function handleHashChange() {
        var newState = getCurrentState();
        if (newState !== currentState) {
            currentState = newState;
            callback(currentState);
        }
    }

    function handlePathChange() {
        var newState = getCurrentState();
        if (newState !== currentState) {
            currentState = newState;
            callback(currentState);
        }
    }

    function getCurrentState() {
        return {
            state: history.state,
            hash: getHashState(),
            path: window.location.pathname
        };
    }

    function getHashState() {
        var hash = window.location.hash;
        if (hash.startsWith("#")) {
            return hash.slice(1);
        }
        return null;
    }

    window.addEventListener("popstate", handleStateChange);
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("pushstate", handlePathChange);
    window.addEventListener("replacestate", handlePathChange);

    return function() {
        window.removeEventListener("popstate", handleStateChange);
        window.removeEventListener("hashchange", handleHashChange);
        window.removeEventListener("pushstate", handlePathChange);
        window.removeEventListener("replacestate", handlePathChange);
    };
}

// Call onHistoryChange with your callback function
onHistoryChange(function(state) {
    //console.log("History state changed to:", state["path"]);
    var currentPath = state["path"];
    var currentHash = state["hash"];
    var parts = currentPath.split("/");
    var partOne = parts[1];
    if (currentPath == "/library") {
        document.getElementById("musicObjectsGridContainer").innerHTML = "";
        document.getElementById("expandedMusicObjectView").innerHTML = "";
        window.LoadedMusicObjects = 0;
        buildLibrary();
    } else if (currentPath == "/album") {
        //document.getElementById("musicObjectsGridContainer").innerHTML = "";
        //document.getElementById("expandedMusicObjectView").innerHTML = "";
        //window.LoadedMusicObjects = 0;
        //buildLibrary();
        hydrateExpandedMusicObject();
    } else if (currentPath == "/browse") {
        //document.getElementById("musicObjectsGridContainer").innerHTML = "";
        //document.getElementById("expandedMusicObjectView").innerHTML = "";
        //window.LoadedMusicObjects = 0;
        //buildLibrary();
        window.LoadedMusicObjectsBrowse = 0;
        buildBrowseCatalogue();

    } else if (currentPath == "/search") {
        //document.getElementById("musicObjectsGridContainer").innerHTML = "";
        //document.getElementById("expandedMusicObjectView").innerHTML = "";
        //window.LoadedMusicObjects = 0;
        //buildLibrary();
        buildSearchBasedOnString(currentHash);

    } else if (currentPath == "/searchPage") {
        buildSearchPageForMobile();
    }
});


// Override pushState() method to trigger custom event
const originalPushState = history.pushState;
history.pushState = function(state) {
    originalPushState.apply(this, arguments);
    const event = new Event('pushstate');
    event.state = state;
    window.dispatchEvent(event);
};