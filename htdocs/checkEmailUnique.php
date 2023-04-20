<?php
error_reporting(E_ALL);
ini_set('display_errors', 'on');

// Connect to the database
$conn = mysqli_connect('localhost', 'root', '', 'music_streaming');

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //check if the email address is already in the database
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $sql = "SELECT * FROM user_table WHERE user_email = '$email'";
    $result = mysqli_query($conn, $sql);
    
    if (mysqli_num_rows($result) > 0) {
    // Email is already in the database
    echo "email already exists";
        
    }   else {
        echo "email free";
    }
    
    
    
}
mysqli_close($conn);