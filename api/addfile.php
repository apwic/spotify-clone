<?php
if (($_POST['type']) != ("song")) {
    $target_dir =  __DIR__ . '/../assets/' . $_POST['type'];
    $target_filename = basename($_FILES["img_lagu"]["name"]);
    $target_filepath = $target_dir . $target_filename;
    
    
    if (!file_exists($target_filepath)) {
        if(!move_uploaded_file($_FILES["img_lagu"]["tmp_name"], $target_filepath)) {
          $result = ["status" => "error", "description" => "upload failed"];
          http_response_code(500);
          exit(json_encode($result));
        } else {
            $result = ["status" => "success", "description" => "file successfully uploaded", "path" => ("./assets/" . $_POST['type'] . $target_filename)] ;
            echo(json_encode($result));
        }   
    } else {
        $result = ["status" => "error", "description" => "file already exists"];
        http_response_code(400);
        exit(json_encode($result));
    }
    
} else {
    $target_dir =  __DIR__ . '/../assets/music/';
    $target_filename = basename($_FILES["file_lagu"]["name"]);
    $target_filepath = $target_dir . $target_filename;
    
    
    if (!file_exists($target_filepath)) {
        if(!move_uploaded_file($_FILES["file_lagu"]["tmp_name"], $target_filepath)) {
          $result = ["status" => "error", "description" => "upload failed", $_FILES["file_lagu"]];
          http_response_code(500);
          exit(json_encode($result));
        } else {
            $result = ["status" => "success", "description" => "file successfully uploaded", "path" => ("./assets/music/" . $target_filename)] ;
            echo(json_encode($result));
        }   
    } else {
        $result = ["status" => "error", "description" => "file already exists", $_FILES["file_lagu"]];
        http_response_code(400);
        exit(json_encode($result));
    }
}
?>