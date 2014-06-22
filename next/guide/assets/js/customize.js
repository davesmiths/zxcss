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
        
        _in.headingmarginbottomadjust = 0.5; // x base
        _in.headingmargintopminimum = 1; // x base
        
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
            ,hidegutlefts
            ,gutlefts
            ,gutrights
            ,guts
            ,gutsfws
            ,gutsmargin
            ,gutsmarginall
            ,gutspadding
            ,gutspaddingall
            ,pullgutlefts
            ,pullgutrights
            ,gutbottoms
            ,heights
            ,maxwidths
            ,widthspx
            ,j
            ,i
            ,k
            ,m
            ,bpi
            ,isgt0
            ,is0
            ,is1
            ,_inbreakpointi
            ,_outbreakpointi
            ,currentBase
            ,isnotfirst
            ,isforlay
            ,maxwidthbps = []
            ,maxwidthbp
            ,pullgutGutters
            ,pullgutGuttersLength
            ,pullgutNames
            ,pullgutNamesLength
            ,baseChanged
            ,val
            ,h1lineheight
            ,h2lineheight
            ,h3lineheight
            ,h4lineheight
            ,h5lineheight
            ,h6lineheight
            ,h1margintop
            ,h2margintop
            ,h3margintop
            ,h4margintop
            ,h5margintop
            ,h6margintop
            ,h1marginbottom
            ,h2marginbottom
            ,h3marginbottom
            ,h4marginbottom
            ,h5marginbottom
            ,h6marginbottom
        ;
        
        
        
        

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
        _out.pullgutright = 'pull-gut-right';
            
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
        _out.h1 = round(100*_in.h1, _in.decimalPlaces);
        _out.h2 = round(100*_in.h2, _in.decimalPlaces);
        _out.h3 = round(100*_in.h3, _in.decimalPlaces);
        _out.h4 = round(100*_in.h4, _in.decimalPlaces);
        _out.h5 = round(100*_in.h5, _in.decimalPlaces);
        _out.h6 = round(100*_in.h6, _in.decimalPlaces);
        
        // I devised the algorithm to decrease the line-height the larger the font-size. Such that when the font-size is the same as copy, the line-height is also the same.
        // Reasoning that the larger the font-size the less words per line and therefore the line-height can be less (as it's easier to scan across fewer words).
        // Plus the results looked good ;)
        h1lineheight = 1 + ((_out.copylineheight - 1) / _in.h1);
        h2lineheight = 1 + ((_out.copylineheight - 1) / _in.h2);
        h3lineheight = 1 + ((_out.copylineheight - 1) / _in.h3);
        h4lineheight = 1 + ((_out.copylineheight - 1) / _in.h4);
        h5lineheight = 1 + ((_out.copylineheight - 1) / _in.h5);
        h6lineheight = 1 + ((_out.copylineheight - 1) / _in.h6);
        
        _out.h1lineheight = round(h1lineheight, _in.decimalPlaces);
        _out.h2lineheight = round(h2lineheight, _in.decimalPlaces);
        _out.h3lineheight = round(h3lineheight, _in.decimalPlaces);
        _out.h4lineheight = round(h4lineheight, _in.decimalPlaces);
        _out.h5lineheight = round(h5lineheight, _in.decimalPlaces);
        _out.h6lineheight = round(h6lineheight, _in.decimalPlaces);
        

        // widths
        _out.widthclasses = makeWidthClasses({columns: _in.columns}); // returns {widths:, widthsall:}
        
        currentBase = -1;
        
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
            
            _outbreakpointi.basechanged = baseChanged;
            
            bpi = i;
            if (i > 0 && baseChanged) {
                bpi = i - 1;
            }
            
            isgt0 = (i > 0) ? true : false;
            is0 = (i === 0) ? true : false;
            is1 = (i === 1) ? true : false;
            

            _outbreakpointi.copyfontsize = round((_inbreakpointi.base/_out.defaultcopyfontsize)/_out.copylineheight, _in.decimalPlaces); // The default untouched font-size cross-browser
            
            
            // Heading Margins
            
            
            h1marginbottom = _in.headingmarginbottomadjust * _inbreakpointi.base;
            h2marginbottom = _in.headingmarginbottomadjust * _inbreakpointi.base;
            h3marginbottom = _in.headingmarginbottomadjust * _inbreakpointi.base;
            h4marginbottom = _in.headingmarginbottomadjust * _inbreakpointi.base;
            h5marginbottom = _in.headingmarginbottomadjust * _inbreakpointi.base;
            h6marginbottom = _in.headingmarginbottomadjust * _inbreakpointi.base;
        
            h1margintop = (h1lineheight * _inbreakpointi.base) % _inbreakpointi.base;
            if (h1margintop < (_in.headingmargintopminimum * _inbreakpointi.base)) {
                h1margintop += _in.headingmargintopminimum * _inbreakpointi.base;
            }
            h1margintop -= h1marginbottom;
            h2margintop = (h2lineheight * _inbreakpointi.base) % _inbreakpointi.base;
            if (h2margintop < (_in.headingmargintopminimum * _inbreakpointi.base)) {
                h2margintop += _in.headingmargintopminimum * _inbreakpointi.base;
            }
            h2margintop -= h2marginbottom;
            h3margintop = (h3lineheight * _inbreakpointi.base) % _inbreakpointi.base;
            if (h3margintop < (_in.headingmargintopminimum * _inbreakpointi.base)) {
                h3margintop += _in.headingmargintopminimum * _inbreakpointi.base;
            }
            h3margintop -= h3marginbottom;
            h4margintop = (h4lineheight * _inbreakpointi.base) % _inbreakpointi.base;
            if (h4margintop < (_in.headingmargintopminimum * _inbreakpointi.base)) {
                h4margintop += _in.headingmargintopminimum * _inbreakpointi.base;
            }
            h4margintop -= h4marginbottom;
            h5margintop = (h5lineheight * _inbreakpointi.base) % _inbreakpointi.base;
            if (h5margintop < (_in.headingmargintopminimum * _inbreakpointi.base)) {
                h5margintop += _in.headingmargintopminimum * _inbreakpointi.base;
            }
            h5margintop -= h5marginbottom;
            h6margintop = (h6lineheight * _inbreakpointi.base) % _inbreakpointi.base;
            if (h6margintop < (_in.headingmargintopminimum * _inbreakpointi.base)) {
                h6margintop += _in.headingmargintopminimum * _inbreakpointi.base;
            }
            h6margintop -= h6marginbottom;
        
            _outbreakpointi.h1marginbottomval = h1marginbottom + 'px';
            _outbreakpointi.h2marginbottomval = h2marginbottom + 'px';
            _outbreakpointi.h3marginbottomval = h3marginbottom + 'px';
            _outbreakpointi.h4marginbottomval = h4marginbottom + 'px';
            _outbreakpointi.h5marginbottomval = h5marginbottom + 'px';
            _outbreakpointi.h6marginbottomval = h6marginbottom + 'px';
            _outbreakpointi.h1margintopval = h1margintop + 'px';
            _outbreakpointi.h2margintopval = h2margintop + 'px';
            _outbreakpointi.h3margintopval = h3margintop + 'px';
            _outbreakpointi.h4margintopval = h4margintop + 'px';
            _outbreakpointi.h5margintopval = h5margintop + 'px';
            _outbreakpointi.h6margintopval = h6margintop + 'px';
            

