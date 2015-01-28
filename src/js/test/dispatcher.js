/*global require, module */
(function (exports) {
    'use strict';
    var Dispatcher = require('../lib/dispatcher');

    var noop = function () { return; };

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
        test.strictEqual(actions.get('action').size, 1);
        test.strictEqual(actions.getIn(['action', 0, 'emits']), 'A');
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

        test.throws(function () {
            Dispatcher.dispatch(state, 'action', {});
        }, /^Action "action" is unhandled$/);
        test.done();
    };
    exports.listenDupe = function (test) {
        test.throws(function () {
            Dispatcher.create([
                ['A', ['action'], function () { return 1; }],
                ['A', ['action'], function () { return 1; }]
            ]);
        }, /^"action": "A" emits twice$/);

        test.done();
    };
    exports.dispatchOne = function (test) {
        var state = Dispatcher.create([
            ['A', ['action'], function () { return 'lololoo'; }]
        ]);
        var action = state.actions.get('action');
        test.strictEqual(action.get(0).emits, 'A');

        state = Dispatcher.dispatch(state, 'action', {});
        var stores = state.stores;

        test.strictEqual(stores.size, 1);
        test.strictEqual(stores.get('A'), 'lololoo');

        test.done();
    };
    exports.dispatchTwo = function (test) {
        var state = Dispatcher.create([
            ['C', ['greet', 'B'], function (C, greet, B) { return 'Bonjour ' + greet + '! == ' + B; }],
            ['A', ['greet'], function (A, greet) { return 'Hello ' + greet; }],
            ['B', ['A'], function (B, A) { return A + '!'; }],
        ]);
        var action = state.actions.get('greet');
        test.strictEqual(action.get(0).emits, 'A');
        test.strictEqual(action.get(1).emits, 'B');

        state = Dispatcher.dispatch(state,  'greet', 'World');
        var stores = state.stores;
        test.strictEqual(stores.size, 3);
        test.strictEqual(stores.get('A'), 'Hello World');
        test.strictEqual(stores.get('B'), 'Hello World!');
        test.strictEqual(stores.get('C'), 'Bonjour World! == Hello World!');

        test.done();
    };
}(module.exports));