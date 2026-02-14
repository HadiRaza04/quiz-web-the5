    const questions = [
        "Graphical representation of an algorithm is called:",  // Flowchart
        "A finite set of steps to solve a problem is:", // Algorithm
        "The symbol used for \"Decision\" in flowcharts:", // Diamond
        "A good algorithm should always be:", // Efficient
        "\"LIFO\" (Last In First Out) principle is used in:", // Stack
        "\"FIFO\" (First In First Out) principle belongs to:", // Queue
        "\"Indexing\" is a primary feature of:", // Arrays
        "Hierarchical data structure (Non-Linear) is:", // Tree
        "Translates code line-by-line:", // Interpreter
        "Converts Assembly language to Machine code:", /// Assembler
        "Logical error in a program is also known as a:", // Bug
        "Component of IDE used to find and fix errors:", // Debugger
        "\"Reserved words\" are also known as:", // Keywords
        "Size of 'int' data type in C++ (standard):", // 4 bytes
        "A value that cannot be changed during execution:", // Constant
        "Valid variable name starts with:", // Letter or underscore
        "Operator used for \"Remainder\":", // Modulo (%)
        "\\n is an escape sequence used for:", /// New line
        "&& and || are examples of:", // Logical operators
        "Symbols for \"Single line comment\" in C++:", // //
        "\"Iteration\" is another name for:", // Loop
        "This statement terminates the loop immediately:", // Break
        "Loop that executes at least once:", // Do-While
        "\"Multi-way branching\" statement:", // Switch
        "Variables declared inside a function:", // Local variables
        "Values passed to a function are called:", // Arguments
        "main() in C++ is a:", // Function
        "Which gate is known as an \"Inverter\"?", // NOT gate
        "The \"Universal Gate\" is:", // NAND gate
        "In Boolean Algebra, A · A equals:", // A
        "Result of OR gate is 0 only when:", // Both inputs are 0
        "Characters or objects in Scratch are called:", // Sprites
        "Where we drag blocks to create code in Scratch:", // Scripts area
        "Instruction blocks are connected like:", // jigsaw pieces
        "\"Push\" and \"Pop\" operations are used in",  // stack
        "The parallelogram symbol in a flowchart represents:", // input /output
        "Standardized English-like statements to describe an algorithm:", // Algorithm
        "Non-linear structure consisting of vertices and edges:", // Graph
        "Symbol used to end most C++ statements:", // Semicolon (;)
        "Jump statement used to transfer control to a labeled part of the program:", // Goto
        "The \"return type\" of a function that does not return any value:", // void
        "The block category used to move a Sprite:", // Motion
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