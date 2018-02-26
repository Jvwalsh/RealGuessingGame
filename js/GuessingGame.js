function Game(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
    
    return;
}

Game.prototype.difference = function (){
    if(this.playersGuess-this.winningNumber>0){
        $('#subtitle').text('Guess Lower!');
    }
    if(this.playersGuess-this.winningNumber<0){
        $('#subtitle').text('Guess Higher!');
    }
    return Math.abs(this.playersGuess-this.winningNumber);
}

Game.prototype.isLower = function (){
    if(this.winningNumber-this.playersGuess > 0){
        return true;
    }
    else{
        return false;
    }
}
Game.prototype.playersGuessSubmission = function(num){
    if(!num){
        console.log("this happened...");
        throw 'That is an invalid guess.';
    }
    else if(num<=0){
    
        throw "That is an invalid guess.";
    }
    else if(num>100){
        throw "That is an invalid guess.";
    }
    else if(typeof(num)!== "number"){
        throw "That is an invalid guess.";
    }
    else{
    this.playersGuess = num;
    return this.checkGuess();

    }
}
Game.prototype.checkGuess = function(){
    var count = 0;
    count++;
    var result = '';


    if(this.pastGuesses){
        for(var i = 0; i < this.pastGuesses.length; i++){
            if(this.pastGuesses[i] === this.playersGuess){
                return "You have already guessed that number.";
            }
        }
    }
    this.pastGuesses.push(this.playersGuess);
    $('#guess-list li:nth-child('+this.pastGuesses.length + ')').text(this.playersGuess);
    
    if(this.pastGuesses.length === 5){
        $('#hint', '#submit').prop('disabled', true);
        $('#subtitle').text("Press Reset to play this game again!");
        return "You Lose. The winning number was " + this.winningNumber;
    }
    if(this.winningNumber === this.playersGuess){
        $('#hint', '#submit').prop('disabled', true);
        $('#subtitle').text("Press Reset to play this game again!");
        $('#submit').prop('disabled', true);
        return "You Win!"
    }

    if(this.difference() < 10){
        return "You\'re burning up!"
    }
        else if(this.difference() < 25){
            return "You\'re lukewarm."
        }
            else if(this.difference() < 50){
                return "You\'re a bit chilly."
            }
                else if(this.difference() < 100){
                    return "You\'re ice cold!"
                }
            
    return result;
}

Game.prototype.provideHint = function (){

        var arr = [];
        arr.push(this.winningNumber);
        arr.push(generateWinningNumber());
        arr.push(generateWinningNumber());

        shuffle(arr);

        return arr;
    
}

function generateWinningNumber(){
    return Math.floor(Math.random()*100)+1;
}

function newGame(){
    return new Game() ;
}



function shuffle(array){

    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
    }

    return array;


}

function makeAGuess(game){
    var guess = $('#player-input').val();
    $('#player-input').val("");
    var output = game.playersGuessSubmission(parseInt(guess,10));
    $('#title').text(output);
    console.log(output);
}


$(document).ready(function() {

    var game = new Game();


        $('#submit').click(function(e) {
        //console.log('Submit button has been clicked');
        //console.log('Amazing! It"s actually working!');
            makeAGuess(game);
        })

        $('#player-input').keypress(function(event) {
            if(event.which == 13){
                console.log("enter pressed yo");
                makeAGuess(game);
            }
        })

        var ranOnce = 0;
        $('#hint').click(function(){
            ranOnce++;
            if(ranOnce<2){
                var hints = game.provideHint();
                $('#title').text('The winning number is ' + hints[0] + ', '+hints[1] + ', or ' + hints[2]);
            }
        });
        $('#reset').click(function(){
            ranOnce = 0;
            game = newGame();
            $('#title').text("Play the Guessing Game!");
            $('#subtitle').text("Guess a number between 1 and 100")
            $('.guess').text('-');
            $('#hint, #submit').prop('disabled', false);
        })


    })


