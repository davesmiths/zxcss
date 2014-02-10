/*
// BaseUp
*/


// Legacy browser support
(function($){

    'use strict';
    
    // isIE
    /* github.com/davesmiths/isIE */var isIE=false,isIEmode;/*@cc_on isIE=@_jscript_version;@*/if(isIE!==false){if(isIE==5.8)isIE=8;else if(isIE==5.7 && window.XMLHttpRequest)isIE=7;else if(isIE==5.7 || isIE==5.6)isIE=6;else if(isIE<=5.5)isIE=5;isIEmode=isIE;if(document.documentMode)isIEmode=document.documentMode;}


    $.fn.baseUp = function(o) {
        
        /*  - Fix for .clear to work when placed after positional floats in IE 6 and 7
        //  - Note clear must not have hasLayout triggered otherwise the fix will fail
        //  - Note Positional floats can also be cleared with a wrapping .lay element
        */
        if (o.legacySupportClear) {
            if (isIE == 7 || isIE == 6) {
                return this.each(function() {
                    var $this = $(this);
                    if ($this.find('> .baseup-legacy-support-clear-a').length === 0) {
                        $this.prepend('<div class="baseup-legacy-support-clear-a"></div><div class="baseup-legacy-support-clear-b"></div>');
                    }
                });
            }
        }

        /*  - Fix for .lay .lay-left, lay-right and .lay-centered to ensure positional
        //    floats display as expected in IE 6
        */
        if (o.legacySupportLay) {
            if (isIE == 6) {
                return this.each(function() {
                    var $this = $(this);
                    if ($this.find('> .baseup-legacy-support-lay').length === 0) {
                        $this.html('<div class="baseup-legacy-support-lay">'+$this.html()+'</div>');
                    }
                });
            }
        }
        
        
        if (o.legacySupportWidths) {
            if (isIE == 6) {
                return this.each(function() {
                    var $this = $(this)
                        ,val = $this.attr('class').match(/\s?widths-[0-9a-z-]+/g);
                    ;
                    // Get the last set widths class if more than one is set
                    val = val[val.length - 1];
                    val = val.replace('widths', 'width');
                    
                    if ($this.find('> .baseup-legacy-support-lay').length) {
                        $this = $this.find('> .baseup-legacy-support-lay');
                    }
                    
                    $this.find('> *').not(".clear, [class^='width-'],[class*=' width-']").each(function() {
                        $(this).addClass(val);
                    });
                    
                    
                });
            }
        }
        
        
        if (o.legacySupportCols) {
            if (isIE == 6) {
                return this.each(function() {
                    var $this = $(this)
                    ;
                    
                    if ($this.find('> .baseup-legacy-support-lay').length) {
                        $this = $this.find('> .baseup-legacy-support-lay');
                    }
                    
                    $this.find('> *').not('.clear').each(function() {
                        $(this).addClass('col');
                    });
                    
                    
                });
            }
        }
    };
        
}(jQuery));



