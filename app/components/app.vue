<template>
    <app :fixed-header="true" :fixed-footer="true" :fixed-aside-left="true" :fixed-page-title="true" :fixed-nav-tabs="true">
        <template slot="nav-header-bar-left">
            <button type="button" data-container="body" data-toggle="popover" data-trigger="hover"
                    data-placement="bottom"
                    data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                <i class="pli-mail-2"></i>
            </button>
        </template>
        <template slot="nav-header-bar-right">
            <div class="dropdown">
                <button class="dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                    <i class="pli-bell"></i><span class="badge">4</span>
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2"
                     x-placement="bottom-start"
                     style="position: absolute; transform: translate3d(0px, 29px, 0px); top: 0px; left: 0px; will-change: transform;">
                    <form class="px-4 py-3">
                        <div class="form-group">
                            <label for="exampleDropdownFormEmail1">Email address</label>
                            <input type="email" class="form-control" id="exampleDropdownFormEmail1"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleDropdownFormPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleDropdownFormPassword1"
                                   placeholder="Password">
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="dropdownCheck">
                            <label class="form-check-label" for="dropdownCheck">
                                Remember me
                            </label>
                        </div>
                        <button type="submit" class="btn btn-primary">Sign in</button>
                    </form>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">New around here? Sign up</a>
                    <a class="dropdown-item" href="#">Forgot password?</a>
                </div>
            </div>
            <button type="button" data-container="body" data-toggle="popover" data-trigger="hover"
                    data-placement="bottom"
                    data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                <i class="pli-mail-2"></i>
            </button>
            <button type="button" data-container="body" data-toggle="popover" data-trigger="hover"
                    data-placement="bottom" data-content="退出">
                <i class="pli-unlock"></i>
            </button>
        </template>
    </app>
</template>

<script>
import App from '../../src/components/app';

export default {
    components: {
        App
    },
    mounted: function () { // 渲染完成

    }
};
</script>
