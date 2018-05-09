<template>
  <div class="container">
    <section class="preview">
      <div class="before">
        <img :src="imageURL">
      </div>
      <div class="between">
        between
      </div>
      <div class="after">
        <img :src="imageURL">
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    imageURL() {
      return this.$store.getters.currentPath;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  top: 50%;
  transform: translate(0, calc(-50% + 3.25rem / 2));
  .preview {
    max-width: 900px;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    .before,
    .after {
      flex-basis: 40%;
    }
    .between {
      flex-basis: 20%;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
