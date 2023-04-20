/* JS for the volume control slife */
const rangeInputs = document.querySelectorAll('input[type="range"]')
const numberInput = document.querySelector('input[type="number"]')

function between(x, min, max) {
  return x >= min && x <= max;
}

function handleInputChange(e) {
    let target = e.target
    if (e.target.type !== 'range') {
    target = document.getElementById('volumeRangeSlider')
    } 
    const min = target.min
    const max = target.max
    const volume = target.value

    target.style.backgroundSize = (volume - min) * 100 / (max - min) + '% 100%'
    
    if (between(volume, 0, 1)) {
        document.getElementById('volumeControlZero').style.visibility = 'visible';
        document.getElementById('volumeControlOne').style.visibility = 'hidden';
        document.getElementById('volumeControlTwo').style.visibility = 'hidden';
        document.getElementById('volumeControlThree').style.visibility = 'hidden';
    }
    if (between(volume, 2, 33)) {
        document.getElementById('volumeControlZero').style.visibility = 'hidden';
        document.getElementById('volumeControlOne').style.visibility = 'visible';
        document.getElementById('volumeControlTwo').style.visibility = 'hidden';
        document.getElementById('volumeControlThree').style.visibility = 'hidden';
    }
    if (between(volume, 34, 66)) {
        document.getElementById('volumeControlZero').style.visibility = 'hidden';
        document.getElementById('volumeControlOne').style.visibility = 'hidden';
        document.getElementById('volumeControlTwo').style.visibility = 'visible';
        document.getElementById('volumeControlThree').style.visibility = 'hidden';
    }
    if (between(volume, 67, 100)) {
        document.getElementById('volumeControlZero').style.visibility = 'hidden';
        document.getElementById('volumeControlOne').style.visibility = 'hidden';
        document.getElementById('volumeControlTwo').style.visibility = 'hidden';
        document.getElementById('volumeControlThree').style.visibility = 'visible';
    }

}
rangeInputs.forEach(input => {
    input.addEventListener('input', handleInputChange)
})



// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------     THE JS from our simple audio player pasted in, and this barrier will exist whilst i am trying to integrate it without everything breaking


//Declaring the classes for the queues
class Queue {
    constructor(songTitle, pictureSrc, audioSrc, artistName, duration, songID, played, queueIndex, albumEPsingleName) {
        this.songTitle = songTitle;
        this.pictureSrc = pictureSrc;
        this.audioSrc = audioSrc;
        this.artistName = artistName;
        this.duration = duration;
        this.songID = songID;
        this.played = played;
        this.queueIndex = queueIndex;
        this.albumEPsingleName = albumEPsingleName;
    };
};

function PLAYERdata() {
    window.queueList = [];
};



function ADDnewPlayerArray(songsDataArray, shuffle) {
    //pause the audio
    let playerBarDummy = document.getElementById("lcdBarDummy");
    playerBarDummy.style.display = "none";
    playerBarDummy.style.visibility = "hidden";
    audio.pause();

    //if this function has been triggered with shuffle true then it will shuffle the songsDataArray before it gets added to the queueList

    queueList = [];

    var queueLength = queueList.length;
    var decodedArray = atob(songsDataArray);
    decodedArray = JSON.parse(decodedArray);

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }


    //split decoded array into variables
    var EalbumEPsingleID = decodedArray["albumEPsingleID"];
    var EalbumEPsong_description = decodedArray["albumEPsong_description"];
    var EalbumImageLocation = decodedArray["albumImageLocation"];
    var EalbumName = decodedArray["albumName"];
    var EartistID = decodedArray["artistID"];
    var EartistName = decodedArray["artistName"];
    var EdateCreated = decodedArray["dateCreated"];
    var ElibraryIndex = decodedArray["newLibraryIndex"];
    var EsongsJson = decodedArray["songsJson"];


    //split the songs json into arrays
    var decodedSongs = JSON.parse(EsongsJson);

    var songsArray = [];

    for (const key in decodedSongs) {
        //console.log(key + ': ' + decodedSongs[key]);
        songsArray.push(decodedSongs[key]);
    }
    if (shuffle == "true") {
        songsArray = shuffleArray(songsArray);

    } 

    var counter = 0
    var counterTarget = songsArray.length;
    
    while (counter < counterTarget) {
        console.log(songsArray[counter][0]);
        var songImage = EalbumImageLocation;
        var songName = songsArray[counter][0];
        var songArtist = EartistName;
        var songAlbum = EalbumName;
        var songDuration = songsArray[counter][2];
        var songFileLocation = songsArray[counter][1];

        
        var playerIndex = queueList.length;
        queueList[playerIndex] = new Queue(songName, EalbumImageLocation, songFileLocation, songArtist, songDuration, EalbumEPsingleID, "false", playerIndex, songAlbum);


        counter++;
    }
    hydrateQueue()

    if (queueLength == 0) {
        var currentSong = queueList[0];
        var audioFileSource = currentSong.audioSrc;
        loadNewDetailsTop()
        var source = document.getElementById('PLAYERsource');
        source.src = audioFileSource;
        audio.load();
        PLAYERresumePlayback();

    }/* this is unneccessary, since when this function is triggered it should clear what's in the queue already else {
        PLAYERqueueIndex = queueLength;
        var currentSong = queueList[PLAYERqueueIndex];
        var audioFileSource = currentSong.audioSrc;
        loadNewDetailsTop()
        var source = document.getElementById('PLAYERsource');
        source.src = audioFileSource;
        audio.load();
        PLAYERresumePlayback();

    }*/


    //console.log(queueList);
}

