/*
/* Small Moustache
/* Version 1.0 Dave Smith 2013 September
/* A small one trick JS templater
/*
/* Usage
/* var source = 'asd {{layout}} asd';
/* var moustaches = {};
/* moustache['ns'] = '';
/* moustache['layout'] = 'layout';
/* moustache['column'] = 'column';
/* moustache['layout-gutter'] = 'layout-gutter';
/* moustache['layout-centered'] = 'layout-centered';
/* moustache['layout-clear'] = 'layout-clear';
/* moustache['layout-clear-ie6and7fixp1'] = 'layout-clear-ie6and7fixp1';
/* moustache['layout-clear-ie6and7fixp2'] = 'layout-clear-ie6and7fixp2';
/* moustache['layout-gutter-centered-ie6fix'] = 'layout-gutter-centered-ie6fix';
/* moustache['rizzlecssproperty'] = 'rizzlecssproperty';
/*
/* smallMoustache({
/*     moustaches: moustaches,
/*     source: source
/* });
/* 
*/
(function(context) {
    
    var replaceMoustaches = function(obj) {
        
        var moustaches = obj.moustaches
        ,   source = obj.source
        ;
        
        for (i in moustaches) {
            if (moustaches.hasOwnProperty(i)) {
                source = source.replace(new RegExp('\\{\\{'+i+'\\}\\}', 'g'), moustaches[i]);
            }
        }
        return source;
    };
    
    context.smallMoustache = replaceMoustaches;
    
}(this));







