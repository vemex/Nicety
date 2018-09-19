import Utils from "../../utils"
import Rect from "./rect"

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
 *  布局信息模型
 * [
 *      {
 *          itemId:xxxx
 *          rect:{
 *              x:
 *              y:
 *              width:
 *              height:
 *          }
 *
 *      }
 * ]
 */
class LayoutInfo {
    constructor(){
        this._items=[];
    }

    addLayoutItem(rect){
        let layoutItem={
            itemId:Utils.uID(),
            rect:new Rect(rect)
        };
        this._items.push(layoutItem);
        return layoutItem;
    }

    removeLayoutIem(layoutItemId){
        let index =null;
        for (let key in this._items) {
            if (this._items[key].itemId === layoutItemId) {
                index=key;
                break;
            }
        }
        this._items.splice(index,1);
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
        let result= new LayoutInfo();
        result._items=deepClone(this._items);
        return result;
    }


}

export default LayoutInfo;