/*global require, module */
(function (exports) {
    'use strict';
    var Dispatcher = require('../lib/dispatcher');
    var Immutable = require('immutable');

    var noop = function () { return; };

    exports.findCycle = function (test) {
        var getter = function (table) {
            table = Immutable.fromJS(table);
            return function (x) {
                return table.get(x, Immutable.List());
            };
        };
        var getDeps;

        getDeps = getter({});
        test.strictEqual(Dispatcher.findCycle('A', getDeps), undefined);

        function t(target, table, expected) {
            var result = Dispatcher.findCycle(target, getter(table));
            if (expected === undefined) {
                test.strictEqual(result, undefined);
                return;
            }
            expected = Immutable.fromJS(expected);
            test.strictEqual(result.equals(expected), true);
        }
        t('A', {}, undefined);
        t('G', {A: ['G', 'I'], G: ['H']}, undefined);
        t('A', {A: ['A']}, ['A', 'A']);
        t('A', {A: ['B'], B: ['A']}, ['A', 'B', 'A']);
        t('B', {A: ['B'], B: ['A']}, ['B', 'A', 'B']);
        t('C', {A: ['C'], B: ['A'], C: ['B']}, ['C', 'B', 'A', 'C']);

        test.done();
    };

    exports.listenerEmpty = function (test) {
        var state = Dispatcher.create([]);
        test.equal(state.listeners.size, 0);
        test.equal(state.emitters.size, 0);
        test.equal(state.actions.size, 0);
        test.done();
    };
    exports.listenerMissingDeps = function (test) {
        test.throws(function () {
            Dispatcher.create([[]]);
        }, /^Listens must be a non-empty array\.$/);

        test.throws(function () {
            Dispatcher.create([['A', [], noop]]);
        }, /^Listens must be a non-empty array\.$/);
        test.done();
    };

    exports.oneListener = function (test) {
        var state = Dispatcher.create([['A', ['B'], noop]]);
        var listeners = state.listeners;
        var emitters = state.emitters;
        test.strictEqual(listeners.size, 1);
        test.strictEqual(listeners.has('B'), true);
        test.strictEqual(listeners.has('A'), false);
        test.strictEqual(listeners.get('B').size, 1);
        test.strictEqual(listeners.getIn(['B', 0, 'emits']), 'A');
        test.strictEqual(emitters.size, 1);
        test.strictEqual(emitters.has('B'), false);
        test.strictEqual(emitters.has('A'), true);
        test.strictEqual(emitters.getIn(['A', 0, 'emits']), 'A');
        test.done();
    };

    // exports.listenerCycle1 = function (test) {
    //     var state = Dispatcher.create();

    //     test.throws(function () {
    //         Dispatcher.listen(state, 'A', ['A'], noop);
    //     }, Error);

    //     test.done();
    // };

    // exports.listenerCycle2 = function (test) {
    //     var state = Dispatcher.create();

    //     state = Dispatcher.listen(state, 'A', ['B'], noop);

    //     test.throws(function () {
    //         Dispatcher.listen(state, 'B', ['A'], noop);
    //     }, Error);
    //     test.done();
    // };
    // exports.dispatchNonExisting = function (test) {
    //     var state = Dispatcher.create();

    //     test.throws(function () {
    //         Dispatcher.dispatch(state, 'action', {});
    //     });
    //     test.done();
    // };
    // exports.dispatchOne = function (test) {
    //     var state = Dispatcher.create();
    //     state = Dispatcher.listen(state, 'A', ['action'], function () { return 1; });

    //     var emits = Dispatcher.dispatch(state, 'action', {});
    //     test.strictEqual(emits.equals(Immutable.fromJS({'action': {}, 'A': 1})), true);

    //     test.done();
    // };
    // exports.dispatchTwo = function (test) {
    //     var state = Dispatcher.create();
    //     state = Dispatcher.listen(state, 'A', ['action'], function () { return 1; });
    //     state = Dispatcher.listen(state, 'B', ['action'], function () { return 2; });

    //     var emits = Dispatcher.dispatch(state, 'action', {});
    //     test.strictEqual(emits.equals(Immutable.fromJS({'action': {}, 'A': 1, 'B': 2})), true);

    //     test.done();
    // };
    // exports.dispatchNonExistingDep = function (test) {
    //     var state = Dispatcher.create();
    //     // There is no B
    //     state = Dispatcher.listen(state, 'A', ['action', 'B'], function () { return 1; });

    //     var emits = Dispatcher.dispatch(state, 'action', {});
    //     test.strictEqual(emits.equals(Immutable.fromJS({'action': {}, 'A': 1})), true);

    //     test.done();
    // };
    // exports.dispatchDupe = function (test) {
    //     var state = Dispatcher.create();
    //     state = Dispatcher.listen(state, 'A', ['action'], function () { return 1; });
    //     state = Dispatcher.listen(state, 'B', ['action', 'A'], function () { return 1; });
    //     state = Dispatcher.listen(state, 'C', ['action', 'A'], function () { return 1; });
    //     state = Dispatcher.listen(state, 'B', ['action', 'C'], function () { return 2; });

    //     var emits = Dispatcher.dispatch(state, 'action', {});
    //     test.strictEqual(emits.equals(Immutable.fromJS({'action': {}, 'A': 1})), true);

    //     test.done();
    // };
}(module.exports));