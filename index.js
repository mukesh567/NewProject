
// Survey questions and answers stored in an array
const questions = [
    { id: 1, text: "How satisfied are you with our products?", type: "rating", options: [1, 2, 3, 4, 5] },
    { id: 2, text: "How fair are the prices compared to similar retailers?", type: "rating", options: [1, 2, 3, 4, 5] },
    { id: 3, text: "How satisfied are you with the value for money of your purchase?", type: "rating", options: [1, 2, 3, 4, 5] },
    { id: 4, text: "On a scale of 1-10, how likely are you to recommend us to your friends and family?", type: "rating", options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { id: 5, text: "What could we do to improve our service?", type: "text" }
];

let currentQuestionIndex = 0;
let answers = {};

const welcomeScreen = document.getElementById("welcome-screen");
const surveyScreen = document.getElementById("survey-screen");
const thankYouScreen = document.getElementById("thank-you-screen");
const startButton = document.getElementById("start-btn");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const questionNumberText = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const progressText = document.getElementById("progress-text");

// Event listeners
startButton.addEventListener("click", startSurvey);
prevButton.addEventListener("click", showPreviousQuestion);
nextButton.addEventListener("click", nextQuestion);


function startSurvey() {
    welcomeScreen.style.display = "none";
    surveyScreen.style.display = "block";
    showQuestion(currentQuestionIndex);
}

function showQuestion(index) {
    const question = questions[index];
    questionNumberText.textContent = `${index + 1}/${questions.length}`;
    questionText.textContent = question.text;

    if (question.type === "rating") {
        const options = question.options.map(option => `<label><input type="radio" name="answer" value="${option}"> ${option}</label>`).join(" ");
        questionText.innerHTML += `<div>${options}</div>`;
    } else if (question.type === "text") {
        questionText.innerHTML += `<textarea id="answer-text" rows="4" cols="50"></textarea>`;
    }

    progressText.textContent = `Progress: ${index + 1}/${questions.length}`;

    updateButtonStates();
}

function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    }
}

// function showNextQuestion() {
//     const selectedAnswer = getSelectedAnswer();

//     if (selectedAnswer !== null) {
//         const question = questions[currentQuestionIndex];
//         answers[question.id] = selectedAnswer;

//         if (currentQuestionIndex < questions.length - 1) {
//             currentQuestionIndex++;
//             showQuestion(currentQuestionIndex);
//         } else {
//             showConfirmationDialog();
//         }
//     }
// }

function getSelectedAnswer() {
    const answerInputs = document.getElementsByName("answer");

    for (const input of answerInputs) {
        if (input.checked) {
            return input.value;
        }
    }

    const answerText = document.getElementById("answer-text");
    if (answerText) {
        return answerText.value;
    }

    return null;
}

function showConfirmationDialog() {
    if (confirm("Are you sure you want to submit the survey?")) {
        // Save answers to local storage
        localStorage.setItem("surveyAnswers", JSON.stringify(answers));

        // Set the survey completion flag
        localStorage.setItem("surveyCompleted", "COMPLETED");

        // Display the thank you screen
        surveyScreen.style.display = "none";
        thankYouScreen.style.display = "block";

        // Reset the survey after 5 seconds
        setTimeout(resetSurvey, 5000);
    }
}

function resetSurvey() {
    thankYouScreen.style.display = "none";
    welcomeScreen.style.display = "block";

    currentQuestionIndex = 0;
    answers = {};

    showQuestion(currentQuestionIndex);
}

function updateButtonStates() {
    prevButton.disabled = currentQuestionIndex === 0;
    nextButton.disabled = currentQuestionIndex === questions.length - 1;
}
