// samplers
function first(array) {
    if (array.length == 0) {
        throw new Error("oh no")
    }
    return array[0]
}

function randomSample(array) {
    let choices = array.length;
    if (array.length == 0) {
        throw new Error("oh no");
    }
    return random(array);
}

function probabilitiesSample(probabilities){
    const total = probabilities.reduce(function(acc, v){return acc+v})
    if (total != 1) {
        throw new Error("oh no")
    } 
    return function(array) {
        if (array.length != probabilities.length){
            throw new Error("oh no")
        }
        const r = random()
        let seenSoFar = 0;
        for (var ppp = 0; ppp < probabilities.length; ppp+=1) {
            const checkLessThan = probabilities[ppp] + seenSoFar 
            if (r < (checkLessThan)){
                return array[ppp]
            }
            seenSoFar += probabilities[ppp]
        }
        throw new Error("wasn't expecting to get this far")
    }
}

function randomSampleNotSameTwice() {
    let inner = randomSampleWithRejectionRules([rejectSameTwice]);
    return inner;
}

// rejectionRules is an array of functions that return true if the rule is met - i.e. the choice must be disregarded.
function randomSampleWithRejectionRules(rejectionRules) {
    let sampler = function (array, history) {
        let choices = array.length;
        if (array.length < 0) {
            throw "oh no";
        }
        let choice;
        let retryCount = 0;
        while (retryCount < MAX_REJECTIONS) {
            choice = random(array);
            const rejections = rejectionRules.map((f) => f(choice, history));
            let rejected = !rejections.every((x) => x == false);
            if (!rejected) {
                break;
            }
            retryCount++;
        }
        return choice
    }
    return sampler
}

// rejectionRules
function rejectSameTwice(choice, history) {
    if (history.length < 1) {
        throw new Error("history is insufficient")
    }
    last = history[0];
    return choice == last;
}

function rejectSameAsPenultimate(choice, history) {
    if (history.length < 2) {
        throw new Error("history is insufficient")
    }
    penum = history[1];
    return choice == penum;
}


// TODO the below has revealed that an efficient way to represent these rejection
// rules might be to provide a mask xbar that diff % n isn't x_i
// i.e. the mask could be [0,1,0,3] to say reject if (choice - last)%4 == (1 or 3)  

// JS % gives negative values which is i don't like
function properMod(n,m){
    return ((n%m)+m)%m
}

function rejectAntiClockwiseInNgon(n){
    return function(choice, history){
        // assume points are decided... anti-clockwise, reject if we are one more
        if (history.length < 1) {
            throw new Error("history is insufficient")
        }
        last = history[0];
        return properMod((choice-last),n)  == 1
    }
}

// allows you to e.j reject those that are anticlockwise, clockwise, by any number of points
// mask is a list of differences after modulo that should cause a rejection
// i.e. 1 and 3 for a square, if you want to reject both neighbours
function rejecCertainNeighboursInNgon(n, mask){
    return function(choice, history){
        // assume points are decided... anti-clockwise, reject if we are one more
        if (history.length < 1) {
            throw new Error("history is insufficient")
        }
        last = history[0];
        return mask.includes(properMod((choice-last),n))
    }
}

function rejectNeighbourIfLastTwoSame(n){
    return function(choice, history){
        const neighbourMask = [1,n-1]
        if (history.length < 2) {
            throw new Error("history is insufficient")
        }
        last = history[0];
        penum = history[1];
        if (last != penum){
            return false
        }
        return neighbourMask.includes(properMod((choice-last),n))
    }
}


function reject(choice, history) {
    return true
}