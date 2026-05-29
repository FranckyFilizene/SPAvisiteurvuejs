<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Ajout de GET car c'est une lecture
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db.php';

// Optionnel : utile seulement si tu envoies des filtres depuis Vue.js
$data = json_decode(file_get_contents('php://input'));

$query = "SELECT * FROM listedesvisiteurs ORDER BY id DESC";

$result = $conn->query($query);

$visiteurs = [];

if($result && $result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        $visiteurs[] = $row; 
    }
}
echo json_encode($visiteurs);
?>