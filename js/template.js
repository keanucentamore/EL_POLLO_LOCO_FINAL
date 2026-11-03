/**
 * Returns the content of the end screen for a win or a loss.
 * @param {boolean} hasWon - true if the final boss was defeated
 * @returns {string} HTML of the end screen
 */
function getEndScreenTemplate(hasWon) {
    const image = hasWon ? "you-won.png" : "you-lost.png";
    const text = hasWon ? "You won!" : "Oh no, you lost!";
    return `
        <img class="end-screen-image" src="./assets/images/9_intro_outro_screens/${image}" alt="${text}">
        <div class="end-screen-buttons">
            <button class="button" id="restart-button" onclick="restartGame()">Play again</button>
            <button class="button button-secondary" onclick="goToHome()">Home</button>
        </div>
    `;
}
