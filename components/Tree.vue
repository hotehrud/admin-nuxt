<template>
  <div :class="type" class="tree-view">
    <div :style="indent" :class="{highlight: isFocus}" class="tree-icon" @click="toggleChildren">
      <span>{{ label }}</span>
    </div>
    <transition-group name="fade">
      <tree-view v-for="(node, index) in nodes" v-if="showChildren" :key="index" :nodes="node.nodes" :label="node.label" :depth="depth + 1" :path="node.path" />
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "TreeView",
  props: {
    label: {
      default: "",
      type: String
    },
    nodes: {
      default: () => [],
      type: Array
    },
    depth: {
      default: 0,
      type: Number
    },
    path: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      showChildren: true,
      focus: false,
      type: ""
    };
  },
  computed: {
    indent() {
      return { transform: `translate(${this.depth * 50}px)` };
    },
    isFocus() {
      if (this.$store.getters.currentPath === this.path) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    if (this.nodes.length > 0) {
      this.type = "folder";
    } else {
      this.type = "file";
    }
  },
  methods: {
    toggleChildren() {
      if (this.type === "file") {
        this.previewFile();
        return;
      }
      this.showChildren = !this.showChildren;
    },
    previewFile() {
      this.$store.dispatch("currentPath", this.path);
      let idx = this.$store.getters.currentPathIdx;
      console.log(idx);
      // this.$router.push({ name: "manage-items-id", params: { id: idx } });
    }
  }
};
</script>

<style lang="scss" scoped>
.tree-icon {
  cursor: pointer;
  display: inline-block;
  padding-right: 0.5rem;
  &:hover {
    color: white;
    background-color: gray;
  }
  &::before {
    margin-right: 10px;
    content: "";
    height: 20px;
    vertical-align: middle;
    width: 20px;
    background-repeat: no-repeat;
    display: inline-block;
  }
}

.file {
  > .tree-icon {
    &::before {
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path fill='lightgrey' d='M85.714,42.857V87.5c0,1.487-0.521,2.752-1.562,3.794c-1.042,1.041-2.308,1.562-3.795,1.562H19.643 c-1.488,0-2.753-0.521-3.794-1.562c-1.042-1.042-1.562-2.307-1.562-3.794v-75c0-1.487,0.521-2.752,1.562-3.794 c1.041-1.041,2.306-1.562,3.794-1.562H50V37.5c0,1.488,0.521,2.753,1.562,3.795s2.307,1.562,3.795,1.562H85.714z M85.546,35.714 H57.143V7.311c3.05,0.558,5.505,1.767,7.366,3.627l17.41,17.411C83.78,30.209,84.989,32.665,85.546,35.714z' /></svg>");
      background-position: center 2px;
      background-size: 60% auto;
    }
  }
}

.folder {
  > .tree-icon {
    &::before {
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path fill='lightblue' d='M96.429,37.5v39.286c0,3.423-1.228,6.361-3.684,8.817c-2.455,2.455-5.395,3.683-8.816,3.683H16.071 c-3.423,0-6.362-1.228-8.817-3.683c-2.456-2.456-3.683-5.395-3.683-8.817V23.214c0-3.422,1.228-6.362,3.683-8.817 c2.455-2.456,5.394-3.683,8.817-3.683h17.857c3.422,0,6.362,1.228,8.817,3.683c2.455,2.455,3.683,5.395,3.683,8.817V25h37.5 c3.422,0,6.361,1.228,8.816,3.683C95.201,31.138,96.429,34.078,96.429,37.5z' /></svg>");
      background-position: center top;
      background-size: 75% auto;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.highlight {
  color: white;
  background-color: gray;
}
</style>
