<template>
  <div class="gallery">
    <div v-for="(item, index) in items" :key="index" class="thumbnail_area">
      <nuxt-link :to="'/manage/items/' + index" class="thumbnail_link">
        <img :src="item.imageURL" class="thumbnail">
      </nuxt-link>
    </div>
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

<style scoped>
.gallery {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.thumbnail_area {
  background-color: #333;
  min-width: 12rem;
  min-height: 8rem;
  position: relative;
  flex: 1;
  flex-basis: 8rem;
  margin-right: 2px;
  margin-bottom: 2px;
}

.thumbnail_area:nth-child(5n) {
  flex-basis: 14rem;
}

.thumbnail_area:nth-child(2n + 1) {
  flex-basis: 10rem;
}

.thumbnail_area:nth-child(7n + 4) {
  flex-basis: 20rem;
  min-height: 12rem;
}

.thumbnail_link {
  position: absolute;
  width: 100%;
  height: 100%;
}

.thumbnail {
  width: 100%;
  height: 100%;
}
</style>
