<template>
  <v-select
    class="dropdown-input"
    :id="id"
    :options="options"
    :placeholder="placeholder"
    :filterable="filterable"
    @option:selected="$emit('change')"
  >
  </v-select>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DropdownBase",
  props: {
    id: String,
    options: Array,
    placeholder: String,
    filterable: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["change"],
});
</script>

<style lang="scss">
.dropdown-input {
  .vs__search,
  .vs__search:focus {
    margin-top: 0;
    line-height: 16px;
  }
  .vs__dropdown-toggle {
    padding: 5px 0;
    border-radius: 0.375rem;
  }
  .vs__actions {
    padding-top: 0;
  }
  .vs__clear {
    padding-bottom: 2px;
  }
  .vs__selected {
    margin-top: 0;
  }
  .vs__dropdown-menu {
    border-radius: 0.375rem !important;
  }
  --vs-dropdown-max-height: 200px;
}
.vs--open .vs__dropdown-toggle {
  color: #212529;
  background-color: #fff;
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
}
.is-invalid {
  .vs__dropdown-toggle {
    border-color: #dc3545;
    padding-right: calc(1.5em + 0.75rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 12 12%27 width=%2712%27 height=%2712%27 fill=%27none%27 stroke=%27%23dc3545%27%3e%3ccircle cx=%276%27 cy=%276%27 r=%274.5%27/%3e%3cpath stroke-linejoin=%27round%27 d=%27M5.8 3.6h.4L6 6.5z%27/%3e%3ccircle cx=%276%27 cy=%278.2%27 r=%27.6%27 fill=%27%23dc3545%27 stroke=%27none%27/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right calc(0.375em + 0.1875rem) center;
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
  }
}
.vs--open.is-invalid {
  .vs__dropdown-toggle {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.25rem rgb(220 53 69 / 25%);
  }
}
</style>
