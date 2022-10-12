<template>
  <header-base />
  <div id="body-pd" class="height-100">
    <router-view />
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
