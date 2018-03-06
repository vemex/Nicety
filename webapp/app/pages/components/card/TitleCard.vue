<<template>
    <div id="title-card" class="mt-4">
        <h4>标题样式</h4>
        <hr>
        <div class="row">
            <div class="col-lg-6 mb-2">
                <div class="card">
                    <div class="card-header bar">
                        <div class="card-title">仅包含标题</div>
                    </div>
                    <div class="card-body">
                        <i class="psi-align-right"></i>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header bar">
                        <div class="card-title">拥有默认操作按钮</div>
                        <div class="card-control">
                            <button class="btn" data-toggle="collapse" data-target="#multiCollapseExample1" aria-expanded="false" aria-controls="multiCollapseExample1"><i class="ti-angle-down icon-lg" ></i></button>
                            <button class="btn"><i class="ti-reload icon-lg" ></i></button>
                            <button class="btn"><i class="ti-close icon-lg"></i></button>
                        </div>
                    </div>
                    <div class="collapse multi-collapse" id="multiCollapseExample1">
                        <div class="card-body">
                            <i class="psi-align-right"></i>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header bar">
                        <div class="card-title">自定义操作按钮</div>
                        <div class="card-control">
                            <button class="btn"><i class="ti-settings icon-lg" ></i></button>
                            <button class="btn" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2"><i class="ti-angle-down icon-lg" ></i></button>
                            <button class="btn"><i class="ti-reload icon-lg" ></i></button>
                            <button class="btn"><i class="ti-close icon-lg"></i></button>
                        </div>
                    </div>
                    <div class="collapse multi-collapse" id="multiCollapseExample2">
                        <div class="card-body">
                            <i class="psi-align-right"></i>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card ">
                    <div class="card-header bar border-bottom-0  bg-white ">
                        <div class="card-title">无颜色</div>
                    </div>
                    <div class="collapse multi-collapse" id="multiCollapseExample2">
                        <div class="card-body">
                            <i class="psi-align-right"></i>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 mt-2">
                <div class="card ">
                    <div class="card-header bar bg-info text-white ">
                        <div class="card-title">修改标题颜色</div>
                    </div>
                    <div class="collapse multi-collapse" id="multiCollapseExample2">
                        <div class="card-body">
                            <i class="psi-align-right"></i>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<<script>
    export default {
        components: {
            //   MainLayout
        },
        mounted: function() { //渲染完成
            $('#title-card .collapse').collapse()
        }
    }
</script>
