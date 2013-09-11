<?php
/*
/* Small Moustache
/* Version 1.0, Dave Smith 2013 September
/* A small one trick PHP templater
/*
/* Usage
/* $sm = new smallMoustache();
/* $sm->run(
/*     array (
/*         'source' => $sourceString,
/*         'moustaches' => array (
/*         'ns' => '',
/*         'layout' => 'layout',
/*         'column' => 'column',
/*         'layout-gutter' => 'layout-gutter',
/*         'layout-centered' => 'layout-centered',
/*         'layout-clear' => 'layout-clear',
/*         'layout-clear-ie6and7fixp1' => 'layout-clear-ie6and7fixp1',
/*         'layout-clear-ie6and7fixp2' => 'layout-clear-ie6and7fixp2',
/*         'layout-gutter-centered-ie6fix' => 'layout-gutter-centered-ie6fix',
/*         'rizzlecssproperty' => 'rizzlecssproperty',
/*     )
/* );
/* 
*/
class smallMoustache {

    function smallMoustache() {
        // Nothing to initiate
    }
    
    function run($obj) {
            
        $moustaches = $obj['moustaches'];
        $source = $obj['source'];
        
        foreach ($moustaches as $k => $v) {
            $source = preg_replace('/\{\{'.$k.'\}\}/', $v, $source);
        }
        return $source;
        
    }
    
}


?>




