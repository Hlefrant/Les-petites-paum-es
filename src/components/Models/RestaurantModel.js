function RestaurantModel(name,image, address, type, note, price) {
    this.name = name || ""
    this.image = image || ""
    this.address = address || ""
    this.type = type || ""
    this.note = note || ""
    this.price = price || ""

}

export default RestaurantModel