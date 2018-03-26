import {CollectiveUse} from 'limited-use';

class Subscriptions extends CollectiveUse {
  cancel() {
    super.use();
  }
}

export default Subscriptions;
