<?php
     include('./conn.php');
     $userName = $_REQUEST['userName'];
     $password = $_REQUEST['password'];
     $tel = $_REQUEST['tel'];
     // 将用户传递过来的数据 写入数据库
     $user = "select * from duuser where userName = $userName";
     $check = $mysqli->query($user);
     if($check->num_rows>0){
         echo '用户名重复';
     }else{
        $insertUser = "insert into duuser(userName,password,tel)values('$userName','$password','$tel')";
        // echo $insertUser;
    
        $res = $mysqli->query($insertUser);
    
        $mysqli->close();
        
        if($res){
            echo '成功';
        }else{
            echo '失败';
        }
     }

     $mysqli->close();
    
?>