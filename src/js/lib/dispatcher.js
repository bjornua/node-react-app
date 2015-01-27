/*global console, require*/
(function (module) {
    'use strict';
    var Immutable = require('immutable');
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

    var traverse = function (rootNode, getKey, getChildren) {
        var touched = Immutable.Set();
        var result = Immutable.List();
        var waiting = Immutable.Stack.of(rootNode);

        var node, key;
        while (!waiting.isEmpty()) {
            node = waiting.first();
            waiting = waiting.shift();

            result = result.push(node);
            waiting = waiting.unshift(getChildren(node));

            key = getKey(node);
            if (touched.has(key)) {
                throw new Error('Cycle detected');
            }
            touched = touched.add(key);
        }
        return result;
    };

    var generateQueue = function (action, listeners, emitters) {
        var omitted = Immutable.Set();
        var emitted = Immutable.Set.of(action);
        var waiting = Immutable.Stack(listeners.get(action));
        var queue = Immutable.List();

        var isAction = function (key) {
            return !emitters.has(key);
        };

        var current, depsUnresolved, otherActions;
        // while (!waiting.isEmpty()) {
        //     current = waiting.first();
        //     waiting = waiting.shift();

        //     depsUnresolved = current.listens.subtract(emitted);
        //     depsUnresolved = depsUnresolved.subtract(omitted);

        //     otherActions = depsUnresolved.filter(isAction);
        //     omitted = omitted.add(otherActions);
        //     // console.log(depsUnresolved);
        //     depsUnresolved = depsUnresolved.subtract(otherActions);



        //     if (depsUnresolved.isEmpty()) {
        //         if (emitted.has(current.emits)) {
        //             console.log(current.emits + ' Emits too much');
        //         }
        //         queue = queue.push(current);
        //         emitted = emitted.add(current.emits);
        //         waiting = waiting.unshiftAll(
        //             listeners.get(current.emits)
        //         );
        //     } else {
        //         console.log('hey');
        //         waiting = waiting.unshiftAll(
        //             emitters.get(depsUnresolved.first())
        //         );

        //     }
        // }
        traverse(''
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
        // findCycle: findCycle
        // listen: listen
    };

}(module));