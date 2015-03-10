define(function(require, exports, module) {
    var _ = require('_');

    return {
        random: function(min, max) {
            return _.random(min, max);
        }
    };
});