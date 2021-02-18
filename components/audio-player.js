const audioPlayerStyles = `
#title {
    font-style: italic;
    font-size: 1.4rem;
    margin-bottom: .2rem;
}

#controls {
    display: inline-block;
    width: 5rem;
    font-weight: 700;
    cursor: pointer;
    padding: 0;
    font-size: 1rem;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    background-image: url(images/static01.gif);
    background-size: 12000%;
}

#timer {
    color: #333;
    padding: 0;
}

#progress-bar {
    background-image: url(images/static04.gif);
    background-size: cover;
    width: 0px;
    height: 1px;
    display: block;
}`;

const formatTimer = (time) => {
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

        const title = document.createElement('div');
        title.id = 'title';
        shadowRoot.appendChild(title);

        const controls = document.createElement('span');
        controls.id = 'controls';
        controls.textContent = 'PLAY';
        shadowRoot.appendChild(controls);

        const timer = document.createElement('span');
        timer.id = 'timer';
        shadowRoot.appendChild(timer);

        const progressBar = document.createElement('span');
        progressBar.id = 'progress-bar';
        shadowRoot.appendChild(progressBar);

        console.log('Constructed.');
    }

    connectedCallback() {
        console.log('Audio Player element added to page.');
    }

    disconnectedCallback() {
        console.log('Audio Player element removed from page.');
    }

    adoptedCallback() {
        console.log('Audio Player element moved to new page.');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(
            'Audio Player element attributes changed.',
            name,
            oldValue,
            newValue
        );
        const { shadowRoot } = this;

        if (name === 'src') {
            this.initializeAudioPlayer(newValue, shadowRoot);
        }

        if (name === 'name') {
            shadowRoot.getElementById('title').textContent = newValue;
        }
    }

    initializeAudioPlayer(src, shadowRoot) {
        const player = document.createElement('audio');
        const source = document.createElement('source');
        source.src = src;
        source.type = 'audio/mpeg';
        player.appendChild(source);
        shadowRoot.appendChild(player);
        console.log(player);
        player.oncanplay = () => {
            this.duration = player.duration;
            console.log('WOOO', this.duration);
        };
        // onCanPlay (set audioElement current.duration)
        // onTimeUpdate (updateProgress)
        // onEnded (reset audio if needed)
        // onError
    }
}

customElements.define('audio-player', AudioPlayer);
