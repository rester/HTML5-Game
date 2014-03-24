var singleplayer = {
    // comeca com single player campanha
    start: function(){
        //esconde o menu inicial
        $('.gamelayer').hide();
        
        // comeca com o primeiro nível
        singleplayer.currentLevel = 0;
        game.type = "singleplayer";
        game.team = "blue";
        
        // comeca de fato o leval atual
        singleplayer.startCurrentLevel();
    },
    
    exit: function(){
     //mostra o menu inicial
        $('.gamelayer').hide();
        $('#gamestartscreen').show();
    },
    currentLevel:0,
    startCurrentLevel: function(){
        //carrega todos objetos do nível
        var level = maps.singleplayer[singleplayer.currentLevel];
        
        // nao deixa o jogador entrar em qualquer missao até carregar todas as conf. do nível carregado 
        $("#entermission").attr("disabled",true);
        
        //carrega as  conf. da var level (que contem características do nível)
        game.currentMapImage = loader.loadImage(level.mapImage);
        game.currentLevel = level;
        
        game.offsetX = level.startX * game.gridSize;
	    game.offsetY = level.startY * game.gridSize;
        
        //habilita os botões para acesso à missao, uma vez que todas conf. estejam setadas
        if(loader.loaded){
            $("#entermission").removeAttr("disabled");
        
        }else{
            loader.onload = function() {
                 $("#entermission").removeAttr("disabled");   
            }
        }
        
        // carrega a janela de missao com a corrente instrucao
        $('#missionbriefing').html(level.briefing.replace('\n','<br><br>'));
        $("#missionscreen").show();
    },
    
    play: function(){
        game.animationLoop();
        game.animationInterval = setInterval(game.animationLoop, game.animationTimeout);
        game.start();
    },
    
    
};