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
    const ITEM_KEY = 'gridster.item';

    const JQUERY_NO_CONFLICT = $.fn[NAME];

    const DefaultConfig = {
        columns: 12,
        min: {
            width: 3,
            height: 3,
        },
        operators: [{
            content: "",
            className: "",
            type: ""
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

    const Classes = {
        DragWarp: 'gs-window-wrapper',
        DragWindow: 'gs-window',
        DragWindowHeader: 'gs-header',
        DragWindowTitle: 'gs-title',
        DragWindowControl: 'gs-control',
        DragWindowBody: 'gs-container',
        ResizeHandler: 'gs-resize-handle',
        MoveHandler: 'gs-move-handle',
    };

    const Event = {
        WINDOW_CLICK_DATA_API: `click.window.${EVENT_KEY}${DATA_API_KEY}`,
        WINDOW_KEY: `window.`
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
            this.add({rect: {x: 0, y: 0, width: 3, height: 3}, title: ""})
            this.add({rect: {x: 0, y: 0, width: 3, height: 3}, title: ""})
            this.add({rect: {x: 0, y: 0, width: 3, height: 3}, title: ""})
            this.add({rect: {x: 0, y: 0, width: 3, height: 3}, title: ""})
            this.add({rect: {x: 0, y: 0, width: 3, height: 3}, title: ""})
            this.add({rect: {x: 0, y: 0, width: 3, height: 3}, title: ""})
        }

        add(item) {
            let el = DomUtils.newNode(`<li class="${Classes.DragWarp}">
                <div class="${Classes.DragWindow}">
                <div class="${Classes.DragWindowHeader} ${Classes.MoveHandler}"></div>
                <div class="${Classes.DragWindowBody}"></div>
                </div>
                <span class="${Classes.ResizeHandler}"></span></li>`);
            DomUtils.appendTo(el, this._container);
            let layoutItem = this._layoutManager.add(item.rect, el, true);
            $(el).attr("item-id", layoutItem.itemId);
            item.itemId=layoutItem.itemId;
            $(`<div class="${Classes.DragWindowTitle}">${layoutItem.itemId}</div>`).appendTo($(`.${Classes.DragWindowHeader}`, el));
            let control = $(`<div class="${Classes.DragWindowControl}"></div>`).appendTo($(`.${Classes.DragWindowHeader}`, el));

            $('<button data-type="load" class="btn"><i class="ti-reload icon-lg" ></i></button>').appendTo(control);
            $('<button  data-type="close" class="btn"><i class="ti-close icon-lg"></i></button>').appendTo(control);
            $('button', control).data(DATA_KEY, this);
            $('button', control).data(ITEM_KEY, item);
            this.load(item,el);
        }

        close(item) {
            this._inClosing=true;
            this._element.nyOverlay({ title: 'WAITING', target: `li[item-id=${item.itemId}] .${Classes.DragWindowBody}`,'iconType':'pulse'});
            const event = $.Event(Event.WINDOW_KEY + 'close');
            event.item = item;
            event.gridster = this;
            let _=this;
            event.next = function () {
                _._element.nyOverlay('hide');
                _.remove(item);
                this._inClosing=false;
            };
            this.trigger(event);
        }

        load(item) {
            if (this._inClosing){
                return;
            }
            this._element.nyOverlay({ title: 'LOADING', target: `li[item-id=${item.itemId}] .${Classes.DragWindowBody}`,'iconType':'pulse'});
            const event = $.Event(Event.WINDOW_KEY + 'load');
            event.el=$(`li[item-id=${item.itemId}] .${Classes.DragWindowBody}`)[0];
            event.item = item;
            event.gridster = this;
            let _=this;
            event.next = function () {
                _._element.nyOverlay('hide');
            };
            this.trigger(event);
        }

        trigger(event) {
            this._element.trigger(event);
        }

        remove(item) {
            $(`li[item-id=${item.itemId}]`).remove();
        }

        _getConfig(config) {
            return config;
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
                if(typeof config==='string') {
                    data[config].call(data,arguments.slice(1))
                }
            });
        };
    }

    $(document).on(
        Event.WINDOW_CLICK_DATA_API,
        Selector.WindowBarButton,
        function (evt) {
            let gridster = $(evt.currentTarget).data(DATA_KEY);
            let item = $(evt.currentTarget).data(ITEM_KEY);
            let dataType = $(evt.currentTarget).attr('data-type');
            let action = gridster[dataType];
            if (action)
                action.call(gridster,item);
            else{
                const operationEvent = $.Event(Event.WINDOW_KEY + dataType);
                operationEvent.dataType = dataType;
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