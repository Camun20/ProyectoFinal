const store = new Vuex.Store({
    state: {
        count: 0,
        cart: JSON.parse(localStorage.getItem('cart')) || []
    },
    mutations: {
        ADD_TO_CART(state, product) {
            state.cart.push(product);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        REMOVE_FROM_CART(state, product) {
            state.cart = state.cart.filter(item => item.id !== product.id);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        }
    },
    getters: {
        cart: state => state.cart,
        cartTotal: state => state.cart.reduce((total, product) => total + parseFloat(product.precio.replace(/\./g, '')), 0)
    }
});

new Vue({
    el: "#producto",
    store,  
    data:{
        productos: [],
        busqueda: '',
        url_products: "http://127.0.0.1:5000/productos"
    },
    computed: {
        cart() {
            return this.$store.getters.cart;
        },
        cartTotal() {
            return this.$store.getters.cartTotal;
        },
        productosFiltrados() {
            return this.productos.filter(producto => producto.nombre.toLowerCase().includes(this.busqueda.toLowerCase()));
        }
    },
    methods: {
        addToCart(producto) {
            this.$store.commit('ADD_TO_CART', producto);
            alert(`${producto.nombre} añadido al carrito`);
        },
        removeFromCart(producto) {
            this.$store.commit('REMOVE_FROM_CART', producto);
        },

        async cargarProductos() {
            try {
                const respuesta = await fetch(this.url_products);
                if (respuesta.ok) {
                    const productos = await respuesta.json();
                    this.productos = productos;
                } else {
                    console.error("Error al obtener productos:", respuesta.status);
                }
            } catch (error) {
                console.error("Error al cargar productos:", error);
            }
        }
    },
 
    created(){
        this.cargarProductos();
        this.loginText = localStorage.getItem("isLoggedIn") ? "Cerrar Sesión" : "Iniciar Sesión";
    }
});