// render_setups

function renderTransparent(v) {
    return function (g, c) {
        let cc = c;
        cc.setAlpha(v);
        g.stroke(cc);
        g.strokeWeight(1);
    }
}

function renderOpaque(g, c) {
    g.stroke(0);
    g.strokeWeight(1);
}