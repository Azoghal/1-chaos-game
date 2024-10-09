
// anchor sets we can choose from
// these can actually be functions of width and height

// just one point
function onePoint() {
    return [createVector(width - 10, height - 10)];
}

function triangleAnchors() {
    let padding = 50;
    let vert = height - 2 * padding;
    let top = createVector(width / 2, padding);
    let bottom = height - padding;
    let bottom_left = createVector((width / 2) - (vert / tan(60)), bottom);
    let bottom_right = createVector((width / 2) + (vert / tan(60)), bottom);
    return [bottom_left, top, bottom_right];
}

function nGonAnchors(n) {
    let startAtTop = (n % 2) == 1;
    let startAngle = startAtTop ? -90 : 0;
    let angle = 360 / n;
    let center = createVector(width / 2, height / 2);
    let padding = 50;
    let radius = (width / 2) - 50;
    var anchors = []

    for (i = 0; i < n; i++) {
        anchors.push(createVector(center.x + radius * cos(startAngle + i * angle), center.y + radius * sin(startAngle + i * angle)));
    }

    return anchors;
}
