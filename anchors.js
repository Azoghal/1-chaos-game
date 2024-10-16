
// anchor sets we can choose from
// these can actually be functions of width and height

// STANDARD = we defeine points anti clockwise starting from right, vector 1,0, as with radians

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
    return [top, bottom_left,bottom_right,];
}


function squareAnchors(padding){
    const one = createVector(width-padding,padding);
    const two = createVector(padding,padding);
    const three = createVector(padding, height-padding);
    const four = createVector(width-padding,height-padding);
    return [one,two,three,four]
}

function nGonAnchors(n) {
    if (n==4){
        return squareAnchors(40);
    }
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
