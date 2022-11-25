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
        <router-link
          :to="{ name: 'TaskDetail', params: { task_id: element.id } }"
          class="task-link"
        >
          {{ element.id }}
        </router-link>
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

<style lang="scss" scoped>
.list-group {
  .list-group-item[data-draggable="true"] {
    cursor: move;
    display: flex;
  }
  .task-link {
    width: 50px;
    &:hover {
      text-decoration: underline !important;
    }
  }
}
</style>
