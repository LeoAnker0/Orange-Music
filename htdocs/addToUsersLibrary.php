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
    $artistID = mysqli_real_escape_string($conn, $_POST['artistID']);
    $albumEPsingleID = mysqli_real_escape_string($conn, $_POST['albumEPsingleID']);
    $date = mysqli_real_escape_string($conn, $_POST['date']);

    
    $sql = "INSERT INTO library (albumEPsongID, user_added, date_added) VALUES ('$albumEPsingleID', '$artistID','$date')";
    
    if (mysqli_query($conn, $sql)) {
      echo "Record added successfully";
    } else {
      echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    } 
}

mysqli_close($conn);
