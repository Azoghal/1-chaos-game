// calculates the perfect packing ratio for regular polygons
function perfectRatio(n){
    angleMode(RADIANS)
    let r = n%4;
    let ratio
    switch (r) {
      case 0:
        ratio = 1 / (1 + tan(PI/n));
        break;
      case 1:
      case 3:
        ratio = 1 / (1 + 2*sin(PI/(2*n)));
        break;
      case 2:
        ratio = 1 / (1 + sin(PI/n));
        break;
      default:
        throw exception("frank") 
    }
    angleMode(DEGREES)
    return ratio
}

// actions. Make sure we pass these copied vals.
function halfway(pos, target) {
    return pos.add((target.sub(pos)).mult(0.5));
}
  
function thirdways(pos, target) {
    return pos.add((target.sub(pos)).div(3));
}
  
function perfectAction(n){
    ratio = perfectRatio(n)
    return ratioAction(ratio);
}
  
function ratioAction(ratio){
    return function(pos, target){
      return pos.add((target.sub(pos)).mult(ratio));
    }
}