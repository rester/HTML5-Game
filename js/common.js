//animacao do game (usado em qualquer aplicao com animacoes)
(function() {
    var lastTime = 0;
    var vendors = ['ms',';','webkit','o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {        
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];        
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {           
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;        
        };      
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) { clearTimeout(id);};
    
}());

var loader = { // classe usada para carregar: imagens e sons (tela de carregar)
    loaded:true,
    loadedCount:0,// dados carregados
    totalCount:0,// numero de dados que precisa para ser carregado
    
    init:function(){
        // verifica o suporte de som
        var mp3Support, oggSupport;
        var audio = document.createElement('audio');
        if(audio.canPlayType){ // retorno de canPlayType: "", "maybe", "probably"
            mp3Support = "" != audio.canPlayType('audio/mpeg');
            oggSupport = "" != audio.canPlayType('audio/ogg; codecs="vorbis"');
        
        }else{ // o elemento nao eh suportado
            mp3Support = false;
            oggSupport = false;
        
        }
        // verifica por .ogg, depois .mp3 e se nenhum por undefined.
        loader.soundFileExtn = oggSupport?".ogg":mp3Support?".mp3":undefined;
    },
    
    loadImage:function(url){
        this.totalCount++;
        this.loaded = false;
        $('#loadingscreen').show();
        var image = new Image();
        image.src = url;
        image.onload =  loader.itemLoaded;
        return image;
        
    },
    
    soundFileExtn : ".ogg",
    loadSound:function(url){
        this.totalCount++;
        this.loaded = false;
        $('#loadingscreen').show();
        var audio = new Audio();
        audio.src = url+loader.soundFileExtn;
        audio.addEventListener("canplaythrough", loader.itemLoaded, false);
        return audio;
    },
    
    itemLoaded:function(){
        loader.loadedCount++;
        $('#loadingmessage').html('Carregado '+loader.loadedCount+' de '+loader.totalCount);
        if(loader.loadedCount == loader.totalCount){
            loader.loaded = true;
            $('#loadingscreen').hide();
            if(loader.onload){
                loader.onload();
                loader.onload = undefined;               
            }
        }
    }
    
}