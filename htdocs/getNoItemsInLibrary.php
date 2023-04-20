<?php
// Set up database connection

error_reporting(E_ALL);
ini_set('display_errors', 'on');
// Get the JSON data from the request
$json = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($json);

// Get the UUID from the decoded JSON data
$uuid = $data->uuid;

// Connect to the database
$conn = mysqli_connect('localhost', 'root', '', 'music_streaming');

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Build the SQL query to count the number of times the UUID appears in the user_added field of the library table
$sql = "SELECT COUNT(*) as count FROM library WHERE user_added LIKE '%{$uuid}%'";

// Execute the SQL query
$result = $conn->query($sql);

// Check if the query was successful
if ($result === false) {
  die("Query failed: " . $conn->error);
}

// Get the result from the query
$row = $result->fetch_assoc();

// Get the count value from the result
$count = $row['count'];

// Close the database connection
$conn->close();

// Return the count value as JSON data
echo json_encode(array("count" => $count));
?>