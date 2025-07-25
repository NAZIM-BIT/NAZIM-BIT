class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = {
            X: 0,
            O: 0,
            draw: 0
        };
        
        // Winning combinations
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        this.initializeGame();
        this.loadScores();
    }
    
    initializeGame() {
        this.gameBoard = document.getElementById('game-board');
        this.currentPlayerDisplay = document.getElementById('current-player');
        this.gameStatus = document.getElementById('game-status');
        this.resetGameBtn = document.getElementById('reset-game');
        this.resetScoreBtn = document.getElementById('reset-score');
        this.scoreX = document.getElementById('score-x');
        this.scoreO = document.getElementById('score-o');
        this.scoreDraw = document.getElementById('score-draw');
        
        this.cells = document.querySelectorAll('.cell');
        
        this.addEventListeners();
        this.updateDisplay();
    }
    
    addEventListeners() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e));
        });
        
        this.resetGameBtn.addEventListener('click', () => this.resetGame());
        this.resetScoreBtn.addEventListener('click', () => this.resetScores());
        
        // Add keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }
    
    handleCellClick(e) {
        const cell = e.target;
        const index = parseInt(cell.dataset.index);
        
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.makeMove(index);
    }
    
    handleKeyPress(e) {
        if (!this.gameActive) return;
        
        const keyMap = {
            '1': 6, '2': 7, '3': 8,
            '4': 3, '5': 4, '6': 5,
            '7': 0, '8': 1, '9': 2
        };
        
        const index = keyMap[e.key];
        if (index !== undefined && this.board[index] === '') {
            this.makeMove(index);
        }
        
        if (e.key === 'r' || e.key === 'R') {
            this.resetGame();
        }
    }
    
    makeMove(index) {
        this.board[index] = this.currentPlayer;
        this.updateCell(index);
        
        if (this.checkWin()) {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            this.switchPlayer();
        }
    }
    
    updateCell(index) {
        const cell = this.cells[index];
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
        
        // Add sound effect (if you want to add audio later)
        this.playSound('move');
    }
    
    checkWin() {
        return this.winningCombinations.some(combination => {
            const [a, b, c] = combination;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.winningCombination = combination;
                return true;
            }
            return false;
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.updateScoreDisplay();
        this.saveScores();
        
        // Highlight winning cells
        this.winningCombination.forEach(index => {
            this.cells[index].classList.add('winning');
        });
        
        this.gameStatus.textContent = `🎉 Player ${this.currentPlayer} wins!`;
        this.gameStatus.classList.add('winner');
        
        this.playSound('win');
        
        // Auto-reset after 3 seconds
        setTimeout(() => {
            this.resetGame();
        }, 3000);
    }
    
    handleDraw() {
        this.gameActive = false;
        this.scores.draw++;
        this.updateScoreDisplay();
        this.saveScores();
        
        this.gameStatus.textContent = "🤝 It's a draw!";
        this.gameStatus.classList.add('draw');
        
        this.playSound('draw');
        
        // Auto-reset after 3 seconds
        setTimeout(() => {
            this.resetGame();
        }, 3000);
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.currentPlayerDisplay.textContent = this.currentPlayer;
        this.currentPlayerDisplay.style.color = this.currentPlayer === 'X' ? '#e74c3c' : '#3498db';
    }
    
    updateScoreDisplay() {
        this.scoreX.textContent = this.scores.X;
        this.scoreO.textContent = this.scores.O;
        this.scoreDraw.textContent = this.scores.draw;
    }
    
    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.winningCombination = null;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning');
        });
        
        this.gameStatus.textContent = '';
        this.gameStatus.classList.remove('winner', 'draw');
        
        this.updateDisplay();
    }
    
    resetScores() {
        this.scores = { X: 0, O: 0, draw: 0 };
        this.updateScoreDisplay();
        this.saveScores();
        
        // Show confirmation
        const originalText = this.gameStatus.textContent;
        this.gameStatus.textContent = '📊 Scores reset!';
        setTimeout(() => {
            this.gameStatus.textContent = originalText;
        }, 1500);
    }
    
    saveScores() {
        localStorage.setItem('ticTacToeScores', JSON.stringify(this.scores));
    }
    
    loadScores() {
        const savedScores = localStorage.getItem('ticTacToeScores');
        if (savedScores) {
            this.scores = JSON.parse(savedScores);
            this.updateScoreDisplay();
        }
    }
    
    playSound(type) {
        // Placeholder for sound effects
        // You can add actual audio files and play them here
        if (window.AudioContext || window.webkitAudioContext) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            const frequencies = {
                move: 800,
                win: 1000,
                draw: 600
            };
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequencies[type] || 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        }
    }
}

// AI Player (optional enhancement)
class AIPlayer {
    constructor(game) {
        this.game = game;
    }
    
    makeMove() {
        if (!this.game.gameActive || this.game.currentPlayer !== 'O') return;
        
        const bestMove = this.getBestMove();
        setTimeout(() => {
            this.game.makeMove(bestMove);
        }, 500); // Add slight delay for better UX
    }
    
    getBestMove() {
        // Simple AI: Try to win, block player, or take center/corner
        const board = this.game.board;
        
        // Try to win
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                if (this.game.checkWin()) {
                    board[i] = '';
                    return i;
                }
                board[i] = '';
            }
        }
        
        // Block player from winning
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                const tempCurrentPlayer = this.game.currentPlayer;
                this.game.currentPlayer = 'X';
                const canWin = this.game.checkWin();
                this.game.currentPlayer = tempCurrentPlayer;
                board[i] = '';
                if (canWin) {
                    return i;
                }
            }
        }
        
        // Take center if available
        if (board[4] === '') return 4;
        
        // Take corners
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(i => board[i] === '');
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }
        
        // Take any available spot
        const availableSpots = board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
        return availableSpots[Math.floor(Math.random() * availableSpots.length)];
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new TicTacToe();
    
    // Optional: Add AI player toggle
    let aiEnabled = false;
    let ai = null;
    
    // Add AI toggle button (you can uncomment this if you want AI)
    /*
    const aiToggle = document.createElement('button');
    aiToggle.textContent = 'Enable AI';
    aiToggle.className = 'btn btn-secondary';
    aiToggle.style.marginTop = '10px';
    document.querySelector('.controls').appendChild(aiToggle);
    
    aiToggle.addEventListener('click', () => {
        aiEnabled = !aiEnabled;
        if (aiEnabled) {
            ai = new AIPlayer(game);
            aiToggle.textContent = 'Disable AI';
        } else {
            ai = null;
            aiToggle.textContent = 'Enable AI';
        }
    });
    
    // Override the switchPlayer method to include AI moves
    const originalSwitchPlayer = game.switchPlayer.bind(game);
    game.switchPlayer = function() {
        originalSwitchPlayer();
        if (aiEnabled && ai && this.currentPlayer === 'O' && this.gameActive) {
            ai.makeMove();
        }
    };
    */
    
    // Add some helpful instructions
    const instructions = document.createElement('div');
    instructions.innerHTML = `
        <p style="margin-top: 20px; font-size: 0.9rem; color: #666; line-height: 1.4;">
            <strong>How to play:</strong><br>
            • Click on any empty cell to make your move<br>
            • Use number keys 1-9 (numpad layout) for keyboard play<br>
            • Press 'R' to reset the game<br>
            • First to get 3 in a row wins!
        </p>
    `;
    document.querySelector('.container').appendChild(instructions);
});