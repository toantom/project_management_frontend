<template>
  <header-base />
  <div id="body-pd" class="pt-2 pt-sm-4 ps-0 mx-auto">
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
  name: "AdminLayout",
  components: {
    HeaderBase,
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
