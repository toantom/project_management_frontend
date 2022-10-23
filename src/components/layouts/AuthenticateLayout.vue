<template>
  <div class="layout-authenticate">
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "AuthenticateLayout",
});
</script>

<style lang="scss" scoped>
.layout-authenticate {
  background: url("@/assets/image/authenticate_background.jpg");
  background-size: cover;
}
</style>
