
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

function squareWithCentreAnchors(padding){
    const corners = squareAnchors(padding)
    const centre = createVector(width/2,height/2);
    return [centre, ...corners]
}

function squareWithMidpointAnchors(padding){
    const one = createVector(width-padding,padding);
    const onem = createVector(width/2, padding);
    const two = createVector(padding,padding);
    const twom = createVector(padding,height/2);
    const three = createVector(padding, height-padding);
    const threem = createVector(width/2, height-padding);
    const four = createVector(width-padding,height-padding);
    const fourm = createVector(width-padding, height/2);
    return [one, onem, two, twom, three, threem, four, fourm]
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

function fernAnchors(){
    return [
        createVector(0,0,0),
        createVector(0,0,1),
        createVector(0,0,2),
        createVector(0,0,3),
    ]
}