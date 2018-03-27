import {CollectiveUse} from 'limited-use';

const _subsGroups = new WeakMap();
const _setSubsGroup = WeakMap.prototype.set.bind(_subsGroups);
const _getSubsGroup = WeakMap.prototype.get.bind(_subsGroups);

/**
 * Represents a group of hooks to cancel subscriptions.
 */
class Subscriptions {
  constructor(...subs) {
    _setSubsGroup(this, new CollectiveUse(...subs));
  }

  /**
   * Adds a subscription to this group.
   * @returns {void}
   */
  add(...subs) {
    _getSubsGroup(this).add(...subs);
  }

  /**
   * Asynchronously cancels all associated subscriptions.
   * @returns {Promise} A promise that fulfills when all cancellations have
   *   completed.
   */
  cancel() {
    return _getSubsGroup(this).use();
  }

  /**
   * Synchronously cancels all associated subscriptions.
   * @returns {void}
   */
  cancelSync() {
    _getSubsGroup(this).useSync();
  }
}

export default Subscriptions;
