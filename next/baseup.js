/*
// BaseUp JS
*/


// Legacy browser support requires jQuery to work

(function($){

    'use strict';
    
    // isIE
    /* github.com/davesmiths/isIE */var isIE=false,isIEmode;/*@cc_on isIE=@_jscript_version;@*/if(isIE!==false){if(isIE==5.8)isIE=8;else if(isIE==5.7 && window.XMLHttpRequest)isIE=7;else if(isIE==5.7 || isIE==5.6)isIE=6;else if(isIE<=5.5)isIE=5;isIEmode=isIE;if(document.documentMode)isIEmode=document.documentMode;}


    $.fn.baseUp = function(o) {
        
        /*
        //  - Fix for .clear to work when placed after positional floats in IE 6 and 7
        //    - Note clear must not have hasLayout triggered otherwise the fix will fail
        //    - Note Positional floats can also be cleared with a wrapping .lay element
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

        /*
        //  - Fix for .lay .lay-left, lay-right and .lay-centered to ensure positional
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
            
        if (o.legacySupportCols) {
            
            // For IE 6 at the mo, but really it's whether child selector is supported
            if (isIE == 6) {
                this.each(function() {
                
                    var $cols = $this = $(this)
                        ,val
                        ,valLength
                    ;
                    
                    
                    // Cols classes
                    if ($this.find('> .baseup-legacy-support-lay').length) {
                        $cols = $this.find('> .baseup-legacy-support-lay');
                    }
                    
                    $cols.find('> *').not('.clear').each(function() {
                        $(this).addClass('col');
                    });
                    
                    
                    // Widths classes
                    // Copies the class div.widths-blah or div.widths-blah-Nup, renames to width-blah or width-blah-Nup and applies to all children except with .clear class or those already with a width class
                    val = $this.attr('class').match(/\s?widths-[0-9a-z-]+/g);
                    if (val) {
                        valLength = val.length;
                        // Get the last set widths class if more than one is set
                        for (i = 0; i < valLength; i++) {
                            val[i] = val[i].replace('widths', 'width');
                            if (m = val[i].match(/([0-9]+)up$/)) {
                                val[i] = {bp: m[1], val: val[i]};
                            }
                            else {
                                val[i] = {bp: 0, val: val[i]};
                            }
                                
                        }
                        
                        $cols.find('> *').not('.clear').each(function() {
                            var $this = $(this)
                                ,className = $this.attr('class')
                                ,bp
                            ;
                            for (i = 0; i < valLength; i++) {
                                bp = val[i].bp + 'up';
                                if (val[i].bp === 0) {
                                    bp = '';
                                }
                                if (!className.match(new RegExp("/\s?width-[0-9a-z]+"+bp+"/g"))) {
                                    $this.addClass(val[i].val);
                                }
                            }
                        });                        
                    }



                    // Guts Full Width Friendly classes
                    val = $this.attr('class').match(/\s?guts-fw[0-9a-z-]*/g);

                    if (val) {
                        // Get the last set widths class if more than one is set
                        val = val[val.length - 1];
                        val = val.replace('guts-fw', 'gut-left');
                        
                        $cols.find('> * > *').not(".clear, [class^='gut-left-'],[class*=' gut-left-']").each(function() {
                            $(this).addClass(val);
                        });
                    }

                    
                });
                
            }
            // For IE 6 or 7 at the mo, but really it's whether box-sizing border-box is supported
            // CSS hacks used instead for greater transparency
            /*if (isIE == 6 || isIE == 7) {
            
                this.each(function() {
                
                    var $this = $(this)
                        ,val
                    ;
                    
                    // Guts classes: Remove the guts class because the guts class is dependent on border-box
                    val = $this.attr('class').match(/\s?guts(?!-fw)-?[0-9a-z-]+|\s?guts(?!-fw)/g);

                    if (val) {
                        // Get the last set widths class if more than one is set
                        val = val[val.length - 1];
                        $this.removeClass(val);
                        alert(val + ' ' + $this.attr('class'));
                    }
                    
                });
            }*/
            return this;

        }
    };
    
    // Engage legacy support
    $(function() {
        $('.clear').baseUp({legacySupportClear:true});
        $('.lay, .lay-left, .lay-right, .lay-centered').baseUp({legacySupportLay:true});
        $('.cols').baseUp({legacySupportCols:true});
    });

    
}(jQuery));