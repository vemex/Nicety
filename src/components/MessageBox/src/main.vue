<template>
    <transition name="msgbox-fade">
        <div class="nicety-message-box__wrapper"
             role="dialog"
             v-show="visible">
            <div class="nicety-message-box">
                <div class="nicety-message-box__header">
                    <h5 class="nicety-message-box__title">{{title}}</h5>
                    <button type="button"
                            data-dismiss="modal"
                            aria-label="Close"
                            v-if="showClose"
                            @click="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
                            class="close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="nicety-message-box__content">{{message}}</div>
                <div class="nicety-message-box__btns">
                    <button type="button"
                            data-role="alert"
                            v-if="showCancelButton"
                            :loading="cancelButtonLoading"
                            @click="handleAction('cancel')"
                            @keydown.enter="handleAction('cancel')"
                            class="alert-cancel">取消</button>
                    <button type="button" data-role="alert" ref="confirm"
                            :loading="confirmButtonLoading"
                            v-show="showConfirmButton"
                            @click="handleAction('confirm')"
                            @keydown.enter="handleAction('confirm')"
                            class="alert-confirm">确认</button>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import Popup from '../../../utils/popup';
import Dialog from '../../../utils/aria-dialog';

let messageBox;
export default {
    name: 'NicetyMessageBox',
    mixins: [Popup],
    props: {
        modal: {
            default: true
        },
        showClose: {
            type: Boolean,
            default: true
        },
        lockScroll: {
            default: true
        },
        modalClass: {
            type: String,
            default: 'modal-backdrop fade show'
        }
    },
    methods: {
        handleAction (action) {
            if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
                return;
            }
            this.action = action;
            if (typeof this.beforeClose === 'function') {
                this.close = this.getSafeClose();
                this.beforeClose(action, this, this.close);
            } else {
                this.doClose();
            }
        },
        doClose () {
            if (!this.visible) return;
            this.visible = false;
            this._closing = true;
            this.onClose && this.onClose();
            messageBox.closeDialog(); // 解绑
            if (this.lockScroll) {
                setTimeout(this.restoreBodyStyle, 200);
            }
            this.opened = false;
            this.doAfterClose();
            setTimeout(() => {
                if (this.action) this.callback(this.action, this);
            });
        },
        getFirstFocus () {
            const btn = this.$el.querySelector('.el-message-box__btns .el-button');
            const title = this.$el.querySelector('.el-message-box__btns .el-message-box__title');
            return btn || title;
        }
    },
    watch: {
        visible (val) {
            if (val) {
                this.uid++;
                if (this.$type === 'alert' || this.$type === 'confirm') {
                    this.$nextTick(() => {
                        this.$refs.confirm.focus();
                    });
                }
                this.focusAfterClosed = document.activeElement;
                messageBox = new Dialog(this.$el, this.focusAfterClosed, this.getFirstFocus());
            }
        }
    },
    data: function () {
        return {

            uid: 1,
            title: undefined,
            message: '',
            type: '',
            iconClass: '',
            customClass: '',
            showInput: false,
            inputValue: null,
            inputPlaceholder: '',
            inputType: 'text',
            inputPattern: null,
            inputValidator: null,
            inputErrorMessage: '',
            showConfirmButton: true,
            showCancelButton: false,
            action: '',
            confirmButtonText: '',
            cancelButtonText: '',
            confirmButtonLoading: false,
            cancelButtonLoading: false,
            confirmButtonClass: '',
            confirmButtonDisabled: false,
            cancelButtonClass: '',
            editorErrorMessage: null,
            callback: null,
            dangerouslyUseHTMLString: false,
            focusAfterClosed: null,
            isOnComposition: false,
            distinguishCancelAndClose: false

        };
    }
};
</script>
