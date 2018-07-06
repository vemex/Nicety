import {Subject} from "@reactivex/rxjs/dist/esm2015/internal/Subject"
import LayoutInfo from "./LayoutInfo"
import GridsterLayoutStrategy from "./layoutPackingStrategy"
import Packer from "./binPacker";

/**
 * 布局信息管理器
 * 布局信息
 * {
 *      updateIds:[]
 *      layoutInfo:{}
 *      size:{}
 * }
 */
class GridsterLayoutManager {
    constructor(gridster) {
        this._gridster=gridster;
        this._layoutInfoSubject=new Subject();
        this._layoutInfo= new LayoutInfo() ;
        this._currentSize={};
        this._gridster._packer=new Packer( this._gridster._columns,Infinity);
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
        let layoutStrategy =new GridsterLayoutStrategy( this._gridster,this._layoutInfo);

        this._layoutInfo.forEach(function (item) {
            updateIds.push(item.itemId);
            layoutStrategy.range(item);
        });
        this._currentSize=layoutStrategy.measure(this._currentSize);
        let updateInfo= {
            size:   this._currentSize,
            updateIds: updateIds,
            layoutInfo:this._layoutInfo
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

    apply(){
        if ( this._tempLayoutInfos){
            this._layoutInfo=this._tempLayoutInfos.clone();
        }
    }

    /**
     * 更新布局
     * @param clientMousePostion 当前项的位置客户端位置信息
     * @param layoutItemId 当前布局项ID
     */
    update(layoutItemId,clientInfo){
        let layoutItem=this._layoutInfo.getLayoutItem(layoutItemId);
        let layoutStrategy =new GridsterLayoutStrategy( this._gridster,this._layoutInfo);
        let newLayoutInfo= layoutStrategy.range(layoutItem,clientInfo);
        this._currentSize= layoutStrategy.measure( this._currentSize,clientInfo,newLayoutInfo?newLayoutInfo: this._layoutInfo);
        let updateInfo= {
            el:clientInfo.EL,
            size:   this._currentSize,
            updateIds: [layoutItem.itemId],
            layoutInfo:newLayoutInfo?newLayoutInfo: this._layoutInfo
        };
        if (!this._suspend)
            this._layoutInfoSubject.next( updateInfo );
        if (newLayoutInfo){
            this._tempLayoutInfos=newLayoutInfo;
        }
        layoutItem=newLayoutInfo.getLayoutItem(layoutItemId);
        return layoutItem;
    }

    /**
     * 添加区域信息
     * @param rect {x,y:wdith:height}
     */
    add(rect,EL,autoLayout){
        let layoutItem=this._layoutInfo.addLayoutItem(rect);
        let layoutStrategy =new GridsterLayoutStrategy( this._gridster,this._layoutInfo);
        if (!this._suspend ){
            if (autoLayout)
                layoutStrategy.range(layoutItem);
            this._currentSize=layoutStrategy.measure( this._currentSize);

            let updateInfo= {
                el:EL,
                size:   this._currentSize,
                updateIds: [layoutItem.itemId],
                layoutInfo:this._layoutInfo
            };
            this._layoutInfoSubject.next( updateInfo );
        }
        return layoutItem;
    }

    getLayoutInfo(){
        return this._layoutInfo;
    }

    remove(){
    }
}

export default GridsterLayoutManager