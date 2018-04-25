import overlay from '../../../src/overlay'
const assert = require('assert');
window.$ = require('jquery');
describe('overlay.js', () => {
    it('should render correct contents', () => {
        var el = $('<div>');
        var testObj = new overlay(el, {});
        var ss = testObj._getIconTemplate("rotating-plane");
        expect('<div class="sk-rotating-plane"></div>')
            .to.equal(ss);
        testObj._loadbox(el);
            
        testObj = new overlay(el, {displayIcon:true,iconType:'rotating-plane'});

        testObj._loadbox(el);
    })
});