function ADDtoEndOfQueue(songsDataArray, shuffle) {
    //pause the audio
    let playerBarDummy = document.getElementById("lcdBarDummy");
    playerBarDummy.style.display = "none";
    playerBarDummy.style.visibility = "hidden";
    //if this function has been triggered with shuffle true then it will shuffle the songsDataArray before it gets added to the queueList


    var queueLength = queueList.length;
    var decodedArray = atob(songsDataArray);
    decodedArray = JSON.parse(decodedArray);




    //split decoded array into variables
    var EalbumEPsingleID = decodedArray["albumEPsingleID"];
    var EalbumEPsong_description = decodedArray["albumEPsong_description"];
    var EalbumImageLocation = decodedArray["albumImageLocation"];
    var EalbumName = decodedArray["albumName"];
    var EartistID = decodedArray["artistID"];
    var EartistName = decodedArray["artistName"];
    var EdateCreated = decodedArray["dateCreated"];
    var ElibraryIndex = decodedArray["newLibraryIndex"];
    var EsongsJson = decodedArray["songsJson"];


    //split the songs json into arrays
    var decodedSongs = JSON.parse(EsongsJson);

    var songsArray = [];

    for (const key in decodedSongs) {
        //console.log(key + ': ' + decodedSongs[key]);
        songsArray.push(decodedSongs[key]);
    }


    var counter = 0
    var counterTarget = songsArray.length;

    var queueListCurrentIndex = queueList.length;
    
    while (counter < counterTarget) {
        console.log(songsArray[counter][0]);
        var songImage = EalbumImageLocation;
        var songName = songsArray[counter][0];
        var songArtist = EartistName;
        var songAlbum = EalbumName;
        var songDuration = songsArray[counter][2];
        var songFileLocation = songsArray[counter][1];

        
        var playerIndex = queueListCurrentIndex + counter;
        queueList[playerIndex] = new Queue(songName, EalbumImageLocation, songFileLocation, songArtist, songDuration, EalbumEPsingleID, "false", playerIndex, songAlbum);


        counter++;
    }
    hydrateQueue()

    if (queueLength == 0) {
        var currentSong = queueList[0];
        var audioFileSource = currentSong.audioSrc;
        loadNewDetailsTop()
        var source = document.getElementById('PLAYERsource');
        source.src = audioFileSource;
        audio.load();
        //PLAYERresumePlayback();

    }

    document.getElementById('shadowDOM').style.display = "none";
    document.getElementById('shadowMenuPopup').style.display = "none";
    document.getElementById('shadowMenuPopupPlaylist').style.display = "none";

    
}

