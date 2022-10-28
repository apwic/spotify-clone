<?php

require_once '../config.php';

$query = $con->prepare("SELECT DISTINCT `genre` FROM `song`");

if(!$query->execute()){
  $result = ["status" => "error", "description" => $con->error];
  http_response_code(500);
  exit(json_encode($result));
}

$query_result = $query->get_result();
$payload = [];

while($row = $query_result->fetch_assoc()){
  array_push($payload, $row);
}

if (!$payload) {
  $result = ["status" => "error", "description" => "no genres"];
  http_response_code(404);
  exit(json_encode($result));
} else {
  $result = ["status" => "success", "description" => "genres retrieved", "payload" => $payload];
  echo json_encode($result);
}
