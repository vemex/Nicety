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
                if (child.name && child.rules) fields.push(child);
            } else if (child.$children && child.$children.length > 0) {
                getAllFields(fields, child.$children);
            }
        });
    };

    export default {
        name: 'nicety-form',
        componentName: 'NicetyForm',
        props: {
            inline: {type: Boolean, default: false},
            disabled: {type: Boolean, default: false},
            type:{type:String,default:"edit"},
            statusIcon: {type: Boolean, default: false}
        },
        provide() {
            return {
                'nicetyForm': this
            };
        },
        data() {
            return {
                errorMsg: null
            };
        },
        computed:{
            isReadOnly:function () {
                return this.type.toLowerCase()==="view";
            }
        },
        methods: {
            clearError() {
                this.errorMsg = null;
                const fields = [];
                getAllFields(fields, this.$children);
                fields.forEach((field) => {
                    field.clearError();
                });
            },
            addError(errorInfo) {
                if (typeof errorInfo === 'string') {
                    this.errorMsg = errorInfo;
                    return;
                }
                if(typeof  errorInfo ==='object' && errorInfo.code){
                    let localString= this.$t("form."+errorInfo.code);
                    if (localString.startsWith("form")) {
                        this.errorMsg =errorInfo.defaultMessage;
                    }else {
                        this.errorMsg =errorInfo.localString;
                    }
                    return;
                }
                const fields = [];
                getAllFields(fields, this.$children);
                let setFiledError = function (error) {
                    fields.forEach((field) => {
                        if (field.name === error.field) {
                            field.clearError();
                            field.addError(error.errorMsg);
                        }
                    });
                };
                if (Array.isArray(errorInfo)) {
                    errorInfo.forEach(function (error) {
                        setFiledError(error);
                    });
                } else
                    setFiledError(errorInfo);
            }
        }
    };
</script>
