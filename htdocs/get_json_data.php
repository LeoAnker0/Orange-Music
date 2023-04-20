<?php
// connect to the database
error_reporting(E_ALL);
ini_set('display_errors', 'on');

$conn = mysqli_connect('localhost', 'root', '', 'music_streaming');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// select the JSON data from the table
$sql = "SELECT songsJson FROM albumEPsong_table";
$result = $conn->query($sql);

// check if any rows were returned
if ($result->num_rows > 0) {
    $data = "";

    // fetch each row and add it to the $data string
    while ($row = $result->fetch_assoc()) {
        $data .= $row["songsJson"];
    }

    // return the data as a JSON string
    header("Content-Type: application/json");
    echo $data;
} else {
    // if no rows were returned, return an error message
    echo "No data found";
}

// close the database connection
$conn->close();
?>