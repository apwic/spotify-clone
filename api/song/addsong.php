<?php
require_once '../config.php';

// set the default values from data input
$audio_path = $_POST['audio_path'];
$duration = $_POST['duration'];
$genre = $_POST['genre_lagu'];
$image_path = $_POST['image_path'];
$judul = $_POST['judul_lagu'];
$album_id = $_POST['album_lagu'];
$penyanyi = $_POST['penyanyi_lagu'];
$tanggal_terbit = $_POST['tanggalterbit_lagu'];

// get album's current total duration
$query = $con->prepare("SELECT `total_duration` 
                        FROM `album` 
                        WHERE `album_id` = ?");
$query->bind_param("i", $album_id);
if(!$query->execute()){
  $result = ["status" => "error", "description" => "unable to find album"];
  http_response_code(500);
  exit(json_encode($result));
}
$current_duration = intval(($query->get_result()->fetch_assoc())["total_duration"] + $duration);

// update album's total duration
$query = $con->prepare("UPDATE `album`
                        SET `total_duration` = ?
                        WHERE `album_id` = ?");
$query->bind_param("ii", $current_duration, $album_id);
if(!$query->execute()) {
  $result = ["status" => "error", "description" => "unable to add song"];
  http_response_code(500);
  exit(json_encode($result));
}

// insert song to db
$mainquery = $con->prepare('INSERT INTO `song` (`album_id`, `audio_path`, `duration`, `genre`, `image_path`, `judul`, `penyanyi`, `tanggal_terbit`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
$mainquery->bind_param('isisssss', $album_id, $audio_path, $duration, $genre, $image_path, $judul, $penyanyi, $tanggal_terbit);
if (!$mainquery->execute()) {
    $result = ["status" => "error", "description" => "query not executed"];
    http_response_code(500);
    exit(json_encode($result));
}

$result = ["status" => "success", "description" => "song successfully added"];
http_response_code(200);

echo json_encode($result);

?>