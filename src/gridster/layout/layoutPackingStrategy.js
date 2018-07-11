import Packer from "./binPacker"
import Rect from "./rect"

/**
 * 计算推荐的矩形位置
 */
let calculateAdjustRect = function (clientInfo, gridster) {
    let e = gridster._getDividedLength();
    let offsetX = e * 0.8;
    let offsetY = e * 0.2;
    let indexX = Math.floor((clientInfo.displayPosition.x + offsetX) / e);
    let indexY = Math.floor((clientInfo.displayPosition.y + offsetY) / e);
    let rW = Math.round(clientInfo.originalSourceSize.width / e);
    let rH = Math.round(clientInfo.originalSourceSize.height / e);

    indexX = (indexX + rW) <= (gridster._columns-1) ? indexX : (gridster._columns  - (rW));

    indexX = indexX < 0 ? 0 : indexX;
    indexY = indexY < 0 ? 0 : indexY;
console.log(clientInfo.originalSourceSize.width / e )
    return new Rect({x: indexX, y: indexY, width: rW, height: rH});
};
/**
 * 判断两个矩形是否一致，位置和大小
 * @param rect1
 * @param rect2
 * @returns {boolean}
 */
let equalRect = (rect1, rect2) => {
    return rect1.x === rect2.x &&
        rect1.y === rect2.y &&
        rect1.width === rect2.width &&
        rect1.height === rect2.height;
};

/***
 * 布局策略类
 */
class GridsterLayoutStrategy {
    constructor(gridster, layoutInfos) {
        this._gridster = gridster;
        this._layoutInfo = layoutInfos;
    }

    /**
     * 评估测量需要的空间大小
     * @param size 原来大小
     * @param clientInfo 拖拽时的客户端信息
     */
    measure(size, clientInfo, copyLayoutInfo) {
        let layoutInfo = copyLayoutInfo ? copyLayoutInfo : this._layoutInfo;
        let maxWidth = this._gridster._columns;
        let maxHeight = 1;
        layoutInfo.forEach(function (item) {
            if ((item.rect.y + item.rect.height) > maxHeight) {
                maxHeight = item.rect.y + item.rect.height;
            }
        });
        return {
            width: maxWidth,
            height: maxHeight
        };
    }

    /**
     * 对布局信息进行range
     * @param updateLayoutItem 需要range的当前项
     * @param clientInfo 拖拽时的客户端信息
     * {
     *      EL:evt.mirror,
     *      mouseOffset:mouseOffset,
     *      relativeMousePosition:relativeMousePosition,
     *      originalSourceSize:originalSourceSize,
     *      displayPosition:displayPosition
     *}
     */
    range(updateLayoutItem, clientInfo) {
        if (clientInfo) {
            let layoutInfo = this._layoutInfo.clone();
            updateLayoutItem = layoutInfo.getLayoutItem(updateLayoutItem.itemId);
           // let ranges = this._gridster._ranges;
            //根据当前客户端的位置信息获取建议位置
            let adjustRect = calculateAdjustRect(clientInfo, this._gridster);
            //如果建议位置与当前位置信息相等则直接返回
            if (equalRect(updateLayoutItem.rect, adjustRect)) {
                return layoutInfo;
            }
            updateLayoutItem.rect = adjustRect;
            let shiftPacker = new Packer(this._gridster._columns, Infinity);

            function verticalSorter(a, b) {
                if (a.rect.y === b.rect.y) {
                    if (a === updateLayoutItem) {
                        return -1;
                    }
                    if (b === updateLayoutItem) {
                        return 1;
                    }
                }

                return a.rect.y - b.rect.y || a.rect.x - b.rect.x;
            }

            layoutInfo._items.sort(verticalSorter);
            layoutInfo.forEach(function (item) {
                shiftPacker.columnPack(item.rect);
            });

            return layoutInfo;
        } else {
            if ( this._gridster.relayout)
                this._gridster._packer.columnPack(updateLayoutItem.rect);
            else
                this._gridster._packer.pack(updateLayoutItem.rect);

        }
    }
}

export default GridsterLayoutStrategy;