import Emitter from '../src/emitter';

describe('Subscription', function() {
  const e = new Emitter();
  const context = {};

  describe('.disuse()', function() {
    it('should cancel the subscription', function() {
      const sub = e.on(
        'add',
        function(x, y) {
          context.a = x + y;
        },
        context,
      );

      e.emit('add', 2, 3);
      assert(context.a === 5);

      sub.disuse();
      e.emit('add', 4, 5);
      assert(context.a == 5);
    });
  });
});
