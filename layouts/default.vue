<template>
  <div>
    <header-nav/>
    <nuxt id="body"/>
  </div>
</template>

<script>
import headerNav from "~/components/Header.vue";

export default {
  components: {
    headerNav
  }
};
</script>

<style lang="scss">
#body {
  margin: 0 auto;
  display: flex;
  > section,
  aside {
    padding-top: 1rem;
  }
}

li {
  list-style: none;
}
</style>
