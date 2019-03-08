import { BehaviorSubject } from 'rxjs';

export interface INextStep<T> {
  onNext: (fn: (nextVal: T) => void) => INextStep<T>;
  onStop: (fn: (currVal: T) => void) => INextStep<T>;
}

export function conditionalNext<T>(
  subject: BehaviorSubject<T>,
  nextVal: T,
  criteria: (updateVal: T, currentValue: T) => boolean = (updateVal: T = nextVal, currentValue: T = subject.value) =>
    updateVal !== currentValue,
): INextStep<T> {
  const shouldUpdate: boolean = criteria(nextVal, subject.value);

  if (shouldUpdate) {
    subject.next(nextVal);
  }

  const res: INextStep<T> = {
    onNext: (fn: (updateVal: T) => void) => {
      if (typeof fn === 'function' && shouldUpdate) {
        fn(nextVal);
      }
      return res;
    },

    onStop: (fn: (currVal: T) => void) => {
      if (typeof fn === 'function' && !shouldUpdate) {
        fn(nextVal);
      }
      return res;
    },
  };
  return res;
}
