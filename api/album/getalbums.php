<?php

require_once '../config.php';
$page_size = constant('PAGE_SIZE');

$query = $con->prepare("SELECT `album_id`, `judul`, `penyanyi`, `total_duration`, `image_path`, `tanggal_terbit`, `genre`
                        FROM `ALBUM`
                        ORDER BY `judul` ASC");

if(!$query->execute()){
  $result = ["status" => "error", "description" => $con->error];
  http_response_code(500);
  exit(json_encode($result));
}

$query_result = $query->get_result();
$result = [];
$count_rows = $query_result->num_rows;
$page = $_GET['page'];
$page_start = ($page - 1) * $page_size;

if ($page_start + $page_size < $count_rows) {
  $page_end = $page_start + $page_size;
} else {
  $page_end = $count_rows;
}

// FETCH BY PAGE
while ($row = $query_result->fetch_assoc()) {
  array_push($result, $row);
}

$payload = array_slice($result, $page_start, $page_end);

if (!$payload) {
  $result = ["status" => "error", "description" => "no albums"];
  http_response_code(404);
  exit(json_encode($result));
} else {
  $result = ["status" => "success", "description" => "albums retrieved", "payload" => $payload];
  echo json_encode($result);
}