# rx-conditoinal-next
Update your RxJS _BehaviorSubject_ if and only if conditoins are fullfilled


### Usage

For extended excamples, see [main.spec.ts](https://github.com/hansogj/rx-conditional-next/blob/master/src/main.spec.ts)

```js
const bs = new BehaviorSubject<any>('Hello');

conditionalNext(bs, 'World'); //  => bs.value === 'World'
conditionalNext(bs, 'World 2', (newVal, prevVal)  => newVal !== prevVal); // => bs.value === 'World'
conditionalNext(bs, 'World 2'); // no change, bs.value still === 'World 2' 

conditionalNext(bs, 'World 3').onNext(()) => 'tell med what to do').onStop(() => 'is not called');
conditionalNext(bs, 'World 3').onNext(()) => 'is not called').onStop(() => 'tell med what to do');

```

### Test

```bash
$> npm i && npm test
```

### Dependencies
Your project should have its own _rxjs_, it's omitted to avoid version conflicts.

