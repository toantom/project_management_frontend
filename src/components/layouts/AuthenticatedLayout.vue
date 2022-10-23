<template>
  <header-base />
  <loading-base v-if="isLoading" />
  <div id="body-pd" class="pt-2 pt-sm-4" v-show="!isLoading">
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import HeaderBase from "@/components/base/HeaderBase";
import LoadingBase from "@/components/base/LoadingBase";
import { mapGetters } from "vuex";
export default defineComponent({
  name: "AuthenticatedLayout",
  components: {
    HeaderBase,
    LoadingBase,
  },
  computed: {
    ...mapGetters(["isLoading"]),
  },
});
</script>
