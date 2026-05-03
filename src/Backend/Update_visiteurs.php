<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db.php';

// On récupère les données envoyées en JSON (POST)
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    $query = "UPDATE listedesvisiteurs SET Nom=?, Numero=?, Jours=?, Tarif=?, Total=? WHERE id=?";
    $stmt = $conn->prepare($query);
    
    // Calcul du total si nécessaire côté serveur pour plus de sécurité
    $total = $data->Jours * $data->Tarif;

    $stmt->bind_param("ssiiii", 
        $data->Nom, 
        $data->Numero, 
        $data->Jours, 
        $data->Tarif, 
        $total, 
        $data->id
    );

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Visiteur mis à jour"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Erreur lors de la mise à jour"]);
    }
}
?>