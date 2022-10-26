<?php

require_once '../config.php';

$id = $_POST["id"];

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

if (file_exists($target_audio) && file_exists($target_audio)) {
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

?>