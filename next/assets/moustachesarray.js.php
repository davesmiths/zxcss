<?php

header('Content-Type: text/js');

include_once('./moustachesarray.php');

$js = "";
$js .= "var moustaches = {};\n";
foreach ($moustaches as $k => $v) {
    $js .= "moustaches['".$k."'] = '".$v."';\n";
}
echo $js;

?>