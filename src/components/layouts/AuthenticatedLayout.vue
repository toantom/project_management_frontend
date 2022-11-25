<template>
  <header-base />
  <div id="body-pd" class="pt-2 pt-sm-4">
    <a-spin :spinning="isLoading">
      <router-view />
    </a-spin>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderBase from "@/components/base/HeaderBase.vue";
import { mapGetters } from "vuex";
export default defineComponent({
  name: "AuthenticatedLayout",
  components: {
    HeaderBase,
  },
  computed: {
    ...mapGetters(["isLoading"]),
  },
});
</script>
