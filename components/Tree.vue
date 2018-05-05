<template>
  <aside v-html="createDOM"/>
</template>

<script>
function paint(parent) {
  let html = "";
  parent.forEach(child => {
    if (child.type === "folder") {
      html += "<li>" + child.name + "<ul>";
      html += paint(child.children);
      html += "</ul>";
      html += "</li>";
    } else {
      html += "<li>" + child.name + "</li>";
    }
  });
  return html;
}

export default {
  computed: {
    createDOM() {
      return paint(this.$store.getters.tree.children);
    }
  }
};
</script>

<style lang="scss" scoped>
aside {
  flex-basis: 25%;
}
</style>
