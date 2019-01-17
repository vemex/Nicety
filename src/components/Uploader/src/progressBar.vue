<template>
    <div :class="containerClassName"
         :hidden="state.hidden">
        <div aria-valuemax='100'
             aria-valuemin='0'
             :aria-valuenow="percentWidth"
             :class="className"
             role='progressbar'
             :style="{ 'width': percentWidth + '%' }" />
    </div>
</template>

<style lang="css"></style>

<script>
    const isUploadComplete = status =>
        status === 'upload failed' || status === 'upload successful' || status === 'canceled'

    export default {
        props: {
            id: {
                type: Number
            },
            hideBeforeStart: {
                type: Boolean,
                default: false
            },
            hideOnComplete: {
                type: Boolean,
                default: false
            },
            uploader: {
                type: Object,
                rquired: true
            }
        },

        data () {
            return {
                state: {
                    bytesUploaded: null,
                    hidden: this.hideBeforeStart,
                    totalSize: null
                },
                _unmounted: false
            }
        },

        created () {
            this._createEventHandlers()
        },

        mounted () {
            if (this._isTotalProgress) {
                this.uploader.on('totalProgress', this._trackProgressEventHandler)
            } else {
                this.uploader.on('progress', this._trackProgressEventHandler)
            }

            this.uploader.on('statusChange', this._trackStatusEventHandler)
        },

        beforeDestroy () {
            this._unmounted = true
            this._unregisterEventHandlers()
        },

        methods: {
            _createEventHandlers () {
                if (this._isTotalProgress) {
                    this._trackProgressEventHandler = (bytesUploaded, totalSize) => {
                        this.$set(this.state, 'bytesUploaded', bytesUploaded)
                        this.$set(this.state, 'totalSize', totalSize)
                    }
                } else {
                    this._trackProgressEventHandler = (id, name, bytesUploaded, totalSize) => {
                        if (id === this.id) {
                            this.$set(this.state, 'bytesUploaded', bytesUploaded)
                            this.$set(this.state, 'totalSize', totalSize)
                        }
                    }
                }
                let _this=this;
                this._trackStatusEventHandler = (id, oldStatus, newStatus) => {
                    if (!_this._unmounted) {
                        if (_this._isTotalProgress) {
                            if (
                                !_this.state.hidden &&
                                _this.hideOnComplete &&
                                isUploadComplete(newStatus) &&
                                !_this.uploader.methods.getInProgress()
                            ) {
                                _this.$set(_this.state, 'hidden', true)
                            } else if (_this.state.hidden && _this.uploader.methods.getInProgress()) {
                                _this.$set(_this.state, 'hidden', false)
                            }
                        } else if (id === _this.id) {
                            if (_this.state.hidden && newStatus === 'uploading') {
                                _this.$set(_this.state, 'hidden', false)
                            } else if (!_this.state.hidden && this.hideOnComplete && isUploadComplete(newStatus)) {
                                _this.$set(_this.state, 'hidden', true)
                            }
                        }
                    }
                }
            },

            _unregisterEventHandlers () {
                if (this._isTotalProgress) {
                    this.uploader.off('totalProgress', this._trackProgressEventHandler)
                } else {
                    this.uploader.off('progress', this._trackProgressEventHandler)
                }

                this.uploader.off('statusChange', this._trackStatusEventHandler)
            }
        },

        computed: {
            _isTotalProgress () {
                return typeof this.id !== 'number'
            },

            className () {
                return this._isTotalProgress ? 'vue-fine-uploader-total-progress-bar' : 'vue-fine-uploader-file-progress-bar'
            },

            containerClassName () {
                return `${this.className}-container`
            },

            percentWidth () {
                return this.state.bytesUploaded / this.state.totalSize * 100 || 0
            }
        }
    }
</script>
