class SoundManager {
    /**
     * Loads all sounds and applies the saved mute state.
     */
    constructor() {
        this.sounds = {};
        this.addSounds(this.getGameSounds());
        this.addSounds(this.getEffectSounds());
        this.addSounds(this.getVoiceSounds());
        this.isMuted = this.loadMuteState();
        this.applyMuteState();
    }


    /**
     * Returns the music and Pepe's sounds.
     * @returns {Object[]} name, file, volume and loop for each sound
     */
    getGameSounds() {
        return [
            { name: "music", file: "music.mp3", volume: 0.15, loop: true },
            { name: "walk", file: "walk.mp3", volume: 0.4, loop: true },
            { name: "snore", file: "snore.mp3", volume: 0.4, loop: true },
            { name: "jump", file: "jump.mp3", volume: 0.3, loop: false },
            { name: "hurt", file: "hurt.mp3", volume: 0.5, loop: false },
            { name: "win", file: "win.mp3", volume: 0.5, loop: false },
            { name: "lose", file: "lose.mp3", volume: 0.5, loop: false }
        ];
    }


    /**
     * Returns the sounds of enemies and items.
     * @returns {Object[]} name, file, volume and loop for each sound
     */
    getEffectSounds() {
        return [
            { name: "coin", file: "coin.mp3", volume: 0.3, loop: false },
            { name: "bottlePickup", file: "bottle-pickup.mp3", volume: 0.4, loop: false },
            { name: "throw", file: "throw.mp3", volume: 0.4, loop: false },
            { name: "bottleBreak", file: "bottle-break.mp3", volume: 0.4, loop: false },
            { name: "chickenDead", file: "chicken-dead.mp3", volume: 0.4, loop: false },
            { name: "bossAlert", file: "boss-alert.mp3", volume: 0.5, loop: false },
            { name: "bossHurt", file: "boss-hurt.mp3", volume: 0.5, loop: false }
        ];
    }


    /**
     * Returns Pepe's spoken voice lines.
     * @returns {Object[]} name, file, volume and loop for each sound
     */
    getVoiceSounds() {
        return [
            { name: "voiceStart", file: "voice-start.mp3", volume: 0.8, loop: false },
            { name: "voiceHurt", file: "voice-hurt.mp3", volume: 0.8, loop: false },
            { name: "voiceThrow", file: "voice-throw.mp3", volume: 0.8, loop: false },
            { name: "voiceBoss", file: "voice-boss.mp3", volume: 0.8, loop: false },
            { name: "voiceSleep", file: "voice-sleep.mp3", volume: 0.8, loop: false },
            { name: "voiceCoins", file: "voice-coins.mp3", volume: 0.8, loop: false },
            { name: "voiceWin", file: "voice-win.mp3", volume: 0.8, loop: false },
            { name: "voiceLose", file: "voice-lose.mp3", volume: 0.8, loop: false }
        ];
    }


    /**
     * Creates an audio object for each entry and stores it under its name.
     * @param {Object[]} entries - name, file, volume and loop for each sound
     */
    addSounds(entries) {
        entries.forEach((entry) => {
            const audio = new Audio(`./assets/audio/${entry.file}`);
            audio.volume = entry.volume;
            audio.loop = entry.loop;
            this.sounds[entry.name] = audio;
        });
    }


    /**
     * Plays a sound from the beginning.
     * @param {string} name - name of the sound
     */
    play(name) {
        const sound = this.sounds[name];
        sound.currentTime = 0;
        sound.play().catch(() => {});
    }


    /**
     * Plays a voice line only if the same line is not already playing.
     * @param {string} name - name of the voice line
     */
    playVoice(name) {
        if (this.sounds[name].paused) {
            this.play(name);
        }
    }


    /**
     * Starts a looping sound if it is not already playing.
     * @param {string} name - name of the sound
     */
    playLoop(name) {
        const sound = this.sounds[name];
        if (sound.paused) {
            sound.play().catch(() => {});
        }
    }


    /**
     * Pauses a sound at its current position.
     * @param {string} name - name of the sound
     */
    pause(name) {
        this.sounds[name].pause();
    }


    /**
     * Stops all sounds and rewinds them to the beginning.
     */
    stopAll() {
        Object.values(this.sounds).forEach((sound) => {
            sound.pause();
            sound.currentTime = 0;
        });
    }


    /**
     * Mutes or unmutes all sounds and saves the state.
     */
    toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem("isMuted", JSON.stringify(this.isMuted));
        this.applyMuteState();
    }


    /**
     * Applies the mute state to all sounds.
     */
    applyMuteState() {
        Object.values(this.sounds).forEach((sound) => {
            sound.muted = this.isMuted;
        });
    }


    /**
     * Reads the saved mute state from local storage.
     * @returns {boolean} true if sound was muted last time
     */
    loadMuteState() {
        return JSON.parse(localStorage.getItem("isMuted")) === true;
    }
}
