const questions = [
    {
        question: "what is faith's favorite movie of all time?",
        answers: [
            {text: "divergent", correct: true},
            {text: "catching fire", correct: false},
            {text: "titanic", correct: false},
            {text: "hunger games", correct: false},
        ]
    },
    {
    question: "who pooped in the toilet that one time mom locked us outside until someone admitted they did it?",
    answers: [
        {text: "justice", correct: false},
        {text: "faith", correct: false},
        {text: "serenity", correct: false},
        {text: "valor", correct: true},
    ],
},
{
    question: "the year is 2014, who is faith's teacher?",
    answers: [
        {text: "mrs. bunch", correct: false},
        {text: "mr. vandenberg", correct: true},
        {text: "mr. pavlis", correct: false},
        {text: "mrs. kern", correct: false},
    ],
},
{
    question: "who put the jeff the killer video on the ipad and then acted like they didn't know how it got there?",
    answers: [
        {text: "faith", correct: false},
        {text: "serenity", correct: false},
        {text: "justice", correct: true},
        {text: "valor", correct: false},
    ],
},
{
    question: "it's wednesday. what are we doing at the end of class with sensei?",
    answers: [
        {text: "push ups:( we showed too much joy", correct: true},
        {text: "swords", correct: false},
        {text: "punching bags", correct: false},
        {text: "jumprope", correct: false},
    ],
},
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    } else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play again";
    nextButton.style.display = "block"
;}

function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
if(currentQuestionIndex < questions.length){
    handleNextButton();
} else {
    startQuiz();
}
});


startQuiz();


