<?php
$conn = new mysqli("localhost", "root", "", "spavisiteurvuejs");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
