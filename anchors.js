
// anchor sets we can choose from
// these can actually be functions of width and height

// just one point
function onePoint() {
    return [createVector(width - 10, height - 10)];
}

function triangleAnchors() {
    const padding = 50;
    const vert = height - 2 * padding;
    const top = createVector(width / 2, padding);
    const bottom = height - padding;
    const bottom_left = createVector((width / 2) - (vert / tan(60)), bottom);
    const bottom_right = createVector((width / 2) + (vert / tan(60)), bottom);
    return [bottom_left, top, bottom_right];
}

function nGonAnchors(n) {
    return nGonAnchorsRadius(n, (width/2) - 50);
}

function nGonAnchorsRadius(n, radius){
    const startAtTop = (n % 2) == 1;
    const startAngle = startAtTop ? -90 : 0;
    const angle = 360 / n;
    const center = createVector(width / 2, height / 2);
    var anchors = []

    for (i = 0; i < n; i++) {
        anchors.push(createVector(center.x + radius * cos(startAngle + i * angle), center.y + radius * sin(startAngle + i * angle)));
    }

    return anchors;
}
