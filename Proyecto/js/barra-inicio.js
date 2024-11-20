Vue.component('barra-inicio', {
    data() {
        return {
            isLoggedIn: localStorage.getItem("isLoggedIn") === "true"
        };
    },
    computed: {
        cartItemCount() {
            return this.$store.state.cart.length;
        },
        cartProducts() {
            return this.$store.getters.cart;  
        },
        cartTotal() {
            return this.$store.getters.cartTotal;
        }
    },
    methods: {
        login() {
            
        },
        logout() {
            this.isLoggedIn = false;
            localStorage.removeItem("isLoggedIn"); 
            window.location.href = "IniciarSesion.html"; 
        }
    },
    template: `
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
            <a class="navbar-brand" style="margin: 0 20px;" href="#">
                <img src="Imagenes/Logo-Sin fondo.png" alt="Logo" style="width:70px;">
            </a>
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" style="margin: 0 20px;" href="Inicio.html">Inicio</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" style="margin: 0 20px;" href="IniciarSesion.html">Iniciar Sesión</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" style="margin: 0 20px;" href="Registrarse.html">Registrarse</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" style="margin: 0 20px;" href="Comentarios.html">Comentarios</a>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto"> 
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="cartDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src="Imagenes/Carrito.png" alt="Logo" style="width:40px;"> ({{ cartItemCount }} Productos)
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="cartDropdown" style="width: 400px;">
                        <div v-if="cartProducts.length === 0" class="dropdown-item text-center">
                            Tu carrito está vacío.
                        </div>
                        <div v-else>
                            <div v-for="producto in cartProducts" :key="producto.id" class="dropdown-item d-flex justify-content-between align-items-center" style="margin-bottom: 10px;">
                                <div class="d-flex align-items-center" style="width: 100%;">
                                    <img :src="producto.imagen" alt="Producto" class="img-fluid mr-2" style="width: 50px; height: 50px;">   
                                    <div class="text-left" style="flex-grow: 1;">
                                        <div><strong>{{ producto.nombre }}</strong></div>
                                        {{ producto.precio }}
                                    </div>
                                    <button class="btn btn-danger btn-sm" @click="removeFromCart(producto)">Eliminar</button>
                                </div>
                            </div> 
                            <div class="dropdown-divider"></div>
                            <div class="dropdown-item text-right">
                                <strong>Total: </strong>{{ cartTotal }}
                            </div>
                            <div class="dropdown-item text-center">
                                <button class="btn btn-primary btn-block">Finalizar Compra</button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    `
});

new Vue({
    el: '#app',
    store
});


Vue.component('pie', {
    template: `<footer class="bg-dark text-light mt-4 py-3">
                    <div class="container text-center">
                        <p>&copy 2024. Todos los derechos reservados</p>
                    </div>
                </footer>`
});

new Vue({
    el: '#pie'
});