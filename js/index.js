console.log('Here is some JavaScript');

document.addEventListener('DOMContentLoaded', setHeights);

function setHeights() {
    const height = document.body.scrollHeight;
    console.log(height);
    document.getElementById('left').style.height = `${height}px`;
    document.getElementById('right').style.height = `${height}px`;
}
