/*
// BaseUp IE lte 8 breakpoint polyfill
// Keeping it raw
*/
(function(context){

    'use strict';
    
    var applyBreakpointCSS
        ,regulateWindowResizeEvents
        
        // Events
        ,breakpointBoundaryCrossed
        ,domReady
        ,windowResized
        ,css = [
{{#breakpoints}}
'<?php
ob_start(); ?>
{{#bp}}

.{{ns}}{{col}}{{bp}} {float:left;width:100%;}
.{{ns}}{{colnone}}{{bp}} {float:none;width:auto;}
.{{ns}}{{clear}}{{bp}} {clear:left;}
.{{ns}}{{clearnone}}{{bp}} {clear:none;}
{{/bp}}
<?php echo file_get_contents(dirname(__FILE__).'/baseup-tpl-part.css.php'); ?>
{{#bp}}
}
{{/bp}}
<?php 
$a = ob_get_contents();
ob_end_clean();
$a = str_replace("\n", "'+\n'", $a);
echo $a;
?>',
{{/breakpoints}}
''
        ]
    ;


var style = document.createElement('style'),
	firstScript = document.getElementsByTagName('script')[0],
	loaded;
style.type = 'text/css';
style.innerHTML = css[0];
firstScript.parentNode.insertBefore(style, firstScript);




    
    
}(window));