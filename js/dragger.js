document.addEventListener('DOMContentLoaded', dragger);

async function dragger() {
    await sleep(100);

    let draggerPosition = window.innerWidth * 0.475;

    const dragger = document.getElementById('dragger');
    const leftSide = document.getElementById('left');
    const leftBorderGrabbableWidth = 20;
    updateElementPositons();

    dragger.addEventListener('mousedown', draggerGrabbed);
    dragger.addEventListener('touchstart', draggerGrabbed);
    leftSide.addEventListener('mousedown', borderGrabbed);
    leftSide.addEventListener('touchstart', borderGrabbed);

    function draggerGrabbed(e) {
        dragStart = e.clientX || e.changedTouches[0].clientX;
        document.addEventListener('mousemove', draggerDragged);
        document.addEventListener('touchmove', draggerDragged);
        document.addEventListener('mouseup', draggerDropped);
        document.addEventListener('touchend', draggerDropped);
    }

    function borderGrabbed(e) {
        const start = e.clientX || e.changedTouches[0].clientX;
        if (start > leftSide.offsetWidth - leftBorderGrabbableWidth) {
            dragStart = start;
            document.addEventListener('mousemove', draggerDragged);
            document.addEventListener('touchmove', draggerDragged);
            document.addEventListener('mouseup', draggerDropped);
            document.addEventListener('touchend', draggerDropped);
        }
    }

    function draggerDragged(e) {
        if (e.clientX) {
            e.preventDefault();
        }
        const draggerWasDragged =
            draggerPosition - (e.clientX || e.changedTouches[0].clientX);
        if (
            draggerPosition - draggerWasDragged > 0 ||
            draggerPosition - draggerWasDragged < window.innerWidth
        ) {
            draggerPosition = draggerPosition - draggerWasDragged;
        }
        updateElementPositons();
    }

    function draggerDropped() {
        document.removeEventListener('mousemove', draggerDragged);
        document.removeEventListener('touchmove', draggerDragged);
        document.removeEventListener('mouseup', draggerDropped);
        document.removeEventListener('touchend', draggerDropped);
    }

    function updateElementPositons() {
        dragger.style.left = `${draggerPosition}px`;
        leftSide.style.width = `${draggerPosition}px`;
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
