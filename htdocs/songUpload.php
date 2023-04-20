<?php
// Connect to the database
error_reporting(E_ALL);
ini_set('display_errors', 'on');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Move the uploaded file to the desired location
    $music_file = $_FILES["file"];

    if (move_uploaded_file(
        $music_file["tmp_name"],
        // New music location, __DIR__ is the location of the current PHP file
        __DIR__ . '/music/' . $music_file["name"]
    
    )) {
   //if the upload worked completly fine
      echo "file upload success";
    } 
    
    else {
    // There was an error uploading the file
      echo "\nError uploading file";
    }
}
