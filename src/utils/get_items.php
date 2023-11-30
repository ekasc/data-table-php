<?php

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$itemsPerPage = 10;
$offset = ($page - 1) * $itemsPerPage;

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $db = new PDO("mysql:host=localhost;dbname=data_table", "root", "rootpassword", $options);
} catch (PDOException $err) {
    die("Connection failed: " . $err);
}

$query = $db->prepare("select count(*) from sample_table");
$query->execute();
$totalRecords = $query->fetchColumn();

$query = $db->prepare("select * from sample_table limit :limit offset :offset");
$query->bindValue(':limit', $itemsPerPage, PDO::PARAM_INT);
$query->bindValue(':offset', $offset, PDO::PARAM_INT);
$query->execute();

$results = $query->fetchAll(PDO::FETCH_ASSOC);
$data = [
    'totalRecords' => $totalRecords,
    'data' => $results
];

header("Content-Type: application/json");
echo json_encode($data);
exit;
