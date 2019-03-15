import { BehaviorSubject } from 'rxjs';

export interface INextStep<T> {
  onNext: (fn: (nextVal: T) => void) => INextStep<T>;
  onStop: (fn: (currVal: T) => void) => INextStep<T>;
  value: T;
}

export function conditionalNext<T>(
  subject: BehaviorSubject<T>,
  nextVal: T,
  criteria: (updateValue: T, currentValue: T) => boolean = (
    updateValue: T = nextVal,
    currentValue: T = subject.value,
  ) => updateValue !== currentValue,
): INextStep<T> {
  const shouldUpdate: boolean = criteria(nextVal, subject.value);

  if (shouldUpdate) {
    subject.next(nextVal);
  }

  const res: INextStep<T> = {
    onNext: (fn: (updateValue: T) => void) => {
      if (typeof fn === 'function' && shouldUpdate) {
        fn(nextVal);
      }
      return res;
    },

    onStop: (fn: (currValue: T) => void) => {
      if (typeof fn === 'function' && !shouldUpdate) {
        fn(nextVal);
      }
      return res;
    },
    value: shouldUpdate ? nextVal : subject.value,
  };
  return res;
}
