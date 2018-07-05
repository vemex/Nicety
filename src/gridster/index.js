import $ from 'jquery'
import {Draggable} from '@shopify/draggable';

import {DomUtils,Helper,Constant} from "./Utils"
import MoveDragController from "./moveDragController"
import ResizeDragController from "./resizeDragController"
import GridsterLayoutManager from "./layout/layoutManager"

let iniApplyLayoutInfo=function (info) {
        let layoutItem = info.layoutInfos.getLayoutItem(info.updateIds[0]);
        let e = this._ranges.equalWidth;
        DomUtils.setSize(info.el, {
            width: e * layoutItem.rect.size.rWidth,
            height: e * layoutItem.rect.size.rHeight
        });
        DomUtils.setPosition(info.el, {
            x: e * layoutItem.rect.position.indexX,
            y: e * layoutItem.rect.position.indexY
        });
        this._container.style.height = info.size.rHeight * e + 'px';
};

const Gridster = (($) => {
    const NAME = 'nyGridster';

    const VERSION = '0.0.1';

    const DATA_KEY = 'ny.gridster';
    const JQUERY_NO_CONFLICT = $.fn[NAME];

    const DefaultConfig = {};

    const Selector = {
        DraggableWrapper: '.drag-wrapper',
        DraggableNode: '.drag-wrapper > ul > li'
    };

    const DefaultType = {
        message: 'string'
    };

    const Class = {
        Drag_Warp: 'drag-wrapper',
    };

    const Event = {};

    class Gridster {
        constructor($el, config) {
            this._element = $el;
            let container = DomUtils.newNode('<ul class="drag-wrapper"></ul>');
            DomUtils.appendTo(container, this._element);
            this._container = container;
            this._contianerRect = container.getBoundingClientRect();
            this._columns=Constant.ColumnCount;
            this._ranges = Helper.initGridRanges(container, Constant.ColumnCount);
            this._layoutManager=new GridsterLayoutManager(this);

            this._draggable = new Draggable(container, {
                draggable: 'li',
                delay: 0,
            });

            this._moveController = new MoveDragController(this);
            this._resizeControl = new ResizeDragController(this);

            let _=this;
            this._layoutManager.subscribe(function (infos) {
                if (!_._onDragging) {//当处于拖拽状态时财之用
                    iniApplyLayoutInfo.call(_, infos);
                }
            });
            this.add(
                {
                    position:{indexX:0,indexY:0} ,
                    size:{rWidth:1,rHeight:1}
                });
            this.add(
                {
                    position:{indexX:0,indexY:1} ,
                    size:{rWidth:1,rHeight:1}
                });
            this.add(
                {
                    position:{indexX:0,indexY:2} ,
                    size:{rWidth:1,rHeight:1}
                });
            this.add(  {
                position:{indexX:1,indexY:0} ,
                size:{rWidth:2,rHeight:3}
            });
            this.add(  {
                position:{indexX:3,indexY:0} ,
                size:{rWidth:4,rHeight:4}
            });
        }

        add(rect) {
            let el = DomUtils.newNode('<li class="gs-window-wrapper">' +
                '<div class="gs-window">' +
                    '<div class="gs-title gs-move-handle"></div>' +
                    '<div class="gs-container"></div>' +
                '</div>' +
                '<span class="gs-resize-handle gs-resize-handle-both"></span></li>');
            DomUtils.appendTo(el, this._container);
            let layoutItem = this._layoutManager.add(rect,el,true);
            $(el).attr("item-id",layoutItem.itemId);
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


    $.fn[NAME] = Gridster._jQueryInterface;
    $.fn[NAME].Constructor = Gridster;
    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Gridster._jQueryInterface
    };

    return Gridster
})($);

export default Gridster