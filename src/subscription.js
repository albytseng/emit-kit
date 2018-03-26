import {LimitedUse} from 'limited-use';

class Subscription extends LimitedUse {
  cancel() {
    super.use();
  }
}

export default Subscription;
