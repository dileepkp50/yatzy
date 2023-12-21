// Variables to store game state
let dicedata = Array(5).fill(1); // Array to store dice values, initially set to all 1s
let rollsremaining = 3; // Number of remaining rolls
let totalscore = 0; // Total score
let one1 = 0; // Score for ones
let two2 = 0; // Score for twos
let three3 = 0; // Score for threes
let four4 = 0; // Score for fours
let five5 = 0; // Score for fives
let six6 = 0; // Score for sixes
let bonus = 0; // Bonus score
let pair = 0; // Score for pairs
let twoPair = 0; // Score for two pairs
let threeOfAKind = 0; // Score for three of a kind
let fourOfAKind = 0; // Score for four of a kind
let fullHouse = 0; // Score for a full house
let smallStraight = 0; // Score for a small straight
let largeStraight = 0; // Score for a large straight
let chance = 0; // Score for chance
let yatzy = 0; // Score for Yatzy
let totalScore; // Total score including all categories

// Function to simulate rolling the dice
function rollDice() {
    if (rollsremaining > 0) {
        // Randomly update dice values for the ones that are not "kept" (marked as 0)
        dicedata = dicedata.map((value, index) => (dicedata[index] === 0) ? value : Math.floor(Math.random() * 6) + 1);

        // Update the displayed dice values on the UI
        updatedicevalue();

        // Update the score data for each category
        updateScoredata();

        // Decrease the remaining rolls count
        rollsremaining--;

        // Update the displayed rolls remaining on the UI
        updaterollsbalance();
    }
}

// Function to toggle whether a die is "kept" or not
function toggledata(index) {
    dicedata[index] = (dicedata[index] === 0) ? 1 : 0;
    updatedicevalue();
}

// Function to update the displayed dice values on the UI
function updatedicevalue() {
    const diceContainer = document.getElementById("dices");
    const diceElements = diceContainer.getElementsByTagName("div");

    Array.from(diceElements).forEach((diceElement, index) => {
        diceElement.textContent = dicedata[index];
    });
}

// Function to update the displayed rolls remaining on the UI
function updaterollsbalance() {
    const elementinfo = document.getElementById("info");
    elementinfo.textContent = `Rolls Remaining: ${rollsremaining}`;
}

// Function to update the score data for each category
function updateScoredata() {
    one1 = calculatescore(1);
    two2 = calculatescore(2);
    three3 = calculatescore(3);
    four4 = calculatescore(4);
    five5 = calculatescore(5);
    six6 = calculatescore(6);
    bonus = (one1 + two2 + three3 + four4 + five5 + six6 >= 63) ? 50 : 0;
    pair = calculatePair();
    twoPair = calculateTwoPair();
    threeOfAKind = calculateNOfAKind(3);
    fourOfAKind = calculateNOfAKind(4);
    fullHouse = calculateFullHouse();
    smallStraight = calculateSmallStraight();
    largeStraight = calculateLargeStraight();
    chance = calculateChance();
    yatzy = calculateNOfAKind(5);

    // Update the displayed scores on the UI
    updatescoredicevalue();
}

// Function to calculate the score for a specific value 
function calculatescore(value) {
    return dicedata.reduce((sum, die) => (die === value) ? sum + value : 0);
}

// Function to calculate the score for a pair
function calculatePair() {
    const sortedice = dicedata.slice().sort((a, b) => b - a);
    for (let i = 0; i < sortedice.length - 1; i++) {
        if (sortedice[i] === sortedice[i + 1]) {
            return sortedice[i] * 2;
        }
    }
    return 0;
}

// Function to calculate the score for two pairs
function calculateTwoPair() {
    const sortedice = dicedata.slice().sort((a, b) => b - a);

    let pair = 0;
    let score = 0;

    for (let i = 0; i < sortedice.length - 1; i++) {
        if (sortedice[i] === sortedice[i + 1]) {
            score += sortedice[i] * 2;
            pair++;

            if (pair == 2) {
                return score;
            }
        }
    }
    return 0;
}

// Function to calculate the score for N of a kind (e.g., three of a kind, four of a kind)
function calculateNOfAKind(n) {
    for (let value = 1; value <= 6; value++) {
        const count = dicedata.filter(die => die === value).length;

        if (count >= n) {
            return value * n;
        }
    }
    return 0;
}

// Function to calculate the score for a full house
function calculateFullHouse() {
    const uniquevalue = Array.from(new Set(dicedata));
    if (uniquevalue.length === 2) {
        const count1 = dicedata.filter(die => die === uniquevalue[0]).length;
        const count2 = dicedata.filter(die => die === uniquevalue[1]).length;

        if ((count1 === 2 && count2 === 3) || (count1 === 3 && count2 === 2)) {
            return dicedata.reduce((sum, die) => sum + die, 0);
        }
    }
    return 0;
}

// Function to calculate the score for a small straight
function calculateSmallStraight() {
    const uniqueValues = Array.from(new Set(dicedata));
    const sortedValues = uniqueValues.sort((a, b) => a - b);

    for (let i = 0; i < sortedValues.length - 3; i++) {
        if (sortedValues[i] + 1 === sortedValues[i + 1] &&
            sortedValues[i + 1] + 1 === sortedValues[i + 2] &&
            sortedValues[i + 2] + 1 === sortedValues[i + 3]) {
            return 15;
        }
    }
    return 0;
}

// Function to calculate the score for a large straight
function calculateLargeStraight() {
    const uniqueValues = Array.from(new Set(dicedata));
    const sortedValues = uniqueValues.sort((a, b) => a - b);

    if (sortedValues.length === 5 && sortedValues[4] - sortedValues[0] === 4) {
        return 20;
    }

    return 0;
}

// Function to calculate the score for chance
function calculateChance() {
    return dicedata.reduce((sum, die) => sum + die, 0);
}

// Function to update the displayed scores on the UI
function updatescoredicevalue() {
    document.getElementById("score-ones").value = one1;
    document.getElementById("score-twos").value = two2;
    document.getElementById("score-threes").value = three3;
    document.getElementById("score-fours").value = four4;
    document.getElementById("score-fives").value = five5;
    document.getElementById("score-sixes").value = six6;
    document.getElementById("score-total").value = one1 + two2 + three3 + four4 + five5 + six6;
    document.getElementById("score-bonus").value = bonus;
    document.getElementById("score-pair").value = pair;
    document.getElementById("score-two-pair").value = twoPair;
    document.getElementById("score-three-of-a-kind").value = threeOfAKind;
    document.getElementById("score-four-of-a-kind").value = fourOfAKind;
    document.getElementById("score-full-house").value = fullHouse;
    document.getElementById("score-small-straight").value = smallStraight;
    document.getElementById("score-large-straight").value = largeStraight;
    document.getElementById("score-chance").value = chance;
    document.getElementById("score-yatzy").value = yatzy;

    // Calculate the total score
    totalScore = one1 + two2 + three3 + four4 + five5 + six6 + bonus + pair + twoPair +
        threeOfAKind + fourOfAKind + fullHouse + smallStraight + largeStraight + chance + yatzy;

    // Update the displayed total score on the UI
    document.getElementById("score-total-final").value = totalScore;
}