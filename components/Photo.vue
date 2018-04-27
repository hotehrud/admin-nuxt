<template>
  <div :aria-label="photoName" class="photo-container">
    <slot v-if="isLink" name="img"/>
    <img v-else id="photo" :src="photoUrl" class="photo-img">
  </div>
</template>

<script>
export default {
  props: {
    isLink: {
      default: true,
      type: Boolean
    },
    photoId: {
      default: "",
      type: String
    },
    photoName: {
      default: "",
      type: String
    },
    photoUrl: {
      default: "",
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.photo-container {
  cursor: pointer;
  color: #fff;
  &::after {
    content: attr(aria-label);
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: 0.2s;
  }
  &:hover::after {
    opacity: 1;
  }
}
</style>
