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

<style>
#body {
  margin: 0 auto;
  display: flex;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
