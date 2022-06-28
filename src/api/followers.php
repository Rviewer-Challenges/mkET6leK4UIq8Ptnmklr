
<?php

include('db.php');

header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");


if($_SERVER['REQUEST_METHOD'] == 'GET'){

    $database = new Database();

    if($_GET['user'] != null){

        $command = "SELECT x.following,
                            y.followers,
                            a.*
                    FROM
                    (SELECT COUNT(*) AS FOLLOWING
                        FROM followers
                        WHERE user_id = ?) AS x,
                    
                    (SELECT COUNT(*) AS followers
                        FROM followers
                        WHERE FOLLOWING = ?) AS y,
                    
                    (SELECT COUNT(*) AS followed
                        FROM followers
                        WHERE followers.following = ?
                        AND followers.user_id = ?) AS a";


        $query = $database->connection->prepare($command);
        $query->bind_param('iiii', $_GET['user'], $_GET['user'], $_GET['user'], $_GET['user_id']);
        $query->execute();
            
        $data = $query->get_result()->fetch_all(MYSQLI_ASSOC);
        echo json_encode($data); exit;
    }


    if($_GET['recommended'] != null){

        $command = "SELECT users.*
                    FROM users
                    LEFT JOIN followers ON followers.following = users.user_id
                    WHERE NOT followers.user_id = ?
                    OR followers.user_id IS NULL
                    LIMIT 3";

        $query = $database->connection->prepare($command);
        $query->bind_param('i', $_GET['recommended']);
        $query->execute();
            
        $data = $query->get_result()->fetch_all(MYSQLI_ASSOC);
        echo json_encode($data); exit;
    }
}

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    
    $database = new Database();
    $body = json_decode(file_get_contents('php://input'));

    if($body->action == "follow"){

        $command = "INSERT INTO 
                    followers (user_id, following) 
                    VALUES (?, ?)";

        $query = $database->connection->prepare($command);
        $query->bind_param('ii', $body->user_id, $body->following);
        $query->execute();
        echo json_encode($query); exit;
    }

    if($body->action == "unfollow"){

        $command = "DELETE FROM
                    followers 
                    WHERE user_id = ? 
                    AND following = ?";

        $query = $database->connection->prepare($command);
        $query->bind_param('ii', $body->user_id, $body->following);
        $query->execute();
        echo json_encode($query); exit;

    }
}
