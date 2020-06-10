const vm = new Vue({
  el: "#app",
  data: {
    products: [],
    product: false,
  },
  filters: {
    formatCurrency(value) {
      return value.toLocaleString("en-BR", {
        style: "currency",
        currency: "BRL",
      });
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
  },
  created() {
    this.fetchProducts();
  },
});
