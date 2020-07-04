<?php
     include('./conn.php');

     
    $userName = $_REQUEST['userName'];
    $password = $_REQUEST['password'];
     $sql = "select * from duuser where userName='$userName' and password='$password'";
 
     $res = $mysqli->query($sql);
    if($res->num_rows>0){
        echo json_encode(array(
            "code"=>200,
            "msg"=>"登录成功"
        ));
    }else{
        echo json_encode(array(
            "code"=>100,
            "msg"=>"账号或密码错误，请重新输入"
        ));
    }
     $mysqli->close();
?>