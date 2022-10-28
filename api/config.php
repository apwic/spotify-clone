<?php

// set header content type
header('Content-Type: application/json');

// set constant
define('HOST', 'localhost');
define('USER', 'root');
define('PASS', '');
define('DBNAME', 'sepotipayi');
define('PAGE_SIZE', 10);
define('PAGE_SIZE_ALBUM', 12);

$con = new mysqli(HOST, USER, PASS, DBNAME);

// this code to check response code for debugging
if ($con->connect_errno) {
    $result = ["status" => "error", "description" => "Cannot connect to database"];
    http_response_code(401);

    exit(json_encode($result));
}

// check is user already logged in
function isUserAlreadyLoggedIn($con) {
    // getting all headers that have been requested
    $headers = getallheaders();

    // empty session token
    if (!isset($headers['sessionToken'])) {
        return -1;
    }

    // get the session token
    $sessionToken = $headers['sessionToken'];

    // check session in database
    $sqlQuery = $con->prepare('SELECT * FROM `SESSIONS` WHERE `session_id` = ?');
    $sqlQuery->bind_param('s', $sessionToken);
    
    // check the query executing
    if (!$sqlQuery->execute()) {
        return -1;
    }

    $queryResult = $sqlQuery->get_result();

    // no data
    if ($queryResult->num_rows == 0) {
        return -1;
    }

    // check if session is still valid
    $rowQueryResult = $queryResult->fetch_assoc();
    $exp = strtotime($rowQueryResult['exp']);
    $curr = time();

    if ($curr > $exp) {
      return -1;
    }

    // return user id and user has logged in
    return $rowQueryResult['user_id'];
}

// check if user is admin
function isAdmin($con, $userId) {
    // get the user id
    $userId = isUserAlreadyLoggedIn($con);

    // doesn't get the user id
    if ($userId == -1) {
        return false;
    }

    // get the data
    $sqlQuery = $con->query('SELECT `isAdmin` FROM `USERS` WHERE `user_id` = ' . $userId);
    $rowQueryResult = $sqlQuery->fetch_assoc();

    // check the isAdmin column
    if (!$rowQueryResult) {
        return false;
    }

    // return if user is admin or not
    return $rowQueryResult['isAdmin'] == 1;
}

// deleting song
function deleteSong($con, $id) {
    $query = $con->prepare("SELECT `audio_path`, `image_path` 
        FROM `SONG` 
        WHERE `song_id` = ?");
    $query->bind_param("i", $id);
    
    if(!$query->execute()){
        $result = ["status" => "error", "description" => "unable to find file"];
        http_response_code(500);
        exit(json_encode($result));
    }
    $target = ($query->get_result()->fetch_assoc());
    $target_audio = "../." . $target["audio_path"];
    $target_image = "../." . $target["image_path"];
    
    if (file_exists($target_audio) && file_exists($target_image)) {
        unlink($target_audio);
        unlink($target_image);
    } else {
        $result = ["status" => "error", "description" => "unable to delete img/audio file"];
        http_response_code(500);
        exit(json_encode($result));
    }
    $query = $con->prepare("DELETE 
        FROM `SONG` 
        WHERE `song_id` = ?");
    $query->bind_param("i", $id);
    
    if(!$query->execute()){
        $result = ["status" => "error", "description" => "unable to delete song"];
        http_response_code(500);
        exit(json_encode($result));
    }
    $result = ["status" => "success", "description" => "song deleted"];
    echo json_encode($result);
}

// delete song file
function deleteFile($path){
  $target = "./." . $path;
  if (file_exists($target)) {
    unlink($target);
  } else {
    $result = ["status" => "error", "description" => "unable to delete file"];
    http_response_code(500);
    exit(json_encode($result));
  }
}