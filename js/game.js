let canvas;
let world;
let keyboard = new Keyboard();
let soundIsOn = false;

let start_sound = new Audio('assets/audio/audio_start.mp3');

/**
 * Start the game, create world and canvas
 * 
 * 
 */
function init() {
    document.getElementById('game').style.display = "flex";
    document.getElementById('startScreen').style.display = "none";
    document.getElementById('endScreen').style.display = "none";
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    playSound();
    bindBtnPressEvents();
    
    //console.log('My Character is', world.character);
}

/**
 * Replay the game
 * 
 * 
 */
function replay(){
    window.location.href = 'index.html';
}

/**
 * Check if sound is enabled and play startsound
 * 
 * 
 */
function playSound(){
    if (soundIsOn) {
        start_sound.play();
    }
}

/**
 * Set sound on
 * 
 * 
 */
function soundOn(){
    document.getElementById('soundOff').style.display = 'none';
    document.getElementById('soundStartOff').style.display = 'none';
    soundIsOn = true;
    world.soundOn = true;
}

/**
 * Set sound off
 * 
 * 
 */
function soundOff(){
    document.getElementById('soundOff').style.display = 'block';
    document.getElementById('soundStartOff').style.display = 'block';
    soundIsOn = false;
    world.soundOn = false;
}

  function bindBtnPressEvents(){
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('btnUp').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });
    
    document.getElementById('btnUp').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });

    document.getElementById('btnD').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    
    document.getElementById('btnD').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
  }

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
    if (e.key == "e") {
        exitFullscreen();
    }
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});

