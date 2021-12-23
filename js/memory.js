class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
  }

  shuffleCards() {
    if (!this.cards) return undefined;
    let lengthOfArray = this.cards.length;
    let currentElement;
    let remainingElement;

    while (lengthOfArray) {
  
      remainingElement = Math.floor(Math.random() * lengthOfArray--);
  
      currentElement = this.cards[lengthOfArray];
      this.cards[lengthOfArray] = this.cards[remainingElement];
      this.cards[remainingElement] = currentElement;
    }
  
    return this.cards;
  }

  checkIfPair(card1, card2) {
    this.pairsClicked++;

    if (card1 === card2) {
      this.pairsGuessed++;
      return true;
    } else {
      return false;
    }
  }

  checkIfFinished() {
   if (this.pairsGuessed === 8) {
     return true;
   } else {
     return false;
   }
  }
}

// The following is required for automated testing. Please, ignore it.
if (typeof module !== 'undefined') module.exports = MemoryGame;
