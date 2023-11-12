function deckOfCards(array) {
    const result = [];

    for (let card of array) {
        let face = card.slice(0, -1);
        let suit = card.slice(-1);

        try {
            result.push(playingCards(face, suit));

        } catch (err) {
            console.log('Invalid card: ' + face + suit);
            return;
        }

    }


    console.log(result.join(' '));

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
};

deckOfCards(['AS', '10D', 'KH', '2C']);
deckOfCards(['5S', '3D', 'QD', '1C']);