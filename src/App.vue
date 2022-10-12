<template>
  <loading-base v-if="isLoading" />
  <div>
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import LoadingBase from "@/components/base/LoadingBase.vue";
import { mapGetters } from "vuex";
export default defineComponent({
  components: {
    LoadingBase,
  },
  computed: {
    ...mapGetters(["isLoading"]),
  },
});
</script>
