    // 1. FULLSCREEN LOGIC
    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    // 2. QUESTIONS ARRAY
    const questions = [
        "Graphical representation of an algorithm is called:",
        "A finite set of steps to solve a problem is:",
        "The symbol used for \"Decision\" in flowcharts:",
        "A good algorithm should always be:",
        "\"LIFO\" (Last In First Out) principle is used in:",
        "\"FIFO\" (First In First Out) principle belongs to:",
        "\"Indexing\" is a primary feature of:",
        "Hierarchical data structure (Non-Linear) is:",
        "Translates code line-by-line:",
        "Converts Assembly language to Machine code:",
        "Logical error in a program is also known as a:",
        "Component of IDE used to find and fix errors:",
        "\"Reserved words\" are also known as:",
        "Size of 'int' data type in C++ (standard):",
        "A value that cannot be changed during execution:",
        "Valid variable name starts with:",
        "Operator used for \"Remainder\":",
        "\\n is an escape sequence used for:",
        "&& and || are examples of:",
        "Symbols for \"Single line comment\" in C++:",
        "\"Iteration\" is another name for:",
        "This statement terminates the loop immediately:",
        "Loop that executes at least once:",
        "\"Multi-way branching\" statement:",
        "Variables declared inside a function:",
        "Values passed to a function are called:",
        "main() in C++ is a:",
        "Which gate is known as an \"Inverter\"?",
        "The \"Universal Gate\" is:",
        "In Boolean Algebra, A · A equals:",
        "Result of OR gate is 0 only when:",
        "Characters or objects in Scratch are called:",
        "Where we drag blocks to create code in Scratch:",
        "Instruction blocks are connected like:"
    ];

    // 3. QUIZ LOGIC
    let currentIdx = 0;
    let timeLeft = 10;
    let timerObj;

    function startQuiz() {
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('quiz-screen').classList.remove('hidden');
        loadQuestion();
    }

    function loadQuestion() {
        if (currentIdx < questions.length) {
            // Update UI
            document.getElementById('q-number').innerText = `QUESTION ${currentIdx + 1}`;
            document.getElementById('q-text').innerText = questions[currentIdx];
            
            // Reset Reversing Timer
            timeLeft = 10;
            document.getElementById('timer-display').innerText = timeLeft;

            // Reset Animated Bar
            const bar = document.getElementById('progress-bar');
            bar.classList.remove('animate-bar');
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
        timeLeft--;
        document.getElementById('timer-display').innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerObj);
            currentIdx++;
            loadQuestion();
        }
    }

    function showEndScreen() {
        document.getElementById('quiz-screen').classList.add('hidden');
        document.getElementById('end-screen').classList.remove('hidden');
    }
