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
''+
''+
''+
'/* Col Gutter */'+
'.col-gut,'+
''+
''+
'.col-gut-1x,'+
''+
''+
''+
'.col-gut-2x,'+
''+
''+
''+
'.col-gut-3x,'+
''+
''+
''+
'.col-gut-4x,'+
''+
''+
''+
'.col-gut-5x,'+
''+
''+
''+
'.col-gut-6x,'+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
'.col-gut-1o2x,'+
'.col-gut-none {-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;}'+
''+
'.col-gut {padding-left:10px;padding-right:10px;}'+
''+
''+
'.col-gut-1x {padding-left:10px;padding-right:10px;}'+
''+
''+
''+
'.col-gut-2x {padding-left:20px;padding-right:20px;}'+
''+
''+
''+
'.col-gut-3x {padding-left:30px;padding-right:30px;}'+
''+
''+
''+
'.col-gut-4x {padding-left:40px;padding-right:40px;}'+
''+
''+
''+
'.col-gut-5x {padding-left:50px;padding-right:50px;}'+
''+
''+
''+
'.col-gut-6x {padding-left:60px;padding-right:60px;}'+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
'.col-gut-1o2x {padding-left:5px;padding-right:5px;}'+
'.col-gut-none {padding-left:0;padding-right:0;}'+
''+
''+
'/* Hide Col Gutter * /'+
'.hide-col-gut {margin-left:-10px;margin-right:-10px;}'+
''+
''+
'.hide-col-gut-1x {margin-left:-10px;margin-right:-10px;}'+
''+
''+
''+
'.hide-col-gut-2x {margin-left:-20px;margin-right:-20px;}'+
''+
''+
''+
'.hide-col-gut-3x {margin-left:-30px;margin-right:-30px;}'+
''+
''+
''+
'.hide-col-gut-4x {margin-left:-40px;margin-right:-40px;}'+
''+
''+
''+
'.hide-col-gut-5x {margin-left:-50px;margin-right:-50px;}'+
''+
''+
''+
'.hide-col-gut-6x {margin-left:-60px;margin-right:-60px;}'+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
'.hide-col-gut-1o2x {margin-left:-5px;margin-right:-5px;}'+
'.hide-col-gut-none {margin-left:0;margin-right:0;}'+
'/**/'+
''+
'/* Hide Gutter Left */'+
'.hide-gut-left {margin-left:-20px;}'+
''+
''+
'.hide-gut-left-1x {margin-left:-20px;}'+
''+
''+
''+
'.hide-gut-left-2x {margin-left:-40px;}'+
''+
''+
''+
'.hide-gut-left-3x {margin-left:-60px;}'+
''+
''+
''+
'.hide-gut-left-4x {margin-left:-80px;}'+
''+
''+
''+
'.hide-gut-left-5x {margin-left:-100px;}'+
''+
''+
''+
'.hide-gut-left-6x {margin-left:-120px;}'+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
'.hide-gut-left-1o2x {margin-left:-10px;}'+
'.hide-gut-left-none {margin-left:0;}'+
''+
''+
'/* Gut Left */'+
'.gut-left {margin-left:20px;}'+
''+
'.gut-left-1x {margin-left:20px;}'+
''+
'.gut-left-2x {margin-left:40px;}'+
''+
'.gut-left-3x {margin-left:60px;}'+
''+
'.gut-left-4x {margin-left:80px;}'+
''+
'.gut-left-5x {margin-left:100px;}'+
''+
'.gut-left-6x {margin-left:120px;}'+
''+
'.gut-left-7x {margin-left:140px;}'+
''+
'.gut-left-8x {margin-left:160px;}'+
''+
'.gut-left-9x {margin-left:180px;}'+
''+
'.gut-left-10x {margin-left:200px;}'+
''+
'.gut-left-11x {margin-left:220px;}'+
''+
'.gut-left-12x {margin-left:240px;}'+
''+
'.gut-left-1o2x {margin-left:10px;}'+
''+
'.gut-left-small {margin-left:80px;}'+
'.gut-left-medium {margin-left:180px;}'+
'.gut-left-large {margin-left:280px;}'+
'.gut-left-none {margin-left:0;}'+
''+
''+
'/* Gut Right */'+
'.gut-right {margin-right:20px;}'+
''+
'.gut-right-1x {margin-right:20px;}'+
''+
'.gut-right-2x {margin-right:40px;}'+
''+
'.gut-right-3x {margin-right:60px;}'+
''+
'.gut-right-4x {margin-right:80px;}'+
''+
'.gut-right-5x {margin-right:100px;}'+
''+
'.gut-right-6x {margin-right:120px;}'+
''+
'.gut-right-7x {margin-right:140px;}'+
''+
'.gut-right-8x {margin-right:160px;}'+
''+
'.gut-right-9x {margin-right:180px;}'+
''+
'.gut-right-10x {margin-right:200px;}'+
''+
'.gut-right-11x {margin-right:220px;}'+
''+
'.gut-right-12x {margin-right:240px;}'+
''+
'.gut-right-1o2x {margin-right:10px;}'+
''+
'.gut-right-small {margin-right:80px;}'+
'.gut-right-medium {margin-right:180px;}'+
'.gut-right-large {margin-right:280px;}'+
'.gut-right-none {margin-right:0;}'+
''+
''+
'/* Gut Bottom */'+
'.gut-bottom {margin-bottom:20px;}'+
''+
''+
'.gut-bottom-1x {margin-bottom:20px;}'+
''+
''+
''+
'.gut-bottom-2x {margin-bottom:40px;}'+
''+
''+
''+
'.gut-bottom-3x {margin-bottom:60px;}'+
''+
''+
''+
'.gut-bottom-4x {margin-bottom:80px;}'+
''+
''+
''+
'.gut-bottom-5x {margin-bottom:100px;}'+
''+
''+
''+
'.gut-bottom-6x {margin-bottom:120px;}'+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
'.gut-bottom-1o2x {margin-bottom:10px;}'+
'.gut-bottom-none {margin-bottom:0;}'+
''+
''+
'/* Pull Gut */'+
'.pull-gut-left-1x,'+
'.pull-gut-left-1x-gut-1o2x,'+
'.pull-gut-left-1x-gut-1x,'+
'.pull-gut-left-2x,'+
'.pull-gut-left-2x-gut-1o2x,'+
'.pull-gut-left-2x-gut-1x,'+
'.pull-gut-left-3x,'+
'.pull-gut-left-3x-gut-1o2x,'+
'.pull-gut-left-3x-gut-1x,'+
'.pull-gut-left-4x,'+
'.pull-gut-left-4x-gut-1o2x,'+
'.pull-gut-left-4x-gut-1x,'+
'.pull-gut-left-5x,'+
'.pull-gut-left-5x-gut-1o2x,'+
'.pull-gut-left-5x-gut-1x,'+
'.pull-gut-left-6x,'+
'.pull-gut-left-6x-gut-1o2x,'+
'.pull-gut-left-6x-gut-1x,'+
'.pull-gut-left-7x,'+
'.pull-gut-left-7x-gut-1o2x,'+
'.pull-gut-left-7x-gut-1x,'+
'.pull-gut-left-8x,'+
'.pull-gut-left-8x-gut-1o2x,'+
'.pull-gut-left-8x-gut-1x,'+
'.pull-gut-left-9x,'+
'.pull-gut-left-9x-gut-1o2x,'+
'.pull-gut-left-9x-gut-1x,'+
'.pull-gut-left-10x,'+
'.pull-gut-left-10x-gut-1o2x,'+
'.pull-gut-left-10x-gut-1x,'+
'.pull-gut-left-11x,'+
'.pull-gut-left-11x-gut-1o2x,'+
'.pull-gut-left-11x-gut-1x,'+
'.pull-gut-left-12x,'+
'.pull-gut-left-12x-gut-1o2x,'+
'.pull-gut-left-12x-gut-1x,'+
'.pull-gut-left-small,'+
'.pull-gut-left-small-gut-1o2x,'+
'.pull-gut-left-small-gut-1x,'+
'.pull-gut-left-medium,'+
'.pull-gut-left-medium-gut-1o2x,'+
'.pull-gut-left-medium-gut-1x,'+
'.pull-gut-left-large,'+
'.pull-gut-left-large-gut-1o2x,'+
'.pull-gut-left-large-gut-1x'+
'{float:left;display:inline;clear:both;position:static!important;position:relative;}'+
''+
'.pull-gut-left {margin-left:-100px;width:80px;}'+
''+
'.pull-gut-left-1x {margin-left:-20px;width:20px;}'+
''+
'.pull-gut-left-1x-gut-1o2x {margin-left:-20px;width:10px;}'+
''+
'.pull-gut-left-1x-gut-1x {margin-left:-20px;width:0px;}'+
''+
'.pull-gut-left-2x {margin-left:-40px;width:40px;}'+
''+
'.pull-gut-left-2x-gut-1o2x {margin-left:-40px;width:30px;}'+
''+
'.pull-gut-left-2x-gut-1x {margin-left:-40px;width:20px;}'+
''+
'.pull-gut-left-3x {margin-left:-60px;width:60px;}'+
''+
'.pull-gut-left-3x-gut-1o2x {margin-left:-60px;width:50px;}'+
''+
'.pull-gut-left-3x-gut-1x {margin-left:-60px;width:40px;}'+
''+
'.pull-gut-left-4x {margin-left:-80px;width:80px;}'+
''+
'.pull-gut-left-4x-gut-1o2x {margin-left:-80px;width:70px;}'+
''+
'.pull-gut-left-4x-gut-1x {margin-left:-80px;width:60px;}'+
''+
'.pull-gut-left-5x {margin-left:-100px;width:100px;}'+
''+
'.pull-gut-left-5x-gut-1o2x {margin-left:-100px;width:90px;}'+
''+
'.pull-gut-left-5x-gut-1x {margin-left:-100px;width:80px;}'+
''+
'.pull-gut-left-6x {margin-left:-120px;width:120px;}'+
''+
'.pull-gut-left-6x-gut-1o2x {margin-left:-120px;width:110px;}'+
''+
'.pull-gut-left-6x-gut-1x {margin-left:-120px;width:100px;}'+
''+
'.pull-gut-left-7x {margin-left:-140px;width:140px;}'+
''+
'.pull-gut-left-7x-gut-1o2x {margin-left:-140px;width:130px;}'+
''+
'.pull-gut-left-7x-gut-1x {margin-left:-140px;width:120px;}'+
''+
'.pull-gut-left-8x {margin-left:-160px;width:160px;}'+
''+
'.pull-gut-left-8x-gut-1o2x {margin-left:-160px;width:150px;}'+
''+
'.pull-gut-left-8x-gut-1x {margin-left:-160px;width:140px;}'+
''+
'.pull-gut-left-9x {margin-left:-180px;width:180px;}'+
''+
'.pull-gut-left-9x-gut-1o2x {margin-left:-180px;width:170px;}'+
''+
'.pull-gut-left-9x-gut-1x {margin-left:-180px;width:160px;}'+
''+
'.pull-gut-left-10x {margin-left:-200px;width:200px;}'+
''+
'.pull-gut-left-10x-gut-1o2x {margin-left:-200px;width:190px;}'+
''+
'.pull-gut-left-10x-gut-1x {margin-left:-200px;width:180px;}'+
''+
'.pull-gut-left-11x {margin-left:-220px;width:220px;}'+
''+
'.pull-gut-left-11x-gut-1o2x {margin-left:-220px;width:210px;}'+
''+
'.pull-gut-left-11x-gut-1x {margin-left:-220px;width:200px;}'+
''+
'.pull-gut-left-12x {margin-left:-240px;width:240px;}'+
''+
'.pull-gut-left-12x-gut-1o2x {margin-left:-240px;width:230px;}'+
''+
'.pull-gut-left-12x-gut-1x {margin-left:-240px;width:220px;}'+
''+
'.pull-gut-left-small {margin-left:-80px;width:80px;}'+
''+
'.pull-gut-left-small-gut-1o2x {margin-left:-80px;width:70px;}'+
''+
'.pull-gut-left-small-gut-1x {margin-left:-80px;width:60px;}'+
''+
'.pull-gut-left-medium {margin-left:-180px;width:180px;}'+
''+
'.pull-gut-left-medium-gut-1o2x {margin-left:-180px;width:170px;}'+
''+
'.pull-gut-left-medium-gut-1x {margin-left:-180px;width:160px;}'+
''+
'.pull-gut-left-large {margin-left:-280px;width:280px;}'+
''+
'.pull-gut-left-large-gut-1o2x {margin-left:-280px;width:270px;}'+
''+
'.pull-gut-left-large-gut-1x {margin-left:-280px;width:260px;}'+
''+
''+
'.pull-gut-left-none {margin-left:0;width:auto;float:none;position:static;}'+
''+
''+
''+
'/* Pull Gut Right */'+
'.pull-gut-right-1x,'+
'.pull-gut-right-1x-gut-1o2x,'+
'.pull-gut-right-1x-gut-1x,'+
'.pull-gut-right-2x,'+
'.pull-gut-right-2x-gut-1o2x,'+
'.pull-gut-right-2x-gut-1x,'+
'.pull-gut-right-3x,'+
'.pull-gut-right-3x-gut-1o2x,'+
'.pull-gut-right-3x-gut-1x,'+
'.pull-gut-right-4x,'+
'.pull-gut-right-4x-gut-1o2x,'+
'.pull-gut-right-4x-gut-1x,'+
'.pull-gut-right-5x,'+
'.pull-gut-right-5x-gut-1o2x,'+
'.pull-gut-right-5x-gut-1x,'+
'.pull-gut-right-6x,'+
'.pull-gut-right-6x-gut-1o2x,'+
'.pull-gut-right-6x-gut-1x,'+
'.pull-gut-right-7x,'+
'.pull-gut-right-7x-gut-1o2x,'+
'.pull-gut-right-7x-gut-1x,'+
'.pull-gut-right-8x,'+
'.pull-gut-right-8x-gut-1o2x,'+
'.pull-gut-right-8x-gut-1x,'+
'.pull-gut-right-9x,'+
'.pull-gut-right-9x-gut-1o2x,'+
'.pull-gut-right-9x-gut-1x,'+
'.pull-gut-right-10x,'+
'.pull-gut-right-10x-gut-1o2x,'+
'.pull-gut-right-10x-gut-1x,'+
'.pull-gut-right-11x,'+
'.pull-gut-right-11x-gut-1o2x,'+
'.pull-gut-right-11x-gut-1x,'+
'.pull-gut-right-12x,'+
'.pull-gut-right-12x-gut-1o2x,'+
'.pull-gut-right-12x-gut-1x,'+
'.pull-gut-right-small,'+
'.pull-gut-right-small-gut-1o2x,'+
'.pull-gut-right-small-gut-1x,'+
'.pull-gut-right-medium,'+
'.pull-gut-right-medium-gut-1o2x,'+
'.pull-gut-right-medium-gut-1x,'+
'.pull-gut-right-large,'+
'.pull-gut-right-large-gut-1o2x,'+
'.pull-gut-right-large-gut-1x'+
'{float:right;display:inline;clear:both;position:relative;}'+
'            '+
'.pull-gut-right {margin-right:-100px;width:80px;}'+
''+
'.pull-gut-right-1x {margin-right:-20px;width:20px;right:-0px;}'+
''+
'.pull-gut-right-1x-gut-1o2x {margin-right:-10px;width:10px;right:-10px;}'+
''+
'.pull-gut-right-1x-gut-1x {margin-right:-0px;width:0px;right:-20px;}'+
''+
'.pull-gut-right-2x {margin-right:-40px;width:40px;right:-0px;}'+
''+
'.pull-gut-right-2x-gut-1o2x {margin-right:-30px;width:30px;right:-10px;}'+
''+
'.pull-gut-right-2x-gut-1x {margin-right:-20px;width:20px;right:-20px;}'+
''+
'.pull-gut-right-3x {margin-right:-60px;width:60px;right:-0px;}'+
''+
'.pull-gut-right-3x-gut-1o2x {margin-right:-50px;width:50px;right:-10px;}'+
''+
'.pull-gut-right-3x-gut-1x {margin-right:-40px;width:40px;right:-20px;}'+
''+
'.pull-gut-right-4x {margin-right:-80px;width:80px;right:-0px;}'+
''+
'.pull-gut-right-4x-gut-1o2x {margin-right:-70px;width:70px;right:-10px;}'+
''+
'.pull-gut-right-4x-gut-1x {margin-right:-60px;width:60px;right:-20px;}'+
''+
'.pull-gut-right-5x {margin-right:-100px;width:100px;right:-0px;}'+
''+
'.pull-gut-right-5x-gut-1o2x {margin-right:-90px;width:90px;right:-10px;}'+
''+
'.pull-gut-right-5x-gut-1x {margin-right:-80px;width:80px;right:-20px;}'+
''+
'.pull-gut-right-6x {margin-right:-120px;width:120px;right:-0px;}'+
''+
'.pull-gut-right-6x-gut-1o2x {margin-right:-110px;width:110px;right:-10px;}'+
''+
'.pull-gut-right-6x-gut-1x {margin-right:-100px;width:100px;right:-20px;}'+
''+
'.pull-gut-right-7x {margin-right:-140px;width:140px;right:-0px;}'+
''+
'.pull-gut-right-7x-gut-1o2x {margin-right:-130px;width:130px;right:-10px;}'+
''+
'.pull-gut-right-7x-gut-1x {margin-right:-120px;width:120px;right:-20px;}'+
''+
'.pull-gut-right-8x {margin-right:-160px;width:160px;right:-0px;}'+
''+
'.pull-gut-right-8x-gut-1o2x {margin-right:-150px;width:150px;right:-10px;}'+
''+
'.pull-gut-right-8x-gut-1x {margin-right:-140px;width:140px;right:-20px;}'+
''+
'.pull-gut-right-9x {margin-right:-180px;width:180px;right:-0px;}'+
''+
'.pull-gut-right-9x-gut-1o2x {margin-right:-170px;width:170px;right:-10px;}'+
''+
'.pull-gut-right-9x-gut-1x {margin-right:-160px;width:160px;right:-20px;}'+
''+
'.pull-gut-right-10x {margin-right:-200px;width:200px;right:-0px;}'+
''+
'.pull-gut-right-10x-gut-1o2x {margin-right:-190px;width:190px;right:-10px;}'+
''+
'.pull-gut-right-10x-gut-1x {margin-right:-180px;width:180px;right:-20px;}'+
''+
'.pull-gut-right-11x {margin-right:-220px;width:220px;right:-0px;}'+
''+
'.pull-gut-right-11x-gut-1o2x {margin-right:-210px;width:210px;right:-10px;}'+
''+
'.pull-gut-right-11x-gut-1x {margin-right:-200px;width:200px;right:-20px;}'+
''+
'.pull-gut-right-12x {margin-right:-240px;width:240px;right:-0px;}'+
''+
'.pull-gut-right-12x-gut-1o2x {margin-right:-230px;width:230px;right:-10px;}'+
''+
'.pull-gut-right-12x-gut-1x {margin-right:-220px;width:220px;right:-20px;}'+
''+
'.pull-gut-right-small {margin-right:-80px;width:80px;right:-0px;}'+
''+
'.pull-gut-right-small-gut-1o2x {margin-right:-70px;width:70px;right:-10px;}'+
''+
'.pull-gut-right-small-gut-1x {margin-right:-60px;width:60px;right:-20px;}'+
''+
'.pull-gut-right-medium {margin-right:-180px;width:180px;right:-0px;}'+
''+
'.pull-gut-right-medium-gut-1o2x {margin-right:-170px;width:170px;right:-10px;}'+
''+
'.pull-gut-right-medium-gut-1x {margin-right:-160px;width:160px;right:-20px;}'+
''+
'.pull-gut-right-large {margin-right:-280px;width:280px;right:-0px;}'+
''+
'.pull-gut-right-large-gut-1o2x {margin-right:-270px;width:270px;right:-10px;}'+
''+
'.pull-gut-right-large-gut-1x {margin-right:-260px;width:260px;right:-20px;}'+
''+
''+
'.pull-gut-right-none {margin-right:0;width:auto;float:none;position:static;}'+
''+
''+
''+
'/* Max Width */'+
''+
'.width-max-1dx {max-width:220px;}'+
''+
'.width-max-2dx {max-width:460px;}'+
''+
'.width-max-3dx {max-width:700px;}'+
''+
'.width-max-4dx {max-width:940px;}'+
''+
'.width-max-5dx {max-width:1180px;}'+
''+
'.width-max-6dx {max-width:1420px;}'+
''+
'.width-max-7dx {max-width:1660px;}'+
''+
''+
''+
''+
'/* Widths */'+
'.widths-auto > * {width:auto;}'+
''+
'.widths-1o5 .col-cols,'+
'.widths-1o5 > * {width:20%;}'+
''+
'.widths-1o4 .col-cols,'+
'.widths-1o4 > *,'+
'.widths-2o8 .col-cols,'+
'.widths-2o8 > * {width:25%;}'+
''+
'.widths-2o5 .col-cols,'+
'.widths-2o5 > * {width:40%;}'+
''+
'.widths-1o2 .col-cols,'+
'.widths-1o2 > *,'+
'.widths-2o4 .col-cols,'+
'.widths-2o4 > *,'+
'.widths-3o6 .col-cols,'+
'.widths-3o6 > *,'+
'.widths-4o8 .col-cols,'+
'.widths-4o8 > * {width:50%;}'+
''+
'.widths-3o5 .col-cols,'+
'.widths-3o5 > * {width:60%;}'+
''+
'.widths-3o4 .col-cols,'+
'.widths-3o4 > *,'+
'.widths-6o8 .col-cols,'+
'.widths-6o8 > * {width:75%;}'+
''+
'.widths-4o5 .col-cols,'+
'.widths-4o5 > * {width:80%;}'+
''+
'.widths-1o1 .col-cols,'+
'.widths-1o1 > *,'+
'.widths-2o2 .col-cols,'+
'.widths-2o2 > *,'+
'.widths-3o3 .col-cols,'+
'.widths-3o3 > *,'+
'.widths-4o4 .col-cols,'+
'.widths-4o4 > *,'+
'.widths-5o5 .col-cols,'+
'.widths-5o5 > *,'+
'.widths-6o6 .col-cols,'+
'.widths-6o6 > *,'+
'.widths-7o7 .col-cols,'+
'.widths-7o7 > *,'+
'.widths-8o8 .col-cols,'+
'.widths-8o8 > * {width:100%;}'+
''+
'.widths-1o3 .col-cols,'+
'.widths-1o3 > *,'+
'.widths-2o6 .col-cols,'+
'.widths-2o6 > * {width:33.3333%;}'+
''+
'.widths-1o6 .col-cols,'+
'.widths-1o6 > * {width:16.6666%;}'+
''+
'.widths-1o7 .col-cols,'+
'.widths-1o7 > * {width:14.2857%;}'+
''+
'.widths-1o8 .col-cols,'+
'.widths-1o8 > * {width:12.5%;}'+
''+
'.widths-2o3 .col-cols,'+
'.widths-2o3 > *,'+
'.widths-4o6 .col-cols,'+
'.widths-4o6 > * {width:66.6666%;}'+
''+
'.widths-2o7 .col-cols,'+
'.widths-2o7 > * {width:28.5714%;}'+
''+
'.widths-3o7 .col-cols,'+
'.widths-3o7 > * {width:42.8571%;}'+
''+
'.widths-3o8 .col-cols,'+
'.widths-3o8 > * {width:37.5%;}'+
''+
'.widths-4o7 .col-cols,'+
'.widths-4o7 > * {width:57.1428%;}'+
''+
'.widths-5o6 .col-cols,'+
'.widths-5o6 > * {width:83.3333%;}'+
''+
'.widths-5o7 .col-cols,'+
'.widths-5o7 > * {width:71.4285%;}'+
''+
'.widths-5o8 .col-cols,'+
'.widths-5o8 > * {width:62.5%;}'+
''+
'.widths-6o7 .col-cols,'+
'.widths-6o7 > * {width:85.7142%;}'+
''+
'.widths-7o8 .col-cols,'+
'.widths-7o8 > * {width:87.5%;}'+
''+
''+
''+
''+
'/* Width */'+
'.width-auto {width:auto;}'+
''+
'.width-1o5 {width:20%;}'+
''+
'.width-1o4,'+
'.width-2o8 {width:25%;}'+
''+
'.width-2o5 {width:40%;}'+
''+
'.width-1o2,'+
'.width-2o4,'+
'.width-3o6,'+
'.width-4o8 {width:50%;}'+
''+
'.width-3o5 {width:60%;}'+
''+
'.width-3o4,'+
'.width-6o8 {width:75%;}'+
''+
'.width-4o5 {width:80%;}'+
''+
'.width-1o1,'+
'.width-2o2,'+
'.width-3o3,'+
'.width-4o4,'+
'.width-5o5,'+
'.width-6o6,'+
'.width-7o7,'+
'.width-8o8 {width:100%;}'+
''+
'.width-1o3,'+
'.width-2o6 {width:33.3333%;}'+
''+
'.width-1o6 {width:16.6666%;}'+
''+
'.width-1o7 {width:14.2857%;}'+
''+
'.width-1o8 {width:12.5%;}'+
''+
'.width-2o3,'+
'.width-4o6 {width:66.6666%;}'+
''+
'.width-2o7 {width:28.5714%;}'+
''+
'.width-3o7 {width:42.8571%;}'+
''+
'.width-3o8 {width:37.5%;}'+
''+
'.width-4o7 {width:57.1428%;}'+
''+
'.width-5o6 {width:83.3333%;}'+
''+
'.width-5o7 {width:71.4285%;}'+
''+
'.width-5o8 {width:62.5%;}'+
''+
'.width-6o7 {width:85.7142%;}'+
''+
'.width-7o8 {width:87.5%;}'+
''+
''+
''+
'/* Cols */'+
''+
'.cols-1 > *,'+
'.cols-1-col .col {float:left;width:100%;}'+
''+
'.cols-2 > *,'+
'.cols-2-col .col {float:left;width:50%;}'+
''+
'.cols-3 > *,'+
'.cols-3-col .col {float:left;width:33.3333%;}'+
''+
'.cols-4 > *,'+
'.cols-4-col .col {float:left;width:25%;}'+
''+
'.cols-5 > *,'+
'.cols-5-col .col {float:left;width:20%;}'+
''+
'.cols-6 > *,'+
'.cols-6-col .col {float:left;width:16.6666%;}'+
''+
'.cols-7 > *,'+
'.cols-7-col .col {float:left;width:14.2857%;}'+
''+
'.cols-8 > *,'+
'.cols-8-col .col {float:left;width:12.5%;}'+
''+
''+
''+
'/* Guts */'+
'.guts > *,'+
'.guts-1x > *,'+
'.guts-2x > *,'+
'.guts-1o2x > * {-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;}'+
''+
'.guts-1o2x {margin-left:-5px;margin-right:-5px;}'+
'.guts-1o2x > * {padding-left:5px;padding-right:5px;margin-bottom:10px;}'+
'.guts {margin-left:-10px;margin-right:-10px;}'+
'.guts > * {padding-left:10px;padding-right:10px;margin-bottom:20px;}'+
'.guts-1x {margin-left:-10px;margin-right:-10px;}'+
'.guts-1x > * {padding-left:10px;padding-right:10px;margin-bottom:20px;}'+
'.guts-2x {margin-left:-20px;margin-right:-20px;}'+
'.guts-2x > * {padding-left:20px;padding-right:20px;margin-bottom:40px;}'+
''+
''+
'/* Guts Full-Width class a */'+
'.guts-fw-1o2x {margin-left:-10px;}'+
'.guts-fw-1o2x > * > * {margin-left:10px;margin-bottom:10px;}'+
'.guts-fw {margin-left:-20px;}'+
'.guts-fw > * > * {margin-left:20px;margin-bottom:20px;}'+
'.guts-fw-1x {margin-left:-20px;}'+
'.guts-fw-1x > * > * {margin-left:20px;margin-bottom:20px;}'+
'.guts-fw-2x {margin-left:-40px;}'+
'.guts-fw-2x > * > * {margin-left:40px;margin-bottom:40px;}'+
''+
''+
''+
'/* Pos */'+
''+
'.pos-1o1,'+
'.pos-1o2,'+
'.pos-1o3,'+
'.pos-1o4,'+
'.pos-1o5,'+
'.pos-1o6,'+
'.pos-1o7,'+
'.pos-1o8 {margin-left:0%;}'+
''+
'.pos-2o5 {margin-left:20%;}'+
''+
'.pos-2o4,'+
'.pos-3o8 {margin-left:25%;}'+
''+
'.pos-3o5 {margin-left:40%;}'+
''+
'.pos-2o2,'+
'.pos-3o4,'+
'.pos-4o6,'+
'.pos-5o8 {margin-left:50%;}'+
''+
'.pos-4o5 {margin-left:60%;}'+
''+
'.pos-4o4,'+
'.pos-7o8 {margin-left:75%;}'+
''+
'.pos-5o5 {margin-left:80%;}'+
''+
'.pos-2o3,'+
'.pos-3o6 {margin-left:33.3333%;}'+
''+
'.pos-2o6 {margin-left:16.6666%;}'+
''+
'.pos-2o7 {margin-left:14.2857%;}'+
''+
'.pos-2o8 {margin-left:12.5%;}'+
''+
'.pos-3o3,'+
'.pos-5o6 {margin-left:66.6666%;}'+
''+
'.pos-3o7 {margin-left:28.5714%;}'+
''+
'.pos-4o7 {margin-left:42.8571%;}'+
''+
'.pos-4o8 {margin-left:37.5%;}'+
''+
'.pos-5o7 {margin-left:57.1428%;}'+
''+
'.pos-6o6 {margin-left:83.3333%;}'+
''+
'.pos-6o7 {margin-left:71.4285%;}'+
''+
'.pos-6o8 {margin-left:62.5%;}'+
''+
'.pos-7o7 {margin-left:85.7142%;}'+
''+
'.pos-8o8 {margin-left:87.5%;}'+
''+
''+
'.pos-1o1,'+
'.pos-1o2,'+
'.pos-1o3,'+
'.pos-1o4,'+
'.pos-1o5,'+
'.pos-1o6,'+
'.pos-1o7,'+
'.pos-1o8,'+
'.pos-2o5,'+
'.pos-2o4,'+
'.pos-3o8,'+
'.pos-3o5,'+
'.pos-2o2,'+
'.pos-3o4,'+
'.pos-4o6,'+
'.pos-5o8,'+
'.pos-4o5,'+
'.pos-4o4,'+
'.pos-7o8,'+
'.pos-5o5,'+
'.pos-2o3,'+
'.pos-3o6,'+
'.pos-2o6,'+
'.pos-2o7,'+
'.pos-2o8,'+
'.pos-3o3,'+
'.pos-5o6,'+
'.pos-3o7,'+
'.pos-4o7,'+
'.pos-4o8,'+
'.pos-5o7,'+
'.pos-6o6,'+
'.pos-6o7,'+
'.pos-6o8,'+
'.pos-7o7,'+
'.pos-8o8 {margin-right:-100%;}'+
''+
''+
''+
'',
''+
''+
'.col-1up {float:left;width:100%;}'+
'.col-none-1up {float:none;width:auto;}'+
'.clear-1up {clear:left;}'+
'.clear-none-1up {clear:none;}'+
''+
''+
''+
'/* Col Gutter */'+
'.col-gut-1up,'+
''+
''+
'.col-gut-1x-1up,'+
''+
''+
''+
'.col-gut-2x-1up,'+
''+
''+
''+
'.col-gut-3x-1up,'+
''+
''+
''+
'.col-gut-4x-1up,'+
''+
''+
''+
'.col-gut-5x-1up,'+
''+
''+
''+
'.col-gut-6x-1up,'+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
'.col-gut-1o2x-1up,'+
'.col-gut-none-1up {-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;}'+
''+
'.col-gut-1up {padding-left:10px;padding-right:10px;}'+
''+
''+
'.col-gut-1x-1up {padding-left:10px;padding-right:10px;}'+
''+
''+
''+
'.col-gut-2x-1up {padding-left:20px;padding-right:20px;}'+
''+
''+
''+
'.col-gut-3x-1up {padding-left:30px;padding-right:30px;}'+
''+
''+
''+
'.col-gut-4x-1up {padding-left:40px;padding-right:40px;}'+
''+
''+
''+
'.col-gut-5x-1up {padding-left:50px;padding-right:50px;}'+
''+
''+
''+
'.col-gut-6x-1up {padding-left:60px;padding-right:60px;}'+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
'.col-gut-1o2x-1up {padding-left:5px;padding-right:5px;}'+
'.col-gut-none-1up {padding-left:0;padding-right:0;}'+
''+
''+
'/* Hide Col Gutter * /'+
'.hide-col-gut-1up {margin-left:-10px;margin-right:-10px;}'+
''+
''+
'.hide-col-gut-1x-1up {margin-left:-10px;margin-right:-10px;}'+
''+
''+
''+
'.hide-col-gut-2x-1up {margin-left:-20px;margin-right:-20px;}'+
''+
''+
''+
'.hide-col-gut-3x-1up {margin-left:-30px;margin-right:-30px;}'+
''+
''+
''+
'.hide-col-gut-4x-1up {margin-left:-40px;margin-right:-40px;}'+
''+
''+
''+
'.hide-col-gut-5x-1up {margin-left:-50px;margin-right:-50px;}'+
''+
''+
''+
'.hide-col-gut-6x-1up {margin-left:-60px;margin-right:-60px;}'+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
'.hide-col-gut-1o2x-1up {margin-left:-5px;margin-right:-5px;}'+
'.hide-col-gut-none-1up {margin-left:0;margin-right:0;}'+
'/**/'+
''+
'/* Hide Gutter Left */'+
'.hide-gut-left-1up {margin-left:-20px;}'+
''+
''+
'.hide-gut-left-1x-1up {margin-left:-20px;}'+
''+
''+
''+
'.hide-gut-left-2x-1up {margin-left:-40px;}'+
''+
''+
''+
'.hide-gut-left-3x-1up {margin-left:-60px;}'+
''+
''+
''+
'.hide-gut-left-4x-1up {margin-left:-80px;}'+
''+
''+
''+
'.hide-gut-left-5x-1up {margin-left:-100px;}'+
''+
''+
''+
'.hide-gut-left-6x-1up {margin-left:-120px;}'+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
'.hide-gut-left-1o2x-1up {margin-left:-10px;}'+
'.hide-gut-left-none-1up {margin-left:0;}'+
''+
''+
'/* Gut Left */'+
'.gut-left-1up {margin-left:20px;}'+
''+
'.gut-left-1x-1up {margin-left:20px;}'+
''+
'.gut-left-2x-1up {margin-left:40px;}'+
''+
'.gut-left-3x-1up {margin-left:60px;}'+
''+
'.gut-left-4x-1up {margin-left:80px;}'+
''+
'.gut-left-5x-1up {margin-left:100px;}'+
''+
'.gut-left-6x-1up {margin-left:120px;}'+
''+
'.gut-left-7x-1up {margin-left:140px;}'+
''+
'.gut-left-8x-1up {margin-left:160px;}'+
''+
'.gut-left-9x-1up {margin-left:180px;}'+
''+
'.gut-left-10x-1up {margin-left:200px;}'+
''+
'.gut-left-11x-1up {margin-left:220px;}'+
''+
'.gut-left-12x-1up {margin-left:240px;}'+
''+
'.gut-left-1o2x-1up {margin-left:10px;}'+
''+
'.gut-left-small-1up {margin-left:80px;}'+
'.gut-left-medium-1up {margin-left:180px;}'+
'.gut-left-large-1up {margin-left:280px;}'+
'.gut-left-none-1up {margin-left:0;}'+
''+
''+
'/* Gut Right */'+
'.gut-right-1up {margin-right:20px;}'+
''+
'.gut-right-1x-1up {margin-right:20px;}'+
''+
'.gut-right-2x-1up {margin-right:40px;}'+
''+
'.gut-right-3x-1up {margin-right:60px;}'+
''+
'.gut-right-4x-1up {margin-right:80px;}'+
''+
'.gut-right-5x-1up {margin-right:100px;}'+
''+
'.gut-right-6x-1up {margin-right:120px;}'+
''+
'.gut-right-7x-1up {margin-right:140px;}'+
''+
'.gut-right-8x-1up {margin-right:160px;}'+
''+
'.gut-right-9x-1up {margin-right:180px;}'+
''+
'.gut-right-10x-1up {margin-right:200px;}'+
''+
'.gut-right-11x-1up {margin-right:220px;}'+
''+
'.gut-right-12x-1up {margin-right:240px;}'+
''+
'.gut-right-1o2x-1up {margin-right:10px;}'+
''+
'.gut-right-small-1up {margin-right:80px;}'+
'.gut-right-medium-1up {margin-right:180px;}'+
'.gut-right-large-1up {margin-right:280px;}'+
'.gut-right-none-1up {margin-right:0;}'+
''+
''+
'/* Gut Bottom */'+
'.gut-bottom-1up {margin-bottom:20px;}'+
''+
''+
'.gut-bottom-1x-1up {margin-bottom:20px;}'+
''+
''+
''+
'.gut-bottom-2x-1up {margin-bottom:40px;}'+
''+
''+
''+
'.gut-bottom-3x-1up {margin-bottom:60px;}'+
''+
''+
''+
'.gut-bottom-4x-1up {margin-bottom:80px;}'+
''+
''+
''+
'.gut-bottom-5x-1up {margin-bottom:100px;}'+
''+
''+
''+
'.gut-bottom-6x-1up {margin-bottom:120px;}'+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
'.gut-bottom-1o2x-1up {margin-bottom:10px;}'+
'.gut-bottom-none-1up {margin-bottom:0;}'+
''+
''+
'/* Pull Gut */'+
'.pull-gut-left-1x-1up,'+
'.pull-gut-left-1x-gut-1o2x-1up,'+
'.pull-gut-left-1x-gut-1x-1up,'+
'.pull-gut-left-2x-1up,'+
'.pull-gut-left-2x-gut-1o2x-1up,'+
'.pull-gut-left-2x-gut-1x-1up,'+
'.pull-gut-left-3x-1up,'+
'.pull-gut-left-3x-gut-1o2x-1up,'+
'.pull-gut-left-3x-gut-1x-1up,'+
'.pull-gut-left-4x-1up,'+
'.pull-gut-left-4x-gut-1o2x-1up,'+
'.pull-gut-left-4x-gut-1x-1up,'+
'.pull-gut-left-5x-1up,'+
'.pull-gut-left-5x-gut-1o2x-1up,'+
'.pull-gut-left-5x-gut-1x-1up,'+
'.pull-gut-left-6x-1up,'+
'.pull-gut-left-6x-gut-1o2x-1up,'+
'.pull-gut-left-6x-gut-1x-1up,'+
'.pull-gut-left-7x-1up,'+
'.pull-gut-left-7x-gut-1o2x-1up,'+
'.pull-gut-left-7x-gut-1x-1up,'+
'.pull-gut-left-8x-1up,'+
'.pull-gut-left-8x-gut-1o2x-1up,'+
'.pull-gut-left-8x-gut-1x-1up,'+
'.pull-gut-left-9x-1up,'+
'.pull-gut-left-9x-gut-1o2x-1up,'+
'.pull-gut-left-9x-gut-1x-1up,'+
'.pull-gut-left-10x-1up,'+
'.pull-gut-left-10x-gut-1o2x-1up,'+
'.pull-gut-left-10x-gut-1x-1up,'+
'.pull-gut-left-11x-1up,'+
'.pull-gut-left-11x-gut-1o2x-1up,'+
'.pull-gut-left-11x-gut-1x-1up,'+
'.pull-gut-left-12x-1up,'+
'.pull-gut-left-12x-gut-1o2x-1up,'+
'.pull-gut-left-12x-gut-1x-1up,'+
'.pull-gut-left-small-1up,'+
'.pull-gut-left-small-gut-1o2x-1up,'+
'.pull-gut-left-small-gut-1x-1up,'+
'.pull-gut-left-medium-1up,'+
'.pull-gut-left-medium-gut-1o2x-1up,'+
'.pull-gut-left-medium-gut-1x-1up,'+
'.pull-gut-left-large-1up,'+
'.pull-gut-left-large-gut-1o2x-1up,'+
'.pull-gut-left-large-gut-1x-1up'+
'{float:left;display:inline;clear:both;position:static!important;position:relative;}'+
''+
'.pull-gut-left-1up {margin-left:-100px;width:80px;}'+
''+
'.pull-gut-left-1x-1up {margin-left:-20px;width:20px;}'+
''+
'.pull-gut-left-1x-gut-1o2x-1up {margin-left:-20px;width:10px;}'+
''+
'.pull-gut-left-1x-gut-1x-1up {margin-left:-20px;width:0px;}'+
''+
'.pull-gut-left-2x-1up {margin-left:-40px;width:40px;}'+
''+
'.pull-gut-left-2x-gut-1o2x-1up {margin-left:-40px;width:30px;}'+
''+
'.pull-gut-left-2x-gut-1x-1up {margin-left:-40px;width:20px;}'+
''+
'.pull-gut-left-3x-1up {margin-left:-60px;width:60px;}'+
''+
'.pull-gut-left-3x-gut-1o2x-1up {margin-left:-60px;width:50px;}'+
''+
'.pull-gut-left-3x-gut-1x-1up {margin-left:-60px;width:40px;}'+
''+
'.pull-gut-left-4x-1up {margin-left:-80px;width:80px;}'+
''+
'.pull-gut-left-4x-gut-1o2x-1up {margin-left:-80px;width:70px;}'+
''+
'.pull-gut-left-4x-gut-1x-1up {margin-left:-80px;width:60px;}'+
''+
'.pull-gut-left-5x-1up {margin-left:-100px;width:100px;}'+
''+
'.pull-gut-left-5x-gut-1o2x-1up {margin-left:-100px;width:90px;}'+
''+
'.pull-gut-left-5x-gut-1x-1up {margin-left:-100px;width:80px;}'+
''+
'.pull-gut-left-6x-1up {margin-left:-120px;width:120px;}'+
''+
'.pull-gut-left-6x-gut-1o2x-1up {margin-left:-120px;width:110px;}'+
''+
'.pull-gut-left-6x-gut-1x-1up {margin-left:-120px;width:100px;}'+
''+
'.pull-gut-left-7x-1up {margin-left:-140px;width:140px;}'+
''+
'.pull-gut-left-7x-gut-1o2x-1up {margin-left:-140px;width:130px;}'+
''+
'.pull-gut-left-7x-gut-1x-1up {margin-left:-140px;width:120px;}'+
''+
'.pull-gut-left-8x-1up {margin-left:-160px;width:160px;}'+
''+
'.pull-gut-left-8x-gut-1o2x-1up {margin-left:-160px;width:150px;}'+
''+
'.pull-gut-left-8x-gut-1x-1up {margin-left:-160px;width:140px;}'+
''+
'.pull-gut-left-9x-1up {margin-left:-180px;width:180px;}'+
''+
'.pull-gut-left-9x-gut-1o2x-1up {margin-left:-180px;width:170px;}'+
''+
'.pull-gut-left-9x-gut-1x-1up {margin-left:-180px;width:160px;}'+
''+
'.pull-gut-left-10x-1up {margin-left:-200px;width:200px;}'+
''+
'.pull-gut-left-10x-gut-1o2x-1up {margin-left:-200px;width:190px;}'+
''+
'.pull-gut-left-10x-gut-1x-1up {margin-left:-200px;width:180px;}'+
''+
'.pull-gut-left-11x-1up {margin-left:-220px;width:220px;}'+
''+
'.pull-gut-left-11x-gut-1o2x-1up {margin-left:-220px;width:210px;}'+
''+
'.pull-gut-left-11x-gut-1x-1up {margin-left:-220px;width:200px;}'+
''+
'.pull-gut-left-12x-1up {margin-left:-240px;width:240px;}'+
''+
'.pull-gut-left-12x-gut-1o2x-1up {margin-left:-240px;width:230px;}'+
''+
'.pull-gut-left-12x-gut-1x-1up {margin-left:-240px;width:220px;}'+
''+
'.pull-gut-left-small-1up {margin-left:-80px;width:80px;}'+
''+
'.pull-gut-left-small-gut-1o2x-1up {margin-left:-80px;width:70px;}'+
''+
'.pull-gut-left-small-gut-1x-1up {margin-left:-80px;width:60px;}'+
''+
'.pull-gut-left-medium-1up {margin-left:-180px;width:180px;}'+
''+
'.pull-gut-left-medium-gut-1o2x-1up {margin-left:-180px;width:170px;}'+
''+
'.pull-gut-left-medium-gut-1x-1up {margin-left:-180px;width:160px;}'+
''+
'.pull-gut-left-large-1up {margin-left:-280px;width:280px;}'+
''+
'.pull-gut-left-large-gut-1o2x-1up {margin-left:-280px;width:270px;}'+
''+
'.pull-gut-left-large-gut-1x-1up {margin-left:-280px;width:260px;}'+
''+
''+
'.pull-gut-left-none-1up {margin-left:0;width:auto;float:none;position:static;}'+
''+
''+
''+
'/* Pull Gut Right */'+
'.pull-gut-right-1x-1up,'+
'.pull-gut-right-1x-gut-1o2x-1up,'+
'.pull-gut-right-1x-gut-1x-1up,'+
'.pull-gut-right-2x-1up,'+
'.pull-gut-right-2x-gut-1o2x-1up,'+
'.pull-gut-right-2x-gut-1x-1up,'+
'.pull-gut-right-3x-1up,'+
'.pull-gut-right-3x-gut-1o2x-1up,'+
'.pull-gut-right-3x-gut-1x-1up,'+
'.pull-gut-right-4x-1up,'+
'.pull-gut-right-4x-gut-1o2x-1up,'+
'.pull-gut-right-4x-gut-1x-1up,'+
'.pull-gut-right-5x-1up,'+
'.pull-gut-right-5x-gut-1o2x-1up,'+
'.pull-gut-right-5x-gut-1x-1up,'+
'.pull-gut-right-6x-1up,'+
'.pull-gut-right-6x-gut-1o2x-1up,'+
'.pull-gut-right-6x-gut-1x-1up,'+
'.pull-gut-right-7x-1up,'+
'.pull-gut-right-7x-gut-1o2x-1up,'+
'.pull-gut-right-7x-gut-1x-1up,'+
'.pull-gut-right-8x-1up,'+
'.pull-gut-right-8x-gut-1o2x-1up,'+
'.pull-gut-right-8x-gut-1x-1up,'+
'.pull-gut-right-9x-1up,'+
'.pull-gut-right-9x-gut-1o2x-1up,'+
'.pull-gut-right-9x-gut-1x-1up,'+
'.pull-gut-right-10x-1up,'+
'.pull-gut-right-10x-gut-1o2x-1up,'+
'.pull-gut-right-10x-gut-1x-1up,'+
'.pull-gut-right-11x-1up,'+
'.pull-gut-right-11x-gut-1o2x-1up,'+
'.pull-gut-right-11x-gut-1x-1up,'+
'.pull-gut-right-12x-1up,'+
'.pull-gut-right-12x-gut-1o2x-1up,'+
'.pull-gut-right-12x-gut-1x-1up,'+
'.pull-gut-right-small-1up,'+
'.pull-gut-right-small-gut-1o2x-1up,'+
'.pull-gut-right-small-gut-1x-1up,'+
'.pull-gut-right-medium-1up,'+
'.pull-gut-right-medium-gut-1o2x-1up,'+
'.pull-gut-right-medium-gut-1x-1up,'+
'.pull-gut-right-large-1up,'+
'.pull-gut-right-large-gut-1o2x-1up,'+
'.pull-gut-right-large-gut-1x-1up'+
'{float:right;display:inline;clear:both;position:relative;}'+
'            '+
'.pull-gut-right-1up {margin-right:-100px;width:80px;}'+
''+
'.pull-gut-right-1x-1up {margin-right:-20px;width:20px;right:-0px;}'+
''+
'.pull-gut-right-1x-gut-1o2x-1up {margin-right:-10px;width:10px;right:-10px;}'+
''+
'.pull-gut-right-1x-gut-1x-1up {margin-right:-0px;width:0px;right:-20px;}'+
''+
'.pull-gut-right-2x-1up {margin-right:-40px;width:40px;right:-0px;}'+
''+
'.pull-gut-right-2x-gut-1o2x-1up {margin-right:-30px;width:30px;right:-10px;}'+
''+
'.pull-gut-right-2x-gut-1x-1up {margin-right:-20px;width:20px;right:-20px;}'+
''+
'.pull-gut-right-3x-1up {margin-right:-60px;width:60px;right:-0px;}'+
''+
'.pull-gut-right-3x-gut-1o2x-1up {margin-right:-50px;width:50px;right:-10px;}'+
''+
'.pull-gut-right-3x-gut-1x-1up {margin-right:-40px;width:40px;right:-20px;}'+
''+
'.pull-gut-right-4x-1up {margin-right:-80px;width:80px;right:-0px;}'+
''+
'.pull-gut-right-4x-gut-1o2x-1up {margin-right:-70px;width:70px;right:-10px;}'+
''+
'.pull-gut-right-4x-gut-1x-1up {margin-right:-60px;width:60px;right:-20px;}'+
''+
'.pull-gut-right-5x-1up {margin-right:-100px;width:100px;right:-0px;}'+
''+
'.pull-gut-right-5x-gut-1o2x-1up {margin-right:-90px;width:90px;right:-10px;}'+
''+
'.pull-gut-right-5x-gut-1x-1up {margin-right:-80px;width:80px;right:-20px;}'+
''+
'.pull-gut-right-6x-1up {margin-right:-120px;width:120px;right:-0px;}'+
''+
'.pull-gut-right-6x-gut-1o2x-1up {margin-right:-110px;width:110px;right:-10px;}'+
''+
'.pull-gut-right-6x-gut-1x-1up {margin-right:-100px;width:100px;right:-20px;}'+
''+
'.pull-gut-right-7x-1up {margin-right:-140px;width:140px;right:-0px;}'+
''+
'.pull-gut-right-7x-gut-1o2x-1up {margin-right:-130px;width:130px;right:-10px;}'+
''+
'.pull-gut-right-7x-gut-1x-1up {margin-right:-120px;width:120px;right:-20px;}'+
''+
'.pull-gut-right-8x-1up {margin-right:-160px;width:160px;right:-0px;}'+
''+
'.pull-gut-right-8x-gut-1o2x-1up {margin-right:-150px;width:150px;right:-10px;}'+
''+
'.pull-gut-right-8x-gut-1x-1up {margin-right:-140px;width:140px;right:-20px;}'+
''+
'.pull-gut-right-9x-1up {margin-right:-180px;width:180px;right:-0px;}'+
''+
'.pull-gut-right-9x-gut-1o2x-1up {margin-right:-170px;width:170px;right:-10px;}'+
''+
'.pull-gut-right-9x-gut-1x-1up {margin-right:-160px;width:160px;right:-20px;}'+
''+
'.pull-gut-right-10x-1up {margin-right:-200px;width:200px;right:-0px;}'+
''+
'.pull-gut-right-10x-gut-1o2x-1up {margin-right:-190px;width:190px;right:-10px;}'+
''+
'.pull-gut-right-10x-gut-1x-1up {margin-right:-180px;width:180px;right:-20px;}'+
''+
'.pull-gut-right-11x-1up {margin-right:-220px;width:220px;right:-0px;}'+
''+
'.pull-gut-right-11x-gut-1o2x-1up {margin-right:-210px;width:210px;right:-10px;}'+
''+
'.pull-gut-right-11x-gut-1x-1up {margin-right:-200px;width:200px;right:-20px;}'+
''+
'.pull-gut-right-12x-1up {margin-right:-240px;width:240px;right:-0px;}'+
''+
'.pull-gut-right-12x-gut-1o2x-1up {margin-right:-230px;width:230px;right:-10px;}'+
''+
'.pull-gut-right-12x-gut-1x-1up {margin-right:-220px;width:220px;right:-20px;}'+
''+
'.pull-gut-right-small-1up {margin-right:-80px;width:80px;right:-0px;}'+
''+
'.pull-gut-right-small-gut-1o2x-1up {margin-right:-70px;width:70px;right:-10px;}'+
''+
'.pull-gut-right-small-gut-1x-1up {margin-right:-60px;width:60px;right:-20px;}'+
''+
'.pull-gut-right-medium-1up {margin-right:-180px;width:180px;right:-0px;}'+
''+
'.pull-gut-right-medium-gut-1o2x-1up {margin-right:-170px;width:170px;right:-10px;}'+
''+
'.pull-gut-right-medium-gut-1x-1up {margin-right:-160px;width:160px;right:-20px;}'+
''+
'.pull-gut-right-large-1up {margin-right:-280px;width:280px;right:-0px;}'+
''+
'.pull-gut-right-large-gut-1o2x-1up {margin-right:-270px;width:270px;right:-10px;}'+
''+
'.pull-gut-right-large-gut-1x-1up {margin-right:-260px;width:260px;right:-20px;}'+
''+
''+
'.pull-gut-right-none-1up {margin-right:0;width:auto;float:none;position:static;}'+
''+
''+
''+
'/* Max Width */'+
''+
'.width-max-1dx-1up {max-width:220px;}'+
''+
'.width-max-2dx-1up {max-width:460px;}'+
''+
'.width-max-3dx-1up {max-width:700px;}'+
''+
'.width-max-4dx-1up {max-width:940px;}'+
''+
'.width-max-5dx-1up {max-width:1180px;}'+
''+
'.width-max-6dx-1up {max-width:1420px;}'+
''+
'.width-max-7dx-1up {max-width:1660px;}'+
''+
''+
''+
''+
'/* Widths */'+
'.widths-auto-1up > * {width:auto;}'+
''+
'.widths-1o5-1up .col-cols,'+
'.widths-1o5-1up > * {width:20%;}'+
''+
'.widths-1o4-1up .col-cols,'+
'.widths-1o4-1up > *,'+
'.widths-2o8-1up .col-cols,'+
'.widths-2o8-1up > * {width:25%;}'+
''+
'.widths-2o5-1up .col-cols,'+
'.widths-2o5-1up > * {width:40%;}'+
''+
'.widths-1o2-1up .col-cols,'+
'.widths-1o2-1up > *,'+
'.widths-2o4-1up .col-cols,'+
'.widths-2o4-1up > *,'+
'.widths-3o6-1up .col-cols,'+
'.widths-3o6-1up > *,'+
'.widths-4o8-1up .col-cols,'+
'.widths-4o8-1up > * {width:50%;}'+
''+
'.widths-3o5-1up .col-cols,'+
'.widths-3o5-1up > * {width:60%;}'+
''+
'.widths-3o4-1up .col-cols,'+
'.widths-3o4-1up > *,'+
'.widths-6o8-1up .col-cols,'+
'.widths-6o8-1up > * {width:75%;}'+
''+
'.widths-4o5-1up .col-cols,'+
'.widths-4o5-1up > * {width:80%;}'+
''+
'.widths-1o1-1up .col-cols,'+
'.widths-1o1-1up > *,'+
'.widths-2o2-1up .col-cols,'+
'.widths-2o2-1up > *,'+
'.widths-3o3-1up .col-cols,'+
'.widths-3o3-1up > *,'+
'.widths-4o4-1up .col-cols,'+
'.widths-4o4-1up > *,'+
'.widths-5o5-1up .col-cols,'+
'.widths-5o5-1up > *,'+
'.widths-6o6-1up .col-cols,'+
'.widths-6o6-1up > *,'+
'.widths-7o7-1up .col-cols,'+
'.widths-7o7-1up > *,'+
'.widths-8o8-1up .col-cols,'+
'.widths-8o8-1up > * {width:100%;}'+
''+
'.widths-1o3-1up .col-cols,'+
'.widths-1o3-1up > *,'+
'.widths-2o6-1up .col-cols,'+
'.widths-2o6-1up > * {width:33.3333%;}'+
''+
'.widths-1o6-1up .col-cols,'+
'.widths-1o6-1up > * {width:16.6666%;}'+
''+
'.widths-1o7-1up .col-cols,'+
'.widths-1o7-1up > * {width:14.2857%;}'+
''+
'.widths-1o8-1up .col-cols,'+
'.widths-1o8-1up > * {width:12.5%;}'+
''+
'.widths-2o3-1up .col-cols,'+
'.widths-2o3-1up > *,'+
'.widths-4o6-1up .col-cols,'+
'.widths-4o6-1up > * {width:66.6666%;}'+
''+
'.widths-2o7-1up .col-cols,'+
'.widths-2o7-1up > * {width:28.5714%;}'+
''+
'.widths-3o7-1up .col-cols,'+
'.widths-3o7-1up > * {width:42.8571%;}'+
''+
'.widths-3o8-1up .col-cols,'+
'.widths-3o8-1up > * {width:37.5%;}'+
''+
'.widths-4o7-1up .col-cols,'+
'.widths-4o7-1up > * {width:57.1428%;}'+
''+
'.widths-5o6-1up .col-cols,'+
'.widths-5o6-1up > * {width:83.3333%;}'+
''+
'.widths-5o7-1up .col-cols,'+
'.widths-5o7-1up > * {width:71.4285%;}'+
''+
'.widths-5o8-1up .col-cols,'+
'.widths-5o8-1up > * {width:62.5%;}'+
''+
'.widths-6o7-1up .col-cols,'+
'.widths-6o7-1up > * {width:85.7142%;}'+
''+
'.widths-7o8-1up .col-cols,'+
'.widths-7o8-1up > * {width:87.5%;}'+
''+
''+
''+
''+
'/* Width */'+
'.width-auto-1up {width:auto;}'+
''+
'.width-1o5-1up {width:20%;}'+
''+
'.width-1o4-1up,'+
'.width-2o8-1up {width:25%;}'+
''+
'.width-2o5-1up {width:40%;}'+
''+
'.width-1o2-1up,'+
'.width-2o4-1up,'+
'.width-3o6-1up,'+
'.width-4o8-1up {width:50%;}'+
''+
'.width-3o5-1up {width:60%;}'+
''+
'.width-3o4-1up,'+
'.width-6o8-1up {width:75%;}'+
''+
'.width-4o5-1up {width:80%;}'+
''+
'.width-1o1-1up,'+
'.width-2o2-1up,'+
'.width-3o3-1up,'+
'.width-4o4-1up,'+
'.width-5o5-1up,'+
'.width-6o6-1up,'+
'.width-7o7-1up,'+
'.width-8o8-1up {width:100%;}'+
''+
'.width-1o3-1up,'+
'.width-2o6-1up {width:33.3333%;}'+
''+
'.width-1o6-1up {width:16.6666%;}'+
''+
'.width-1o7-1up {width:14.2857%;}'+
''+
'.width-1o8-1up {width:12.5%;}'+
''+
'.width-2o3-1up,'+
'.width-4o6-1up {width:66.6666%;}'+
''+
'.width-2o7-1up {width:28.5714%;}'+
''+
'.width-3o7-1up {width:42.8571%;}'+
''+
'.width-3o8-1up {width:37.5%;}'+
''+
'.width-4o7-1up {width:57.1428%;}'+
''+
'.width-5o6-1up {width:83.3333%;}'+
''+
'.width-5o7-1up {width:71.4285%;}'+
''+
'.width-5o8-1up {width:62.5%;}'+
''+
'.width-6o7-1up {width:85.7142%;}'+
''+
'.width-7o8-1up {width:87.5%;}'+
''+
''+
''+
'/* Cols */'+
''+
'.cols-1-1up > *,'+
'.cols-1-col-1up .col {float:left;width:100%;}'+
''+
'.cols-2-1up > *,'+
'.cols-2-col-1up .col {float:left;width:50%;}'+
''+
'.cols-3-1up > *,'+
'.cols-3-col-1up .col {float:left;width:33.3333%;}'+
''+
'.cols-4-1up > *,'+
'.cols-4-col-1up .col {float:left;width:25%;}'+
''+
'.cols-5-1up > *,'+
'.cols-5-col-1up .col {float:left;width:20%;}'+
''+
'.cols-6-1up > *,'+
'.cols-6-col-1up .col {float:left;width:16.6666%;}'+
''+
'.cols-7-1up > *,'+
'.cols-7-col-1up .col {float:left;width:14.2857%;}'+
''+
'.cols-8-1up > *,'+
'.cols-8-col-1up .col {float:left;width:12.5%;}'+
''+
''+
''+
'/* Guts */'+
'.guts-1up > *,'+
'.guts-1x-1up > *,'+
'.guts-2x-1up > *,'+
'.guts-1o2x-1up > * {-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;}'+
''+
'.guts-1o2x-1up {margin-left:-5px;margin-right:-5px;}'+
'.guts-1o2x-1up > * {padding-left:5px;padding-right:5px;margin-bottom:10px;}'+
'.guts-1up {margin-left:-10px;margin-right:-10px;}'+
'.guts-1up > * {padding-left:10px;padding-right:10px;margin-bottom:20px;}'+
'.guts-1x-1up {margin-left:-10px;margin-right:-10px;}'+
'.guts-1x-1up > * {padding-left:10px;padding-right:10px;margin-bottom:20px;}'+
'.guts-2x-1up {margin-left:-20px;margin-right:-20px;}'+
'.guts-2x-1up > * {padding-left:20px;padding-right:20px;margin-bottom:40px;}'+
''+
''+
'/* Guts Full-Width class a */'+
'.guts-fw-1o2x-1up {margin-left:-10px;}'+
'.guts-fw-1o2x-1up > * > * {margin-left:10px;margin-bottom:10px;}'+
'.guts-fw-1up {margin-left:-20px;}'+
'.guts-fw-1up > * > * {margin-left:20px;margin-bottom:20px;}'+
'.guts-fw-1x-1up {margin-left:-20px;}'+
'.guts-fw-1x-1up > * > * {margin-left:20px;margin-bottom:20px;}'+
'.guts-fw-2x-1up {margin-left:-40px;}'+
'.guts-fw-2x-1up > * > * {margin-left:40px;margin-bottom:40px;}'+
''+
''+
''+
'/* Pos */'+
''+
'.pos-1o1-1up,'+
'.pos-1o2-1up,'+
'.pos-1o3-1up,'+
'.pos-1o4-1up,'+
'.pos-1o5-1up,'+
'.pos-1o6-1up,'+
'.pos-1o7-1up,'+
'.pos-1o8-1up {margin-left:0%;}'+
''+
'.pos-2o5-1up {margin-left:20%;}'+
''+
'.pos-2o4-1up,'+
'.pos-3o8-1up {margin-left:25%;}'+
''+
'.pos-3o5-1up {margin-left:40%;}'+
''+
'.pos-2o2-1up,'+
'.pos-3o4-1up,'+
'.pos-4o6-1up,'+
'.pos-5o8-1up {margin-left:50%;}'+
''+
'.pos-4o5-1up {margin-left:60%;}'+
''+
'.pos-4o4-1up,'+
'.pos-7o8-1up {margin-left:75%;}'+
''+
'.pos-5o5-1up {margin-left:80%;}'+
''+
'.pos-2o3-1up,'+
'.pos-3o6-1up {margin-left:33.3333%;}'+
''+
'.pos-2o6-1up {margin-left:16.6666%;}'+
''+
'.pos-2o7-1up {margin-left:14.2857%;}'+
''+
'.pos-2o8-1up {margin-left:12.5%;}'+
''+
'.pos-3o3-1up,'+
'.pos-5o6-1up {margin-left:66.6666%;}'+
''+
'.pos-3o7-1up {margin-left:28.5714%;}'+
''+
'.pos-4o7-1up {margin-left:42.8571%;}'+
''+
'.pos-4o8-1up {margin-left:37.5%;}'+
''+
'.pos-5o7-1up {margin-left:57.1428%;}'+
''+
'.pos-6o6-1up {margin-left:83.3333%;}'+
''+
'.pos-6o7-1up {margin-left:71.4285%;}'+
''+
'.pos-6o8-1up {margin-left:62.5%;}'+
''+
'.pos-7o7-1up {margin-left:85.7142%;}'+
''+
'.pos-8o8-1up {margin-left:87.5%;}'+
''+
''+
'.pos-1o1-1up,'+
'.pos-1o2-1up,'+
'.pos-1o3-1up,'+
'.pos-1o4-1up,'+
'.pos-1o5-1up,'+
'.pos-1o6-1up,'+
'.pos-1o7-1up,'+
'.pos-1o8-1up,'+
'.pos-2o5-1up,'+
'.pos-2o4-1up,'+
'.pos-3o8-1up,'+
'.pos-3o5-1up,'+
'.pos-2o2-1up,'+
'.pos-3o4-1up,'+
'.pos-4o6-1up,'+
'.pos-5o8-1up,'+
'.pos-4o5-1up,'+
'.pos-4o4-1up,'+
'.pos-7o8-1up,'+
'.pos-5o5-1up,'+
'.pos-2o3-1up,'+
'.pos-3o6-1up,'+
'.pos-2o6-1up,'+
'.pos-2o7-1up,'+
'.pos-2o8-1up,'+
'.pos-3o3-1up,'+
'.pos-5o6-1up,'+
'.pos-3o7-1up,'+
'.pos-4o7-1up,'+
'.pos-4o8-1up,'+
'.pos-5o7-1up,'+
'.pos-6o6-1up,'+
'.pos-6o7-1up,'+
'.pos-6o8-1up,'+
'.pos-7o7-1up,'+
'.pos-8o8-1up {margin-right:-100%;}'+
''+
''+
''+
'}'+
''+
'',
''+
''+
'.col-2up {float:left;width:100%;}'+
'.col-none-2up {float:none;width:auto;}'+
'.clear-2up {clear:left;}'+
'.clear-none-2up {clear:none;}'+
''+
''+
''+
'/* Col Gutter */'+
'.col-gut-2up,'+
''+
''+
'.col-gut-1x-2up,'+
''+
''+
''+
'.col-gut-2x-2up,'+
''+
''+
''+
'.col-gut-3x-2up,'+
''+
''+
''+
'.col-gut-4x-2up,'+
''+
''+
''+
'.col-gut-5x-2up,'+
''+
''+
''+
'.col-gut-6x-2up,'+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
'.col-gut-1o2x-2up,'+
'.col-gut-none-2up {-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;}'+
''+
'.col-gut-2up {padding-left:10px;padding-right:10px;}'+
''+
''+
'.col-gut-1x-2up {padding-left:10px;padding-right:10px;}'+
''+
''+
''+
'.col-gut-2x-2up {padding-left:20px;padding-right:20px;}'+
''+
''+
''+
'.col-gut-3x-2up {padding-left:30px;padding-right:30px;}'+
''+
''+
''+
'.col-gut-4x-2up {padding-left:40px;padding-right:40px;}'+
''+
''+
''+
'.col-gut-5x-2up {padding-left:50px;padding-right:50px;}'+
''+
''+
''+
'.col-gut-6x-2up {padding-left:60px;padding-right:60px;}'+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
'.col-gut-1o2x-2up {padding-left:5px;padding-right:5px;}'+
'.col-gut-none-2up {padding-left:0;padding-right:0;}'+
''+
''+
'/* Hide Col Gutter * /'+
'.hide-col-gut-2up {margin-left:-10px;margin-right:-10px;}'+
''+
''+
'.hide-col-gut-1x-2up {margin-left:-10px;margin-right:-10px;}'+
''+
''+
''+
'.hide-col-gut-2x-2up {margin-left:-20px;margin-right:-20px;}'+
''+
''+
''+
'.hide-col-gut-3x-2up {margin-left:-30px;margin-right:-30px;}'+
''+
''+
''+
'.hide-col-gut-4x-2up {margin-left:-40px;margin-right:-40px;}'+
''+
''+
''+
'.hide-col-gut-5x-2up {margin-left:-50px;margin-right:-50px;}'+
''+
''+
''+
'.hide-col-gut-6x-2up {margin-left:-60px;margin-right:-60px;}'+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
'.hide-col-gut-1o2x-2up {margin-left:-5px;margin-right:-5px;}'+
'.hide-col-gut-none-2up {margin-left:0;margin-right:0;}'+
'/**/'+
''+
'/* Hide Gutter Left */'+
'.hide-gut-left-2up {margin-left:-20px;}'+
''+
''+
'.hide-gut-left-1x-2up {margin-left:-20px;}'+
''+
''+
''+
'.hide-gut-left-2x-2up {margin-left:-40px;}'+
''+
''+
''+
'.hide-gut-left-3x-2up {margin-left:-60px;}'+
''+
''+
''+
'.hide-gut-left-4x-2up {margin-left:-80px;}'+
''+
''+
''+
'.hide-gut-left-5x-2up {margin-left:-100px;}'+
''+
''+
''+
'.hide-gut-left-6x-2up {margin-left:-120px;}'+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
'.hide-gut-left-1o2x-2up {margin-left:-10px;}'+
'.hide-gut-left-none-2up {margin-left:0;}'+
''+
''+
'/* Gut Left */'+
'.gut-left-2up {margin-left:20px;}'+
''+
'.gut-left-1x-2up {margin-left:20px;}'+
''+
'.gut-left-2x-2up {margin-left:40px;}'+
''+
'.gut-left-3x-2up {margin-left:60px;}'+
''+
'.gut-left-4x-2up {margin-left:80px;}'+
''+
'.gut-left-5x-2up {margin-left:100px;}'+
''+
'.gut-left-6x-2up {margin-left:120px;}'+
''+
'.gut-left-7x-2up {margin-left:140px;}'+
''+
'.gut-left-8x-2up {margin-left:160px;}'+
''+
'.gut-left-9x-2up {margin-left:180px;}'+
''+
'.gut-left-10x-2up {margin-left:200px;}'+
''+
'.gut-left-11x-2up {margin-left:220px;}'+
''+
'.gut-left-12x-2up {margin-left:240px;}'+
''+
'.gut-left-1o2x-2up {margin-left:10px;}'+
''+
'.gut-left-small-2up {margin-left:80px;}'+
'.gut-left-medium-2up {margin-left:180px;}'+
'.gut-left-large-2up {margin-left:280px;}'+
'.gut-left-none-2up {margin-left:0;}'+
''+
''+
'/* Gut Right */'+
'.gut-right-2up {margin-right:20px;}'+
''+
'.gut-right-1x-2up {margin-right:20px;}'+
''+
'.gut-right-2x-2up {margin-right:40px;}'+
''+
'.gut-right-3x-2up {margin-right:60px;}'+
''+
'.gut-right-4x-2up {margin-right:80px;}'+
''+
'.gut-right-5x-2up {margin-right:100px;}'+
''+
'.gut-right-6x-2up {margin-right:120px;}'+
''+
'.gut-right-7x-2up {margin-right:140px;}'+
''+
'.gut-right-8x-2up {margin-right:160px;}'+
''+
'.gut-right-9x-2up {margin-right:180px;}'+
''+
'.gut-right-10x-2up {margin-right:200px;}'+
''+
'.gut-right-11x-2up {margin-right:220px;}'+
''+
'.gut-right-12x-2up {margin-right:240px;}'+
''+
'.gut-right-1o2x-2up {margin-right:10px;}'+
''+
'.gut-right-small-2up {margin-right:80px;}'+
'.gut-right-medium-2up {margin-right:180px;}'+
'.gut-right-large-2up {margin-right:280px;}'+
'.gut-right-none-2up {margin-right:0;}'+
''+
''+
'/* Gut Bottom */'+
'.gut-bottom-2up {margin-bottom:20px;}'+
''+
''+
'.gut-bottom-1x-2up {margin-bottom:20px;}'+
''+
''+
''+
'.gut-bottom-2x-2up {margin-bottom:40px;}'+
''+
''+
''+
'.gut-bottom-3x-2up {margin-bottom:60px;}'+
''+
''+
''+
'.gut-bottom-4x-2up {margin-bottom:80px;}'+
''+
''+
''+
'.gut-bottom-5x-2up {margin-bottom:100px;}'+
''+
''+
''+
'.gut-bottom-6x-2up {margin-bottom:120px;}'+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
''+
'.gut-bottom-1o2x-2up {margin-bottom:10px;}'+
'.gut-bottom-none-2up {margin-bottom:0;}'+
''+
''+
'/* Pull Gut */'+
'.pull-gut-left-1x-2up,'+
'.pull-gut-left-1x-gut-1o2x-2up,'+
'.pull-gut-left-1x-gut-1x-2up,'+
'.pull-gut-left-2x-2up,'+
'.pull-gut-left-2x-gut-1o2x-2up,'+
'.pull-gut-left-2x-gut-1x-2up,'+
'.pull-gut-left-3x-2up,'+
'.pull-gut-left-3x-gut-1o2x-2up,'+
'.pull-gut-left-3x-gut-1x-2up,'+
'.pull-gut-left-4x-2up,'+
'.pull-gut-left-4x-gut-1o2x-2up,'+
'.pull-gut-left-4x-gut-1x-2up,'+
'.pull-gut-left-5x-2up,'+
'.pull-gut-left-5x-gut-1o2x-2up,'+
'.pull-gut-left-5x-gut-1x-2up,'+
'.pull-gut-left-6x-2up,'+
'.pull-gut-left-6x-gut-1o2x-2up,'+
'.pull-gut-left-6x-gut-1x-2up,'+
'.pull-gut-left-7x-2up,'+
'.pull-gut-left-7x-gut-1o2x-2up,'+
'.pull-gut-left-7x-gut-1x-2up,'+
'.pull-gut-left-8x-2up,'+
'.pull-gut-left-8x-gut-1o2x-2up,'+
'.pull-gut-left-8x-gut-1x-2up,'+
'.pull-gut-left-9x-2up,'+
'.pull-gut-left-9x-gut-1o2x-2up,'+
'.pull-gut-left-9x-gut-1x-2up,'+
'.pull-gut-left-10x-2up,'+
'.pull-gut-left-10x-gut-1o2x-2up,'+
'.pull-gut-left-10x-gut-1x-2up,'+
'.pull-gut-left-11x-2up,'+
'.pull-gut-left-11x-gut-1o2x-2up,'+
'.pull-gut-left-11x-gut-1x-2up,'+
'.pull-gut-left-12x-2up,'+
'.pull-gut-left-12x-gut-1o2x-2up,'+
'.pull-gut-left-12x-gut-1x-2up,'+
'.pull-gut-left-small-2up,'+
'.pull-gut-left-small-gut-1o2x-2up,'+
'.pull-gut-left-small-gut-1x-2up,'+
'.pull-gut-left-medium-2up,'+
'.pull-gut-left-medium-gut-1o2x-2up,'+
'.pull-gut-left-medium-gut-1x-2up,'+
'.pull-gut-left-large-2up,'+
'.pull-gut-left-large-gut-1o2x-2up,'+
'.pull-gut-left-large-gut-1x-2up'+
'{float:left;display:inline;clear:both;position:static!important;position:relative;}'+
''+
'.pull-gut-left-2up {margin-left:-100px;width:80px;}'+
''+
'.pull-gut-left-1x-2up {margin-left:-20px;width:20px;}'+
''+
'.pull-gut-left-1x-gut-1o2x-2up {margin-left:-20px;width:10px;}'+
''+
'.pull-gut-left-1x-gut-1x-2up {margin-left:-20px;width:0px;}'+
''+
'.pull-gut-left-2x-2up {margin-left:-40px;width:40px;}'+
''+
'.pull-gut-left-2x-gut-1o2x-2up {margin-left:-40px;width:30px;}'+
''+
'.pull-gut-left-2x-gut-1x-2up {margin-left:-40px;width:20px;}'+
''+
'.pull-gut-left-3x-2up {margin-left:-60px;width:60px;}'+
''+
'.pull-gut-left-3x-gut-1o2x-2up {margin-left:-60px;width:50px;}'+
''+
'.pull-gut-left-3x-gut-1x-2up {margin-left:-60px;width:40px;}'+
''+
'.pull-gut-left-4x-2up {margin-left:-80px;width:80px;}'+
''+
'.pull-gut-left-4x-gut-1o2x-2up {margin-left:-80px;width:70px;}'+
''+
'.pull-gut-left-4x-gut-1x-2up {margin-left:-80px;width:60px;}'+
''+
'.pull-gut-left-5x-2up {margin-left:-100px;width:100px;}'+
''+
'.pull-gut-left-5x-gut-1o2x-2up {margin-left:-100px;width:90px;}'+
''+
'.pull-gut-left-5x-gut-1x-2up {margin-left:-100px;width:80px;}'+
''+
'.pull-gut-left-6x-2up {margin-left:-120px;width:120px;}'+
''+
'.pull-gut-left-6x-gut-1o2x-2up {margin-left:-120px;width:110px;}'+
''+
'.pull-gut-left-6x-gut-1x-2up {margin-left:-120px;width:100px;}'+
''+
'.pull-gut-left-7x-2up {margin-left:-140px;width:140px;}'+
''+
'.pull-gut-left-7x-gut-1o2x-2up {margin-left:-140px;width:130px;}'+
''+
'.pull-gut-left-7x-gut-1x-2up {margin-left:-140px;width:120px;}'+
''+
'.pull-gut-left-8x-2up {margin-left:-160px;width:160px;}'+
''+
'.pull-gut-left-8x-gut-1o2x-2up {margin-left:-160px;width:150px;}'+
''+
'.pull-gut-left-8x-gut-1x-2up {margin-left:-160px;width:140px;}'+
''+
'.pull-gut-left-9x-2up {margin-left:-180px;width:180px;}'+
''+
'.pull-gut-left-9x-gut-1o2x-2up {margin-left:-180px;width:170px;}'+
''+
'.pull-gut-left-9x-gut-1x-2up {margin-left:-180px;width:160px;}'+
''+
'.pull-gut-left-10x-2up {margin-left:-200px;width:200px;}'+
''+
'.pull-gut-left-10x-gut-1o2x-2up {margin-left:-200px;width:190px;}'+
''+
'.pull-gut-left-10x-gut-1x-2up {margin-left:-200px;width:180px;}'+
''+
'.pull-gut-left-11x-2up {margin-left:-220px;width:220px;}'+
''+
'.pull-gut-left-11x-gut-1o2x-2up {margin-left:-220px;width:210px;}'+
''+
'.pull-gut-left-11x-gut-1x-2up {margin-left:-220px;width:200px;}'+
''+
'.pull-gut-left-12x-2up {margin-left:-240px;width:240px;}'+
''+
'.pull-gut-left-12x-gut-1o2x-2up {margin-left:-240px;width:230px;}'+
''+
'.pull-gut-left-12x-gut-1x-2up {margin-left:-240px;width:220px;}'+
''+
'.pull-gut-left-small-2up {margin-left:-80px;width:80px;}'+
''+
'.pull-gut-left-small-gut-1o2x-2up {margin-left:-80px;width:70px;}'+
''+
'.pull-gut-left-small-gut-1x-2up {margin-left:-80px;width:60px;}'+
''+
'.pull-gut-left-medium-2up {margin-left:-180px;width:180px;}'+
''+
'.pull-gut-left-medium-gut-1o2x-2up {margin-left:-180px;width:170px;}'+
''+
'.pull-gut-left-medium-gut-1x-2up {margin-left:-180px;width:160px;}'+
''+
'.pull-gut-left-large-2up {margin-left:-280px;width:280px;}'+
''+
'.pull-gut-left-large-gut-1o2x-2up {margin-left:-280px;width:270px;}'+
''+
'.pull-gut-left-large-gut-1x-2up {margin-left:-280px;width:260px;}'+
''+
''+
'.pull-gut-left-none-2up {margin-left:0;width:auto;float:none;position:static;}'+
''+
''+
''+
'/* Pull Gut Right */'+
'.pull-gut-right-1x-2up,'+
'.pull-gut-right-1x-gut-1o2x-2up,'+
'.pull-gut-right-1x-gut-1x-2up,'+
'.pull-gut-right-2x-2up,'+
'.pull-gut-right-2x-gut-1o2x-2up,'+
'.pull-gut-right-2x-gut-1x-2up,'+
'.pull-gut-right-3x-2up,'+
'.pull-gut-right-3x-gut-1o2x-2up,'+
'.pull-gut-right-3x-gut-1x-2up,'+
'.pull-gut-right-4x-2up,'+
'.pull-gut-right-4x-gut-1o2x-2up,'+
'.pull-gut-right-4x-gut-1x-2up,'+
'.pull-gut-right-5x-2up,'+
'.pull-gut-right-5x-gut-1o2x-2up,'+
'.pull-gut-right-5x-gut-1x-2up,'+
'.pull-gut-right-6x-2up,'+
'.pull-gut-right-6x-gut-1o2x-2up,'+
'.pull-gut-right-6x-gut-1x-2up,'+
'.pull-gut-right-7x-2up,'+
'.pull-gut-right-7x-gut-1o2x-2up,'+
'.pull-gut-right-7x-gut-1x-2up,'+
'.pull-gut-right-8x-2up,'+
'.pull-gut-right-8x-gut-1o2x-2up,'+
'.pull-gut-right-8x-gut-1x-2up,'+
'.pull-gut-right-9x-2up,'+
'.pull-gut-right-9x-gut-1o2x-2up,'+
'.pull-gut-right-9x-gut-1x-2up,'+
'.pull-gut-right-10x-2up,'+
'.pull-gut-right-10x-gut-1o2x-2up,'+
'.pull-gut-right-10x-gut-1x-2up,'+
'.pull-gut-right-11x-2up,'+
'.pull-gut-right-11x-gut-1o2x-2up,'+
'.pull-gut-right-11x-gut-1x-2up,'+
'.pull-gut-right-12x-2up,'+
'.pull-gut-right-12x-gut-1o2x-2up,'+
'.pull-gut-right-12x-gut-1x-2up,'+
'.pull-gut-right-small-2up,'+
'.pull-gut-right-small-gut-1o2x-2up,'+
'.pull-gut-right-small-gut-1x-2up,'+
'.pull-gut-right-medium-2up,'+
'.pull-gut-right-medium-gut-1o2x-2up,'+
'.pull-gut-right-medium-gut-1x-2up,'+
'.pull-gut-right-large-2up,'+
'.pull-gut-right-large-gut-1o2x-2up,'+
'.pull-gut-right-large-gut-1x-2up'+
'{float:right;display:inline;clear:both;position:relative;}'+
'            '+
'.pull-gut-right-2up {margin-right:-100px;width:80px;}'+
''+
'.pull-gut-right-1x-2up {margin-right:-20px;width:20px;right:-0px;}'+
''+
'.pull-gut-right-1x-gut-1o2x-2up {margin-right:-10px;width:10px;right:-10px;}'+
''+
'.pull-gut-right-1x-gut-1x-2up {margin-right:-0px;width:0px;right:-20px;}'+
''+
'.pull-gut-right-2x-2up {margin-right:-40px;width:40px;right:-0px;}'+
''+
'.pull-gut-right-2x-gut-1o2x-2up {margin-right:-30px;width:30px;right:-10px;}'+
''+
'.pull-gut-right-2x-gut-1x-2up {margin-right:-20px;width:20px;right:-20px;}'+
''+
'.pull-gut-right-3x-2up {margin-right:-60px;width:60px;right:-0px;}'+
''+
'.pull-gut-right-3x-gut-1o2x-2up {margin-right:-50px;width:50px;right:-10px;}'+
''+
'.pull-gut-right-3x-gut-1x-2up {margin-right:-40px;width:40px;right:-20px;}'+
''+
'.pull-gut-right-4x-2up {margin-right:-80px;width:80px;right:-0px;}'+
''+
'.pull-gut-right-4x-gut-1o2x-2up {margin-right:-70px;width:70px;right:-10px;}'+
''+
'.pull-gut-right-4x-gut-1x-2up {margin-right:-60px;width:60px;right:-20px;}'+
''+
'.pull-gut-right-5x-2up {margin-right:-100px;width:100px;right:-0px;}'+
''+
'.pull-gut-right-5x-gut-1o2x-2up {margin-right:-90px;width:90px;right:-10px;}'+
''+
'.pull-gut-right-5x-gut-1x-2up {margin-right:-80px;width:80px;right:-20px;}'+
''+
'.pull-gut-right-6x-2up {margin-right:-120px;width:120px;right:-0px;}'+
''+
'.pull-gut-right-6x-gut-1o2x-2up {margin-right:-110px;width:110px;right:-10px;}'+
''+
'.pull-gut-right-6x-gut-1x-2up {margin-right:-100px;width:100px;right:-20px;}'+
''+
'.pull-gut-right-7x-2up {margin-right:-140px;width:140px;right:-0px;}'+
''+
'.pull-gut-right-7x-gut-1o2x-2up {margin-right:-130px;width:130px;right:-10px;}'+
''+
'.pull-gut-right-7x-gut-1x-2up {margin-right:-120px;width:120px;right:-20px;}'+
''+
'.pull-gut-right-8x-2up {margin-right:-160px;width:160px;right:-0px;}'+
''+
'.pull-gut-right-8x-gut-1o2x-2up {margin-right:-150px;width:150px;right:-10px;}'+
''+
'.pull-gut-right-8x-gut-1x-2up {margin-right:-140px;width:140px;right:-20px;}'+
''+
'.pull-gut-right-9x-2up {margin-right:-180px;width:180px;right:-0px;}'+
''+
'.pull-gut-right-9x-gut-1o2x-2up {margin-right:-170px;width:170px;right:-10px;}'+
''+
'.pull-gut-right-9x-gut-1x-2up {margin-right:-160px;width:160px;right:-20px;}'+
''+
'.pull-gut-right-10x-2up {margin-right:-200px;width:200px;right:-0px;}'+
''+
'.pull-gut-right-10x-gut-1o2x-2up {margin-right:-190px;width:190px;right:-10px;}'+
''+
'.pull-gut-right-10x-gut-1x-2up {margin-right:-180px;width:180px;right:-20px;}'+
''+
'.pull-gut-right-11x-2up {margin-right:-220px;width:220px;right:-0px;}'+
''+
'.pull-gut-right-11x-gut-1o2x-2up {margin-right:-210px;width:210px;right:-10px;}'+
''+
'.pull-gut-right-11x-gut-1x-2up {margin-right:-200px;width:200px;right:-20px;}'+
''+
'.pull-gut-right-12x-2up {margin-right:-240px;width:240px;right:-0px;}'+
''+
'.pull-gut-right-12x-gut-1o2x-2up {margin-right:-230px;width:230px;right:-10px;}'+
''+
'.pull-gut-right-12x-gut-1x-2up {margin-right:-220px;width:220px;right:-20px;}'+
''+
'.pull-gut-right-small-2up {margin-right:-80px;width:80px;right:-0px;}'+
''+
'.pull-gut-right-small-gut-1o2x-2up {margin-right:-70px;width:70px;right:-10px;}'+
''+
'.pull-gut-right-small-gut-1x-2up {margin-right:-60px;width:60px;right:-20px;}'+
''+
'.pull-gut-right-medium-2up {margin-right:-180px;width:180px;right:-0px;}'+
''+
'.pull-gut-right-medium-gut-1o2x-2up {margin-right:-170px;width:170px;right:-10px;}'+
''+
'.pull-gut-right-medium-gut-1x-2up {margin-right:-160px;width:160px;right:-20px;}'+
''+
'.pull-gut-right-large-2up {margin-right:-280px;width:280px;right:-0px;}'+
''+
'.pull-gut-right-large-gut-1o2x-2up {margin-right:-270px;width:270px;right:-10px;}'+
''+
'.pull-gut-right-large-gut-1x-2up {margin-right:-260px;width:260px;right:-20px;}'+
''+
''+
'.pull-gut-right-none-2up {margin-right:0;width:auto;float:none;position:static;}'+
''+
''+
''+
'/* Max Width */'+
''+
'.width-max-1dx-2up {max-width:220px;}'+
''+
'.width-max-2dx-2up {max-width:460px;}'+
''+
'.width-max-3dx-2up {max-width:700px;}'+
''+
'.width-max-4dx-2up {max-width:940px;}'+
''+
'.width-max-5dx-2up {max-width:1180px;}'+
''+
'.width-max-6dx-2up {max-width:1420px;}'+
''+
'.width-max-7dx-2up {max-width:1660px;}'+
''+
''+
''+
''+
'/* Widths */'+
'.widths-auto-2up > * {width:auto;}'+
''+
'.widths-1o5-2up .col-cols,'+
'.widths-1o5-2up > * {width:20%;}'+
''+
'.widths-1o4-2up .col-cols,'+
'.widths-1o4-2up > *,'+
'.widths-2o8-2up .col-cols,'+
'.widths-2o8-2up > * {width:25%;}'+
''+
'.widths-2o5-2up .col-cols,'+
'.widths-2o5-2up > * {width:40%;}'+
''+
'.widths-1o2-2up .col-cols,'+
'.widths-1o2-2up > *,'+
'.widths-2o4-2up .col-cols,'+
'.widths-2o4-2up > *,'+
'.widths-3o6-2up .col-cols,'+
'.widths-3o6-2up > *,'+
'.widths-4o8-2up .col-cols,'+
'.widths-4o8-2up > * {width:50%;}'+
''+
'.widths-3o5-2up .col-cols,'+
'.widths-3o5-2up > * {width:60%;}'+
''+
'.widths-3o4-2up .col-cols,'+
'.widths-3o4-2up > *,'+
'.widths-6o8-2up .col-cols,'+
'.widths-6o8-2up > * {width:75%;}'+
''+
'.widths-4o5-2up .col-cols,'+
'.widths-4o5-2up > * {width:80%;}'+
''+
'.widths-1o1-2up .col-cols,'+
'.widths-1o1-2up > *,'+
'.widths-2o2-2up .col-cols,'+
'.widths-2o2-2up > *,'+
'.widths-3o3-2up .col-cols,'+
'.widths-3o3-2up > *,'+
'.widths-4o4-2up .col-cols,'+
'.widths-4o4-2up > *,'+
'.widths-5o5-2up .col-cols,'+
'.widths-5o5-2up > *,'+
'.widths-6o6-2up .col-cols,'+
'.widths-6o6-2up > *,'+
'.widths-7o7-2up .col-cols,'+
'.widths-7o7-2up > *,'+
'.widths-8o8-2up .col-cols,'+
'.widths-8o8-2up > * {width:100%;}'+
''+
'.widths-1o3-2up .col-cols,'+
'.widths-1o3-2up > *,'+
'.widths-2o6-2up .col-cols,'+
'.widths-2o6-2up > * {width:33.3333%;}'+
''+
'.widths-1o6-2up .col-cols,'+
'.widths-1o6-2up > * {width:16.6666%;}'+
''+
'.widths-1o7-2up .col-cols,'+
'.widths-1o7-2up > * {width:14.2857%;}'+
''+
'.widths-1o8-2up .col-cols,'+
'.widths-1o8-2up > * {width:12.5%;}'+
''+
'.widths-2o3-2up .col-cols,'+
'.widths-2o3-2up > *,'+
'.widths-4o6-2up .col-cols,'+
'.widths-4o6-2up > * {width:66.6666%;}'+
''+
'.widths-2o7-2up .col-cols,'+
'.widths-2o7-2up > * {width:28.5714%;}'+
''+
'.widths-3o7-2up .col-cols,'+
'.widths-3o7-2up > * {width:42.8571%;}'+
''+
'.widths-3o8-2up .col-cols,'+
'.widths-3o8-2up > * {width:37.5%;}'+
''+
'.widths-4o7-2up .col-cols,'+
'.widths-4o7-2up > * {width:57.1428%;}'+
''+
'.widths-5o6-2up .col-cols,'+
'.widths-5o6-2up > * {width:83.3333%;}'+
''+
'.widths-5o7-2up .col-cols,'+
'.widths-5o7-2up > * {width:71.4285%;}'+
''+
'.widths-5o8-2up .col-cols,'+
'.widths-5o8-2up > * {width:62.5%;}'+
''+
'.widths-6o7-2up .col-cols,'+
'.widths-6o7-2up > * {width:85.7142%;}'+
''+
'.widths-7o8-2up .col-cols,'+
'.widths-7o8-2up > * {width:87.5%;}'+
''+
''+
''+
''+
'/* Width */'+
'.width-auto-2up {width:auto;}'+
''+
'.width-1o5-2up {width:20%;}'+
''+
'.width-1o4-2up,'+
'.width-2o8-2up {width:25%;}'+
''+
'.width-2o5-2up {width:40%;}'+
''+
'.width-1o2-2up,'+
'.width-2o4-2up,'+
'.width-3o6-2up,'+
'.width-4o8-2up {width:50%;}'+
''+
'.width-3o5-2up {width:60%;}'+
''+
'.width-3o4-2up,'+
'.width-6o8-2up {width:75%;}'+
''+
'.width-4o5-2up {width:80%;}'+
''+
'.width-1o1-2up,'+
'.width-2o2-2up,'+
'.width-3o3-2up,'+
'.width-4o4-2up,'+
'.width-5o5-2up,'+
'.width-6o6-2up,'+
'.width-7o7-2up,'+
'.width-8o8-2up {width:100%;}'+
''+
'.width-1o3-2up,'+
'.width-2o6-2up {width:33.3333%;}'+
''+
'.width-1o6-2up {width:16.6666%;}'+
''+
'.width-1o7-2up {width:14.2857%;}'+
''+
'.width-1o8-2up {width:12.5%;}'+
''+
'.width-2o3-2up,'+
'.width-4o6-2up {width:66.6666%;}'+
''+
'.width-2o7-2up {width:28.5714%;}'+
''+
'.width-3o7-2up {width:42.8571%;}'+
''+
'.width-3o8-2up {width:37.5%;}'+
''+
'.width-4o7-2up {width:57.1428%;}'+
''+
'.width-5o6-2up {width:83.3333%;}'+
''+
'.width-5o7-2up {width:71.4285%;}'+
''+
'.width-5o8-2up {width:62.5%;}'+
''+
'.width-6o7-2up {width:85.7142%;}'+
''+
'.width-7o8-2up {width:87.5%;}'+
''+
''+
''+
'/* Cols */'+
''+
'.cols-1-2up > *,'+
'.cols-1-col-2up .col {float:left;width:100%;}'+
''+
'.cols-2-2up > *,'+
'.cols-2-col-2up .col {float:left;width:50%;}'+
''+
'.cols-3-2up > *,'+
'.cols-3-col-2up .col {float:left;width:33.3333%;}'+
''+
'.cols-4-2up > *,'+
'.cols-4-col-2up .col {float:left;width:25%;}'+
''+
'.cols-5-2up > *,'+
'.cols-5-col-2up .col {float:left;width:20%;}'+
''+
'.cols-6-2up > *,'+
'.cols-6-col-2up .col {float:left;width:16.6666%;}'+
''+
'.cols-7-2up > *,'+
'.cols-7-col-2up .col {float:left;width:14.2857%;}'+
''+
'.cols-8-2up > *,'+
'.cols-8-col-2up .col {float:left;width:12.5%;}'+
''+
''+
''+
'/* Guts */'+
'.guts-2up > *,'+
'.guts-1x-2up > *,'+
'.guts-2x-2up > *,'+
'.guts-1o2x-2up > * {-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;}'+
''+
'.guts-1o2x-2up {margin-left:-5px;margin-right:-5px;}'+
'.guts-1o2x-2up > * {padding-left:5px;padding-right:5px;margin-bottom:10px;}'+
'.guts-2up {margin-left:-10px;margin-right:-10px;}'+
'.guts-2up > * {padding-left:10px;padding-right:10px;margin-bottom:20px;}'+
'.guts-1x-2up {margin-left:-10px;margin-right:-10px;}'+
'.guts-1x-2up > * {padding-left:10px;padding-right:10px;margin-bottom:20px;}'+
'.guts-2x-2up {margin-left:-20px;margin-right:-20px;}'+
'.guts-2x-2up > * {padding-left:20px;padding-right:20px;margin-bottom:40px;}'+
''+
''+
'/* Guts Full-Width class a */'+
'.guts-fw-1o2x-2up {margin-left:-10px;}'+
'.guts-fw-1o2x-2up > * > * {margin-left:10px;margin-bottom:10px;}'+
'.guts-fw-2up {margin-left:-20px;}'+
'.guts-fw-2up > * > * {margin-left:20px;margin-bottom:20px;}'+
'.guts-fw-1x-2up {margin-left:-20px;}'+
'.guts-fw-1x-2up > * > * {margin-left:20px;margin-bottom:20px;}'+
'.guts-fw-2x-2up {margin-left:-40px;}'+
'.guts-fw-2x-2up > * > * {margin-left:40px;margin-bottom:40px;}'+
''+
''+
''+
'/* Pos */'+
''+
'.pos-1o1-2up,'+
'.pos-1o2-2up,'+
'.pos-1o3-2up,'+
'.pos-1o4-2up,'+
'.pos-1o5-2up,'+
'.pos-1o6-2up,'+
'.pos-1o7-2up,'+
'.pos-1o8-2up {margin-left:0%;}'+
''+
'.pos-2o5-2up {margin-left:20%;}'+
''+
'.pos-2o4-2up,'+
'.pos-3o8-2up {margin-left:25%;}'+
''+
'.pos-3o5-2up {margin-left:40%;}'+
''+
'.pos-2o2-2up,'+
'.pos-3o4-2up,'+
'.pos-4o6-2up,'+
'.pos-5o8-2up {margin-left:50%;}'+
''+
'.pos-4o5-2up {margin-left:60%;}'+
''+
'.pos-4o4-2up,'+
'.pos-7o8-2up {margin-left:75%;}'+
''+
'.pos-5o5-2up {margin-left:80%;}'+
''+
'.pos-2o3-2up,'+
'.pos-3o6-2up {margin-left:33.3333%;}'+
''+
'.pos-2o6-2up {margin-left:16.6666%;}'+
''+
'.pos-2o7-2up {margin-left:14.2857%;}'+
''+
'.pos-2o8-2up {margin-left:12.5%;}'+
''+
'.pos-3o3-2up,'+
'.pos-5o6-2up {margin-left:66.6666%;}'+
''+
'.pos-3o7-2up {margin-left:28.5714%;}'+
''+
'.pos-4o7-2up {margin-left:42.8571%;}'+
''+
'.pos-4o8-2up {margin-left:37.5%;}'+
''+
'.pos-5o7-2up {margin-left:57.1428%;}'+
''+
'.pos-6o6-2up {margin-left:83.3333%;}'+
''+
'.pos-6o7-2up {margin-left:71.4285%;}'+
''+
'.pos-6o8-2up {margin-left:62.5%;}'+
''+
'.pos-7o7-2up {margin-left:85.7142%;}'+
''+
'.pos-8o8-2up {margin-left:87.5%;}'+
''+
''+
'.pos-1o1-2up,'+
'.pos-1o2-2up,'+
'.pos-1o3-2up,'+
'.pos-1o4-2up,'+
'.pos-1o5-2up,'+
'.pos-1o6-2up,'+
'.pos-1o7-2up,'+
'.pos-1o8-2up,'+
'.pos-2o5-2up,'+
'.pos-2o4-2up,'+
'.pos-3o8-2up,'+
'.pos-3o5-2up,'+
'.pos-2o2-2up,'+
'.pos-3o4-2up,'+
'.pos-4o6-2up,'+
'.pos-5o8-2up,'+
'.pos-4o5-2up,'+
'.pos-4o4-2up,'+
'.pos-7o8-2up,'+
'.pos-5o5-2up,'+
'.pos-2o3-2up,'+
'.pos-3o6-2up,'+
'.pos-2o6-2up,'+
'.pos-2o7-2up,'+
'.pos-2o8-2up,'+
'.pos-3o3-2up,'+
'.pos-5o6-2up,'+
'.pos-3o7-2up,'+
'.pos-4o7-2up,'+
'.pos-4o8-2up,'+
'.pos-5o7-2up,'+
'.pos-6o6-2up,'+
'.pos-6o7-2up,'+
'.pos-6o8-2up,'+
'.pos-7o7-2up,'+
'.pos-8o8-2up {margin-right:-100%;}'+
''+
''+
''+
'}'+
''+
'',
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