<?php
     include('./conn.php');
     $searchVal = $_REQUEST['searchVal'];
     $sql = "select * from product where class LIKE '%$searchVal%'";
 
     $res = $mysqli->query($sql);
 
     $arr = array();
 
     while($row = $res->fetch_assoc()){
         array_push($arr,$row);
     }
     if($res->num_rows >0){
        echo json_encode(array(
            'code'=>200,
            'data'=>$arr
        ));
     }else{
         echo json_encode(array(
             'code'=>500
         ));
     }
 
     $mysqli->close();
?>