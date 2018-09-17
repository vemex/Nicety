import $ from 'jquery'

const Checkbox = (($) => {
    const NAME = 'nyCheckBox';

    const VERSION = '0.0.1';

    const DATA_KEY = 'ny.checkbox';
    const DATA_TEMPLATE_KEY = `${DATA_KEY}.template`;
    const DATA_OVER_DIV_KEY = `${DATA_KEY}.id`;
    const EVENT_KEY = `.${DATA_KEY}`;
    const DATA_API_KEY = '.data-api';
    const JQUERY_NO_CONFLICT = $.fn[NAME];

    const Default = {
    };

    const Selector = {
        Checkbox: 'input[type="checkbox"]'
    };

    const DefaultType = {};

    const Event = {
        CHANGE_DATA_API: `change${EVENT_KEY}${DATA_API_KEY}`,
    };

    class Checkbox {
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


        dispose() {
            this._element.removeData(DATA_KEY);
            this._element.removeData(DATA_OVER_DIV_KEY);
            this._element.removeData(DATA_TEMPLATE_KEY);
            this._element = null;
            this._config = null;
        }

        static get Version() {
            return VERSION;
        }

        static _jQueryInterface(config) {
            return this.each(function () {
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
            })
        }
    }

    $(document).on(
        Event.CHANGE_DATA_API,
        Selector.Checkbox,
        function (event) {
            // let config = {};
            // $(this).nyCheckBox(config);
            let checked = $(event.currentTarget).prop('checked');
            let target = $(event.currentTarget).closest(".checkbox");
            if (target.length > 0) {
                if (checked) {
                    target.addClass("active");
                } else {
                    target.removeClass("active");
                }
            }


        }
    );

    $.fn[NAME] = Checkbox._jQueryInterface;
    $.fn[NAME].Constructor = Checkbox;
    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Checkbox._jQueryInterface
    };

    return Checkbox
})($);

export default Checkbox