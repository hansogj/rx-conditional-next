"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function conditionalNext(subject, nextVal, criteria) {
    if (criteria === void 0) { criteria = function (updateVal, currentValue) {
        if (updateVal === void 0) { updateVal = nextVal; }
        if (currentValue === void 0) { currentValue = subject.value; }
        return updateVal !== currentValue;
    }; }
    var shouldUpdate = criteria(nextVal, subject.value);
    if (shouldUpdate) {
        subject.next(nextVal);
    }
    var res = {
        onNext: function (fn) {
            if (typeof fn === 'function' && shouldUpdate) {
                fn(nextVal);
            }
            return res;
        },
        onStop: function (fn) {
            if (typeof fn === 'function' && !shouldUpdate) {
                fn(nextVal);
            }
            return res;
        },
    };
    return res;
}
exports.conditionalNext = conditionalNext;
