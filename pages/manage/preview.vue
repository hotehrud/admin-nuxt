<template>
  <component :is="previewType" />
</template>

<script>
import ImagePreview from "~/components/preview/Image";
import JsonPreview from "~/components/preview/Json";
import NotFound from "~/components/status/Notfound";
import NotSupported from "~/components/status/NotSupported";

export default {
  components: {
    ImagePreview,
    JsonPreview
  },
  async fetch({ store, params }) {
    await store.dispatch("getItems");
  },
  computed: {
    imageURL() {
      return this.$store.getters.currentPath;
    },
    previewType() {
      let type = this.$store.getters.currentExtensions;
      if (!type) {
        return NotFound;
      }

      if (type.match(/\.(jpg|jpeg|png|gif)$/)) {
        return ImagePreview;
      } else if (type.indexOf("json") > -1) {
        return JsonPreview;
      } else {
        return NotSupported;
      }
    }
  }
};
</script>

<style lang="scss">
#input_img {
  display: none;
}
</style>
