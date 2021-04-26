document.addEventListener('DOMContentLoaded', dragger, { passive: true });

async function dragger() {
    await sleep(200);

    let draggerPosition = window.innerWidth * 0.475;

    const dragger = document.getElementById('dragger');
    const leftSide = document.getElementById('left');
    const leftBorderGrabbableWidth = 20;
    updateElementPositons();

    dragger.addEventListener('mousedown', draggerGrabbed, { passive: true });
    dragger.addEventListener('touchstart', draggerGrabbed, { passive: true });
    leftSide.addEventListener('mousedown', borderGrabbed, { passive: true });
    leftSide.addEventListener('touchstart', borderGrabbed, { passive: true });

    function draggerGrabbed(e) {
        dragStart = e.clientX || e.changedTouches[0].clientX;
        document.addEventListener('mousemove', draggerDragged, {
            passive: false,
        });
        document.addEventListener('touchmove', draggerDragged, {
            passive: false,
        });
        document.addEventListener('mouseup', draggerDropped, {
            passive: false,
        });
        document.addEventListener('touchend', draggerDropped, {
            passive: false,
        });
    }

    function borderGrabbed(e) {
        const start = e.clientX || e.changedTouches[0].clientX;
        if (start > leftSide.offsetWidth - leftBorderGrabbableWidth) {
            dragStart = start;
            document.addEventListener('mousemove', draggerDragged, {
                passive: true,
            });
            document.addEventListener('touchmove', draggerDragged, {
                passive: true,
            });
            document.addEventListener('mouseup', draggerDropped, {
                passive: true,
            });
            document.addEventListener('touchend', draggerDropped, {
                passive: true,
            });
        }
    }

    function draggerDragged(e) {
        if (e.clientX) {
            e.preventDefault();
        }
        const draggerWasDragged = draggerPosition - (e.clientX || e.changedTouches[0].clientX);
        if (draggerPosition - draggerWasDragged > 0 || draggerPosition - draggerWasDragged < window.innerWidth) {
            draggerPosition = draggerPosition - draggerWasDragged;
        }
        updateElementPositons();
    }

    function draggerDropped() {
        document.removeEventListener('mousemove', draggerDragged, {
            passive: true,
        });
        document.removeEventListener('touchmove', draggerDragged, {
            passive: true,
        });
        document.removeEventListener('mouseup', draggerDropped, {
            passive: true,
        });
        document.removeEventListener('touchend', draggerDropped, {
            passive: true,
        });
    }

    function updateElementPositons() {
        dragger.style.left = `${draggerPosition}px`;
        leftSide.style.width = `${draggerPosition}px`;
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
