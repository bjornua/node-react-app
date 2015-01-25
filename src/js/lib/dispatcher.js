/*global console, require*/
(function (module) {
    'use strict';
    var Immutable = require('immutable');
    var utils = require('./utils');

    var initState = new (Immutable.Record({
        stores: Immutable.Map(),
        listeners: Immutable.Map(),
        emitters: Immutable.Map(),
        actions: Immutable.Map(),
        targetState: Immutable.Map()
    }))();

    var Listenable = Immutable.Record({
        dependencies: undefined,
        target: undefined,
        callback: undefined
    });

    var DispatchState = Immutable.Record({
        waiting: Immutable.Stack(),
        emitted: Immutable.Map(),
        omitted: Immutable.Set()
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

    var debug = function (state) {
        state.listeners.map(function (val) {
            return val.toList().map(function (val) { return val.get('target'); });
        }).forEach(function (val, key) {
            console.log(key + " → " + val.join(", "));
        });
    };

    var listen = function (state, target, dependencies, callback) {
        dependencies = Immutable.fromJS(dependencies).toSet();
        var listeners = state.listeners;
        var emitters = state.emitters;

        if (dependencies.isEmpty()) {
            throw new Error('Missing dependencies.');
        }

        var listener = new Listenable({
            dependencies: dependencies,
            target: target,
            callback: callback
        });
        emitters = emitters.update(target, Immutable.List(), function (l) {
            return l.unshift(listener);
        });
        dependencies.forEach(function (dep) {
            listeners = listeners.update(dep, Immutable.List(), function (l) {
                return l.unshift(listener);
            });
        });

        var cycle = findCycle(target, function (target) {
            return listeners.get(target, Immutable.List()).map(function (l) {
                return l.target;
            });
        });

        if (cycle !== undefined) {
            var err = new Error(utils.format(
                '{} cannot have dependency {}. Cycle: {}',
                cycle.get(-1),
                cycle.get(-2),
                cycle.join(" ← ")
            ));
            err.cycle = cycle;
            throw err;
        }
        return state.merge({
            listeners: listeners,
            emitters: emitters
        });
    };

    var iterateWaiting = function (current, state, dispatchState) {
        var depsOmitted = current.dependencies.intersect(dispatchState.omitted);
        var depsEmitted = current.dependencies.intersect(dispatchState.emitted.keys());
        var depsUnresolved = current.dependencies.subtract(depsOmitted).subtract(depsEmitted);

        var waiting = dispatchState.waiting;
        var omitted = dispatchState.omitted;

        if (!depsUnresolved.isEmpty()) {
            depsUnresolved.forEach(function (val) {
                if (!state.emitters.has(val)) {
                    omitted = omitted.add(val);
                    waiting = waiting.unshiftAll(state.listeners.get(val));
                    return;
                }
                waiting = waiting.unshiftAll(state.emitters.get(val));
            });
            return dispatchState.merge({
                waiting: waiting,
                omitted: omitted
            });
        }

        var result = current.callback();
        dispatchState = dispatchState.merge({
            waiting: waiting.unshiftAll(state.listeners.get(current.target))
        });

        if (result === undefined) {
            return dispatchState.merge({
                omitted: dispatchState.omitted.add(current.target)
            });
        }
        return dispatchState.setIn(['emitted', current.target], result);
    };

    var dispatch = function (state, action, payload) {
        var listeners = state.listeners;
        utils.assert(listeners.has(action), 'Action {} does not exist', action);

        var dispatchState = new DispatchState({
            waiting: Immutable.Stack(listeners.get(action)),
            emitted: Immutable.Map().set(action, Immutable.fromJS(payload))
        });

        var current;
        while (!dispatchState.waiting.isEmpty()) {
            current = dispatchState.waiting.first();
            dispatchState = dispatchState.set('waiting', dispatchState.waiting.shift());
            dispatchState = iterateWaiting(current, state, dispatchState);
        }
        return dispatchState.emitted;
    };

    var create = function () {
        return initState;
    };


    module.exports = {
        create: create,
        debug: debug,
        dispatch: dispatch,
        findCycle: findCycle,
        listen: listen
    };

}(module));