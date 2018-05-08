import $ from 'jquery'
import bsUtil from "bootstrap/js/src/util";
import nyUtil from "./utils";
import './content/scss/nicety-notification.scss'


const Notification = (($) => {
    const NAME = 'nyNotify';

    const VERSION = '0.0.1';

    const DATA_KEY = 'ny.notify';
    const DATA_TEMPLATE_KEY = `${DATA_KEY}.template`;
    const DATA_OVER_DIV_KEY = `${DATA_KEY}.id`;
    const EVENT_KEY = `.${DATA_KEY}`;
    const DATA_API_KEY = '.data-api';
    const JQUERY_NO_CONFLICT = $.fn[NAME];

    const Default = {
        message: ''
    };

    const DefaultType = {
        message: 'string'
    };

    const Class = {
        Notify_Alert_Warp: 'notify-alert-warp',
        Notify_Alert_div_id: 'notify-alert-div-',
        Notify_Alert_div: 'notify-alert-div'
    };

    class Notify {
        constructor($el, config) {
            this._element = $el;
            this._config = this._getConfig(config);
        }

        _show(){
            var target = $('body'),
                ovId = Class.Notify_Alert_div_id + nyUtil.uID() + nyUtil.uID() + "-" + nyUtil.uID(),
                panelOv = $('<div id="' + ovId + '" class="' + Class.Notify_Alert_div + '"></div>');
            target.addClass(Class.Notify_Alert_Warp);
            panelOv.appendTo(target).html('<div class="notify-alert-content">'+
                '<div class="card">'+
                this._config.message
                    +'<button type="button" class="btn btn-outline-primary">Primary</button>\n' +
                '      <button type="button" class="btn btn-outline-secondary">Secondary</button></div>'
                + '</div>');
        }

        _close(){

        }

        _getConfig(config) {
            config = {
                ...Default,
                ...config
            };
            bsUtil.typeCheckConfig(NAME, config, DefaultType);
            return config;
        }

        dispose() {
            $.removeData(this._element, DATA_KEY);
            $.removeData(this._element, DATA_OVER_DIV_KEY);
            $.removeData(this._element, DATA_TEMPLATE_KEY);
            this._element = null;
            this._config = null;
        }
        static get Version() {
            return VERSION;
        }

        static _jQueryInterface(config) {
            return this.each(function() {
                if (config === undefined) {
                    config = {}
                }
                const $element = $(this);
                let data = $element.data(DATA_KEY);
                let isInit = !data || (typeof config === "object" && config);

                if (isInit) {
                    if (data) {
                        data._close($element);
                        data.dispose();
                    }
                    if ($element.attr('data-target')) {
                        config.target = $element.attr('data-target');
                    }
                    data = new Notify($element, config);
                    $element.data(DATA_KEY, data);
                    data['_show']($element);
                }

                if (typeof config == 'string') {
                    data[config]($element)
                }
            })
        }
    }

    $.fn[NAME] = Notify._jQueryInterface;
    $.fn[NAME].Constructor = Notify;
    $.fn[NAME].noConflict = function() {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Notify._jQueryInterface
    };

    return Notify
})($);

export default Notification