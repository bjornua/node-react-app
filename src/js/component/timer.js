/*global require, module, setInterval, clearInterval */
/*jslint sloppy: true */

var React = require('react');
var page = require('./wrappers/page');
var env = require('../env');

module.exports = React.createClass({
    statics: {
        initialTitle: function () {
            return 'Timer: 0';
        },
        parent: page
    },
    mixins: [env.mixin],
    getInitialState: function () {
        return {
            secondsElapsed: 0
        };
    },
    tick: function () {
        var newTime = this.state.secondsElapsed + 1;
        this.dispatch('setTitle', 'Timer: ' + String(newTime));
        this.setState({secondsElapsed: newTime});
    },
    componentDidMount: function () {
        this.interval = setInterval(this.tick, 1000);
    },
    componentWillUnmount: function () {
        clearInterval(this.interval);
    },
    render: function () {
        return React.createElement('span', {},
            "Seconds Elapsed: ",
            React.createElement('span', {}, this.state.secondsElapsed)
        );
    }
});