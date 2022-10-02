<template>
  <div class="mb-3 row">
    <label :for="id" class="col-sm-4 col-form-label text-start">
      {{ label }} <span class="required-input" v-if="required">*</span>
    </label>
    <div class="col-sm-8">
      <input
        :type="type"
        class="form-control"
        :id="id"
        :placeholder="placeholder"
        @input="$emit('update:inputBase', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "InputBase",
  props: {
    type: String,
    id: String,
    label: String,
    placeholder: String,
    required: Boolean,
  },
  emits: ["update:inputBase"],
});
</script>

<style lang="scss">
.required-input {
  color: var(--bs-danger);
}
</style>
