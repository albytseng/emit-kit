# emit-kit

[![Build Status](https://img.shields.io/travis/albytseng/emit-kit.svg)](https://travis-ci.org/albytseng/emit-kit) [![Coverage Status](https://img.shields.io/coveralls/github/albytseng/emit-kit/master.svg)](https://coveralls.io/github/albytseng/emit-kit?branch=master) [![Inline Docs](http://inch-ci.org/github/albytseng/emit-kit.svg?branch=master&style=shields)](http://inch-ci.org/github/albytseng/emit-kit) [![dependencies Status](https://img.shields.io/david/albytseng/emit-kit.svg)](https://david-dm.org/albytseng/emit-kit) [![npm Version](https://img.shields.io/npm/v/emit-kit.svg)](https://www.npmjs.com/package/emit-kit)

A wrapper on top of [`eventemitter3`](https://github.com/primus/eventemitter3) with the convenient abstractions of [`event-kit`](https://github.com/atom/event-kit).

## Usage

```javascript
import {Emitter} from 'emit-kit';

// The event emitter
class Superhero {
  constructor() {
    this._emitter = new Emitter();
  }

  onFlight(callback) {
    return this._emitter.on('flight', callback);
  }

  fly(time) {
    this._emitter.emit('flight', time);
  }
}

// The subscriber
class Supervillain {
  plotToKill(superhero) {
    this.surveillance = superhero.onFlight(time => console.log(time));
  }

  giveUp() {
    this.surveillance.cancel();
  }
}
```

## API

### `Emitter`

- __`.on(event, callback, context)`__
  - Subscribes a callback to an event.
  - `event` - String. The name of the event.
  - `callback` - Function. Invoked with arguments
  - `context` *(optional)* - Object. The `this` object to bind to the `callback`.

- __`.once(event, callback, context)`__
  - Same as `.on()` but with a one-time callback.

- __`.emit(event, ...args)`__
  - Invokes all callbacks subscribed to `event`.
  - `event` - String. The name of the event.
  - `args` - Arguments to be passed to the callbacks.

- __`.clear(event)`__
  - If `event` is given, removes only the callbacks subscribed to `event`. Else removes all callbacks.
  - `event` *(optional)* - String. The name of the event.

- __`.count(event)`__
  - If `event` is given, returns the number of callbacks registered to `event`. Else returns the total number of callbacks.

### `Subscription`

- __`.cancel()`__
  - Unsubscribes from the event emitter.

### `Subscriptions`

- __`.add(...subs)`__
  - Groups `subs` together so that they can later be cancelled as a group.

- __`.cancel()`__
  - Calls `cancel` asynchronously on all associated `subs`. Returns a promise that fulfills upon completion.

- __`.cancelSync()`__
  - Calls `cancel` synchronously on all associated `subs`.
