
<?php

include('db.php');

header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");


if($_SERVER['REQUEST_METHOD'] == 'POST'){

    $body = json_decode(file_get_contents('php://input'));

    if($body->action == "like"){
        $command = "INSERT INTO tweet_likes (user_id, tweet_id) VALUES (?, ?)";
        $database = new Database();

        $query = $database->connection->prepare($command);
        $query->bind_param('ii', $body->user_id, $body->tweet_id);
        $query->execute();
        exit;
    }

    if($body->action == "unlike"){
        $command = "DELETE FROM tweet_likes WHERE user_id = ? AND tweet_id = ?";
        $database = new Database();
        $query = $database->connection->prepare($command);
        $query->bind_param('ii', $body->user_id, $body->tweet_id);
        $query->execute();
        exit;
    }

}
?>