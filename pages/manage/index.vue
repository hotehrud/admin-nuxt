<template>
  <div>
    <section class="container gallery">
      <photo v-for="(item, index) in items" :key="index" :photo-id="item.id" :photo-name="item.name" :photo-url="item.imageURL" class="photo_area">
        <nuxt-link slot="img" :to="'/manage/items/' + index" class="photo_link">
          <img :src="item.imageURL" class="photo_img">
        </nuxt-link>
      </photo>
    </section>
  </div>
</template>

<script>
import Photo from "~/components/Photo";
export default {
  components: {
    Photo
  },
  head() {
    return {
      title: "Items"
    };
  },
  async fetch({ store, params }) {
    await store.dispatch("getItems");
  },
  computed: {
    items() {
      return this.$store.getters.items;
    }
  }
};
</script>

<style lang="scss">
.gallery {
  max-width: 900px;
  padding: 1em;
  border: 1rem solid #eee;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 auto;
  .photo_area {
    background-color: #333;
    min-width: 12rem;
    min-height: 10rem;
    position: relative;
    flex: 1;
    flex-basis: 8rem;
    margin: 0.25em;
    .photo_link {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .photo_area:nth-child(5n) {
    flex-basis: 14rem;
  }

  .photo_area:nth-child(2n + 1) {
    flex-basis: 10rem;
  }

  .photo_area:nth-child(7n + 4) {
    flex-basis: 20rem;
    min-height: 12rem;
  }
}
</style>
