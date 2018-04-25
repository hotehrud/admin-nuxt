<template>
  <div>
    <ul class="items">
      <li v-for="(item, index) in items" :key="index" class="item">
        <nuxt-link :to="'/manage/items/' + index">
          {{ item.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Items"
    };
  },
  fetch({ store, params }) {
    store.dispatch("getItems");
  },
  computed: {
    items() {
      return this.$store.getters.items;
    }
  }
};
</script>

<style>
</style>
