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
const jugador1 = document.querySelectorAll('small');


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

// Events
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    jugador1[0].innerText = puntosJugador;
    console.log(puntosJugador);
});
