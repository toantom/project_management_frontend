<template>
  <project-tab />
  <account-tab />
</template>

<script>
import { defineComponent } from "vue";
import ProjectTab from "@/components/home/ProjectTab";
import AccountTab from "@/components/home/AccountTab";
export default defineComponent({
  name: "HomePage",
  components: {
    ProjectTab,
    AccountTab,
  },
});
</script>
