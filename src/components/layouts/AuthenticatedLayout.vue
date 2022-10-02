<template>
  <header-base />
  <div class="height-100 bg-light">
    <!--    <router-view />-->
  </div>
</template>

<script>
import { defineComponent } from "vue";
import HeaderBase from "@/components/base/HeaderBase";
export default defineComponent({
  name: "AuthenticatedLayout",
  components: {
    HeaderBase,
  },
});
</script>
