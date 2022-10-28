<?php
require_once '../config.php';

// check if the user has logged in or not
$userID = isUserAlreadyLoggedIn($con);

if ($userID == -1) {
    $result = ["status" => "error", "description" => "User is not logged in"];
    exit(json_encode($result));
}

// get user data
$sqlQuery = $con->query('SELECT * FROM `users` WHERE `user_id` = ' . $userID);

$dataUser = $sqlQuery->fetch_assoc();
$result = ["status" => "success", "description" => "Get user data", "dataUser" => $dataUser];
echo json_encode($result);

?>