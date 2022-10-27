<?php
require_once '../config.php';

// set the default values from data input
$audio_path = $_POST['audio_path'];
$duration = intval($_POST['duration']);
$genre = $_POST['genre_lagu'];
$image_path = $_POST['image_path'];
$judul = $_POST['judul_lagu'];
$album_id = $_POST['album_lagu'];
$tanggal_terbit = $_POST['tanggalterbit_lagu'];

// get album's current total duration
$query = $con->prepare("SELECT `total_duration` 
                        FROM `ALBUM` 
                        WHERE `album_id` = ?");
$query->bind_param("i", $album_id);
if(!$query->execute()){
  $result = ["status" => "error", "description" => "unable to find album"];
  http_response_code(500);
  exit(json_encode($result));
}
$current_duration = ($query->get_result()->fetch_assoc())["total_duration"] + $duration;

// update album's total duration
$query = $con->prepare("UPDATE `ALBUM`
                        SET `total_duration` = ?
                        WHERE `album_id` = ?");
$query->bind_param("ii", $current_duration, $album_id);
if(!$query->execute()) {
  $result = ["status" => "error", "description" => "unable to update song"];
  http_response_code(500);
  exit(json_encode($result));
}

// update song to db
$mainquery = $con->prepare('UPDATE `SONG` 
                            SET `album_id` = ?, `audio_path` = ?, `duration` = ?, `genre` = ?, `image_path` = ?, `judul` = ?, `tanggal_terbit` = ?
                            WHERE `song_id` = ?');
$mainquery->bind_param('isissssi', $album_id, $audio_path, $duration, $genre, $image_path, $judul, $tanggal_terbit, $_POST['song_id']);

if (!$mainquery->execute()) { 
    $result = ["status" => "error", "description" => $con->error];
    http_response_code(500);
    exit(json_encode($result));
}

$result = ["status" => "success", "description" => "song successfully changed"];
http_response_code(200);

echo json_encode($result);

?>