<?php
require_once '../config.php';

// set the default values from data input
$singers = json_decode($_POST['singers']);
$subscriber_id = (int)$_POST['subscriber_id'];

$isUpdated = false;

foreach ($singers as $singer) {
    $creator_id = $singer->user_id;
    
    // xml post structure
    $xml_post_string = 
    '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
            <checkStatus xmlns="http://controllers/">
                <arg0 xmlns="">'.$creator_id.'</arg0>
                <arg1 xmlns="">'.$subscriber_id.'</arg1>
            </checkStatus>
        </Body>
    </Envelope>';
    
    // send xml req through curl
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, SOAP_URL);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: text/xml', 'Authorization: ' . API_KEY));
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $xml_post_string);
    
    $res = curl_exec($curl);
    if ($res == false) {
        $err = curl_error($curl);
        $result = ["status" => "error", "description" => "unable to get subscription status for artist" . $err];
        http_response_code(500);
        exit(json_encode($err));
    } else {
        $res = preg_replace("/(<\/?)(\w+):([^>]*>)/", "$1$2$3", $res);
        $xml = new SimpleXMLElement($res);
        $body = $xml->xpath('//SBody//ns2checkStatusResponse//return');
        $array = json_decode(json_encode((array)$body), TRUE);

        if ($array[0] !== []) {
          if ($array[0] == ["ACCEPTED"]) {
            $status = "ACCEPTED";
          } else if ($array[0] == ["PENDING"]) {
            $status = "PENDING";
          } else {
            $status = "REJECTED";
          }
  
          // get current subsription status for artist
          $sqlQuery = $con->prepare('SELECT `status` FROM `subscription` WHERE `subscriber_id` = ' . $subscriber_id . ' AND `creator_id` = ' . $creator_id);
          if (!$sqlQuery->execute()){
              $result = ["status" => "error", "description" => "unable to get subscription status for artist" . $con->error];
              http_response_code(500);
              exit(json_encode($result));
          }
      
          $currentStatus = ($sqlQuery->get_result()->fetch_assoc())["status"];
      
          if ($currentStatus != $status) {
              $isUpdated = true;
              // sync newest subscription status to app's db
              $query = $con->prepare("UPDATE `subscription`
                              SET `status` = ?
                              WHERE `creator_id` = ?
                              AND `subscriber_id` = ?"); 
              $query->bind_param('sii', $status, $creator_id, $subscriber_id);
              if (!$query->execute()) {
                  $result = ["status" => "error", "description" => $con->error];
                  http_response_code(500);
                  exit(json_encode($result));
              }
          }
        }
    
    }
    curl_close($curl);
}

$result = ["status" => "success", "description" => "status checked", "data" => $isUpdated];
http_response_code(200);
exit (json_encode($result))

?>