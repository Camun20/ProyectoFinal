new Vue({
    el: "#formulario",
    data: {
        nombre: '',
        aceptado: false,
        loginText: 'Iniciar Sesión',
        loginForm: {
            email: '',
            password: ''
        },
        registerForm: {
            nombre: '',
            apellido: '',
            telefono: '',
            email: '',
            password: ''
        },
        commentForm: {
            name: '',
            email: '',
            comment: ''
        }
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://127.0.0.1:5000/login', this.loginForm);
                if (response.status === 200) {
                    localStorage.setItem("isLoggedIn", true); // Guarda el estado de inicio de sesión
                    window.location.href = "Perfil.html"; // Redirige a Perfil.html
                }
            } catch (error) {
                alert('Error al iniciar sesión: ' + error.response.data.message);
            }
        },
        
        async register() {
            try {
                const response = await axios.post('http://127.0.0.1:5000/register', this.registerForm);
                if (response.status === 200) {
                    alert('Felicidades ' + this.registerForm.nombre + ' se registró exitosamente');
                    window.location.href = "IniciarSesion.html";
                }
            } catch (error) {
                alert('Error al registrarse: ' + (error.response ? error.response.data.message : error.message));
            }
        },

        comment() {
            alert('Gracias ' + this.commentForm.name + ' por su comentario');
        },

        toggleLogin() {
            if (this.loginText === "Cerrar Sesión") {
                localStorage.removeItem("isLoggedIn");
                this.loginText = "Iniciar Sesión";
            } else {
                window.location.href = "IniciarSesion.html";
            }
        }
    },

    created() {
        this.loginText = localStorage.getItem("isLoggedIn") ? "Cerrar Sesión" : "Iniciar Sesión";
    }
});