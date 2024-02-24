const compPicker = document.getElementById("compS");
const result = document.querySelector(".oTextt");
const choices = ["rock", "paper", "scissors"]

//The click function for both the Player and Computer
function playPicker(pOption) {
    pHolder = pOption; 
    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    
    wL(pHolder, compChoice);
    compPicker.src = `images/${choices.PNG}`;
}


// Win/ Lost function (Doesn't work but I wanted to submit something)
function wL(P, C) {
    if (P === C) {
        result.textContent = "It's a draw!"
    } else if (P === 'scissors' && C === 'rock') {
        result.textContent = "You Lose!"
    } else if (P === 'paper' && C === 'scissors') {
        result.textContent = "You Lose!"
    } else if (P === 'rock' && C === 'paper') {
        result.textContent = "You Lose!" 
    } else {
        result.textContent = "You Win!"
    }
    }







