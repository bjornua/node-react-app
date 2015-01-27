/*global require, module */
(function (exports) {
    'use strict';
    var Dispatcher = require('../lib/dispatcher');
    var Immutable = require('immutable');

    var noop = function () { return; };

    // exports.findCycle = function (test) {
    //     var getter = function (table) {
    //         table = Immutable.fromJS(table);
    //         return function (x) {
    //             return table.get(x, Immutable.List());
    //         };
    //     };
    //     var getDeps;

    //     getDeps = getter({});
    //     test.strictEqual(Dispatcher.findCycle('A', getDeps), undefined);

    //     function t(target, table, expected) {
    //         var result = Dispatcher.findCycle(target, getter(table));
    //         if (expected === undefined) {
    //             test.strictEqual(result, undefined);
    //             return;
    //         }
    //         expected = Immutable.fromJS(expected);
    //         test.strictEqual(result.equals(expected), true);
    //     }
    //     t('A', {}, undefined);
    //     t('G', {A: ['G', 'I'], G: ['H']}, undefined);
    //     t('A', {A: ['A']}, ['A', 'A']);
    //     t('A', {A: ['B'], B: ['A']}, ['A', 'B', 'A']);
    //     t('B', {A: ['B'], B: ['A']}, ['B', 'A', 'B']);
    //     t('C', {A: ['C'], B: ['A'], C: ['B']}, ['C', 'B', 'A', 'C']);

    //     test.done();
    // };

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
        var state = Dispatcher.create([['A', ['action'], noop]]);
        var listeners = state.listeners;
        var emitters = state.emitters;
        var actions = state.actions;
        test.strictEqual(listeners.size, 1);
        test.strictEqual(listeners.has('action'), true);
        test.strictEqual(listeners.has('A'), false);
        test.strictEqual(listeners.get('action').size, 1);
        test.strictEqual(listeners.getIn(['action', 0, 'emits']), 'A');
        test.strictEqual(emitters.size, 1);
        test.strictEqual(emitters.has('action'), false);
        test.strictEqual(emitters.has('A'), true);
        test.strictEqual(emitters.getIn(['A', 0, 'emits']), 'A');
        test.strictEqual(actions.has('action'), true);
        test.strictEqual(actions.get('action').size, 2);
        test.strictEqual(actions.getIn(['action', 0, 'emits']), 'action');
        test.strictEqual(actions.getIn(['action', 1, 'emits']), 'A');
        test.done();
    };

    exports.listenerCycle1 = function (test) {
        test.throws(function () {
            Dispatcher.create([['A', ['A', 'action1'], noop]]);
        }, /^Cycle detected in "action1"$/);
        test.done();
    };

    exports.listenerCycle2 = function (test) {
        test.throws(function () {
            Dispatcher.create([
                ['A', ['action2', 'B'], noop],
                ['B', ['A'], noop]
            ]);
        }, /^Cycle detected in "action2"$/);
        test.done();
    };
    exports.dispatchNonExisting = function (test) {
        var state = Dispatcher.create([]);

        Dispatcher.dispatch(state, 'action', {});
        test.throws(function () {
        }, /^Action "action" is not handled$/);
        test.done();
    };
    // exports.dispatchOne = function (test) {
    //     var state = Dispatcher.create();
    //     state = Dispatcher.listen(state, 'A', ['action'], function () { return 1; });

    //     var emits = Dispatcher.dispatch(state, 'action', {});
    //     test.strictEqual(emits.equals(Immutable.fromJS({'action': {}, 'A': 1})), true);

    //     test.done();
    // };
    exports.dispatchTwo = function (test) {
        var state = Dispatcher.create([
            ['A', ['action'], function () { return 1; }],
            ['B', ['action', 'A'], function () { return 2; }]
        ]);
        var action = state.actions.get('action');
        test.strictEqual(action.get(0).emits, 'action');
        test.strictEqual(action.get(1).emits, 'A');
        test.strictEqual(action.get(2).emits, 'B');

        test.done();
    };
    exports.dispatchNonExistingDep = function (test) {
        var state = Dispatcher.create([
            ['A', ['action', 'B'], function () { return 1; }]
        ]);

        // var emits = Dispatcher.dispatch(state, 'action', {});
        // test.strictEqual(emits.equals(Immutable.fromJS({'action': {}, 'A': 1})), true);

        test.done();
    };
    exports.dispatchDupe = function (test) {
        test.throws(function () {
            Dispatcher.create([
                ['A', ['action'], function () { return 1; }],
                ['A', ['action'], function () { return 1; }]
            ]);
        }, /^"action": "A" emits twice$/);

        test.done();
    };
}(module.exports));