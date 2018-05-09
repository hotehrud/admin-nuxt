<template>
  <div>
    <manage-logo/>
  </div>
</template>

<script>
import ManageLogo from "~/components/AppLogo";
export default {
  components: {
    ManageLogo
  },
  head() {
    return {
      title: "Manage"
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
