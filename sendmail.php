<?php
$address = array('shimamura' => "YOUR_EMAIL_ADDRESS",
                 'shibuya'   => null,
                 'honda'     => null,
                 'akagi'     => null,
                 'kanzaki'   => null,
                 'jougasaki' => null);

if( isset($_POST["id"])     && 
    isset($_POST["name"])   && 
    isset($_POST["data"])   && 
    !empty($_POST["id"])    && 
    !empty($_POST["name"])  && 
    !empty($_POST["data"])) {

    $to      = $address[$_POST["id"]];
    $subject = 'callsign: ' . $_POST["data"];
    $data    = $_POST["data"];
    $headers = 'From: callsign@example.com' . "\r\n" . 'X-Mailer: PHP/' . phpversion();

    if(!($to == "")) 
      //mail($to, $subject, $data, $headers);
      file_put_contents(dirname(__FILE__).'/success.txt', $_POST["data"]);

}
