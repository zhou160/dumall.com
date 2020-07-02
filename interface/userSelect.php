<?php
     include('./conn.php');

     
    $userName = $_REQUEST['userName'];
    $password = $_REQUEST['password']
     $sql = "select * from duuser where userName=$userName and password=$password";
 
     $res = $mysqli->query($sql);
 
    //  $arr = array();
 
    //  while($row = $res->fetch_assoc()){
    //      array_push($arr,$row);
    //  }
    if($res->num_rows>0){
        echo '成功登录'
    }
     $mysqli->close();
?>