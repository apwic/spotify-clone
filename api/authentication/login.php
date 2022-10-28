<?php
require_once '../config.php';

// check if the username is there or not
if (!isset($_POST['username'])) {
    $result = ["status" => "error", "description" => "Invalid"];
    http_response_code(404);

    exit(json_encode($result));
} else {
    // set the default values from data input
    $username = $_POST['username'];
    $password = $_POST['password'];

    // check and validate the username
    $sqlQuery = $con->prepare('SELECT * FROM `users` WHERE `username` = ?');
    $sqlQuery->bind_param('s', $username);

    // this code to check response code for debugging
    if (!$sqlQuery->execute()) {
        $result = ["status" => "error", "description" => "Query not executed"];
        http_response_code(500);
        exit(json_encode($result));
    }

    $queryResult = $sqlQuery->get_result();

    // there is no data with given username
    if ($queryResult->num_rows != 1) {
        $result = ["status" => "error", "description" => "No such user"];
        http_response_code(401);

        exit(json_encode($result));
    }

    // check if the password is correct
    $rowQueryResult = $queryResult->fetch_assoc();
    if (!password_verify($password, $rowQueryResult['password'])) {
        $result = ["status" => "error", "description" => "Invalid password"];
        http_response_code(400);

        exit(json_encode($result));
    }

    // get the user id
    $userID = $rowQueryResult['user_id'];

    // set the session's expired time
    $expTime = time() + 1800;
    $setDate = date('Y-m-d H:i:s', $expTime);

    // make the session id with hash
    $sessionHash = hash('sha256', $userID . $expTime);

    // insert the session to sessions column
    $sqlQuery = $con->prepare('INSERT INTO `sessions` (`session_id`, `user_id`, `exp`) VALUES (?, ?, ?)');
    $sqlQuery->bind_param('sis', $sessionHash, $userID, $setDate);

    // this code to check response code for debugging
    if (!$sqlQuery->execute()) {
        $result = ["status" => "error", "description" => "Cannot execute query"];
        http_response_code(500);

        exit(json_encode($result));
    }

    // return the session id to validate user and set the cookie
    $session = ["sessionToken" => $sessionHash];
    $result = ["status" => "success", "description" => "User is logged in", "session" => $session];
    http_response_code(200);
    
    echo json_encode($result);
}

?>