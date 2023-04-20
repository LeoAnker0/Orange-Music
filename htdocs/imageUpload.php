<?php
// Connect to the database
error_reporting(E_ALL);
ini_set('display_errors', 'on');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Move the uploaded file to the desired location
    $image_file = $_FILES["file"];

    if (move_uploaded_file(
        $image_file["tmp_name"],
        // New image location, __DIR__ is the location of the current PHP file
        __DIR__ . '/pictures/' . $image_file["name"]
    
    )) {
   //if the upload worked completly fine
      echo "file upload success";
    } 
    
    else {
    // There was an error uploading the file
      echo "\nError uploading file";
    }
}
