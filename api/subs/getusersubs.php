<?php
require_once '../config.php';

$userID = isUserAlreadyLoggedIn($con);

if ($userID == -1) {
    $result = ["status" => "error", "description" => "User is not logged in"];
    exit(json_encode($result));
}

// get all subs from specific user
$sqlQuery = $con->prepare('SELECT * FROM `subscription` WHERE `subscriber_id` = ' . $userID);
if (!$sqlQuery->execute()){
    $result = ["status" => "error", "description" => $con->error];
    http_response_code(500);
    exit(json_encode($result));
}

$query_result = $sqlQuery->get_result();
$payload = [];
$count_rows = $query_result->num_rows;

// FETCH ALL ROWS
for($i = 0; $i < $count_rows; $i++) {
  array_push($payload, $query_result->fetch_assoc());
}

if (!$payload) {
  $result = ["status" => "success", "description" => "No subscriptions found", "payload" => $payload];
  echo json_encode($result);
} else {
  $result = ["status" => "success", "description" => "albums retrieved", "payload" => $payload];
  echo json_encode($result);
}

?>