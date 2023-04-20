<?php
// Set up database connection
//error_reporting(E_ALL);
//ini_set('display_errors', 'on');

$logfile = "/Applications/XAMPP/xamppfiles/htdocs/logfile.log";
//$message = "";
//error_log($message . "\n", 3, $logfile);
//$message = "Start of library.php:";
//error_log($message . "\n", 3, $logfile);


// function to retrieve library item by index and uuid
function getLibraryItem($index) {
    // create a mysqli object
    $mysqli = new mysqli('localhost', 'root', '', 'music_streaming');

    // prepare the SQL statement
    $sql = 'SELECT * FROM albumEPsong_table WHERE libraryIndex = ? ORDER BY libraryIndex DESC LIMIT 1';
    $stmt = $mysqli->prepare($sql);

    // bind the input parameters to the statement
    $stmt->bind_param('i', $index);

    // execute the statement
    $stmt->execute();

    // fetch the result as an associative array
    $result = $stmt->get_result()->fetch_assoc();

    // return the result
    //$message = print_r($result, true);
    //$logfile = "/Applications/XAMPP/xamppfiles/htdocs/logfile.log";

    //error_log($message . "\n", 3, $logfile);
    return $result;
}

function getAlbumEPSongs($albumEPsingleID) {
  $conn = new mysqli('localhost', 'root', '', 'music_streaming');

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  // Prepare and execute the SQL query
  $stmt = $conn->prepare("SELECT * FROM albumEPsong_table WHERE albumEPsingleID = ?");
  $stmt->bind_param("s", $albumEPsingleID);
  $stmt->execute();

  // Get the results
  $result = $stmt->get_result();

  // Close the statement and connection
  $stmt->close();
  $conn->close();

  // Return the results as an array of associative arrays
  $songs = array();
  while ($row = $result->fetch_assoc()) {
    $songs[] = $row;
  }
  return $songs;
}

//gets the smaller index/the up next one
function getSmallerIndex($current_index) {
    $conn = new mysqli('localhost', 'root', '', 'music_streaming');

      // Check connection
      if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
      }

    // Prepare the SQL query with placeholders for the variables
    //$sql = "SELECT libraryIndex FROM library WHERE user_added = ? AND libraryIndex < ? ORDER BY libraryIndex DESC LIMIT 1";
    $sql = "SELECT libraryIndex FROM albumEPsong_table WHERE libraryIndex < ? ORDER BY ABS(libraryIndex - ?) ASC LIMIT 1";


    // Prepare the statement and bind the parameters
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $current_index, $current_index);

    // Execute the statement
    $stmt->execute();

    // Bind the result to a variable
    $stmt->bind_result($smaller_index);

    // Fetch the result
    $stmt->fetch();

    // Close the statement
    $stmt->close();

    // Return the smaller index if it was found, otherwise return null
    return $smaller_index;
}

// Get the JSON data from the request
$json = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($json);

// Get the libraryIndex from the decoded JSON data
$libraryIndex = $data->libraryIndex;

//$message = $libraryIndex;
//error_log($message . "\n", 3, $logfile);


// so we get the row here, and now what we can do is that we can then extrapolate the index from there as well as then extrapolating the albumEPsongID, and then send that to the SQL again and then return that array and then return that to the javascript, rather than doing an intermediary between this --> to javascript --> back to php --> only to go back to javascript again, so next up we will create a function called getAlbumItem (or something), in a new function , where we can send the albumEPsongID that we just got from the library table

//do a quick check to see if the uuid that was sent through was the default one, and in that case actually get the smallest one
if ($libraryIndex == 9999999999999) {
  $libraryIndex = getSmallerIndex($libraryIndex);
}

//$message = $libraryIndex;
//error_log($message . "\n", 3, $logfile);


$libraryItem = getLibraryItem($libraryIndex);

//$message = "libraryItem: " . $libraryItem['libraryIndex'];
//error_log($message . "\n", 3, $logfile);

// Call the function to get the smaller index
$current_index = $libraryItem['libraryIndex'];
$smaller_index = getSmallerIndex($current_index);


//get the albumEPsingleID from library Item and initialise a variable
$albumEPsongID = $libraryItem['albumEPsingleID'];
if ($smaller_index == null) {
  $newLibraryIndex = "0";
} else {
  $newLibraryIndex = $smaller_index;
}

//the albumEPsingleRow ready for being returned, along with that newLibraryIndex
//that's the row, but i want to break it into it's retrospective pieces
$albumEPsingleRow = getAlbumEPSongs($albumEPsongID);
$albumEPsingleRow = $albumEPsingleRow[0];

//initialise the array for return
$musicObjectDataArray = [];
//append the newLibraryIndex
$musicObjectDataArray["newLibraryIndex"] = $newLibraryIndex;
//append the albumEPsingleID
$musicObjectDataArray["albumEPsingleID"] = $albumEPsingleRow["albumEPsingleID"];
//append the albumEPsong_description
$musicObjectDataArray["albumEPsong_description"] = $albumEPsingleRow["albumEPsong_description"];
//appennd the album picture location
$musicObjectDataArray["albumImageLocation"] = $albumEPsingleRow["albumImageLocation"];
//append the album name
$musicObjectDataArray["albumName"] = $albumEPsingleRow["albumName"];
//append the artist ID
$musicObjectDataArray["artistID"] = $albumEPsingleRow["artistID"];
//append the artistName
$musicObjectDataArray["artistName"] = $albumEPsingleRow["artistName"];
//append the date created
$musicObjectDataArray["dateCreated"] = $albumEPsingleRow["dateCreated"];
//append the songs Json
$musicObjectDataArray["songsJson"] = $albumEPsingleRow["songsJson"];




echo json_encode(array("libraryItem" => $musicObjectDataArray));









