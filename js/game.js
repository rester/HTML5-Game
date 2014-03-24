$(window).load(function(){
            game.init();
           });

var game = {
    init:function(){
        loader.init();
              
        $('.gamelayer').hide();
        $('#gamestartscreen').show();
        
        game.backgroundCanvas = document.getElementById('gamebackgroundcanvas');
        game.backgroundContext = game.backgroundCanvas.getContext('2d');
        
        game.foregroundCanvas = document.getElementById('gameforegroundcanvas');
        game.foregroundContext = document.getElementById('2d');
        
        game.canvasWidth = game.backgroundCanvas.width;
        game.canvasHeight = game.backgroundCanvas.height;

        
    },
    
    start:function(){
        $('.gamelayer').hide();
        $('#gameinterfacescreen').show();
        game.running = true;
        game.refreshBackground = true;
        
        game.drawingLoop();
    },
    
    // o mapa é quebrada entre quadros 20px x 20px
    grid:20,
    
    // armazena se o background se mexeu e precisa ser redesenhado
    background: true,
    
    // controle do laco que roda e fixa o periodo de tempo
    animationTimeout: 100, // 100 milisegundos ou 10 vezes por segundo
    offsetX: 0,  // X & Y offset do mapa
    offsetY: 0,
    animationLoop: function(){
        
        // anima cada elemento junto com o jogo, estará a parte lógica do jogo, tratando os tempos do jogos, processamento de comandos, mudança de estados do sprite, também o controle de movimento das unidades assim a separação da animação e o desenhar torna-se importante para um jogo multiplayer. Assim se um dos browser demorar mais que 100 milisegundos, a outra ação nao será executada até que este ciclo seja completo.
    },
    
    drawingLoop: function() {
        // offset do mapa ??
        // somente redesenha o mapa se o background muda. devido a janela por isso 2 canvas (otimizaçao)
        if(game.refreshBackground){
            game.backgroundContext.drawImage(game.currentMapImage,game.offsetX,game.offsetY, game.canvasWidth,game.canvasHeight, 0,0,game.canvasWidth,game.canvasHeight);
            game.refreshBackground = false;     
        }
        
        // chama o drawing loop para o proximo frame usando o request animation frame
        if(game.running){
            requestAnimationFrame(game.drawingLoop);    
        }
        
    },
}