function ADDtoPlayNext(songsDataArray, shuffle) {
    //pause the audio
    let playerBarDummy = document.getElementById("lcdBarDummy");
    playerBarDummy.style.display = "none";
    playerBarDummy.style.visibility = "hidden";
    //if this function has been triggered with shuffle true then it will shuffle the songsDataArray before it gets added to the queueList


    var queueLength = queueList.length;
    var decodedArray = atob(songsDataArray);
    decodedArray = JSON.parse(decodedArray);




    //split decoded array into variables
    var EalbumEPsingleID = decodedArray["albumEPsingleID"];
    var EalbumEPsong_description = decodedArray["albumEPsong_description"];
    var EalbumImageLocation = decodedArray["albumImageLocation"];
    var EalbumName = decodedArray["albumName"];
    var EartistID = decodedArray["artistID"];
    var EartistName = decodedArray["artistName"];
    var EdateCreated = decodedArray["dateCreated"];
    var ElibraryIndex = decodedArray["newLibraryIndex"];
    var EsongsJson = decodedArray["songsJson"];


    //split the songs json into arrays
    var decodedSongs = JSON.parse(EsongsJson);

    var songsArray = [];

    for (const key in decodedSongs) {
        //console.log(key + ': ' + decodedSongs[key]);
        songsArray.push(decodedSongs[key]);
    }


    var counter = 0
    var counterTarget = songsArray.length;

    var queueListCurrentIndex = PLAYERqueueIndex + 1;

    //the list of the queue before the currently playing song
    var beforeAndIncludingCurrentSong = queueList.slice(0, (PLAYERqueueIndex+1));
    var afterCurrentSong = queueList.slice((PLAYERqueueIndex+1));

    var temporarySongsArray = []

    while (counter < counterTarget) {
        console.log(songsArray[counter][0]);
        var songImage = EalbumImageLocation;
        var songName = songsArray[counter][0];
        var songArtist = EartistName;
        var songAlbum = EalbumName;
        var songDuration = songsArray[counter][2];
        var songFileLocation = songsArray[counter][1];

        playerIndex = counter;
        temporarySongsArray[counter] = new Queue(songName, EalbumImageLocation, songFileLocation, songArtist, songDuration, EalbumEPsingleID, "false", playerIndex, songAlbum);


        counter++;
    }

    queueList = beforeAndIncludingCurrentSong.concat(temporarySongsArray, afterCurrentSong);

    hydrateQueue()

    if (queueLength == 0) {
        var currentSong = queueList[0];
        var audioFileSource = currentSong.audioSrc;
        loadNewDetailsTop()
        var source = document.getElementById('PLAYERsource');
        source.src = audioFileSource;
        audio.load();
        PLAYERresumePlayback();

    }

    document.getElementById('shadowDOM').style.display = "none";
    document.getElementById('shadowMenuPopup').style.display = "none";
    document.getElementById('shadowMenuPopupPlaylist').style.display = "none";

}

function formatTime(val) {
  var h = 0, m = 0, s;
  val = parseInt(val, 10);
  if (val > 60 * 60) {
   h = parseInt(val / (60 * 60), 10);
   val -= h * 60 * 60;};
  if (val > 60) {
   m = parseInt(val / 60, 10);
   val -= m * 60;};
  s = val;
  val = (h > 0)? h + ':' : '';
  val += (m > 0)? ((m < 10 && h > 0)? '0' : '') + m + ':' : '0:';
  val += ((s < 10)? '0' : '') + s;
    
  return val;
};


function loadNewDetailsTop() {
    //let tabTitle = document.getElementsByTagName("title");
 
    
    var currentSong = queueList[PLAYERqueueIndex];
    
    var songName = currentSong.songTitle;
    var songArtist  = currentSong.artistName;
    var songAlbum = currentSong.albumEPsingleName;
    var imageFileAddress = currentSong.pictureSrc;
    
    
    
    //the differnt span locations
    var SPANsongName = document.getElementById("LCDsongTitle");
    var SPANartistName = document.getElementById("LCDaristName");
    var SPANalbumName = document.getElementById("LCDalbumName");
    var TAGimage = document.getElementById("PLAYERimage");
    //var SPANsongINDEX = document.getElementById("PLAYERsongIndex");
    
    //set the different informations from the player
    SPANsongName.innerHTML = songName;
    SPANartistName.innerHTML = songArtist;
    SPANalbumName.innerHTML = songAlbum;
    
    TAGimage.src = imageFileAddress;
    
    let tabTitleContents = songName + " by " + songArtist + " on Orange Music";
    document.querySelector('title').textContent = tabTitleContents;
    
}


function PLAYERresumePlayback() {
    PLAYERplaying = true
    //let SPANplayerState = document.getElementById("PLAYERplayToggleSPAN");
    //SPANplayerState.innerHTML = "pause"
    //loadNewDetailsTop()
    
    audio.play();
    //fadeAudioIn()
    
    //get the different informations for the player

    
    console.log("PLAYERqueueIndex", PLAYERqueueIndex)
    
    
    
    let playButton = document.getElementById("PLAYERplayIcon");
    let playIcon = "orangeMusicFiles/assets/iconsv2/play%20button.2.svg";
    let pauseIcon = "orangeMusicFiles/assets/icons/derpy.svg";
    
    playButton.src = pauseIcon;
    
    
    var currentTimeTag = document.getElementById("timeIndicatorLeft");
    var timeLeftTag = document.getElementById("timeIndicatorRight");
    
    //var endOfAudio = Math.floor(audio.duration)
    
    var seekInput = document.getElementById('PLAYERseekTimeRangeSlider');
    var timeIndicator = document.getElementById('PLAYERseekTimeRangeIndicator');
    
    audio.addEventListener("timeupdate", () => {
        var endOfAudio = audio.duration;
        //when the audio progesses by a second it updates the current time and time left tags
        var currentTime = audio.currentTime;
        window.GLOBALtime = currentTime;
        window.GLOBALendTime = endOfAudio;
        
        var timeLeft = Math.floor(Math.floor(endOfAudio) - currentTime);
        currentTimeTag.innerHTML = formatTime(Math.floor(currentTime));
        if (timeLeft <= 0) {
            timeLeft = 0
        }
        timeLeftTag.innerHTML = "-" + formatTime(timeLeft);
        
        //moves the seek input to where it should be
        var progressPercent = (currentTime / endOfAudio) * 100;
        seekInput.value = progressPercent;
        
        timeIndicator.style.width = progressPercent + "%";
    });
    
    
    seekInput.addEventListener('input', () => {
        const timeToSeek = seekInput.value;
        var percentToSeconds = (timeToSeek / 100) * audio.duration;
        audio.currentTime = percentToSeconds;
    });
    
    
    
};

