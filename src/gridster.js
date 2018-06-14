import $ from 'jquery'
import bsUtil from "bootstrap/js/src/util";
import nyUtil from "./utils";
import {Draggable} from '@shopify/draggable';

const Gridster = (($) => {
    const NAME = 'nyGridster';

    const VERSION = '0.0.1';

    const DATA_KEY = 'ny.gridster';
    const DATA_TEMPLATE_KEY = `${DATA_KEY}.template`;
    const DATA_OVER_DIV_KEY = `${DATA_KEY}.id`;
    const EVENT_KEY = `.${DATA_KEY}`;
    const DATA_API_KEY = '.data-api';
    const JQUERY_NO_CONFLICT = $.fn[NAME];

    const Default = {
        message: '',
        show: function () {

        }, close: function () {

        }, cancel: function () {
            return true;
        }, confirm: function () {

        }
    };

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

    let Utils = {
        getNumber: function (val) {
            return Number.parseInt(val.substr(0, val.length - 2));
        },
        setPosition: function (el, newPosition) {
            el.style.top = newPosition.y + "px";
            el.style.left = newPosition.x + "px";
        }
    };

    /**
     * 初始化区域Grid
     * @param el 区域元素
     * @param gridNumber 每行均分数量
     * @returns {{equalWidth: number, ranges: Array}}
     */
    let initGridRanges = function (el, gridNumber) {
        let rect = el.getBoundingClientRect();
        let equalWidth = rect.width / gridNumber;
        let ranges = [];
        let indexW = 0;
        let indexH = 0;
        let maxWidthIndex = 0;
        let maxHeightIndex = 0;
        if (rect.height <= 0) {
            el.style.height = equalWidth + "px";
            return initGridRanges(el, gridNumber);
        }
        while (indexH <= ((rect.height / equalWidth) - 1)) {
            let position = {
                x: indexW * equalWidth,
                y: indexH * equalWidth
            };
            ranges.push({
                index: {
                    x: indexW,
                    y: indexH
                },
                position: position,
                size: {
                    width: equalWidth,
                    height: equalWidth
                }
            });
            if (position.x + equalWidth >= rect.width) {
                maxWidthIndex = indexW;
                indexW = 0;
                indexH++;
            } else {
                indexW++;
            }
        }
        maxHeightIndex = indexH;
        return {
            maxHeightIndex: maxHeightIndex,
            maxWidthIndex: maxWidthIndex,
            equalWidth: equalWidth,
            ranges: ranges
        };
    };

    let getAdjustPosition = function (gridster, indexX, indexY) {
        let ranges = gridster._ranges;
        let adjustPosition;
        for (let index in ranges.ranges) {
            let item = ranges.ranges[index];
            if (item.index.x === indexX && item.index.y === indexY) {
                adjustPosition = item.position;
                return adjustPosition;
            }
        }
        if (adjustPosition === undefined) {
            gridster._container.style.height = (Utils.getNumber(gridster._container.style.height) + ranges.equalWidth) + 'px';
            gridster._ranges = initGridRanges(gridster._container, 12);
            return getAdjustPosition(gridster, indexX, indexY)
        }
    };

    /**
     * 拖动控制对象
     */
    class DragController {
        constructor(owner) {
            this._owner = owner;
            let _ = this;
            this._owner._draggable.on('drag:start', function (evt) {
                _.dragStart(evt);
            });
            this._owner._draggable.on('mirror:create', function (evt) {
                _.mirrorCreate(evt);
            });
            this._owner._draggable.on('mirror:created', function (evt) {
                _.mirrorCreated(evt);
            });
            this._owner._draggable.on('drag:move', function (evt) {
                _.dragMove(evt);
            });
        }

        dragStart(evt) {
            this._owner._initialMousePosition = {
                x: evt.sensorEvent.clientX,
                y: evt.sensorEvent.clientY,
            };
            this._owner._initialPosition = {
                x: Utils.getNumber($(evt.source).css("left")),
                y: Utils.getNumber($(evt.source).css("top")),
            };
        }

        mirrorCreate(evt) {
        }

        mirrorCreated(evt) {
            evt.mirror.innerHTML = "";
        }

        dragMove(evt) {
            if (evt.sensorEvent.clientX === undefined) {
                return;
            }
            evt.cancel();
            //计算鼠标的偏移距离（鼠标的当前坐标-拖拽开始时鼠标坐标）
            let mouseOffset = {
                offsetX: evt.sensorEvent.clientX - this._owner._initialMousePosition.x,
                offsetY: evt.sensorEvent.clientY - this._owner._initialMousePosition.y
            };
            //获取鼠标的相对坐标，以容器的左上为为坐标原点
            let relativeMousePosition = {
                x: evt.sensorEvent.clientX - this._owner._contianerRect.x,
                y: evt.sensorEvent.clientY - this._owner._contianerRect.y
            };
            //计算显示位置
            let displayPosition = {
                y: this._owner._initialPosition.y + mouseOffset.offsetY,
                x: this._owner._initialPosition.x + mouseOffset.offsetX,
            };

            let ranges = this._owner._ranges;
            displayPosition.x = displayPosition.x < 0 ? 0 : displayPosition.x;
            displayPosition.y = displayPosition.y < 0 ? 0 : displayPosition.y;
            displayPosition.x = displayPosition.x >= (this._owner._contianerRect.width - ranges.equalWidth) ? (this._owner._contianerRect.width - ranges.equalWidth) : displayPosition.x;


            let indexX = parseInt((mouseOffset.offsetX + this._owner._initialPosition.x) / ranges.equalWidth);
            let indexY = parseInt((mouseOffset.offsetY + this._owner._initialPosition.y) / ranges.equalWidth);
            indexX = indexX < 0 ? 0 : indexX;
            indexY = indexY < 0 ? 0 : indexY;
            indexX = indexX >= ranges.maxWidthIndex ? ranges.maxWidthIndex : indexX;
            //计算新的拖拽元素的位置
            let newDragRectPosition = getAdjustPosition(this._owner, indexX, indexY);

            evt.mirror.style.transform = `translate3d(${this._owner._contianerRect.left}px, ${this._owner._contianerRect.top}px, 0)`;
            //设置镜像位置
            Utils.setPosition(evt.mirror, newDragRectPosition);

            //todo 监听鼠标释放时设置
            Utils.setPosition(evt.originalSource, newDragRectPosition);

            //设置实时显示位置
            Utils.setPosition(evt.source, displayPosition);
        }
    }


    class Gridster {
        constructor($el, config) {
            this._element = $el;
            let container = $('<ul class="drag-wrapper"></ul>').appendTo(this._element)[0];
            $('<li>').appendTo(container);
            this._container = container;
            this._contianerRect = container.getBoundingClientRect();
            this._ranges = initGridRanges(container, 12);
            this._draggable = new Draggable(container, {
                draggable: 'li',
                delay: 0,
            });
            this._dragController = new DragController(this);
        }

        _show() {

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