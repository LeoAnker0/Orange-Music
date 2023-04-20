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
    $id = mysqli_real_escape_string($conn, $_POST['id']);
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $hash = mysqli_real_escape_string($conn, $_POST['hash']);
    $filePath = mysqli_real_escape_string($conn, $_POST['filePath']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $description = mysqli_real_escape_string($conn, $_POST['description']);
    $joinDate = mysqli_real_escape_string($conn, $_POST['joinDate']);
    
    $sql = "INSERT INTO user_table (unique_user_id, user_username, user_password, user_picture_location, user_email, user_description, date_joined) VALUES ('$id', '$username', '$hash', '$filePath', '$email', '$description', '$joinDate')";
    
    if (mysqli_query($conn, $sql)) {
      echo "Record added successfully";
    } else {
      echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    } 
}

mysqli_close($conn);
