const vm = new Vue({
  el: "#app",
  data: {
    products: [],
    product: false,
    cart: [],
    cartActive: true,
    messageAlert: "Item adicionado",
    alertActive: false,
  },
  filters: {
    formatCurrency(value) {
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
  computed: {
    cartTotal() {
      let total = 0;

      if (this.cart.length) {
        this.cart.forEach((item) => {
          total += item.price;
        });
      }

      return total;
    },
  },
  methods: {
    fetchProducts() {
      fetch("./api/products.json")
        .then((r) => r.json())
        .then((r) => {
          this.products = r;
        });
    },
    fetchProduct(id) {
      fetch(`./api/products/${id}/data.json`)
        .then((r) => r.json())
        .then((r) => {
          this.product = r;
        });
    },
    openModal(id) {
      this.fetchProduct(id);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    closeModal({ target, currentTarget }) {
      if (target === currentTarget) this.product = false;
    },
    clickOutCart({ target, currentTarget }) {
      if (target === currentTarget) this.cart = false;
    },
    addItem() {
      this.product.stock--;

      const { id, name, price } = this.product;
      this.cart.push({ id, name, price });

      this.alert(`${name} adicionado ao carrinho`);
    },
    removeItem(index) {
      this.cart.splice(index, 1);
    },
    checkLocalStorage() {
      if (window.localStorage.cart)
        this.cart = JSON.parse(window.localStorage.cart);
    },
    alert(message) {
      this.messageAlert = message;
      this.alertActive = true;

      setTimeout(() => {
        this.alertActive = false;
      }, 1500);
    },
    router() {
      const hash = document.location.hash;
      if (hash) {
        this.fetchProduct(hash.replace("#", ""));
      }
    },
  },
  watch: {
    product() {
      document.title = this.product.name || "Techno";
      const hash = this.product.id || "";
      history.pushState(null, null, `#${hash}`);
    },
    cart() {
      window.localStorage.cart = JSON.stringify(this.cart);
    },
  },
  created() {
    this.fetchProducts();
    this.checkLocalStorage();
    this.router();
  },
});
