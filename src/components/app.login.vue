<template>
    <div class="login-container">
        <div class="login-panel">
            <div>
                <!--<div class="login-banner">-->
                <!--</div>-->
                <!--<div style="width: 500px;height: 50px;color: snow;padding-top:20px;text-align:center;font-size:25px;font-family: 楷体">-->
                    <!--Nader良信电器-->
                <!--</div>-->
                <!--<div style="width: 500px;height: 80px;color:snow;font-family: 楷体;background-color: #336699;border-radius:15px 15px 0 0;display:table-cell; vertical-align:middle;text-align:center;font-size: 35px">-->
                    <!--SRM供应商关系管理系统-->
                <!--</div>-->
                <div style="width: 500px;padding: 50px;background-color: white;border-radius:0 0 15px 15px">
                    <nicety-form ref="forms">
                        <nicety-fields>
                            <nicety-field :label="''"
                                          :input-placeholder="'用户名'"
                                          :name="'account'"
                                          span="12"
                                          :rules="'required'"
                                          :renderType="'TextInput'"
                                          :input-value.sync="account">
                            </nicety-field>
                            <nicety-field :label="''"
                                          :input-placeholder="'密码'"
                                          :name="'password'"
                                          span="12"
                                          :rules="'required'"
                                          :renderType="'PasswordInput'"
                                          :input-value.sync="password">
                            </nicety-field>
                        </nicety-fields>
                    </nicety-form>
                    <button type="button" class="btn btn-primary" @click="login" style="width:100%;font-size: 18px">
                        {{$t('app.login.LOGIN')}}
                    </button>
                </div>
                <!--<div style="width: 500px;height: 50px;color: snow;padding-top:20px;text-align:center;font-size:12px;font-family: 楷体">-->
                    <!--© 2017-2018, 南京德曦数企咨询有限公司-->
                <!--</div>-->
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable indent */

    export default {
        data: function () {
            return {
                account: '',
                password: ''
            };
        },
        mounted: function () {
            let _ = this;
            this.$securtyManager.getCurrentUser().then(function (currentUser) {
                if (currentUser) {
                    window.location.href = _.$site.baseURL;
                }
            })
        },
        methods: {
            login() {
                let _ = this;
                _.$refs.forms.clearError();
                if (this.account===''){
                    _.$refs.forms.addError({field:"account",errorMsg:'账号不能为空.'});
                    return;
                }
                if (this.password===''){
                    _.$refs.forms.addError({field:"password",errorMsg:'密码不能为空.'});
                    return;
                }
                this.$securtyManager.login(this.account, this.password).then(function (data) {
                    window.location.href = _.$site.baseURL;
                }).catch(errors => {
                    _.$refs.forms.addError(errors);
                });
            }
        }
    };
</script>

<style scoped lang="scss">
    .login-panel {

    }

    .login {

    }

</style>
