const questions = [
        "The 'Oval' symbol in a flowchart represents:", // 43- Start / End
        "The 'Rectangle' symbol in a flowchart is used for:", // 44- Processing
        "Adding an element to the top of a stack is called:", // 45- Push
        "Removing an element from a queue is known as:", // 46- Dequeue
        "A tree node that has no children is called a:", // 47- Leaf node
        "The top-most node of a tree structure is the:", // 48- Root
        "A mistake in the 'grammar' rules of a programming language is a:", // 49- Syntax Error
        "Translates the entire program at once into machine code:", // 50- Compiler
        "An error that causes a program to crash during execution:", // 51- Runtime Error
        "Finding and fixing 'Bugs' in a program is called:", // 52- Debugging
        "Size of 'char' data type in C++ (standard):", // 53- 1 byte
        "Size of 'double' data type in C++ (standard):", // 54- 8 bytes
        "Keyword used to define a constant value in C++:", // 55- const
        "The operator used to compare if two values are equal:", // 56- ==
        "The escape sequence used for a horizontal tab:", // 57- \t
        "Operator used to decrease a variable's value by 1:", // 58- Decrement (--)
        "The 'default' case belongs to which control statement:", // 59- Switch
        "A loop that checks the condition after the body executes:", // 60- Do-While
        "Header file required for using cin and cout:", // 61- iostream
        "Variables that can be accessed from any part of the program:", // 62- Global variables
        "Gate that gives output 1 if any one input is 1:", // 63- OR Gate
        "The Boolean law where A + 0 = A is called:", // 64- Identity Law
        "Gate formed by combining AND and NOT gates:", // 65- NAND Gate
        "The algebraic expression for a NOT gate is usually:", // 66- A' or bar A
        "Gate that outputs 1 only when inputs are different:", // 67- XOR Gate
        "The background area where the Sprite moves in Scratch:", // 68- Stage
        "Different 'looks' or frames for a Sprite are called:", // 69- Costumes
        "Block used to repeat actions forever in Scratch:", // 70- Forever Loop
        "The 'yellow' block category in Scratch usually handles:", // 71- Events
        "The operator for 'Logical NOT' in C++ is:", // 72- !
    ];

    let currentIdx = 0;
    let timeLeft = 15;
    let timerObj;
    let isPaused = false;

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    function togglePause() {
        isPaused = !isPaused;
        const icon = document.getElementById('pause-icon');
        const bar = document.getElementById('progress-bar');
        
        if (isPaused) {
            icon.className = 'fas fa-play';
            bar.classList.add('paused');
        } else {
            icon.className = 'fas fa-pause';
            bar.classList.remove('paused');
        }
    }

    function startQuiz() {
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('quiz-screen').classList.remove('hidden');
        document.getElementById('pause-btn').classList.remove('hidden');
        document.getElementById('prev-btn').classList.remove('hidden');
        document.getElementById('next-btn').classList.remove('hidden');
        loadQuestion();
    }

    function loadQuestion() {
        if (currentIdx < 0) currentIdx = 0;
        
        if (currentIdx < questions.length) {
            // Update Text
            document.getElementById('q-number').innerText = `QUESTION ${currentIdx + 1}`;
            document.getElementById('q-text').innerText = questions[currentIdx];
            
            // Reset Reversing Timer
            timeLeft = 15;
            document.getElementById('timer-display').innerText = timeLeft;
            isPaused = false;
            document.getElementById('pause-icon').className = 'fas fa-pause';

            // Reset Animated Bar
            const bar = document.getElementById('progress-bar');
            bar.classList.remove('animate-bar', 'paused');
            void bar.offsetWidth; 
            bar.classList.add('animate-bar');

            // Set Interval
            clearInterval(timerObj);
            timerObj = setInterval(runTimer, 1000);
        } else {
            showEndScreen();
        }
    }

    function runTimer() {
        if (!isPaused) {
            timeLeft--;
            document.getElementById('timer-display').innerText = timeLeft;

            if (timeLeft <= 0) {
                nextQuestion();
            }
        }
    }

    function nextQuestion() {
        clearInterval(timerObj);
        currentIdx++;
        if (currentIdx < questions.length) {
            loadQuestion();
        } else {
            showEndScreen();
        }
    }

    function prevQuestion() {
        if (currentIdx > 0) {
            clearInterval(timerObj);
            currentIdx--;
            loadQuestion();
        }
    }

    function showEndScreen() {
        clearInterval(timerObj);
        document.getElementById('quiz-screen').classList.add('hidden');
        document.getElementById('pause-btn').classList.add('hidden');
        document.getElementById('prev-btn').classList.add('hidden');
        document.getElementById('next-btn').classList.add('hidden');
        document.getElementById('end-screen').classList.remove('hidden');
    }
