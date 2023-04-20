<?php
// Connect to the database
error_reporting(E_ALL);
ini_set('display_errors', 'on');
$conn = mysqli_connect('localhost', 'root', '', 'music_streaming');

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Insert data into the database
    $albumName = mysqli_real_escape_string($conn, $_POST['albumName']);
    $albumEPsingleID = mysqli_real_escape_string($conn, $_POST['albumEPsingleID']);
    $albumDescription = mysqli_real_escape_string($conn, $_POST['albumDescription']);

    $artistName = mysqli_real_escape_string($conn, $_POST['artistName']);
    $artistID = mysqli_real_escape_string($conn, $_POST['artistID']);
    $albumImageLocation = mysqli_real_escape_string($conn, $_POST['albumImageLocation']);
    $dateCreated = mysqli_real_escape_string($conn, $_POST['dateCreated']);

    //$songsJson = $conn, $_POST['songsJson'];

    //$songsJson = json_decode($_POST['songsJson'], true);
    $songsJson = $_POST['songsJson'];
    
    $sql = "INSERT INTO albumEPsong_table (albumName, albumEPsingleID, artistName, artistID, albumImageLocation, dateCreated, songsJson, albumEPsong_description) VALUES ('$albumName', '$albumEPsingleID', '$artistName', '$artistID', '$albumImageLocation', '$dateCreated', '$songsJson', '$albumDescription')";
    
    if (mysqli_query($conn, $sql)) {
      echo "Record added successfully";
    } else {
      if (mysqli_query($conn, $sql)) {
      echo "Record added successfully";
    } else {
      echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    } 
}

mysqli_close($conn);
