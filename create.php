<?php
// $dir =  dirname("./photos");
header("Conten-type:text/html;charset=utf-8");
//扫描文件夹
$file = scandir("./photos");
// print_r($file);die();

$arr = array();
$index = 0;
foreach($file as $v){
    if($v != "." && $v != ".."){

        $name = iconv('gbk' , 'utf-8' ,  $v);
        $fiName = substr($name,2,strpos($name,".")-2);
        $arr[$index]['name'] =  $fiName;
        $arr[$index]['photo'] = "./photos/".$name;
        $arr[$index]['thum'] = "./thumbnail/".$name; 
        $arr[$index]['id'] = $index;
        $index++;
    }
}
echo " <pre>";
print_r($arr);
$code = "var member = ".json_encode($arr);
$file = fopen("./js/member.js","wb+");
fwrite($file,$code);
fclose($file);
// echo $code;
