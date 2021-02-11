console.log('Here is some JavaScript');

let draggerPosition = window.innerWidth / 2;

const dragger = document.getElementById('dragger');
const leftSide = document.getElementById('left');
const leftBorderGrabbableWidth = 10;
updateElementPositons();

dragger.addEventListener('mousedown', draggerGrabbed);
leftSide.addEventListener('mousedown', borderGrabbed);

function draggerGrabbed(e) {
    dragStart = e.clientX;
    document.addEventListener('mousemove', draggerDragged);
    document.addEventListener('mouseup', draggerDropped);
}

function borderGrabbed(e) {
    if (e.offsetX > leftSide.offsetWidth - leftBorderGrabbableWidth) {
        dragStart = e.clientX;
        document.addEventListener('mousemove', draggerDragged);
        document.addEventListener('mouseup', draggerDropped);
    }
}

function draggerDragged(e) {
    e.preventDefault();
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
