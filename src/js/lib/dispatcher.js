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

    var DispatchNode = Immutable.Record({
        listens: Immutable.List(),
        emits: undefined,
        callback: undefined
    });

    var getTotalListeningNodes = function (action, listeners) {
        var waiting = Immutable.Stack(listeners.get(action));
        var visited = Immutable.OrderedSet();
        var node;

        while (!waiting.isEmpty()) {
            node = waiting.first();
            waiting = waiting.shift();

            if (!visited.has(node)) {
                visited = visited.add(node);
                waiting = waiting.unshiftAll(listeners.get(node.emits, Immutable.List()));
            }
        }
        return visited;
    };

    var generateQueue = function (action, listeners) {
        var nodes = getTotalListeningNodes(action, listeners);
        var emitters = Immutable.Set();
        var queue = Immutable.List();
        nodes.forEach(function (node) {
            if (emitters.has(node.emits)) {
                throw new Error(utils.format('{}: {} emits twice', action, node.emits));
            }
            emitters = emitters.add(node.emits);
        });
        var isReady = function (node) {
            return emitters.intersect(node.listens).isEmpty();
        };
        var node;
        while (!nodes.isEmpty()) {
            node = nodes.find(isReady);
            if (node === undefined) {
                throw new Error(utils.format('Cycle detected in {}', action));
            }
            nodes = nodes.remove(node);
            emitters = emitters.remove(node.emits);
            queue = queue.push(node);
        }
        return queue;
    };

    var create = function (nodesData) {
        var state = initState;
        var actions = state.actions;
        var listeners = state.listeners;
        var emitters = state.emitters;
        Immutable.fromJS(nodesData).forEach(function (nodeData) {
            var node = new DispatchNode();
            node = node.set('emits', nodeData.get(0));

            if (!Immutable.List.isList(nodeData.get(1)) || nodeData.get(1).isEmpty()) {
                throw new Error('Listens must be a non-empty array.');
            }
            node = node.mergeIn(['listens'], nodeData.get(1));
            node = node.set('callback', nodeData.get(2));
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

        return state.merge({
            listeners: listeners,
            emitters: emitters,
            actions: actions
        });
    };
    var dispatch = function (state, actionID, payload) {
        if (!state.actions.has(actionID)) {
            throw new Error(utils.format('Action {} is unhandled', actionID));
        }
        var nodes = state.actions.get(actionID);
        var actionEmit = Immutable.Map().set(actionID, payload);
        // emitted = emitted.set(actionID, payload);
        var emitted = Immutable.Map();
        nodes.forEach(function (node) {
            console.log(node.emits);
            var stores = state.stores.merge(emitted).merge(actionEmit);
            var args = node.listens.unshift(node.emits).map(function (storeID) {
                return stores.get(storeID);
            });
            var res = node.callback.apply(undefined, args.toJS());

            emitted = emitted.set(node.emits, res);
        });
        state = state.mergeIn(['stores'], emitted);
        return state;
    };

    module.exports = {
        create: create,
        dispatch: dispatch
        // findCycle: findCycle
        // listen: listen
    };

}(module));