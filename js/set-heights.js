document.addEventListener('DOMContentLoaded', setHeights);

async function setHeights() {
    await sleep(50);
    const left = document.getElementById('left');
    const right = document.getElementById('right');

    if (left.offsetHeight < right.offsetHeight) {
        left.style.height = `${right.offsetHeight + 30}px`;
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
