import {DomUtils} from "./Utils";

let applyDraggableLayoutInfo = function (info) {
    let itemId = info.updateIds[0];
    let layoutItem = info.layoutInfos.getLayoutItem(itemId);
    let e = this._gridster._ranges.equalWidth;

    let position = {
        x: e * layoutItem.rect.position.indexX,
        y: e * layoutItem.rect.position.indexY
    };
    let size = {
        width: e * layoutItem.rect.size.rWidth,
        height: e * layoutItem.rect.size.rHeight
    };
    DomUtils.setSize(info.el,size);
    DomUtils.setPosition(info.el, position);
    this._gridster._moveController._mirrorPosition = position;
    this._gridster._resizeControl._mirrorSize = size;

    //更新所有布局位置信息
    info.layoutInfos.forEach(function (item) {
        if (item.itemId=== itemId){
            return
        }
        let postion1 = {
            x: e * item.rect.position.indexX,
            y: e * item.rect.position.indexY
        };
        let size1 = {
            width: e * item.rect.size.rWidth,
            height: e * item.rect.size.rHeight
        };
        let el=$(`li.gs-window-wrapper[item-id=${item.itemId}]`)[0];
        DomUtils.setSize(el,size1);
        DomUtils.setPosition(el, postion1);
    });
    this._gridster._container.style.height = info.size.rHeight * e + 'px';
};

const BaseDragController = class BaseDragController {
    constructor(gridster) {
        this._gridster = gridster;
        let _ = this;
        gridster._layoutManager.subscribe(function (infos) {
            if (_._gridster._onDragging) {//当处于拖拽状态时财之用
                applyDraggableLayoutInfo.call(_, infos);
            }
        });
        this._gridster._draggable.on('drag:start', function (evt) {
            _._gridster._onDragging = true;
            let isHandler = _.IsHandler(evt.originalEvent.srcElement);
            _._isHandler = isHandler;
            if (isHandler) {
                _.dragStart(evt);
            }
        });
        this._gridster._draggable.on('mirror:create', function (evt) {
            _._gridster._onDragging = true;
            let isHandler = _.IsHandler(evt.originalEvent.srcElement);
            if (isHandler)
                _.mirrorCreate(evt);
        });
        this._gridster._draggable.on('mirror:created', function (evt) {
            _._gridster._onDragging = true;
            let isHandler = _.IsHandler(evt.originalEvent.srcElement);
            if (isHandler)
                _.mirrorCreated(evt);
        });
        this._gridster._draggable.on('drag:move', function (evt) {
            _._gridster._onDragging = true;
            if (_._isHandler)
                _.dragMove(evt);
        });
        this._gridster._draggable.on('drag:stop', function (evt) {
            if (_._isHandler){
                _._gridster._layoutManager.apply();
                _.dragEnd(evt);
            }

            _._gridster._onDragging = false;
        });
    }

    IsHandler(srcEL) {
        return false;
    }

};
export default BaseDragController;