<?php
require_once '../config.php';

// set the default values from data input
$creator_id = (int)$_POST['creator_id'];
$subscriber_id = (int)$_POST['subscriber_id'];
$creator_name = $_POST['creator_name'];
$subscriber_name = $_POST['subscriber_name'];
$status = $_POST['status'];

error_reporting(E_ALL);
ini_set('display_errors', 1);

// insert subscription
$query = $con->prepare('INSERT INTO `subscription` (`creator_id`, `subscriber_id`, `creator_name`, `subscriber_name`, `status`) VALUES (?, ?, ?, ?, ?)');
echo $con->error;
$query->bind_param('iisss', $creator_id, $subscriber_id, $creator_name, $subscriber_name, $status);
if (!$query->execute()) {
    $result = ["status" => "error", "description" => "query not executed"];
    http_response_code(500);
    exit(json_encode($result));
}

$result = ["status" => "success", "description" => "subscription successfully added"];
http_response_code(200);

echo json_encode($result);

?>