import {DomUtils} from "../Utils";


let applyDraggableLayoutInfo = function (info) {
    let itemId = info.updateIds[0];
    let layoutItem = info.layoutInfo.getLayoutItem(itemId);
    if (!layoutItem) {
        return;
    }
    let e = this._gridster._getDividedLength();

    let position = {
        x: e * layoutItem.rect.x,
        y: e * layoutItem.rect.y
    };
    let size = {
        width: e * layoutItem.rect.width,
        height: e * layoutItem.rect.height
    };
    if (info.el) {
        DomUtils.setSize(info.el, size);
        DomUtils.setPosition(info.el, position);
    }

    for (let key in this.registControllers){
        let controller=this.registControllers[key];
        controller._mirrorPosition = position;
        controller._mirrorSize = size;
    }

    //更新所有布局位置信息
    info.layoutInfo.forEach(function (item) {
        if (item.itemId=== itemId && info.el){
            return
        }
        let postion1 = {
            x: e * item.rect.x,
            y: e * item.rect.y
        };
        let size1 = {
            width: e * item.rect.width,
            height: e * item.rect.height
        };
        let el=$(`li.gs-window-wrapper[item-id=${item.itemId}]`)[0];
        DomUtils.setSize(el,size1);
        DomUtils.setPosition(el, postion1);
    });
    this._gridster._container.style.height = info.size.height * e + 'px';
};

class ControllerManager {
    constructor(gridster){
        this._gridster=gridster;
        let _=this;
        gridster._layoutManager.subscribe(function (infos) {
            if (gridster._onDragging) {//当处于拖拽状态时财之用
                applyDraggableLayoutInfo.call(_, infos);
            }
        });

        gridster._draggable.on('drag:start', function (evt) {
            gridster._onDragging = true;
           _._handerEvents(evt,controller=>  controller.dragStart(evt));

        });
        gridster._draggable.on('mirror:create', function (evt) {
            gridster._onDragging = true;
            _._handerEvents(evt,controller=>  controller.mirrorCreate(evt));
        });
        gridster._draggable.on('mirror:created', function (evt) {
            gridster._onDragging = true;
            _._handerEvents(evt,controller=>  controller.mirrorCreated(evt));
        });
        gridster._draggable.on('drag:move', function (evt) {
            gridster._onDragging = true;
            _._handerEvents(evt,controller=>  controller.dragMove(evt));
        });
        gridster._draggable.on('drag:stop', function (evt) {
            if (_._isHandler){
                gridster._layoutManager.apply();
                for (let key in _.registControllers){
                    let controller=_.registControllers[key];
                    if (controller._isHandler) {
                        controller.dragEnd(evt);
                        delete controller._isHandler;
                    }
                }
                delete _._isHandler;
            }
            gridster._onDragging = false;
        });
        this.registControllers=[];
    }

    regist(controller){
        this.registControllers.push(controller);
    }

    _handerEvents(evt,fun){
        for (let key in this.registControllers) {
            let controller=this.registControllers[key];
            let isHandler = controller._isHandler||controller.IsHandler((evt.data.sensorEvent.data.originalEvent||evt.originalEvent).srcElement);
            if (isHandler) {
                fun(controller);
                controller._isHandler=true;
                this._isHandler=true;
                return;
            }
        }
        evt.cancel();
    }
}

export default ControllerManager