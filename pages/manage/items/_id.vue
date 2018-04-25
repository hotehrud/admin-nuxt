<template>
  <div>
    {{ item.name }}
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Item"
    };
  },
  fetch({ store, params }) {
    store.dispatch("getItem", params.id);
  },
  computed: {
    item() {
      return this.$store.getters.item;
    }
  }
};
</script>

<style>
</style>
