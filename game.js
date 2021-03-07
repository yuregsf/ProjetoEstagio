const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = false;
let mistakes = 0;
let questionCounter = 0;
let availableQuesions = [];

/*let questions = [
  {
    question: " Em javascript, qual a diferença entre Set e Map?",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question: "O que é closure em javascript?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    question: "No CSS, qual a diferença entre pseudo-classes e pseudo-elementos?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "Com a evolução e popularização de ferramentas javascript, tarefas antes mais complexas se tornaram mais simples e algumas vezes mais leves,Ajax passou a ser usado em larga escala para as mais diversas situações, e com o passar do tempo, o usuário ficava cada vez mais tempo na mesma página, sem nunca dar um refresh.",
    answer: 4
  },
  {
    question: "Quais tags HTML são usadas para exibir os dados na forma tabular?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "Com a evolução e popularização de ferramentas javascript, tarefas antes mais complexas se tornaram mais simples e algumas vezes mais leves.Ajax passou a ser usado em larga escala para as mais diversas situações, e com o passar do tempo, o usuário ficava cada vez mais tempo na mesma página, sem nunca dar um refresh.",
    answer: 4
  },
  {
    question: "Qual a principal diferença entre CSS Grid e Flexbox?",
    choice1: "Com a evolução e popularização de ferramentas javascript, tarefas antes mais complexas se tornaram mais simples e algumas vezes mais leves.Ajax passou a ser usado em larga escala para as mais diversas situações, e com o passar do tempo, o usuário ficava cada vez mais tempo na mesma página, sem nunca dar um refresh.",
    choice2: "Com a evolução e popularização de ferramentas javascript, tarefas antes mais complexas se tornaram mais simples e algumas vezes mais leves.Ajax passou a ser usado em larga escala para as mais diversas situações, e com o passar do tempo, o usuário ficava cada vez mais tempo na mesma página, sem nunca dar um refresh.",
    choice3: "Com a evolução e popularização de ferramentas javascript, tarefas antes mais complexas se tornaram mais simples e algumas vezes mais leves.Ajax passou a ser usado em larga escala para as mais diversas situações, e com o passar do tempo, o usuário ficava cada vez mais tempo na mesma página, sem nunca dar um refresh.",
    choice4: "Com a evolução e popularização de ferramentas javascript, tarefas antes mais complexas se tornaram mais simples e algumas vezes mais leves.Ajax passou a ser usado em larga escala para as mais diversas situações, e com o passar do tempo, o usuário ficava cada vez mais tempo na mesma página, sem nunca dar um refresh.",
    answer: 4
  }
];*/

//CONSTANTS
const MAX_QUESTIONS = 5;

function Ajax(url,callback) {
  fetch(url)
    .then(resp => resp.json())
    .then(Test2 => callback(Test2))

}


  startGame = async () => {
  questionCounter = 0;
  mistakes = 0;
  await Ajax("questions.json", (questions) => {
    availableQuesions = [...questions]
  })
  console.log(availableQuesions)
  getNewQuestion();
};

getNewQuestion = () => {
  if (questionCounter >= MAX_QUESTIONS) {
    //Acerta todas as questoes e mostra o overlay com parabens e o botão de reiniciar o jogo
    return window.location.assign('/end.html');
  }
  if (mistakes >= 1) {
    //Ao errar uma questão recebe a informação de que é para reiniciar o jogo
    return window.location.assign('/end.html');
}
  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.title;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

      if(classToApply == "incorrect"){
        mistakes++;
      }
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

startGame();
