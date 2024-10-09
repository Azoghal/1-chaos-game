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
    if (history.length < 2) {
        throw new Error("history is empty")
    }
    last = history[1];
    return choice == last;
}

function rejectSameAsPenultimate(choice, history) {
    if (history.length < 1) {
        throw new Error("history is empty")
    }
    penum = history[0];
    return choice == penum;
}

function reject(choice, history) {
    return true
}