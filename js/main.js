//Foundation for mapping keys to values in the Questions
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

//To verify that the answer selected matches the answer provided in the
// question creation
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

//Foundation to mapping keys to values in the Quiz as a whole
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
// To get the index to find what box it will go in
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
// To check that button clicked on matches what the correct answer was from
// question prototype and to incrament the score if correct and get next
// question index unless there are no more question then to get score.
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

// To place questions and possible choices in the proper html places
// or to show the score if the quiz is over
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

// Marks the guess as the id from the buttons which maps to the index
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};

// Just displays what question you are on of how many
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

// when the game is over displays how many question you got correct
function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> You guessed " + quiz.score + " correct out of "
    + quiz.questions.length + " </h2>";
    gameOverHTML += '<br /> <input id="retry" type="button" value="Play again" onClick="window.location.reload()">';
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions
var questions = [
    new Question("What year was Elijah Wood born?", ["1981", "1983","1979", "1985"], "1981"),
    new Question("What is Elijah's favorite food?", ["Pizza", "Donuts", "Fried Artichokes", "Pretzels"], "Fried Artichokes"),
    new Question("What is Elijah's favorite movie?", ["The Matrix", "Thing","ET", "Harvey"], "Harvey"),
    new Question("Elijah's favorite bands includes which of the following?",
    ["The Who", "Smashing Pumpkins", "Reel Big Fish", "Abba"], "Smashing Pumpkins"),
    new Question("Elijah is also a professional what?", ["Singer", "Pianist", "Chef", "All"], "All"),
    new Question("Elijah has one of two prop rings used in Lord of the Rings, who has the other one ?",
    ["Peter Jackson", "Ian McKellen", "Andy Serkis", "Ian Holm"], "Andy Serkis"),
    new Question("What nickname did Elijah's mom give him?", ["Slugger", "Spark Plug", "Rascal", "Peaches"], "Spark Plug"),
    new Question("Elijah owns a what?", ["Pizza Franchise", "Tank", "Soccer Club", "Record Label"], "Record Label")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();
