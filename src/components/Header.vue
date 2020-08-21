<template>
    <div class="header">
        <router-link to="/">
            <img src="../assets/logo.png" alt="">
        </router-link>
        <div class="header__sign" @click="isDisplay = !isDisplay">
            <div class="menu__burger">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <img class="image__user" src="../assets/user.svg" alt="">
            <div v-show="isDisplay" class="dropdown__signs">
                <router-link to="/login">Connexion</router-link>
                <router-link to="/signup">Inscription</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data: function () {
            return{
                isDisplay: false
            }
        }
    }
</script>

<style scoped lang="scss">
    .header{
        margin: 0 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100px;
        a{
            height: 100%;

            img{
                height: 100%;
            }
        }


        .header__sign{
            background: transparent;
            padding: 5px 5px 5px 12px;
            border: 1px solid #DDDDDD ;
            color: #222222 ;
            cursor: pointer ;
            border-radius: 21px;
            display: flex;
            align-items: center;
            position: relative;
            .image__user{
                width: 30px;
            }

            .menu__burger{
                display: flex;
                flex-direction: column;
                margin-right: 10px;
                span{
                    height: 2px;
                    width: 17px;
                    background-color: #222222;
                    margin-bottom: 3px;

                    &:last-child{
                        margin-bottom: 0;
                    }
                }
            }
            &:hover{
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
                cursor: pointer;
            }

            .dropdown__signs{
                display: flex;
                flex-direction: column;
                position: absolute;
                bottom: -90px;
                width: 150px;
                right: 0;
                background-color: white;
                box-shadow: rgba(0, 0, 0, 0.28) 0 8px 28px;
                padding: 15px 10px;
                border-radius: 12px;
                z-index: 9999;
                a{
                    text-decoration: none;
                    color: black;
                    font-weight: bold;
                    margin-bottom: 10px;
                    transition: all 0.6s;

                    &:hover{
                        transition: all 0.3s;
                        color: rgb(113, 113, 113);
                    }
                    &:last-child{
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
</style>