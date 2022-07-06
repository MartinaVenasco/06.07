const product = {
  id: 1,
  name: "TV",
  price: 40,
  stock: 20,
  addons: {
    decoder: 10,
    qled: 40,
    stereo: 20,
  },
};

const addonsPrince = Object.values(product.addons);
const totalPrice = addonsPrince.reduce((a, b) => a + b);
console.log(totalPrice + product.price);
console.clear();

const newProducts = Array.from(
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  (_, index) => {
    return {
      id: 1,
      name: `TV - ${_}`,
      price: 40 + index,
      stock: 21,
    };
  }
);

const shop = {
  products: [],
  page: 0,
  perPage: 5,

  setPage(newPage) {
    this.page = newPage;
    this.renderHTML();
  },

  getProducts() {
    const startIndex = this.page * this.perPage;
    const endIndex = startIndex + this.perPage;

    const slicedProducts = this.products.slice(startIndex, endIndex);

    return slicedProducts;
  },

  setProducts(products) {
    this.products = products;
    this.renderHTML();
  },

  renderHTML() {
    const productsHTML = this.getProducts()
      .map((product) => {
        const { name, price } = product;
        //
        return `<li>${name} - ${price}€  <button class="product"> VEDI DETTAGLI </button></li>
       
        `;
      })
      .join("");
    document.querySelector(".shop").innerHTML = `
    <h2>PRODOTTI DISPONIBILI SUBITO!</h2>
    
    <ul>${productsHTML}</ul><div class="countp" > Page: ${this.page}</div>
    <div class="countp" >Showing: ${this.getProducts().length}/${
      this.products.length
    }</div>
`;
  },
};

shop.setProducts(newProducts);

const $pagination = document.querySelector(".pagination");
const $buttons = document.querySelectorAll(".pagination button");

$pagination.addEventListener("click", function (event) {
  console.log("click su pagination");

  if (event.target.tagName === "BUTTON") {
    event.preventDefault();

    console.log("stai cliccando su un button");
    const buttonEl = event.target;
    const newPage = Number(buttonEl.innerText) - 1;

    shop.setPage(newPage);

    
  }
});

const productContainer = document.querySelector(".shop");
const prodB = document.querySelector(".product");

productContainer.addEventListener("click", function (event) {
  console.log("click su container prodotti");
  event.stopPropagation();

  if (event.target.tagName === "BUTTON") {
    event.preventDefault();
    event.stopPropagation();
    console.log("stai cliccando su un prodotto");

    alert(
      `${product.price}€ Prezzo da urlo!     Affrettati ne rimangono solo: ${product.stock} pezzi`
    );
  }
});


