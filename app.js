const vm = new Vue({
  el: "#app",
  data: {
    products: [],
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
    fecthProduct() {
      fetch("./api/products.json")
        .then((r) => r.json())
        .then((r) => {
          this.products = r;
        });
    },
  },
  created() {
    this.fecthProduct();
  },
});
