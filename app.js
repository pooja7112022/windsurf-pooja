// JavaScript for future functionality
console.log('Co-Lending Financial Loans App Loaded');

// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('scoreDisplay');

// Game constants
const CELL_SIZE = 20;
const COLS = 30;
const ROWS = 20;
const WALL_COLOR = '#2121DE';
const DOT_COLOR = '#ffffff';
const DOT_SIZE = 4;
const PLAYER_SIZE = 30;

// Draw title
function drawTitle() {
    ctx.fillStyle = '#FFD700'; // Gold color for title
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
   // ctx.fillText('Pac Man Fun', canvas.width/2, 50);
    
    // Add decorative line under title
    //ctx.beginPath();
    //ctx.moveTo(canvas.width/2 - 150, 60);
    //ctx.lineTo(canvas.width/2 + 150, 60);
    //ctx.strokeStyle = '#FFD700';
    //ctx.lineWidth = 2;
    //ctx.stroke();
}

// Player class
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.direction = 'right';
        this.score = 0;
        this.speed = 3;
    }

    draw() {
        // Draw HR text
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Rotate based on direction
        const rotationAngles = {
            'right': 0,
            'left': Math.PI,
            'up': -Math.PI/2,
            'down': Math.PI/2
        };
        ctx.rotate(rotationAngles[this.direction]);
        
        // Draw HR text
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = '#FFD700'; // Gold color
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('HR', 0, 0);
        
        ctx.restore();
    }

    move() {
        if (keys['ArrowRight']) this.direction = 'right';
        if (keys['ArrowLeft']) this.direction = 'left';
        if (keys['ArrowUp']) this.direction = 'up';
        if (keys['ArrowDown']) this.direction = 'down';

        if (this.direction === 'right') this.x += this.speed;
        if (this.direction === 'left') this.x -= this.speed;
        if (this.direction === 'up') this.y -= this.speed;
        if (this.direction === 'down') this.y += this.speed;

        // Keep player within bounds
        this.x = Math.max(PLAYER_SIZE/2, Math.min(canvas.width - PLAYER_SIZE/2, this.x));
        this.y = Math.max(PLAYER_SIZE/2, Math.min(canvas.height - PLAYER_SIZE/2, this.y));

        // Collect dots
        this.collectDots();
    }

    collectDots() {
        const cellX = Math.floor(this.x / CELL_SIZE);
        const cellY = Math.floor(this.y / CELL_SIZE);
        
        if (dots[cellY] && dots[cellY][cellX]) {
            dots[cellY][cellX] = 0;
            this.score += 10;
            // Update score display
            scoreDisplay.textContent = `Score: ${this.score}`;
        }
    }
}

// Initialize player
const player = new Player(CELL_SIZE * 1.5, CELL_SIZE * 1.5);

// Initialize dots
let dots = Array(ROWS).fill().map(() => Array(COLS).fill(1));

// Handle keyboard input
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Draw dots
function drawDots() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (dots[row][col]) {
                ctx.beginPath();
                ctx.arc(
                    col * CELL_SIZE + CELL_SIZE / 2,
                    row * CELL_SIZE + CELL_SIZE / 2,
                    DOT_SIZE,
                    0,
                    Math.PI * 2
                );
                ctx.fillStyle = DOT_COLOR;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Draw score
function drawScore() {
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${player.score}`, 10, 30);
}

// Game loop
function gameLoop() {
    // Clear canvas
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw game elements
    drawTitle(); // Add title to the game screen
    drawDots();
    player.move();
    player.draw();
    //drawScore();

    // Check for game end
    const remainingDots = dots.flat().filter(dot => dot === 1).length;
    if (remainingDots === 0) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Game Over! Final Score: ${player.score}`, canvas.width/2, canvas.height/2);
        return;
    }

    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
