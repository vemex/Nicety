import Utils from "../../utils"


/**
 *  model
 * [
 *      {
 *          itemId:xxxx
 *          rect:{
 *              position:{indexX:,indexY:}//单位制
 *              size:{rWidth:,rHeight:}//单位制
 *          }
 *
 *      }
 * ]
 */
class LayoutInfos {
    constructor(){
        this._items=[];
    }

    addLayoutItem(rect){
        let layoutItem={
            itemId:Utils.uID(),
            rect:rect
        };
        this._items.push(layoutItem);
        return layoutItem;
    }

    getLayoutItem(itemId){
        let result=undefined;
        this.forEach(function (item) {
            if (item.itemId==itemId){
                result=item;
            }
        })
        return result;
    }

    forEach(fn){
        for (let key in  this._items) {
            let item= this._items[key];
            fn(item);
        }
    }
}

export default LayoutInfos;