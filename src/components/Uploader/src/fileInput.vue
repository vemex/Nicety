<template>
    <div class="vue-fine-uploader-file-input">
        <label>
            <input type="file"
                   :value="file"
                   @change="_onFilesSelected"
                   :multiple="multiple"
                   :accept="accept"
                   :required="required">
            <slot></slot>
        </label>
    </div>
</template>

<script>
    export default {
        props: {
            multiple: {
                type: Boolean,
                default: false
            },
            path:{
                type: String,
                default: ""
            },
            required: {
                type: Boolean,
                default: false
            },
            accept: {
                type: String,
                default: ''
            },
            uploader: {
                type: Object,
                required: true
            }
        },

        data () {
            return {
                file:"",
                _unmounted: false
            }
        },
        watch:{
        },

        beforeDestroy () {
            this._unmounted = true
        },

        methods: {
            _onFilesSelected (e) {
                this.uploader.methods.reset();
                this.uploader.methods._paramsStore.set({path:this.path},0);
                this.uploader.methods.addFiles(e.target)
            },
        }
    }
</script>
