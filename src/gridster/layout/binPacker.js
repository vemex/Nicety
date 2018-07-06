import Rect from "./rect";

let sorters = {
    // top down, then left to right
    downwardLeftToRight: function( a, b ) {
        return a.y - b.y || a.x - b.x;
    },
    // left to right, then top down
    rightwardTopToBottom: function( a, b ) {
        return a.x - b.x || a.y - b.y;
    }
};


/**
 * 装箱对象
 * bin-packing 算法
 * @property  spaces 可用空间集合
 * @property  width 初始容器宽度
 * @property  height 初始容器高度
 * @property  sortDirection 排序方向
 *
 */
class Packer{
    /**
     *
     * @param width 容器宽度
     * @param height 容器高度
     * @param sortDirection 排序方向
     */
    constructor(width, height, sortDirection){
        this.width = width || 0;
        this.height = height || 0;
        this.sortDirection = sortDirection || 'downwardLeftToRight';

        this.reset();
    }

    /**
     * 重置,初始化可被装箱的大小和位置信息
     */
    reset() {
        this.spaces = [];

        let initialSpace = new Rect({
            x: 0,
            y: 0,
            width: this.width,
            height: this.height
        });

        this.spaces.push( initialSpace );
        // set sorter
        this.sorter = sorters[ this.sortDirection ] || sorters.downwardLeftToRight;
    }

    /**
     * 装箱,按照固定宽度和高度装箱，如果剩余空间不够则放弃装入
     * @param rect 装入矩形对象
     */
    pack( rect ) {
        for ( let i=0; i < this.spaces.length; i++ ) {
            let space = this.spaces[i];
            if ( space.canFit( rect ) ) {
                this._placeInSpace( rect, space );
                break;
            }
        }
    }

    /**
     * 列装箱，宽度固定，如果高度不够则，延展高度装入
     * @param rect
     */
    columnPack( rect ) {
        for ( let i=0; i < this.spaces.length; i++ ) {
            let space = this.spaces[i];
            let canFitInSpaceColumn = space.x <= rect.x &&
                space.x + space.width >= rect.x + rect.width &&
                space.height >= rect.height; // fudge number for rounding error
            if ( canFitInSpaceColumn ) {
                rect.y = space.y;
                this._placed( rect );
                break;
            }
        }
    }

    /**
     * 行装箱，高度固定，如果宽度不够则延展宽度装入
     * @param rect
     */
    rowPack( rect ) {
        for ( let i=0; i < this.spaces.length; i++ ) {
            let space = this.spaces[i];
            let canFitInSpaceRow = space.y <= rect.y &&
                space.y + space.height >= rect.y + rect.height &&
                space.width >= rect.width - 0.01; // fudge number for rounding error
            if ( canFitInSpaceRow ) {
                rect.x = space.x;
                this._placed( rect );
                break;
            }
        }
    }

    /**
     *
     * @param rect
     * @param space
     */
    _placeInSpace(rect, space ) {
        // place rect in space
        rect.x = space.x;
        rect.y = space.y;

        this._placed( rect );
    }

    _placed(rect ) {
        // update spaces
        let revisedSpaces = [];
        for ( let i=0; i < this.spaces.length; i++ ) {
            let space = this.spaces[i];
            let newSpaces = space.getMaximalFreeRects( rect );
            // add either the original space or the new spaces to the revised spaces
            if ( newSpaces ) {
                revisedSpaces.push.apply( revisedSpaces, newSpaces );
            } else {
                revisedSpaces.push( space );
            }
        }

        this.spaces = revisedSpaces;

        this._mergeSortSpaces();
    }

    /**
     * 消除合并空间
     */
    _mergeSortSpaces () {
        // remove redundant spaces
        Packer.mergeRects( this.spaces );
        this.spaces.sort( this.sorter );
    }

    /**
     * 增加空间
     * @param rect
     */
    addSpace( rect ) {
        this.spaces.push( rect );
        this._mergeSortSpaces();
    }
}
/**
 * 合并矩形(移除相互包含的矩形)
 * @param rects
 * @returns {*}
 */
Packer.mergeRects = function( rects ) {
    let i = 0;
    let rect = rects[i];

    rectLoop:
        while ( rect ) {
            let j = 0;
            let compareRect = rects[ i + j ];

            while ( compareRect ) {
                if  ( compareRect === rect ) {
                    j++; // next
                } else if ( compareRect.contains( rect ) ) {
                    // remove rect
                    rects.splice( i, 1 );
                    rect = rects[i]; // set next rect
                    continue rectLoop; // bail on compareLoop
                } else if ( rect.contains( compareRect ) ) {
                    // remove compareRect
                    rects.splice( i + j, 1 );
                } else {
                    j++;
                }
                compareRect = rects[ i + j ]; // set next compareRect
            }
            i++;
            rect = rects[i];
        }

    return rects;
};
export default Packer;