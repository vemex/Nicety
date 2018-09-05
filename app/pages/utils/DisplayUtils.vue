<template>
    <div class="clearfix">
        <h4>显示辅助</h4>
        <hr>
        <div class="utils-demo">
            <div class="card   ">
                <div class="card-header bg-white bar">
                    <div class="card-title">显示类说明</div>
                </div>
                <div class="card-body">
                    <table class="table"> 
                        <thead>
                            <tr>
                                <th>Screen Size</th>
                                <th>Class</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Hidden on all</td>
                                <td><code class="highlighter-rouge">.d-none</code></td>
                            </tr>
                            <tr>
                                <td>Hidden only on xs</td>
                                <td><code class="highlighter-rouge">.d-none .d-sm-block</code></td>
                            </tr>
                            <tr>
                                <td>Hidden only on sm</td>
                                <td><code class="highlighter-rouge">.d-sm-none .d-md-block</code></td>
                            </tr>
                            <tr>
                                <td>Hidden only on md</td>
                                <td><code class="highlighter-rouge">.d-md-none .d-lg-block</code></td>
                            </tr>
                            <tr>
                                <td>Hidden only on lg</td>
                                <td><code class="highlighter-rouge">.d-lg-none .d-xl-block</code></td>
                            </tr>
                            <tr>
                                <td>Hidden only on xl</td>
                                <td><code class="highlighter-rouge">.d-xl-none</code></td>
                            </tr>
                            <tr>
                                <td>Visible on all</td>
                                <td><code class="highlighter-rouge">.d-block</code></td>
                            </tr>
                            <tr>
                                <td>Visible only on xs</td>
                                <td><code class="highlighter-rouge">.d-block .d-sm-none</code></td>
                            </tr>
                            <tr>
                                <td>Visible only on sm</td>
                                <td><code class="highlighter-rouge">.d-none .d-sm-block .d-md-none</code></td>
                            </tr>
                            <tr>
                                <td>Visible only on md</td>
                                <td><code class="highlighter-rouge">.d-none .d-md-block .d-lg-none</code></td>
                            </tr>
                            <tr>
                                <td>Visible only on lg</td>
                                <td><code class="highlighter-rouge">.d-none .d-lg-block .d-xl-none</code></td>
                            </tr>
                            <tr>
                                <td>Visible only on xl</td>
                                <td><code class="highlighter-rouge">.d-none .d-xl-block</code></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card   ">
                <div class="card-header bg-white bar">
                    <div class="card-title">显示方式说明</div>
                </div>
                <div class="card-body">
                    <div class="color-example">
                       <p>As such, the classes are named using the format:</p>
                       <ul>
  <li><code class="highlighter-rouge">.d-{value}</code> for <code class="highlighter-rouge">xs</code></li>
  <li><code class="highlighter-rouge">.d-{breakpoint}-{value}</code> for <code class="highlighter-rouge">sm</code>, <code class="highlighter-rouge">md</code>, <code class="highlighter-rouge">lg</code>, and <code class="highlighter-rouge">xl</code>.</li>
</ul>
<p>Where <em>display</em> is one of:</p>

<ul>
  <li><code class="highlighter-rouge">none</code></li>
  <li><code class="highlighter-rouge">inline</code></li>
  <li><code class="highlighter-rouge">inline-block</code></li>
  <li><code class="highlighter-rouge">block</code></li>
  <li><code class="highlighter-rouge">table</code></li>
  <li><code class="highlighter-rouge">table-cell</code></li>
  <li><code class="highlighter-rouge">table-row</code></li>
  <li><code class="highlighter-rouge">flex</code></li>
  <li><code class="highlighter-rouge">inline-flex</code></li>
</ul>
<div  style="width:20em" class="border clearfix">
<h5>Examples</h5>

<div class="bd-example d-inline-flex clearfix">
<div class="d-inline  p-2 bg-primary text-white">d-inline</div>
<div class="d-inline   p-2 bg-dark text-white">d-inline</div>
</div>
<div class="bd-example clearfix">
<span class="d-block p-2 bg-primary text-white">d-block</span>
<span class="d-block p-2 bg-dark text-white">d-block</span>
</div>
</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
