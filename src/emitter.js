import EventEmitter from 'eventemitter3';
import Subscription from './subscription';

/** Hold backing emitters for `Emitter` instances */
const _emitters = new WeakMap();
const _setEmitter = WeakMap.prototype.set.bind(_emitters);
const _getEmitter = WeakMap.prototype.get.bind(_emitters);

/**
 * Emitter of events to subscribers.
 */
class Emitter {
  constructor() {
    _setEmitter(this, new EventEmitter());
  }

  /**
   * Add a listener to an event.
   * @param {string} e Name of the event.
   * @param {function} fn The listener.
   * @param {*} [context = this] Reference of `this` when invoking `fn`.
   * @returns {Subscription} A one-use hook for removing the listener.
   */
  on(e, fn, context) {
    const emitter = _getEmitter(this);
    emitter.on(e, fn, context);
    return new Subscription(() => {
      emitter.removeListener(e, fn, context);
      return Promise.resolve();
    });
  }

  /**
   * Add a one-time listener to an event.
   * @param {string} e Name of the event.
   * @param {function} fn The listener.
   * @param {*} [context = this] Reference of `this` when invoking `fn`.
   * @returns {Subscription} A one-use hook for removing the listener.
   */
  once(e, fn, context) {
    const emitter = _getEmitter(this);
    emitter.once(e, fn, context);
    return new Subscription(() => {
      emitter.removeListener(e, fn, context, true);
      return Promise.resolve();
    });
  }

  /**
   * Invokes listeners subscribed to the given event.
   * @param {string} e Name of the event.
   * @param {...*} [args] Arguments to pass to the listeners.
   * @returns {boolean} True if the event had listeners.
   */
  emit(e, ...args) {
    return _getEmitter(this).emit(e, ...args);
  }

  /**
   * Remove all listeners, or just those subscribed to the event.
   * @param {string} [e] Name of the event.
   * @returns {void}
   */
  clear(e) {
    _getEmitter(this).removeAllListeners(e);
  }

  /**
   * Get the count of all listeners, or just those subscribed to the event.
   * @param {string} [e] Name of the event.
   * @returns {number} Count of all listeners if `e` is falsy, or just those
   *   subscribed to `e`.
   */
  count(e) {
    const emitter = _getEmitter(this);
    if (e) return emitter.listenerCount(e);
    return emitter
      .eventNames()
      .reduce((acc, e) => acc + emitter.listenerCount(e), 0);
  }
}

export default Emitter;
