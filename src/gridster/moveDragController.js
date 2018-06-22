import {DomUtils} from "./Utils";
import {Helper, Constant} from "./Utils";
import BaseDragController from "./BaseDragController"

/**
 * 拖拽元素时，获取镜像元素的建议位置
 * @param gridster gridster
 * @param originalSourceSize  拖动元素的原始大小
 * @param suggestSourceIndex 建议位置索引
 * @returns {*}
 */
let getMoveSuggestMirrorPosition = function (gridster, originalSourceSize, suggestSourceIndex) {
    let indexX = suggestSourceIndex.x;
    let indexY = suggestSourceIndex.y;

    if (isNaN(indexY) || isNaN(indexX)) {
        throw  new Error("Error Index")
    }
    let ranges = gridster._ranges;
    let adjustPosition;
    for (let index in ranges.ranges) {
        let item = ranges.ranges[index];
        if (indexX === item.index.x &&
            item.index.y === indexY) {
            adjustPosition = item.position;
            break;
        }
    }
    if (adjustPosition === undefined) {//当未获取到索引位置时，调整高度重构ranges索引
        //gridster._container.style.height = (DomUtils.getNumber(gridster._container.style.height) + ranges.equalWidth) + 'px';
        gridster._ranges = Helper.initGridRanges(gridster._container, Constant.ColumnCount);
        return getMoveSuggestMirrorPosition(gridster, originalSourceSize, suggestSourceIndex)
    } else {
        //  gridster._container.style.height = ((originalSourceSize.y) * ranges.equalWidth + originalSourceSize.height) + 'px';
        return adjustPosition;
    }
};

/**
 * 拖拽元素时，获取镜像元素的建议索引
 * @param gridster gridster
 * @param displayPosition 拖拽元素的实时显示位置
 * @param originalSourceSize  拖动元素的原始大小
 * @returns {{x: number, y: number}}
 */
function getMoveSuggestMirrorIndex(gridster, displayPosition, originalSourceSize) {
    let ranges = gridster._ranges;
    let indexX = Math.round((displayPosition.x) / ranges.equalWidth);
    let indexY = Math.round((displayPosition.y) / ranges.equalWidth);
    let rw = Math.round(originalSourceSize.width / ranges.equalWidth);
    indexX = (indexX + rw) < ranges.maxWidthIndex ? indexX - (rw - 1) : (ranges.maxWidthIndex - (rw - 1));
    indexX = indexX < 0 ? 0 : indexX;
    indexY = indexY < 0 ? 0 : indexY;
    return {
        x: indexX,
        y: indexY
    };
}

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
        }
        this._gridster._layoutManager.update(evt.originalSource.getAttribute("item-id"),clientInfo)


        // //获取建议索引位置
        // let suggestSourceIndex = getMoveSuggestMirrorIndex(this._gridster, displayPosition, originalSourceSize);
        // //计算新的拖拽元素的位置
        // this._mirrorPosition = getMoveSuggestMirrorPosition(this._gridster, originalSourceSize, suggestSourceIndex);
        //
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