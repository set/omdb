<template>
  <a @click.prevent="emit()" :class="{ checkbox: true, checked: value }"
    ><i class="icon-check"></i>
  </a>
</template>

<script>
export default {
  props: ["value"],
  methods: {
    emit() {
      const value = !this.value;
      this.$emit("input", value);
      this.$emit("change", value);
    },
  },
};
</script>
