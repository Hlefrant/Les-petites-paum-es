<template>
    <section class="comments__section">
        <div class="comments">
            <h2>Commentaires</h2>
            <div class="comments__list">
                <div class="item" v-for="comment in comments" :key="comment.id">
                    <div class="item__header">
                        <img :src="comment.authorImage" alt="">
                        <p class="name">{{ comment.authorName }}</p>
                    </div>
                    <div class="item__content">
                        <div class="note">
                            <div class="stars">
                                <img src="~@/assets/star.svg" v-for="star in comment.note" :key="star.id"/>
                            </div>
                            <p class="date">
                                {{ comment.date}}
                            </p>
                        </div>
                        <h3>{{ comment.title}}</h3>
                        <p>{{comment.message}}</p>
                    </div>
                </div>
            </div>
        </div>
        <RestaurantFormAddComment :id="this.id" :note="this.note"/>
    </section>
</template>

<script>
    import RestaurantFormAddComment from "@/components/Restaurants/Details/RestaurantFormAddComment";
    import {db} from "@/main";
    import CommentModel from "@/components/Models/CommentModel";

    export default {
        name: "RestaurantDetailsComments",
        components:{
            RestaurantFormAddComment
        },
        data: function () {
            return {
                comments: [],
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
            getComments: function () {
                let self = this
                db.collection('restaurants').doc(this.id).collection('comments').orderBy("timestamp","desc").onSnapshot(function (comments) {
                    self.comments = []
                    comments.docs.forEach(comment => {
                        let message = comment.get('message')
                        let title = comment.get('title')
                        let name = comment.get('author')
                        let note = comment.get('note')
                        let image = comment.get('image')
                        let date = comment.get('date')
                        self.comments.push(new CommentModel(name, image, title,note, message, date))
                    })
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    .comments__section{
        width: 100%;
        .comments {
            border: 1px solid #e0e0e0;
            border-radius: 2px;
            background: #fff;
            margin: 12px;
            h2 {
                margin-top: 15px;
                text-align: center;
            }

            .comments__list {
                padding: 16px 24px 24px 24px;
                .item {
                    display: flex;
                    margin: 8px 0 4px;
                    border-top: 1px solid #e0e0e0;
                    padding: 8px 0;
                    .item__header{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-right: 15px;
                        img {
                            width: 72px;
                            height: 72px;
                            object-fit: fill;
                            border-radius: 100%;
                            margin-bottom: 10px;
                        }
                        .name{
                            text-transform: uppercase;
                            font-size: 11px;
                        }
                    }
                    .item__content{

                        .note{
                            display: flex;
                            align-items: center;
                            .stars{
                                img{
                                    width: 15px;
                                    margin-right: 3px;
                                }
                            }
                            .date{
                                margin-left: 8px;
                                color: #474747;
                                font-size: 12px;
                            }
                        }
                        h3{
                            font-size: 20px;
                            color: black;
                            margin-top: 8px;
                            margin-bottom: 8px;
                        }
                        p{
                            font-size: 14px;
                            line-height: 20px;
                            color: #474747;
                        }
                    }
                }
            }
        }
    }

</style>