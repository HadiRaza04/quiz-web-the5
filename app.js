    const questions = [
        "Graphical representation of an algorithm is called:",  // 1- Flowchart
        "A finite set of steps to solve a problem is:", // 2- Algorithm
        "The symbol used for \"Decision\" in flowcharts:", // 3- Diamond
        "A good algorithm should always be:", // 4- Efficient
        "\"LIFO\" (Last In First Out) principle is used in:", // 5- Stack
        "\"FIFO\" (First In First Out) principle belongs to:", // 6- Queue
        "\"Indexing\" is a primary feature of:", // 7- Arrays
        "Hierarchical data structure (Non-Linear) is:", // 8- Tree
        "Translates code line-by-line:", // 9- Interpreter
        "Converts Assembly language to Machine code:", /// 10- Assembler
        "Logical error in a program is also known as a:", // 11- Bug
        "Component of IDE used to find and fix errors:", // 12- Debugger
        "\"Reserved words\" are also known as:", // 13- Keywords
        "Size of 'int' data type in C++ (standard):", // 14- 4 bytes
        "A value that cannot be changed during execution:", // 15- Constant
        "Valid variable name starts with:", // 16- Letter or underscore
        "Operator used for \"Remainder\":", // 17- Modulo (%)
        "\\n is an escape sequence used for:", /// 18-  New line
        "&& and || are examples of:", // 19- Logical operators
        "Symbols for \"Single line comment\" in C++:", // 20- //
        "\"Iteration\" is another name for:", // 21- Loop
        "This statement terminates the loop immediately:", // 22-  Break
        "Loop that executes at least once:", // 23- Do-While
        "\"Multi-way branching\" statement:", // 24- Switch
        "Variables declared inside a function:", // 25- Local variables
        "Values passed to a function are called:", // 26- Arguments
        "main() in C++ is a:", // 27 -Function
        "Which gate is known as an \"Inverter\"?", // 28- NOT gate
        "The \"Universal Gate\" is:", // 29- NAND gate
        "In Boolean Algebra, A · A equals:", // 30- A
        "Result of OR gate is 0 only when:", // 31- Both inputs are 0
        "Characters or objects in Scratch are called:", // 32- Sprites
        "Where we drag blocks to create code in Scratch:", // 33- Scripts area
        "Instruction blocks are connected like:", // 34- jigsaw pieces
        "\"Push\" and \"Pop\" operations are used in",  // 35- stack
        "The parallelogram symbol in a flowchart represents:", // 36- input /output
        "Standardized English-like statements to describe an algorithm:", // 37- Algorithm
        "Non-linear structure consisting of vertices and edges:", // 38- Graph
        "Symbol used to end most C++ statements:", // 39- Semicolon (;)
        "Jump statement used to transfer control to a labeled part of the program:", //  40-  Goto
        "The \"return type\" of a function that does not return any value:", // 41- void
        "The block category used to move a Sprite:", // 42- Motion
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