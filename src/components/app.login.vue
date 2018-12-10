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
                                          :input-placeholder="'用户名'"
                                          :name="'account'"
                                          span="12"
                                          :rules="'required'"
                                          :renderType="'TextInput'"
                                          :input-value.sync="account">
                            </nicety-field>
                            <nicety-field :label="'密码'"
                                          :input-placeholder="'密码'"
                                          :name="'password'"
                                          span="12"
                                          :rules="'required|remote'"
                                          :renderType="'PasswordInput'"
                                          :input-value.sync="password">
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
    /* eslint-disable indent */

    import NicetyForm from 'nicety/src/components/Form';
    import NicetyFields from 'nicety/src/components/Fileds';
    import NicetyField from 'nicety/src/components/Field';

    export default {
        components: {NicetyField, NicetyFields, NicetyForm},
        data: function () {
            return {
                account: '',
                password: ''
            };
        },
        mounted: function () {
             this.$securtyManager.getCurrentUser().then(function (currentUser) {
                 if (currentUser) {
                     window.location.href = '/';
                 };
             })
        },
        methods: {
            login () {
                let _ = this;
                this.$securtyManager.login(this.account, this.password).then(function (data) {
                    if (data.state !== 'Successfully') {
                        _.$refs.forms.addError(data.message);
                        return;
                    }
                    window.location.href = '/';
                });
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
