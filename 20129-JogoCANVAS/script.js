    var objCanvas = null;
    var objContexto = null;
    var imgFundo = new Image();
    imgFundo.src = "fundo.png"
    
    var pontos = 0;
    var recordPontos = 0;
    var recordTempo = 0;
    var tempoAtual = 0;
    var segundos;

    var dificuldade;
    var comecou = false

    var v
    var vMonstro

    var xHeroi = 10;
    var yHeroi = 10;
    var imgHeroi = new Image();
    imgHeroi.src = "heroi.png"

    var distHeroiMonstroX = xHeroi - xMonstro;
    var distHeroiMonstroY = yHeroi - yMonstro;
    

    var xMonstro = 470;
    var yMonstro = 430;
    var imgMonstro = new Image();
    imgMonstro.src = "monstro.png";

    var imgGraveto = new Image();
    imgGraveto.src = "graveto.png"
    var xGraveto = -100;
    var yGraveto = -100;
    var jaAcertou = false;
    function iniciar(){
        objCanvas = document.getElementById("meuCanvas");
        objContexto = objCanvas.getContext("2d");
        objContexto.drawImage(imgFundo,0,0);

        atualizaTela();
    }
    function atualizaTela(){
        objContexto.drawImage(imgFundo,0,0);
        objContexto.drawImage(imgHeroi,xHeroi,yHeroi);
        objContexto.drawImage(imgMonstro,xMonstro,yMonstro);
        objContexto.drawImage(imgGraveto,xGraveto,yGraveto);
    }
    function ativarMovMonstro(){
        vMonstro = setInterval(MovimentoDoMonstro, 100)
        comecou = true;
        segundos = setInterval(marcarTempo, 100)
    }
    function MovimentoDoMonstro(){
        if(xMonstro != xHeroi || yMonstro != yHeroi){
            if(xMonstro < xHeroi && xMonstro + dificuldade < 480){
                xMonstro += dificuldade;
                atualizaTela();
            } else if(xMonstro - dificuldade > 0){
                xMonstro -= dificuldade;
                atualizaTela();
            }
            if(yMonstro < yHeroi && yMonstro + dificuldade < 440){
                yMonstro += dificuldade;
                atualizaTela();
            } else if(yMonstro - dificuldade > 0){
                yMonstro -= dificuldade;
                atualizaTela();
            }
        }
        if((xMonstro - xHeroi < 1 && xMonstro - xHeroi > -1) && (yMonstro - yHeroi < 1 && yMonstro - yHeroi > -1)){
            alert("O monstro alcançou você! Mais sorte na próxima")
            pontos = 0;
            xHeroi = 10;
            yHeroi = 10;
            xMonstro = 470;
            yMonstro = 430;
            comecou = false;
            document.getElementById("ponto").innerHTML = `Pontuação: ${pontos}`;
            tempoAtual = 0;
            clearInterval(vMonstro);
            clearInterval(segundos);
            document.getElementById("record").innerHTML = `<td>${recordPontos}</td><td>${recordTempo.toFixed(1) + " segundos"}</td>`;
        }
    }
    function movimentarHeroi(key){
        if(key==115 || key == 83) //S
        {
            if(yHeroi + 20 < 440)
            {
                yHeroi += 20;
            }
        }
        if(key == 119 || key == 87) //W
        {
            if(yHeroi - 20 > 0)
            {
                yHeroi -= 20;
            }        
        }
        if(key == 100 || key == 68) //D
        {
            if(xHeroi + 20 < 480)
            {
                xHeroi += 20;
            }       
        }
        if(key == 97 || key == 65) //A
        {
            if(xHeroi - 20 > 0)
            {
                xHeroi -= 20;
            }
        }
        if(key == 111 || key == 79) //O 
        {
            clearInterval(v);
            xGraveto = xHeroi;
            yGraveto = yHeroi;
            if(yGraveto > 0)
            {
                v = setInterval(jogarGraveto, 1)               
            } 
        }
        if(key == 76 || key == 108) //L
        {
            clearInterval(v);
            xGraveto = xHeroi;
            yGraveto = yHeroi;
            if(yGraveto < 440)
            {
                v = setInterval(jogarGravetoBaixo, 1)               
            } 
        }
        jaAcertou = false
        atualizaTela();
    }
    function jogarGraveto(){
        if(yGraveto > 0)
        {
            yGraveto--;
            atualizaTela();
        }else{
            clearInterval(v)
        }
        var distGravetoMonstroY = yGraveto - yMonstro;
        var distGravetoMonstroX = xGraveto - xMonstro;
        if((distGravetoMonstroY < 5 && distGravetoMonstroY > -5) && (distGravetoMonstroX < 5 && distGravetoMonstroX > -5)){
            if(comecou && !jaAcertou)
            {
                pontos++
                jaAcertou = true
                document.getElementById("ponto").innerHTML = `Pontuação: ${pontos}`;
                if(pontos > recordPontos){
                    recordPontos = pontos;
                }
            }
        }
    }
    function jogarGravetoBaixo(){
        if(yGraveto < 440)
        {
            yGraveto++;
            atualizaTela();
        }else{
            clearInterval(v)
        }
        var distGravetoMonstroY = yGraveto - yMonstro;
        var distGravetoMonstroX = xGraveto - xMonstro;
        if((distGravetoMonstroY < 5 && distGravetoMonstroY > -5) && (distGravetoMonstroX < 5 && distGravetoMonstroX > -5)){
            if(comecou && !jaAcertou)
            {
                jaAcertou = true
                pontos++
                document.getElementById("ponto").innerHTML = `Pontuação: ${pontos}`;
            }
        }
    }
    function comoJogar(){
        alert("A movimentação consiste no WASD sendo W- para cima A- esquerda S- para baixo D- direita");
        alert("Você ganha pontos acertando o graveto no monstro, apertando O para atirar para cima e L para atirar para baixo")
        alert("Escolha a dificuldade, se posicione e aperte em começar, bom jogo!")
    }
    function facil(){
        return dificuldade = 5;
    }
    function medio(){
        return dificuldade = 8;
    }
    function dificil(){
        dificuldade = 12;
    }
    function marcarTempo(){
        tempoAtual += 0.1;
        if(tempoAtual > recordTempo){
            recordTempo = tempoAtual;
        }
    }