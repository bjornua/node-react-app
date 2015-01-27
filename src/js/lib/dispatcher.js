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
        listens: Immutable.Set(),
        emits: undefined,
        callback: undefined
    });

    var getTotalListeningNodes = function (action, listeners) {
        action = new DispatchNode({'emits': action});
        var visited = Immutable.OrderedSet();
        var waiting = Immutable.Stack.of(action);
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
                throw new Error(utils.format("{}: {} emits twice", action, node.emits));
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

        actions.forEach(function (val, key) {
            console.log()
            console.log('------- ' + key + ' -------');
            val.forEach(function (val) {
                console.log(val.emits + ' ← ' + val.listens.join(', '));
            });
            console.log('----- END ' + key + ' -----');
            console.log()
        });

        return state.merge({
            listeners: listeners,
            emitters: emitters,
            actions: actions
        });
    };


    module.exports = {
        create: create
        // dispatch: dispatch,
        // findCycle: findCycle
        // listen: listen
    };

}(module));