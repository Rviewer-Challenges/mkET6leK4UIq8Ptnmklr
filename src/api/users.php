
<?php

include('db.php');

header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");


if($_SERVER['REQUEST_METHOD'] == 'GET'){



  if(isset($_GET['username'])){


    
    $command = "SELECT y.*, COUNT(x.following) AS followers, COUNT(total.user_id) AS total_tweets
    FROM (
    SELECT u.*, COUNT(f.user_id) AS following
    FROM (
    SELECT *
    FROM users
    WHERE users.user_name = ?) AS u
    LEFT JOIN
    followers AS f ON
    u.user_id = f.user_id) AS y
    LEFT JOIN
    followers AS x ON
    y.user_id = x.following
    LEFT JOIN
    tweets AS total
    ON
    total.user_id = y.user_id
    ";

    $database = new Database();
    $query = $database->connection->prepare($command);
    $query->bind_param('s', $_GET['username']);
    $query->execute();


    $data = $query->get_result()->fetch_all(MYSQLI_ASSOC);

    echo json_encode($data); exit;

  }


  if($_GET['recommended'] != null){
        $command = "SELECT y.* FROM (SELECT users.* FROM users) AS y
        LEFT JOIN
        (SELECT users.* FROM users
        LEFT JOIN
        followers
        ON
        users.user_id = followers.following
        WHERE
        followers.user_id = ?) AS x
        ON
        y.user_id = x.user_id
        WHERE x.user_id IS NULL AND NOT y.user_id = ?
        ORDER BY RAND()
        LIMIT 3";
    $database = new Database();
    $query = $database->connection->prepare($command);
    $query->bind_param('ii', $_GET['recommended'], $_GET['recommended']);
    $query->execute();
        
    $data = $query->get_result()->fetch_all(MYSQLI_ASSOC);
    echo json_encode($data); exit;
    }

    
    $command = "SELECT 
                    *
                FROM
                    `users`
                    ";

    $database = new Database();
    $query = $database->connection->prepare($command);
    $query->execute();


    $data = $query->get_result()->fetch_all(MYSQLI_ASSOC);

    echo json_encode($data); exit;

}

if($_SERVER['REQUEST_METHOD'] == 'POST'){

    $body = json_decode(file_get_contents('php://input'));

    if ($body->username == null || $body->username == ""){
        http_response_code(400); echo "MISSING_USERNAME"; exit;
    }

    if ($body->password == null || $body->password == ""){

        http_response_code(400);echo "MISSING_PASSWORD"; exit;
    }


    $hashedPW = hash('sha512', $body->password);

    if($_GET['register'] != null){
        $command = "INSERT INTO
                `users`
                    (`user_name`, `user_nickname`, `password`)
                VALUES
                    ( ? , ?, ? )";

    $database = new Database();
    $query = $database->connection->prepare($command);
    $query->bind_param('sss', $body->username, $body->username,$hashedPW);
    $query->execute();
    }
    

    $command = "SELECT * FROM
            `users` WHERE user_name = ? AND password = ? LIMIT 1";

        $database = new Database();
        $query = $database->connection->prepare($command);
        $query->bind_param('ss', $body->username, $hashedPW);
        $query->execute();

    $data = $query->get_result()->fetch_all(MYSQLI_ASSOC);
    if($data[0] != null){
        echo json_encode($data); exit;
    } else{
        http_response_code(400); echo "INVALID_CREDENTIALS"; exit;
    }

}

?>