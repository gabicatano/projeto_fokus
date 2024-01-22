const html = document.querySelector('html');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');

const botaoComecar = document.querySelector('#start-pause');
const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoCurto = document.querySelector('.app__card-button--curto');
const botaoLongo = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
const botaoPausar = document.querySelector('#start-pause span');

const musicaFoco = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;
const somInicio = new Audio('/sons/play.wav');
const somPausa = new Audio('/sons/pause.mp3');
const somAcabou = new Audio('/sons/beep.mp3');

const tempoNaTela = document.querySelector('#timer');

let temporizador = 1500;
let intervaloId = null;

musicaFoco.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    } else {
        musica.pause();
    }
})

botaoFoco.addEventListener('click', () => {
    temporizador = 1500;
    alterarContexto('foco');
    botaoFoco.classList.add('active');
});

botaoCurto.addEventListener('click', () => {
    temporizador = 300;
    alterarContexto('descanso-curto');
    botaoCurto.classList.add('active');
});

botaoLongo.addEventListener('click', () => {
    temporizador = 900;
    alterarContexto('descanso-longo');
    botaoLongo.classList.add('active');
});

function alterarContexto(contexto){
    mostraTempo();
    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto){
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade, <br>
            <strong class='app__title-strong'>mergulhe no que importa.</strong>`

            break;

        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada? <br>
            <strong class='app__title-strong'>Faça uma pausa curta!</strong>`

            break;

        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície. <br>
            <strong class='app__title-strong'>Faça uma pausa longa.</strong>`

        default:
            break;     

    }
}

const contagemRegressiva = () => {
    if(temporizador <= 0){
        somAcabou.play();
        alert('Tempo finalizado!');
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if(focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento)
        }
        zerarTempo();
        return;
    }
    temporizador -= 1;
    mostraTempo();
}

botaoComecar.addEventListener('click', iniciarPausar);

function iniciarPausar(){
    if(intervaloId){
        somPausa.play();
        zerarTempo();
        return;
    }
    somInicio.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    botaoPausar.textContent = "Pausar";
}


function zerarTempo(){
    clearInterval(intervaloId);
    botaoPausar.textContent = "Começar";
    intervaloId = null;
}

function mostraTempo(){
    const tempo = new Date(temporizador*1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}


mostraTempo();




