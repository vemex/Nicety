import $ from 'jquery'
import {Draggable} from '@shopify/draggable';

import {DomUtils, Helper, Constant} from "./Utils"
import ControllerManager from "./controllers/ControllerManager"
import MoveDragController from "./controllers/moveDragController"
import ResizeDragController from "./controllers/resizeDragController"
import GridsterLayoutManager from "./layout/layoutManager"

let iniApplyLayoutInfo = function (info) {
    let layoutItem = info.layoutInfo.getLayoutItem(info.updateIds[0]);
    let e = this._ranges.equalWidth;
    DomUtils.setSize(info.el, {
        width: e * layoutItem.rect.width,
        height: e * layoutItem.rect.height
    });
    DomUtils.setPosition(info.el, {
        x: e * layoutItem.rect.x,
        y: e * layoutItem.rect.y
    });
    this._container.style.height = info.size.height * e + 'px';
};

const Gridster = (($) => {
    const NAME = 'nyGridster';

    const VERSION = '0.0.1';

    const DATA_KEY = 'ny.gridster';
    const EVENT_KEY = `.${DATA_KEY}`;
    const DATA_API_KEY = '.data-api';

    const JQUERY_NO_CONFLICT = $.fn[NAME];

    const DefaultConfig = {
        columns:12,
        minable:{
            width:3,
            height:3,
        },
        operators:[{
            content:"",
            className:"",
            type:""
        }]
    };

    const Selector = {
        DraggableWrapper: 'ul.drag-wrapper',
        DraggableWindow: 'ul.drag-wrapper > li.gs-window-wrapper',
        WindowBarButton: 'ul.drag-wrapper > li.gs-window-wrapper > div.gs-window>div.gs-header>div.gs-control>button',

    };

    const DefaultType = {
        message: 'string'
    };

    const Class = {
        Drag_Warp: 'drag-wrapper',
    };

    const Event = {
        WINDOW_CLICK_DATA_API: `click.window.${EVENT_KEY}${DATA_API_KEY}`,
        OPERATION_KEY: `operation.`,
    };

    class Gridster {
        constructor($el, config) {
            this._element = $el;
            let container = DomUtils.newNode('<ul class="drag-wrapper"></ul>');
            DomUtils.appendTo(container, this._element);
            this._container = container;
            this._contianerRect = container.getBoundingClientRect();
            this._columns = Constant.ColumnCount;
            this._ranges = Helper.initGridRanges(container, Constant.ColumnCount);
            this._layoutManager = new GridsterLayoutManager(this);
            this._draggable = new Draggable(container, {
                draggable: 'li',
                delay: 0,
            });
            this._controllerManager = new ControllerManager(this);
            this._controllerManager.regist(new MoveDragController(this));
            this._controllerManager.regist(new ResizeDragController(this));

            let _ = this;
            this._layoutManager.subscribe(function (infos) {
                if (!_._onDragging) {//当处于拖拽状态时财之用
                    iniApplyLayoutInfo.call(_, infos);
                }
            });
            this.add({rect: {x: 0, y: 0, width: 3, height: 3}, title: ""})
        }

        add(item) {
            let el = DomUtils.newNode('<li class="gs-window-wrapper">' +
                '<div class="gs-window">' +
                '<div class="gs-header gs-move-handle "></div>' +
                '<div class="gs-container"></div>' +
                '</div>' +
                '<span class="gs-resize-handle gs-resize-handle-both"></span></li>');
            DomUtils.appendTo(el, this._container);
            let layoutItem = this._layoutManager.add(item.rect, el, true);
            $(el).attr("item-id", layoutItem.itemId);
            $(`<div class="gs-title">${layoutItem.itemId}</div>`).appendTo($('.gs-header', el));
            let control = $(`<div class="gs-control"><button data-type="refresh" class="btn"><i class="ti-reload icon-lg" ></i></button><button  data-type="close" class="btn"><i class="ti-close icon-lg"></i></button></div>`).appendTo($('.gs-header', el));
            $('button', control).data(DATA_KEY, this);
        }

        removeBlock() {
        }

        _getConfig(config) {

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
                let isInit = !data || (typeof config === "object" && config);

                if (isInit) {
                    data = new Gridster($element, config);
                    $element.data(DATA_KEY, data);
                }
            });
        };
    }

    $(document).on(
        Event.WINDOW_CLICK_DATA_API,
        Selector.WindowBarButton,
        function (evt) {
            let gridster=$(evt.currentTarget).data(DATA_KEY);
            let dataType = $(evt.currentTarget).attr('data-type');
            if (dataType) {
                const operationEvent = $.Event(Event.OPERATION_KEY+dataType);
                operationEvent.dataType=dataType;
                gridster._element.trigger(operationEvent);
            }
        }
    );

    $.fn[NAME] = Gridster._jQueryInterface;
    $.fn[NAME].Constructor = Gridster;
    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Gridster._jQueryInterface
    };

    return Gridster
})($);

export default Gridster