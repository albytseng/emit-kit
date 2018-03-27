import {LimitedUse} from 'limited-use';

const _usages = new WeakMap();
const _setUsage = WeakMap.prototype.set.bind(_usages);
const _getUsage = WeakMap.prototype.get.bind(_usages);

/**
 * Encapsulates a hook to cancel a subscription.
 */
class Subscription {
  constructor(fn) {
    _setUsage(this, new LimitedUse(fn, 1));
  }

  /**
   * Cancels the subscription. Is only effective once.
   * @returns {Promise<undefined>} A promise that is fulfilled on completion of
   *   the cancellation.
   */
  cancel() {
    return _getUsage(this).use();
  }

  /**
   * Alias of `cancel()`. Included to conform to the LimitedUse interface.
   * @returns {Promise} A promise that is fulfilled on completion of the
   *   cancellation.
   */
  use() {
    return _getUsage(this).use();
  }

  /**
   * Alias of `cancel()`. Included to conform to the LimitedUse interface.
   * @returns {Promise} A promise that is fulfilled on completion of the
   *   cancellation.
   */
  disuse() {
    return _getUsage(this).use();
  }
}

export default Subscription;
