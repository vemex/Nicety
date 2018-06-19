const BaseDragController= class  BaseDragController {
    constructor(gridster) {
        this._gridster = gridster;
        let _ = this;
        this._gridster._draggable.on('drag:start', function (evt) {
            _._isHandler=_.IsHandler(evt.originalEvent.srcElement);
            if(_._isHandler){
                _.dragStart(evt);
            }

        });
        this._gridster._draggable.on('mirror:create', function (evt) {
            if(_._isHandler)
                _.mirrorCreate(evt);
        });
        this._gridster._draggable.on('mirror:created', function (evt) {
            if(_._isHandler)
                _.mirrorCreated(evt);
        });
        this._gridster._draggable.on('drag:move', function (evt) {
            if(_._isHandler)
                _.dragMove(evt);
        });
        this._gridster._draggable.on('drag:stop', function (evt) {
            if(_._isHandler)
                _.dragEnd(evt);
        });
    }
    IsHandler(srcEL){
        return false;
    }

};
export  default BaseDragController;