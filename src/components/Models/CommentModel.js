function CommentModel(authorName,authorImage,title,message,date) {
    this.authorName = authorName || ""
    this.authorImage = authorImage || ""
    this.title = title || ""
    this.message = message || ""
    this.date = date || ""


}

export default CommentModel