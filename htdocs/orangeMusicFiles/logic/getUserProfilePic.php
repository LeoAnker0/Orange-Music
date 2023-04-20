<?php
// Connect to the database
$conn = mysqli_connect('localhost', 'root', '', 'music_streaming');

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uuid = mysqli_real_escape_string($conn, $_POST['uuid']);
    
    // Define the user ID you want to search for

  // Construct the SQL query to retrieve the user picture location
  $sql = "SELECT user_picture_location FROM user_table WHERE unique_user_id = '$uuid'";

  // Execute the query
  $result = mysqli_query($conn, $sql);

  // Check if the query is successful
  if (!$result) {
      die('Error executing query: ' . mysqli_error($conn));
  }

  // Retrieve the user picture location from the result set
  if (mysqli_num_rows($result) > 0) {
      $row = mysqli_fetch_assoc($result);
      $user_picture_location = $row['user_picture_location'];

      echo $user_picture_location;
  } else {
      // Handle the case where no user is found with the specified ID
      $user_picture_location = '';

      echo "error";
}
        

    
}

mysqli_close($conn);