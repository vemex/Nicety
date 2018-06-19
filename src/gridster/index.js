import $ from 'jquery'
import {Draggable} from '@shopify/draggable';

import {DomUtils,Helper} from "./Utils"
import MoveDragController from "./moveDragController"
import ResizeDragController from "./resizeDragController"


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
            this._ranges = Helper.initGridRanges(container, 12);
            this._moveDraggable = new Draggable(container, {
                draggable: 'li',
                delay: 0,
            });
            this._resizeControls = [];
            this._moveController = new MoveDragController(this,".gs-title");
            //this._resizeController = new ResizeDragController(this);
            this.addBlock();
            this.addBlock();
            this.addBlock();
        }

        addBlock() {
            var el = DomUtils.newNode('<li class="gs-window-wrapper"><div class="gs-window"><div class="gs-title"></div><div class="gs-container"></div></div><span class="gs-resize-handle gs-resize-handle-both"></span></li>');
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