<template>
  <div class="project-layout">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProjectDetailLayout",
});
</script>
