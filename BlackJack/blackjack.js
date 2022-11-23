
var dealerSum = 0; //Dealer's Score
var yourSum = 0; //Player's Score

var dealerAceCount = 0; //Dealer's ace score
var yourAceCount = 0;  //Player/User's Ace score

// var hidden; //Declare hidden variable
var deck; //Declare deck variable

var canHit = true; //allows the Player to draw while yourSum <= 21

var b=0;
var c=0;

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
     document.getElementById('win').style.visibility = "hidden";
   document.getElementById('win2').style.visibility = "hidden";
   document.getElementById('tie').style.visibility = "hidden";
   document.getElementById('loser').style.visibility = "hidden";
   document.getElementById('loser2').style.visibility = "hidden";


}

function buildDeck() { //Creates the deck of cards
    let cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let cardTypes = ["C", "D", "H", "S"];
    deck = []; //Card Deck array

    recordD=[];
    recordE=[];

    for (let i = 0; i < cardTypes.length; i++) { //create 2 for-loops to create the 52 cards based on the file names.
        for (let j = 0; j < cardValues.length; j++) {
            deck.push(cardValues[j] + "-" + cardTypes[i]); //Links cardValues and cardTypes to i and j in the for-loops and pushes the values into the deck array
        }
    }
    // console.log(deck);
}

function shuffleDeck() { //Create a function shuffleDeck so that the deck shuffles and players dont cheat
    for (let i = 0; i < deck.length; i++) { // Create a for loop to shuffle the deck
        let j = Math.floor(Math.random() * deck.length); //Creates a number between 0 and 1 that's multiplied by the number of cards in the deck.
        let shuffle1 = deck[i]; //Define shuffle 1 as i variable in the for loop
        deck[i] = deck[j]; //define deck [i] as the random number from the rng
        deck[j] = shuffle1; // define shuffle 1 as the random number to shuffle the deck
    }
  
}

function startGame() {
  
    hidden = deck.pop(); // removes a card from the end of the array
    dealerSum += getValue(hidden); //Obtains the value of the card
    dealerAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerSum);
    while (dealerSum < 17) {//Create a while statement if the dealer has a score of less than 17
        //<img src="./cards/5-D.png">
        let cardImg = document.createElement("img"); //Create an image tag 
        let card = deck.pop(); //removes a card from the end of the array
        cardImg.src = "./cards/" + card + ".png"; //Link the card at the end of the array to the corresponding image in the cards folder
        dealerSum += getValue(card); //Adds the value of the card to the dealer's amount
        dealerAceCount += checkAce(card); //Adds to the ace count if the dealer draws an ace
        document.getElementById("dealer-cards").append(cardImg); //Appends (iserts card images) the Card image to the while loop until the dealer has a sum greater than or equal to 17. Forces the dealer to continuously draw cards.
    
  
    }
    console.log(dealerSum);
   

    for (let i = 0; i < 2; i++) { //Create another for loop for the player's card count until the player has 2 cards
        let cardImg = document.createElement("img"); //Create an image tag 
        let card = deck.pop(); //removes a card from the end of the array 
        cardImg.src = "./cards/" + card + ".png"; //Link the card at the end of the array to the corresponding image in the cards folder
        yourSum += getValue(card); //Adds the value of the card to the User's amount
        yourAceCount += checkAce(card); //Adds to the ace count if the User's draws an ace
        document.getElementById("your-cards").append(cardImg); //Appends (iserts card images) the Card image to the for loop until the user has at least 2 cards. Forces the user to continuously draw cards.
    
        c+=1;
        recordE[c] = cardImg.src;
        console.log(c);
    }

    console.log(yourSum);
    document.getElementById("hit").addEventListener("click", hit); //listen for a click then call the function for hit
    document.getElementById("stay").addEventListener("click", stay); //listen for a click then call the function for stay
    
   

}

function hit() { //Define the hit function based on canHit and the player's score above or below 21.
   
 
   if (!canHit) { //If canHit doesnt work
        return; //doesnt return anything
    }
    //allows the player to draw more cards when they click hit.
    let cardImg = document.createElement("img"); //Create an image tag 
    let card = deck.pop(); //removes a card from the end of the array 
    cardImg.src = "./cards/" + card + ".png"; //Link the card at the end of the array to the corresponding image in the cards folder
    yourSum += getValue(card); //Adds the value of the card to the User's amount
    yourAceCount += checkAce(card); //Adds to the ace count if the User's draws an ace
    document.getElementById("your-cards").append(cardImg); //Appends (iserts card images) the Card image as long as the user can click hit and it works. Allows the user to continuously draw cards.

    if (reduceAce(yourSum, yourAceCount) > 21) { //A, J, 8 -> 1 + 10 + 8 If the 
        canHit = false; //makes sure that the hit button doesnt work after the sum is greater than 21.
    }
  

}

