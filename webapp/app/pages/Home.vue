<template>
  <div id="home-page" class="row">
    <div class="col-lg-7">
      <div class="card">
        <div class="card-header bar">
          <div class="card-title">Special title treatment</div>
          <div class="card-control">
            <button class="btn" data-toggle="collapse" data-target="#multiCollapseExample1" aria-expanded="false" aria-controls="multiCollapseExample1"><i class="ti-angle-down icon-lg" ></i></button>
            <button class="btn" ><i class="ti-reload icon-lg" ></i></button>
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
    <div class="col-lg-4">
      <div class="card">
        <div class="card-header bar">
          <div class="card-title">Special title treatment</div>
          <div class="card-control">
            <button class="btn"><i class="ti-reload icon-lg"></i></button>
            <button class="btn"><i class="ti-close icon-lg"></i></button>
          </div>
        </div>
        <div class="card-body">
          <h4 class="card-title">Special title treatment</h4>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import MainLayout from '../layouts/Main.vue'
  export default {
    components: {
      //   MainLayout
    },
     mounted: function () {//渲染完成
     $('#home-page .collapse').collapse()
    }
  }
</script>
