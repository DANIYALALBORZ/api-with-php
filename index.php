<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

$method = $_SERVER['REQUEST_METHOD'];

$file = 'users.json';

if(file_exists($file)){
    $users = json_decode(file_get_contents($file), true);
} else {
    $users = [];
}

switch($method){
    case 'GET':
        echo json_encode($users);
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        
        $newUser = [
            'id' => uniqid(),
            'name' => $data['name'],
            'email' => $data['email'],
            'age' => $data['age'],
            'description' => $data['description']
        ];
        
        $users[] = $newUser;
        file_put_contents($file, json_encode($users));
        break;
}
?>
