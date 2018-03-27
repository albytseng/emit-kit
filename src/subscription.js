import {LimitedUse} from 'limited-use';

const _usages = new WeakMap();
const _setUsage = WeakMap.prototype.set.bind(_usages);
const _getUsage = WeakMap.prototype.get.bind(_usages);

class Subscription {
  constructor(fn) {
    _setUsage(this, new LimitedUse(fn, 1));
  }

  cancel() {
    return _getUsage(this).use();
  }

  use() {
    return _getUsage(this).use();
  }

  disuse() {
    return _getUsage(this).use();
  }
}

export default Subscription;
