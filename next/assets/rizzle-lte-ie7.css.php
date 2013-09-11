<?php

header('Content-Type: text/css');

$source = file_get_contents(dirname(__FILE__).'/../templates/rizzle-lte-ie7.css');

include_once('./moustachesarray.php');
include_once('../libraries/smallmoustache/smallmoustache.php');

$sm = new smallMoustache();

$output = $sm->run(
    array (
        'source' => $source,
        'moustaches' => $moustaches,
    )
);

echo $output;

?>