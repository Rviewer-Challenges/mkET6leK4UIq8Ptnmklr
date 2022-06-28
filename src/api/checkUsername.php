
<?php

include('db.php');

header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");


if($_SERVER['REQUEST_METHOD'] == 'GET'){

    $body = json_decode(file_get_contents('php://input'));

    if ($_GET['username'] != null){
      $command = "SELECT * FROM users WHERE user_name = ?";

      $database = new Database();
      $query = $database->connection->prepare($command);
      $query->bind_param('s', $_GET['username']);
      $query->execute();

      $data = $query->get_result()->fetch_all(MYSQLI_ASSOC);
      echo json_encode($data); exit;
      exit;


    }

}
