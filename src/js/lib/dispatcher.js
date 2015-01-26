/*global console, require*/
(function (module) {
    'use strict';
    var Immutable = require('immutable');
    var toposort = require('toposort');
    // var utils = require('./utils');

    var initState = new (Immutable.Record({
        stores: Immutable.Map(),
        listeners: Immutable.Map(),
        emitters: Immutable.Map(),
        actions: Immutable.Map(),
        targetState: Immutable.Map()
    }))();

    var DispatchNode = Immutable.Record({
        listens: Immutable.Set(),
        emits: undefined,
        callback: undefined
    });

    var findCycle = function (target, getDeps) {
        var touched = Immutable.Set();

        var find = function (target) {
            if (touched.has(target)) {
                return Immutable.List.of(target);
            }
            touched = touched.add(target);

            var cycle;
            getDeps(target).forEach(function (dep) {
                cycle = find(dep);
                if (cycle !== undefined) {
                    cycle = cycle.unshift(target);
                    return false;
                }
            });
            return cycle;
        };
        return find(target);
    };

    // var create = function (state, target, dependencies, callback) {
    //     dependencies = Immutable.fromJS(dependencies).toSet();
    //     var listeners = state.listeners;
    //     var emitters = state.emitters;


    //     emitters = emitters.update(target, Immutable.List(), function (l) {
    //         return l.unshift(listener);
    //     });
    //     dependencies.forEach(function (dep) {
    //         listeners = listeners.update(dep, Immutable.List(), function (l) {
    //             return l.unshift(listener);
    //         });
    //     });

    //     var cycle = findCycle(target, function (target) {
    //         return listeners.get(target, Immutable.List()).map(function (l) {
    //             return l.target;
    //         });
    //     });

    //     if (cycle !== undefined) {
    //         var err = new Error(utils.format(
    //             '{} cannot have dependency {}. Cycle: {}',
    //             cycle.get(-1),
    //             cycle.get(-2),
    //             cycle.join(" ← ")
    //         ));
    //         err.cycle = cycle;
    //         throw err;
    //     }
    //     return state.merge({
    //         listeners: listeners,
    //         emitters: emitters
    //     });
    // };

    // var dispatch = function (state, action, payload) {
    //     var listeners = state.listeners;
    //     utils.assert(listeners.has(action), 'Action {} does not exist', action);

    //     var dispatchState = new DispatchState({
    //         waiting: Immutable.Stack(listeners.get(action)),
    //         emitted: Immutable.Map().set(action, Immutable.fromJS(payload));
    //     });

    //     var current;
    //     while (!dispatchState.waiting.isEmpty()) {
    //         current = dispatchState.waiting.first();
    //         dispatchState = dispatchState.set('waiting', dispatchState.waiting.shift());
    //         dispatchState = iterateWaiting(current, state, dispatchState);
    //     }
    //     return dispatchState.emitted;
    // };
    var generateQueue = function (action, listeners, emitters) {
        var omitted = Immutable.Set();
        var emitted = Immutable.Set.of(action);
        var waiting = Immutable.Stack(listeners.get(action));
        var queue = Immutable.List();

        var isAction = function(key) {
            return !emitters.has(key);
        };

        var current, depsUnresolved, otherActions;
        while (!waiting.isEmpty()) {
            current = waiting.first();
            waiting = waiting.shift();

            depsUnresolved = current.listens.subtract(emitted);
            depsUnresolved = depsUnresolved.subtract(omitted);

            otherActions = depsUnresolved.filter(isAction);
            omitted = omitted.add(otherActions);
            // console.log(depsUnresolved);
            depsUnresolved = depsUnresolved.subtract(otherActions);



            if (depsUnresolved.isEmpty()) {
                if (emitted.has(current.emits)) {
                    console.log(current.emits + ' Emits too much');
                }
                queue = queue.push(current);
                emitted = emitted.add(current.emits);
                waiting = waiting.unshiftAll(
                    listeners.get(current.emits)
                );
            } else {
                console.log('hey');
                waiting = waiting.unshiftAll(
                    emitters.get(depsUnresolved.first())
                );

            }
        }
        return queue;
    };

    var create = function (nodesData) {
        var state = initState;
        var listeners = state.listeners;
        var emitters = state.emitters;
        var actions = state.actions;
        Immutable.fromJS(nodesData).forEach(function (nodeData) {
            var node = new DispatchNode();
            node = node.set('emits', nodeData.get(0));

            if (!Immutable.List.isList(nodeData.get(1)) || nodeData.get(1).isEmpty()) {
                throw new Error('Listens must be a non-empty array.');
            }
            node = node.mergeIn(['listens'], nodeData.get(1));
            if (node.emits === undefined) {
                throw new Error('Missing emit target.');
            }
            node.listens.forEach(function (emitter) {
                listeners = listeners.update(emitter, Immutable.List(), function (l) {
                    return l.unshift(node);
                });
            });
            emitters = emitters.update(node.emits, Immutable.List(), function (l) {
                return l.unshift(node);
            });
        });
        var actionKeys = Immutable.Set(listeners.keys()).subtract(emitters.keys());
        actionKeys.forEach(function (actionName) {
            actions = actions.set(actionName, generateQueue(actionName, listeners, emitters));
        });

        actions.forEach(function(val, key) {
            console.log('--- ' + key + ' ---');
            val.forEach(function (val) {
                console.log(val.emits);
            });
        });

        return state.merge({
            listeners: listeners,
            emitters: emitters,
            actions: actions
        });
    };


    module.exports = {
        create: create,
        // dispatch: dispatch,
        findCycle: findCycle
        // listen: listen
    };

}(module));