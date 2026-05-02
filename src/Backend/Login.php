<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db.php';

$data = json_decode(file_get_contents('php://input'));

if(!$data){
    echo json_encode([
        "status" => "error", 
        "message" => "Aucune donnee recues",
    ]);
    exit();
}

$Nom = $data->nom;
$Password = $data->password;

// 1. Chercher l'utilisateur par son nom
$stmt = $conn->prepare("SELECT * FROM Login WHERE Nom = ?");
$stmt->bind_param("s", $Nom);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    
    // 2. Vérifier le mot de passe (Clair vs Hashé)
    if (password_verify($Password, $user['Motdepass'])) {
        echo json_encode([
            "status" => "success", 
            "message" => "Connexion réussie",
            "user" => $user['Nom']
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Mot de passe incorrect"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Utilisateur non trouvé"]);
}

$stmt->close();
$conn->close();

?>