<?php
     include('./conn.php');

     
    $userName = $_REQUEST['userName'];
    $password = $_REQUEST['password'];
     $sql = "select * from duuser where userName='$userName' and password='$password'";
 
     $res = $mysqli->query($sql);
    if($res->num_rows>0){
        echo '成功登录';
    }else{
        echo '登录失败';
    }
     $mysqli->close();
?>