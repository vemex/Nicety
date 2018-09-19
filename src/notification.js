import $ from 'jquery'
import bsUtil from "bootstrap/js/src/util";
import nyUtil from "./utils";


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
        message: '',
        show:function () {

        },close:function () {

        },cancel:function () {
            return true;
        },confirm:function () {

        }
    };

    const Selector = {
        AlertButton: 'button[data-role="alert"]'
    };

    const DefaultType = {
        message: 'string'
    };

    const Class = {
        Notify_Alert_Warp: 'notify-alert-warp',
        Notify_Alert_div_id: 'notify-alert-div-',
        Notify_Alert_div: 'notify-alert-div'
    };
    const Event = {
        CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`
    };

    class Notify {
        constructor($el, config) {
            this._element = $el;
            this._config = this._getConfig(config);
            this._ovId = Class.Notify_Alert_div_id + nyUtil.uID() + nyUtil.uID() + "-" + nyUtil.uID();
        }

        _show() {
            let target = $('body'),
                panelOv = $('<div id="' + this._ovId + '" class="' + Class.Notify_Alert_div + '"></div>');
            target.addClass(Class.Notify_Alert_Warp);
            panelOv.appendTo(target).html('<div class="notify-alert-content">' +
                '<div class="">'
                + '<div class="alert-message">' + this._config.message + '</div>'
                + '<div class="alert-operation">'
                + '<button type="button" data-role="alert" class="alert-cancel">Cancel</button>\n' +
                '<button type="button" data-role="alert" class="alert-confirm">Confirm</button>'
                + '</div>'
                + '</div>'
                + '</div>');
            this._config.show.call(this);
        }

        _close() {
            $('#' + this._ovId).remove();
            this._config.close.call(this);
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
            if (config === undefined) {
                config = {}
            }
            const $element = $('body');
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
        };
    }

    $(document).on(
        Event.CLICK_DATA_API,
        Selector.AlertButton,
        function () {
            let data = $('body').data(DATA_KEY);
            if ($(this).hasClass('alert-cancel')) {
                let cancelResult=data._config.cancel.call(data);
                if (cancelResult===undefined || cancelResult){
                    data._close();
                }
            }
            if ($(this).hasClass('alert-confirm')){
                data._config.confirm.call(data);
            }
        }
    );

    $[NAME] = Notify._jQueryInterface;
    $[NAME].Constructor = Notify;
    $[NAME].noConflict = function () {
        $[NAME] = JQUERY_NO_CONFLICT;
        return Notify._jQueryInterface
    };

    return Notify
})($);

export default Notification