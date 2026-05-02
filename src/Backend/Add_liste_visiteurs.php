<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db.php';

$data = json_decode(file_get_contents('php://input'),true);

if(!$data || !isset($data['Nom']) || !isset($data['Numero']) || !isset($data['Jours']) || !isset($data['Tarif'])){
    echo json_encode([
        "status"=>"error",
        "message"=>"Aucune donnée reçue ,verifiez!!"
    ]);
    exit();
}

$Nom = $data['Nom'];
$Numero = $data['Numero'];
$Nbrjours = $data['Jours'];
$Tarifjournalier = $data['Tarif'];
$Total = $Nbrjours * $Tarifjournalier;

$stmt = $conn->prepare("INSERT INTO listedesvisiteurs (Nom, Numero, Jours, Tarif , Total) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("ssiii", $Nom, $Numero, $Nbrjours, $Tarifjournalier, $Total);
if($stmt->execute()){
    echo json_encode([
        "status"=> "success",
        "message"=> "Donnée bien enregistrer"
    ]);
}else{
    echo json_encode([
        "status"=> "error",
        "message"=> "Error !!! Donnée n'est pas enregistrer"
    ]);
}
$stmt->close();
$conn->close();
?>
