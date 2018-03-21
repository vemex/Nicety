import $ from 'jquery'
import Util from 'bootstrap/js/src/util'

const Overlay = (($) => {
    const NAME = 'nyOverlay';

    const VERSION = '0.0.1';

    const DATA_KEY = 'ny.overlay';
    const EVENT_KEY = `.${DATA_KEY}`;
    const DATA_API_KEY = '.data-api';
    const JQUERY_NO_CONFLICT = $.fn[NAME];

    const Default = {
        target : '',
        title : '',
        displayIcon    : '',
        iconColor     : ''
    };

    const DefaultType = {
        target : 'string',
        title : 'string',
        displayIcon    : 'string',
        iconColor     : 'string'
    };

    const Event = {
        SHOW: `show${EVENT_KEY}`,
        HIDDEN: `hidden${EVENT_KEY}`,
    };

    const Class={
        Overlay_Warp:'overlay-warp',
        Overlay_div:'overlay-div'
    };
    let uID = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    class Overlay {
        constructor(element,config) {
            this._element = element;
        }

        _getConfig(...config){
            config = {
                ...Default,
                ...config
            };
            Util.typeCheckConfig(NAME, config, DefaultType);
            return config;
        }

        show(){
            var target = $(el.attr('data-target')),
                ovId = 'nifty-overlay-' + uID() + uID()+"-" + uID(),
                panelOv = $('<div id="'+ ovId +'" class="panel-overlay"></div>');

            el.prop('disabled', true).data('niftyOverlay',ovId);
            target.addClass('panel-overlay-wrap');
            panelOv.appendTo(target).html(el.data('overlayTemplate'));
            return null;
        }
        hide(){

        }
        dispose() {

        }

        static get Version() {
            return VERSION;
        }

        static _jQueryInterface(config) {
            return this.each(function () {
                const $element = $(this);
                let data = $element.data(DATA_KEY);

                if (!data) {
                    data = new Overlay(this);
                    $element.data(DATA_KEY, data)
                }

                if (config === 'hide') {
                    data[config](this)
                }
            })
        }
    }


    $.fn[NAME] = Overlay._jQueryInterface;
    $.fn[NAME].Constructor = Overlay;
    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Overlay._jQueryInterface
    };

    return Overlay
})($);

export default Overlay