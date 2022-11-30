<?php
require_once '../config.php';

// set the default values from data input
parse_str(file_get_contents("php://input"), $res);
$creator_id = $res['creator_id'];
$subscriber_id = $res['subscriber_id'];
$status = $res['status'];

// insert subscription
$query = $con->prepare("UPDATE `subscription`
                        SET `status` = ?
                        WHERE `creator_id` = ?
                        AND `subscriber_id` = ?");
$query->bind_param('sii', $status, $creator_id, $subscriber_id);
if (!$query->execute()) {
    $result = ["status" => "error", "description" => "query not executed"];
    http_response_code(500);
    exit(json_encode($result));
}

$result = ["status" => "success", "description" => "subscription successfully updated"];
http_response_code(200);

echo json_encode($result);

?>