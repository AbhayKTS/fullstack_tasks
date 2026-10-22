(() => {
    const questions = [
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Mercury"],
            correct: 1,
            explanation: "Mars looks red because its surface has iron oxide, which is like rust."
        },
        {
            question: "What does HTML stand for?",
            options: [
                "HyperText Markup Language",
                "HighText Machine Language",
                "Hyper Transfer Markup Logic",
                "Home Tool Markup Language"
            ],
            correct: 0,
            explanation: "HTML gives a webpage its structure."
        },
        {
            question: "Which JavaScript method adds an element to the end of an array?",
            options: ["shift()", "push()", "unshift()", "slice()"],
            correct: 1,
            explanation: "push() is used to add a new item at the end of an array."
        },
        {
            question: "What is the largest mammal on Earth?",
            options: ["Elephant", "Blue whale", "Giraffe", "Hippopotamus"],
            correct: 1,
            explanation: "The blue whale is the largest animal ever known."
        },
        {
            question: "Which language is mostly used to style web pages?",
            options: ["HTML", "CSS", "JavaScript", "SQL"],
            correct: 1,
            explanation: "CSS controls colors, layout, and design on a webpage."
        }
    ];

    const scoreEl = document.getElementById("score");
    const questionNumberEl = document.getElementById("question-number");
    const progressBarEl = document.getElementById("progress-bar");
    const questionEl = document.getElementById("question");
    const answersEl = document.getElementById("answers");
    const resultEl = document.getElementById("result");
    const reviewEl = document.getElementById("review");
    const nextBtn = document.getElementById("next-btn");
    const restartBtn = document.getElementById("restart-btn");

    let current = 0;
    let score = 0;
    let userAnswers = Array(questions.length).fill(null);

    const buildReview = () => {
        reviewEl.innerHTML = questions
            .map((q, index) => {
                const selected = userAnswers[index];
                const isCorrect = selected === q.correct;
                const selectedText = selected === null ? "No answer" : q.options[selected];

                return `
                    <div class="review-item ${isCorrect ? "correct" : "incorrect"}">
                        <h4>Question ${index + 1}: ${q.question}</h4>
                        <p>Your answer: ${selectedText}</p>
                        <p>${isCorrect ? "Correct!" : `Correct answer: ${q.options[q.correct]}`}</p>
                        <p>${q.explanation}</p>
                    </div>
                `;
            })
            .join("");
    };

    const renderQuestion = () => {
        const q = questions[current];

        questionEl.textContent = q.question;
        scoreEl.textContent = score;
        questionNumberEl.textContent = `${current + 1}/${questions.length}`;
        progressBarEl.style.width = `${((current + 1) / questions.length) * 100}%`;

        answersEl.innerHTML = "";
        q.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "answer";
            button.textContent = option;
            button.addEventListener("click", () => checkAnswer(index, button));
            answersEl.appendChild(button);
        });

        resultEl.textContent = "";
        resultEl.classList.remove("show");
        reviewEl.classList.remove("show");
        nextBtn.hidden = false;
        nextBtn.disabled = true;
        nextBtn.textContent = current === questions.length - 1 ? "Finish" : "Next Question";
        restartBtn.hidden = true;
    };

    const checkAnswer = (selectedIndex, selectedButton) => {
        const q = questions[current];
        const buttons = [...answersEl.querySelectorAll(".answer")];

        userAnswers[current] = selectedIndex;

        buttons.forEach((button, index) => {
            button.disabled = true;
            button.classList.remove("selected");

            if (index === q.correct) {
                button.classList.add("correct");
            }

            if (index === selectedIndex && index !== q.correct) {
                button.classList.add("incorrect");
            }
        });

        selectedButton.classList.add("selected");

        if (selectedIndex === q.correct) {
            score += 1;
            scoreEl.textContent = score;
            resultEl.textContent = `Correct! ${q.explanation}`;
        } else {
            resultEl.textContent = `Wrong! The correct answer is ${q.options[q.correct]}. ${q.explanation}`;
        }

        resultEl.classList.add("show");
        nextBtn.disabled = false;
        nextBtn.textContent = current === questions.length - 1 ? "See Results" : "Next Question";
    };

    nextBtn.addEventListener("click", () => {
        if (current < questions.length - 1) {
            current += 1;
            renderQuestion();
            return;
        }

        questionEl.textContent = `Quiz complete! Final score: ${score}/${questions.length}`;
        answersEl.innerHTML = "";
        resultEl.textContent = score === questions.length ? "Perfect score! Amazing work." : `You scored ${score}/${questions.length}.`;
        resultEl.classList.add("show");
        nextBtn.hidden = true;
        restartBtn.hidden = false;
        buildReview();
        reviewEl.classList.add("show");
    });

    restartBtn.addEventListener("click", () => {
        current = 0;
        score = 0;
        userAnswers = Array(questions.length).fill(null);
        renderQuestion();
    });

    renderQuestion();
})();
