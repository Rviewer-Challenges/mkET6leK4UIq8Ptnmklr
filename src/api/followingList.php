
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
        $command = "SELECT b.*, COUNT(y.user_id) AS following
                    FROM (
                    SELECT x.*
                    FROM users AS x
                    LEFT JOIN
                    followers AS f ON 
                    x.user_id = f.following
                    WHERE
                    f.user_id = ?) AS b
                    LEFT JOIN (
                    SELECT x.*
                    FROM users AS x
                    LEFT JOIN
                    followers AS f ON 
                    x.user_id = f.following
                    WHERE
                    f.user_id = ?) AS y ON y.user_id = b.user_id
                    GROUP BY
                    b.user_id";
                    
    $query = $database->connection->prepare($command);
    $query->bind_param('ii', $_GET['user_id'], $_GET['me']);
    $query->execute();
        
    $data = $query->get_result()->fetch_all(MYSQLI_ASSOC);
    echo json_encode($data); exit;
    }
}
