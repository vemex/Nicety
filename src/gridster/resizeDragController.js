import {DomUtils} from "./Utils";
import {Draggable} from '@shopify/draggable';
import BaseDragController from "./BaseDragController";

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


/**
 * 拖拽大小控制对象
 */
class ResizeDragController extends  BaseDragController{
    /**
     *
     * @param {Gridster} gridster
     */
    constructor(gridster) {
        super(gridster);
    }
    IsHandler(srcEL){
        return DomUtils.hasClass(srcEL, 'gs-resize-handle');
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

        this._initialSize = {
            width: DomUtils.getNumber(evt.source.style.width),
            height: DomUtils.getNumber(evt.source.style.height),
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
       // evt.mirror.style.transform = `translate3d(${this._gridster._contianerRect.left}px, ${this._gridster._contianerRect.top}px, 0)`;
        //计算鼠标的偏移距离（鼠标的当前坐标-拖拽开始时鼠标坐标）
        let mouseOffset = {
            offsetX: evt.sensorEvent.clientX - this._initialMousePosition.x,
            offsetY: evt.sensorEvent.clientY - this._initialMousePosition.y
        };
        let displaySize = getResizeSuggestDisplaySize(mouseOffset, this._initialSize);
        DomUtils.setSize(evt.source, displaySize);
        this._mirrorSize = getResizeSuggestMirrorSize(this._gridster, evt.source, displaySize);
        DomUtils.setSize(evt.mirror, this._mirrorSize);
        // DomUtils.setPosition(evt.mirror, {
        //     x: DomUtils.getNumber(resiezeWindowEL.style.left),
        //     y: DomUtils.getNumber(resiezeWindowEL.style.top)
        // });
    }

    dragEnd(evt) {
        DomUtils.setSize(evt.originalSource, this._mirrorSize);
    }
}

export default ResizeDragController