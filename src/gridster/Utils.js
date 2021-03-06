const DomUtils = {
    newNode: function (htmlStr) {
        return $(htmlStr)[0];
    },
    getElement: function (selector) {
        return $(selector)[0];
    },
    appendTo: function (el, parentEl) {
        $(el).appendTo(parentEl);
        return el;
    },
    getNumber: function (val) {
        let result = val == "" || val == "auto" ? 0 : Number.parseInt(val.substr(0, val.length - 2));
        if (isNaN(result)) {
            throw  new Error("error val")
        }
        return result;
    },
    setPosition: function (el, newPosition) {
        if (DomUtils.getNumber(el.style.top) !== newPosition.y ||
            DomUtils.getNumber(el.style.left) !== newPosition.x) {
            el.style.top = newPosition.y + "px";
            el.style.left = newPosition.x + "px";
        }

    },
    setSize: function (el, size) {
        if (DomUtils.getNumber(el.style.width) !== size.width ||
            DomUtils.getNumber(el.style.height) !== size.height) {
            el.style.width = size.width + "px";
            el.style.height = size.height + "px";
        }
    },
    hasClass: function (el, className) {
        if (typeof className === 'string') {
            return el.classList.contains(className);
        } else {
            let result = true;
            for (let i in className) {
                result &= el.classList.contains(className[i])
            }
            return result;
        }
    },
    findParent: function (el, tag) {

        let result;
        if (tag.substr(0, 1) === ".") {
            if (el.classList.contains(tag.substr(1))) {
                result = el.parentElement;
            }
        } else {
            if (el.tagName.toLowerCase() == tag) {
                result = el.parentElement;
            }
        }
        if (result == undefined)
            result = DomUtils.findParent(el.parentElement, tag);
        return result;
    },

};


const Helper = {
    /**
     * 初始化区域Grid
     * @param el 区域元素
     * @param gridNumber 每行均分数量
     * @returns {{equalWidth: number, ranges: Array}}
     */
    initGridRanges: function (el, gridNumber) {
        let rect = el.getBoundingClientRect();
        let equalWidth = rect.width / gridNumber;
        let ranges = [];
        let indexW = 0;
        let indexH = 0;
        let maxWidthIndex = 0;
        let maxHeightIndex = 0;
        if (rect.height <= 0) {
            el.style.height = equalWidth + "px";
            return Helper.initGridRanges(el, gridNumber);
        }
        while (indexH <= (Math.ceil (rect.height / equalWidth) - 1)) {
            let position = {
                x: indexW * equalWidth,
                y: indexH * equalWidth
            };
            ranges.push({
                index: {
                    x: indexW,
                    y: indexH
                },
                position: position,
                size: {
                    width: equalWidth,
                    height: equalWidth
                }
            });
            if (position.x + equalWidth >= rect.width) {
                maxWidthIndex = maxWidthIndex<indexW?indexW:maxWidthIndex;
                indexW = 0;
                indexH++;
            } else {
                indexW++;
            }
        }
        maxHeightIndex = indexH;
        return {
            maxHeightIndex: maxHeightIndex,
            maxWidthIndex: maxWidthIndex,
            equalWidth: equalWidth,
            ranges: ranges
        };
    }
};

const Constant = {
    ColumnCount: 12
};
export {DomUtils, Helper, Constant} ;

