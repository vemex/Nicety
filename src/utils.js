import $ from 'jquery'

const utils = (($) => {
    const utils = {
        uID: function() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
    }
    return utils;
})($);

export default utils;