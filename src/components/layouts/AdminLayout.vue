<template>
  <header-base />
  <loading-base v-if="isLoading" />
  <div id="body-pd" class="pt-2 pt-sm-4 ps-0 mx-auto" v-show="!isLoading">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderBase from "@/components/base/HeaderBase.vue";
import LoadingBase from "@/components/base/LoadingBase.vue";
import { mapGetters } from "vuex";
export default defineComponent({
  name: "AdminLayout",
  components: {
    HeaderBase,
    LoadingBase,
  },
  computed: {
    ...mapGetters(["isLoading"]),
  },
});
</script>

<style lang="scss" scoped>
#body-pd {
  margin: 3rem auto 0 !important;
  width: 100%;
}
@media screen and (min-width: 768px) {
  #body-pd {
    margin: 4rem auto 0 !important;
    width: 75%;
  }
}
</style>
