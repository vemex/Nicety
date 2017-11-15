<template>
    <div>
         <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>

            <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul class="navbar-nav mr-auto">
                    <router-link class="nav-item" tag="li" to="/Home"><a class="nav-link">Home</a></router-link>
                    <router-link class="nav-item" tag="li" to="/ThemeColor"><a class="nav-link">ThemeColor</a></router-link>
                    <router-link class="nav-item" tag="li" to="/Alerts"><a class="nav-link">Alerts</a></router-link>
                    <router-link class="nav-item" tag="li" to="/About"><a class="nav-link">About</a></router-link>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>


        <main role="main" class="container">

            <div class="starter-template">
                <router-view></router-view>

            </div>

        </main>
    </div>
</template>