console.log('font-size:', _in.h1 * _inbreakpointi.base);

            
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
            maxwidthbp = (_inbreakpointi.base * 2) + _inbreakpointi.at;
            _outbreakpointi.maxwidthbp = maxwidthbp;
            maxwidthbps.push(maxwidthbp);
            
            
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
                        
            
            
            // Everything based on base
            hidegutlefts = [];
            gutlefts = [];
            gutrights = [];
            gutsfws = [];
            gutsmargin = [];
            gutsmarginall = [];
            gutspadding = [];
            gutspaddingall = [];
            pullgutlefts = [];
            pullgutrights = [];
            gutbottoms = [];
            heights = [];
            maxwidths = [];
            widthspx = [];
            
            
            
            for (m = bpi; m <= i; m++) {
                
                
                
                // Maxwidths
                for (j = 1; j < 8; j += 1) {
                    maxwidths.push({
                        selector: '.' + _out.ns + _out.widthmax + '-' + j + 'dx' + _out.breakpoints[m].bp
                        ,val: (_inbreakpointi.base * ((j * 12) - 1)) + 'px',
                    });
                }
                maxwidths.push({
                    val: 'none'
                    ,selector: '.' + _out.ns + _out.widthmax + '-none' + _out.breakpoints[m].bp
                });
                
                
                
                // Widths px
                for (j = 1; j < 24; j += 1) {
                    widthspx.push({
                        selector: '.' + _out.ns + _out.width + '-' + j + 'x' + _out.breakpoints[m].bp
                        ,val: _inbreakpointi.base * j + 'px',
                    });
                }
                
                
                
                // Heights
                heights.push({
                    val: round(_inbreakpointi.base / 2, _in.decimalPlaces) + 'px'
                    ,selector: '.' + _out.ns + _out.height + '-1o2x' + _out.breakpoints[m].bp
                });
                for (j = 1; j < 21; j += 1) {
                    heights.push({
                        val: _inbreakpointi.base * j + 'px'
                        ,selector: '.' + _out.ns + _out.height + '-' + j + 'x' + _out.breakpoints[m].bp
                    });
                }
                heights.push({
                    val: 'auto'
                    ,selector: '.' + _out.ns + _out.height + '-auto' + _out.breakpoints[m].bp
                });



                // Hide Gut Lefts
                hidegutlefts.push({
                    val: -_inbreakpointi.base + 'px'
                    ,selector: '.' + _out.ns + _out.innguthide + _out.breakpoints[m].bp
                });
                for (j = 1; j < 7; j += 1) {
                    hidegutlefts.push({
                        val: -_inbreakpointi.base * j + 'px'
                        ,selector: '.' + _out.ns + _out.innguthide + '-' + j + 'x' + _out.breakpoints[m].bp
                    });
                }
                for (j = 1; j < 5; j += 1) {
                    for (k = 1; k < j; k++) {
                        hidegutlefts.push({
                            val: round(-_inbreakpointi.base * k / j, _in.decimalPlaces) + 'px'
                            ,selector: '.' + _out.ns + _out.innguthide + '-' + k + 'o' + j + 'x' + _out.breakpoints[m].bp
                        });
                    }
                }
                hidegutlefts.push(
                    {
                        val: '0'
                        ,selector: '.' + _out.ns + _out.innguthide + '-none' + _out.breakpoints[m].bp
                    }
                );
                
                
                
                // Guts Full Widths
                gutsfws.push({
                    val: -_inbreakpointi.base + 'px'
                    ,selector: '.' + _out.ns + _out.gutsfw + _out.breakpoints[m].bp
                });
                for (j = 1; j < 7; j += 1) {
                    gutsfws.push({
                        val: -_inbreakpointi.base * j + 'px'
                        ,selector: '.' + _out.ns + _out.gutsfw + '-' + j + 'x' + _out.breakpoints[m].bp
                    });
                }
                for (j = 1; j < 5; j += 1) {
                    for (k = 1; k < j; k++) {
                        gutsfws.push({
                            val: -round(_inbreakpointi.base * k / j, _in.decimalPlaces) + 'px'
                            ,selector: '.' + _out.ns + _out.gutsfw + '-' + k + 'o' + j + 'x' + _out.breakpoints[m].bp
                        });
                    }
                }
                gutsfws.push({
                    val: _inbreakpointi.base + 'px'
                    ,selector: '.' + _out.ns + _out.gutsfw + _out.breakpoints[m].bp + ' > * > *'
                });
                for (j = 1; j < 7; j += 1) {
                    gutsfws.push({
                        val: _inbreakpointi.base * j + 'px'
                        ,selector: '.' + _out.ns + _out.gutsfw + '-' + j + 'x' + _out.breakpoints[m].bp + ' > * > *'
                    });
                }
                for (j = 1; j < 5; j += 1) {
                    for (k = 1; k < j; k++) {
                        gutsfws.push({
                            val: round(_inbreakpointi.base * k / j, _in.decimalPlaces) + 'px'
                            ,selector: '.' + _out.ns + _out.gutsfw + '-' + k + 'o' + j + 'x' + _out.breakpoints[m].bp + ' > * > *'
                        });
                    }
                }
                
                
                
                // Guts Margin
                gutsmargin.push({
                    val: -round(_inbreakpointi.base / 2, _in.decimalPlaces) + 'px'
                    ,selector: '.' + _out.ns + _out.gut + 's' + _out.breakpoints[m].bp
                });
                for (j = 1; j < 7; j += 1) {
                    gutsmargin.push({
                        val: -round(_inbreakpointi.base * j / 2, _in.decimalPlaces) + 'px'
                        ,selector: '.' + _out.ns + _out.gut + 's-' + j + 'x' + _out.breakpoints[m].bp
                    });
                }
                for (j = 1; j < 5; j += 1) {
                    for (k = 1; k < j; k++) {
                        gutsmargin.push({
                            val: -round(_inbreakpointi.base * k / j / 2, _in.decimalPlaces) + 'px'
                            ,selector: '.' + _out.ns + _out.gut + 's-' + k + 'o' + j + 'x' + _out.breakpoints[m].bp
                        });
                    }
                }
                
                
                
                // Guts Margin All
                gutsmarginall.push({
                    val: ''
                    ,selector: '.' + _out.ns + _out.gut + 's' + _out.breakpoints[m].bp
                });
                for (j = 1; j < 7; j += 1) {
                    gutsmarginall.push({
                        val: ''
                        ,selector: '.' + _out.ns + _out.gut + 's-' + j + 'x' + _out.breakpoints[m].bp
                    });
                }
                for (j = 1; j < 5; j += 1) {
                    for (k = 1; k < j; k++) {
                        gutsmarginall.push({
                            val: ''
                            ,selector: '.' + _out.ns + _out.gut + 's-' + k + 'o' + j + 'x' + _out.breakpoints[m].bp
                        });
                    }
                }
                
                
                
                // Guts Padding
                gutspadding.push({
                    val: round(_inbreakpointi.base / 2, _in.decimalPlaces) + 'px'
                    ,selector: '.' + _out.ns + _out.gut + 's' + _out.breakpoints[m].bp + ' > *'
                });
                for (j = 1; j < 7; j += 1) {
                    gutspadding.push({
                        val: round(_inbreakpointi.base * j / 2, _in.decimalPlaces) + 'px'
                        ,selector: '.' + _out.ns + _out.gut + 's-' + j + 'x' + _out.breakpoints[m].bp + ' > *'
                    });
                }
                for (j = 1; j < 5; j += 1) {
                    for (k = 1; k < j; k++) {
                        gutspadding.push({
                            val: round(_inbreakpointi.base * k / j / 2, _in.decimalPlaces) + 'px'
                            ,selector: '.' + _out.ns + _out.gut + 's-' + k + 'o' + j + 'x' + _out.breakpoints[m].bp + ' > *'
                        });
                    }
                }
                
                
                
                // Guts Padding All
                gutspaddingall.push({
                    val: val
                    ,selector: '.' + _out.ns + _out.gut + 's' + _out.breakpoints[m].bp + ' > *'
                });
                for (j = 1; j < 7; j += 1) {
                    gutspaddingall.push({
                        val: val
                        ,selector: '.' + _out.ns + _out.gut + 's-' + j + 'x' + _out.breakpoints[m].bp + ' > *'
                    });
                }
                for (j = 1; j < 5; j += 1) {
                    for (k = 1; k < j; k++) {
                        gutspaddingall.push({
                            val: val
                            ,selector: '.' + _out.ns + _out.gut + 's-' + k + 'o' + j + 'x' + _out.breakpoints[m].bp + ' > *'
                        });
                    }
                }
                
                
                
                // Gut Lefts
                gutlefts.push({
                    val: _inbreakpointi.base + 'px'
                    ,selector: '.' + _out.ns + _out.gutleft + _out.breakpoints[m].bp
                });
                for (j = 1; j < 7; j += 1) {
                    gutlefts.push({
                        val: _inbreakpointi.base * j + 'px'
                        ,selector: '.' + _out.ns + _out.gutleft + '-' + j + 'x' + _out.breakpoints[m].bp
                    });
                }
                for (j = 1; j < 5; j += 1) {
                    for (k = 1; k < j; k++) {
                        gutlefts.push({
                            val: round(_inbreakpointi.base * k / j, _in.decimalPlaces) + 'px'
                            ,selector: '.' + _out.ns + _out.gutleft + '-' + k + 'o' + j + 'x' + _out.breakpoints[m].bp
                        });
                    }
                }
                gutlefts.push(
                    {
                        val: '0'
                        ,selector: '.' + _out.ns + _out.gutleft + '-none' + _out.breakpoints[m].bp
                    }
                    ,{
                        val: _inbreakpointi.base * _in.gutmultipliersmall + 'px'
                        ,selector: '.' + _out.ns + _out.gutsmall + _out.breakpoints[m].bp
                    }
                    ,{
                        val: _inbreakpointi.base * _in.gutmultipliermedium + 'px'
                        ,selector: '.' + _out.ns + _out.gutmedium + _out.breakpoints[m].bp
                    }
                    ,{
                        val: _inbreakpointi.base * _in.gutmultiplierlarge + 'px'
                        ,selector: '.' + _out.ns + _out.gutlarge + _out.breakpoints[m].bp
                    }
                );
                
                
                
                // Gut Rights
                gutrights.push({
                    val: _inbreakpointi.base + 'px'
                    ,selector: '.' + _out.ns + _out.gutright + _out.breakpoints[m].bp
                });
                for (j = 1; j < 7; j += 1) {
                    gutrights.push({
                        val: _inbreakpointi.base * j + 'px'
                        ,selector: '.' + _out.ns + _out.gutright + '-' + j + 'x' + _out.breakpoints[m].bp
                    });
                }
                for (j = 1; j < 5; j += 1) {
                    for (k = 1; k < j; k++) {
                        gutrights.push({
                            val: round(_inbreakpointi.base * k / j, _in.decimalPlaces) + 'px'
                            ,selector: '.' + _out.ns + _out.gutright + '-' + k + 'o' + j + 'x' + _out.breakpoints[m].bp
                        });
                    }
                }
                gutrights.push(
                    {
                        val: '0'
                        ,selector: '.' + _out.ns + _out.gutright + '-none' + _out.breakpoints[m].bp
                    }
                    ,{
                        val: _inbreakpointi.base * _in.gutmultipliersmall + 'px'
                        ,selector: '.' + _out.ns + _out.gutrightsmall + _out.breakpoints[m].bp
                    }
                    ,{
                        val: _inbreakpointi.base * _in.gutmultipliermedium + 'px'
                        ,selector: '.' + _out.ns + _out.gutrightmedium + _out.breakpoints[m].bp
                    }
                    ,{
                        val: _inbreakpointi.base * _in.gutmultiplierlarge + 'px'
                        ,selector: '.' + _out.ns + _out.gutrightlarge + _out.breakpoints[m].bp
                    }
                );
                
                
                
                // Gut Bottoms
                gutbottoms.push({
                    val: _inbreakpointi.base + 'px'
                    ,selector: '.' + _out.ns + _out.gutbot + _out.breakpoints[m].bp
                });
                for (j = 1; j < 7; j += 1) {
                    gutbottoms.push({
                        val: _inbreakpointi.base * j + 'px'
                        ,selector: '.' + _out.ns + _out.gutbot + '-' + j + 'x' + _out.breakpoints[m].bp
                    });
                }
                for (j = 1; j < 5; j += 1) {
                    for (k = 1; k < j; k++) {
                        gutbottoms.push({
                            val: round(_inbreakpointi.base * k / j, _in.decimalPlaces) + 'px'
                            ,selector: '.' + _out.ns + _out.gutbot + '-' + k + 'o' + j + 'x' + _out.breakpoints[m].bp
                        });
                    }
                }
                gutbottoms.push(
                    {
                        val: '0'
                        ,selector: '.' + _out.ns + _out.gutbot + '-none' + _out.breakpoints[m].bp
                    }
                );
                
                
                
                // Pull Gut Lefts
                pullgutlefts.push({
                    val: _inbreakpointi.base + 'px'
                    ,selector: '.' + _out.ns + _out.pullgut + _out.breakpoints[m].bp
                });
                
                
                
                // Pull Gut Rights
                pullgutrights.push({
                    val: _inbreakpointi.base + 'px'
                    ,selector: '.' + _out.ns + _out.pullgutright + _out.breakpoints[m].bp
                });
                
                
            }
            
            // Process the base dependent rules
            hidegutlefts = processRules(hidegutlefts);
            gutsfws = processRules(gutsfws);
            gutsmargin = processRules(gutsmargin);
            gutsmarginall = processRules(gutsmarginall);
            gutspadding = processRules(gutspadding);
            gutspaddingall = processRules(gutspaddingall);
            gutlefts = processRules(gutlefts);
            gutrights = processRules(gutrights);
            pullgutlefts = {more:processRules(pullgutlefts), core:[]};
            pullgutrights = {more:processRules(pullgutrights), core: []};
            gutbottoms = processRules(gutbottoms);
            maxwidths = processRules(maxwidths);
            widthspx = processRules(widthspx);
            heights = processRules(heights);
            
            
            
            // Not dependent on base
            pullgutlefts.main = {
                selector: '.' + _out.ns + _out.pullgut + _outbreakpointi.bp
            };
            pullgutlefts.none = {
                selector: '.' + _out.ns + _out.pullgut + '-none' + _outbreakpointi.bp
            };
            pullgutlefts.legacy = {
                selector: '.' + _out.ns + _out.pullgut + _outbreakpointi.bp
            };
            pullgutrights.main = {
                selector: '.' + _out.ns + _out.pullgutright + _outbreakpointi.bp
            };
            pullgutrights.none = {
                selector: '.' + _out.ns + _out.pullgutright + '-none' + _outbreakpointi.bp
            };
            pullgutrights.legacy = {
                selector: '.' + _out.ns + _out.pullgutright + _outbreakpointi.bp
            };
            _outbreakpointi.innguthides = hidegutlefts;
            _outbreakpointi.gutsfws = gutsfws;
            _outbreakpointi.gutsmargin = gutsmargin;
            _outbreakpointi.gutsmarginall = gutsmarginall;
            _outbreakpointi.gutspadding = gutspadding;
            _outbreakpointi.gutspaddingall = gutspaddingall;
            _outbreakpointi.gutlefts = gutlefts;
            _outbreakpointi.gutrights = gutrights;
            _outbreakpointi.pullgutlefts = pullgutlefts;
            _outbreakpointi.pullgutrights = pullgutrights;
            _outbreakpointi.gutbottoms = gutbottoms;
            _outbreakpointi.maxwidths = maxwidths;
            _outbreakpointi.widthspx = widthspx;
            if (_in.heightClasses) {
                _outbreakpointi.heights = heights;
            }
            
            
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
            
            
            
            // basex
            for (j = 1; j < 13; j += 1) {
                _outbreakpointi['base'+j] = _inbreakpointi.base * j;
            }
            
            
        }
        
        _out.legacysupport = _in.legacysupport;
        
        
        

        // Form outputs
        // Alternative breakpoints based on base
        _out.formBaseBasedBPs = [];
        for (i = 1; i < 8; i += 1) {
            _out.formBaseBasedBPs.push((_in.base * ((i * 12) - 1)) + _in.scrollbardepthadjust);
        }
        // MaxWidths
        _out.formMaxWidths = [];
        for (i = 1; i < 8; i += 1) {
            _out.formMaxWidths.push((_in.base * ((i * 12) - 1)));
        }
        // Add maxwidths from breakpoints
        for (i = 1; i < _in.breakpointsLength; i += 1) {
            _out.formMaxWidths.push(_in.breakpoints[i].at * 1);
        }
        _out.formMaxWidthBP = maxwidthbps.join(',');
        
        
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
        
        // Render outputs
        _payload.css = Mustache.render(_in.templates.css, _out);
        _payload.js = Mustache.render(_in.templates.js, _out);
        _payload.demo = Mustache.render(_in.templates.demo, _out.demo);
        

        // Textarea outputs
        $(_selectors.css).val(trim(_payload.css));
        $(_selectors.js).val(trim(_payload.js));
        resizeOutput($(_selectors.css)[0]);
        resizeOutput($(_selectors.js)[0]);
        
        
        // Head element outputs
        $(_selectors.headcss).html(trim(_payload.css));
        $(_selectors.headjs).html(trim(_payload.js));
        
        // Form
        $(_selectors.maxWidths).val(_out.formMaxWidths);
        $(_selectors.maxWidthsBP).val(_out.formMaxWidthBP);
        $(_selectors.baseBasedBPs).val(_out.formBaseBasedBPs);
        
        // Demo
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