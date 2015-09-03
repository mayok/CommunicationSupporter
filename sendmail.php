<?php
if( isset($_POST["id"])     &&
    isset($_POST["name"])   &&
    isset($_POST["data"])   &&
    isset($_POST["email"])  &&
    !empty($_POST["id"])    &&
    !empty($_POST["name"])  &&
    !empty($_POST["data"])  &&
    !empty($_POST["email"]) )  {

    $to      = $_POST["email"];
    $subject = 'callsign: ' . $_POST["data"];
    $data    = $_POST["data"];
    $headers = 'From: callsign@example.com' . "\r\n" . 'X-Mailer: PHP/' . phpversion();

    if(!($to == ""))
      mail($to, $subject, $data, $headers);
      //file_put_contents(dirname(__FILE__).'/success.txt',$to.$subject.$data);
}
