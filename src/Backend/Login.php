<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'db.php'; // Ce fichier doit contenir tes accès TiDB

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['username']) && isset($data['password'])) {
    $login_input = $data['username'];
    $password_input = $data['password'];

    // On cherche l'utilisateur dans TiDB par son nom OU son email
    $stmt = mysqli_prepare($conn, "SELECT name, password FROM login WHERE name = ? OR email = ?");
    mysqli_stmt_bind_param($stmt, "ss", $login_input, $login_input);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $user = mysqli_fetch_assoc($result);

    // Vérification du mot de passe (en clair pour ton test actuel)
    if ($user && $password_input === $user['password']) {
        echo json_encode([
            "status" => "success", 
            "message" => "Connexion réussie",
            "user" => $user['name']
        ]);
    } else {
        echo json_encode([
            "status" => "error", 
            "message" => "Identifiants incorrects"
        ]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Données incomplètes"]);
}
?>
