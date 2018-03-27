import {CollectiveUse} from 'limited-use';

const _subsGroups = new WeakMap();
const _setSubsGroup = WeakMap.prototype.set.bind(_subsGroups);
const _getSubsGroup = WeakMap.prototype.get.bind(_subsGroups);

class Subscriptions {
  constructor(...subs) {
    _setSubsGroup(this, new CollectiveUse(...subs));
  }

  add(...subs) {
    _getSubsGroup(this).add(...subs);
  }

  cancel() {
    return _getSubsGroup(this).use();
  }

  cancelSync() {
    return _getSubsGroup(this).useSync();
  }
}

export default Subscriptions;
