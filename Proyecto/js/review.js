new Vue({
    el: '#review',
    data() {
        return{
            rostro: 'Imagenes/hamster.png',
            name: 'Juan Gomez ⭐⭐⭐⭐',
            resena: 'Estoy muy feliz con el servicio'
        };
    },
    mounted(){
        this.iniciarResena();
    },
    methods: {
        iniciarResena(){
            setInterval(() =>   {
                this.rostro = this.rostro ==='Imagenes/hamster.png'?  'Imagenes/hamster2.png' : 'Imagenes/hamster.png';
                this.name = this.name ==='Juan Gomez ⭐⭐⭐⭐'? 'Carlos Torres ⭐⭐⭐⭐⭐' : 'Juan Gomez ⭐⭐⭐⭐';
                this.resena = this.resena === 'Estoy muy feliz con el servicio'? 'Excelentes productos' : 'Estoy muy feliz con el servicio';
            }, 5000);
        }
    }
});