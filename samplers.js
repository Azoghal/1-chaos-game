// samplers
function first(array) {
    if (array.length == 0) {
        throw exception("oh no")
    }
    return array[0]
}

function randomSample(array) {
    let choices = array.length;
    if (array.length == 0) {
        throw execption("oh no");
    }
    return random(array);
}

function randomSampleNotSameTwice() {
    let inner = randomSampleWithRejectionRules([rejectSameTwice]);
    console.log("inner", inner);
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
        return properMod((choice-last),4)  == 1
    }
}

function reject(choice, history) {
    return true
}