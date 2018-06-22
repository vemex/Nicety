/***
 * 布局策略类
 */
class GridsterLayoutStrategy {
    constructor(gridster, layoutInfos) {
        this._gridster = gridster;
        this._layoutInfos = layoutInfos;
    }

    /**
     * 评估测量需要的空间大小
     * @param size 原来大小
     * @param clientInfo 拖拽时的客户端信息
     */
    measure(size, clientInfo) {
        if (clientInfo){

        } else {
            let maxWidth = this._gridster._columns;
            let maxHeight = 1;
            this._layoutInfos.forEach(function (item) {
                if ((item.rect.position.indexY + item.rect.size.rHeight) > maxHeight) {
                    maxHeight = item.rect.position.indexY + item.rect.size.rHeight;
                }
            })
            return {
                rWidth: maxWidth,
                rHeight: maxHeight
            };
        }
    }

    /**
     * 对布局信息进行range
     * @param updateLayoutItem 需要range的当前项
     * @param clientInfo 拖拽时的客户端信息
     * {
            EL:evt.mirror,
            mouseOffset:mouseOffset,
            relativeMousePosition:relativeMousePosition,
            originalSourceSize:originalSourceSize,
            displayPosition:displayPosition
        }
     */
    range(updateLayoutItem, clientInfo) {
        if (clientInfo){
            let ranges = this._gridster._ranges;
            let e=ranges.equalWidth;
            let indexX = Math.ceil((clientInfo.displayPosition.x-e) / ranges.equalWidth);
            let indexY = Math.ceil((clientInfo.displayPosition.y-e) / ranges.equalWidth);
            let rw = Math.round(clientInfo.originalSourceSize.width / ranges.equalWidth);
            indexX = (indexX + rw) < ranges.maxWidthIndex ? indexX  : (ranges.maxWidthIndex - (rw - 1));
            indexX = indexX < 0 ? 0 : indexX;
            indexY = indexY < 0 ? 0 : indexY;
            updateLayoutItem.rect.position.indexY=indexY;
            updateLayoutItem.rect.position.indexX=indexX;
            this._layoutInfos.forEach(function (item) {
                if (item.itemId == updateLayoutItem.itemId) {
                    return;
                }
                if ( item.rect.position.indexY== updateLayoutItem.rect.position.indexY) {
                    if ( (updateLayoutItem.rect.position.indexX <= item.rect.position.indexX&&
                        updateLayoutItem.rect.position.indexX+updateLayoutItem.rect.size.rWidth>item.rect.position.indexX)||
                        (updateLayoutItem.rect.position.indexX > item.rect.position.indexX&&
                            updateLayoutItem.rect.position.indexX-updateLayoutItem.rect.size.rWidth<item.rect.position.indexX)) {
                        item.rect.position.indexY+=updateLayoutItem.rect.size.rHeight;
                    }
                }

            })
        } else {
            let x = 0;
            let y = 0;
            let maxY = 1;
            this._layoutInfos.forEach(function (item) {
                if (item.rect.position.indexX < x) {
                    item.rect.position.indexX += x;
                }
                if (item.rect.position.indexY < y) {
                    item.rect.position.indexY += y;
                }
                if (item.rect.size.rHeight > maxY) {
                    maxY = item.rect.size.rHeight;
                }
                x = item.rect.position.indexX + item.rect.size.rWidth;
                if (x > 10) {
                    x = 0;
                    y = maxY;
                }
            })
        }
    }
}

export default GridsterLayoutStrategy;