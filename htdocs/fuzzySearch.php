<?php
error_reporting(E_ALL);
ini_set('display_errors', 'on');

$logfile = "/Applications/XAMPP/xamppfiles/htdocs/logfile.log";
$message = "connected to the php file4 ";
error_log($message . "\n", 3, $logfile);

$conn = mysqli_connect('localhost', 'root', '', 'music_streaming');


function searchTable($searchTerm, $table, $columns) {
  // Connect to the database
  $conn = new mysqli("localhost", "root", "", "music_streaming");
  
  // Prepare the search term by removing special characters and adding wildcards
  $searchTerm = preg_replace('/[^a-zA-Z0-9\s]/', '', $searchTerm);
  $searchTerm = '%' . str_replace(' ', '%', $searchTerm) . '%';
  
  // Build the query
  $query = "SELECT * FROM $table WHERE ";
  foreach ($columns as $column) {
    $query .= "$column LIKE '$searchTerm' OR $column LIKE '% $searchTerm'";
    if ($column !== end($columns)) {
      $query .= " OR ";
    }
  }
  
  // Execute the query
  $result = $conn->query($query);
  
  // Check if any rows were found
  if ($result->num_rows > 0) {
    // Create an array to hold the results
    $results = array();
    
    // Loop through the rows and add them to the results array
    while ($row = $result->fetch_assoc()) {
      $results[] = $row;
    }
    
    // Close the database connection and return the results
    $conn->close();
    return $results;
  } else {
    // Close the database connection and return null if no rows were found
    $conn->close();
    return null;
  }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $searchString = mysqli_real_escape_string($conn, $_POST['searchTerm']);
  //echo "input search string: " . $searchString;

  $table = 'albumEPsong_table';
  $columns = array('albumName', 'artistName', 'albumEPsong_description');
  $results = searchTable($searchString, $table, $columns);

  echo json_encode($results);
}
mysqli_close($conn);
?>