function PLAYERpausePlayback() {
    //fadeAudioOut()
    let playButton = document.getElementById("PLAYERplayIcon");
    let playIcon = "orangeMusicFiles/assets/iconsv2/play%20button.2.svg";
    let pauseIcon = "orangeMusicFiles/assets/icons/derpy.svg";
    
    PLAYERplaying = false
    console.log("PLAYERplayButton clicked, state = ", PLAYERplaying)
    playButton.src = playIcon;
    
    audio.pause();
};

function hydrateQueue() {
    //clear queue
    //upNextQueueItemContainer
    let queueContainer = document.getElementById("upNextQueueItemContainer");
    queueContainer.innerHTML = ""
    
    let currentQueueIndex = PLAYERqueueIndex
    let indexesToFix = (queueList.length) - (currentQueueIndex + 1)
    for (let i = 0; i < indexesToFix; i++) {
        //console.log(i)
        var currentSongIndex = (i + currentQueueIndex + 1)
    
        var imageSrc = queueList[currentSongIndex].pictureSrc
        var songTitle = queueList[currentSongIndex].songTitle
        var songArtist = queueList[currentSongIndex].artistName
        var songDuration = formatTime(queueList[currentSongIndex].duration)
        var queueIndex = currentSongIndex

        var queueItem = `
    <div class="up-next-queue-item">
      <div class="absolute-remove-from-queue" onclick="removeFromQueue(` + currentSongIndex + `)"><div class="white-line"></div></div>

      <div class="up-next-queue-item-box up-next-queue-image-container">
        <img src="` + imageSrc + `" class="up-next-queue-image">
      </div>
      <div class="up-next-queue-text-container up-next-queue-item-box">
        <span class="up-next-queue-text-song-title">` + songTitle +`</span>
        <span class="up-next-queue-text-song-artist">` + songArtist +`</span>

      </div>
      <div class="up-next-queue-time-container up-next-queue-item-box" onclick="loadContextMenu(this, '` + queueIndex + `', 'TYPEqueue')">
        <div class="up-next-queue-item-context-call">
        <img
             src="orangeMusicFiles/assets/icons/menu%20options%20button.svg"
             alt="menu button"
             width="15"
         />
        </div>
        <span class="up-next-queue-time-span">` + songDuration +`</span>
      </div>

    <div class="up-next-queue-item-underline"></div>
    </div>
    `
        //append to the queue
        queueContainer.innerHTML += queueItem
        
    }
}
//remove song from the queue up front by queue index
function removeFromQueue(queueIndex) {
    console.log("remove from queue called", queueIndex)

    queueList.splice(queueIndex, 1)
    hydrateQueue()
}
function QUEUEclearList() {
    let currentQueueIndex = PLAYERqueueIndex
    var indexesToFix = (queueList.length) - (currentQueueIndex + 1)
    
    var moreItemsInQueue = true
    while (moreItemsInQueue == true) {
        if (indexesToFix > 0) {
            var lastIndex = queueList.length - 1
            queueList.splice(lastIndex, 1)
            
            
            //to make it work with also clearing the either shuffled or unshuffled list, you would have to make it so that it then sees the indexes in this list that should be removed, and then it will get the indexs magic index from inside the class and then remove all the ones from this list that have been removed from the other, but at the point that it should be removed.
            
        }
        else {
            moreItemsInQueue = false
        }
        indexesToFix = (queueList.length) - (currentQueueIndex + 1)
    }
    
    /*
    for (let i = 0; i < indexesToFix; i++) { 
        queueList.splice(i, 1)
        console.log(i)
        
    }*/
    hydrateQueue()
    
    
}



