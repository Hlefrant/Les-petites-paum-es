function CommentModel(authorName,authorImage,title,note,message,date) {
    this.authorName = authorName || ""
    this.authorImage = authorImage || ""
    this.title = title || ""
    this.note = note || 0
    this.message = message || ""
    this.date = date || ""
}

export default CommentModel