const vm = new Vue({
  el: "#app",
  data: {
    products: [],
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
