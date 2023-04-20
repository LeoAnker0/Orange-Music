function mainHideAndResize() {
    console.log("hide and resize called");
    
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

mainHideAndResize()