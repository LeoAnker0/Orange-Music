<?php
// Create connection
error_reporting(E_ALL);
ini_set('display_errors', 'on');

// Read the request body as a string
$request_body = file_get_contents('php://input');

$conn = new mysqli("localhost", "root", "", "music_streaming");

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


// Prepare a SQL statement to retrieve the username based on the UUID
$sql = "SELECT user_username FROM user_table WHERE unique_user_id = ?";

// Prepare the statement
$stmt = $conn->prepare($sql);

// Bind the UUID parameter to the statement
$stmt->bind_param("s", $request_body);

// Execute the statement
$stmt->execute();

// Bind the result to a variable
$stmt->bind_result($username);

// Fetch the result
$stmt->fetch();

// Close the statement and the database connection
$stmt->close();
$conn->close();

// Echo the username as the response
echo $username;