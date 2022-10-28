<?php

require_once '../config.php';

$id = $_GET['id'];
$query = $con->prepare("SELECT `song_id`, `SONG`.`judul`, `SONG`.`penyanyi`, `SONG`.`tanggal_terbit`, `SONG`.`genre`, `duration`, `audio_path`, `SONG`.`image_path`, `SONG`.`album_id`, `ALBUM`.`judul` AS `judul_album`
                        FROM `SONG` INNER JOIN `ALBUM` 
                        WHERE `song_id` = ? AND `SONG`.`album_id` = `ALBUM`.`album_id`");
$query->bind_param("i", $id);

if(!$query->execute()){
  $result = ["status" => "error", "description" => $con->error];
  http_response_code(500);
  exit(json_encode($result));
}

$query_result = $query->get_result();

if($query_result->num_rows != 1) {
  $result = ["status" => "no_song", "description" => "no song with such id"];
  http_response_code(404);
  exit(json_encode($result));
}

$payload = $query_result->fetch_assoc();
$result = ["status" => "success", "description" => "song found", "payload" => $payload];
echo json_encode($result);