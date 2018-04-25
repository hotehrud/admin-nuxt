<template>
  <div class="item_wrapper">
    <div class="details">
      <div class="origin">
        {{ item.id }}
        {{ item.name }}
        <img :src="item.imageURL" class="thumbnail">
      </div>

      <div class="update">
        {{ item.id }}
        {{ item.name }}
        <img :src="item.imageURL" class="thumbnail">
      </div>
    </div>

    <div class="input_area">
      <form action="/action_page.php">
        <input type="file" name="img" accept="image/*">
        <input type="submit">
      </form>
    </div>
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
.item_wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
}
.details {
  position: relative;
  width: 100%;
  height: 80%;
  display: flex;
}
.input_area {
  position: relative;
  width: 100%;
  height: 20%;
}
.origin,
.update {
  position: static;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 50%;
}

.thumbnail {
  width: 80%;
  height: 80%;
}
</style>
