<template>
    <div class="comments">
        <h2>Commentaires</h2>

        <div class="comments__list">
            <div class="item" v-for="comment in comments" :key="comment.id">
                <div class="item__header">
                    <img :src="comment.authorImage" alt="">
                    <p>{{ comment.authorName }}</p>
                </div>
                <p>{{comment.message + comment.date}}</p>
            </div>
        </div>
        <form action="" @submit.prevent="addComment">
            <div class="star-rating field field-1">
                <label for="">Note</label>
                <label class="star-rating__star" :key="rating" v-for="rating in ratings"
                       :class="{'is-selected': ((value >= rating) && value != null), 'is-disabled': disabled}"
                       v-on:click="set(rating)" v-on:mouseover="star_over(rating)" v-on:mouseout="star_out">
                    <input class="star-rating star-rating__checkbox" type="radio" :value="rating" :name="name"
                           v-model="value" :disabled="disabled">★</label>
            </div>
            <div class="title">
                <label for="">Titre du commentaire</label>
                <input type="text" v-model="title">
            </div>
            <div class="comment">
                <label for="">Commentaire</label>
                <textarea name="" id="" cols="30" rows="10" v-model="message" placeholder="Votre commentaire">
                </textarea>
            </div>
            <input type="submit" value="Commenter">
        </form>
    </div>
</template>

<script>
    import * as firebase from 'firebase';
    import {db} from "@/main";
    import CommentModel from "@/components/Models/CommentModel";

    export default {
        name: "RestaurantDetailsComments",
        data: function () {
            return {
                title: null,
                message: null,
                comments: [],
                value: null,
                temp_value: null,
                ratings: [1, 2, 3, 4, 5]
            }
        },
        props: {
            id: String,
            note: Object
        },
        mounted() {
            this.getComments()
        },
        methods: {
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
            getComments: function () {
                let self = this
                db.collection('restaurants').doc(this.id).collection('comments').onSnapshot(function (comments) {
                    self.comments = []
                    comments.docs.forEach(comment => {
                        let message = comment.get('message')
                        let title = comment.get('title')
                        let name = comment.get('author')
                        let image = comment.get('image')
                        let date = comment.get('date')
                        self.comments.push(new CommentModel(name, image, title, message, date))
                    })
                });
            },
            addComment: function (e) {
                let self = this
                console.log(firebase.auth().currentUser.uid)
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
                            date: self.getCurrentDay(),
                            author: name,
                            image: image
                        })
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch(function (error) {
                    console.log("Error getting document:", error);
                });

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
    .comments {
        width: 100%;

        h2 {
            text-align: center;
        }

        .comments__list {
            .item {
                img {
                    width: 50px;
                    height: 50px;
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
    }
</style>