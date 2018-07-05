import Utils from "../../utils"

//判断对象的数据类型
function isClass(o){
    if(o===null) return "Null";
    if(o===undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8,-1);
}

function deepClone(obj){
    let result;
    let oClass=isClass(obj);
    if(oClass==="Object"){
        result={};
    }else if(oClass==="Array"){
        result=[];
    }else{
        return obj;
    }
    for(let key in obj){
        let copy=obj[key];
        if(isClass(copy)==="Object"){
            result[key]=deepClone(copy);//递归调用
        }else if(isClass(copy)==="Array"){
            result[key]=deepClone(copy);
        }else{
            result[key]=obj[key];
        }
    }
    return result;
}
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
            if (item.itemId===itemId){
                result=item;
            }
        });
        return result;
    }

    forEach(fn){
        for (let key in  this._items) {
            let item= this._items[key];
            let result= fn(item);
            if (result){
                break;
            }
        }
    }
    clone(){
        let result= new LayoutInfos();
        result._items=deepClone(this._items);
        return result;
    }


}

export default LayoutInfos;