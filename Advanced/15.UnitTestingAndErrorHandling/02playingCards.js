function playingCards(face, suit) {
    const validCardFace = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const cardSuits = {
        'S': '\u2660',
        'H': '\u2665',
        'D': '\u2666',
        'C': '\u2663',

    }
    if (validCardFace.includes(face) == false) {
        throw new Error('Invalid Face');
    }
    if (Object.keys(cardSuits).includes(suit) == false) {
        throw new Error('Invalid Suit');
    }


    return {
        face,
        suit: cardSuits[suit],
        toString() {
            return this.face + this.suit;
        }
    }
};

console.log(playingCards('A', 'S').toString());
console.log(playingCards('10', 'H').toString());
console.log(playingCards('1', 'C').toString());