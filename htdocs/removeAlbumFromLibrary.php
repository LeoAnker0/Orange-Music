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

    
    // Prepare and execute query
    $sql = "DELETE FROM library WHERE user_added = ? AND albumEPsongID = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "ss", $artistID, $albumEPsingleID);
    mysqli_stmt_execute($stmt);

    // Check if row was deleted
    if (mysqli_stmt_affected_rows($stmt) > 0) {
      echo "Row deleted from library table.";
    } else {
      echo "Row not:'" . $albumEPsingleID . " : " . $artistID . "'found in library table.";
    }

    // Close connection
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
} else {

  mysqli_close($conn);
}
