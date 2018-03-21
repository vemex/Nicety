import $ from 'jquery'
import bsUtil from 'bootstrap/js/src/util'
import nyUtil from './utils'
import './content/scss/nicety-overlay.scss'

const Overlay = (($) => {
    const NAME = 'nyOverlay';

    const VERSION = '0.0.1';

    const DATA_KEY = 'ny.overlay';
    const DATA_TEMPLATE_KEY = `${DATA_KEY}.template`;
    const DATA_OVER_DIV_KEY = `${DATA_KEY}.id`;
    const EVENT_KEY = `.${DATA_KEY}`;
    const DATA_API_KEY = '.data-api';
    const JQUERY_NO_CONFLICT = $.fn[NAME];

    const Default = {
        target: '',
        title: '',
        displayIcon: true,
        iconType: ''
    };

    const Selector = {
        OverlayButton: 'button[data-role="overlay"]'
    }

    const DefaultType = {
        target: 'string',
        title: 'string',
        displayIcon: 'boolean',
        iconType: 'string'
    };

    const Event = {
        CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`,
        SHOW: `show${EVENT_KEY}`,
        HIDDEN: `hide${EVENT_KEY}`,
    };

    const Class = {
        Overlay_Warp: 'overlay-warp',
        Overlay_div_id: 'overlay-div-',
        Overlay_div: 'overlay-div'
    };

    class Overlay {
        constructor($el, config) {
            this._element = $el;
            this._config = this._getConfig(config);
        }

        _getConfig(config) {
            config = {
                ...Default,
                ...config
            };
            bsUtil.typeCheckConfig(NAME, config, DefaultType);
            return config;
        }

        _getIconTemplate(iconType) {
            switch (iconType) {
                case "rotating-plane":
                    return '<div class="sk-rotating-plane"></div>';
                case "double-bounce":
                    return '<div class="sk-double-bounce"> <div class="sk-child sk-double-bounce1"></div> <div class="sk-child sk-double-bounce2"></div> </div>';
                case "wave":
                    return '<div class="sk-wave"><div class="sk-rect sk-rect1"></div><div class="sk-rect sk-rect2"></div><div class="sk-rect sk-rect3"></div> <div class="sk-rect sk-rect4"></div><div class="sk-rect sk-rect5"></div></div>';
                case "wandering-cubes":
                    return '<div class="sk-wandering-cubes"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div></div>';
                case "pulse":
                    return '<div class="sk-spinner sk-spinner-pulse"></div>';
                case "chasing-dots":
                    return '<div class="sk-chasing-dots"><div class="sk-child sk-dot1"></div><div class="sk-child sk-dot2"></div></div>';
                case "three-bounce":
                    return '<div class="sk-three-bounce"><div class="sk-child sk-bounce1"></div><div class="sk-child sk-bounce2"></div><div class="sk-child sk-bounce3"></div></div>';
                case "circle":
                    return '<div class="sk-circle"><div class="sk-circle1 sk-child"></div><div class="sk-circle2 sk-child"></div><div class="sk-circle3 sk-child"></div><div class="sk-circle4 sk-child"></div><div class="sk-circle5 sk-child"></div><div class="sk-circle6 sk-child"></div> <div class="sk-circle7 sk-child"></div><div class="sk-circle8 sk-child"></div><div class="sk-circle9 sk-child"></div> <div class="sk-circle10 sk-child"></div><div class="sk-circle11 sk-child"></div><div class="sk-circle12 sk-child"></div> </div>';
                case "cube-grid":
                    return '<div class="sk-cube-grid"> <div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div><div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div>';
                case "fading-circle":
                    return '<div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>';
                case "folding-cube":
                    return '<div class="sk-folding-cube"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div>';
                default:
                    return '<div class="sk-wave"><div class="sk-rect sk-rect1"></div><div class="sk-rect sk-rect2"></div><div class="sk-rect sk-rect3"></div> <div class="sk-rect sk-rect4"></div><div class="sk-rect sk-rect5"></div></div>';
            }

        }

        _loadbox($el) {
            if ($el.data(DATA_TEMPLATE_KEY)) {
                return null;
            }
            let icon = (this._config.displayIcon) ? '<span class="overlay-icon"> ' + this._getIconTemplate(this._config.iconType) + '  </span>' : '';
            $el.data(DATA_TEMPLATE_KEY, '<div class="overlay-content">' + icon + '<h4 class="overlay-title">' + this._config.title + '</h4><div>');
            return null;
        }

        show($el) {
            var target = $(this._config.target),
                ovId = Class.Overlay_div_id + nyUtil.uID() + nyUtil.uID() + "-" + nyUtil.uID(),
                panelOv = $('<div id="' + ovId + '" class="' + Class.Overlay_div + '"></div>');

            $el.prop('disabled', true).data(DATA_OVER_DIV_KEY, ovId);
            target.addClass(Class.Overlay_Warp);
            panelOv.appendTo(target).html($el.data(DATA_TEMPLATE_KEY));
            const showEvent = $.Event(Event.SHOW);
            $el.trigger(showEvent);
        }

        hide($el) {
            var $loadBox = $('#' + $el.data(DATA_OVER_DIV_KEY));
            var target = $(this._config.target);
            if ($loadBox.length) {
                $el.prop('disabled', false);
                target.removeClass(Class.Overlay_Warp);
                $loadBox.hide().remove();
            }
            const hideEvent = $.Event(Event.HIDDEN);
            $el.trigger(hideEvent);
        }

        dispose() {
            $.removeData(this._element, DATA_KEY)
            $.removeData(this._element, DATA_OVER_DIV_KEY)
            $.removeData(this._element, DATA_TEMPLATE_KEY)
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
                        data.hide($element);
                        data.dispose();
                    }
                    if ($element.attr('data-target')) {
                        config.target = $element.attr('data-target');
                    }
                    data = new Overlay($element, config);
                    $element.data(DATA_KEY, data);
                    data._loadbox($element);
                    data['show']($element);
                }

                if (typeof config == 'string') {
                    data[config]($element)
                }

                // if (typeof config === "object" && config) {

                //     data['show']($element);
                // } else if (data[config]) {
                //     data[config]($element)
                // }
            })
        }
    }



    $(document).on(
        Event.CLICK_DATA_API,
        Selector.OverlayButton,
        function() {

            var config = {
                title: $(this).attr('overlay-title'),
                iconType: $(this).attr('overlay-icon-type') == undefined ? '' : $(this).attr('overlay-icon-type'),
                displayIcon: $(this).attr('overlay-display-icon') === undefined ? true : $(this).attr('overlay-display-icon') == 'true'
            };
            $(this).nyOverlay(config);
        }
    )

    $.fn[NAME] = Overlay._jQueryInterface;
    $.fn[NAME].Constructor = Overlay;
    $.fn[NAME].noConflict = function() {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Overlay._jQueryInterface
    };

    return Overlay
})($);

export default Overlay