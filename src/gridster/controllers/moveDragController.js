import {DomUtils} from "../Utils";
import BaseDragController from "./BaseDragController"

/**
 * 计算拖动位置时，显示元素的位置信息
 * @param gridster gridster
 * @param originalSourceSize 拖动元素的原始大小
 * @param originalSourceSize 拖动元素的原始大小
 * @param mouseOffset 鼠标的偏移位置
 * @param initialPosition 拖动元素的初始位置
 * @returns {{y: *, x: *}}
 */
function getMoveSuggestDisplayPosition(gridster, originalSourceSize, mouseOffset, initialPosition) {
    let displayPosition = {
        y: initialPosition.y + mouseOffset.offsetY,
        x: initialPosition.x + mouseOffset.offsetX,
    };
    displayPosition.x = displayPosition.x < 0 ? 0 : displayPosition.x;
    displayPosition.y = displayPosition.y < 0 ? 0 : displayPosition.y;
    displayPosition.x = displayPosition.x >= (gridster._contianerRect.width - originalSourceSize.width) ? (gridster._contianerRect.width - originalSourceSize.width) : displayPosition.x;
    return displayPosition;
}

/**
 * 拖动控制对象
 */
class MoveDragController extends BaseDragController {

    constructor(gridster) {
        super(gridster);
    }

    IsHandler(srcEL) {
        return DomUtils.hasClass(srcEL, 'gs-move-handle');
    }

    dragStart(evt) {

        this._initialMousePosition = {
            x: evt.sensorEvent.clientX,
            y: evt.sensorEvent.clientY,
        };
        this._initialPosition = {
            x: DomUtils.getNumber(evt.source.style.left),
            y: DomUtils.getNumber(evt.source.style.top),
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
            x: evt.sensorEvent.clientX - this._gridster._contianerRect.x,
            y: evt.sensorEvent.clientY - this._gridster._contianerRect.y
        };
        //计算原始元素的大小信息
        let originalSourceSize = {
            width: DomUtils.getNumber(evt.source.style.width),
            height: DomUtils.getNumber(evt.source.style.height)
        };

        //计算显示位置
        let displayPosition = getMoveSuggestDisplayPosition(this._gridster, originalSourceSize, mouseOffset, this._initialPosition);

        let clientInfo={
            EL:evt.mirror,
            mouseOffset:mouseOffset,
            relativeMousePosition:relativeMousePosition,
            originalSourceSize:originalSourceSize,
            displayPosition:displayPosition
        };
        this._gridster._layoutManager.update(evt.originalSource.getAttribute("item-id"),clientInfo);



        // //设定Mirror对象坐标原点为容器的左上角
         evt.mirror.style.transform = `translate3d(${this._gridster._contianerRect.left}px, ${this._gridster._contianerRect.top}px, 0)`;
        //
        // //设置镜像位置
        // DomUtils.setPosition(evt.mirror, this._mirrorPosition);
        //
        //设置实时显示位置
        DomUtils.setPosition(evt.source, displayPosition);
    }

    dragEnd(evt) {
        DomUtils.setPosition(evt.originalSource, this._mirrorPosition);
    }
}

export default MoveDragController