function queueManagement() {
    //setting the different document identifiers/refernces
    let queueButton = document.getElementById("upNextQueueButton");
    let queueIcon = document.getElementById("queueIcon");
    let queueIconBg = document.getElementById("upNextQueueButtonBackground");
    let queue = document.getElementById("upNextQueueContainer");
    
    let body = document.getElementById("main");
    //setting it so that the queue is invisible on page load, and that the state is off, it will be invisible anyway since it will be forced out of the page
    var queueVisible = false;
    
    queueButton.addEventListener('click', () => {
        if (queueVisible == false) {
            queueVisible = true;
            //do something
            //console.log("queue button has been toggled", queueVisible)
            queueIcon.style.filter = "var(--make-svg-grey-2)";
            queueIconBg.style.backgroundColor = "var(--off-white)";

            queue.style.right = "0%";
            
        }
        else {
            queueVisible = false;

            queueIcon.style.filter = "var(--make-svg-grey)";
            queueIconBg.style.backgroundColor = "transparent";
            
            queue.style.right = "-100%";
            
        }
    })
    
}


function PLAYERinit() {
    //this goes first because some functions need this value and it's better that they don't break because it doesn't exist
    window.PLAYERqueueIndex = 0;
    window.GLOBALtime = 0;
    window.GLOBALendTime = 0.1;
    
    
    
    PLAYERdata();   //deals with initialising the class
    changeVolume();  //calls the function that deals with volume changes
    loopState();    //deals with the different loop states 
    
    queueManagement();  //deals with getting the queue to popin and out
    hydrateQueue()  //deals with filling the queue out with the correct content, as well as making sure that the queueList is in a usable state after it has been appended to
    
    var audio = document.getElementById('audio');
    var source = document.getElementById('PLAYERsource');
    
    
    //sets the first song in the player to be the first in the queue, as well as  then setting the source
    //var currentSong = queueList[PLAYERqueueIndex];
    //var audioFileSource = currentSong.audioSrc;
    //source.src = audioFileSource;
    //loadNewDetailsTop()
    
    //audio.load();
    audio.addEventListener('ended', songNext);

    //detect a change to the queueList

    
    //for going forward or looping a song, with the elements abstracted out into smaller functions, for readability and for functionality reasons, because global loop state song...
    function songNext() {
        audio.pause();
        console.log("song next called")
        
        if (GLOBALloopState != "song") {
            songNextGLOBALloopStateSong();
        }
        else {
            console.log("global loop state == song")
            audio.currentTime = 0;

            currentSong = queueList[PLAYERqueueIndex];
            audioFileSource = currentSong.audioSrc;
            source.src = audioFileSource;

            audio.load();
            
            //console.log("PLAYERplaying", PLAYERplaying)
            
            if (PLAYERplaying == true) {
                loadNewDetailsTop()
                hydrateQueue()
                PLAYERresumePlayback();     
            }
            else {
                loadNewDetailsTop()
                hydrateQueue()
            }
            
        }
        
        
    };
    
    function songNextGLOBALloopStateOn() {
        audio.currentTime = 0;
        //PLAYERqueueIndex = 0
        let queueIndex = PLAYERqueueIndex
        let queueIndexPlusOne = queueIndex += 1
        console.log("song next global loop state on",queueIndexPlusOne, queueList.length)
        
        PLAYERqueueIndex ++
        if (queueIndexPlusOne == queueList.length) {
            PLAYERqueueIndex = 0
            console.log("queueIndexPlusOne == queueList.length")
            
        }
        
        currentSong = queueList[PLAYERqueueIndex];
        audioFileSource = currentSong.audioSrc;
        source.src = audioFileSource;

        audio.load();
        
        if (PLAYERplaying == true) {
            hydrateQueue()
            loadNewDetailsTop()
            PLAYERresumePlayback();     
        }
        else {
            hydrateQueue()
            loadNewDetailsTop()
        }
        
    }
    
    function goToStartOfQueue() {
        console.log("goToStartOfQueue")
        
        PLAYERqueueIndex = 0
        
        currentSong = queueList[PLAYERqueueIndex];
        audioFileSource = currentSong.audioSrc;
        source.src = audioFileSource;

        audio.load();
         if (PLAYERplaying == true) {
             hydrateQueue()
             loadNewDetailsTop()
            PLAYERresumePlayback();     
        }
        else {
            hydrateQueue()
            loadNewDetailsTop()
        }
        
    }
    
    function songNextThereAreSongsAfter() {
        PLAYERqueueIndex ++
        
        currentSong = queueList[PLAYERqueueIndex];
        audioFileSource = currentSong.audioSrc;
        source.src = audioFileSource;

        audio.load();
            if (PLAYERplaying == true) {
                hydrateQueue()
                loadNewDetailsTop()
                PLAYERresumePlayback();     
            }
            else {
                hydrateQueue()
                loadNewDetailsTop()
            }
    }
    
    function songNextGLOBALloopStateSong() {
        //check if there are more songs in the array
        var lengthOfQueue = queueList.length;
        
        //if there are no more songs afterr
        if (lengthOfQueue === (PLAYERqueueIndex + 1)) {
            console.log("there are no more songs after, global loop state = ", GLOBALloopState)
            
            if (GLOBALloopState === "on") {
                console.log("goToStartOfQueue")
                goToStartOfQueue()
            }

            else {
                PLAYERqueueIndex = 0;
                queueList = [];
                let playerBarDummy = document.getElementById("lcdBarDummy");
                playerBarDummy.style.display = "grid";
                playerBarDummy.style.visibility = "visible";
                PLAYERpausePlayback()
                //active playerPausePlayback

            }

            /*
            else if (GLOBALtime > GLOBALendTime) {
                console.log("go to start of song")
                if (PLAYERplaying == true) {
                    hydrateQueue()
                    loadNewDetailsTop()
                    PLAYERresumePlayback();     
                }
                else {
                    hydrateQueue()
                    loadNewDetailsTop()
                }
            }
            else {
                console.log("player pause playback")
                if (PLAYERplaying == true) {
                    hydrateQueue()
                    loadNewDetailsTop()
                    PLAYERresumePlayback();     
                }
                else {
                    hydrateQueue()
                    loadNewDetailsTop()
                }
            }*/
        }
        //if there are songs after
        else {
            if (GLOBALloopState === "on") {
                    songNextGLOBALloopStateOn();
                }
            else {
            songNextThereAreSongsAfter()
            }
        };
    }
    
    //for going back a song
    function songLast() {
        //add the bit where if song progress is greater than 2-5%, then it will go to the start of the song, and if not again, it will then switch
        audio.pause();
        
        if (GLOBALtime > 5 ) {
            audio.currentTime = 0;
                if (PLAYERplaying == true) {
                    loadNewDetailsTop()
                    PLAYERresumePlayback();     
                }
                else {
                    loadNewDetailsTop()
                }
        }
        
        else {
        //check if there are more songs back
        var tempIndex = PLAYERqueueIndex;
        
        if ((tempIndex --) <= 0) {
            
            
            
            if (GLOBALloopState == "on") {
                var lastIndex = queueList.length - 1
                PLAYERqueueIndex = lastIndex
                currentSong = queueList[PLAYERqueueIndex];
                audioFileSource = currentSong.audioSrc;
                source.src = audioFileSource;
                
                audio.load();
                if (PLAYERplaying == true) {
                    hydrateQueue()
                    loadNewDetailsTop()
                    PLAYERresumePlayback();    
                }
                else {
                    hydrateQueue()
                    loadNewDetailsTop()
                }

            }
            else {
                if (PLAYERplaying == true) {
                    hydrateQueue()
                    loadNewDetailsTop()
                    PLAYERresumePlayback();     
                }
                else {
                    hydrateQueue()
                    loadNewDetailsTop()
                }
                
            }
       
        }
        else {
            //deal with classes
            //currentSong.played = false;

            PLAYERqueueIndex -- ;
            
            currentSong = queueList[PLAYERqueueIndex];
            audioFileSource = currentSong.audioSrc;
            source.src = audioFileSource;
            
            

            audio.load();
            if (PLAYERplaying == true) {
                hydrateQueue()
                loadNewDetailsTop()
                PLAYERresumePlayback();    
            }
            else {
                hydrateQueue()
                loadNewDetailsTop()
            }
            
        }};
    };
    
    //the play button trigger detect, the state change of the span class will be done in the called classes, since this will allow for better robustness, + we'll make the bool that stores the state global, since then it can be accessed and update in the others, incase they also get called by other functions
    window.PLAYERplaying = false
    var PLAYERplayToggleTrigger = document.getElementById('PLAYERplayButton');
    PLAYERplayToggleTrigger.addEventListener('click', () => {
        if (PLAYERplaying == false) {
            PLAYERplaying = true
            PLAYERresumePlayback()
            //console.log("PLAYERplayButton clicked, state = ", PLAYERplaying)
        }
        else {
            PLAYERplaying = false
            PLAYERpausePlayback()
            //console.log("PLAYERplayButton clicked, state = ", PLAYERplaying)
        }
    });
    var PLAYERplayToggleTrigger2 = document.getElementById('PLAYERplayButton2');
    PLAYERplayToggleTrigger2.addEventListener('click', () => {
        if (PLAYERplaying == false) {
            PLAYERplaying = true
            PLAYERresumePlayback()
            //console.log("PLAYERplayButton2 clicked, state = ", PLAYERplaying)
        }
        else {
            PLAYERplaying = false
            PLAYERpausePlayback()
            //console.log("PLAYERplayButto2n clicked, state = ", PLAYERplaying)
        }
    });
    
    //play toggle with the spacebar
    document.body.onkeyup = function(e) {
      if (e.key == " " ||
          e.code == "Space" ||      
          e.keyCode == 32      
          ) {
            var timeDifference = Date.now() - GLOBALtimeSinceLastType;

            if (timeDifference > 200) {
              console.log("the space bar has been pressed")
                if (PLAYERplaying == false) {
                    PLAYERplaying = true
                    PLAYERresumePlayback()
                }
                else {
                    PLAYERplaying = false
                    PLAYERpausePlayback()
                }

            }

        }
    }
    
    
    
    // when the user presses the next button
    var nextEventTrigger = document.getElementById('PLAYERnextButton');
    nextEventTrigger.addEventListener('click', () => {
        console.log("PLAYERnextButton clicked")
        var lengthOfQueue = queueList.length;
        if (GLOBALloopState == "song" && lengthOfQueue != (PLAYERqueueIndex + 1)) {
            console.log("cheese")
            PLAYERqueueIndex ++
            /*
            if (lengthOfQueue != (PLAYERqueueIndex + 1) {
            }*/
        }
        else if (GLOBALloopState == "song" && lengthOfQueue == (PLAYERqueueIndex + 1)) {
            PLAYERqueueIndex = 0;
            queueList = [];
            let playerBarDummy = document.getElementById("lcdBarDummy");
            playerBarDummy.style.display = "grid";
            playerBarDummy.style.visibility = "visible";
            PLAYERpausePlayback()
            GLOBALloopState = "off";
            let loopButton = document.getElementById('PLAYERloopButton');
            let loopIcon = document.getElementById('PLAYERloopSVG');
            loopButton.style.filter = "var(--make-svg-grey)";
            loopIcon.src = "orangeMusicFiles/assets/icons/loop%20button.svg";


        }
        
        songNext()
    });
    var nextEventTrigger2 = document.getElementById('PLAYERnextButton2');
    nextEventTrigger2.addEventListener('click', () => {
        console.log("PLAYERnextButton clicked")
        var lengthOfQueue = queueList.length;
        if (GLOBALloopState == "song" && lengthOfQueue != (PLAYERqueueIndex + 1)) {
            console.log("cheese")
            PLAYERqueueIndex ++
            /*
            if (lengthOfQueue != (PLAYERqueueIndex + 1) {
            }*/
        }
        else if (GLOBALloopState == "song" && lengthOfQueue == (PLAYERqueueIndex + 1)) {
            PLAYERqueueIndex = 0;
            queueList = [];
            let playerBarDummy = document.getElementById("lcdBarDummy");
            playerBarDummy.style.display = "grid";
            playerBarDummy.style.visibility = "visible";
            PLAYERpausePlayback()
            GLOBALloopState = "off";
            let loopButton = document.getElementById('PLAYERloopButton');
            let loopIcon = document.getElementById('PLAYERloopSVG');
            loopButton.style.filter = "var(--make-svg-grey)";
            loopIcon.src = "orangeMusicFiles/assets/icons/loop%20button.svg";
            

        }
        
        songNext()
    });
    //when the user presses the last button
    var lastEventTrigger = document.getElementById('PLAYERlastButton');
    lastEventTrigger.addEventListener('click', () => {
        console.log("PLAYERbackButton clicked")
        songLast();
    });
    var lastEventTrigger2 = document.getElementById('PLAYERlastButton2');
    lastEventTrigger2.addEventListener('click', () => {
        console.log("PLAYERbackButton clicked")
        songLast();
    });
    
    //when the user presses the shuffle button
    var shuffleState = false
    var PLAYERshuffleTrigger = document.getElementById('PLAYERshuffleButton');
    
    //when the user presses the shuffle button
    PLAYERshuffleTrigger.addEventListener('click', () => {
        if (shuffleState === false) {
            shuffleState = true
            //do something
            //PLAYERshuffleSPAN.innerHTML = "on"
            console.log("PLAYERshufflestate is ", shuffleState)
            shuffleQueue()
            hydrateQueue()
            PLAYERshuffleTrigger.style.filter = "var(--make-svg-orange)";
            
            
        }
        else {
            shuffleState = false
            //do something
           console.log("PLAYERshufflestate is ", shuffleState)
            sortQueue() 
            hydrateQueue()
            PLAYERshuffleTrigger.style.filter = "var(--make-svg-grey)";
        }
    });
    var PLAYERshuffleTrigger2 = document.getElementById('PLAYERshuffleButton2');
    
    //when the user presses the shuffle button
    PLAYERshuffleTrigger2.addEventListener('click', () => {
        if (shuffleState === false) {
            shuffleState = true
            //do something
            //PLAYERshuffleSPAN.innerHTML = "on"
            console.log("PLAYERshufflestate is ", shuffleState)
            shuffleQueue()
            hydrateQueue()
            PLAYERshuffleTrigger.style.filter = "var(--make-svg-orange)";
            
            
        }
        else {
            shuffleState = false
            //do something
           console.log("PLAYERshufflestate is ", shuffleState)
            sortQueue() 
            hydrateQueue()
            PLAYERshuffleTrigger.style.filter = "var(--make-svg-grey)";
        }
    });
    
    //shuffle the queue, sets the currently playing song to be the first in the array
    function shuffleQueue() {
        //audio.pause()
        
        //console.log(GLOBALcopyOfSortedQueue)

        function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
            }
        }
        //current song index before shuffle
        var currentSongQueueIndex = queueList[PLAYERqueueIndex].queueIndex


        //split queueList into two, with only the stuff after the PLAYERqueueIndex being shuffled:
        var beforeAndIncludingCurrentSong = queueList.slice(0, (PLAYERqueueIndex+1));
        var afterCurrentSong = queueList.slice((PLAYERqueueIndex+1)).map((x) => x);

        window.GLOBALcopyOfSortedQueue = queueList.slice((PLAYERqueueIndex)).map((x) => x);
        window.GLOBALindexOfTimeOfShuffle = PLAYERqueueIndex;
        shuffleArray(afterCurrentSong)

        queueList = beforeAndIncludingCurrentSong.concat(afterCurrentSong);
        
    }
    
    //sorts the queue, putting the currently playing song to be the x (in queue) currently playing song
    function sortQueue() {
        //get the  current songs real index
        //console.log(GLOBALcopyOfSortedQueue);
        var currentlyPlayingPath = document.getElementById('PLAYERsource').src;

        const baseUrl = `${window.location.protocol}//${window.location.hostname}${(window.location.port ? ':' + window.location.port : '')}`;
        const currentUrl = `${baseUrl}${window.location.pathname}${window.location.hash}`;

        // Remove query parameters from the URL
        const cleanUrl = currentUrl.split('?')[0];

        // Remove everything after the last slash
        const lastSlashIndex = cleanUrl.lastIndexOf('/');
        const finalUrl = cleanUrl.substring(0, lastSlashIndex);

        for (let i = 0; i < GLOBALcopyOfSortedQueue.length; i ++) {
            iLoopAudioSource = finalUrl + GLOBALcopyOfSortedQueue[i].audioSrc;
            console.log(currentlyPlayingPath, iLoopAudioSource)
            if (iLoopAudioSource == currentlyPlayingPath) {
                console.log("triigered");
            }
        }
        //meaning it's starting from it's original starting point
        var beforeAndIncludingCurrentSong = queueList.slice(0, (PLAYERqueueIndex));
        queueList = beforeAndIncludingCurrentSong.concat(GLOBALcopyOfSortedQueue);


    }
}//end of init

