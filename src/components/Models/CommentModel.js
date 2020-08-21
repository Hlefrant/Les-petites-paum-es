function CommentModel(authorName,authorImage,message,date) {
    this.authorName = authorName || ""
    this.authorImage = authorImage || ""
    this.message = message || ""
    this.date = date || ""


}

export default CommentModel