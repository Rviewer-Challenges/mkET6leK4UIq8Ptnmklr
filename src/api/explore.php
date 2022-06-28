
<?php

include('db.php');

header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");


if($_SERVER['REQUEST_METHOD'] == 'GET'){

    $database = new Database();

    if($_GET['user_id'] != null){
        $command = "SELECT a.*
                    FROM (
                    SELECT tweets.*, users.user_name, users.user_nickname, users.avatar, users.verified
                    FROM tweets
                    LEFT JOIN users ON
                    users.user_id = tweets.user_id
                    WHERE
                    1
                    GROUP BY
                    tweets.tweet_id
                    ORDER BY tweets.timestamp DESC
                    ) AS a
                    LEFT JOIN
                    
                    (
                    SELECT tweet.*
                    FROM
                    (
                    SELECT tw.*
                    FROM (
                    SELECT tweets.*, users.user_name, users.user_nickname, users.avatar, users.verified
                    FROM tweets
                    RIGHT JOIN (
                    SELECT *
                    FROM followers
                    WHERE user_id = ?) FOLLOWING ON
                    FOLLOWING.following = tweets.user_id OR tweets.user_id = ?
                    LEFT JOIN users ON
                    users.user_id = tweets.user_id
                    GROUP BY
                    tweets.tweet_id) AS tw
                    LEFT JOIN tweet_likes ON 
                    tw.tweet_id = tweet_likes.tweet_id
                    GROUP BY
                    tw.tweet_id) AS tweet
                    GROUP BY
                    tweet.tweet_id
                    ORDER BY tweet.timestamp DESC) AS bb ON 
                    a.tweet_id = bb.tweet_id
                    WHERE bb.tweet_id IS NULL
        ";
                    
    $query = $database->connection->prepare($command);
    $query->bind_param('ii', $_GET['user_id'], $_GET['user_id']);
    $query->execute();
        
    $data = $query->get_result()->fetch_all(MYSQLI_ASSOC);
    echo json_encode($data); exit;
    }
}
