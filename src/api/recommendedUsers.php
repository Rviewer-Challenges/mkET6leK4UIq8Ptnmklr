
<?php

include('db.php');

header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");


if($_SERVER['REQUEST_METHOD'] == 'GET'){

    $database = new Database();

    if($_GET['recommended'] != null){
        $command = "SELECT y.*
                    FROM
                        (SELECT users.*
                         FROM users) AS y
                    LEFT JOIN
                        (SELECT users.*
                         FROM users
                    LEFT JOIN followers ON users.user_id = followers.following
                        WHERE followers.user_id = ?) AS x ON y.user_id = x.user_id
                    WHERE x.user_id IS NULL
                        AND NOT y.user_id = ?
                    ORDER BY RAND()
                    LIMIT 3";
                    
    $query = $database->connection->prepare($command);
    $query->bind_param('ii', $_GET['recommended'], $_GET['recommended']);
    $query->execute();
        
    $data = $query->get_result()->fetch_all(MYSQLI_ASSOC);
    echo json_encode($data); exit;
    }
}
