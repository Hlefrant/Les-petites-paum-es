<template>
    <form
            @submit.prevent="signUp"
            method="post"
    >
        <label for="">Username</label>
        <input type="text" v-model="name"/>
        <label for="">Email</label>
        <input type="text" v-model="email"/>
        <label for="">Mot de passe</label>
        <input type="password" v-model="password"/>
        <input type="submit" class="" value="Login">
    </form>
</template>

<script>
    import * as firebase from 'firebase/app';

    export default {
        name: "SignUpForm",
        data: function () {
            return{
                name: null,
                email: null,
                password: null
            }
        },
        methods:{
            signUp: function(e){
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(function () {
                    this.$router.push('/')
                }).catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    console.log("Code erreur : " + errorCode)
                    console.log("Message erreur : " + errorMessage)

                })
                e.preventDefault()
            }
        }
    }
</script>

<style scoped>

</style>