<template>
  <div class="container">
    <section class="preview">
      <div class="before" @click="openFileChooser">
        <img :src="imageURL">
      </div>
      <div class="between">
        <div class="btn-upload" @click="uploadFile">
          <span>Change</span>
          <input id="input_img" ref="file" type="file" accept="image/*" @change="previewFile">
        </div>
      </div>
      <div class="after">
        <img :src="updateImage">
      </div>
    </section>
  </div>
</template>

<script>
import axios from "~/plugins/axios";

export default {
  data() {
    return {
      updateImage: "/images/blank.png"
    };
  },
  computed: {
    imageURL() {
      return this.$store.getters.currentPath;
    }
  },
  methods: {
    previewFile(e) {
      const input = e.target;

      if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = e => {
          this.updateImage = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
      }
    },
    openFileChooser() {
      const event = document.createEvent("MouseEvents");
      event.initMouseEvent("click", true, true, window);
      setTimeout(() => {
        document.getElementById("input_img").dispatchEvent(event);
      }, 0);
    },
    async uploadFile() {
      const file = document.querySelector("input[type=file]").files[0];
      if (file) {
        const fd = new FormData();
        fd.append("type", "image");
        fd.append("before", this.imageURL.replace(/^.*[\\/]/, ""));
        fd.append("imageURL", file);
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        let data = await axios.post("/api/upload", fd, config);
        console.log(data);
      }
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
      .btn-upload {
        margin: 0 auto;
        width: 80%;
        height: 100%;
        border-radius: 0.5rem;
        cursor: pointer;
        background-color: #27ae60;
        color: #fff;
        font-weight: bold;
        span {
          line-height: 50px;
          font-size: 1.25rem;
        }
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
