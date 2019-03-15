import { SpyUtil } from 'rx-spy-util';
import { BehaviorSubject, Observable } from 'rxjs';
import { conditionalNext } from '../src/index';

const flattenArgs = (spy: jasmine.Spy) => spy.calls.allArgs().map(args => args.join(', '));

describe('conditionalNext', () => {
  it(' is defined', () => expect(conditionalNext).toBeDefined());

  describe('next', () => {
    const key = 'bsSubscribe';
    let spyUtil: SpyUtil;
    const bs = new BehaviorSubject<string>('first');
    beforeAll(() => {
      spyUtil = new SpyUtil();
      spyUtil.spySubscribe(new Observable((fn: any) => bs.subscribe(fn)), key);
    });
    afterAll(() => spyUtil.unsubscribe());

    it('bs is called', () => expect(spyUtil.get(key)).toHaveBeenCalledTimes(1));
    it('bs is called initially', () => expect(spyUtil.lastOf(key)).toEqual('first'));

    describe('regular next', () => {
      it(' spy is updated', () => {
        bs.next('second');
        expect(spyUtil.get(key)).toHaveBeenCalledTimes(2);
        expect(spyUtil.lastOf(key)).toEqual('second');
        expect(flattenArgs(spyUtil.get(key))).toEqual(['first', 'second']);
      });
    });

    describe('conditionalNext', () => {
      it('nexting bs with new value, should update spy', () => {
        conditionalNext(bs, 'third');
        expect(spyUtil.get(key)).toHaveBeenCalledTimes(3);
        expect(spyUtil.lastOf(key)).toEqual('third');
        expect(flattenArgs(spyUtil.get(key))).toEqual(['first', 'second', 'third']);
      });

      it('nexting bs with same value as bs.value, should not update spy', () => {
        conditionalNext(bs, 'third');
        expect(spyUtil.get(key)).toHaveBeenCalledTimes(3);
        expect(spyUtil.lastOf(key)).toEqual('third');
        expect(flattenArgs(spyUtil.get(key))).toEqual(['first', 'second', 'third']);
      });

      it('nexting bs with same value as bs.value, custom conditional, should  update spy', () => {
        conditionalNext(bs, 'third', (updateValue, currentValue) => updateValue !== 'whatever');
        expect(spyUtil.get(key)).toHaveBeenCalledTimes(4);
        expect(spyUtil.lastOf(key)).toEqual('third');
        expect(flattenArgs(spyUtil.get(key))).toEqual(['first', 'second', 'third', 'third']);
      });

      it('nexting bs with same value as bs.value, custom conditional, should not update spy', () => {
        conditionalNext(bs, 'whatever', (updateValue, currentValue) => updateValue !== 'whatever');
        expect(spyUtil.get(key)).toHaveBeenCalledTimes(4);
        expect(spyUtil.lastOf(key)).toEqual('third');
        expect(flattenArgs(spyUtil.get(key))).toEqual(['first', 'second', 'third', 'third']);
      });
    });

    describe('onNext, onStop && value', () => {
      let nextSpy: jasmine.Spy;
      let stopSpy: jasmine.Spy;

      beforeEach(() => {
        nextSpy = jasmine.createSpy('nextSpy');
        stopSpy = jasmine.createSpy('stopSpy');
      });

      afterEach(() => [nextSpy, stopSpy].forEach((spy: jasmine.Spy) => spy.calls.reset()));

      it('nexting bs with new value, shall call onNext', () => {
        const val = conditionalNext(bs, '5th')
          .onNext(nextSpy)
          .onStop(stopSpy).value;
        expect(nextSpy).toHaveBeenCalledTimes(1);
        expect(nextSpy).toHaveBeenCalledWith('5th');
        expect(stopSpy).not.toHaveBeenCalled();
        expect(val).toEqual('5th');
      });

      it('nexting bs with failng condition value , shall call onStop', () => {
        const val = conditionalNext(bs, '5th', () => false) // prevents from updating
          .onNext(nextSpy)
          .onStop(stopSpy).value;
        expect(nextSpy).not.toHaveBeenCalled();
        expect(stopSpy).toHaveBeenCalledTimes(1);
        expect(stopSpy).toHaveBeenCalledWith('5th');
        expect(val).toEqual('5th');
      });
    });
  });
});
