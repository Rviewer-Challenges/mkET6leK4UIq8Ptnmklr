
<?php

include('db.php');

header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");


if($_SERVER['REQUEST_METHOD'] == 'GET'){

    $database = new Database();

    if($_GET['tweet_id'] != null){
        $command = "SELECT tweets.*, users.user_name, users.user_nickname, users.avatar, users.verified, COUNT(tweet_likes.tweet_id) AS likes
        FROM tweets
        LEFT JOIN users ON
         users.user_id = tweets.user_id
        LEFT JOIN tweet_likes ON 
          tweets.tweet_id = tweet_likes.tweet_id
       WHERE
           tweets.type = 'response' AND tweets.original_tweet = ?
        GROUP BY
        tweets.tweet_id
        ORDER BY tweets.timestamp DESC
        ";
                    
    $query = $database->connection->prepare($command);
    $query->bind_param('i', $_GET['tweet_id']);
    $query->execute();
        
    $data = $query->get_result()->fetch_all(MYSQLI_ASSOC);
    echo json_encode($data); exit;
    }
}
