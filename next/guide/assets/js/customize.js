(function(context){
    
        
    // Config
    var getInput 
        ,els = {
            input:{}
            ,output:{}
        }
        ,input = {}
        ,db = {}
    ;
    
    
    db = {
        sel: {
            input: {
                decimalPlaces: '#input-decimalplaces'
                ,positionClasses: '#input-positionclasses'
                ,heightClasses: '#input-heightclasses'
                ,heightClassesNum: '#input-heightclassesnum'
                ,columns: '.input-columns'
                ,at: '.input-at'
                ,gutter: '.input-gutter'
                ,gutterBasex: '.input-gutter-basex'
                ,maxWidths: '.input-maxwidths'
                ,maxWidthsBP: '.input-maxwidths-bp'
                ,baseBasedBPs: '.input-base-based-bps'
                ,classNamespace: '#input-classnamespace'
                ,breakpointadd: '.input-breakpoint-add'
                ,base: '#input-base'
                ,legacysupport: '.input-legacysupport'
                
                ,gutmultipliersmall: '#input-gutmultipliersmall'
                ,gutmultipliermedium: '#input-gutmultipliermedium'
                ,gutmultiplierlarge: '#input-gutmultiplierlarge'
                
                ,formbreakpoint: '.form-breakpoint'
                ,formbreakpointremove: '.form-breakpoint-remove'
                
                ,scrollbardepthadjust: '#input-scrollbardepthadjust'
                
            }
            ,output: {
                css: '.output-css'
                ,js: '.output-js'
                ,headcss: '.output-headcss'
                ,headjs: '.output-headjs'
                ,demo: '.output-demo'
                
            }
            ,layoutoptions: '.layoutoptions'
            ,generaloptions: '.generaloptions'
            ,css: '.css'
        }
        ,outputToggles: [
            {title: 'Position Classes', name: 'input-positionclasses'}
            ,{title: 'Height Classes', name: 'input-heightclasses'}
            ,{title: 'Width Classes', name: 'input-widthclasses'}
            ,{title: 'Gutter Classes', name: 'input-gutterclasses'}
            ,{title: 'Pull Gut Classes', name: 'input-pullgutclasses'}
        ]
        ,templates: {
            css: {
                source: ''
                ,output: ''
            }
            ,js: {
                source: ''
                ,output: ''
            }
            ,input: {
                ns: ''
                
                ,isiecss: false
                ,isiejs: false
                ,legacysupport: true
                
                ,lay: 'lay'
                ,laycentered: 'lay-centered'
                ,layleft: 'lay-left'
                ,layright: 'lay-right'
                
                ,col: 'col'
                ,colgut: 'col-gut'
                ,colguthide: 'hide-col-gut'
                ,colnone: 'col-none'
                
                ,gutsfw: 'guts-fw'
                
                ,inngut: 'gut'
                ,innguthide: 'hide-gut-left'
                ,innnone: 'gut-none'
                
                ,gutsmallmultiplier: 4
                ,gutmediummultiplier: 9
                ,gutlargemultiplier: 14
                
                ,gut: 'gut'
                ,gutleft: 'gut-left'
                ,gutsmall: 'gut-left-small'
                ,gutmedium: 'gut-left-medium'
                ,gutlarge: 'gut-left-large'
                
                ,gutright: 'gut-right'
                ,gutrightsmall: 'gut-right-small'
                ,gutrightmedium: 'gut-right-medium'
                ,gutrightlarge: 'gut-right-large'
                
                ,gutbot: 'gut-bottom'
                
                ,pullleft: 'pull-left'
                ,pullright: 'pull-right'
                
                ,pullgut: 'pull-gut-left'
                ,pullgutsmall: 'pull-gut-left-small'
                ,pullgutmedium: 'pull-gut-left-medium'
                ,pullgutlarge: 'pull-gut-left-large'
                
                ,pullgutright: 'pull-gut-right'
                ,pullgutrightsmall: 'pull-gut-right-small'
                ,pullgutrightmedium: 'pull-gut-right-medium'
                ,pullgutrightlarge: 'pull-gut-right-large'
                
                ,clear: 'clear'
                ,clearnone: 'clear-none'
                ,width: 'width'
                ,height: 'height'
                ,widthmax: 'width-max'
                ,pos: 'pos'
                ,clearie6and7fixp1: 'clear-ie6and7fixp1'
                ,clearie6and7fixp2: 'clear-ie6and7fixp2'
                ,layie6fix: 'lay-ie6fix'
                ,layoutgutter: 'layout-gutter'
                ,rizzlecssproperty: 'rizzlecssproperty'
                
                
            }
        }
        ,output: {}
        ,tid: {}
    };
    
    // Actions
    elements = function() {
    
        
        
    };
    
    
    
    input = function(o) {
    
        var callback = o.callback;
        
        db.inputAjaxCalls = {callback: callback, expected: 2, count: 0};
        
        input.breakpoints = [];
        $(db.sel.input.formbreakpoint).each(function(i) {
            input.breakpoints[i] = {
                at: $(this).find('.input-at').val(),
                gutter: $(this).find('.input-gutter').val(),
                gutterBasex: $(this).find('.input-gutter-basex').val()
            }
        });
        input.columns = $(db.sel.input.columns).val();
        input.breakpointsLength = input.breakpoints.length;
        input.decimalPlaces = $(db.sel.input.decimalPlaces).val();
        input.positionClasses = $(db.sel.input.positionClasses)[0].checked;
        input.heightClasses = $(db.sel.input.heightClasses)[0].checked;
        input.heightClassesNum = $(db.sel.input.heightClassesNum).val() * 1;
        input.classNamespace = $(db.sel.input.classNamespace).val().replace(/\s+/g, '');
        input.maxWidths = $(db.sel.input.maxWidths).val().replace(/\s+/g, '').split(',');
        input.maxWidthsLength = input.maxWidths.length;
        input.maxWidthsBP = $(db.sel.input.maxWidthsBP).val().replace(/\s+/g, '').split(',');
        input.maxWidthsBPLength = input.maxWidthsBP.length;
        input.base = $(db.sel.input.base).val();
        input.legacysupport = $(db.sel.input.legacysupport)[0].checked;
        
        input.scrollbardepthadjust = $(db.sel.input.scrollbardepthadjust).val() * 1;
        
        input.gutmultipliersmall = $(db.sel.input.gutmultipliersmall).val();
        input.gutmultipliermedium = $(db.sel.input.gutmultipliermedium).val();
        input.gutmultiplierlarge = $(db.sel.input.gutmultiplierlarge).val();
        
        
        $.ajax('./../assets/templates/baseup-tpl.css',{dataType:'text',async:false}).done(function(text) {
            db.templates.css.template = text;
            inputDone();
        });
        
        $.ajax('./../assets/templates/baseup-tpl.js',{dataType:'text',async:false}).done(function(text) {
            db.templates.js.template = text;
            inputDone();
        });
        
    };
    inputDone = function() {
        
        db.inputAjaxCalls.count++;
        
        if (db.inputAjaxCalls.count == db.inputAjaxCalls.expected) {
            db.inputAjaxCalls.callback();
        }
        
    };
    

    make = function(o) {
    
        var ti = db.templates.input
            ,callback = o.callback
        ;
        

        db.ns = input.classNamespace;
        db.columns = input.columns;
        db.decimalPlaces = input.decimalPlaces;
        db.minify = input.minify;
        db.positionClasses = input.positionClasses;
        db.heightClasses = input.heightClasses;
        db.classNamespace = input.classNamespace;
        
        db.gutmultipliersmall = input.gutmultipliersmall;
        db.gutmultipliermedium = input.gutmultipliermedium;
        db.gutmultiplierlarge = input.gutmultiplierlarge;
        
        
        
        // Alternative breakpoints based on base
        var i
        ,   baseBasedBPs = []
        ;
        for (i = 1; i < 8; i++) {
            baseBasedBPs.push((input.base * ((i * 12) - 1)) + input.scrollbardepthadjust);
        }
        db.baseBasedBPs = baseBasedBPs;
        
        // Update MaxWidths
        var i
        ,   maxWidths = []
        ;
        for (i = 1; i < 8; i++) {
            maxWidths.push((input.base * ((i * 12) - 1)));
        }
        db.maxWidths = maxWidths;        
        db.maxWidthsLength = input.maxWidthsLength;
        
        // UpdateMaxWidthsBP
        var i
        ,   maxWidths = []
        ;
        for (i = 1; i < input.breakpointsLength; i++) {
            maxWidths.push(input.breakpoints[i].at * 1);
        }
        db.maxWidthsBP = maxWidths;
        db.maxWidthsBP.unshift(db.maxWidthsBP[0]);
        db.maxWidthsBPLength = input.maxWidthsBPLength;
        
        db.base = input.base;
        db.breakpointsLength = input.breakpointsLength;
        db.ajaxCall = {};
        
        db.breakpoints = [];
        for (i = 0; i < db.breakpointsLength; i++) {
            db.breakpoints[i] = {
                isGT0: (i > 0) ? true : false,
                isFirst: (i === 0) ? true : false,
                isSecond: (i === 1) ? true : false,
                at: input.breakpoints[i].at,
                gutter: input.breakpoints[i].gutter,
                gutterBasex: input.breakpoints[i].gutterBasex
            }
        }
        
        // Template Input
        ti.ns = db.ns;
        ti.breakpoints = [];
        
        // widths
        ti.widthclasses = makeWidthClasses({columns: db.columns}); // returns {widths:, widthsall:}
        
        for (i = 0; i < db.breakpointsLength; i++) {
        
            var i0 = (i === 0) ? true : false
                ,tibi = ti.breakpoints[i] = {}
            ;
            
            // bp
            if (i0) {
                tibi.bp = '';
            }
            else {
                tibi.bp = '-' + i + 'up';
            }
            
            // at
            tibi.at = db.breakpoints[i].at;
            
            // isFirst
            tibi.isfirst = db.breakpoints[i].isFirst;
            tibi.issecond = db.breakpoints[i].isSecond;
            tibi.isgt0 = db.breakpoints[i].isGT0;
            
            // maxwidth based on breakpoints
            tibi.maxwidthbp = db.maxWidthsBP[i];
            
            // maxwidths based on base
            tibi.maxwidths = [];
            for (j = 0; j < db.maxWidthsLength; j++) {
                tibi.maxwidths.push({maxwidth: db.maxWidths[j], dx:j+1});
            }
            
            // widths
            tibi.widthclasses = makeWidthClasses({columns: db.columns});
            
            // cols
            tibi.cols = [];
            for (j = 0; j < db.columns; j++) {
                tibi.cols.push({
                    num:j+1
                    ,width:round(100/(j+1), db.decimalPlaces)
                });
            } 
            
            // poss
            tibi.poss = makePositionClasses({columns: db.columns});
            
            // Height
            if (db.heightClasses) {                
                tibi.heights = [];
                tibi.heights.push({
                    height:db.breakpoints[i].gutter / 2 + 'px'
                    ,i: '1o2'
                });
                for (j = 0; j < 21; j++) {
                    tibi.heights.push({
                        height:db.breakpoints[i].gutter * j + 'px'
                        ,i: j
                    });
                }
            }
            
            // gutter
            tibi.gutter = db.breakpoints[i].gutter;
            tibi.gutter2x = db.breakpoints[i].gutter * 2;
            tibi.gutter1o2 = round(db.breakpoints[i].gutter/2, db.decimalPlaces);
            tibi.gutters = [];
            for (j = 1; j < 13; j++) {
                isnotfirst = (j > 1) ? 1 : 0;
                isforlay = (j < 7) ? 1 : 0;
                tibi.gutters.push({
                    gutter: db.breakpoints[i].gutter * j
                    ,halfgutter: round(db.breakpoints[i].gutter * j / 2, db.decimalPlaces)
                    ,i: j
                    ,isnotfirst: isnotfirst
                    ,isforlay: isforlay
                });
            }
            
            tibi.gutsmallmargin = db.breakpoints[i].gutter * db.gutmultipliersmall;
            tibi.gutmediummargin = db.breakpoints[i].gutter * db.gutmultipliermedium;
            tibi.gutlargemargin = db.breakpoints[i].gutter * db.gutmultiplierlarge;
            
            tibi.gutrightsmallmargin = db.breakpoints[i].gutter * db.gutmultipliersmall;
            tibi.gutrightmediummargin = db.breakpoints[i].gutter * db.gutmultipliermedium;
            tibi.gutrightlargemargin = db.breakpoints[i].gutter * db.gutmultiplierlarge;

            
            // half gutters
            tibi.halfgutter = round(db.breakpoints[i].gutter/2, db.decimalPlaces);
            tibi.halfgutter2x = round(db.breakpoints[i].gutter * 2 / 2, db.decimalPlaces);
            tibi.halfgutter1o2 = round(db.breakpoints[i].gutter/4, db.decimalPlaces);
            
            // Pullguts gutters
            pullgutGutters = [
                {
                    'name': ''
                    ,'multiplier': 0
                }
                ,{
                    'name': '-gut-1o2x'
                    ,'multiplier': 1/2
                }
                ,{
                    'name': '-gut-1x'
                    ,'multiplier': 1
                }
            ];
            pullgutGuttersLength = pullgutGutters.length;
            
            pullgutNames = [
                {
                    name: ''
                    ,multiplier: 3
                }
                ,{
                    name: '-small'
                    ,multiplier: db.gutmultipliersmall
                }
                ,{
                    name: '-medium'
                    ,multiplier: db.gutmultipliermedium
                }
                ,{
                    name: '-large'
                    ,multiplier: db.gutmultiplierlarge
                }
            ];
            pullgutNamesLength = pullgutNames.length;
            
            // pullguts
            tibi.pullguts = [];
            isnotfirst = 0;
            for (j = 1; j < 13; j++) {
                for (m = 0; m < pullgutGuttersLength; m++) {
                    tibi.pullguts.push({
                        marginleft: db.breakpoints[i].gutter * j
                        ,width: db.breakpoints[i].gutter * j - (pullgutGutters[m].multiplier * db.breakpoints[i].gutter)
                        ,name: db.templates.input.pullgut + '-' + j + 'x' + pullgutGutters[m].name
                        ,isnotfirst: isnotfirst
                    });
                    isnotfirst = 1;
                }
            }
            // Small medium large
            for (j = 1; j < pullgutNamesLength; j++) {
                for (m = 0; m < pullgutGuttersLength; m++) {
                    tibi.pullguts.push({
                        marginleft: db.breakpoints[i].gutter * pullgutNames[j].multiplier
                        ,width: db.breakpoints[i].gutter * pullgutNames[j].multiplier - (pullgutGutters[m].multiplier * db.breakpoints[i].gutter)
                        ,name: db.templates.input.pullgut + pullgutNames[j].name + pullgutGutters[m].name
                        ,isnotfirst: isnotfirst
                    });
                    isnotfirst = 1;
                }
            }
            
            
            // pullgutrights
            tibi.pullgutrights = [];
            isnotfirst = 0;
            for (j = 1; j < 13; j++) {
                for (m = 0; m < pullgutGuttersLength; m++) {
                    tibi.pullgutrights.push({
                        marginright: db.breakpoints[i].gutter * j - (pullgutGutters[m].multiplier * db.breakpoints[i].gutter)
                        ,width: db.breakpoints[i].gutter * j - (pullgutGutters[m].multiplier * db.breakpoints[i].gutter)
                        ,right: db.breakpoints[i].gutter * pullgutGutters[m].multiplier
                        ,name: db.templates.input.pullgutright + '-' + j + 'x' + pullgutGutters[m].name
                        ,isnotfirst: isnotfirst
                    });
                    isnotfirst = 1;
                }
            }
            // Small medium large
            for (j = 1; j < pullgutNamesLength; j++) {
                for (m = 0; m < pullgutGuttersLength; m++) {
                    tibi.pullgutrights.push({
                        marginright: db.breakpoints[i].gutter * pullgutNames[j].multiplier - (pullgutGutters[m].multiplier * db.breakpoints[i].gutter)
                        ,width: db.breakpoints[i].gutter * pullgutNames[j].multiplier - (pullgutGutters[m].multiplier * db.breakpoints[i].gutter)
                        ,right: db.breakpoints[i].gutter * pullgutGutters[m].multiplier
                        ,name: db.templates.input.pullgutright + pullgutNames[j].name + pullgutGutters[m].name
                        ,isnotfirst: isnotfirst
                    });
                    isnotfirst = 1;
                }
            }
            
            tibi.pullgutrightsmallmargin = db.breakpoints[i].gutter * (db.gutmultipliersmall - 1);
            tibi.pullgutrightsmallwidth = db.breakpoints[i].gutter * (db.gutmultipliersmall - 1);
            tibi.pullgutrightsmallright = db.breakpoints[i].gutter;
            tibi.pullgutrightmediummargin = db.breakpoints[i].gutter * (db.gutmultipliermedium - 1);
            tibi.pullgutrightmediumwidth = db.breakpoints[i].gutter * (db.gutmultipliermedium - 1);
            tibi.pullgutrightmediumright = db.breakpoints[i].gutter;
            tibi.pullgutrightlargemargin = db.breakpoints[i].gutter * (db.gutmultiplierlarge - 1);
            tibi.pullgutrightlargewidth = db.breakpoints[i].gutter * (db.gutmultiplierlarge - 1);
            tibi.pullgutrightlargeright = db.breakpoints[i].gutter;
            
            // basex
            for (j = 1; j < 13; j++) {
                tibi['base'+j] = db.breakpoints[i].gutter * j;
            }
            
            
        }
        
        db.templates.input.legacysupport = input.legacysupport;
        
        db.templates.css.output = Mustache.render(db.templates.css.template, db.templates.input);
        
        db.templates.js.output = Mustache.render(db.templates.js.template, db.templates.input);

        
        // Demo
        db.output.demo = '';
        for (j = 1; j <= db.columns; j++) {
        var isPrime = '';
                if (j === 2
                    || j === 3
                    || j === 5
                    || j === 7
                    || j === 11
                    || j === 13
                    || j === 17
                    || j === 19
                    || j === 23
                    || j === 29
                    || j === 31
                    || j === 37
                    || j === 41
                    || j === 43
                    || j === 47
                ) {
                    isPrime = ' prime'
                }
            db.output.demo += '<div class="lay cols widths-1o'+j+' guts-fw-1x'+isPrime+'">';
            for (k = 0; k < j; k++) {
                db.output.demo += '<div><div class="height-1o2x gut-bottom-1o2xs" title="width-1o'+j+'"></div></div>';
            }
            db.output.demo += '</div>';
        }
        
        return callback();
        
    };
    
    output = function() {
            
        // Put CSS
        $(db.sel.output.css).val(trim(db.templates.css.output));
        $(db.sel.output.js).val(trim(db.templates.js.output));
        
        $(db.sel.output.headcss).html(trim(db.templates.css.output));
        $(db.sel.output.headjs).html(trim(db.templates.js.output));
        
        $(db.sel.input.maxWidths).val(db.maxWidths);
        $(db.sel.input.maxWidthsBP).val(db.maxWidthsBP.slice(1));
        
        $(db.sel.input.baseBasedBPs).val(db.baseBasedBPs);
        
        
        resizeOutput($(db.sel.output.css)[0]);
        resizeOutput($(db.sel.output.js)[0]);
        
        
        
        $(db.sel.output.demo).html(db.output.demo);
        
        //$(db.sel.output.labelSpan).html(' '+db.output.css.length);
    };
    
    
    trim = function(str) {
    
        return str.replace(/^\s+/, '').replace(/\s+$/, '');
        
    }
   
    
    makeWidthClasses = function(o) {
    
        var css = ''
            ,i = 1
            ,j
            ,width
            ,widths = {}
            ,widthsAll = []
            ,widthsi
            ,output = {widths:[], widthsall: []}
            ,columns = o.columns
        ;
        
        // Create an object where the properties are widths and the values are an array of objects with numerators and denominators
        for (i; i <= columns; i++) {
            j = 1;
            for (j; j <= columns; j++) {
                width = round(100*i/j, db.decimalPlaces);
                if (width <= 100) {
                    if (!widths[width]) {
                        widths[width] = [];
                    }
                    widths[width].push({
                        numerator:i
                        ,denominator:j
                        ,isnotfirst:true
                    });
                }
                output.widthsall.push({
                    numerator:i
                    ,denominator:j
                    ,isnotfirst:true
                    ,isfirstWidth:false
                });
            }
        }
        
        output.widthsall[0].isnotfirst = false;
        output.widthsall[0].isfirstWidth = true;
        
        for (i in widths) {

            if (widths.hasOwnProperty(i)) {
                
                fractions = widths[i];
                fractions[0].isnotfirst = false;
                output.widths.push({
                    fractions: widths[i]
                    ,value: i
                });
            }
            
        }
        
        return output;
        
    };
    
    makePositionClasses = function(o) {
    
        var i = 1
            ,j
            ,positions = {}
            ,position
            ,output = []
            ,columns = o.columns
            ,isnotveryfirst = false
        ;
        
        // Create an object where the properties are widths and the values are an array of objects with numerators and denominators
        for (i; i <= o.columns; i++) {
            j = 1;
            for (j; j <= columns; j++) {
                position = round(100*(i-1)/j, db.decimalPlaces);
                if (position < 100) {
                    if (!positions[position]) {
                        positions[position] = [];
                    }
                    positions[position].push({
                        numerator:i
                        ,denominator:j
                        ,isnotfirst:true
                        ,isnotveryfirst:isnotveryfirst
                    });
                    isnotveryfirst = true;
                }
            }
        }    
        // Create the position classes
        if (input.positionClasses) {
            for (i in positions) {
                if (positions.hasOwnProperty(i)) {
                    fractions = positions[i];
                    fractions[0].isnotfirst = false;
                    output.push({
                        fractions: positions[i]
                        ,value: i
                    });
                }
            }
        }

        return output;
        
    };
    
    
    resizeOutput = function(el) {
    
        el.style.height = "1px";
        el.style.height = (el.scrollHeight)+"px";
        
    };
    
    round = function(num, decimalPlaces) {
    
        var scaler = Math.pow(10, decimalPlaces);
        return Math.floor(num * scaler)/scaler;
        
    };
    
//    updateGutters = function() {
//        // for each breakpoint, except 0, add the max width and a 
//        // lower and higher value based on the gutter width
//        var i
//        ,   base = ''
//        ,   gutter
//        ,   at
//        ,   breakpoints = $('.form-breakpoint')
//        ;
//        
//        for (i = 0; i < input.breakpointsLength; i++) {
//            gutter = input.breakpoints[i].gutterBasex * input.base;
//            breakpoints.eq(i).find('.input-gutter').val(gutter);
//        }
//    };
    
    
    
    inputChange = function() {
                    
        clearTimeout(db.tid.inputChange);
        db.tid.inputChange = setTimeout(run, 400);
        
    };
    
    inputBaseChange = function() {
        inputGutterBasexChange();
    };
    inputGutterBasexChange = function() {
    
        var multipliers = [];
        
        clearTimeout(db.tid.inputGutterBasexChange);
        
        $(db.sel.input.gutterBasex).each(function() {
            multipliers.push($(this).val());
        });
        $(db.sel.input.gutter).each(function(i) {
            var $this = $(this);
            $this.val(multipliers[i] * $(db.sel.input.base).val());
        });
        
        db.tid.inputGutterBasexChange = setTimeout(run, 400);
        
    };
    inputGutterChange = function() {
    
        var gutters = [];
        
        clearTimeout(db.tid.inputGutterChange);
        
        $(db.sel.input.gutter).each(function() {
            gutters.push($(this).val());
        });
        $(db.sel.input.gutterBasex).each(function(i) {
            var $this = $(this);
            $this.val(gutters[i] / $(db.sel.input.base).val());
        });
        
        db.tid.inputGutterChange = setTimeout(run, 400);
        
    };
    
    breakpointAdd = function() {
        var last = $(db.sel.input.formbreakpoint).last();
        last.after(last.clone());
        last.next().find('td:first').text(input.breakpointsLength);
        run();
        return false;
    };
    
    init = function() {
        
        elements();
        
        (function() {
            var toggleText = ['Layout', 'Close Layout']
                ,toggleTextLength = toggleText.length
                ,togglePointer = (/#layoutoptions/g.exec(window.location.href)) ? 1 : 0
                ,html = '<p><a href="">'+toggleText[togglePointer]+'</a></p>'
            ;
            els.toggleHTML = $(html);
            els.toggleHTML = $(db.sel.layoutoptions).before(els.toggleHTML).addClass((togglePointer ? '' : 'inactive')).prev();
            els.toggleHTML.on('click', 'a', function() {
                var $this = $(this);
                togglePointer = (togglePointer + 1) % toggleTextLength;
                $this.text(toggleText[togglePointer]);
                $(db.sel.layoutoptions).toggleClass('inactive');
                resizeOutput($(db.sel.output.css)[0]);
                resizeOutput($(db.sel.output.js)[0]);
                return false;
            });
        }());
        
        (function() {
            var toggleText = ['General', 'Close General']
                ,toggleTextLength = toggleText.length
                ,togglePointer = (/#generaloptions/g.exec(window.location.href)) ? 1 : 0
                ,html = '<p><a href="">'+toggleText[togglePointer]+'</a></p>'
            ;
            els.toggleHTML = $(html);
            els.toggleHTML = $(db.sel.generaloptions).before(els.toggleHTML).addClass((togglePointer ? '' : 'inactive')).prev();
            els.toggleHTML.on('click', 'a', function() {
                var $this = $(this);
                togglePointer = (togglePointer + 1) % toggleTextLength;
                $this.text(toggleText[togglePointer]);
                $(db.sel.generaloptions).toggleClass('inactive');
                resizeOutput($(db.sel.output.css)[0]);
                resizeOutput($(db.sel.output.js)[0]);
                return false;
            });
        }());
        
        $(db.sel.input.formbreakpoint).slice(1).append('<td class="form-breakpoint-remove"><span tabindex="-1">x</span></td>').parent().find('tr:first').append('<th>Remove</th>');
        
        run();
        
    };
    run = function() {
        
        elements();
        
        input({callback:function() {
            make({callback:function() {
                output();
            }});
        }});
        
    }
    $(document)
        .on('change', function(e) {
            
            var $t = $(e.target)
            ;
            
            // On change of various input
            if (
                $t.is(db.sel.input.decimalPlaces)
                || $t.is(db.sel.input.positionClasses)
                || $t.is(db.sel.input.heightClasses)
                || $t.is(db.sel.input.at)
                || $t.is(db.sel.input.columns)
                || $t.is(db.sel.input.maxWidths)
                || $t.is(db.sel.input.maxWidthsBP)
                || $t.is(db.sel.input.classNamespace)
                || $t.is(db.sel.input.legacysupport)
                || $t.is(db.sel.input.gutmultipliersmall)
                || $t.is(db.sel.input.gutmultipliermedium)
                || $t.is(db.sel.input.gutmultiplierlarge)
                || $t.is(db.sel.input.scrollbardepthadjust)
            ) {
                inputChange();
            }
            
            if ($t.is(db.sel.input.base)) {
                inputBaseChange();
            }
            if ($t.is(db.sel.input.gutterBasex)) {
                inputGutterBasexChange();
            }
            if ($t.is(db.sel.input.gutter)) {
                inputGutterChange();
            }
            
            
            
        })
        .on('click', function(e) {
            var $t = $(e.target)
                ,rtn = true;
            ;
            if ($t.is(db.sel.input.breakpointadd)) {
                breakpointAdd();
                rtn = false;
            }
            else if ($t.closest(db.sel.input.formbreakpointremove).length) {
                $t.closest('tr').remove();
                inputChange();
                rtn = false;
            };

            return rtn;
        })
        .on('submit', function(e) {
            var $t = $(e.target)
                ,rtn = true;
            ;
            if ($t.not('input[type="submit"]')) {
                rtn = false;
            }
            return rtn;
        })
        .ready(init);

    
}(this));





