/*global require, module */
/*jslint sloppy: true */

var React = require('react');
var env = require('../env');


module.exports = React.createClass({
    displayName: 'notfound',
    mixins: [env.mixin()],
    statics: {
        parent: require('../component/wrappers/page'),
        initialTitle: function () {
            return 'Not found';
        }
    },
    render: function () {
        return React.createElement('div', {},
            React.createElement('h1', {}, 'Page not found'),
            React.createElement('div', {className: 'dh-maxw35'},
                React.createElement('p', {}, 'The page you are looking for does not exist.'),
                React.createElement('p', {},
                    React.createElement('strong', {}) //, this.store(RouterStore).url)
                ),
                React.createElement('p', {}, 'This usually happens when:'),
                React.createElement('ul', {},
                    React.createElement('li', {}, 'The page has been removed at some point.'),
                    React.createElement('li', {}, 'The link you clicked was mistyped.'),
                    React.createElement('li', {}, 'You mistyped the address.')
                ),
                React.createElement('p', {}, 'We are sorry about the inconvenience.')
            )
        );
    }
});