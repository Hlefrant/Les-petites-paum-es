<template>
    <div>
        <form action="" @submit="this.login">
            <label for="">Email</label>
            <input type="text" v-model="email"/>
            <label for="">Mot de passe</label>
            <input type="password" v-model="password"/>
            <input type="submit" class="" value="Login">
        </form>
        <router-link to="/signup">Pas encore inscrit ? Inscrivez-vous !</router-link>
    </div>

</template>

<script>
    import * as firebase from 'firebase/app';

    export default {
        name: "SignInForm",
        data: function () {
            return{
                email: null,
                password: null
            }
        },
        methods:{
            login(e){
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(function () {
                    this.$router.push('/')
                }).catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    console.log("Code erreur : " + errorCode)
                    console.log("Message erreur : " + errorMessage)
                });
                e.preventDefault()
            }
        }
    }
</script>

<style scoped>

</style>