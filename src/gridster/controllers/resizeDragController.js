import {DomUtils} from "../Utils";
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
 * 拖拽大小控制对象
 */
class ResizeDragController extends BaseDragController {
    /**
     *
     * @param {Gridster} gridster
     */
    constructor(gridster) {
        super(gridster);
    }

    IsHandler(srcEL) {
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
        evt.mirror.innerHTML = "";
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
        //获取鼠标的相对坐标，以容器的左上为为坐标原点
        let relativeMousePosition = {
            x: evt.sensorEvent.clientX - this._gridster._contianerRect.x,
            y: evt.sensorEvent.clientY - this._gridster._contianerRect.y
        };
        //计算原始元素的大小信息
        let originalSourceSize = {
            width: DomUtils.getNumber(evt.source.style.width),
            height: DomUtils.getNumber(evt.source.style.height)
        };
        let displayPosition=this._initialPosition;
        let clientInfo={
            EL:evt.mirror,
            mouseOffset:mouseOffset,
            relativeMousePosition:relativeMousePosition,
            originalSourceSize:originalSourceSize,
            displayPosition:displayPosition
        }
        this._gridster._layoutManager.update(evt.originalSource.getAttribute("item-id"),clientInfo) ;
        let displaySize = getResizeSuggestDisplaySize(mouseOffset, this._initialSize);
        DomUtils.setSize(evt.source, displaySize);
    }

    dragEnd(evt) {
        DomUtils.setPosition(evt.originalSource, this._mirrorPosition);
        DomUtils.setSize(evt.originalSource, this._mirrorSize);
    }
}

export default ResizeDragController