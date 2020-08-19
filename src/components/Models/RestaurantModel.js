function RestaurantModel(name,image, address, date, type, note, price) {
    this.name = name || ""
    this.image = image || ""
    this.address = address || ""
    this.date = date || ""
    this.type = type || ""
    this.note = note || ""
    this.price = price || ""

}

export default RestaurantModel