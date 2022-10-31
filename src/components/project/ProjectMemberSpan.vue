<template>
  <span v-for="(member, index) in members" :key="index" class="item">
    <img
      :src="`https://ui-avatars.com/api/?name=${member.name}&background=random&color=fff&rounded=true`"
      alt="mdo"
      width="20"
      height="20"
    />
    {{ member.name }}
    <span v-if="members.length > 1 && index + 1 !== members.length">, </span>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProjectMemberSpan",
  props: {
    members: Object,
  },
});
</script>

<style lang="scss" scoped></style>
