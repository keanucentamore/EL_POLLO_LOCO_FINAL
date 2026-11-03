let canvas;
let world;
let keyboard = new Keyboard();
let soundManager;
let intervalIds = [];
const keyActions = {
    ArrowLeft: "left",
    ArrowRight: "right",
    ArrowUp: "jump",
    " ": "jump",
    d: "throwBottle",
    D: "throwBottle"
};


/**
 * Prepares the page: canvas, sounds, keyboard and fullscreen.
 */
function init() {
    canvas = document.getElementById("canvas");
    soundManager = new SoundManager();
    updateMuteButton();
    hideUnsupportedFullscreen();
    window.addEventListener("keydown", (event) => handleKey(event, true));
    window.addEventListener("keyup", (event) => handleKey(event, false));
    document.addEventListener("fullscreenchange", updateFullscreenState);
}


/**
 * Starts a new game with a fresh world and music.
 */
function startGame() {
    keyboard = new Keyboard();
    document.getElementById("start-screen").classList.add("d-none");
    document.getElementById("end-screen").classList.add("d-none");
    document.getElementById("touch-controls").classList.remove("d-none");
    world = new World(canvas, keyboard);
    soundManager.stopAll();
    soundManager.playLoop("music");
    soundManager.play("voiceStart");
}


/**
 * Stores an interval ID so the game can be stopped completely later.
 * @param {Function} callback - the repeated function
 * @param {number} time - interval in milliseconds
 */
function setStoppableInterval(callback, time) {
    const id = setInterval(callback, time);
    intervalIds.push(id);
}


/**
 * Stops all intervals, the drawing loop and all sounds.
 */
function stopGame() {
    intervalIds.forEach((id) => clearInterval(id));
    intervalIds = [];
    world.isRunning = false;
    soundManager.stopAll();
    document.getElementById("touch-controls").classList.add("d-none");
}


/**
 * Ends the game and shows the matching end screen.
 * @param {boolean} hasWon - true if the final boss was defeated
 */
function endGame(hasWon) {
    stopGame();
    showEndScreen(hasWon);
    soundManager.play(hasWon ? "win" : "lose");
    soundManager.play(hasWon ? "voiceWin" : "voiceLose");
}


/**
 * Fills the end screen via the template and shows it.
 * @param {boolean} hasWon - true if the final boss was defeated
 */
function showEndScreen(hasWon) {
    const endScreen = document.getElementById("end-screen");
    endScreen.innerHTML = getEndScreenTemplate(hasWon);
    endScreen.classList.remove("d-none");
    document.getElementById("restart-button").focus();
}


/**
 * Starts a new game right after the game has ended, without reloading the page.
 */
function restartGame() {
    startGame();
}


/**
 * Returns to the start screen after the game has ended.
 */
function goToHome() {
    document.getElementById("end-screen").classList.add("d-none");
    document.getElementById("start-screen").classList.remove("d-none");
    document.getElementById("start-button").focus();
}


/**
 * Checks whether a game is currently running.
 * @returns {boolean} true while a game is running
 */
function isGameRunning() {
    return world !== undefined && world.isRunning;
}


/**
 * Passes a key press to the keyboard object and closes the dialog on Escape.
 * @param {KeyboardEvent} event - the keyboard event
 * @param {boolean} isPressed - true on press, false on release
 */
function handleKey(event, isPressed) {
    if (event.key === "Escape") {
        closeDialog();
    }
    const action = keyActions[event.key];
    if (action !== undefined && isGameRunning()) {
        event.preventDefault();
        keyboard[action] = isPressed;
    }
}


/**
 * Presses a game action via a touch button.
 * @param {string} action - name of the action in the keyboard object
 * @param {PointerEvent} event - the pointer event
 */
function pressTouchButton(action, event) {
    event.preventDefault();
    keyboard[action] = true;
}


/**
 * Releases a game action of the touch button.
 * @param {string} action - name of the action in the keyboard object
 */
function releaseTouchButton(action) {
    keyboard[action] = false;
}


/**
 * Mutes or unmutes all sounds.
 */
function toggleMute() {
    soundManager.toggleMute();
    updateMuteButton();
}


/**
 * Shows the icon on the mute button that matches the current state.
 */
function updateMuteButton() {
    const icon = document.getElementById("mute-icon");
    icon.src = soundManager.isMuted ? "./assets/icons/sound-off.svg" : "./assets/icons/sound-on.svg";
    icon.alt = soundManager.isMuted ? "Unmute sound" : "Mute sound";
}


/**
 * Hides the fullscreen button if the browser does not allow fullscreen.
 */
function hideUnsupportedFullscreen() {
    if (!document.fullscreenEnabled) {
        document.getElementById("fullscreen-button").classList.add("d-none");
    }
}


/**
 * Switches the game into fullscreen mode or back.
 */
function toggleFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.getElementById("game").requestFullscreen();
    }
}


/**
 * Adjusts layout and icon as soon as fullscreen mode changes.
 */
function updateFullscreenState() {
    const game = document.getElementById("game");
    const icon = document.getElementById("fullscreen-icon");
    if (document.fullscreenElement) {
        game.classList.add("fullscreen");
        icon.src = "./assets/icons/fullscreen-exit.svg";
        icon.alt = "Exit fullscreen";
    } else {
        game.classList.remove("fullscreen");
        icon.src = "./assets/icons/fullscreen-enter.svg";
        icon.alt = "Enter fullscreen";
    }
}


/**
 * Opens the dialog with story and controls and moves the focus into it.
 */
function openDialog() {
    document.getElementById("dialog").classList.remove("d-none");
    document.getElementById("dialog-close").focus();
}


/**
 * Closes the dialog and returns the focus to the button that opened it.
 */
function closeDialog() {
    const dialog = document.getElementById("dialog");
    if (dialog.classList.contains("d-none")) {
        return;
    }
    dialog.classList.add("d-none");
    document.getElementById("how-to-play-button").focus();
}
