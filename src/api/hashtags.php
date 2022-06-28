
<?php

include('db.php');

header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");


if($_SERVER['REQUEST_METHOD'] == 'GET'){

    $command = "SELECT name, COUNT(*) as count FROM
    (
    SELECT
      tweet.tweet_id,
SUBSTRING_INDEX(tweet.text, ' ', -1) NAME
    FROM
      (
        SELECT 1 AS n
        UNION SELECT 2
        UNION SELECT 3
        UNION SELECT 4
      ) AS numbers
      INNER JOIN tweets tweet
      ON CHAR_LENGTH(tweet.text)
         -CHAR_LENGTH(REPLACE(tweet.text, ' ', ''))>=numbers.n-1
       WHERE UNIX_TIMESTAMP() - tweet.timestamp < 259200
    ORDER BY n
    )
    AS result
    WHERE LEFT(NAME, 1) = '#'
    GROUP BY NAME
    ORDER BY count DESC
    LIMIT 6
     ";

    $database = new Database();
    $query = $database->connection->prepare($command);
    $query->execute();


    $data = $query->get_result()->fetch_all(MYSQLI_ASSOC);

    echo json_encode($data); exit;

}

?>