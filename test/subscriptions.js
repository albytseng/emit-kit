import Emitter from '../src/emitter';
import Subscriptions from '../src/subscriptions';

describe('Subscriptions', function() {
  const e = new Emitter();
  const context = {};
  let subs;

  describe('.add(...subs)', function() {
    it('should add subscriptions as a group', function() {
      const sub1 = e.on(
        'add',
        function(x, y) {
          this.a = x + y;
        },
        context,
      );

      const sub2 = e.on(
        'add',
        function(x, y) {
          this.b = x + y;
        },
        context,
      );

      subs = new Subscriptions(sub1);
      subs.add(sub2);

      assert(!context.a && !context.b);
      e.emit('add', 2, 3);
      assert(context.a === 5 && context.b === 5);
    });
  });

  describe('.cancel()', function() {
    it('should cancel subscriptions asynchronously', function() {
      subs.cancel().then(() => {
        e.emit('add', 2, 4);
        assert(context.a === 5 && context.b === 5);
      });
    });
  });

  describe('.cancelSync()', function() {
    it('should cancel subscriptions synchronously', function() {
      subs.cancelSync();
      e.emit('add', 2, 4);
      assert(context.a === 5 && context.b === 5);
    });
  });
});
