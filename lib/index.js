"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function conditionalNext(subject, nextVal, criteria) {
    if (criteria === void 0) { criteria = function (updateValue, currentValue) {
        if (updateValue === void 0) { updateValue = nextVal; }
        if (currentValue === void 0) { currentValue = subject.value; }
        return updateValue !== currentValue;
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
        value: shouldUpdate ? nextVal : subject.value,
    };
    return res;
}
exports.conditionalNext = conditionalNext;
//# sourceMappingURL=index.js.map