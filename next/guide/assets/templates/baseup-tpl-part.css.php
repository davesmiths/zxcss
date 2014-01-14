

/* Col Gutter */
.{{ns}}{{colgut}}{{bp}},
{{#gutters}}
{{#isforlay}}
.{{ns}}{{colgut}}-{{i}}x{{bp}},
{{/isforlay}}
{{/gutters}}
.{{ns}}{{colgut}}-1o2x{{bp}},
.{{ns}}{{colgut}}-none{{bp}} {-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;}

.{{ns}}{{colgut}}{{bp}} {padding-left:{{halfgutter}}px;padding-right:{{halfgutter}}px;}
{{#gutters}}
{{#isforlay}}
.{{ns}}{{colgut}}-{{i}}x{{bp}} {padding-left:{{halfgutter}}px;padding-right:{{halfgutter}}px;}
{{/isforlay}}
{{/gutters}}
.{{ns}}{{colgut}}-1o2x{{bp}} {padding-left:{{halfgutter1o2}}px;padding-right:{{halfgutter1o2}}px;}
.{{ns}}{{colgut}}-none{{bp}} {padding-left:0;padding-right:0;}


/* Hide Col Gutter * /
.{{ns}}{{colguthide}}{{bp}} {margin-left:-{{halfgutter}}px;margin-right:-{{halfgutter}}px;}
{{#gutters}}
{{#isforlay}}
.{{ns}}{{colguthide}}-{{i}}x{{bp}} {margin-left:-{{halfgutter}}px;margin-right:-{{halfgutter}}px;}
{{/isforlay}}
{{/gutters}}
.{{ns}}{{colguthide}}-1o2x{{bp}} {margin-left:-{{halfgutter1o2}}px;margin-right:-{{halfgutter1o2}}px;}
.{{ns}}{{colguthide}}-none{{bp}} {margin-left:0;margin-right:0;}
/**/

/* Hide Gutter Left */
.{{ns}}{{innguthide}}{{bp}} {margin-left:-{{gutter}}px;}
{{#gutters}}
{{#isforlay}}
.{{ns}}{{innguthide}}-{{i}}x{{bp}} {margin-left:-{{gutter}}px;}
{{/isforlay}}
{{/gutters}}
.{{ns}}{{innguthide}}-1o2x{{bp}} {margin-left:-{{gutter1o2}}px;}
.{{ns}}{{innguthide}}-none{{bp}} {margin-left:0;}


/* Gut Left */
.{{ns}}{{gutleft}}{{bp}} {margin-left:{{gutter}}px;}
{{#gutters}}
.{{ns}}{{gutleft}}-{{i}}x{{bp}} {margin-left:{{gutter}}px;}
{{/gutters}}
.{{ns}}{{gutleft}}-1o2x{{bp}} {margin-left:{{gutter1o2}}px;}

.{{ns}}{{gutsmall}}{{bp}} {margin-left:{{gutsmallmargin}}px;}
.{{ns}}{{gutmedium}}{{bp}} {margin-left:{{gutmediummargin}}px;}
.{{ns}}{{gutlarge}}{{bp}} {margin-left:{{gutlargemargin}}px;}
.{{ns}}{{gutleft}}-none{{bp}} {margin-left:0;}


/* Gut Right */
.{{ns}}{{gutright}}{{bp}} {margin-right:{{gutter}}px;}
{{#gutters}}
.{{ns}}{{gutright}}-{{i}}x{{bp}} {margin-right:{{gutter}}px;}
{{/gutters}}
.{{ns}}{{gutright}}-1o2x{{bp}} {margin-right:{{gutter1o2}}px;}

.{{ns}}{{gutrightsmall}}{{bp}} {margin-right:{{gutsmallmargin}}px;}
.{{ns}}{{gutrightmedium}}{{bp}} {margin-right:{{gutmediummargin}}px;}
.{{ns}}{{gutrightlarge}}{{bp}} {margin-right:{{gutlargemargin}}px;}
.{{ns}}{{gutright}}-none{{bp}} {margin-right:0;}


/* Gut Bottom */
.{{ns}}{{gutbot}}{{bp}} {margin-bottom:{{gutter}}px;}
{{#gutters}}
{{#isforlay}}
.{{ns}}{{gutbot}}-{{i}}x{{bp}} {margin-bottom:{{gutter}}px;}
{{/isforlay}}
{{/gutters}}
.{{ns}}{{gutbot}}-1o2x{{bp}} {margin-bottom:{{gutter1o2}}px;}
.{{ns}}{{gutbot}}-none{{bp}} {margin-bottom:0;}


/* Pull Gut */
{{#pullguts}}{{#isnotfirst}},
{{/isnotfirst}}.{{ns}}{{name}}{{bp}}{{/pullguts}}
{float:left;display:inline;clear:both;position:static!important;position:relative;}

.{{ns}}{{pullgut}}{{bp}} {margin-left:-{{base5}}px;width:{{base4}}px;}
{{#pullguts}}
.{{ns}}{{name}}{{bp}} {margin-left:-{{marginleft}}px;width:{{width}}px;}
{{/pullguts}}

.{{ns}}{{pullgut}}-none{{bp}} {margin-left:0;width:auto;float:none;position:static;}



/* Pull Gut Right */
{{#pullgutrights}}{{#isnotfirst}},
{{/isnotfirst}}.{{ns}}{{name}}{{bp}}{{/pullgutrights}}
{float:right;display:inline;clear:both;position:relative;}
            
.{{ns}}{{pullgutright}}{{bp}} {margin-right:-{{base5}}px;width:{{base4}}px;}
{{#pullgutrights}}
.{{ns}}{{name}}{{bp}} {margin-right:-{{marginright}}px;width:{{width}}px;right:-{{right}}px;}
{{/pullgutrights}}

.{{ns}}{{pullgutright}}-none{{bp}} {margin-right:0;width:auto;float:none;position:static;}



/* Max Width */
{{#maxwidths}}
.{{ns}}{{widthmax}}-{{dx}}dx{{bp}} {max-width:{{maxwidth}}px;}
{{/maxwidths}}



/* Widths */
.{{ns}}{{width}}s-auto{{bp}} > * {width:auto;}
{{#widthclasses}}{{#widths}}
{{#fractions}}{{#isnotfirst}},
{{/isnotfirst}}.{{ns}}{{width}}s-{{numerator}}o{{denominator}}{{bp}} .col-cols,
.{{ns}}{{width}}s-{{numerator}}o{{denominator}}{{bp}} > *{{/fractions}} {width:{{value}}%;}
{{/widths}}{{/widthclasses}}



/* Width */
.{{ns}}{{width}}-auto{{bp}} {width:auto;}
{{#widthclasses}}{{#widths}}
{{#fractions}}{{#isnotfirst}},
{{/isnotfirst}}.{{ns}}{{width}}-{{numerator}}o{{denominator}}{{bp}}{{/fractions}} {width:{{value}}%;}
{{/widths}}{{/widthclasses}}


/* Cols */
{{#cols}}
.{{ns}}cols-{{num}}{{bp}} > *,
.{{ns}}cols-{{num}}-col{{bp}} .col {float:left;width:{{width}}%;}
{{/cols}}


/* Guts */
.guts{{bp}} > *,
.guts-1x{{bp}} > *,
.guts-2x{{bp}} > *,
.guts-1o2x{{bp}} > * {-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;}

.guts-1o2x{{bp}} {margin-left:-5px;margin-right:-5px;}
.guts-1o2x{{bp}} > * {padding-left:5px;padding-right:5px;margin-bottom:10px;}
.guts{{bp}} {margin-left:-10px;margin-right:-10px;}
.guts{{bp}} > * {padding-left:10px;padding-right:10px;margin-bottom:20px;}
.guts-1x{{bp}} {margin-left:-10px;margin-right:-10px;}
.guts-1x{{bp}} > * {padding-left:10px;padding-right:10px;margin-bottom:20px;}
.guts-2x{{bp}} {margin-left:-20px;margin-right:-20px;}
.guts-2x{{bp}} > * {padding-left:20px;padding-right:20px;margin-bottom:40px;}


/* Guts Full-Width class a */
.guts-fw-1o2x{{bp}} {margin-left:-10px;}
.guts-fw-1o2x{{bp}} > * > * {margin-left:10px;margin-bottom:10px;}
.guts-fw{{bp}} {margin-left:-20px;}
.guts-fw{{bp}} > * > * {margin-left:20px;margin-bottom:20px;}
.guts-fw-1x{{bp}} {margin-left:-20px;}
.guts-fw-1x{{bp}} > * > * {margin-left:20px;margin-bottom:20px;}
.guts-fw-2x{{bp}} {margin-left:-40px;}
.guts-fw-2x{{bp}} > * > * {margin-left:40px;margin-bottom:40px;}



/* Pos */
{{#poss}}
{{#fractions}}{{#isnotfirst}},
{{/isnotfirst}}.{{ns}}{{pos}}-{{numerator}}o{{denominator}}{{bp}}{{/fractions}} {margin-left:{{value}}%;}
{{/poss}}

{{#poss}}{{#fractions}}{{#isnotveryfirst}},
{{/isnotveryfirst}}.{{ns}}{{pos}}-{{numerator}}o{{denominator}}{{bp}}{{/fractions}}{{/poss}} {margin-right:-100%;}


