<template>
  <div class="image-container">
    <section class="image-section">
      <div class="image-section-content">
        <photo :is-link="false" :photo-url="item.imageURL" class="photo"/>
      </div>
      <div class="image-section-sidebar">

        <div class="box">
          <a>Download</a>
        </div>
        <div class="box">
          <div class="btn-upload" @click="openFileChooser">
            <span>Change</span>
            <input id="input_img" ref="file" type="file" accept="image/*" @change="previewFile">
          </div>
        </div>
        <div class="box"/>
        <div class="box"/>
      </div>
    </section>
    <section class="details-section">
      dd
    </section>
  </div>
</template>

<script>
import Photo from "~/components/Photo";

export default {
  components: {
    Photo
  },
  asyncData() {
    return {};
  },
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
  },
  methods: {
    previewFile(e) {
      const photo = document.getElementById("photo");
      const input = e.target;

      if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = e => {
          photo.src = e.target.result;
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
    }
  }
};
</script>

<style lang="scss">
.image-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  > section {
    position: static;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  .image-section {
    .image-section-content {
      position: static;
      background-color: #fff;
      border-radius: 1rem;
      padding: 2rem;
      width: 70%;
      @include respond-to($phone) {
        width: 100%;
      }
      .photo {
        display: flex;
        justify-content: center;
        img {
          max-height: 500px;
          @include respond-to($phone) {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .image-section-sidebar {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      .box {
        width: 300px;
        height: 50px;
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
        #input_img {
          display: none;
        }
      }
    }
  }
}
</style>
