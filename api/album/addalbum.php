<?php
require_once '../config.php';

// set the default values from data input
$genre = $_POST['genre_album'];
$image_path = $_POST['image_path'];
$judul = $_POST['judul_album'];
$penyanyi = $_POST['penyanyi_album'];
$tanggal_terbit = $_POST['tanggalterbit_album'];
$total_duration = 0;

// insert album to db
$mainquery = $con->prepare('INSERT INTO `album` (`genre`, `image_path`, `judul`, `penyanyi`, `tanggal_terbit`, `total_duration`) VALUES (?, ?, ?, ?, ?, ?)');
$mainquery->bind_param('sssssi', $genre, $image_path, $judul, $penyanyi, $tanggal_terbit, $total_duration);
if (!$mainquery->execute()) {
    $result = ["status" => "error", "description" => "query not executed"];
    http_response_code(500);
    exit(json_encode($result));
}

$result = ["status" => "success", "description" => "album successfully added", "session" => $session];
http_response_code(200);

echo json_encode($result);

?>