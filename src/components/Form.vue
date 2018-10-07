<template>
    <form :class="['nicety form', {'inline': this.inline}]">
        <slot></slot>
        <div class="alert alert-danger" v-show="errorMsg">{{errorMsg}}</div>
    </form>
</template>
<script>
    /**
     * 获取所有字段
     * @param fields
     * @param children
     */
    const getAllFields = (fields, children) => {
        children.forEach((child) => {
            // console.log(child.$options.name)
            if (child.$options.name === 'nicety-field') {
                if (child.name && child.rules) fields.push(child)
            } else if (child.$children && child.$children.length > 0) {
                getAllFields(fields, child.$children)
            }
        })
    };

    export default {
        name: 'nicety-form',
        props: {
            inline: {type: Boolean, default: false}
        },
        data() {
            return {
                errorMsg: null
            }
        },
        methods: {
            clearError() {
                this.errorMsg = null;
                const fields = [];
                getAllFields(fields, this.$children);
                fields.forEach((field) => {
                    field.clearError();
                })
            },
            addError(errorInfo) {
                if (typeof errorInfo  === 'string') {
                    this.errorMsg = errorInfo;
                    return
                }
                const fields = [];
                getAllFields(fields, this.$children);
                fields.forEach((field) => {
                    if (field.name === errorInfo.field) {
                        field.clearError();
                        field.addError(errorInfo.errorMsg)
                    }
                })
            }
        }
    }
</script>