<template>
    <div>
        <div class="upload-state d-flex justify-content-between" v-if="inUploading">
            <div>
                <filename :id="currentUploadId" :uploader="uploader"></filename>
            </div>
            <div>
                <cancel-button :id=currentUploadId :uploader="uploader">取消</cancel-button>
                <progress-bar :id="currentUploadId" :uploader="uploader" style="height: 2px"></progress-bar>
            </div>
        </div>
        <dropzone :path="storagePath" :multiple="false"
                :style="{ border: 'dashed 2px #5182E4', height: '200px', width: '100%' , 'display': 'table'  , 'text-align': 'center'}"
                :uploader="uploader">
            <div style="display: table-cell;vertical-align: middle">
                <file-input :accept='accessType' :uploader="uploader" :style="{}" :path="storagePath" v-if="resetInput">
                    点击上传文件
                </file-input>
                <span> 或者拖拽上传</span>
            </div>
        </Dropzone>
    </div>
</template>
<script>
    import FineUploaderTraditional from 'fine-uploader-wrappers'
    import Dropzone from './dropzone'
    import FileInput from './fileInput'
    import Filename from 'vue-fineuploader/filename'
    import CancelButton from './cancelButton'
    import ProgressBar from './progressBar'
    export  default {
        name:"NicetyUploader",
        components: {
            Dropzone,
            FileInput,
            Filename,
            CancelButton,
            ProgressBar
        },
        props:{
            uploaderUrl:[String],
            storagePath:[String],
            accessType:[String]
        },
        data:function () {
            let uploader = this.createUploader();
            return {
                uploader: uploader,
                resetInput:true,
                currentUploadId: undefined
            }
        },
        computed:{
            inUploading(){
                return !( this.currentUploadId===undefined ||
                    this.currentUploadId===null||
                    this.currentUploadId==='');
            }
        },
        methods:{
            createUploader() {
                let uploader = new FineUploaderTraditional({
                    options: {
                        deleteFile: {
                            enabled: true,
                            endpoint: `${this.uploaderUrl}`
                        },
                        request: {
                            endpoint: `${this.uploaderUrl}`
                        }
                    }
                });
                uploader.on('statusChange', this.uploadStatusChange());
                return uploader;
            },
            uploadStatusChange() {
                let _ = this;
                return (id, oldStatus, newStatus) => {
                    let uuid = _.uploader.methods.getUuid(id);
                    if (newStatus === 'upload successful') {
                        _.currentUploadId = undefined;
                        _.$emit('uploaded', uuid);
                        _.reset();
                    } else if (newStatus === 'submitted') {
                        _.currentUploadId = id;
                        _.$emit('submitted', uuid);
                    } else if (this.isFileGone(newStatus)) {
                        _.$emit('cancel', uuid);
                    }
                };
            },
            isFileGone(status) {
                return [
                    'canceled',
                    'deleted'
                ].indexOf(status) >= 0
            },
            reset() {
                this.resetInput=false;
                this.$nextTick(() => {
                    this.resetInput = true;//重建组件
                });
                //this.uploader.methods.clearStoredFiles();
            },
        }
    }
</script>
