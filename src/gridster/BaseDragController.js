const BaseDragController= class  BaseDragController {
    constructor(gridster) {
        this._gridster = gridster;
        let _ = this;
        this._gridster._draggable.on('draggable:initialize', function (evt) {

        });
        this._gridster._draggable.on('drag:start', function (evt) {
            let isHandler=_.IsHandler(evt.originalEvent.srcElement);
            _._isHandler=isHandler;
            if(isHandler){
                _.dragStart(evt);
            }
        });
        this._gridster._draggable.on('mirror:create', function (evt) {
            let isHandler=_.IsHandler(evt.originalEvent.srcElement);
            if(isHandler)
                _.mirrorCreate(evt);
        });
        this._gridster._draggable.on('mirror:created', function (evt) {
            let isHandler=_.IsHandler(evt.originalEvent.srcElement);
            if(isHandler)
                _.mirrorCreated(evt);
        });
        this._gridster._draggable.on('drag:move', function (evt) {
            if(  _._isHandler)
                _.dragMove(evt);
        });
        this._gridster._draggable.on('drag:stop', function (evt) {
            if( _._isHandler)
                _.dragEnd(evt);
        });
    }
    IsHandler(srcEL){
        return false;
    }

};
export  default BaseDragController;