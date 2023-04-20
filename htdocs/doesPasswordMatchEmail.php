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
    $hash = mysqli_real_escape_string($conn, $_POST['hash']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    

    $sql = "SELECT * FROM user_table WHERE user_email = ? AND user_password = ?";

    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "ss", $email, $hash);
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) > 0) {
      // email and password match found, do something with the data
        //echo "the email and password match the databse, so now i should return the UUID";
        
        $row = mysqli_fetch_assoc($result);
        $UUID = $row['unique_user_id'];
        
        echo "success" . $UUID;
        
    } else {
      // email and password do not match
        echo "password doesnt match";
    }
    
    
    //echo "\n" . $hash . " + " . $email;
    
}

mysqli_close($conn);