function stay() { //Create a function for staying in 
   dealerSum = reduceAce(dealerSum, dealerAceCount); //Defines the dealer's final score
    yourSum = reduceAce(yourSum, yourAceCount); //Defines the Player's final score


    canHit = false; //Prevents the user from clicking hit again after staying
    document.getElementById("hidden").src = "./cards/" + hidden + ".png"; //Obtain the hidden card from the dealer

    let message = "";//Define a veriable called "Message"

    if (yourSum > 21) setTimeout(() =>{ //if your score is greater than 21
       
        
        document.getElementById('loser').style.visibility = "visible";
        message = "You Lose!"; //the dealer wins
            document.getElementById("results").innerText = message; //Outputs the final results in the html file
        
    }, 2000);

    else if (dealerSum > 21) setTimeout(() =>{ //if the dealer's score is greater than 21
       
        message = "You win!"; //the player wins
            document.getElementById("results").innerText = message; //Outputs the final results in the html file
        document.getElementById('win').style.visibility = "visible";

    }, 2000);
    else if (yourSum == dealerSum) setTimeout(() =>{ //if the user and the dealer have the same score 
        message = "Tie!"; //Its a tie
            document.getElementById("results").innerText = message; //Outputs the final results in the html file
        document.getElementById('tie').style.visibility = "visible";

    }, 2000);
    else if (yourSum > dealerSum) setTimeout(() => { //if the player's  score is greater than the dealer
        message = "You Win!"; //the player wins
            document.getElementById("results").innerText = message; //Outputs the final results in the html file
        document.getElementById('win2').style.visibility = "visible";

    }, 2000);
    else if (yourSum < dealerSum) setTimeout(() =>{ //if the player's sum is less than the dealers sum
        message = "You Lose!"; // the dealer wins
            document.getElementById("results").innerText = message; //Outputs the final results in the html file
        document.getElementById('loser2').style.visibility = "visible";

    }, 2000);
    

    document.getElementById("dealer-sum").innerText = dealerSum; //Outputs the dealer's score in the html file
    document.getElementById("your-sum").innerText = yourSum; //Outputs the player's score in the html file
    document.getElementById("results").innerText = message; //Outputs the final results in the html file

    

}

function clickPlayagain() {
     // reset();

     for(i = 0; i<recordD.length; i++) {
console.log(recordD[i]);
document.getElementById("dealer-cards").style.visibility = "hidden";
}
for(j = 0; j<recordE.length; j++) {
console.log(recordE[j]);
document.getElementById("your-cards").style.visibility = "hidden";
}
     dealerSum = 0;
     yourSum = 0;

     dealerAceCount = 0; 
    yourAceCount = 0;

    b=0;
    c=0;

    recordE=[];
    recordD=[];
    deck=[];

    document.getElementById("your-cards").style.visibility = "visible";

    canHit = true;

     buildDeck();
    shuffleDeck();
    startGame();
}

function getValue(card) {
    let data = card.split("-"); // "4-C" -> ["4", "C"]
    let value = data[0];

    if (isNaN(value)) { //Checks if the value is a number or not (J,Q,K,A in image names are not numbers)
        if (value == "A") {
            return 11; // If Its a ace
        }
        return 10; //If its Jack, Queen or King.
    }
    return parseInt(value); //Returns the number value 
}

function checkAce(card) { //Create a function that checks the amount of aces pulled
    if (card[0] == "A") { // "A" means Ace
        return 1; //If the card is an ace, adds to the ace count
    }
    return 0; //If the card is anything but an ace
}

function reduceAce(playerSum, playerAceCount) { //Define a function that will account for the ace being 11 or 1 depending on the user's score.
    while (playerSum > 21 && playerAceCount > 0) { //If the player's score is greater than 21 and they have an ace
        playerSum -= 10; //Reduces the player's score by 10 
        playerAceCount -= 1; //Reduces the ace count at the end so it doesnt continuously drop the player's score
    }
    return playerSum; //Returns the player's score.
}

