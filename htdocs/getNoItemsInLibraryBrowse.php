<?php

  // Connect to the database
$conn = mysqli_connect('localhost', 'root', '', 'music_streaming');


// Check connection
if (!$conn) {
die("Connection failed: " . mysqli_connect_error());
}

// Query to get the number of rows in a table
$sql = "SELECT COUNT(*) as total FROM albumEPsong_table";

$result = mysqli_query($conn, $sql);

// Check if query was successful
if ($result) {
$row = mysqli_fetch_assoc($result);
$totalRows = $row['total'];
//$message = "Total rows: " . $totalRows;
//error_log($message . "\n", 3, $logfile);


} else {
//echo "Error: " . mysqli_error($conn);
$message = "Error: " . mysqli_error($conn);

}

// Close connection
mysqli_close($conn);

echo json_encode($totalRows);
?>
