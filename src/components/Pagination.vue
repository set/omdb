<template>
  <div class="pagination">
    <a
      :class="`page-link ${value === 1 ? 'disabled' : 'step-link'}`"
      @click.prevent="increase"
      href="#"
      ><i class="icon-arrow-left"></i>
    </a>
    <a
      v-for="(page, key) in totalPages"
      :key="key"
      @click.prevent="changePage(page)"
      :class="`page-link ${page === value ? 'active' : 'link'}`"
      href="#"
      >{{ page }}
    </a>
    <a
      :class="`page-link ${value === lastPage ? 'disabled' : 'step-link'}`"
      @click.prevent="decrease"
      href="#"
      ><i class="icon-arrow-right"></i>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    value: {},
    perPage: {
      default: 15,
    },
    total: {
      default: 1,
    },
  },
  computed: {
    totalPages() {
      const pages = [];
      for (let i = 1; i <= Math.ceil(this.total / this.perPage); i++) {
        pages.push(i);
      }
      return pages;
    },
    lastPage() {
      return this.totalPages.length;
    },
  },
  methods: {
    changePage(page) {
      this.$emit("input", page);
      this.$emit("change", page);
    },
    increase() {
      if (this.value > 1) {
        this.changePage(this.value - 1);
      }
    },
    decrease() {
      if (this.value < this.lastPage) {
        this.changePage(this.value + 1);
      }
    },
  },
};
</script>
