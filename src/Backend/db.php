<?php
$host = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'spavisiteurvuejs';


$conn = new mysqli($host, $user, $pass, $dbname);


if ($conn->connect_error) {
  
    die(json_encode(["status" => "error", "message" => "Échec de la connexion à la base de données"]));
}

$conn->set_charset("utf8mb4");
?>