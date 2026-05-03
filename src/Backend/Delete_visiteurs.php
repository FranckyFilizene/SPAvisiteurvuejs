<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db.php';

// Récupération de l'ID via l'URL
$id = isset($_GET['id']) ? $_GET['id'] : null;

if (!$id) {
    echo json_encode([
        "status" => "error",
        "message" => "Id manquant"
    ]);
    exit(); // IMPORTANT : on arrête le script ici si l'ID est absent
}

$query = "DELETE FROM listedesvisiteurs WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode([
            "status" => "success",
            "message" => "Visiteur supprimé avec succès, click sur le bouton actualiser pour le voir"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Aucun visiteur trouvé avec cet ID"
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Erreur lors de la suppression"
    ]);
}
?>