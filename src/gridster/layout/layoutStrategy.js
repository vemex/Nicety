/**
 * 矩形块的碰撞测试
 * @param rect1
 * @param rect2
 * @returns {boolean}
 */
let hitRectTest = function (rect1, rect2) {
    let t1 = rect1.position.indexY;
    let l1 = rect1.position.indexX;
    let r1 = rect1.position.indexX + rect1.size.rWidth;
    let b1 = rect1.position.indexY + rect1.size.rHeight;

    let t2 = rect2.position.indexY;
    let l2 = rect2.position.indexX;
    let r2 = rect2.position.indexX + rect2.size.rWidth;
    let b2 = rect2.position.indexY + rect2.size.rHeight;
    return !(b1 <= t2 || l1 >= r2 || t1 >= b2 || r1 <= l2);
};

/**
 * 检测两个layoutItem直接垂直方向是否有重叠
 * @param rect1
 * @param rect2
 * @returns {boolean}
 */
let checkVerticalOverlap = function (rect1, rect2) {
    let a = {
        x1: rect1.position.indexX,
        x2: rect1.position.indexX + rect1.size.rWidth
    };
    let b = {
        x1: rect2.position.indexX,
        x2: rect2.position.indexX + rect2.size.rWidth
    };
    return !(a.x2 <= b.x1 || a.x1 >= b.x2);
};

/**
 * 判断两个矩形是否一致，位置和大小
 * @param rect1
 * @param rect2
 * @returns {boolean}
 */
let equalRect = (rect1, rect2) => {
    return rect1.position.indexX === rect2.position.indexX &&
        rect1.position.indexY === rect2.position.indexY &&
        rect1.size.rWidth === rect2.size.rWidth &&
        rect1.size.rHeight === rect2.size.rHeight;
};

/**
 * 计算推荐的矩形位置
 */
let calculateAdjustRect = function (clientInfo, ranges) {
    let offsetX = ranges.equalWidth * 0.8;
    let offsetY = ranges.equalWidth * 0.2;
    let indexX = Math.floor((clientInfo.displayPosition.x + offsetX) / ranges.equalWidth);
    let indexY = Math.floor((clientInfo.displayPosition.y + offsetY) / ranges.equalWidth);
    let rW = Math.ceil(clientInfo.originalSourceSize.width / ranges.equalWidth);
    let rH = Math.ceil(clientInfo.originalSourceSize.height / ranges.equalWidth);

    indexX = (indexX + rW) <= ranges.maxWidthIndex ? indexX : (ranges.maxWidthIndex + 1 - (rW));

    indexX = indexX < 0 ? 0 : indexX;
    indexY = indexY < 0 ? 0 : indexY;

    return {
        position: {
            indexX: indexX,
            indexY: indexY
        },
        size: {
            rWidth: rW,
            rHeight: rH
        }
    };
};


let calculateMaxIndexY = function (layoutInfos, updateLayoutItem) {
    let maxIndexY = 0;
    layoutInfos.forEach(function (item) {
        if (item.itemId === updateLayoutItem.itemId) {
            return false;
        }
        if (item.rect.position.indexY < updateLayoutItem.rect.position.indexY) {
            if (checkVerticalOverlap(item.rect, updateLayoutItem.rect)) {
                if (maxIndexY < (item.rect.position.indexY + item.rect.size.rHeight)) {
                    maxIndexY = item.rect.position.indexY + item.rect.size.rHeight;
                }
            }
        }
    });
    return maxIndexY;
};

// 查找数组中最小值
let arrayMin = function (arrs) {
    let min = arrs[0];
    for (let i = 1, ilen = arrs.length; i < ilen; i += 1) {
        if (arrs[i] < min) {
            min = arrs[i];
        }
    }
    return min;
};
/***
 * 计算位于当前移动块下的块的偏移量
 * @param layoutInfos
 * @param updateLayoutItem
 * @param maxSetIndexY
 * @returns {{offsetIndexY: number, maxIndexY: *}}
 */
let calculateOffsetIndexY = function (layoutInfos, updateLayoutItem, maxSetIndexY) {
    let minDownIndexY = maxSetIndexY;
    // let maxDownItem = 0;
    // let offsetIndexY = 0;
    let indexYArrary = [];
    layoutInfos.forEach(function (item) {
        if (item.itemId === updateLayoutItem.itemId) {
            return false;
        }
        if (item.rect.position.indexY >= updateLayoutItem.rect.position.indexY) {
            if (checkVerticalOverlap(item.rect, updateLayoutItem.rect)) {
                indexYArrary.push(item.rect.position.indexY);
            }
        }
    });
    if (indexYArrary.length > 0) {
        minDownIndexY = arrayMin(indexYArrary);
    }
    return {
        offsetIndexY: updateLayoutItem.rect.size.rHeight - (minDownIndexY - maxSetIndexY),
        maxIndexY: minDownIndexY
    };
};

let findUpRect = function (layoutInfos, layoutItem) {
    let findItems = [];
    layoutInfos.forEach(function (item) {
        if (item.itemId === layoutItem.itemId) {
            return false;
        }
        if (item.rect.position.indexY + item.rect.size.rHeight === layoutItem.rect.position.indexY) {
            if (checkVerticalOverlap(item.rect, layoutItem.rect)) {
                findItems.push(item);
            }
        }
    });
    return findItems.length > 0;
};

