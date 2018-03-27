import Emitter from '../src/emitter';

describe('Emitter', function() {
  describe('constructor()', function() {
    it('should create an Emitter instance', function() {
      const e = new Emitter();
      assert(typeof e.emit === 'function');
    });
  });

  describe('.on()', function() {
    it('should subscribe listeners to an event', function() {
      const e = new Emitter();
      const context = {};
      const sub1 = e.on(
        'add',
        function(x, y) {
          this.z = x + y;
        },
        context,
      );

      e.on(
        'add',
        function(x, y) {
          this.w = y - x;
        },
        context,
      );

      assert(typeof sub1.cancel === 'function');
      assert(!context.z && !context.w);
      e.emit('add', 2, 4);
      assert(context.z === 6 && context.w === 2);

      sub1.cancel();
      e.emit('add', 3, 8);
      assert(context.z === 6 && context.w === 5);
    });
  });

  describe('.once()', function() {
    const e = new Emitter();
    const context = {z: 0};

    it('should suscribe one-time listeners to an event', function() {
      e.once(
        'add',
        function(x, y) {
          this.z = this.z + x + y;
        },
        context,
      );
      assert(context.z === 0);
      e.emit('add', 2, 4);
      assert(context.z === 6);
      e.emit('add', 3, 5);
      assert(context.z === 6);
    });

    it('should unsubscribe one-time listeners when `cancel` is called', function() {
      const sub = e.once(
        'add',
        function(x, y) {
          this.w = x + y;
        },
        context,
      );
      assert(!context.w);
      sub.cancel();
      e.emit('add', 2, 4);
      assert(!context.w);
    });
  });

  describe('.count()', function() {
    const e = new Emitter();

    it('should return a count of listeners to an event', function() {
      assert(e.count('add') === 0);
      e.on('add', () => {});
      e.once('add', () => {});
      assert(e.count('add') === 2);
    });

    it('should return a count of all listeners', function() {
      e.on('mult', () => {});
      assert(e.count() === 3);
    });
  });

  describe('.clear()', function() {
    const e = new Emitter();
    const context = {};
    it('should remove all listeners to an event', function() {
      e.on(
        'add',
        function(x, y) {
          this.z = x + y;
        },
        context,
      );
      e.on(
        'mult',
        function(x, y) {
          this.w = x * y;
        },
        context,
      );
      e.emit('add', 3, 5);
      assert(context.z === 8);
      e.clear('add');
      e.emit('add', 4, 6);
      assert(context.z === 8);
      e.emit('mult', 3, 5);
      assert(context.w === 15);
    });

    it('should remove all listeners', function() {
      e.on(
        'sub',
        function(x, y) {
          this.v = y - x;
        },
        context,
      );
      e.emit('sub', 2, 3);
      assert(context.v === 1);
      e.emit('mult', 2, 3);
      assert(context.w === 6);
      e.clear();
      e.emit('sub', 2, 5);
      assert(context.v === 1);
      e.emit('mult', 2, 5);
      assert(context.w === 6);
    });
  });
});
