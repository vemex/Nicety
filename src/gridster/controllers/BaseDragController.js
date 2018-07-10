

const BaseDragController = class BaseDragController {
    constructor(gridster) {
        this._gridster = gridster;
    }

    IsHandler(srcEL) {
        return false;
    }

};
export default BaseDragController;