<template>

<div>
 <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <v-link href="/">Home</v-link>
          <v-link href="/about">About</v-link> 
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>

    <main role="main" class="container">

      <div class="starter-template">
         <slot></slot>
       
      </div>

    </main>
</div><!-- 
  <div class="container">
    <ul>
      <li>
        <v-link href="/">Home</v-link>
        <v-link href="/about">About</v-link>
      </li>
    </ul>

   
  </div>-->
</template>

<script>
import VLink from "../components/VLink.vue";

export default {
  components: {
    VLink
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 15px 30px;
  background: #f9f7f5;
}
</style>
