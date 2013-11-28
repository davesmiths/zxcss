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
        outputToggles: [
            {title: 'Position Classes', name: 'input-positionclasses'}
            ,{title: 'Width Classes', name: 'input-widthclasses'}
            ,{title: 'Gutter Classes', name: 'input-gutterclasses'}
            ,{title: 'Pull Gut Classes', name: 'input-pullgutclasses'}
        ]
        ,templates: {
            css: {
                source: ''
                ,output: ''
            }
            ,cssIElte7: {
                source: ''
                ,output: ''
            }
            ,input: {
                ns: ''
                
                ,lay: 'lay'
                ,laycentered: 'lay-centered'
                ,layleft: 'lay-left'
                ,layright: 'lay-right'
                
                ,col: 'col'
                ,colgut: 'col-gut'
                ,colguthide: 'hide-col-gut'
                ,colnone: 'col-none'
                
                ,inngut: 'gut'
                ,innguthide: 'hide-gut-left'
                ,innnone: 'gut-none'
                
                ,gutsmallmultiplier: 4
                ,gutmediummultiplier: 9
                ,gutlargemultiplier: 14
                
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
        ,tid: {}
    };
    
    // Actions
    elements = function() {
    
        els.input.decimalPlaces = $('#input-decimalplaces');
        els.input.positionClasses = $('#input-positionclasses');
        els.input.columns = $('.input-columns');
        els.input.at = $('.input-at');
        els.input.gutter = $('.input-gutter');
        els.input.gutterBasex = $('.input-gutter-basex');
        els.input.maxWidths = $('.input-maxwidths');
        els.input.maxWidthsBP = $('.input-maxwidths-bp');
        els.input.classNamespace = $('#input-classnamespace');
        els.input.breakpointadd = $('.input-breakpoint-add');
        els.input.breakpointremove = $('.input-breakpoint-remove');
        els.input.base = $('#input-base');
        
        els.input.gutmultipliersmall = $('#input-gutmultipliersmall');
        els.input.gutmultipliermedium = $('#input-gutmultipliermedium');
        els.input.gutmultiplierlarge = $('#input-gutmultiplierlarge');
        
        els.input.formbreakpoint = $('.form-breakpoint');
        
        els.output.css = $('.output-css');
        els.output.cssIElte7 = $('.output-cssielte7');
        
        els.advanced = $('.advanced');
        els.css = $('.css');
        
    };
    
    
    
    input = function(o) {
    
        var callback = o.callback;
        
        db.inputAjaxCalls = {callback: callback, expected: 2, count: 0};
        
        input.breakpoints = [];
        els.input.formbreakpoint.each(function(i) {
            input.breakpoints[i] = {
                at: $(this).find('.input-at').val(),
                gutter: $(this).find('.input-gutter').val(),
                gutterBasex: $(this).find('.input-gutter-basex').val()
            }
        });
        input.columns = els.input.columns.val();
        input.breakpointsLength = input.breakpoints.length;
        input.decimalPlaces = els.input.decimalPlaces.val();
        input.positionClasses = els.input.positionClasses[0].checked;
        input.classNamespace = els.input.classNamespace.val().replace(/\s+/g, '');
        input.maxWidths = els.input.maxWidths.val().replace(/\s+/g, '').split(',');
        input.maxWidthsLength = input.maxWidths.length;
        input.maxWidthsBP = els.input.maxWidthsBP.val().replace(/\s+/g, '').split(',');
        input.maxWidthsBPLength = input.maxWidthsBP.length;
        input.base = els.input.base.val();
        
        input.gutmultipliersmall = els.input.gutmultipliersmall.val();
        input.gutmultipliermedium = els.input.gutmultipliermedium.val();
        input.gutmultiplierlarge = els.input.gutmultiplierlarge.val();
        
        
        $.ajax('./../assets/templates/baseup.tpl.css',{dataType:'text',async:false}).done(function(text) {
            db.templates.css.template = text;
            inputDone();
        });
        
        $.ajax('./../assets/templates/baseup-ielte7.tpl.css',{dataType:'text',async:false}).done(function(text) {
            db.templates.cssIElte7.template = text;
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
        db.classNamespace = input.classNamespace;
        
        db.gutmultipliersmall = input.gutmultipliersmall;
        db.gutmultipliermedium = input.gutmultipliermedium;
        db.gutmultiplierlarge = input.gutmultiplierlarge;
        
        
        
        // Update MaxWidths
        var i
        ,   maxWidths = []
        ;
        for (i = 1; i < 8; i++) {
            maxWidths.push(input.base * ((i * 12) - 1));
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
        ti.widths = makeWidthClasses({columns: db.columns});
        
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
            tibi.widths = makeWidthClasses({columns: db.columns});
            
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
            
            // gutter
            tibi.gutter = db.breakpoints[i].gutter;
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
        
        
        db.templates.css.output = Mustache.render(db.templates.css.template, db.templates.input);
        db.templates.cssIElte7.output = Mustache.render(db.templates.cssIElte7.template, db.templates.input);

        return callback();
        
    };
    
    output = function() {
            
        // Put CSS
        els.output.css.val(trim(db.templates.css.output));
        els.output.cssIElte7.val(trim(db.templates.cssIElte7.output));
        
        els.input.maxWidths.val(db.maxWidths);
        els.input.maxWidthsBP.val(db.maxWidthsBP.slice(1));
        
        resizeOutput(els.output.css[0]);
        resizeOutput(els.output.cssIElte7[0]);
        
        //els.output.labelSpan.html(' '+db.output.css.length);
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
        
        els.input.gutterBasex.each(function() {
            multipliers.push($(this).val());
        });
        els.input.gutter.each(function(i) {
            var $this = $(this);
            $this.val(multipliers[i] * els.input.base.val());
        });
        
        db.tid.inputGutterBasexChange = setTimeout(run, 400);
        
    };
    inputGutterChange = function() {
    
        var gutters = [];
        
        clearTimeout(db.tid.inputGutterChange);
        
        els.input.gutter.each(function() {
            gutters.push($(this).val());
        });
        els.input.gutterBasex.each(function(i) {
            var $this = $(this);
            $this.val(gutters[i] / els.input.base.val());
        });
        
        db.tid.inputGutterChange = setTimeout(run, 400);
        
    };
    
    breakpointAdd = function() {
        var last = els.input.formbreakpoint.last();
        last.after(last.clone());
        last.next().find('td:first').text(input.breakpointsLength);
        run();
        return false;
    };
    breakpointRemove = function() {
        
    };
    
    init = function() {
        
        elements();
        
        (function() {
            var toggleText = ['Bonza Options', 'Hide Bonza']
                ,toggleTextLength = toggleText.length
                ,togglePointer = (/#advanced/g.exec(window.location.href)) ? 1 : 0
                ,html = '<a href="">'+toggleText[togglePointer]+'</a>'
            ;
            console.log(togglePointer);
            els.toggleHTML = $(html);
            els.toggleHTML = els.advanced.before(els.toggleHTML).addClass((togglePointer ? '' : 'inactive')).prev();
            els.toggleHTML.on('click', function() {
                var $this = $(this);
                togglePointer = (togglePointer + 1) % toggleTextLength;
                $this.text(toggleText[togglePointer]);
                els.advanced.toggleClass('inactive');
                resizeOutput(els.output.css[0]);
                resizeOutput(els.output.cssIElte7[0]);
                return false;
            });
        }());
        
//        (function() {
//            var toggleText = ['CSS', 'Hide CSS']
//                ,toggleTextLength = toggleText.length
//                ,togglePointer = 0
//                ,html = '<a href="">'+toggleText[togglePointer]+'</a>'
//            ;
//            els.toggleHTML = $(html);
//            els.toggleHTML = els.css.before(els.toggleHTML).addClass('inactive').prev();
//            els.toggleHTML.on('click', function() {
//                var $this = $(this);
//                togglePointer = (togglePointer + 1) % toggleTextLength;
//                $this.text(toggleText[togglePointer]);
//                els.css.toggleClass('inactive');
//                resizeOutput(els.output.css[0]);
//                resizeOutput(els.output.cssIElte7[0]);
//                return false;
//            });
//        }());
        
        // On change of various input
        els.input.decimalPlaces.on('change', inputChange);
        els.input.positionClasses.on('change', inputChange);
        els.input.at.on('change', inputChange);
        els.input.columns.on('change', inputChange);
        els.input.maxWidths.on('change', inputChange);
        els.input.maxWidthsBP.on('change', inputChange);
        els.input.classNamespace.on('change', inputChange);
        
        els.input.base.on('change', inputBaseChange);
        els.input.gutterBasex.on('change', inputGutterBasexChange);
        els.input.gutter.on('change', inputGutterChange);
        
        els.input.gutmultipliersmall.on('change', inputChange);
        els.input.gutmultipliermedium.on('change', inputChange);
        els.input.gutmultiplierlarge.on('change', inputChange);
                
        els.input.breakpointadd.on('click', breakpointAdd);
        els.input.breakpointremove.on('click', breakpointRemove);
        
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
    
    
    
    // Event Logic
    // On Dom Ready
    $(function() {
        init();
    });


}(this));





