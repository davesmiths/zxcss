(function(context){
    
    // Config
    var getInput 
    ,   initialise
    ,   db = {}
    ,   elements = {inputs:{}, outputs:{}}
    ,   inputs = {}
    ,   outputs = {}
    ;
    
    
    // Event logic
    // On Dom Ready
    $(function() {
    
        run();
        
        // On change of various inputs
        elements.inputs.decimalPlaces.on('change', inputChange);
        elements.inputs.minify.on('change', inputChange);
        elements.inputs.positionClasses.on('change', inputChange);
        elements.inputs.at.on('change', inputChange);
        elements.inputs.columns.on('change', inputChange);
        elements.inputs.gutter.on('change', inputChange);
        elements.inputs.maxWidths.on('change', inputChange);
        elements.inputs.classNamespace.on('change', inputChange);
        
        elements.inputs.breakpointadd.on('click', breakpointAdd);
        elements.inputs.breakpointremove.on('click', breakpointRemove);
        
    });
    
    // Actions
    getElements = function() {
    
        elements.inputs.decimalPlaces = $('#input-decimalplaces');
        elements.inputs.minify = $('#input-minify');
        elements.inputs.positionClasses = $('#input-positionclasses');
        elements.inputs.at = $('.input-at');
        elements.inputs.columns = $('.input-columns');
        elements.inputs.gutter = $('.input-gutter');
        elements.inputs.maxWidths = $('.input-maxwidths');
        elements.inputs.classNamespace = $('#input-classnamespace');
        elements.inputs.breakpointadd = $('#input-breakpointadd');
        elements.inputs.breakpointremove = $('#input-breakpointremove');
        
        elements.outputs.cssCore = $('.output-csscore');
        elements.outputs.cssCoreIElte7 = $('.output-csscoreielte7');
        elements.outputs.cssResponsive = $('.output-cssresponsive');
        elements.outputs.cssResponsiveIElte6 = $('.output-cssresponsiveielte6');
        elements.outputs.labelSpan = $('label[for=output] span');
        elements.outputs.cssCoreTest = $('.csscoretest');
        elements.outputs.cssResponsiveTest = $('.cssresponsivetest');
        
    };
    
    getInputs = function() {
    
        inputs.breakpoints = [];
        $('.form-breakpoint').each(function(i) {
            inputs.breakpoints[i] = {
                at: $(this).find('.input-at').val(),
                columns: $(this).find('.input-columns').val(),
                gutter: $(this).find('.input-gutter').val()
            }
        });
        inputs.breakpointsLength = inputs.breakpoints.length;
        inputs.decimalPlaces = elements.inputs.decimalPlaces.val();
        inputs.minify = elements.inputs.minify[0].checked;
        inputs.positionClasses = elements.inputs.positionClasses[0].checked;
        inputs.maxWidths = elements.inputs.maxWidths.val().replace(/\s+/g, '').split(',');
        inputs.classNamespace = elements.inputs.classNamespace.val().replace(/\s+/g, '');
        inputs.maxWidthsLength = inputs.maxWidths.length;
        
        // Custom moustaches templating
        moustaches['ns'] = inputs.classNamespace;
        inputs.smallMoustaches = moustaches;
        
    };
    
    makeCSS = function() {
        
        makeCSSCore({callback:function(){
        
            makeCSSIElte7({callback:function(){
            
                makeCSSResponsive();
                makeCSSResponsiveIElte6();
                
            }});
            
        }});
        
    };
     
    putCSS = function() {
    
        elements.outputs.cssCore.val(trim(outputs.cssCore));
        elements.outputs.cssCoreIElte7.val(trim(outputs.cssCoreIElte7));
        elements.outputs.cssResponsive.val(trim(outputs.cssResponsive));
        elements.outputs.cssResponsiveIElte6.val(trim(outputs.cssResponsiveIElte6));
        
        elements.outputs.cssCoreTest.html(trim(outputs.cssCore));
        elements.outputs.cssResponsiveTest.html(trim(outputs.cssResponsive));
        
        resizeOutput(elements.outputs.cssCore[0]);
        resizeOutput(elements.outputs.cssCoreIElte7[0]);
        resizeOutput(elements.outputs.cssResponsive[0]);
        resizeOutput(elements.outputs.cssResponsiveIElte6[0]);
        
    };
    
    trim = function(str) {
    
        return str.replace(/^\s+/, '').replace(/\s+$/, '');
        
    }
   
    makeCSSCore = function(o) {
    
        var css = '';
        
        $.ajax('../templates/rizzle.css',{dataType:'text',async:false}).done(function(text) {
            css += smallMoustache({source:text,moustaches:inputs.smallMoustaches});
            outputs.cssCore = css;
            o.callback();
        });
        
    };
    
    makeCSSIElte7 = function(o) {
    
        var css = '';
        
        $.ajax('../templates/rizzle-lte-ie7.css',{dataType:'text',async:false}).done(function(text) {
            css += smallMoustache({source:text,moustaches:inputs.smallMoustaches});
            outputs.cssCoreIElte7 = css;
            o.callback();
        });
        
    };
    
    makeCSSResponsiveIElte6 = function() {
    
        var css = '';
        css += '/* Rizzle 1.0 Responsive Prototyping Classes IE lte 6 CSS */'+db.newline;
        for (b = 0; b < inputs.breakpointsLength; b++) {
            
            bp = '';
            
            if (b > 0) {
                css += db.newline;
                css += db.newline;
                bp = '-b'+b;
                css += '@media all and (min-width:'+inputs.breakpoints[b].at+'px)'+db.space+'{'+db.newline;
            }
            for (i = 0; i < inputs.maxWidthsLength; i++) {
                if (i > 0) {
                    css += db.newline;
                }
                css += '.max'+inputs.maxWidths[i]+bp+db.space+'{width:expression(this.scrollWidth'+db.space+'>'+db.space+inputs.maxWidths[i]+' ? "'+inputs.maxWidths[i]+'px" : "auto")'+db.semicolon+'}';
            }
            if (b > 0) {
                css += db.newline + '}';
            }

            
        }
        outputs.cssResponsiveIElte6 = css;
        
    };
    
    makeCSSResponsive = function() {
        
        var i = 1
        ,   b
        ,   bp
        ,   j
        ,   width
        ,   widths = {}
        ,   widthsi
        ,   position
        ,   positions = {}
        ,   positionsi
        ,   css = ''
        ;
        
        css += '/* Rizzle 1.0 Responsive Prototyping Classes */'+db.newline;
        css += ''+db.newline;
        
        for (b = 0; b < inputs.breakpointsLength; b++) {
            
            bp = '';
            
            if (b > 0) {
            
                bp = '-b'+b;
                
                css += '@media all and (min-width:'+inputs.breakpoints[b].at+'px)'+db.space+'{'+db.newline;
                
                // clear and no clear
                css += '.lay'+bp+db.space+'{float:left;width:100%;}'+db.newline;
                css += '.nolay'+bp+db.space+'{float:none;width:auto;}'+db.newline;
                css += '.clear'+bp+db.space+'{clear:left;}'+db.newline;
                css += '.noclear'+bp+db.space+'{clear:none;}'+db.newline;
                css += db.newline;
                
            }
            
            
            css += '.nut'+bp+db.space+'{margin-left:-'+inputs.breakpoints[b].gutter+'px;}'+db.newline;
            css += '.gut'+bp+db.space+'{margin-left:'+inputs.breakpoints[b].gutter+'px;}'+db.newline;
            css += db.newline;
            
            for (i = 0; i < inputs.maxWidthsLength; i++) {
                css += '.max'+inputs.maxWidths[i]+bp+db.space+'{max-width:'+inputs.maxWidths[i]+'px'+db.semicolon+'}'+db.newline;
            }
            css += db.newline;
            
            css += '.wauto'+bp+db.space+'{width:auto;}'+db.newline;
            css += db.newline;
            
            css += makeWidthClasses({
                columns: inputs.breakpoints[b].columns,
                bp: bp
            });
            css += db.newline;
                                
            css += makePositionClasses({
                columns: inputs.breakpoints[b].columns,
                bp: bp
            });
            css += db.newline;
            
            if (b > 0) {
                css += db.newline + '}';
                css += db.newline;
            }
            
            css += db.newline;
            
        }
        
        outputs.cssResponsive = css;
        
    };
    
    makeWidthClasses = function(o) {
    
        var css = ''
        ,   i = 1
        ,   j
        ,   width
        ,   widths = {}
        ,   widthsi
        ,   notFirst;
        
        // Create an object where the properties are widths and the values are an array of objects with numerators and denominators
        for (i; i <= o.columns; i++) {
            j = 1;
            for (j; j <= o.columns; j++) {
                width = applyDecimalPlaces(100*i/j, inputs.decimalPlaces);
                if (width <= 100) {
                    if (!widths[width]) {
                        widths[width] = [];
                    }
                    widths[width].push({numerator:i, denominator:j});
                }
            }
        }

        // Create the widths classes
        notFirst = false;
        for (i in widths) {
            if (widths.hasOwnProperty(i)) {
                if (notFirst) {
                    css += db.newline;
                }
                else {
                    notFirst = true;
                }
                widthsi = widths[i];
                
                for (j = 0; j < widthsi.length; j++) {
                    if (j > 0) {
                        css += ','+db.space;
                    }
                    css += '.w'+widthsi[j].numerator+'o'+widthsi[j].denominator+o.bp;
                }
            
                css += db.space+'{width:'+i+'%'+db.semicolon+'}';
            }
        }
        
        css += db.newline;
        
        return css;
        
    };
    
    makePositionClasses = function(o) {
    
        var css = ''
        ,   i = 1
        ,   j
        ,   positions = {}
        ,   position;
        
        // Create an object where the properties are widths and the values are an array of objects with numerators and denominators
        for (i; i <= o.columns; i++) {
            j = 1;
            for (j; j <= o.columns; j++) {
                position = applyDecimalPlaces(100*(i-1)/j, inputs.decimalPlaces);
                if (position < 100) {
                    if (!positions[position]) {
                        positions[position] = [];
                    }
                    positions[position].push({numerator:i, denominator:j});
                }
            }
        }    
        // Create the position classes
        if (inputs.positionClasses) {
            notFirst = false;
            for (i in positions) {
                if (positions.hasOwnProperty(i)) {
                    if (notFirst) {
                        css += db.newline;
                        }
                    else {
                        notFirst = true;
                    }
                    positionsi = positions[i];
                    for (j = 0; j < positionsi.length; j++) {
                        if (j > 0) {
                            css += ','+db.space;
                        }
                        css += '.p'+positionsi[j].numerator+'o'+positionsi[j].denominator+o.bp;
                    }
                
                    css += db.space+'{margin-left:'+i+'%'+db.semicolon+'}';
                }
            }
            css += db.newline;
            for (i = 1; i <= o.columns; i++) {
                for (j = 1; j <= o.columns; j++) {
                    if ((i-1)/j < 1) {
                        if (j > 1) {
                            css += ','+db.space;
                        }
                        css += '.p'+i+'o'+j+o.bp;
                    }
                }
            }
            css += db.space+'{margin-right:-100%'+db.semicolon+'}';
        }

        return css;
        
    };
    
    
    resizeOutput = function(el) {
    
        el.style.height = "1px";
        el.style.height = (el.scrollHeight)+"px";
        
    };
    
    applyDecimalPlaces = function(num, decimalPlaces) {
    
        var scaler = Math.pow(10, decimalPlaces);
        return Math.floor(num * scaler)/scaler;
        
    };
    
    run = function() {
        
        getElements();
        
        getInputs();
        
        updateMaxWidths();
        
        db.space = ' ';
        db.newline = "\n";
        db.tab = "\t";
        db.semicolon = ';';
        if (inputs.minify) {
            db.space = '';
            db.newline = '';
            db.tab = '';
            db.semicolon = '';
        }
        
        makeCSS();
        putCSS();
        
        elements.outputs.labelSpan.html(' '+outputs.cssCore.length);
        
    };
    
    updateMaxWidths = function() {
        // for each breakpoint, except 0, add the max width and a 
        // lower and higher value based on the gutter width
        var i
        ,   maxWidths = ''
        ,   at
        ;
        for (i = 1; i < inputs.breakpointsLength; i++) {
            if (i != 1) {
                maxWidths += ',';
            }
            at = inputs.breakpoints[i].at * 1;
            gutter = inputs.breakpoints[i].gutter * 1;
            maxWidths += at - gutter;
            maxWidths += ',';
            maxWidths += at;
            maxWidths += ',';
            maxWidths += at + gutter;
        }
        elements.inputs.maxWidths.val(maxWidths);
    };
    
    inputChange = function() {
        
        run();
        
    };
    
    breakpointAdd = function() {
        elements
    };
    breakpointRemove = function() {
        
    };
    

}(this));