//enables the changing of the volume
function changeVolume() {
    audio.volume = 1;
    
    var volumeSlider = document.getElementById('volumeRangeSlider');
    volumeSlider.addEventListener('input', () => {
        const volume = volumeSlider.value / 100;
        audio.volume = volume;
    });
};

//enables the changing of the loop states
function loopState() {
    let loopButton = document.getElementById('PLAYERloopButton');
    let loopIcon = document.getElementById('PLAYERloopSVG');
    
    let loopNormal = "orangeMusicFiles/assets/icons/loop%20button.svg"
    let loopOther = "orangeMusicFiles/assets/icons/derpy.svg"
    
    
    //let loopSpan = document.getElementById('PLAYERloopState');
    var counter = 0
    window.GLOBALloopState = "off"
    console.log("GLOBALloopState is ", GLOBALloopState)
        //console.log("the loop button has been pressed", counter)
    
    loopButton.addEventListener('click', () => {
        counter ++ ;
        if (counter > 2) {
            counter = 0;
        };
        //console.log("the loop button has been pressed", counter)
        
        
        //loop off
        if (counter === 0) {
            GLOBALloopState = "off";
            console.log("GLOBALloopState is ", GLOBALloopState);
            loopButton.style.filter = "var(--make-svg-grey)";
            loopIcon.src = loopNormal;
            
                        
        }//loop on
        else if (counter === 1) {
            GLOBALloopState = "on";
            console.log("GLOBALloopState is ", GLOBALloopState)
            loopButton.style.filter = "var(--make-svg-orange)";
            loopIcon.src = loopNormal;
        }//loop song
        else {
            GLOBALloopState = "song";
            console.log("GLOBALloopState is ", GLOBALloopState)
            loopButton.style.filter = "var(--make-svg-orange)";
            //change the SVG to that of loop +1
            loopIcon.src = loopOther;
        };
        
         
    });
    
};






PLAYERinit();



