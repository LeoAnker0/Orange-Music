<?php
$albumEPsingleID = $_POST['albumEPsingleID'];

// Create connection
$conn = new mysqli('localhost', 'root', '', 'music_streaming');

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Prepare and execute query
$stmt = $conn->prepare("SELECT * FROM albumEPsong_table WHERE albumEPsingleID = ?");
$stmt->bind_param("s", $albumEPsingleID);
$stmt->execute();

// Get result
$result = $stmt->get_result();

// Check if record exists
if ($result->num_rows > 0) {
  // Get first row (should only be one)
  $row = $result->fetch_assoc();
  $songsJson = $row;

  // Return JSON response
  header('Content-Type: application/json');
  echo json_encode(array("songsJson" => $songsJson));
} else {
  // Return error message
  header('HTTP/1.1 404 Not Found');
  echo "Record not found";
}

// Close connection
$stmt->close();
$conn->close();
