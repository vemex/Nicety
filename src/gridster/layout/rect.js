
const defaults = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
};
/**
 * 矩形对象
 */
class Rect {
    constructor(props) {
        for ( let prop in defaults ) {
            this[ prop ] = defaults[ prop ];
        }

        for ( let prop in props ) {
            this[ prop ] = props[ prop ];
        }
    }

    /**
     * 判断当前矩形是否包含测试矩形
     * @param rect 测试矩形
     * @returns {boolean}
     */
    contains( rect ) {
        // points don't have width or height
        let otherWidth = rect.width || 0;
        let otherHeight = rect.height || 0;
        return this.x <= rect.x &&
            this.y <= rect.y &&
            this.x + this.width >= rect.x + otherWidth &&
            this.y + this.height >= rect.y + otherHeight;
    }

    /**
     * 判断当前矩形是否与测试矩形有重叠（碰撞测试）
     * @param rect 测试矩形
     * @returns {boolean}
     */
    overlaps( rect ) {
        let thisRight = this.x + this.width;
        let thisBottom = this.y + this.height;
        let rectRight = rect.x + rect.width;
        let rectBottom = rect.y + rect.height;

        // http://stackoverflow.com/a/306332
        return this.x < rectRight &&
            thisRight > rect.x &&
            this.y < rectBottom &&
            thisBottom > rect.y;
    }

    /**
     * 获取当前矩形和测试矩形直接空白区域
     * @param rect 测试矩形
     * @returns {*}
     */
    getMaximalFreeRects ( rect ) {

        // if no intersection, return false
        if ( !this.overlaps( rect ) ) {
            return false;
        }

        let freeRects = [];
        let freeRect;

        let thisRight = this.x + this.width;
        let thisBottom = this.y + this.height;
        let rectRight = rect.x + rect.width;
        let rectBottom = rect.y + rect.height;

        // top
        if ( this.y < rect.y ) {
            freeRect = new Rect({
                x: this.x,
                y: this.y,
                width: this.width,
                height: rect.y - this.y
            });
            freeRects.push( freeRect );
        }

        // right
        if ( thisRight > rectRight ) {
            freeRect = new Rect({
                x: rectRight,
                y: this.y,
                width: thisRight - rectRight,
                height: this.height
            });
            freeRects.push( freeRect );
        }

        // bottom
        if ( thisBottom > rectBottom ) {
            freeRect = new Rect({
                x: this.x,
                y: rectBottom,
                width: this.width,
                height: thisBottom - rectBottom
            });
            freeRects.push( freeRect );
        }

        // left
        if ( this.x < rect.x ) {
            freeRect = new Rect({
                x: this.x,
                y: this.y,
                width: rect.x - this.x,
                height: this.height
            });
            freeRects.push( freeRect );
        }

        return freeRects;
    }

    /**
     * 当前矩形块与测试测试矩形块在大小上是否可以包含
     * @param rect
     * @returns {boolean}
     */
    canFit( rect ) {
        return this.width >= rect.width && this.height >= rect.height;
    }
}

export default  Rect;
