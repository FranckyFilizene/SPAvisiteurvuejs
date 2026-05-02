<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Aucune donnée reçue"]);
    exit();
}

$Nom = $data['nom'];
$Email = $data['email'];
$Password = $data['password'];

// Hachage du mot de passe
$Passwordhash = password_hash($Password, PASSWORD_BCRYPT);

// Vérification si le nom existe déjà
$check = $conn->prepare('SELECT Nom FROM Login WHERE Nom = ?');
$check->bind_param("s", $Nom);
$check->execute();
if ($check->get_result()->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Ce nom d'utilisateur existe déjà"]);
    exit();
}

// Insertion avec le mot de passe HACHÉ ($Passwordhash)
$stmt = $conn->prepare("INSERT INTO login (Nom, Email, Motdepass) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $Nom, $Email, $Passwordhash);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Compte créé avec succès"]);
} else {
    echo json_encode(["status" => "error", "message" => "Erreur lors de l'insertion en base de données"]);
}

$stmt->close();
$conn->close();
?>