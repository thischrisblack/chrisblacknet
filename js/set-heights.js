document.addEventListener('DOMContentLoaded', setHeights, { passive: true });

async function setHeights() {
    await sleep(100);
    const left = document.getElementById('left');
    const right = document.getElementById('right');

    if (left.offsetHeight < right.offsetHeight) {
        console.log('Height Adjustment Triggered:');
        console.log('Left: ', left.offsetHeight);
        console.log('Right: ', right.offsetHeight);
        left.style.height = `${right.offsetHeight + 30}px`;
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
