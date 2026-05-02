<?php
$host = 'gateway01.eu-central-1.prod.aws.tidbcloud.com';
$port = 4000;
$user = 'yWqsMAJrP1o6qYL.root'; 
$password = '9V8B0sdDWkCOH6Ln'; 
$dbname = 'test';

// 1. Initialisation de l'objet de connexion
$conn = mysqli_init();

// 2. Configuration du SSL (Indispensable pour TiDB Cloud)
// On passe NULL car les certificats publics de TiDB sont reconnus automatiquement
mysqli_ssl_set($conn, NULL, NULL, NULL, NULL, NULL);

// 3. Établissement de la connexion sécurisée
if (!mysqli_real_connect($conn, $host, $user, $password, $dbname, $port, NULL, MYSQLI_CLIENT_SSL)) {
    die("Erreur de connexion : " . mysqli_connect_error());
}

// 4. Encodage pour éviter les problèmes d'accents
mysqli_set_charset($conn, "utf8mb4");
?>