let listProducts = [];

class Products {
    constructor(title, price, thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    };

    getProducts() {
        return listProducts
    };

    createProduct(newProduct) {
        let id;
        if (listProducts.length === 0) {
            id = 1;
        }
        else {
            id = listProducts[listProducts.length - 1].id + 1;
        }
        listProducts.push({ id: id, ...newProduct });
    };

    findById(id) {
        return listProducts.find(product => product.id === id)
    };

    updateProducts(id, newProduct) {
        const findProduct = listProducts.map(product => product.id);
        const resultProduct = findProduct.indexOf(id);
        listProducts.splice(resultProduct, 1, { id: id, ...newProduct })
    };

    deleteById(id) {
        const newList = listProducts.filter(product => product.id !== id)
        listProducts = newList
    };
}
module.exports = Products