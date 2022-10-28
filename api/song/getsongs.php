<?php

require_once '../config.php';

$id = $_GET['album_id'];
$query = $con->prepare("SELECT `song_id`, `judul`, `penyanyi`, `tanggal_terbit`, `genre`, `duration`, `audio_path`, `image_path`, `album_id` 
                        FROM `song` 
                        WHERE `album_id` = ?");
$query->bind_param("i", $id);

if(!$query->execute()){
  $result = ["status" => "error", "description" => $con->error];
  http_response_code(500);
  exit(json_encode($result));
}

$query_result = $query->get_result();
$payload = [];

while($row = $query_result->fetch_assoc()) {
  array_push($payload, $row);
}

if (!$payload) {
  $result = ["status" => "error", "description" => "no songs with such id"];
  http_response_code(404);
  exit(json_encode($result));
} else {
  $result = ["status" => "success", "description" => "songs retrieved", "payload" => $payload];
  echo json_encode($result);
}