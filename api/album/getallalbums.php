<?php

require_once '../config.php';
$query = $con->prepare("SELECT `album_id`, `judul`, `penyanyi`, `total_duration`, `image_path`, `tanggal_terbit`, `genre`
                        FROM `ALBUM`");

if(!$query->execute()){
  $result = ["status" => "error", "description" => $con->error];
  http_response_code(500);
  exit(json_encode($result));
}

$query_result = $query->get_result();
$payload = [];
$count_rows = $query_result->num_rows;

// FETCH ALL ROWS
for($i = 0; $i < $count_rows; $i++) {
  array_push($payload, $query_result->fetch_assoc());
}

if (!$payload) {
  $result = ["status" => "error", "description" => "no albums"];
  http_response_code(404);
  exit(json_encode($result));
} else {
  $result = ["status" => "success", "description" => "albums retrieved", "payload" => $payload];
  echo json_encode($result);
}