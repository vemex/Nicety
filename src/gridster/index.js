import $ from 'jquery'
import {Draggable} from '@shopify/draggable';

import {DomUtils} from "./Utils"
import ControllerManager from "./controllers/ControllerManager"
import MoveDragController from "./controllers/moveDragController"
import ResizeDragController from "./controllers/resizeDragController"
import GridsterLayoutManager from "./layout/layoutManager"

let initApplyLayoutInfo = function (info) {
    let itemId = info.updateIds[0];
    let layoutItem = info.layoutInfo.getLayoutItem(info.updateIds[0]);
    let e = this._getDividedLength();
    if (info.el) {
        DomUtils.setSize(info.el, {
            width: e * layoutItem.rect.width,
            height: e * layoutItem.rect.height
        });
        DomUtils.setPosition(info.el, {
            x: e * layoutItem.rect.x,
            y: e * layoutItem.rect.y
        });
    }

    //更新所有布局位置信息
    info.layoutInfo.forEach(function (item) {
        if (item.itemId=== itemId && info.el){
            return
        }
        let postion1 = {
            x: e * item.rect.x,
            y: e * item.rect.y
        };
        let size1 = {
            width: e * item.rect.width,
            height: e * item.rect.height
        };
        let el=$(`li.gs-window-wrapper[item-id=${item.itemId}]`)[0];
        DomUtils.setSize(el,size1);
        DomUtils.setPosition(el, postion1);
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
        }],
        items:[]
    };

    const Selector = {
        DraggableWrapper: 'ul.drag-wrapper',
        DraggableWindow: 'ul.drag-wrapper > li.gs-window-wrapper',
        WindowBarButton: 'ul.drag-wrapper > li.gs-window-wrapper > div.gs-window>div.gs-header>div.gs-control>button',

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
            this._config=Gridster._getConfig(config);
            let container = DomUtils.newNode('<ul class="drag-wrapper"></ul>');
            DomUtils.appendTo(container, this._element);
            this._container = container;
            this._contianerRect = container.getBoundingClientRect();
            this._columns = this._config.columns;
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
                    initApplyLayoutInfo.call(_, infos);
                }
            });
            this._initItems();
        }
        
        _initItems(){

            if (!this._config.relayout) {
                this._init=true;
               this._layoutManager.suspend();
            }
            for(let key in  this._config.items) {
                this.add(this._config.items[key]);
            }
            if (!this._config.relayout) {
                this._init=false;
                this._layoutManager.resume();
                let _=this;
                $('li',this._container).each(function () {
                    let item = $(this).data(ITEM_KEY);
                    _.load(item);
                })
            }
        }

        /**
         * 获取等分长度
         * @returns {number}
         * @private
         */
        _getDividedLength(){
            this._contianerRect =  this._container.getBoundingClientRect();
            return this._contianerRect.width/this._columns;
        }

        _buildWindowNode(item){
            let el = DomUtils.newNode(`<li class="${Classes.DragWarp}">
                <div class="${Classes.DragWindow}">
                <div class="${Classes.DragWindowHeader} ${Classes.MoveHandler}"></div>
                <div class="${Classes.DragWindowBody}"></div>
                </div>
                <span class="${Classes.ResizeHandler}"></span></li>`);
            DomUtils.appendTo(el, this._container);
            $(`<div class="${Classes.DragWindowTitle}">${item.title}</div>`).appendTo($(`.${Classes.DragWindowHeader}`, el));
            let control = $(`<div class="${Classes.DragWindowControl}"></div>`).appendTo($(`.${Classes.DragWindowHeader}`, el));
            for (let key in this._config.operators) {
                let operator=this._config.operators[key];
                if (operator.type && operator.type!==''){
                    $(`<button data-type="${operator.type}" class="btn ${operator.className}">${operator.content}</button>`).appendTo(control);
                }
            }
            $('<button data-type="load" class="btn"><i class="ti-reload icon-lg" ></i></button>').appendTo(control);
            $('<button  data-type="close" class="btn"><i class="ti-close icon-lg"></i></button>').appendTo(control);
           return el;
        }
        add(item) {
            let el =this._buildWindowNode(item);
            let layoutItem = this._layoutManager.add(item.rect, el, true);
            $(el).attr("item-id", layoutItem.itemId);

            item={
                ...layoutItem,
                ...item
            };
            $(`.${Classes.DragWindowControl} button`, el).data(DATA_KEY, this);
            $(`.${Classes.DragWindowControl} button`, el).data(ITEM_KEY, item);
            $(el).data(ITEM_KEY, item);
            if ( ! this._init) {
                this.load(item);
            }
        }

        close(item) {
            let _=this;
            this._trigger('close',item,function () {
                _.remove(item);
                _._layoutManager.remove(item.itemId);
            });
        }

        load(item) {
            this._trigger('load',item);
        }

        _trigger(eventType,item,fun) {
            this._element.nyOverlay({ title: 'LOADING', target: `li[item-id=${item.itemId}] .${Classes.DragWindowBody}`,'iconType':'pulse'});
            const event = $.Event(Event.WINDOW_KEY + 'load');
            event.el=$(`li[item-id=${item.itemId}] .${Classes.DragWindowBody}`)[0];
            event.item = item;
            event.gridster = this;
            let _=this;
            event.next = function () {
                _._element.nyOverlay('hide');
                if (fun){
                    fun(event);
                }
            };
            this._element.trigger(event);
            if (!event.async) {
                event.next();
            }
        }

        remove(item) {
            $(`li[item-id=${item.itemId}]`).remove();
        }

        static _getConfig(config) {
            config = {
                ...DefaultConfig,
                ...config
            };
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
                gridster._trigger(dataType,item)
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