<?php
require_once '../config.php';

// set the default values from data input
$audio_path = $_POST['audio_path'];
$duration = $_POST['duration'];
$genre = $_POST['genre_lagu'];
$image_path = $_POST['image_path'];
$judul = $_POST['judul_lagu'];
$judul_album = $_POST['album_lagu'];
$penyanyi = $_POST['penyanyi_lagu'];
$tanggal_terbit = $_POST['tanggalterbit_lagu'];
$query = $con->prepare("SELECT `album_id` 
                        FROM `ALBUM` 
                        WHERE `judul` = ?");
$query->bind_param("s", $judul_album);
if (!$query->execute()) {
    $result = ["status" => "error", "description" => "query not executed"];
    http_response_code(500);
    exit(json_encode($result));
}
$album_id = $query->get_result();

// insertion of song
$mainquery = $con->prepare('INSERT INTO `SONG` (`album_id`, `audio_path`, `duration`, `genre`, `image_path`, `judul`, `penyanyi`, `tanggal_terbit`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
$mainquery->bind_param('isisssss', $album_id, $audio_path, $duration, $genre, $image_path, $judul, $penyanyi, $tanggal_terbit);
if (!$mainquery->execute()) {
    $result = ["status" => "error", "description" => "query not executed"];
    http_response_code(500);
    exit(json_encode($result));
}

$result = ["status" => "success", "description" => "song successfully added", "session" => $session];
http_response_code(200);

echo json_encode($result);

?>