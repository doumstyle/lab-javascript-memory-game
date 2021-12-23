const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

// Constants
const memoryGame = new MemoryGame(cards);
const cardElement = document.querySelector('.card');
const pairsClickedElement = document.querySelector('#pairs-clicked');
const pairsGuessedElement = document.querySelector('#pairs-guessed');
const endgame = document.querySelector('.endgame');

let cardFlippedTimeout = 0;

// Helpers functions
const updateScore = () => {
	pairsClickedElement.textContent = memoryGame.pairsClicked;
	pairsGuessedElement.textContent = memoryGame.pairsGuessed;
}

const endgameMsg = () => {
	endgame.textContent = "Congratulations Avenger! You Win!!";
}

const block = (card) => {
	card.classList.toggle('blocked');
}

const flip = (card) => {
	card.classList.toggle('turned');
}

const checkPairing = () => {
	const card1Name = memoryGame.pickedCards[0].getAttribute('data-card-name');
	const card2Name = memoryGame.pickedCards[1].getAttribute('data-card-name');

	if (memoryGame.checkIfPair(card1Name, card2Name)) {
		block(memoryGame.pickedCards[0]);
		block(memoryGame.pickedCards[1]);
		
		if (memoryGame.checkIfFinished()) {
			endgameMsg();
		}
	} else {
		flip(memoryGame.pickedCards[0]);
		flip(memoryGame.pickedCards[1]);
	}

	memoryGame.pickedCards = [];
	updateScore();
	clearTimeout(cardFlippedTimeout);

}

window.addEventListener('load', (event) => {
	memoryGame.shuffleCards();
  let html = '';
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      flip(card);
			memoryGame.pickedCards.push(card);
			
			if (memoryGame.pickedCards.length === 2) {
				cardFlippedTimeout = setTimeout(() => {
					checkPairing();
				}, 1000)
			}
    });
  });
});
