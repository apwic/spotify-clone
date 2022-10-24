<?php

require_once '../config.php';

$id = $_GET['id'];
$query = $con->prepare("SELECT `album_id`, `judul`, `penyanyi`, `total_duration`, `image_path`, `tanggal_terbit`, `genre` 
                        FROM `album` 
                        WHERE `album_id` = ?");
$query->bind_param("i", $id);

if(!$query->execute()){
  $result = ["status" => "error", "description" => $con->error];
  http_response_code(500);
  exit(json_encode($result));
}

$query_result = $query->get_result();

if($query_result->num_rows != 1) {
  $result = ["status" => "no_album", "description" => "no album with such id"];
  http_response_code(404);
  exit(json_encode($result));
}

$payload = $query_result->fetch_assoc();
$result = ["status" => "success", "description" => "album found", "payload" => $payload];
echo json_encode($result);