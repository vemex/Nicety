<template>
    <transition
            name="dialog-fade"
            @after-enter="afterEnter"
            @after-leave="afterLeave">
        <div class="modal show" tabindex="-1" v-show="visible" @click.self="handleWrapperClick" role="dialog"
             ref="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <slot name="title">
                            <h5 class="modal-title">{{ title }}</h5>
                        </slot>
                        <button type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                v-if="showClose"
                                @click="handleClose">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <slot></slot>
                    </div>
                    <div class="modal-footer" v-if="$slots.footer">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Popup from '../../../utils/popup';
import Migrating from '../../../mixins/migrating';
import emitter from '../../../mixins/emitter';

export default {
    name: 'NicetyDialog',

    mixins: [Popup, emitter, Migrating],

    props: {
        title: {
            type: String,
            default: ''
        },

        modal: {
            type: Boolean,
            default: true
        },

        modalAppendToBody: {
            type: Boolean,
            default: true
        },

        appendToBody: {
            type: Boolean,
            default: false
        },

        lockScroll: {
            type: Boolean,
            default: true
        },
        modalClass: {
            type: String,
            default: 'modal-backdrop fade show'
        },
        closeOnClickModal: {
            type: Boolean,
            default: true
        },

        closeOnPressEscape: {
            type: Boolean,
            default: true
        },

        showClose: {
            type: Boolean,
            default: true
        },

        width: String,

        fullscreen: Boolean,

        customClass: {
            type: String,
            default: 'modal-backdrop fade show'
        },

        top: {
            type: String,
            default: '15vh'
        },
        beforeClose: Function,
        center: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            closed: false
        };
    },

    watch: {
        visible (val) {
            if (val) {
                this.closed = false;
                this.$emit('open');
                this.$el.addEventListener('scroll', this.updatePopper);
                this.$nextTick(() => {
                    this.$refs.dialog.scrollTop = 0;
                });
                if (this.appendToBody) {
                    document.body.appendChild(this.$el);
                }
            } else {
                this.$el.removeEventListener('scroll', this.updatePopper);
                if (!this.closed) this.$emit('close');
            }
        }
    },

    computed: {
        style () {
            let style = {};
            if (!this.fullscreen) {
                style.marginTop = this.top;
                if (this.width) {
                    style.width = this.width;
                }
            }
            return style;
        }
    },

    methods: {
        getMigratingConfig () {
            return {
                props: {
                    'size': 'size is removed.'
                }
            };
        },
        handleWrapperClick () {
            if (!this.closeOnClickModal) return;
            this.handleClose();
        },
        handleClose () {
            if (typeof this.beforeClose === 'function') {
                this.beforeClose(this.hide);
            } else {
                this.hide();
            }
        },
        hide (cancel) {
            if (cancel !== false) {
                this.$emit('update:visible', false);
                this.$emit('close');
                this.closed = true;
            }
        },
        updatePopper () {
            this.broadcast('ElSelectDropdown', 'updatePopper');
            this.broadcast('ElDropdownMenu', 'updatePopper');
        },
        afterEnter () {
            this.$emit('opened');
        },
        afterLeave () {
            this.$emit('closed');
        }
    },

    mounted () {
        if (this.visible) {
            this.rendered = true;
            this.open();
            if (this.appendToBody) {
                document.body.appendChild(this.$el);
            }
        }
    },

    destroyed () {
        // if appendToBody is true, remove DOM node after destroy
        if (this.appendToBody && this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
    }
};
</script>
