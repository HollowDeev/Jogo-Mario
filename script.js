const mario = document.querySelector('.mario')
const tubo = document.querySelector('.tubo')
const nuvens = document.querySelector('.nuvens')
const inicio = document.querySelector('.comecar')
const pontos = document.querySelector('.pontos')
const fim = document.querySelector('.fim')
const campoInicio = document.querySelector('.campo-comecar')
const campoJogo = document.querySelector('.campo-jogo')
const audioDiv = document.querySelector('.audio')
const somTema = new Audio('audio/somTema.mp3')
const fimdejogoTema = new Audio('audio/fimdejogoTema.mp3')
const textoCreditos = document.querySelector('.texto-creditos')
const campoCreditos = document.querySelector('.creditos')

audioDiv.appendChild(somTema)
audioDiv.appendChild(fimdejogoTema)

window.addEventListener('load', () => {
    textoCreditos.classList.add('fade')
    textoCreditos.addEventListener('animationend', () => {
        campoCreditos.style.display = 'none'
    })
})

function reiniciar () {
    tubo.classList.add('movimentoTubo')
    tubo.style.left = ''
    tubo.style.right = '-80px'
        
    nuvens.classList.add('movimentoNuvens')
    nuvens.style.left = ''
    nuvens.style.right = `-650px`

    mario.style.bottom = `0px`

    mario.src = 'images/super mario world.gif'
    mario.style.width = '150px'
    mario.style.marginLeft = '0px'

    fim.style.display = 'none'
    
    valorPontos = 0 
    pontos.textContent = valorPontos
    
    fimdejogoTema.pause()
    fimdejogoTema.currentTime = 0
    somTema.play()

    loop()
}

function iniciar () {
    inicio.style.display = 'none'
    campoInicio.style.display = 'none'
    campoJogo.style.display= 'flex'
    somTema.play()
    
    tubo.classList.add('movimentoTubo')
    nuvens.classList.add('movimentoNuvens')
}

function pular (){
    mario.classList.add('pular')

    addPontuacao()       

    setTimeout(()=> {
        mario.classList.remove('pular')
    }, 450)
}

let tempoTubo = 1500

let valorPontos = 0

function addPontuacao () {
    
    valorPontos = valorPontos +1
    pontos.textContent = valorPontos

    if (valorPontos === 3) {
        tubo.addEventListener('animationend', () => {
            tubo.style.animationDuration = '0.5s'
        })
        // setTimeout(() => {
        //     tubo.style.animationDuration = '1s'
        // }, 400)
    }
}

function removePontuacao () {
    valorPontos = valorPontos -1
    pontos.textContent = valorPontos
}

    const loop = () => { 
        let loopId = 0
        loopId = setInterval(() => {

        const posicaoTubo = tubo.offsetLeft 
        const posicaoNuvem = nuvens.offsetLeft 
        const posicaoMario = +window.getComputedStyle(mario).bottom.replace('px', '')
    
        if (posicaoTubo <= 117 && posicaoTubo > 0 && posicaoMario <= 105) {
            tubo.classList.remove('movimentoTubo')
            tubo.style.left = `${posicaoTubo}px`
    
            
            nuvens.classList.remove('movimentoNuvens')
            nuvens.style.left = `${posicaoNuvem}px`
    
    
            mario.classList.remove('pular')
            mario.style.bottom = `${posicaoMario}px`
    
            mario.src = 'images/game-over.png'
            mario.style.width = '75px'
            mario.style.marginLeft = '45px'
    
            fim.style.display = 'flex'
            if (valorPontos != 0 ) {
                removePontuacao()
            }

            somTema.pause()
            somTema.currentTime = 0
            fimdejogoTema.play()
    
            clearInterval(loopId)

        }
    
    }, 10)
}


loop()

document.addEventListener('keydown', pular)

