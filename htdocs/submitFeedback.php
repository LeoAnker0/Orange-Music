<?php
// connect to the database
$conn = mysqli_connect("localhost", "root", "", "music_streaming");

// check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// retrieve form data
$email = mysqli_real_escape_string($conn, $_POST['email']);
$message = mysqli_real_escape_string($conn, $_POST['message']);

// insert feedback into table
$sql = "INSERT INTO feedback (email, message) VALUES ('$email', '$message')";

if (mysqli_query($conn, $sql)) {
  echo "Feedback submitted successfully!";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

// close database connection
mysqli_close($conn);
?>
