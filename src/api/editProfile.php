
<?php

include('db.php');

header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");


if($_SERVER['REQUEST_METHOD'] == 'POST'){

    $body = json_decode(file_get_contents('php://input'));

    if ($_GET['user_id'] != null){
      $command = "UPDATE users
      SET user_nickname = ?, avatar = ?, description = ?, background = ?
      WHERE user_id = ?";

      $database = new Database();
      $query = $database->connection->prepare($command);
      $query->bind_param('ssssi', $body->user_nickname, $body->avatar, $body->description, $body->background, $_GET['user_id']);
      $query->execute();
      exit;


    }

}
