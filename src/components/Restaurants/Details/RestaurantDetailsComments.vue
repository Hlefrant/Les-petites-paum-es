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
    import { db } from "@/main";
    import CommentModel from "@/components/Models/CommentModel";

    export default {
        name: "RestaurantDetailsComments",
        data: function(){
            return{
                message: null,
                comments: []
            }
        },
        props: {
            id: String
        },
        mounted(){
            this.getComments()
        },
        methods:{

            getComments: function(){
                let self = this
                db.collection('restaurants').doc(this.id).collection('comments').onSnapshot(function(comments) {
                    self.comments = []
                    comments.docs.forEach(comment =>{
                        let message = comment.get('message')
                        let name = comment.get('author')
                        let image = comment.get('image')
                        let date = comment.get('date')
                        self.comments.push(new CommentModel(name,image,message,date))
                    })
                });
            },
            addComment: function (e) {
                let self = this
                console.log(firebase.auth().currentUser.uid)
                db.collection('users').doc(firebase.auth().currentUser.uid).get().then(function(doc) {
                    if (doc.exists) {
                        let name = doc.get('username')
                        let image = doc.get('image')

                        db.collection('restaurants').doc(self.id).collection('comments').add({
                            message: self.message,
                            date: self.getCurrentDay(),
                            author: name,
                            image: image
                        })
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });

                e.preventDefault()
            },
            getCurrentDay: function () {
                const today = new Date();
                const dd = String(today.getDate()).padStart(2, '0');
                const mm = String(today.getMonth() + 1).padStart(2, '0');
                const yyyy = today.getFullYear();
                let hour    = today.getHours();
                let minute  = today.getMinutes();
                let second  = today.getSeconds();

                if(hour.toString().length === 1) {
                    hour = '0'+hour;
                }
                if(minute.toString().length === 1) {
                    minute = '0'+minute;
                }
                if(second.toString().length === 1) {
                    second = '0'+second;
                }

                return dd + '/' + mm + '/' + yyyy + '  '+ hour +':' + minute + ':' + second
            }
        }
    }
</script>

<style scoped lang="scss">
.comments{
    width: 100%;
    h2{
        text-align: center;
    }
    .comments__list{
        .item{
            img{
                width: 50px;
                height: 50px;
            }
        }
    }
}
</style>