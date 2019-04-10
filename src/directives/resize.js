import {addResizeListener, removeResizeListener} from "../utils/resize-event";

export default {
    inserted(el, binding, vnode) {
        const callback = binding.value;
        addResizeListener(el, callback);
    },
    unbind(el, binding, vnode) {
        const callback = binding.value;
        removeResizeListener(el, callback)
    }
};
