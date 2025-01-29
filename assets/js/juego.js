/**
    * 2C = Two of Clubs (Tréboles)
    * 2D = Two of Diamonds (Diamantes)
    * 2H = Two of Hearts (Corazones)
    * 2S = Two of Spades (Espadas)
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;

const btnPedir = document.querySelector('#btnPedir');
const puntos = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const btnDetener = document.querySelector('#btnDetener');

const btnNuevo = document.querySelector('#btnNuevo');

//Make a new deck
const crearDeck = () => {
    for (let i = 2; i<=10; i++) {
        for ( let tipo of tipos) {
            deck.push(i + tipo);
        }
    }
    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    // console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}


crearDeck();

// This function allow take a card
const pedirCarta = () => {

    if(deck.length === 0){
        throw 'NO hay mas cartas';
    }

    const carta = deck.pop();

    return carta;
}

//pedirCarta();

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ? 
            (valor === 'A') ? 11 : 10 
            : valor * 1;
                            
    // if(isNaN(valor)){
    //     puntos = (valor === 'A') ? 11 : 10;
    // } else {
    //     puntos = valor * 1;
    // }

    // console.log(puntos);
}

const turnoComputadora = (puntosMinimos) =>{
    do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntos[1].innerText = puntosComputadora;
        // <img class="carta" src="assets/cartas/cartas/10D.png">
    
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }
    
    }   while((puntosComputadora<=puntosMinimos) && (puntosMinimos<=21));

    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert('Nadie gana :(');
        } else if(puntosMinimos > 21){
            alert('La Computadora Gana');
        } else if(puntosComputadora > 21){
            alert('Jugador Gana');
        } else {
            alert('La Computadora Gana');
        }
    }, 100);
}

// Events
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntos[0].innerText = puntosJugador;
    // <img class="carta" src="assets/cartas/cartas/10D.png">

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if(puntosJugador > 21){
        console.warn('LOOOOOOSER');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21){
        console.warn('21, NICE');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
    console.clear();
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    deck = [];
    crearDeck();
    puntosComputadora = 0;
    puntosJugador = 0;
    puntos[0].innerText = 0;
    puntos[1].innerText = 0;
    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';
});
