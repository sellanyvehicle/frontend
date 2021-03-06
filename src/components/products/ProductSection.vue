<template>
  <section class="product-part mb-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <product-categories></product-categories>
        </div>
        <div class="col-lg-9">
          <div class="row">
            <div class="col-lg-12">
              <product-filter @refresh="fetchProducts"></product-filter>
            </div>
          </div>
          <div class="row" v-if="!!error">
            <div class="col-12">
              <h6 class="text-center text-danger">
                There was an error loading the products
              </h6>
            </div>
          </div>
          <div v-else>
            <div class="row w-100" v-if="isLoading">
              <product-placeholder
                v-for="i in loadingElements"
                :key="i"
              ></product-placeholder>
            </div>

            <div class="row" v-else>
              <product-card
                v-for="product in products"
                :key="product.id"
                :id="product.id"
                :name="product.name"
                :newPrice="product.newPrice"
                :oldPrice="product.oldPrice"
                :thumbnail="product.thumbnail"
                :labels="product.labels || []"
                :quantity="product.quantity || 0"
              >
                <product-modal
                  :id="product.id"
                  :images="product.images || []"
                  :name="product.name"
                  :newPrice="product.newPrice"
                  :oldPrice="product.oldPrice"
                  :brand="product.brand || ''"
                  :sku="product.sku || ''"
                  :description="product.description || ''"
                ></product-modal>
              </product-card>
            </div>

            <div
              class="col-md-12 text-center mt-3"
              v-if="!isLoading && (!products || products.length == 0)"
            >
              <p>No products yet ☹️</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from "jquery";
import ProductCategories from "./ProductCategories.vue";
import ProductFilter from "./ProductFilter.vue";
import ProductCard from "./ProductCard.vue";
import ProductPlaceholder from "./ProductPlaceholder.vue";
import ProductModal from "./ProductModal.vue";

export default {
  props: {
    search: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isLoading: false,
      error: null
    };
  },
  components: {
    ProductCategories,
    ProductFilter,
    ProductCard,
    ProductPlaceholder,
    ProductModal
  },
  computed: {
    products() {
      return this.$store.getters.products(this.search);
    }
  },
  methods: {
    async fetchProducts() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("fetchProducts", true);
      } catch (error) {
        console.log(error);
        this.error = error.message || "error";
      }
      this.isLoading = false;
    }
  },
  created() {
    this.fetchProducts();
  },
  mounted() {
    $(window).on("scroll", function() {
      $(this).scrollTop() > 650
        ? $(".product-category").addClass("category-fixed")
        : $(".product-category").removeClass("category-fixed");
    });
  }
};
</script>

<style scoped>
.product-part {
  margin-bottom: 50px !important;
}
</style>
