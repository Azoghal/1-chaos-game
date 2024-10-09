// render_setups

function renderTransparent(v) {
    return function () {
        stroke(0, 0, 0, v);
        strokeWeight(1);
    }
}

function renderOpaque() {
    stroke(0);
    strokeWeight(1);
}