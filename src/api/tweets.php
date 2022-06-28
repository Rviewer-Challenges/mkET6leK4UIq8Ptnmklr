
<?php

include('db.php');

header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");


if($_SERVER['REQUEST_METHOD'] == 'GET'){


  if($_GET['tweet_stats'] !=null){

    $command = "SELECT 
x.likes, y.*, z.*, a.*, b.*
      
FROM (SELECT COUNT(tweet_likes.tweet_id) AS likes
      FROM tweets
      LEFT JOIN users ON users.user_id = tweets.user_id
      LEFT JOIN tweet_likes ON tweets.tweet_id = tweet_likes.tweet_id
      WHERE tweets.tweet_id = ?
      GROUP BY tweets.tweet_id
      ORDER BY tweets.timestamp DESC) AS x,
      
(
SELECT COUNT(*)  as retweets 
FROM tweets
WHERE tweets.original_tweet = ?
AND tweets.type = 'retweet'
) AS y,

(
SELECT COUNT(*)  as response 
FROM tweets
WHERE tweets.original_tweet = ?
AND tweets.type = 'response'
) AS z,

(
SELECT COUNT(*) as liked 
FROM tweet_likes
WHERE tweet_likes.tweet_id = ? AND tweet_likes.user_id = ?
) AS a,

(SELECT COUNT(*) as retweeted 
FROM tweets
WHERE tweets.type = 'retweet'
AND tweets.user_id = ?
AND tweets.original_tweet = ?
) AS b
      ";

      $database = new Database();
      $query = $database->connection->prepare($command);
      $query->bind_param('iiiiiii',$_GET['tweet_id'], $_GET['tweet_id'], $_GET['tweet_id'], $_GET['tweet_id'] ,$_GET['user_id'], $_GET['user_id'] ,$_GET['tweet_id']  );
      $query->execute();


      $data = $query->get_result()->fetch_all(MYSQLI_ASSOC);

      echo json_encode($data); exit;
  }


  if($_GET['search'] != null){
    $command = "
    SELECT tweets.*, users.user_name, users.user_nickname, users.avatar, users.verified, COUNT(tweet_likes.tweet_id) AS likes
    FROM tweets
    LEFT JOIN users ON
     users.user_id = tweets.user_id
    LEFT JOIN tweet_likes ON 
      tweets.tweet_id = tweet_likes.tweet_id
   WHERE
       UPPER(tweets.text) LIKE UPPER(?)
    GROUP BY
    tweets.tweet_id
    ORDER BY tweets.timestamp DESC
     ";

    $value = "%" . $_GET['search'] . "%";
    $database = new Database();
    $query = $database->connection->prepare($command);
    $query->bind_param('s', $value);
    $query->execute();


    $data = $query->get_result()->fetch_all(MYSQLI_ASSOC);

    echo json_encode($data); exit;
  }


  if($_GET['username'] != null){


    If($_GET['mode'] == 'normal'){

      $command = "SELECT tweet.*,
                        COUNT(tweet_likes.user_id) AS liked
                  FROM
                  (SELECT tw.*
                    FROM
                      (SELECT tweets.*,
                              users.user_name,
                              users.user_nickname,
                              users.avatar,
                              users.verified,
                              COUNT(tweet_likes.tweet_id) AS likes
                      FROM tweets
                      LEFT JOIN users ON users.user_id = tweets.user_id
                      LEFT JOIN tweet_likes ON tweets.tweet_id = tweet_likes.tweet_id
                      WHERE users.user_name = ? AND (tweets.type = 'normal' OR tweets.type = 'retweet')
                      GROUP BY tweets.tweet_id
                      ORDER BY tweets.timestamp DESC) AS tw
                    LEFT JOIN tweet_likes ON tw.tweet_id = tweet_likes.tweet_id
                    GROUP BY tw.tweet_id
                    ORDER BY tw.timestamp DESC) AS tweet
                  LEFT JOIN tweet_likes ON tweet_likes.tweet_id = tweet.tweet_id
                  AND tweet_likes.user_id = ?
                  GROUP BY tweet.tweet_id
                  ORDER BY tweet.timestamp DESC
                      ";

                    $database = new Database();
                    $query = $database->connection->prepare($command);
                    $query->bind_param('si', $_GET['username'] , $_GET['user_id']);	
                    $query->execute();


                    $data = $query->get_result()->fetch_all(MYSQLI_ASSOC);

                    echo json_encode($data); exit;

    }

    if($_GET['mode'] == 'all_replies'){
              $command = "SELECT tweet.*,
              COUNT(tweet_likes.user_id) AS liked
        FROM
        (SELECT tw.*
          FROM
            (SELECT tweets.*,
                    users.user_name,
                    users.user_nickname,
                    users.avatar,
                    users.verified,
                    COUNT(tweet_likes.tweet_id) AS likes
            FROM tweets
            LEFT JOIN users ON users.user_id = tweets.user_id
            LEFT JOIN tweet_likes ON tweets.tweet_id = tweet_likes.tweet_id
            WHERE users.user_name = ?
            GROUP BY tweets.tweet_id
            ORDER BY tweets.timestamp DESC) AS tw
          LEFT JOIN tweet_likes ON tw.tweet_id = tweet_likes.tweet_id
          GROUP BY tw.tweet_id
          ORDER BY tw.timestamp DESC) AS tweet
        LEFT JOIN tweet_likes ON tweet_likes.tweet_id = tweet.tweet_id
        AND tweet_likes.user_id = ?
        GROUP BY tweet.tweet_id
        ORDER BY tweet.timestamp DESC
      ";

        $database = new Database();
        $query = $database->connection->prepare($command);
        $query->bind_param('si', $_GET['username'] , $_GET['user_id']);	
        $query->execute();


        $data = $query->get_result()->fetch_all(MYSQLI_ASSOC);

        echo json_encode($data); exit;
    }

    if($_GET['mode'] == 'likes'){
      $command = "   SELECT a.* FROM (SELECT tweets.*, users.user_name, users.user_nickname, users.avatar, users.verified, COUNT(tweet_likes.tweet_id) AS likes
      FROM tweets
      LEFT JOIN users ON
       users.user_id = tweets.user_id
      LEFT JOIN tweet_likes ON 
        tweets.tweet_id = tweet_likes.tweet_id
     WHERE
  1
      GROUP BY
      tweets.tweet_id
      ORDER BY tweets.timestamp DESC) AS a
       RIGHT JOIN
        (SELECT tweet_likes.* FROM tweet_likes
  RIGHT JOIN
  users
  ON 
  users.user_id = tweet_likes.user_id
  WHERE users.user_name = ?
  ) AS likes
        ON
        likes.tweet_id = a.tweet_id
        GROUP BY
        a.tweet_id
            ORDER BY a.timestamp DESC
";

$database = new Database();
$query = $database->connection->prepare($command);
$query->bind_param('s', $_GET['username']);	
$query->execute();


$data = $query->get_result()->fetch_all(MYSQLI_ASSOC);

echo json_encode($data); exit;
}

    if($_GET['mode'] == 'images'){
              $command = "SELECT tweet.*,
              COUNT(tweet_likes.user_id) AS liked
        FROM
        (SELECT tw.*
          FROM
            (SELECT tweets.*,
                    users.user_name,
                    users.user_nickname,
                    users.avatar,
                    users.verified,
                    COUNT(tweet_likes.tweet_id) AS likes
            FROM tweets
            LEFT JOIN users ON users.user_id = tweets.user_id
            LEFT JOIN tweet_likes ON tweets.tweet_id = tweet_likes.tweet_id
            WHERE users.user_name = ? AND tweets.photo_1 is NOT NULL
            GROUP BY tweets.tweet_id
            ORDER BY tweets.timestamp DESC) AS tw
          LEFT JOIN tweet_likes ON tw.tweet_id = tweet_likes.tweet_id
          GROUP BY tw.tweet_id
          ORDER BY tw.timestamp DESC) AS tweet
        LEFT JOIN tweet_likes ON tweet_likes.tweet_id = tweet.tweet_id
        AND tweet_likes.user_id = ?
        GROUP BY tweet.tweet_id
        ORDER BY tweet.timestamp DESC
        ";

        $database = new Database();
        $query = $database->connection->prepare($command);
        $query->bind_param('si', $_GET['username'] , $_GET['user_id']);	
        $query->execute();


        $data = $query->get_result()->fetch_all(MYSQLI_ASSOC);

        echo json_encode($data); exit;
        }

    }

    

  


  if($_GET['timeline'] != null){
    $command = "SELECT tweet.* ,COUNT(tweet_likes.user_id) as liked FROM
    (SELECT tw.*, COUNT(tweet_likes.tweet_id) AS likes
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
    tweets.tweet_id
    ORDER BY tweets.timestamp DESC) AS tw
    LEFT JOIN tweet_likes ON 
    tw.tweet_id = tweet_likes.tweet_id
    GROUP BY
    tw.tweet_id
    ORDER BY tw.timestamp DESC) AS tweet
    LEFT JOIN
    tweet_likes
    ON
    tweet_likes.tweet_id = tweet.tweet_id AND tweet_likes.user_id = ?
    GROUP BY
    tweet.tweet_id
    ORDER BY tweet.timestamp DESC
      ";

      $database = new Database();
      $query = $database->connection->prepare($command);
      $query->bind_param('sss', $_GET['timeline'], $_GET['timeline'], $_GET['timeline']);
      $query->execute();


      $data = $query->get_result()->fetch_all(MYSQLI_ASSOC);

      echo json_encode($data); exit;
    
  }



  if ($_GET['tweet_id'] != null){

    
    $command = "SELECT tweets.*, users.user_name, users.user_nickname, users.avatar, users.verified, COUNT(tweet_likes.tweet_id) AS likes
    FROM tweets
    LEFT JOIN users ON
     users.user_id = tweets.user_id
    LEFT JOIN tweet_likes ON 
      tweets.tweet_id = tweet_likes.tweet_id
   WHERE
       tweets.tweet_id = ?
    GROUP BY
    tweets.tweet_id
    ORDER BY tweets.timestamp DESC
     ";


    $database = new Database();
    $query = $database->connection->prepare($command);
    $query->bind_param('i', $_GET['tweet_id']);
    $query->execute();


    $data = $query->get_result()->fetch_all(MYSQLI_ASSOC);

    echo json_encode($data); exit;



  }



    $command = "SELECT tweets.*, users.user_name, users.user_nickname, users.avatar, users.verified, COUNT(tweet_likes.tweet_id) AS likes
    FROM tweets
    LEFT JOIN users ON
     users.user_id = tweets.user_id
    LEFT JOIN tweet_likes ON 
      tweets.tweet_id = tweet_likes.tweet_id
    GROUP BY
    tweets.tweet_id
    ORDER BY tweets.timestamp DESC
     ";

    $database = new Database();
    $query = $database->connection->prepare($command);
    $query->execute();


    $data = $query->get_result()->fetch_all(MYSQLI_ASSOC);

    echo json_encode($data); exit;

}

if($_SERVER['REQUEST_METHOD'] == 'POST'){

    $body = json_decode(file_get_contents('php://input'));


    $command = "INSERT INTO tweets (text, user_id, timestamp, type, original_tweet, photo_1, photo_2, photo_3, photo_4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $database = new Database();
    $query = $database->connection->prepare($command);
    $query->bind_param('siisissss', $body->text, $body->user_id, $body->timestamp, $body->type, $body->original_tweet, $body->photo_1, $body->photo_2, $body->photo_3, $body->photo_4);
    $query->execute();
    exit;
}
?>