<template>
    <div class="form__container">
        <form action="" @submit="this.login">
            <h1>Connexion</h1>
            <div class="field field-2">
                <label for="">Email</label>
                <input type="text" v-model="email"/>
            </div>
            <div class="field field-2">
                <label for="">Mot de passe</label>
                <input type="password" v-model="password"/>
            </div>
            <input type="submit" class="submit" value="Connexion">
            <router-link class="link" to="/signup">Pas encore inscrit ? Inscrivez-vous !</router-link>
        </form>
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

<style scoped lang="scss">
    .form__container{
        display: flex;
        align-items: center;
        justify-content: center;
        height: calc(100vh - 100px);
        form{
            width: 800px;
            background-color: white;
            border-radius: 21px;
            box-shadow: rgba(0, 0, 0, 0.28) 0 8px 28px;
            padding: 15px 10px;
            display: flex;
            flex-wrap: wrap;
            h1{
                display: block;
                width: 100%;
                text-align: center;
            }
            .field{
                margin-bottom: 15px !important;

                input, select{
                    width: 100%;
                    padding: 0;
                    height: 30px;
                }
                select{
                    height: 34px;
                }
                label{
                    display: block;
                    margin-bottom: 5px;
                }

                &.field-1{
                    margin: 0 2%;
                    width: 45%;
                }

                &.field-2{
                    width: 96%;
                    margin: 0 2%;
                }
            }
            .submit{
                margin: 0 2%;
                appearance: none;
                background-color: transparent;
                text-transform: uppercase;
                border: 1px solid;
                border-radius: 6px;
                padding: 10px 15px;
                outline: none;
                transition: all 0.6s;
                &:hover{
                    cursor: pointer;
                    background-color: #222222;
                    color: white;
                    transition: all 0.6s;
                }
            }
            .link{
                text-decoration: underline;
                display: block;
                color: #222222;
                font-style: italic;
                width: 100%;
                text-align: center;
            }
        }
    }
</style>