/**
 * 计算竖向关联投影重叠块（以当前块的水平宽度为基准）
 * @param layoutInfos 布局信息
 * @param layoutItem 当前计算参照项
 * @param conditionCallBack 额外条件项
 */
let calculateVerticalRelateShadowOverlayRect=function (layoutInfos,layoutItem,conditionCallBack) {
    let findItems=[];
    layoutInfos.forEach(function (item) {
        if (item.itemId === layoutItem.itemId) {
            return false;
        }
        if(item.rect.position.indexY===layoutItem.rect.position.indexY+layoutItem.rect.size.rHeight) {
            if (checkVerticalOverlap(item.rect, layoutItem.rect)) {
                if (conditionCallBack===undefined || conditionCallBack(layoutInfos, item, layoutItem)) {
                    findItems.push(item);
                }
            }
        }
    });
    let result = [];
    for (let key in findItems) {
        let item = findItems[key];
        let temp = calculateVerticalRelateShadowOverlayRect( layoutInfos, item,conditionCallBack);
        result = result.concat(temp);
    }
    result = result.concat(findItems);
    return result;
};


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
    measure(size, clientInfo, copyLayoutInfo) {
        let layoutInfos = copyLayoutInfo ? copyLayoutInfo : this._layoutInfos;
        let maxWidth = this._gridster._columns;
        let maxHeight = 1;
        layoutInfos.forEach(function (item) {
            if ((item.rect.position.indexY + item.rect.size.rHeight) > maxHeight) {
                maxHeight = item.rect.position.indexY + item.rect.size.rHeight;
            }
        });
        return {
            rWidth: maxWidth,
            rHeight: maxHeight
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
            //更新布局信息
            let layoutInfos = this._layoutInfos.clone();
            updateLayoutItem = layoutInfos.getLayoutItem(updateLayoutItem.itemId);
            let ranges = this._gridster._ranges;
            let e = ranges.equalWidth;
            //根据当前客户端的位置信息获取建议位置
            let adjustRect = calculateAdjustRect(clientInfo, ranges);


            //如果建议位置与当前位置信息相等则直接返回
            if (equalRect(updateLayoutItem.rect, adjustRect)) {
                return layoutInfos;
            }
            //更新位置信息
            let newUpdateLayoutItem = {
                itemId: updateLayoutItem.itemId,
                rect: adjustRect
            };
            //计算Y方向最大值
            let maxSetIndexY = calculateMaxIndexY(layoutInfos, newUpdateLayoutItem);

            let offset = calculateOffsetIndexY(layoutInfos, newUpdateLayoutItem, maxSetIndexY);

            //更新原来位置信息
            let cacheUpdateItems=[updateLayoutItem];
            let origionUpdateItems =  calculateVerticalRelateShadowOverlayRect(layoutInfos,updateLayoutItem,function (_layoutInfos, _layoutItem1, _layoutItem2) {
                let result=  !checkVerticalOverlap(_layoutItem1.rect,adjustRect) ;//&& !findUpRect(layoutInfos, _layoutItem1);
                return result;
            });
            console.log("origion");
            console.log(origionUpdateItems);


            //查找建议位置产生碰撞的布局项
            let hitLayoutItems=[];
            layoutInfos.forEach(function (item) {
                if (item.itemId === updateLayoutItem.itemId) {
                    return false;
                }
                if(item.rect.position.indexY===adjustRect.position.indexY) {
                   if( checkVerticalOverlap(item.rect,adjustRect)){
                       hitLayoutItems.push(item);
                   }
                }
            });
            adjustRect.position.indexY = maxSetIndexY;
            updateLayoutItem.rect = adjustRect;
            let updateItems=[];
            //如果碰撞布局想不为空，则以当前布局项为基准查找垂直方向上的布局项
            for (let key in hitLayoutItems){
                let item =hitLayoutItems[key];
                updateItems=  updateItems.concat(calculateVerticalRelateShadowOverlayRect(layoutInfos, item)) ;
                //updateItems=updateItems.concat([hitLayoutItem]);
            }
            updateItems=updateItems.concat(hitLayoutItems);
            console.log("update");
            console.log(updateItems);

            //更新位置信息
            //let updateItems = calculateUpdateItems(this._gridster, layoutInfos, newUpdateLayoutItem, newUpdateLayoutItem.rect.position.indexY, [newUpdateLayoutItem]);
            console.log("update:"+offset.offsetIndexY);
            // console.log(updateItems);
            for (let key in updateItems) {
                let item = updateItems[key];
                item.rect.position.indexY += offset.offsetIndexY;
            }
            //
            for (let key in origionUpdateItems) {
                let item = origionUpdateItems[key];
                let  isFind=false;
                for (let key1 in updateItems){
                    let item1= updateItems[key1];
                    if(item1.itemId===item.itemId){
                        isFind=true;
                        break;
                    }
                }
                console.log("dddd:"+isFind);

                if (!isFind){//发现重叠部分不做任何更新
                    item.rect.position.indexY -= newUpdateLayoutItem.rect.size.rHeight;
                }
            }
            return layoutInfos;
        }

    }
}

export default GridsterLayoutStrategy;