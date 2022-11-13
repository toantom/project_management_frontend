<template>
  <draggable
    class="list-group"
    v-model="list"
    group="task"
    item-key="id"
    @add="$emit('update', $event)"
  >
    <template #header>
      <div class="list-group-item" role="group">
        <h4>{{ title }}</h4>
      </div>
    </template>
    <template #item="{ element }">
      <div class="list-group-item">
        <span>{{ element.id }}</span>
        {{ element.task_title }}
      </div>
    </template>
  </draggable>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import draggable from "vuedraggable";

export default defineComponent({
  name: "DraggableBase",
  components: {
    draggable,
  },
  data() {
    return {
      list: [],
    };
  },
  $emits: ["update"],
  props: {
    taskList: Array,
    title: String,
  },
  watch: {
    taskList(newVal) {
      if (newVal) {
        this.list = newVal;
      }
    },
  },
});
</script>
