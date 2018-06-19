import {DomUtils} from "./Utils";
import {Draggable} from '@shopify/draggable';

/**
 * resize时，显示元素的大小信息
 * @param mouseOffset 鼠标偏移量
 * @param initialSize 初始化大小
 * @returns {{width: *, height: *}|*}
 */
let getResizeSuggestDisplaySize = (mouseOffset, initialSize) => {
    return {
        width: mouseOffset.offsetX + initialSize.width,
        height: mouseOffset.offsetY + initialSize.height
    };
};
/**
 * 当resize大小时，获取mirror对象建议大小
 * @param gridster gridster
 * @param resizeWindowEL resize控制对象窗口
 * @param newDisplaySize 新的窗口显示大小
 * @returns {{width: number, height: number}} 建议Mirror对象的高度和宽度
 */
let getResizeSuggestMirrorSize =  (gridster, resizeWindowEL, newDisplaySize)=>{
    let ranges = gridster._ranges;

    //向上取整
    let rw = Math.ceil(newDisplaySize.width / ranges.equalWidth);
    let rh = Math.ceil(newDisplaySize.height / ranges.equalWidth);

    //获取整数的宽度
    let result = {
        width: rw * ranges.equalWidth,
        height: rh * ranges.equalWidth,
    };
    //重置拖拽容器的高度
    gridster._container.style.height = (DomUtils.getNumber(resizeWindowEL.style.top) + result.height) + 'px';
    return result;
};


let getResizeWindowsEL =  (resizeHandlerEL)=> DomUtils.findParent(resizeHandlerEL, 'li');


/**
 * 拖拽大小控制对象
 */
class ResizeDragController {
    /**
     *
     * @param {Gridster} gridster
     * @param {Draggable} resizeDraggable
     */
    constructor(gridster, resizeDraggable) {
        this._gridster = gridster;
        let _ = this;
        this._resizeDraggable = resizeDraggable;
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
        evt.mirror.style.transform = `translate3d(${this._gridster._contianerRect.left}px, ${this._gridster._contianerRect.top}px, 0)`;
        //计算鼠标的偏移距离（鼠标的当前坐标-拖拽开始时鼠标坐标）
        let mouseOffset = {
            offsetX: evt.sensorEvent.clientX - this._initialMousePosition.x,
            offsetY: evt.sensorEvent.clientY - this._initialMousePosition.y
        };
        let resiezeWindowEL = getResizeWindowsEL(evt.source);
        let displaySize = getResizeSuggestDisplaySize(mouseOffset, this._initialSize);
        DomUtils.setSize(resiezeWindowEL, displaySize);
        this._mirrorSize = getResizeSuggestMirrorSize(this._gridster, resiezeWindowEL, displaySize);
        DomUtils.setSize(evt.mirror, this._mirrorSize);
        DomUtils.setPosition(evt.mirror, {
            x: DomUtils.getNumber(resiezeWindowEL.style.left),
            y: DomUtils.getNumber(resiezeWindowEL.style.top)
        });
    }

    dragEnd(evt) {
        let source = getResizeWindowsEL(evt.source);
        DomUtils.setSize(source, this._mirrorSize);
    }
}

export default ResizeDragController