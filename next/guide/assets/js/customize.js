(function() {

    'use strict';
    
    var _selectors
        ,_in = {templates:{}}
        ,_out = {}
        ,_payload = {}
        ,_tid = {}
        ,makeIn
        ,makeInDone
        ,makeOut
        ,makePayload
        ,trim
        ,processRules
        ,makeWidthClasses
        ,makePositionClasses
        ,resizeOutput
        ,round
        ,inputChange
        ,inputBaseChange
        ,inputBasesChange
        ,inputBasesxChange
        ,breakpointAdd
        ,init
        ,run
    ;
    
    _selectors = {
    
        // inputs
        decimalPlaces: '#input-decimalplaces'
        ,positionClasses: '#input-positionclasses'
        ,heightClasses: '#input-heightclasses'
        ,heightClassesNum: '#input-heightclassesnum'
        ,columns: '.input-columns'
        ,at: '.input-at'
        ,bases: '.input-bases'
        ,basesx: '.input-basesx'
        ,maxWidths: '.input-maxwidths'
        ,maxWidthsBP: '.input-maxwidths-bp'
        ,baseBasedBPs: '.input-base-based-bps'
        ,classNamespace: '#input-classnamespace'
        ,breakpointadd: '.input-breakpoint-add'
        ,base: '#input-base'
        ,hbase: '#input-base'
        ,basehbase: '#input-basehbase'
        ,legacysupport: '.input-legacysupport'
        ,copyFontSizeBaseRatio: '#input-copyfontsizebaseratio'
        
        ,h1: '#input-h1'
        ,h2: '#input-h2'
        ,h3: '#input-h3'
        ,h4: '#input-h4'
        ,h5: '#input-h5'
        ,h6: '#input-h6'
        
        ,gutmultipliersmall: '#input-gutmultipliersmall'
        ,gutmultipliermedium: '#input-gutmultipliermedium'
        ,gutmultiplierlarge: '#input-gutmultiplierlarge'
        
        ,formbreakpoint: '.form-breakpoint'
        ,formbreakpointremove: '.form-breakpoint-remove'
        
        ,scrollbardepthadjust: '#input-scrollbardepthadjust'
        
        // outputs
        ,css: '.output-css'
        ,js: '.output-js'
        ,headcss: '.output-headcss'
        ,headjs: '.output-headjs'
        ,demo: '.output-demo'
        
        
        ,layoutoptions: '.layoutoptions'
        ,generaloptions: '.generaloptions'
        ,copyoptions: '.copyoptions'
        
    };
    
    
    
    makeIn = function(o) {
    
        var callback = o.callback;
        
        _in.inputAjaxCalls = {callback: callback, expected: 3, count: 0};
        
        _in.breakpoints = [];
        $(_selectors.formbreakpoint).each(function(i) {
            _in.breakpoints[i] = {
                at: $(this).find(_selectors.at).val() * 1,
                base: $(this).find(_selectors.bases).val() * 1,
                basex: $(this).find(_selectors.basesx).val() * 1
            };
        });
        _in.breakpointsLength = _in.breakpoints.length;
        _in.columns = $(_selectors.columns).val();
        _in.decimalPlaces = $(_selectors.decimalPlaces).val();
        _in.positionClasses = $(_selectors.positionClasses)[0].checked;
        _in.heightClasses = $(_selectors.heightClasses)[0].checked;
        _in.heightClassesNum = $(_selectors.heightClassesNum).val() * 1;
        _in.classNamespace = $(_selectors.classNamespace).val().replace(/\s+/g, '');
        _in.maxWidths = $(_selectors.maxWidths).val().replace(/\s+/g, '').split(',');
        _in.maxWidthsLength = _in.maxWidths.length;
//        _in.maxWidthsBP = $(_selectors.maxWidthsBP).val().replace(/\s+/g, '').split(',');
//        _in.maxWidthsBPLength = _in.maxWidthsBP.length;
        _in.base = $(_selectors.base).val();
        _in.hbase = $(_selectors.hbase).val();
        _in.basehbase = $(_selectors.basehbase).val();
        _in.legacysupport = $(_selectors.legacysupport)[0].checked;
        
        _in.copyFontSizeBaseRatio = $(_selectors.copyFontSizeBaseRatio).val();
        // Handle simple divisions like 2/3
        if (_in.copyFontSizeBaseRatio.indexOf('/') !== -1) {
            _in.copyFontSizeBaseRatio = _in.copyFontSizeBaseRatio.split('/');
            _in.copyFontSizeBaseRatio = _in.copyFontSizeBaseRatio[0] * 1 / _in.copyFontSizeBaseRatio[1] * 1;
        }
        _in.copyFontSizeBaseRatio = _in.copyFontSizeBaseRatio * 1;

        _in.h1 = $(_selectors.h1).val() * 1;
        _in.h2 = $(_selectors.h2).val() * 1;
        _in.h3 = $(_selectors.h3).val() * 1;
        _in.h4 = $(_selectors.h4).val() * 1;
        _in.h5 = $(_selectors.h5).val() * 1;
        _in.h6 = $(_selectors.h6).val() * 1;
        
        _in.scrollbardepthadjust = $(_selectors.scrollbardepthadjust).val() * 1;
        
        _in.gutmultipliersmall = $(_selectors.gutmultipliersmall).val();
        _in.gutmultipliermedium = $(_selectors.gutmultipliermedium).val();
        _in.gutmultiplierlarge = $(_selectors.gutmultiplierlarge).val();
        
        if (typeof _in.templates.css === 'undefined') {
            $.ajax('./../assets/templates/baseup-tpl.css',{dataType:'text',async:false}).done(function(text) {
                _in.templates.css = text;
                makeInDone();
            });
        }
        else {
            makeInDone();
        }
        
        if (typeof _in.templates.js === 'undefined') {
            $.ajax('./../assets/templates/baseup-tpl.js',{dataType:'text',async:false}).done(function(text) {
                _in.templates.js = text;
                makeInDone();
            });
        }
        else {
            makeInDone();
        }
        
        if (typeof _in.templates.demo === 'undefined') {
            $.ajax('./../assets/templates/baseup-demo-tpl.html',{dataType:'text',async:false}).done(function(text) {
                _in.templates.demo = text;
                makeInDone();
            });
        }
        else {
            makeInDone();
        }
        
    };
    makeInDone = function() {
        
        _in.inputAjaxCalls.count += 1;
        
        if (_in.inputAjaxCalls.count === _in.inputAjaxCalls.expected) {
            _in.inputAjaxCalls.callback();
        }
        
    };
    



    makeOut = function(o) {
    
        var callback = o.callback
            ,rules = []
            ,j
            ,i
            ,k
            ,m
            ,isgt0
            ,is0
            ,is1
            ,_inbreakpointi
            ,_outbreakpointi
            ,currentBase
            ,isnotfirst
            ,isforlay
            ,maxwidthbp = []
            ,pullgutGutters
            ,pullgutGuttersLength
            ,pullgutNames
            ,pullgutNamesLength
            ,baseChanged
        ;
        

        // Outputs for the form
        // Alternative breakpoints based on base
        _out.baseBasedBPs = [];
        for (i = 1; i < 8; i += 1) {
            _out.baseBasedBPs.push((_in.base * ((i * 12) - 1)) + _in.scrollbardepthadjust);
        }
        
        // MaxWidths
        _out.maxWidths = [];
        for (i = 1; i < 8; i += 1) {
            _out.maxWidths.push((_in.base * ((i * 12) - 1)));
        }
        // Add maxwidths from breakpoints
        for (i = 1; i < _in.breakpointsLength; i += 1) {
            _out.maxWidths.push(_in.breakpoints[i].at * 1);
        }
        
        
        

        _out.ns = _in.classNamespace;
        
        _out.lay = 'lay';
        _out.laycentered = 'lay-centered';
        _out.layleft = 'lay-left';
        _out.layright = 'lay-right';
            
        _out.col = 'col';
        _out.colgut = 'col-gut';
        _out.colguthide = 'hide-col-gut';
        _out.colnone = 'col-none';
            
        _out.gutsfw = 'guts-fw';
        
        _out.inngut = 'gut';
        _out.innguthide = 'hide-gut-left';
        _out.innnone = 'gut-none';
            
        _out.gut = 'gut';
        _out.gutleft = 'gut-left';
        _out.gutsmall = 'gut-left-small';
        _out.gutmedium = 'gut-left-medium';
        _out.gutlarge = 'gut-left-large';
            
        _out.gutright = 'gut-right';
        _out.gutrightsmall = 'gut-right-small';
        _out.gutrightmedium = 'gut-right-medium';
        _out.gutrightlarge = 'gut-right-large';
            
        _out.gutbot = 'gut-bottom';
            
        _out.pullleft = 'pull-left';
        _out.pullright = 'pull-right';
            
        _out.pullgut = 'pull-gut-left';
        _out.pullgutsmall = 'pull-gut-left-small';
        _out.pullgutmedium = 'pull-gut-left-medium';
        _out.pullgutlarge = 'pull-gut-left-large';
            
        _out.pullgutright = 'pull-gut-right';
        _out.pullgutrightsmall = 'pull-gut-right-small';
        _out.pullgutrightmedium = 'pull-gut-right-medium';
        _out.pullgutrightlarge = 'pull-gut-right-large';
            
        _out.clear = 'clear';
        _out.clearnone = 'clear-none';
        _out.width = 'width';
        _out.height = 'height';
        _out.widthmax = 'width-max';
        _out.pos = 'pos';
        _out.clearie6and7fixp1 = 'clear-ie6and7fixp1';
        _out.clearie6and7fixp2 = 'clear-ie6and7fixp2';
        _out.layie6fix = 'lay-ie6fix';
        _out.layoutgutter = 'layout-gutter';
        _out.rizzlecssproperty = 'rizzlecssproperty';
         
        
        // Breakpoints
        _out.breakpoints = [];

        // Copy
        _out.copylineheight = 1/_in.copyFontSizeBaseRatio; // Or font-size adjust
        _out.defaultcopyfontsize = 16; // The default untouched font-size cross-browser
        
        // Headings
        _out.h1 = 100*_in.h1;
        _out.h2 = 100*_in.h2;
        _out.h3 = 100*_in.h3;
        _out.h4 = 100*_in.h4;
        _out.h5 = 100*_in.h5;
        _out.h6 = 100*_in.h6;
        
        // I devised the algorithm to decrease the line-height the larger the font-size. Such that when the font-size is the same as copy, the line-height is also the same.
        // Reasoning that the larger the font-size the less words per line and therefore the line-height can be less (as it's easier to scan across fewer words).
        // Plus the results looked good ;)
        _out.h1lineheight = 1 + ((_out.copylineheight - 1) / _in.h1);
        _out.h2lineheight = 1 + ((_out.copylineheight - 1) / _in.h2);
        _out.h3lineheight = 1 + ((_out.copylineheight - 1) / _in.h3);
        _out.h4lineheight = 1 + ((_out.copylineheight - 1) / _in.h4);
        _out.h5lineheight = 1 + ((_out.copylineheight - 1) / _in.h5);
        _out.h6lineheight = 1 + ((_out.copylineheight - 1) / _in.h6);
        

        // widths
        _out.widthclasses = makeWidthClasses({columns: _in.columns}); // returns {widths:, widthsall:}
        
        currentBase = _in.breakpoints[0].base;
        
        for (i = 0; i < _in.breakpointsLength; i += 1) {

            _outbreakpointi = _out.breakpoints[i] = {};
            _inbreakpointi = _in.breakpoints[i];
            
            baseChanged = false;
        
            if (currentBase !== _inbreakpointi.base) {
                currentBase = _inbreakpointi.base;
                // A change of base detected
                // Therefore ensure all breakpoints[i].base reliant stuff is carried over
                baseChanged = true;
            }
/*

base
    bp0 20
    bp1 40
    bp2 40
    bp3 40

.height-1x
    bp0 20 * .height-1x needs to be in bp0
    bp1 40 * .height-1x needs to be in bp1, but not needed in higher breakpoints
    bp2 40
    bp3 40

.height-1x-1up
    bp0  0
    bp1 40 * .height-1x-1up needs to be in bp1, but not needed in higher breakpoints
    bp2 40
    bp3 40

.height-1x-2up
    bp0  0
    bp1 40
    bp2 40 * .height-1x-2up needs to be in bp2, but not needed in higher breakpoints
    bp3 40



base
    bp0 20
    bp1 40
    bp2 60
    bp3 60

.height-1x
    bp0 20 * .height-1x needs to be in bp0
    bp1 40 * .height-1x needs to be in bp1
    bp2 60 * .height-1x needs to be in bp2
    bp3 60

.height-1x-1up
    bp0  0
    bp1 40 * .height-1x-1up needs to be in bp1
    bp2 60 * .height-1x-1up needs to be in bp2
    bp3 60

.height-1x-2up
    bp0  0
    bp1 40
    bp2 60 * .height-1x-2up needs to be in bp2
    bp3 60



base
    bp0 20
    bp1 40
    bp2 40
    bp3 20

.height-1x
    bp0 20 * .height-1x needs to be in bp0
    bp1 40 * .height-1x needs to be in bp1
    bp2 40
    bp3 20 * .height-1x needs to be in bp3

.height-1x-1up
    bp0  0
    bp1 40 * .height-1x-1up needs to be in bp1
    bp2 40
    bp3 20 * .height-1x-1up needs to be in bp3

.height-1x-2up
    bp0  0
    bp1 40
    bp2 40 * .height-1x-2up needs to be in bp2
    bp3 20 * .height-1x-2up needs to be in bp3

So when the base changes, 

*/
            
            isgt0 = (i > 0) ? true : false;
            is0 = (i === 0) ? true : false;
            is1 = (i === 1) ? true : false;
            

            _outbreakpointi.copyfontsize = round((_inbreakpointi.base/_out.defaultcopyfontsize)/_out.copylineheight, _in.decimalPlaces); // The default untouched font-size cross-browser
            
            _outbreakpointi.base = _inbreakpointi.base;
            _outbreakpointi.base2x = _inbreakpointi.base * 2;
            _outbreakpointi.base1o2 = round(_inbreakpointi.base/2, _in.decimalPlaces);
            _outbreakpointi.halfbase = round(_inbreakpointi.base/2, _in.decimalPlaces);
            _outbreakpointi.halfbase2x = round(_inbreakpointi.base * 2 / 2, _in.decimalPlaces);
            _outbreakpointi.halfbase1o2 = round(_inbreakpointi.base/4, _in.decimalPlaces);
            
            // isFirst
            _outbreakpointi.is0 = is0;
            _outbreakpointi.is1 = is1;
            _outbreakpointi.isgt0 = isgt0;
            
            // bp
            if (is0) {
                _outbreakpointi.bp = '';
            }
            else {
                _outbreakpointi.bp = '-' + i + 'up';
            }
            
            // at
            _outbreakpointi.at = _inbreakpointi.at;
            
            // maxwidth based on breakpoints
            _outbreakpointi.maxwidthbp = (_inbreakpointi.base * 2) + _inbreakpointi.at;
            maxwidthbp.push((_inbreakpointi.base * 2) + _inbreakpointi.at);
            
            // maxwidths based on base
            _outbreakpointi.maxwidths = [];
            for (j = 0; j < _in.maxWidthsLength; j += 1) {
                _outbreakpointi.maxwidths.push({maxwidth: _in.maxWidths[j], dx:j+1});
            }
            
            // widths
            _outbreakpointi.widthclasses = makeWidthClasses({columns: _in.columns});
            
            // cols
            _outbreakpointi.cols = [];
            for (j = 0; j < _in.columns; j += 1) {
                _outbreakpointi.cols.push({
                    num:j+1
                    ,width:round(100/(j+1), _in.decimalPlaces)
                });
            } 
            
            // poss
            _outbreakpointi.poss = makePositionClasses({columns: _in.columns});
            
            // Height
            if (_in.heightClasses) {                
                _outbreakpointi.heights = [];
                _outbreakpointi.heights.push({
                    base:_inbreakpointi.base / 2
                    ,i: '1o2'
                });
                for (j = 0; j < 21; j += 1) {
                    _outbreakpointi.heights.push({
                        base:_inbreakpointi.base * j
                        ,i: j
                    });
                }
            }
            
            
            // hide gut left
            rules = [];
            m = i;
            if (baseChanged) {
                m = i - 1;
            }
            for (m; m <= i; m++) {
                
                rules.push(
                    {
                        val: -_inbreakpointi.base + 'px'
                        ,selector: '.' + _out.ns + _out.innguthide + _out.breakpoints[m].bp
                    }
                );
                // xs
                for (j = 1; j < 7; j += 1) {
                    rules.push({
                        val: -_inbreakpointi.base * j + 'px'
                        ,selector: '.' + _out.ns + _out.innguthide + '-' + j + 'x' + _out.breakpoints[m].bp
                    });
                }
                // fractions
                for (j = 1; j < 5; j += 1) {
                    for (k = 1; k < j; k++) {
                        rules.push({
                            val: round(-_inbreakpointi.base * k / j, _in.decimalPlaces) + 'px'
                            ,selector: '.' + _out.ns + _out.innguthide + '-' + k + 'o' + j + 'x' + _out.breakpoints[m].bp
                        });
                    }
                }
                // none
                rules.push(
                    {
                        val: '0'
                        ,selector: '.' + _out.ns + _out.innguthide + '-none' + _out.breakpoints[m].bp
                    }
                );
                
            }
            _outbreakpointi.innguthides = processRules(rules);
            
            
            // gutter
            _outbreakpointi.gutters = [];
            for (j = 1; j < 13; j += 1) {
                isnotfirst = (j > 1) ? 1 : 0;
                isforlay = (j < 7) ? 1 : 0;
                _outbreakpointi.gutters.push({
                    base: _inbreakpointi.base * j
                    ,halfbase: round(_inbreakpointi.base * j / 2, _in.decimalPlaces)
                    ,i: j
                    ,isnotfirst: isnotfirst
                    ,isforlay: isforlay
                });
            }
            _outbreakpointi.gutsmallmargin = _inbreakpointi.base * _in.gutmultipliersmall;
            _outbreakpointi.gutmediummargin = _inbreakpointi.base * _in.gutmultipliermedium;
            _outbreakpointi.gutlargemargin = _inbreakpointi.base * _in.gutmultiplierlarge;
            _outbreakpointi.gutrightsmallmargin = _inbreakpointi.base * _in.gutmultipliersmall;
            _outbreakpointi.gutrightmediummargin = _inbreakpointi.base * _in.gutmultipliermedium;
            _outbreakpointi.gutrightlargemargin = _inbreakpointi.base * _in.gutmultiplierlarge;
            
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
                    ,multiplier: _in.gutmultipliersmall
                }
                ,{
                    name: '-medium'
                    ,multiplier: _in.gutmultipliermedium
                }
                ,{
                    name: '-large'
                    ,multiplier: _in.gutmultiplierlarge
                }
            ];
            pullgutNamesLength = pullgutNames.length;
            
            // pullguts
            _outbreakpointi.pullguts = [];
            isnotfirst = 0;
            for (j = 1; j < 13; j += 1) {
                for (m = 0; m < pullgutGuttersLength; m += 1) {
                    _outbreakpointi.pullguts.push({
                        marginleft: _inbreakpointi.base * j
                        ,width: _inbreakpointi.base * j - (pullgutGutters[m].multiplier * _inbreakpointi.base)
                        ,name: _out.pullgut + '-' + j + 'x' + pullgutGutters[m].name
                        ,isnotfirst: isnotfirst
                    });
                    isnotfirst = 1;
                }
            }
            // Small medium large
            for (j = 1; j < pullgutNamesLength; j += 1) {
                for (m = 0; m < pullgutGuttersLength; m += 1) {
                    _outbreakpointi.pullguts.push({
                        marginleft: _inbreakpointi.base * pullgutNames[j].multiplier
                        ,width: _inbreakpointi.base * pullgutNames[j].multiplier - (pullgutGutters[m].multiplier * _inbreakpointi.base)
                        ,name: _out.pullgut + pullgutNames[j].name + pullgutGutters[m].name
                        ,isnotfirst: isnotfirst
                    });
                    isnotfirst = 1;
                }
            }
            
            
            // pullgutrights
            _outbreakpointi.pullgutrights = [];
            isnotfirst = 0;
            for (j = 1; j < 13; j += 1) {
                for (m = 0; m < pullgutGuttersLength; m += 1) {
                    _outbreakpointi.pullgutrights.push({
                        marginright: _inbreakpointi.base * j - (pullgutGutters[m].multiplier * _inbreakpointi.base)
                        ,width: _inbreakpointi.base * j - (pullgutGutters[m].multiplier * _inbreakpointi.base)
                        ,right: _inbreakpointi.base * pullgutGutters[m].multiplier
                        ,name: _out.pullgutright + '-' + j + 'x' + pullgutGutters[m].name
                        ,isnotfirst: isnotfirst
                    });
                    isnotfirst = 1;
                }
            }
            
            // Small medium large
            for (j = 1; j < pullgutNamesLength; j += 1) {
                for (m = 0; m < pullgutGuttersLength; m += 1) {
                    _outbreakpointi.pullgutrights.push({
                        marginright: _inbreakpointi.base * pullgutNames[j].multiplier - (pullgutGutters[m].multiplier * _inbreakpointi.base)
                        ,width: _inbreakpointi.base * pullgutNames[j].multiplier - (pullgutGutters[m].multiplier * _inbreakpointi.base)
                        ,right: _inbreakpointi.base * pullgutGutters[m].multiplier
                        ,name: _out.pullgutright + pullgutNames[j].name + pullgutGutters[m].name
                        ,isnotfirst: isnotfirst
                    });
                    isnotfirst = 1;
                }
            }
            
            _outbreakpointi.pullgutrightsmallmargin = _inbreakpointi.base * (_in.gutmultipliersmall - 1);
            _outbreakpointi.pullgutrightsmallwidth = _inbreakpointi.base * (_in.gutmultipliersmall - 1);
            _outbreakpointi.pullgutrightsmallright = _inbreakpointi.base;
            _outbreakpointi.pullgutrightmediummargin = _inbreakpointi.base * (_in.gutmultipliermedium - 1);
            _outbreakpointi.pullgutrightmediumwidth = _inbreakpointi.base * (_in.gutmultipliermedium - 1);
            _outbreakpointi.pullgutrightmediumright = _inbreakpointi.base;
            _outbreakpointi.pullgutrightlargemargin = _inbreakpointi.base * (_in.gutmultiplierlarge - 1);
            _outbreakpointi.pullgutrightlargewidth = _inbreakpointi.base * (_in.gutmultiplierlarge - 1);
            _outbreakpointi.pullgutrightlargeright = _inbreakpointi.base;
            
            // basex
            for (j = 1; j < 13; j += 1) {
                _outbreakpointi['base'+j] = _inbreakpointi.base * j;
            }
            
            
        }
        
        _out.maxwidthbp = maxwidthbp.join(',');
        
        _out.legacysupport = _in.legacysupport;
        
        
        // Demo
        _out.demo = {lays:[]};
        for (j = 1; j <= _in.columns; j += 1) {
            _out.demo.lays.push({j:j,isPrime:false,columns:[]});
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
                _out.demo.lays[j-1].isPrime = true;
            }
            for (k = 0; k < j; k += 1) {
                _out.demo.lays[j-1].columns.push({});
            }
        }

        
        return callback();
        
    };
    
    makePayload = function() {
        
        var j
            ,k
            ,isPrime
        ;
        _payload.css = Mustache.render(_in.templates.css, _out);
        _payload.js = Mustache.render(_in.templates.js, _out);
        _payload.demo = Mustache.render(_in.templates.demo, _out.demo);

        // Put CSS
        $(_selectors.css).val(trim(_payload.css));
        $(_selectors.js).val(trim(_payload.js));
        
        $(_selectors.headcss).html(trim(_payload.css));
        $(_selectors.headjs).html(trim(_payload.js));
        
        $(_selectors.maxWidths).val(_out.maxWidths);
        $(_selectors.maxWidthsBP).val(_out.maxwidthbp);
        
        $(_selectors.baseBasedBPs).val(_out.baseBasedBPs);
        
        resizeOutput($(_selectors.css)[0]);
        resizeOutput($(_selectors.js)[0]);
        
        $(_selectors.demo).html(_payload.demo);
        
    };
    
    
    trim = function(str) {
    
        return str.replace(/^\s+/, '').replace(/\s+$/, '');
        
    };
    
    processRules = function(rules) {
    
        var i
            ,val
            ,selector
            ,a = {}
            ,b = []
        ;
        
        for (i in rules) {
        
            if (rules.hasOwnProperty(i)) {
            
                val = rules[i].val;
                selector = rules[i].selector;
                
                if (a[val] === undefined) {
                    a[val] = {val:val, selector:selector};
                    b.push(a[val]);
                }
                else {
                    a[val].selector += ',' + "\n" + selector;
                }
            }
            
        }
        
        return b;
        
    };
   
    
    makeWidthClasses = function(o) {
    
        var i = 1
            ,j
            ,width
            ,widths = {}
            ,output = {widths:[], widthsall: []}
            ,columns = o.columns
            ,fractions
        ;
        
        // Create an object where the properties are widths and the values are an array of objects with numerators and denominators
        for (i; i <= columns; i += 1) {
            j = 1;
            for (j; j <= columns; j += 1) {
                width = round(100*i/j, _in.decimalPlaces);
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
            ,fractions
        ;
        
        // Create an object where the properties are widths and the values are an array of objects with numerators and denominators
        for (i; i <= o.columns; i += 1) {
            j = 1;
            for (j; j <= columns; j += 1) {
                position = round(100*(i-1)/j, _in.decimalPlaces);
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
        if (_in.positionClasses) {
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
//        for (i = 0; i < _in.breakpointsLength; i += 1) {
//            gutter = _in.breakpoints[i].basex * _in.base;
//            breakpoints.eq(i).find('.input-gutter').val(gutter);
//        }
//    };
    
    
    
    inputChange = function() {
                    
        clearTimeout(_tid.inputChange);
        _tid.inputChange = setTimeout(run, 400);
        
    };
    
    inputBaseChange = function() {
        inputBasesxChange();
    };
    inputBasesxChange = function() {
    
        var multipliers = [];
        
        clearTimeout(_tid.inputBasesxChange);
        
        $(_selectors.basesx).each(function() {
            multipliers.push($(this).val());
        });
        $(_selectors.bases).each(function(i) {
            var $this = $(this);
            $this.val(multipliers[i] * $(_selectors.base).val());
        });
        
        _tid.inputBasesxChange = setTimeout(run, 400);
        
    };
    inputBasesChange = function() {
    
        var bases = [];
        
        clearTimeout(_tid.inputBasesChange);
        
        $(_selectors.bases).each(function() {
            bases.push($(this).val());
        });
        $(_selectors.basesx).each(function(i) {
            var $this = $(this);
            $this.val(bases[i] / $(_selectors.base).val());
        });
        
        _tid.inputBasesChange = setTimeout(run, 400);
        
    };
    
    breakpointAdd = function() {
        var last = $(_selectors.formbreakpoint).last();
        last.after(last.clone());
        last.next().find('td:first').text(_in.breakpointsLength);
        run();
        return false;
    };
    
    init = function() {
        
        (function() {
            var toggleText = ['Layout', 'Close Layout']
                ,toggleTextLength = toggleText.length
                ,togglePointer = (/#layoutoptions/g.exec(window.location.href)) ? 1 : 0
                ,html = '<p><a href="">'+toggleText[togglePointer]+'</a></p>'
                ,toggleHTML
            ;
            toggleHTML = $(html);
            toggleHTML = $(_selectors.layoutoptions).before(toggleHTML).addClass((togglePointer ? '' : 'inactive')).prev();
            toggleHTML.on('click', 'a', function() {
                var $this = $(this);
                togglePointer = (togglePointer + 1) % toggleTextLength;
                $this.text(toggleText[togglePointer]);
                $(_selectors.layoutoptions).toggleClass('inactive');
                resizeOutput($(_selectors.css)[0]);
                resizeOutput($(_selectors.js)[0]);
                return false;
            });
        }());
        
        (function() {
            var toggleText = ['General', 'Close General']
                ,toggleTextLength = toggleText.length
                ,togglePointer = (/#generaloptions/g.exec(window.location.href)) ? 1 : 0
                ,html = '<p><a href="">'+toggleText[togglePointer]+'</a></p>'
                ,toggleHTML
            ;
            toggleHTML = $(html);
            toggleHTML = $(_selectors.generaloptions).before(toggleHTML).addClass((togglePointer ? '' : 'inactive')).prev();
            toggleHTML.on('click', 'a', function() {
                var $this = $(this);
                togglePointer = (togglePointer + 1) % toggleTextLength;
                $this.text(toggleText[togglePointer]);
                $(_selectors.generaloptions).toggleClass('inactive');
                return false;
            });
        }());
        
        (function() {
            var toggleText = ['Copy', 'Close Copy']
                ,toggleTextLength = toggleText.length
                ,togglePointer = (/#copyoptions/g.exec(window.location.href)) ? 1 : 0
                ,html = '<p><a href="">'+toggleText[togglePointer]+'</a></p>'
                ,toggleHTML
            ;
            toggleHTML = $(html);
            toggleHTML = $(_selectors.copyoptions).before(toggleHTML).addClass((togglePointer ? '' : 'inactive')).prev();
            toggleHTML.on('click', 'a', function() {
                var $this = $(this);
                togglePointer = (togglePointer + 1) % toggleTextLength;
                $this.text(toggleText[togglePointer]);
                $(_selectors.copyoptions).toggleClass('inactive');
                return false;
            });
        }());
        
        $(_selectors.formbreakpoint).slice(1).append('<td class="form-breakpoint-remove"><span tabindex="-1">x</span></td>').parent().find('tr:first').append('<th>Remove</th>');
        
        run();
        
    };
    
    run = function() {
        makeIn({callback:function() {
            makeOut({callback:function() {
                makePayload();
            }});
        }});
    };
    
    $(document)
        .on('change', function(e) {
            
            var $t = $(e.target)
            ;
            
            // On change of various input
            if (
                $t.is(_selectors.decimalPlaces)
                || $t.is(_selectors.positionClasses)
                || $t.is(_selectors.heightClasses)
                || $t.is(_selectors.at)
                || $t.is(_selectors.columns)
                || $t.is(_selectors.maxWidths)
                || $t.is(_selectors.maxWidthsBP)
                || $t.is(_selectors.classNamespace)
                || $t.is(_selectors.legacysupport)
                || $t.is(_selectors.gutmultipliersmall)
                || $t.is(_selectors.gutmultipliermedium)
                || $t.is(_selectors.gutmultiplierlarge)
                || $t.is(_selectors.scrollbardepthadjust)
                || $t.is(_selectors.copyFontSizeBaseRatio)
            ) {
                inputChange();
            }
            
            if ($t.is(_selectors.base)) {
                inputBaseChange();
            }
            if ($t.is(_selectors.basesx)) {
                inputBasesxChange();
            }
            if ($t.is(_selectors.bases)) {
                inputBasesChange();
            }
            
            
            
        })
        .on('click', function(e) {
            var $t = $(e.target)
                ,rtn = true
            ;
            if ($t.is(_selectors.breakpointadd)) {
                breakpointAdd();
                rtn = false;
            }
            else if ($t.closest(_selectors.formbreakpointremove).length) {
                $t.closest('tr').remove();
                inputChange();
                rtn = false;
            }

            return rtn;
        })
        .on('submit', function(e) {
            var $t = $(e.target)
                ,rtn = true
            ;
            if ($t.not('input[type="submit"]')) {
                rtn = false;
            }
            return rtn;
        })
        .ready(init);

    
}(this));