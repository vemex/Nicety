export default {
    props: {
        formType: {type: String, default: "view"},
        formId: {type: String, default: ""}
    },
    mounted() {
        let _ = this;
        let dialog = this.$parent._provided["dialog"];
        if (dialog) {
            dialog.$on('close', function () {
                _.cancel();
            });
        }
    },
    data: function () {
        return {
            formData: {}
        };
    },
    watch: {
        formId: function (newValue) {
            if (newValue !== undefined || newValue !== "") {
                this.read();
            }
        }
    },
    computed: {
        isCreate: function () {
            return this.formType.toLowerCase() === "create";
        },
        isEdit: function () {
            return this.formType.toLowerCase() === "edit";
        },
        isView: function () {
            return this.formType.toLowerCase() === "view";
        }
    },
    methods: {
        setFormData: function (data) {
            this.originalData = data;
            this.formData = Object.assign({}, data);
            return Promise.resolve(true);
        },
        read() {
            if (!this.readCore) {
                return Promise.resolve(false);
            }
            let _ = this;
            return this.readCore().then(function (ret) {
                _.formData = ret;
            })
        },
        saveOrUpdate() {
            let _ = this;
            if (this.isCreate) {
                if (!this.createCore) {
                    return Promise.resolve(false);
                }
                return this.createCore().then(data => {
                    //Object.assign(_.originalData, _.formData);
                    _.$refs.form.clearError();
                    return Promise.resolve(data);
                }).catch(function (errors) {
                    _.$refs.form.clearError();
                    _.$refs.form.addError(errors);
                    return Promise.reject(errors);
                });
            } else if (this.isEdit) {
                if (!this.updateCore) {
                    return Promise.resolve(false);
                }
                return this.updateCore().then(data => {
                    _.$refs.form.clearError();
                    if (_.originalData) {
                        Object.assign(_.originalData, _.formData);
                        return Promise.resolve(_.originalData);
                    }
                    return Promise.resolve(_.formData);
                }).catch(function (errors) {
                    _.$refs.form.clearError();
                    _.$refs.form.addError(errors);
                    return Promise.reject(errors);
                });
            }
        },
        reset: function (data) {
            this.cancel();
            if (typeof data === "string") {
                return this.read();
            }
            return this.setFormData(data);
        },
        cancel() {
            this.$refs.form.clearError();
            this.formData = {};
            this.originalData = {};
        }
    }
}
