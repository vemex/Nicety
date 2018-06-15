import $ from 'jquery'
import {Draggable} from '@shopify/draggable';

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

    let DomUtils = {
        newNode: function (htmlStr) {
            return $(htmlStr)[0];
        },
        getElement: function (selector) {
            return $(selector)[0];
        },
        appendTo: function (el, parentEl) {
            $(el).appendTo(parentEl);
            return el;
        },
        getNumber: function (val) {
            let result = val == "" ? 0 : Number.parseInt(val.substr(0, val.length - 2));
            if (isNaN(result)) {
                throw  new Error("error val")
            }
            return result;
        },
        setPosition: function (el, newPosition) {
            el.style.top = newPosition.y + "px";
            el.style.left = newPosition.x + "px";
        },
        setSize: function (el, size) {
            el.style.width = size.width + "px";
            el.style.height = size.height + "px";
        },
        findParent: function (el, tag) {
            if (el.parentElement.tagName.toLowerCase() == tag) {
                return el.parentElement;
            } else {
                DomUtils.findParent(el.parentElement, tag);
            }
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

    /**
     * 拖拽元素时，获取镜像元素的建议位置
     * @param gridster
     * @param sourceSize
     * @param sourceIndex
     * @returns {*}
     */
    let getMoveSuggestMirrorPosition = function (gridster, sourceSize, sourceIndex) {
        let indexX = sourceIndex.x;
        let indexY = sourceIndex.y;

        if (isNaN(indexY) || isNaN(indexX)) {
            throw  new Error("Error Index")
        }
        let ranges = gridster._ranges;
        let adjustPosition;
        for (let index in ranges.ranges) {
            let item = ranges.ranges[index];
            if (indexX == item.index.x &&
                item.index.y === indexY) {
                adjustPosition = item.position;
                break;
            }
        }
        if (adjustPosition === undefined) {//当未获取到索引位置时，调整高度重构ranges索引
            gridster._container.style.height = (DomUtils.getNumber(gridster._container.style.height) + ranges.equalWidth) + 'px';
            gridster._ranges = initGridRanges(gridster._container, 12);
            return getMoveSuggestMirrorPosition(gridster, sourceSize, sourceIndex)
        } else {
            gridster._container.style.height = ((sourceIndex.y) * ranges.equalWidth + sourceSize.height) + 'px';
            return adjustPosition;
        }
    };

    /**
     * 拖拽元素时，获取镜像元素的建议索引
     * @param displayPosition
     * @param sourceSize
     * @param ranges
     * @returns {{x: number, y: number}}
     */
    function getMoveSuggestIndex(displayPosition, sourceSize, ranges) {
        let indexX = Math.round((displayPosition.x) / ranges.equalWidth);
        let indexY = Math.round((displayPosition.y) / ranges.equalWidth);
        let rw = Math.round(sourceSize.width / ranges.equalWidth);
        indexX = (indexX + rw) < ranges.maxWidthIndex ? indexX - (rw - 1) : (ranges.maxWidthIndex - (rw - 1));
        indexX = indexX < 0 ? 0 : indexX;
        indexY = indexY < 0 ? 0 : indexY;
        let suggestIndex = {
            x: indexX,
            y: indexY
        }
        return suggestIndex;
    }

    /**
     * 计算拖动位置时，显示元素的位置信息
     * @param sourceSize
     * @param mouseOffset
     * @param ranges
     * @returns {{y: *, x: *}}
     */
    function getMoveSuggestDisplayPosition(sourceSize, mouseOffset, ranges) {
        let displayPosition = {
            y: this._initialPosition.y + mouseOffset.offsetY,
            x: this._initialPosition.x + mouseOffset.offsetX,
        };
        displayPosition.x = displayPosition.x < 0 ? 0 : displayPosition.x;
        displayPosition.y = displayPosition.y < 0 ? 0 : displayPosition.y;
        displayPosition.x = displayPosition.x >= (this._owner._contianerRect.width - sourceSize.width) ? (this._owner._contianerRect.width - sourceSize.width) : displayPosition.x;
        return displayPosition;
    }

    /**
     * resize时，显示元素的大小信息
     * @param mouseOffset
     * @param initialSize
     * @returns {{width: *, height: *}|*}
     */
    let getResizeSuggestDisplaySize = function (mouseOffset, initialSize) {
        let displaySize = {
            width: mouseOffset.offsetX + initialSize.width,
            height: mouseOffset.offsetY + initialSize.height
        };
        return displaySize;
    }
    /**
     * 当resize大小时，获取mirror对象建议大小
     * @param gridster
     * @param newSize
     * @returns {{width: number, height: number}}
     */
    let getResizeSuggestMirrorSize = function (gridster, source, newSize) {
        let ranges = gridster._ranges;
        let rw = Number.parseInt(newSize.width / ranges.equalWidth);
        let rh = Number.parseInt(newSize.height / ranges.equalWidth);
        if (newSize.width % ranges.equalWidth !== 0) {
            rw += 1;
        }
        if (newSize.height % ranges.equalWidth !== 0) {
            rh += 1;
        }
        let result = {
            width: rw * ranges.equalWidth,
            height: rh * ranges.equalWidth,
        }
        gridster._container.style.height = (DomUtils.getNumber(source.style.top) + result.height) + 'px';
        return result;
    };


    let getResizeSource = function (resizeHandlerEL) {
        return DomUtils.findParent(resizeHandlerEL, 'li')
    }

    /**
     * 拖动控制对象
     */
    class MoveDragController {
        constructor(owner) {
            this._owner = owner;
            let _ = this;
            this._owner._moveDraggable.on('drag:start', function (evt) {
                _.dragStart(evt);
            });
            this._owner._moveDraggable.on('mirror:create', function (evt) {
                _.mirrorCreate(evt);
            });
            this._owner._moveDraggable.on('mirror:created', function (evt) {
                _.mirrorCreated(evt);
            });
            this._owner._moveDraggable.on('drag:move', function (evt) {
                _.dragMove(evt);
            });
            this._owner._moveDraggable.on('drag:stop', function (evt) {
                _.dragEnd(evt);
            });
        }

        dragStart(evt) {
            if (evt.originalEvent.srcElement.tagName != "LI") {
                evt.cancel();
                return;
            }
            this._initialMousePosition = {
                x: evt.sensorEvent.clientX,
                y: evt.sensorEvent.clientY,
            };
            this._initialPosition = {
                x: DomUtils.getNumber($(evt.source).css("left")),
                y: DomUtils.getNumber($(evt.source).css("top")),
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
                offsetX: evt.sensorEvent.clientX - this._initialMousePosition.x,
                offsetY: evt.sensorEvent.clientY - this._initialMousePosition.y
            };
            //获取鼠标的相对坐标，以容器的左上为为坐标原点
            let relativeMousePosition = {
                x: evt.sensorEvent.clientX - this._owner._contianerRect.x,
                y: evt.sensorEvent.clientY - this._owner._contianerRect.y
            };

            let ranges = this._owner._ranges;

            let sourceSize = {
                width: DomUtils.getNumber(evt.source.style.width),
                height: DomUtils.getNumber(evt.source.style.height)
            }

            //计算显示位置
            let displayPosition = getMoveSuggestDisplayPosition.call(this, sourceSize, mouseOffset, ranges);

            let sourceIndex = getMoveSuggestIndex.call(this, displayPosition, sourceSize, ranges);
            //计算新的拖拽元素的位置
            let newDragRectPosition = getMoveSuggestMirrorPosition(this._owner, sourceSize, sourceIndex);

            evt.mirror.style.transform = `translate3d(${this._owner._contianerRect.left}px, ${this._owner._contianerRect.top}px, 0)`;
            //设置镜像位置
            DomUtils.setPosition(evt.mirror, newDragRectPosition);

            this._mirrorPosition = newDragRectPosition;

            //设置实时显示位置
            DomUtils.setPosition(evt.source, displayPosition);
        }

        dragEnd(evt) {
            //todo 监听鼠标释放时设置
            DomUtils.setPosition(evt.originalSource, this._mirrorPosition);
        }
    }

    class ResizeDragController {
        constructor(owner,resizeDraggable) {
            this._owner = owner;
            let _ = this;
            this._resizeDraggable=resizeDraggable;
            this._resizeDraggable.on('drag:start', function (evt) {
                _.dragStart(evt);
            });
            this._resizeDraggable.on('mirror:create', function (evt) {
                _.mirrorCreate(evt);
            });
            this._resizeDraggable.on('mirror:created', function (evt) {
                _.mirrorCreated(evt);
            });
            this._resizeDraggable.on('drag:move', function (evt) {
                _.dragMove(evt);
            });
            this._resizeDraggable.on('drag:stop', function (evt) {
                _.dragEnd(evt);
            });
        }

        dragStart(evt) {
            this._initialMousePosition = {
                x: evt.sensorEvent.clientX,
                y: evt.sensorEvent.clientY,
            };
            this._initialPosition = {
                x: DomUtils.getNumber($(evt.source).css("left")),
                y: DomUtils.getNumber($(evt.source).css("top")),
            };

            let source = DomUtils.findParent(evt.source, 'li');
            this._initialSize = {
                width: DomUtils.getNumber(source.style.width),
                height: DomUtils.getNumber(source.style.height),
            };
        }

        mirrorCreate(evt) {

        }

        mirrorCreated(evt) {

        }

        dragMove(evt) {
            if (evt.sensorEvent.clientX === undefined) {
                return;
            }
            evt.cancel();
            DomUtils.setSize(evt.mirror, {
                width: this._initialSize.width,
                height: this._initialSize.height
            });
            evt.mirror.style.transform = `translate3d(${this._owner._contianerRect.left}px, ${this._owner._contianerRect.top}px, 0)`;
            //计算鼠标的偏移距离（鼠标的当前坐标-拖拽开始时鼠标坐标）
            let mouseOffset = {
                offsetX: evt.sensorEvent.clientX - this._initialMousePosition.x,
                offsetY: evt.sensorEvent.clientY - this._initialMousePosition.y
            };
            let source = getResizeSource(evt.source);
            let displaySize = getResizeSuggestDisplaySize(mouseOffset, this._initialSize);
            DomUtils.setSize(source, displaySize);
            this._mirrorSize = getResizeSuggestMirrorSize(this._owner, source, displaySize);
            DomUtils.setSize(evt.mirror, this._mirrorSize);
            DomUtils.setPosition(evt.mirror, {
                x: DomUtils.getNumber(source.style.left),
                y: DomUtils.getNumber(source.style.top)
            });
        }

        dragEnd(evt) {
            let source = DomUtils.findParent(evt.source, 'li');
            DomUtils.setSize(source, this._mirrorSize);
        }
    }


    class Gridster {
        constructor($el, config) {
            this._element = $el;
            let container = DomUtils.newNode('<ul class="drag-wrapper"></ul>');
            DomUtils.appendTo(container, this._element);
            this._container = container;
            this._contianerRect = container.getBoundingClientRect();
            this._ranges = initGridRanges(container, 12);
            this._moveDraggable = new Draggable(container, {
                draggable: 'li',
                delay: 0,
            });
            this._resizeControls = [];
            this._moveController = new MoveDragController(this);
            //this._resizeController = new ResizeDragController(this);
            this.addBlock()
            this.addBlock()
            this.addBlock()
        }

        addBlock() {
            var el = DomUtils.newNode('<li><div class="gs-container"></div><span class="gs-resize-handle gs-resize-handle-both"></span></li>');
            DomUtils.appendTo(el, this._container);
            let resizeDraggable = new Draggable(el, {
                draggable: '.gs-resize-handle ',
                delay: 0,
            });
            DomUtils.setSize(el, {
                width: this._ranges.equalWidth,
                height: this._ranges.equalWidth
            })
            let resizeController = new ResizeDragController(this,resizeDraggable);
            this._resizeControls.push(resizeController);
        }

        removeBlock() {
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