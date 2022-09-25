

class Card {
  constructor(suit, rank, score) {
    this.suit = suit
    this.rank = rank
    this.score = score
    
  }
}

class Deck {
  constructor() {
    this.cards = []
    this.createCards()
    this.shuffle()
    
  }
  
  createCards() {
    let suits = ["Hearts", "Clubs", "Spades", "Diamonds"]
    let ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"]
    let score = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        this.cards.push(new Card(suits[i], ranks[j], score[j]))
        
      }
    }
  }
  draw(){
    return this.cards.pop()
  }
  shuffle() {
    let currentIndex = this.cards.length,  randomIndex;
    
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      
      [this.cards[currentIndex], this.cards[randomIndex]] = [
        this.cards[randomIndex], this.cards[currentIndex]];
      }
      
      return this.cards;
    }
}


class GameOfWar {
  constructor() {
    this.playerOne = [];
    this.playerTwo = [];
    this.pile = [];
    this.gameSetup() //auto initializes a new deck when a GameOfWar class is created and splits cards to player one and two
    this.gamePlay()
  }
  gameSetup() {
    let deck  = new Deck()   //initializes a new deck
    this.cards = deck.cards //cards pertaining to this deck
    this.deal() //splits cards into two separate arrays for player one and two
  }
  deal() { 
    this.playerOne.push(...this.cards.slice(0, this.cards.length / 2)) //splits first 26 cards to player one
    this.playerTwo.push(...this.cards.slice(this.cards.length / 2)) // splits the rest of the cards to player two

  }
  gamePlay() {
    while (this.playerOne.length > 0 && this.playerTwo.length > 0) {
      let p1Card = this.playerOne.pop(); // {rank: "Queen", suit: "Spade", score: 12}
      let p2Card = this.playerTwo.pop();
    
      if (p1Card.score > p2Card.score) {
        this.playerOne.push(p1Card, p2Card, ...this.pile)
        console.log(`the winner of this round is player 1`);
        this.pile.length = 0
      }
      else if (p1Card.score < p2Card.score) {
        this.playerTwo.push(p1Card, p2Card, ...this.pile)
        console.log(`the winner of this round is player 2`);
        this.pile.length = 0
      }
      else if (p1Card.score === p2Card.score) {
        this.war(p1Card, p2Card)
      }
    }

    if (this.playerOne.length > 0) {
      console.log("player 1 wins", this.playerOne.length)
    } else {
      console.log("player 2 wins", this.playerTwo.length)
    }
  }
  
  war(c1, c2) {
    console.log("i declare war")
    this.pile.push(c1, c2)
    
    if (this.playerOne.length >= 4 && this.playerTwo.length >= 4) {
      this.pile.push(...this.playerOne.splice(this.playerOne.length - 3, 3))
      this.pile.push(...this.playerTwo.splice(this.playerTwo.length - 3, 3))
    } else if (this.playerOne.length < 4 && this.playerTwo.length >= 4) {
      this.playerTwo.unshift(...this.pile)
      this.playerTwo.unshift(...this.playerOne)
      this.playerOne.length = 0
      this.pile.length = 0
    } else {
      this.playerOne.unshift(...this.pile)
      this.playerOne.unshift(...this.playerTwo)
      this.playerTwo.length = 0
      this.pile.length = 0
    }
  }
}

const initGame = new GameOfWar();
