<?php

require_once '../config.php';

echo(json_encode("hihi"));
$songs = json_decode($_POST["songs"]);
foreach ($songs as $song) {
    echo(json_encode("hihi"));
    $song_id = $song->song_id;
    echo(json_encode($song));
    deleteSong($con, $song_id);
}
echo(json_encode("hihi"));


$id = $_POST["id"];
$query = $con->prepare("SELECT `image_path` 
    FROM `ALBUM` 
    WHERE `album_id` = ?");
$query->bind_param("i", $id);

if(!$query->execute()){
    $result = ["status" => "error", "description" => "unable to find cover file"];
    http_response_code(500);
    exit(json_encode($result));
}

$target = ($query->get_result()->fetch_assoc());
$target_image = "../." . $target["image_path"];

if (file_exists($target_image)) {
    unlink($target_image);
} else {
    $result = ["status" => "error", "description" => "unable to delete img file"];
    http_response_code(500);
    exit(json_encode($result));
}
$query = $con->prepare("DELETE 
    FROM `ALBUM` 
    WHERE `album_id` = ?");
$query->bind_param("i", $id);

if(!$query->execute()){
    $result = ["status" => "error", "description" => "unable to delete album"];
    http_response_code(500);
    exit(json_encode($result));
}
$result = ["status" => "success", "description" => "album deleted"];
echo json_encode($result);

?>