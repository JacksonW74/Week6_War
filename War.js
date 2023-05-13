/*-creating an automated version of the classic card game WAR! There are many versions of the game WAR. In this version there are only 2 players.
-You do not need to do anything special when there is a tie in a round.
-Think about how you would build this project and write your plan down. 
-Consider classes such as: Card, Deck, Player, as well as what properties and methods they may include. 
-You do not need to accept any user input, when you run your code, the entire game should play out instantly without any user input inside of your browser’s console.
--The completed project should, when executed, do the following:
-Deal 26 Cards to each Player from a Deck of 52 cards.
-Iterate through the turns where each Player plays a Card.
-The Player who played the higher card is awarded a point
-Ties result in zero points for both Players
-After all cards have been played, display the score and declare the winner.
-Write a Unit Test using Mocha and Chai for at least one of the functions you write.
*/
//Create players
class Player {
    constructor(name) {
      this.name = name; //set the name of the player
      this.hand = [];   //initialize the player's hand to an empty array
      this.score = 0;   //initialize the player's score to zero
    }
    //add a card to the player's hand
    push(card) {
    this.hand.push(card);
    }
    //play a card for the player's hand
    playCard() {
      if (this.hand.length === 0) {
        throw new Error(`${this.name}'s hand is empty!`); 
      }  //error check to ensure players have cards
      return this.hand.shift();
    }
        
      //get the number of cards in the player's hand
      get length() {
        return this.hand.length;
      }
      //add points to the player's score
      updateScore(points) {
        this.score += points;
      }
    }

// Create a new deck and shuffle it
class Card {
    constructor(rank, suit, value) {
      this.rank = rank;
      this.suit = suit;
      this.value = value;
    }
  }

class Deck {
    constructor() {
      this._cards = [];
    };
  
    get cards() {
      return this._cards;
    }
  
    buildDeck() {
      this.populate();
      this.shuffle();
      return this._cards;
    }
  //create 52 cards
    populate() {
      const suits = ['♠️', '♥️', '♦️', '♣️'];
      const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
      const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  
      for (let i=0; i < suits.length; i++) {
        for (let j = 0; j < ranks.length; j++) {
          this._cards.push(new Card(ranks[j], suits[i], values [j]));
        }
      }
    }
    shuffle() {
  
      if (this._cards.length > 0) {
        const shuffleDeck = this._cards.sort(() => Math.random() - 0.5)
        this._cards = [...shuffleDeck];
      }
    }
  }

const deck = new Deck();
deck.buildDeck();
console.log(deck.cards);

// Create the players
const player1 = new Player('Player 1');
const player2 = new Player('Player 2');

// Deal the cards to the players
for (let i = 0; i < deck.cards.length; i++) {
  if (i % 2 === 0) {
    player1.push(deck.cards[i]);
  } else {
    player2.push(deck.cards[i]);
  }
}

// Play the game
let round = 1;

while (player1.length > 0 && player2.length > 0) {
    console.log(`Round ${round}`);

    const card1 = player1.playCard(); //player 1 plays a card
    const card2 = player2.playCard(); //player 2 plays a card

    console.log(`player 1: ${card1.rank} of ${card1.suit}`); 
    console.log(`player 2: ${card2.rank} of ${card2.suit}`);

    if (card1.value > card2.value) { // if player 1's card is higher than player 2's card
        console.log('Player 1 wins the round'); 
        player1.updateScore(1); // add a point to player 1's score
    } else if (card1.value < card2.value) { // if player 2's card is higher than player 1's card
        console.log('Player 2 wins the round');
        player2.updateScore(1); // add a point to player
    } else {
        console.log('Tie!');
    }

    round++;
}

//Declaring the winner

if (player1.score > player2.score) {
  console.log(`Player 1 wins the game with a score of ${player1.score} to ${player2.score} ✌️`);
} else if (player1.score < player2.score) {
  console.log(`Player 2 wins the game with a score of ${player2.score} to ${player1.score} 🎉`);
} else {
  console.log(`The game ended in a tie with a score of ${player1.score} to ${player2.score} 😕`);
}
//Declaring number of rounds played
console.log(`The game lasted ${round -1} rounds 🎆`);
