<<template>
    <div>
        <h4>带标题的Card</h4>
        <hr>
        <div class="row">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header">
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
                    <div class="card-header">
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
                    <div class="card-header">
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
        </div>
    </div>
</template>
<<script>
  export default {
    components: {
      //   MainLayout
    },
     mounted: function () {//渲染完成
     $('.collapse').collapse()
    }
  }
</script>
