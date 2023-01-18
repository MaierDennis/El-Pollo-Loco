let canvas;
let world;
let keyboard = new Keyboard();
let soundIsOn = false;

let start_sound = new Audio('assets/audio/audio_start.mp3');

function init() {
    document.getElementById('game').style.display = "flex";
    document.getElementById('startScreen').style.display = "none";
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    playSound();
    //checkOnTouch();
    
    //console.log('My Character is', world.character);
}

function playSound(){
    if (soundIsOn) {
        start_sound.play();
    }
}

function soundOn(){
    document.getElementById('soundOff').style.display = 'none';
    document.getElementById('soundStartOff').style.display = 'none';
    soundIsOn = true;
    world.soundOn = true;
}

function soundOff(){
    document.getElementById('soundOff').style.display = 'block';
    document.getElementById('soundStartOff').style.display = 'block';
    soundIsOn = false;
    world.soundOn = false;
}

function fullScreen(){
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
    document.getElementById('canvas').style.height = '100vh';
    document.getElementById('canvas').style.width = '100vw';
    document.getElementById('fullScreenImage').src = "assets/img/fullscreen-exit.png"
    document.getElementById('fullScreenImageDiv').style.top = '20px';
    document.getElementById('fullScreenImage').onclick = exitFullscreen;
    document.getElementById('keys').style.display = 'none';
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    document.getElementById('canvas').style.height = '480px';
    document.getElementById('canvas').style.width = '720px';
    document.getElementById('fullScreenImage').src = 'assets/img/fullscreen.png';
    document.getElementById('fullScreenImageDiv').style.top = '200px';
    document.getElementById('fullScreenImage').onclick = fullScreen;
    document.getElementById('keys').style.display = 'flex';
  }
 
  function checkOnTouch(){
    setInterval(() => {
        bindBtnPressEvents();
    }, 10);
  }

  function bindBtnPressEvents(){
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        world.keyboard.RIGHT = false;
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
    
    document.getElementById('btnUP').addEventListener('touchend', (e) => {
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

