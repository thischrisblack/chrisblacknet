console.log('Here is some JavaScript');

let draggerPosition = window.innerWidth / 2;

const dragger = document.getElementById('dragger');
const leftSide = document.getElementById('code');
updateElementPositons();

dragger.addEventListener('mousedown', draggerGrabbed);

function draggerGrabbed(e) {
    dragStart = e.clientX;
    document.addEventListener('mousemove', draggerDragged);
    document.addEventListener('mouseup', draggerDropped);
}

function draggerDragged(e) {
    const draggerWasDragged = draggerPosition - e.clientX;
    draggerPosition = draggerPosition - draggerWasDragged;
    updateElementPositons();
}

function draggerDropped() {
    document.removeEventListener('mousemove', draggerDragged);
    document.removeEventListener('mouseup', draggerDropped);
}

function updateElementPositons() {
    dragger.style.left = `${draggerPosition}px`;
    leftSide.style.width = `${draggerPosition}px`;
}
