let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    document.getElementById('game').style.display = "flex";
    document.getElementById('startScreen').style.display = "none";
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
}

function fullScreen(){
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
    document.getElementById('canvas').style.height = '100vh';
    document.getElementById('canvas').style.width = '100vw';
    document.getElementById('fullScreenImage').src = "assets/img/fullscreen-exit.png"
    document.getElementById('fullScreenImageDiv').style.top = '20px';
    document.getElementById('fullScreenImage').onclick = exitFullscreen;
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
    document.getElementById('fullScreenImageDiv').style.top = '160px';
    document.getElementById('fullScreenImage').onclick = fullScreen;
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

