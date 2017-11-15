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
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Components
                    </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown"> 
                            <router-link class="dropdown-item" to="/Alerts">Alerts</router-link>
                            <router-link class="dropdown-item" to="/Badges">Badges</router-link>
                            <router-link class="dropdown-item" to="/Breadcrumb">Breadcrumb</router-link>
                            <router-link class="dropdown-item" to="/Button">Button</router-link>
                            <router-link class="dropdown-item" to="/ButtonGroup">Button Group</router-link>
                            <router-link class="dropdown-item" to="/Form">Form</router-link>
                            <router-link class="dropdown-item" to="/Popovers">Popovers</router-link>
                            <router-link class="dropdown-item" to="/Navbar">Navbar</router-link>
                            <router-link class="dropdown-item" to="/ListGroup">ListGroup</router-link> 
                        </div>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Plugins
                    </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown"> 
                            <router-link class="dropdown-item" to="/Alerts">Menu</router-link> 
                        </div>
                    </li>
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
