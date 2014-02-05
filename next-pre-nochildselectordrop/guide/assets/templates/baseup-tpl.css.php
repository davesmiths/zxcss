/*
/*  BaseUp 1.0 CSS
*/
.{{ns}}{{col}} {float:left;width:100%;}
.{{ns}}cols > * {float:left;width:100%;}
.{{ns}}{{pullleft}} {float:left;width:100%;}
.{{ns}}{{pullright}} {float:right;width:100%;}
.{{ns}}{{pos}} {margin-right:-100%;}
.{{ns}}{{lay}} {list-style-type:none;margin-left:0;margin-right:0;padding-left:0;padding-right:0;}


{{#breakpoints}}
{{#isgt0}}
@media all and (min-width:{{at}}px) {

    .{{ns}}{{layleft}},
    .{{ns}}{{layright}},
    .{{ns}}{{laycentered}},
    .{{ns}}{{widthmax}} {max-width:{{maxwidthbp}}px;}
    
{{#issecond}}
    .{{ns}}{{pullleft}},
    .{{ns}}{{pullright}} {width:auto;}
    
{{/issecond}}
}
{{/isgt0}}

{{/breakpoints}}

.{{ns}}{{lay}}:after,
.{{ns}}{{lay}}:before,
.{{ns}}{{layleft}}:after,
.{{ns}}{{layleft}}:before,
.{{ns}}{{layright}}:after,
.{{ns}}{{layright}}:before,
.{{ns}}{{laycentered}}:after,
.{{ns}}{{laycentered}}:before {content:"";display:table;}
.{{ns}}{{lay}}:after,
.{{ns}}{{layleft}}:after,
.{{ns}}{{layright}}:after,
.{{ns}}{{laycentered}}:after {clear:both;}

.{{ns}}{{layleft}} {margin-right:auto;}
.{{ns}}{{layright}} {margin-left:auto;}
.{{ns}}{{laycentered}} {margin-left:auto;margin-right:auto;}

.{{ns}}{{clear}} {clear:both;}
{{#breakpoints}}
{{#bp}}

@media all and (min-width:{{at}}px) {

.{{ns}}{{col}}{{bp}} {float:left;width:100%;}
.{{ns}}{{colnone}}{{bp}} {float:none;width:auto;}
.{{ns}}{{clear}}{{bp}} {clear:left;}
.{{ns}}{{clearnone}}{{bp}} {clear:none;}
{{/bp}}

<?php include dirname(__FILE__).'/baseup-tpl-part.css.php'; ?>

{{#bp}}
}
{{/bp}}

{{/breakpoints}}

