import { BehaviorSubject } from 'rxjs';
export interface INextStep<T> {
    onNext: (fn: (nextVal: T) => void) => INextStep<T>;
    onStop: (fn: (currVal: T) => void) => INextStep<T>;
}
export declare function conditionalNext<T>(subject: BehaviorSubject<T>, nextVal: T, criteria?: (updateVal: T, currentValue: T) => boolean): INextStep<T>;
