<template>
  <loading-base v-if="false" />
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import LoadingBase from "@/components/base/LoadingBase.vue";
export default defineComponent({
  components: {
    LoadingBase,
  },
});
</script>
