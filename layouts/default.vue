<template>
  <div id="layout">
    <header-nav/>
    <div id="sidebar">
      <tree-view :label="tree.label" :nodes="tree.nodes" :depth="0" :path="tree.path" class="tree_container" />
    </div>
    <nuxt id="body" />
  </div>
</template>

<script>
import HeaderNav from "~/components/Header.vue";
import TreeView from "~/components/Tree";

export default {
  components: {
    HeaderNav,
    TreeView
  },
  async fetch({ store, params }) {
    await store.dispatch("getTree");
  },
  computed: {
    tree() {
      return this.$store.getters.tree;
    }
  }
};
</script>

<style lang="scss">
#layout {
  #sidebar {
    position: fixed;
    top: 0;
    padding-top: 3.25rem;
    background-color: #fff;
    width: 25%;
    height: 100%;
    .tree_container {
      margin: 2rem;
    }
  }

  #body {
    position: relative;
    width: 75%;
    left: 25%;
    > section,
    aside {
      padding-top: 1rem;
    }
  }

  li {
    list-style: none;
  }
}
</style>
