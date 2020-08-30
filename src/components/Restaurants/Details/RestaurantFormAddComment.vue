<template>

    <div class="formComment">
        <h4>Votre expérience est précieuse pour les autres paumées. Merci !</h4>
        <form action="" @submit.prevent="addComment">
            <div class="star-rating stars field field-1">
                <label class="label__note" for="">Note</label>
                <label class="star-rating__star" :key="rating" v-for="rating in ratings"
                       :class="{'is-selected': ((value >= rating) && value != null), 'is-disabled': disabled}"
                       v-on:click="set(rating)" v-on:mouseover="star_over(rating)" v-on:mouseout="star_out">
                    <input class="star-rating star-rating__checkbox" type="radio" :value="rating" :name="name"
                           v-model="value" :disabled="disabled">★</label>
            </div>
            <div class="title field">
                <label for="">Titre du commentaire</label>
                <input type="text" v-model="title">
            </div>
            <div class="comment field">
                <label for="">Commentaire</label>
                <textarea name="" id="" cols="30" rows="10" v-model="message" placeholder="Votre commentaire">
                </textarea>
            </div>
            <input class="submit" type="submit" value="Envoyer votre commentaire">
        </form>
    </div>

</template>

<script>
    import * as firebase from "firebase";
    import {db} from "@/main";

    export default {
        name: "RestaurantFormAddComment",
        data: function () {
            return{
                title: null,
                message: null,
                value: null,
                temp_value: null,
                ratings: [1, 2, 3, 4, 5],
                i:0
            }
        },
        props: {
            id: String,
            note: Object
        },
        mounted(){

                console.log(this.id)

        },
        methods:{
            processFile(event) {
                this.image = event.target.files[0]
            },
            star_over: function (index) {
                this.temp_value = this.value;
                return this.value = index;
            },
            star_out: function () {
                return this.value = this.temp_value;
            },
            set: function (value) {
                this.temp_value = value;
                return this.value = value;
            },
            addComment: function (e) {
                let self = this
                db.collection('users').doc(firebase.auth().currentUser.uid).get().then(function (doc) {
                    if (doc.exists) {
                        let name = doc.get('username')
                        let image = doc.get('image')

                        let divide = self.note.value === 0 ? 1 : 2
                        db.collection('restaurants').doc(self.id).update({
                            note: {
                                value: (self.temp_value + self.note.value) / divide,
                                totals: self.note.totals + 1
                            }
                        }).then(function () {
                            console.log("Document successfully updated!");
                        }).catch(function (error) {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });

                        db.collection('restaurants').doc(self.id).collection('comments').add({
                            title: self.title,
                            message: self.message,
                            note: self.temp_value,
                            date: self.getCurrentDay(),
                            author: name,
                            image: image,
                            timestamp:firebase.firestore.FieldValue.serverTimestamp()
                        })
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch(function (error) {
                    console.log("Error getting document:", error.message);
                });
                this.i++
                e.preventDefault()
            },
            getCurrentDay: function () {
                const today = new Date();
                const dd = String(today.getDate()).padStart(2, '0');
                const mm = String(today.getMonth() + 1).padStart(2, '0');
                const yyyy = today.getFullYear();
                let hour = today.getHours();
                let minute = today.getMinutes();
                let second = today.getSeconds();

                if (hour.toString().length === 1) {
                    hour = '0' + hour;
                }
                if (minute.toString().length === 1) {
                    minute = '0' + minute;
                }
                if (second.toString().length === 1) {
                    second = '0' + second;
                }

                return dd + '/' + mm + '/' + yyyy + '  ' + hour + ':' + minute + ':' + second
            }
        }
    }
</script>

<style scoped lang="scss">
    .formComment{
        border: 1px solid #e0e0e0;
        border-radius: 2px;
        background: #fff;
        margin: 12px;
        padding: 16px 24px 24px 24px;

        h4{
            border-bottom: 1px solid #ccc;
            padding-bottom: 12px;
            font-size: 1.25em;
            color: #4a4a4a;
            margin-bottom: 25px;
        }
        form{
            .field{
                margin-bottom: 10px;

            }
            label{
                font-weight: bold;

                &.label__note{
                    display: block;
                }
            }
            .title{
                input{
                    min-height: 44px;
                    box-shadow: inset 0 1px 2px 0 rgba(50,50,50,.3);
                    border: 1px solid #dbdad5;
                    font-weight: 400;
                    font-size: 1.167em;
                    font-family: inherit;
                    width: 100%;
                    box-sizing: border-box;
                    padding: 14px;
                    height: 24px;
                    margin: 0;
                    background-color: #fff;
                }
            }
            .comment{
                textarea{
                    min-height: 44px;
                    box-shadow: inset 0 1px 2px 0 rgba(50,50,50,.3);
                    border: 1px solid #dbdad5;
                    font-weight: 400;
                    font-size: 1.167em;
                    font-family: inherit;
                    width: 100%;
                    box-sizing: border-box;
                    padding: 14px;
                    height: 80px;
                    margin: 0;
                    background-color: #fff;
                    transition: all 0.5s;
                    resize: none;
                    outline: none;
                    &:focus{
                        height: 130px;
                        transition: all 0.5s;
                    }
                }
            }
            .submit{
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
        }
    }
    %visually-hidden {
        position: absolute;
        overflow: hidden;
        clip: rect(0 0 0 0);
        height: 1px;
        width: 1px;
        margin: -1px;
        padding: 0;
        border: 0;
    }

    .star-rating {
        &__star {
            display: inline-block !important;
            padding: 3px;
            vertical-align: middle;
            line-height: 1;
            font-size: 1.5em;
            color: #ABABAB;
            transition: color .2s ease-out;

            &:hover {
                cursor: pointer;
            }

            &.is-selected {
                color: #FFD700;
            }

            &.is-disabled:hover {
                cursor: default;
            }
        }

        &__checkbox {
            @extend %visually-hidden;
        }
    }
</style>