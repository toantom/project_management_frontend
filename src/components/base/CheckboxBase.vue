<template>
  <div class="checkbox mb-3">
    <label> <input type="checkbox" :value="value" /> {{ label }} </label>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "CheckboxBase",
  props: {
    label: String,
    value: String,
  },
});
</script>
