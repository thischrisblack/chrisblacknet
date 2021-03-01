const audioPlayerStyles = `
#title {
    font-style: italic;
    font-size: 100%;
    margin-bottom: .2rem;
}

#controls {
    display: inline-block;
    width: 4rem;
    font-weight: 700;
    cursor: pointer;
    padding: 0;
    font-size: 80%;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    background-image: url(images/static01.gif);
    background-size: 12000%;
}

#timer {
    font-size: 80%;
    font-weight: 700;
    padding: 0;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    background-image: url(images/static04.gif);
    background-size: 100%;
}

#progress-bar {
    background-image: url(images/static04.gif);
    background-size: cover;
    width: 0%;
    height: 2px;
    display: block;
}`;

const formatTime = (time) => {
    const roundedSeconds = Math.floor(time);
    const minutes = Math.floor(roundedSeconds / 60);
    const seconds = roundedSeconds % 60;
    const result = minutes + ':' + seconds.toString().padStart(2, '0');
    return result;
};

class AudioPlayer extends HTMLElement {
    static get observedAttributes() {
        return ['src', 'name'];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = audioPlayerStyles;
        shadowRoot.appendChild(style);

        const songTitle = document.createElement('div');
        songTitle.id = 'title';
        shadowRoot.appendChild(songTitle);
        this.songTitle = songTitle;

        const controls = document.createElement('span');
        controls.id = 'controls';
        controls.textContent = 'PLAY';
        shadowRoot.appendChild(controls);
        controls.onclick = this.playOrPauseAudio;
        this.controls = controls;

        const timer = document.createElement('span');
        timer.id = 'timer';
        shadowRoot.appendChild(timer);
        this.timer = timer;

        const progressBar = document.createElement('div');
        progressBar.id = 'progress-bar';
        shadowRoot.appendChild(progressBar);
        this.progressBar = progressBar;
    }

    connectedCallback() {}

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'src') {
            this.initializeAudioPlayer(newValue);
        }
        if (name === 'name') {
            this.songTitle.textContent = newValue;
        }
    }

    initializeAudioPlayer = (src) => {
        const player = document.createElement('audio');
        const source = document.createElement('source');
        source.src = src;
        source.type = 'audio/mpeg';
        player.appendChild(source);
        this.appendChild(player);
        player.oncanplay = () => {
            this.duration = player.duration;
            this.player = player;
        };
        player.ontimeupdate = this.updateTime;
        player.onended = this.resetAudio;
        player.onerror = () => {
            this.controls.textContent = 'ERROR :(';
        };
    };

    playOrPauseAudio = () => {
        if (this.player.paused) {
            this.player.play();
            this.controls.textContent = 'STOP';
        } else {
            this.player.pause();
            this.controls.textContent = 'PLAY';
        }
    };

    updateTime = () => {
        this.timer.textContent = `${formatTime(
            this.player.currentTime
        )} / ${formatTime(this.duration)}`;
        this.percent = (this.player.currentTime / this.duration) * 100;
        this.progressBar.style.width = `${this.percent}%`;
    };

    resetAudio = () => {
        this.player.pause();
        this.player.currentTime = 0;
        // This is redundant but let's be redundant.
        this.progressBar.style.width = '0%';
        this.controls.textContent = 'PLAY';
        this.timer.textContent = '';
    };
}

customElements.define('audio-player', AudioPlayer);
