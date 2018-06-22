import {Subject} from "@reactivex/rxjs/dist/esm2015/internal/Subject"
import LayoutInfos from "./layoutInfos"
import GridsterLayoutStrategy from "./layoutStrategy"

/**
 * 布局信息管理器
 * 布局信息
 * {
 *      updateIds:[]
 *      layoutInfos:{}
 *      size:{}
 * }
 */
class GridsterLayoutManager {
    constructor(gridster) {
        this._gridster=gridster;
        this._layoutInfoSubject=new Subject();
        this._layoutInfos=   new LayoutInfos() ;
        this._layoutStrategy =new GridsterLayoutStrategy( this._gridster,this._layoutInfos);
        this._currentSize={};
    }

    /**
     * 挂起布局计算
     */
    suspend(){
        this._suspend=true;
    }

    /**
     * 恢复布局计算
     */
    resume(){
        this._suspend=false;
        let updateIds=[];
        this._layoutInfos.forEach(function (item) {
            updateIds.push(item.itemId);
            this._layoutStrategy.range(item);
        });
        this._currentSize=this._layoutStrategy.measure(this._currentSize);
        let updateInfo= {
            size:   this._currentSize,
            updateIds: updateIds,
            layoutInfos:this._layoutInfos
        };
        this._layoutInfoSubject.next( updateInfo );
    }

    /**
     * 订阅布局信息的更新
     * @param fn
     */
    subscribe(fn){
        this._layoutInfoSubject.subscribe(fn);
    }

    /**
     * 取消订阅
     * @param fn
     */
    unsubscribe(fn){
        this._layoutInfoSubject.unsubscribe(fn);
    }

    /**
     * 更新布局
     * @param clientMousePostion 当前项的位置客户端位置信息
     * @param layoutItemId 当前布局项ID
     */
    update(layoutItemId,clientInfo){
        let layoutItem=this._layoutInfos.getLayoutItem(layoutItemId);
        this._layoutStrategy.range(layoutItem,clientInfo);
        this._currentSize=this._layoutStrategy.measure( this._currentSize,clientInfo);
        let updateInfo= {
            el:clientInfo.EL,
            size:   this._currentSize,
            updateIds: [layoutItem.itemId],
            layoutInfos:this._layoutInfos
        };
        if (!this._suspend)
            this._layoutInfoSubject.next( updateInfo );
        return layoutItem;
    }

    /**
     * 添加区域信息
     * @param rect {position:{indexX,indexY:},size:{rWdith,rHeight}}
     */
    add(rect,EL,autoLayout){
        let layoutItem=this._layoutInfos.addLayoutItem(rect);
        if (!this._suspend ){
            if (autoLayout)
                this._layoutStrategy.range(layoutItem);
            this._currentSize=this._layoutStrategy.measure( this._currentSize);

            let updateInfo= {
                el:EL,
                size:   this._currentSize,
                updateIds: [layoutItem.itemId],
                layoutInfos:this._layoutInfos
            };
            this._layoutInfoSubject.next( updateInfo );
        }
        return layoutItem;
    }

    getLayoutInfo(){
        return this._layoutInfos;
    }

    remove(){
    }
}

export default GridsterLayoutManager