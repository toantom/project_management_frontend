<template>
  <button :type="type" class="btn" :class="classes">{{ label }}</button>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ButtonBase",
  props: {
    type: String,
    label: String,
    classes: Array,
  },
});
</script>
