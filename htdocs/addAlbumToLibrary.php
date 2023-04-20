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
    $artistID = mysqli_real_escape_string($conn, $_POST['artistID']);
    $albumEPsingleID = mysqli_real_escape_string($conn, $_POST['albumEPsingleID']);
    $dateAdded = mysqli_real_escape_string($conn, $_POST['date']);

    
    //echo $artistID . " " . $albumEPsingleID;

    $sql = "SELECT * FROM library WHERE user_added = ? AND albumEPsongID = ?";
	$stmt = mysqli_prepare($conn, $sql);
	mysqli_stmt_bind_param($stmt, "ss", $artistID, $albumEPsingleID);
	mysqli_stmt_execute($stmt);

	// Check if row exists
	if (mysqli_stmt_fetch($stmt)) {
	  // Row exists, do nothing
	  echo "Row exists in library table.";
	} else {
	  // Row does not exist, add new row
	  $sql = "INSERT INTO library (user_added, albumEPsongID, date_added) VALUES (?, ?, ?)";
	  $stmt = mysqli_prepare($conn, $sql);
	  $details = "some details to add to the library table";
	  mysqli_stmt_bind_param($stmt, "sss", $artistID, $albumEPsingleID, $dateAdded);
	  mysqli_stmt_execute($stmt);
	  echo "Added new row to library table.";
	}

	// Close connection
	mysqli_stmt_close($stmt);
	mysqli_close($conn);
} else {

  mysqli_close($conn);
}

