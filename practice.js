/**
 * --- GAME ENGINE LOGIC ---
 */

// 1. DATA POOLS
// Top values are calculated based on 30px line height and 100px staff margin
const notePool = [
    { name: 'C', top: 236, ledger: true },  // Low C
    { name: 'D', top: 221, ledger: false }, // D space
    { name: 'E', top: 206, ledger: false }, // Line 1
    { name: 'F', top: 191, ledger: false }, // Space 1
    { name: 'G', top: 176, ledger: false }, // Line 2
    { name: 'A', top: 161, ledger: false }, // Space 2
    { name: 'B', top: 146, ledger: false }, // Line 3
    { name: 'C', top: 131, ledger: false }  // Space 3
];

const rhythmPool = [
    { name: 'Quarter', img: 'quarter-note.png' },
    { name: 'Half', img: 'half-note.png' },
    { name: 'Whole', img: 'whole-note.png' }
];

// 2. STATE MANAGEMENT
let score = 0;
let progress = 0;
let currentTarget = null;

/**
 * Updates Score and UI
 */
function updateScoreUI(points) {
    score += points;
    const scoreVal = document.getElementById('score-val');
    if (scoreVal) scoreVal.innerText = score;

    progress = Math.min(progress + 10, 100);
    const progFill = document.getElementById('progress-fill');
    if (progFill) progFill.style.width = progress + "%";
}

/**
 * Visual Feedback
 */
function playFeedback(isCorrect) {
    const staff = document.getElementById('display-area') || document.querySelector('.staff-display');
    if (!staff) return;

    if (isCorrect) {
        staff.classList.add('flash');
        setTimeout(() => staff.classList.remove('flash'), 200);
    } else {
        staff.classList.add('shake');
        setTimeout(() => staff.classList.remove('shake'), 400);
    }
}

/**
 * Generates the next note or rhythm
 */
function nextQuestion(mode) {
    const pool = (mode === 'rhythm') ? rhythmPool : notePool;
    currentTarget = pool[Math.floor(Math.random() * pool.length)];

    if (mode === 'note') {
        const noteEl = document.getElementById('note-head');
        const ledgerEl = document.getElementById('ledger-line');
        
        if (noteEl) noteEl.style.top = currentTarget.top + "px";
        
        if (ledgerEl) {
            ledgerEl.style.display = currentTarget.ledger ? "block" : "none";
            // Centering ledger line precisely through the note
            if(currentTarget.ledger) ledgerEl.style.top = (currentTarget.top + 13) + "px";
        }
    } 
    else if (mode === 'rhythm') {
        const rhythmImg = document.getElementById('rhythm-img');
        if (rhythmImg) rhythmImg.src = currentTarget.img;
    }
}

/**
 * Main Answer Check
 */
function checkAnswer(guess, mode) {
    if (guess === currentTarget.name) {
        updateScoreUI(10);
        playFeedback(true);
        setTimeout(() => nextQuestion(mode), 300);
    } else {
        playFeedback(false);
    }
}

// Navigation Helper
function goBack() {
    window.location.href = 'practice.html';
}
/**
 * INTERVAL GAME LOGIC
 */

const intervalNames = ["Unison", "2nd", "3rd", "4th", "5th", "6th", "7th", "8ve"];

function nextInterval() {
    // 1. Pick two random indices from the notePool
    let index1 = Math.floor(Math.random() * notePool.length);
    let index2 = Math.floor(Math.random() * notePool.length);

    // Ensure we don't get a Unison (1st) for this game to keep it interesting
    while (index1 === index2) {
        index2 = Math.floor(Math.random() * notePool.length);
    }

    const n1 = notePool[index1];
    const n2 = notePool[index2];

    // 2. Calculate the distance (Interval)
    // In music, C to D (1 step away in array) is a 2nd. 
    let distance = Math.abs(index1 - index2);
    let correctName = intervalNames[distance];
    
    // Store as global target for checkAnswer
    currentTarget = { name: correctName };

    // 3. Render Note 1
    const note1 = document.getElementById('note-1');
    const ledger1 = document.getElementById('ledger-1');
    note1.style.top = n1.top + "px";
    ledger1.style.display = n1.ledger ? "block" : "none";
    if(n1.ledger) ledger1.style.top = (n1.top + 13) + "px";

    // 4. Render Note 2
    const note2 = document.getElementById('note-2');
    const ledger2 = document.getElementById('ledger-2');
    note2.style.top = n2.top + "px";
    ledger2.style.display = n2.ledger ? "block" : "none";
    if(n2.ledger) ledger2.style.top = (n2.top + 13) + "px";
}

// Update the checkAnswer in practice.js to handle intervals
// If you already have a checkAnswer, just make sure it calls nextInterval() 
// when the mode is 'interval'

// Update your checkAnswer to this:
function checkAnswer(guess, mode) {
    if (guess === currentTarget.name) {
        updateScoreUI(10);
        playFeedback(true);
        
        // Decide which function to call next
        setTimeout(() => {
            if (mode === 'interval') nextInterval();
            else nextQuestion(mode);
        }, 300);
    } else {
        playFeedback(false);
    }
}