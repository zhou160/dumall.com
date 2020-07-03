<?php
     include('./conn.php');
     $userName = $_REQUEST['userName'];
     $password = $_REQUEST['password'];
     $tel = $_REQUEST['tel'];
     // 将用户传递过来的数据 写入数据库
     $user = "select * from duuser where userName='$userName'";
     $check = $mysqli->query($user);
     if($check->num_rows>0){
         echo json_encode(array(
            "code"=>100,
            "msg"=>"用户名已存在"
         ));
     }else{
        $insertUser = "insert into duuser(userName,password,tel)values('$userName','$password','$tel')";
        $res = $mysqli->query($insertUser);
        $mysqli->close();
        if($res){
            echo json_encode(array(
                "code"=>200,
                "msg"=>"注册成功"
            ));
        }else{
            echo json_encode(array(
                "code"=>500,
                "msg"=>"网络错误"
            ));
        }
     }

    //  $mysqli->close();
    
?>