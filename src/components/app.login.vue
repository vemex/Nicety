<template>
    <div class="login-container" style="background: radial-gradient(whitesmoke, #9c9c9c)">
        <div class="login-panel">
            <div class="login ">
                <div class="login-banner">
                </div>
                <div class="login-form" style="" @keyup.enter.stop="login">
                    <nicety-form ref="forms">
                        <nicety-fields>
                            <nicety-field :label="'用户名'"
                                          :placeholder="'用户名'"
                                          :name="'account'"
                                          span="12"
                                          :rules="'required'"
                                          :renderType="'TextInput'"
                                          :value.sync="account">
                            </nicety-field>
                            <nicety-field :label="'密码'"
                                          :placeholder="'密码'"
                                          :name="'password'"
                                          span="12"
                                          :rules="'required|remote'"
                                          :renderType="'PasswordInput'"
                                          :value.sync="password">
                            </nicety-field>
                        </nicety-fields>
                    </nicety-form>
                    <button type="button" class="btn btn-primary" @click="login">{{$t('app.login.LOGIN')}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NicetyForm from "nicety/src/components/Form";
    import NicetyFields from "nicety/src/components/Fileds";
    import NicetyField from "nicety/src/components/Field";

    export default {
        components: {NicetyField, NicetyFields, NicetyForm},
        data: function () {
            return {
                account: "",
                password: "",
            }
        },
        methods: {
            login() {
                let _ = this;
                this.$store.dispatch("User/login", {
                    account: this.account,
                    password: this.password
                }).then(function (data) {
                    if ( data.error) {
                        for (let key in data.error) {
                            _.$refs.forms.addError({field: key, errorMsg: data.error[key]});
                        }
                    }else if(!data){
                        _.$refs.forms.addError("登录失败，请重试！");
                    }else {
                        window.location.href = "/";
                    }

                });
            }
        }
    }
</script>

<style scoped lang="scss">

</style>